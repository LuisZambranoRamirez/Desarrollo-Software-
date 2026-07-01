from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.database import get_db
from schemas.Auth import LoginRequest, TokenResponse, UserProfileResponse
from services.AuthService import AuthService
from dependencies.AuthDependency import get_current_user
from models.Usuario import Usuario

router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    return AuthService.login(db, payload.email, payload.password)


@router.get("/me", response_model=UserProfileResponse)
def get_my_profile(current_user: Usuario = Depends(get_current_user)):
    return AuthService.get_profile(current_user)