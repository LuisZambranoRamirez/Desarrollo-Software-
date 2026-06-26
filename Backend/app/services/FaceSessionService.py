import uuid
import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from models.SesionAutentificacionFacial import SesionAutenticacionFacial


class FaceSessionService:

    @staticmethod
    def generate_challenge():
        challenge = random.choice(["HEAD_LEFT", "HEAD_RIGHT"])
        if challenge == "HEAD_LEFT":
            message = "Gira ligeramente tu cabeza hacia la izquierda"
        else:
            message = "Gira ligeramente tu cabeza hacia la derecha"
        return challenge, message

    @staticmethod
    def create_session(db: Session, ip_cliente: str = None, user_agent: str = None):
        token = str(uuid.uuid4())
        challenge_type, challenge_message = FaceSessionService.generate_challenge()

        session = SesionAutenticacionFacial(
            session_token=token,
            challenge_type=challenge_type,
            challenge_descripcion=challenge_message,
            estado="PENDING",
            ip_cliente=ip_cliente,
            user_agent=user_agent,
            fecha_expiracion=datetime.utcnow() + timedelta(minutes=2)
        )

        db.add(session)
        db.commit()
        db.refresh(session)

        return session

    @staticmethod
    def get_valid_session(db: Session, session_token: str):
        session = db.query(SesionAutenticacionFacial).filter(
            SesionAutenticacionFacial.session_token == session_token
        ).first()

        if not session:
            raise ValueError("La sesión facial no existe.")

        if session.estado != "PENDING":
            raise ValueError("La sesión facial ya fue utilizada o ya no está disponible.")

        if session.fecha_expiracion < datetime.utcnow():
            session.estado = "EXPIRED"
            db.commit()
            raise ValueError("La sesión facial expiró.")

        return session