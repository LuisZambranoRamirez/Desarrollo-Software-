from pydantic import BaseModel
from typing import Optional
from schemas.Usuarios import UsuarioCreate, UsuarioResponse


class AuthUserResponse(BaseModel):
    id: int
    email: str
    nombre: str
    apellido: str
    telefono: Optional[str] = None
    rol: str
    login_facial_habilitado: bool

    class Config:
        from_attributes = True

class DoctorDataResponse(BaseModel):
    id: int
    usuario: UsuarioResponse
    cedula_profesional: Optional[str]
    años_experiencia: int

    class Config:
        from_attributes = True
        
class DoctorCreate(BaseModel):
    usuario: UsuarioCreate
    especialidad_id: Optional[int] = None
    cedula_profesional: Optional[str] = None
    años_experiencia: Optional[int] = 0

class DoctorResponse(BaseModel):
    message: str
    accessToken: str
    tokenType: str
    user: AuthUserResponse
    doctor: DoctorDataResponse

    class Config:
        from_attributes = True