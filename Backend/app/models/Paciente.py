from sqlalchemy import Column, Integer, String, Boolean, Date, Text, ForeignKey
from config.database import Base
from sqlalchemy.orm import relationship 
class Paciente(Base):
    __tablename__ = "pacientes"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id", ondelete="CASCADE"), unique=True, nullable=False)
    fecha_nacimiento = Column(Date, nullable=True)
    genero = Column(String(20), nullable=True)
    direccion = Column(Text, nullable=True)
    alergias = Column(Text, nullable=True)
    activo = Column(Boolean, default=True)

    usuario = relationship("Usuario")