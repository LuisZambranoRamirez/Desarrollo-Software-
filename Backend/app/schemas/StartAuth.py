from pydantic import BaseModel

class FaceAuthStartResponse(BaseModel):
    sessionToken: str
    challengeType: str
    message: str