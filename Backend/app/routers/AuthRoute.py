from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from config.database import get_db
from schemas.Auth import LoginRequest, LoginResponse
from services.AuthService import login_user

router = APIRouter(prefix="/auth", tags=["Autenticación"])

@router.post("/login", response_model=LoginResponse)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    return login_user(db, credentials)