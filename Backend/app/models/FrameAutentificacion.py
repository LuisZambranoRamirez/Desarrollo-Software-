from sqlalchemy import (
    Column, Integer, BigInteger, String, Boolean, TIMESTAMP,
    ForeignKey, Numeric
)
from sqlalchemy.sql import func
from config.database import Base

class FrameAutenticacionFacial(Base):
    __tablename__ = "frames_autenticacion_facial"

    id = Column(BigInteger, primary_key=True, index=True)
    sesion_id = Column(BigInteger, ForeignKey("sesiones_autenticacion_facial.id", ondelete="CASCADE"), nullable=False)
    numero_frame = Column(Integer, nullable=False)
    timestamp_cliente = Column(BigInteger, nullable=True)
    rostro_detectado = Column(Boolean, default=False)
    cantidad_rostros = Column(Integer, default=0)
    calidad_frame = Column(Numeric(10, 4), nullable=True)
    ruta_imagen_temporal = Column(String(255), nullable=True)
    fecha_registro = Column(TIMESTAMP, server_default=func.now())