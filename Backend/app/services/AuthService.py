from sqlalchemy.orm import Session
from models.Usuario import Usuario
from schemas.Auth import LoginRequest
from fastapi import HTTPException, status
from datetime import datetime
from security.Hashing import verificar_password

def login_user(db: Session, credentials: LoginRequest):
    usuario = db.query(Usuario).filter(Usuario.email == credentials.email).first()
    if not usuario:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales incorrectas")
    
    if not verificar_password(credentials.password, usuario.password_hash): 
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales incorrectas")
    
    if not usuario.activo:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Usuario inactivo")

    usuario.ultimo_acceso = datetime.now()
    db.commit()

    return {
        "access_token": f"token_simulado_para_{usuario.id}",
        "token_type": "bearer",
        "rol": usuario.rol
    }