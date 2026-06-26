from sqlalchemy import Column, Integer, String, Boolean, DateTime, CheckConstraint, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
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

    login_facial_habilitado = Column(Boolean, default=False)
    ultimo_login_facial = Column(TIMESTAMP, nullable=True)

    perfil_facial = relationship("PerfilFacial", back_populates="usuario", uselist=False)


    __table_args__ = (
        CheckConstraint("rol IN ('admin', 'doctor', 'recepcionista', 'paciente')", name="usuarios_rol_check"),
    )