from pydantic import BaseModel
from typing import Optional
from datetime import date
from schemas.Usuarios import UsuarioCreate, UsuarioResponse

class PacienteCreate(BaseModel):
    usuario: UsuarioCreate
    fecha_nacimiento: Optional[date] = None
    genero: Optional[str] = None
    direccion: Optional[str] = None
    alergias: Optional[str] = None

class PacienteResponse(BaseModel):
    id: int
    usuario: UsuarioResponse
    fecha_nacimiento: Optional[date]
    genero: Optional[str]
    direccion: Optional[str]
    alergias: Optional[str]

    class Config:
        from_attributes = True