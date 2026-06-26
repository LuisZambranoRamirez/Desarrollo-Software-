from sqlalchemy import (
    Column, Integer, BigInteger, String, Text, TIMESTAMP,
    ForeignKey
)
from sqlalchemy.sql import func
from config.database import Base

class SesionAutenticacionFacial(Base):
    __tablename__ = "sesiones_autenticacion_facial"

    id = Column(BigInteger, primary_key=True, index=True)
    session_token = Column(String(120), nullable=False, unique=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id", ondelete="SET NULL"), nullable=True)
    challenge_type = Column(String(30), nullable=False)
    challenge_descripcion = Column(String(255))
    estado = Column(String(20), nullable=False, default="PENDING")
    ip_cliente = Column(String(50))
    user_agent = Column(Text)
    fecha_creacion = Column(TIMESTAMP, server_default=func.now())
    fecha_expiracion = Column(TIMESTAMP, nullable=False)
    fecha_uso = Column(TIMESTAMP, nullable=True)