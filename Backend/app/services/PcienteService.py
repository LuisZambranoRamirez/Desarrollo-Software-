from sqlalchemy.orm import Session, joinedload
from models.Usuario import Usuario
from models.Paciente import Paciente
from schemas.Pacientes import PacienteCreate
from fastapi import HTTPException, status
from security.Hashing import hashear_password

def registrar_paciente(db: Session, paciente_data: PacienteCreate):
    usuario_db = Usuario(
        email=paciente_data.usuario.email,
        password_hash=hashear_password(paciente_data.usuario.password), # Hashear en producción
        nombre=paciente_data.usuario.nombre,
        apellido=paciente_data.usuario.apellido,
        telefono=paciente_data.usuario.telefono,
        rol="paciente"
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
    db.refresh(paciente_db)
    
    paciente_db.usuario = usuario_db
    return paciente_db

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


def listar_pacientes(db: Session):
    return (
        db.query(Paciente)
        .options(joinedload(Paciente.usuario))
        .filter(Paciente.activo == True)
        .all()
    )
