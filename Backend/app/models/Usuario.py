from sqlalchemy import Column, Integer, String, Boolean, DateTime, CheckConstraint
from sqlalchemy.sql import func
from config.database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(150), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    nombre = Column(String(100), nullable=False)
    apellido = Column(String(100), nullable=False)
    telefono = Column(String(20), nullable=True)
    rol = Column(String(50), nullable=False)
    activo = Column(Boolean, default=True)
    fecha_creacion = Column(DateTime, default=func.now())
    ultimo_acceso = Column(DateTime, nullable=True)

    __table_args__ = (
        CheckConstraint("rol IN ('admin', 'doctor', 'recepcionista', 'paciente')", name="usuarios_rol_check"),
    )