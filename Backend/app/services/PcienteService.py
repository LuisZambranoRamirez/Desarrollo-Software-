from sqlalchemy.orm import Session, joinedload
from models.Usuario import Usuario
from models.Paciente import Paciente
from schemas.Pacientes import PacienteCreate
from fastapi import HTTPException, status
from security.Hashing import hashear_password
from security.security import create_access_token, get_password_hash

def registrar_paciente(db: Session, paciente_data: PacienteCreate):

    try:

        usuario_existente = (
            db.query(Usuario)
            .filter(Usuario.email == paciente_data.usuario.email)
            .first()
        )

        if usuario_existente:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El correo ya se encuentra registrado."
            )

        usuario_db = Usuario(
            email=paciente_data.usuario.email,
            password_hash=get_password_hash(paciente_data.usuario.password),
            nombre=paciente_data.usuario.nombre,
            apellido=paciente_data.usuario.apellido,
            telefono=paciente_data.usuario.telefono,
            rol="paciente",
            login_facial_habilitado=False
        )

        db.add(usuario_db)
        db.flush()

        paciente_db = Paciente(
            usuario_id=usuario_db.id,
            fecha_nacimiento=paciente_data.fecha_nacimiento,
            genero=paciente_data.genero,
            direccion=paciente_data.direccion,
            alergias=paciente_data.alergias
        )

        db.add(paciente_db)

        db.commit()

        db.refresh(usuario_db)
        db.refresh(paciente_db)

        access_token = create_access_token(
            data={
                "sub": str(usuario_db.id),
                "email": usuario_db.email,
                "rol": usuario_db.rol
            }
        )

        return {
            "message": "Paciente registrado correctamente.",
            "accessToken": access_token,
            "tokenType": "bearer",
            "paciente": paciente_db
        }

    except HTTPException:
        db.rollback()
        raise

    except Exception:
        db.rollback()
        raise



def buscar_paciente_por_telefono(db: Session, telefono: str):
    resultado = (
        db.query(Paciente)
        .join(Usuario, Paciente.usuario_id == Usuario.id)
        .filter(Usuario.telefono == telefono)
        .options(joinedload(Paciente.usuario))
        .first()
    )
    
    if not resultado:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Paciente no encontrado con el telefono: {telefono}"
        )
    
    return resultado