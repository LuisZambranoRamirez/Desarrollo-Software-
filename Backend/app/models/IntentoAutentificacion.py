from sqlalchemy import (
    Column, Integer, BigInteger, String, Boolean, Text, TIMESTAMP,
    ForeignKey, Numeric
)
from sqlalchemy.sql import func
from config.database import Base

class IntentoAutenticacionFacial(Base):
    __tablename__ = "intentos_autenticacion_facial"

    id = Column(BigInteger, primary_key=True, index=True)
    sesion_id = Column(BigInteger, ForeignKey("sesiones_autenticacion_facial.id", ondelete="CASCADE"), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuarios.id", ondelete="SET NULL"), nullable=True)
    exito = Column(Boolean, nullable=False)
    distancia_coincidencia = Column(Numeric(10, 6), nullable=True)
    motivo_fallo = Column(String(255), nullable=True)
    cantidad_frames = Column(Integer, nullable=True)
    challenge_validado = Column(Boolean, default=False)
    liveness_validado = Column(Boolean, default=False)
    fecha_intento = Column(TIMESTAMP, server_default=func.now())
