from pydantic import BaseModel
from typing import Optional
from schemas.Usuarios import UsuarioCreate, UsuarioResponse

class DoctorCreate(BaseModel):
    usuario: UsuarioCreate
    especialidad_id: Optional[int] = None
    cedula_profesional: Optional[str] = None
    años_experiencia: Optional[int] = 0

class DoctorResponse(BaseModel):
    id: int
    usuario: UsuarioResponse
    cedula_profesional: Optional[str]
    años_experiencia: int

    class Config:
        from_attributes = True