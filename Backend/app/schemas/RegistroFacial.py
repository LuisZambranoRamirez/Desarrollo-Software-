from pydantic import BaseModel, Field

class FacialRegisterRequest(BaseModel):
    imageBase64: str


class FacialRegisterResponse(BaseModel):
    success: bool
    message: str
    usuarioId: int