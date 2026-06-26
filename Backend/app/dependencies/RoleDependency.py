from fastapi import Depends, HTTPException, status
from dependencies.AuthDependency import get_current_user
from models.Usuario import Usuario


def require_roles(*allowed_roles):
    def role_checker(current_user: Usuario = Depends(get_current_user)):
        if current_user.rol not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permisos para acceder a este recurso."
            )
        return current_user

    return role_checker