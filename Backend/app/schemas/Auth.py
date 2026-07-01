from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserTokenData(BaseModel):
    id: int
    email: str
    nombre: str
    apellido: str
    rol: str


class TokenResponse(BaseModel):
    accessToken: str
    tokenType: str = "bearer"
    user: UserTokenData

class UserProfileResponse(BaseModel):
    id: int
    email: str
    nombre: str
    apellido: str
    telefono: str | None = None
    rol: str
    activo: bool
    login_facial_habilitado: bool