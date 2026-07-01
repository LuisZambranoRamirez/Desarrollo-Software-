from sqlalchemy import (
    Column, Integer, BigInteger, String, Boolean, Text, TIMESTAMP,
    ForeignKey
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from config.database import Base


class PerfilFacial(Base):
    __tablename__ = "perfiles_faciales"

    id = Column(BigInteger, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id", ondelete="CASCADE"), nullable=False, unique=True)
    embedding_json = Column(Text, nullable=False)
    imagen_referencia = Column(Text)
    algoritmo = Column(String(100), default="face_recognition")
    version_modelo = Column(String(50))
    activo = Column(Boolean, default=True)
    fecha_registro = Column(TIMESTAMP, server_default=func.now())
    fecha_actualizacion = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    usuario = relationship("Usuario", back_populates="perfil_facial")