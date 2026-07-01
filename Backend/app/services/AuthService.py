from sqlalchemy.orm import Session
from models.Usuario import Usuario
from schemas.Auth import LoginRequest, UserProfileResponse
from fastapi import HTTPException, status
from datetime import datetime
from security.security import verify_password, create_access_token
from schemas.Auth import TokenResponse, UserTokenData

class AuthService:

    @staticmethod
    def login(db: Session, email: str, password: str) -> TokenResponse:
        usuario = db.query(Usuario).filter(Usuario.email == email).first()

        if not usuario:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciales inválidas."
            )

        if not usuario.activo:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="El usuario está inactivo."
            )

        if not verify_password(password, usuario.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciales inválidas."
            )

        token_payload = {
            "sub": str(usuario.id),
            "email": usuario.email,
            "rol": usuario.rol,
            "nombre": usuario.nombre,
            "apellido": usuario.apellido
        }

        access_token = create_access_token(token_payload)

        return TokenResponse(
            accessToken=access_token,
            user=UserTokenData(
                id=usuario.id,
                email=usuario.email,
                nombre=usuario.nombre,
                apellido=usuario.apellido,
                rol=usuario.rol
            )
        )

    @staticmethod
    def get_profile(usuario: Usuario) -> UserProfileResponse:
        return UserProfileResponse(
            id=usuario.id,
            email=usuario.email,
            nombre=usuario.nombre,
            apellido=usuario.apellido,
            telefono=usuario.telefono,
            rol=usuario.rol,
            activo=usuario.activo,
            login_facial_habilitado=usuario.login_facial_habilitado,
        )