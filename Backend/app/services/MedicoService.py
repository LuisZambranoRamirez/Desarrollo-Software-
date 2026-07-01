from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from models.Usuario import Usuario
from models.Doctor import Doctor
from schemas.Medicos import DoctorCreate
from security.Hashing import hashear_password
from security.security import create_access_token,get_password_hash

def registrar_doctor(db: Session, doctor_data: DoctorCreate):

    try:

        usuario_existente = (
            db.query(Usuario)
            .filter(Usuario.email == doctor_data.usuario.email)
            .first()
        )

        if usuario_existente:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El correo ya se encuentra registrado."
            )

        usuario_db = Usuario(
            email=doctor_data.usuario.email,
            password_hash=get_password_hash(doctor_data.usuario.password),
            nombre=doctor_data.usuario.nombre,
            apellido=doctor_data.usuario.apellido,
            telefono=doctor_data.usuario.telefono,
            rol="doctor",
            login_facial_habilitado=False
        )

        db.add(usuario_db)
        db.flush()

        doctor_db = Doctor(
            usuario_id=usuario_db.id,
            especialidad_id=doctor_data.especialidad_id,
            cedula_profesional=doctor_data.cedula_profesional,
            años_experiencia=doctor_data.años_experiencia
        )

        db.add(doctor_db)

        db.commit()

        db.refresh(usuario_db)
        db.refresh(doctor_db)

        access_token = create_access_token(
            data={
                "sub": str(usuario_db.id),
                "email": usuario_db.email,
                "rol": usuario_db.rol
            }
        )

        return {
            "message": "Doctor registrado correctamente.",
            "accessToken": access_token,
            "tokenType": "bearer",
            "user": {
                "id": usuario_db.id,
                "nombre": usuario_db.nombre,
                "apellido": usuario_db.apellido,
                "email": usuario_db.email,
                "telefono": usuario_db.telefono,
                "rol": usuario_db.rol,
                "login_facial_habilitado": usuario_db.login_facial_habilitado
            },
            "doctor": doctor_db
        }

    except HTTPException:
        db.rollback()
        raise

    except Exception:
        db.rollback()
        raise