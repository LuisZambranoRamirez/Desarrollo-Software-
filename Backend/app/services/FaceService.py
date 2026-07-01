from datetime import datetime
from sqlalchemy.orm import Session
from models.Usuario import Usuario
from models.PerfilFacial import PerfilFacial
from models.IntentoAutentificacion  import IntentoAutenticacionFacial
from models.FrameAutentificacion import FrameAutenticacionFacial
from services.FaceRecognitionService import FaceRecognitionService
from services.FaceSessionService import FaceSessionService
from security.security import create_access_token

class FaceService:

    MATCH_THRESHOLD = 0.35

    @staticmethod
    def register_face(db: Session, usuario_id: int, image_base64: str):
        usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
        if not usuario:
            raise ValueError("El usuario no existe.")

        encoding, _ = FaceRecognitionService.get_face_encoding_from_base64(image_base64)
        encoding_json = FaceRecognitionService.serialize_encoding(encoding)

        perfil = db.query(PerfilFacial).filter(PerfilFacial.usuario_id == usuario_id).first()

        if perfil:
            perfil.embedding_json = encoding_json
            perfil.fecha_actualizacion = datetime.utcnow()
        else:
            perfil = PerfilFacial(
                usuario_id=usuario_id,
                embedding_json=encoding_json,
                algoritmo="face_recognition",
                version_modelo="v1"
            )
            db.add(perfil)

        usuario.login_facial_habilitado = True

        db.commit()

        return usuario

    @staticmethod
    def start_face_auth(db: Session, ip_cliente: str = None, user_agent: str = None):
        return FaceSessionService.create_session(db, ip_cliente, user_agent)

    @staticmethod
    def verify_face_auth(db: Session, session_token: str, frames: list):
        session = FaceSessionService.get_valid_session(db, session_token)

        if len(frames) < 3:
            raise ValueError("Se requieren al menos 3 frames para la validación facial.")

        candidate_encoding = None
        valid_frames_count = 0

        # Procesar frames
        for index, frame in enumerate(frames, start=1):
            try:
                encoding, faces_count = FaceRecognitionService.get_face_encoding_from_base64(frame.imageBase64)
                valid_frames_count += 1

                # guardamos metadatos del frame
                db.add(FrameAutenticacionFacial(
                    sesion_id=session.id,
                    numero_frame=index,
                    timestamp_cliente=frame.timestamp,
                    rostro_detectado=True,
                    cantidad_rostros=faces_count
                ))

                # nos quedamos con el último encoding válido
                candidate_encoding = encoding

            except Exception:
                db.add(FrameAutenticacionFacial(
                    sesion_id=session.id,
                    numero_frame=index,
                    timestamp_cliente=frame.timestamp,
                    rostro_detectado=False,
                    cantidad_rostros=0
                ))

        db.commit()

        if valid_frames_count == 0 or candidate_encoding is None:
            db.add(IntentoAutenticacionFacial(
                sesion_id=session.id,
                exito=False,
                motivo_fallo="No se detectó un rostro válido en los frames.",
                cantidad_frames=len(frames),
                challenge_validado=False,
                liveness_validado=False
            ))
            session.estado = "FAILED"
            db.commit()
            raise ValueError("No se detectó un rostro válido en los frames.")

        # obtener perfiles faciales registrados
        perfiles = db.query(PerfilFacial).filter(PerfilFacial.activo == True).all()

        if not perfiles:
            raise ValueError("No existen perfiles faciales registrados en la base de datos.")

        known_encodings = []
        perfil_usuario_map = []

        for perfil in perfiles:
            known_encodings.append(
                FaceRecognitionService.deserialize_encoding(perfil.embedding_json)
            )
            perfil_usuario_map.append(perfil)

        best_index, best_distance = FaceRecognitionService.compare_encodings(
            known_encodings, candidate_encoding
        )

        matched_perfil = perfil_usuario_map[best_index]

        # Aquí luego puedes endurecer la lógica con challenge real
        challenge_validado = True
        liveness_validado = True

        if best_distance <= FaceService.MATCH_THRESHOLD:
            usuario = db.query(Usuario).filter(Usuario.id == matched_perfil.usuario_id).first()

            session.estado = "SUCCESS"
            session.usuario_id = usuario.id
            session.fecha_uso = datetime.utcnow()

            usuario.ultimo_login_facial = datetime.utcnow()

            db.add(IntentoAutenticacionFacial(
                sesion_id=session.id,
                usuario_id=usuario.id,
                exito=True,
                distancia_coincidencia=best_distance,
                motivo_fallo=None,
                cantidad_frames=len(frames),
                challenge_validado=challenge_validado,
                liveness_validado=liveness_validado
            ))

            db.commit()

            token_payload = {
                "sub": str(usuario.id),
                "email": usuario.email,
                "rol": usuario.rol,
                "nombre": usuario.nombre,
                "apellido": usuario.apellido
            }

            access_token = create_access_token(token_payload)

            return {
            "authenticated": True,
            "message": "Autenticación facial correcta.",
            "accessToken": access_token,
            "tokenType": "bearer",
            "userId": usuario.id,
            "fullName": f"{usuario.nombre} {usuario.apellido}",
            "role": usuario.rol
            #"user": {
            #    "id": usuario.id,
            #    "email": usuario.email,
            #    "nombre": usuario.nombre,
            #    "apellido": usuario.apellido,
            #    "rol": usuario.rol
            #}
        }

        session.estado = "FAILED"
        db.add(IntentoAutenticacionFacial(
            sesion_id=session.id,
            exito=False,
            distancia_coincidencia=best_distance,
            motivo_fallo="No hubo coincidencia facial con el umbral configurado.",
            cantidad_frames=len(frames),
            challenge_validado=challenge_validado,
            liveness_validado=liveness_validado
        ))
        db.commit()

        return {
            "authenticated": False,
            "message": "No hubo coincidencia facial válida.",
            "accessToken": "",
            "tokenType": "bearer",
            "userId": None,
            "fullName": None,
            "role": None
        }