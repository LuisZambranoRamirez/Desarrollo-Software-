from sqlalchemy.orm import Session, joinedload
from models.Usuario import Usuario
from models.Doctor import Doctor
from schemas.Medicos import DoctorCreate
from security.Hashing import hashear_password

def registrar_doctor(db: Session, doctor_data: DoctorCreate):
    usuario_db = Usuario(
        email=doctor_data.usuario.email,
        password_hash=hashear_password(doctor_data.usuario.password), 
        nombre=doctor_data.usuario.nombre,
        apellido=doctor_data.usuario.apellido,
        telefono=doctor_data.usuario.telefono,
        rol="doctor"
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
    db.refresh(doctor_db)
    
    doctor_db.usuario = usuario_db
    return doctor_db


def listar_doctores(db: Session):
    return (
        db.query(Doctor)
        .options(joinedload(Doctor.usuario))
        .filter(Doctor.activo == True)
        .all()
    )
