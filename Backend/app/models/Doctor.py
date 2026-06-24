from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from config.database import Base
from sqlalchemy.orm import relationship 
class Doctor(Base):
    __tablename__ = "doctores"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id", ondelete="CASCADE"), unique=True, nullable=False)
    especialidad_id = Column(Integer, nullable=True)
    cedula_profesional = Column(String(50), unique=True, nullable=True)
    años_experiencia = Column(Integer, default=0)
    activo = Column(Boolean, default=True)

    usuario = relationship("Usuario")