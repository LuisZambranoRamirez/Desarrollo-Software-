from pydantic import BaseModel, Field
from typing import List, Optional

class FrameRequest(BaseModel):
    imageBase64: str
    timestamp: Optional[int] = None

class FaceAuthVerifyRequest(BaseModel):
    sessionToken: str
    frames: List[FrameRequest] = Field(min_length=1)

class FaceAuthUserResponse(BaseModel):
    id: int
    email: str
    nombre: str
    apellido: str
    rol: str

class FaceAuthVerifyResponse(BaseModel):
    authenticated: bool
    message: str
    accessToken: str
    tokenType: str
    userId: Optional[int] = None
    fullName: Optional[str] = None
    role: Optional[str] = None