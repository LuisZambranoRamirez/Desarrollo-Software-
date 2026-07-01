from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from config.database import get_db
from schemas.RegistroFacial import FacialRegisterRequest, FacialRegisterResponse, FacialRegisterForUserRequest
from schemas.StartAuth import FaceAuthStartResponse
from schemas.VerifyAuth import FaceAuthVerifyRequest, FaceAuthVerifyResponse
from services.FaceService import FaceService
from dependencies.RoleDependency import get_current_user, require_roles
from models.Usuario import Usuario

router = APIRouter(prefix="/api", tags=["Facial Auth"])


@router.get("/facial/reference-image")
def get_reference_image(
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    image = FaceService.get_reference_image(db, current_user.id)
    if not image:
        raise HTTPException(status_code=404, detail="No hay imagen de referencia.")
    return JSONResponse(content={"imageBase64": image})


@router.post("/facial/register", response_model=FacialRegisterResponse)
def register_face(
    payload: FacialRegisterRequest,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        usuario = FaceService.register_face(
            db=db,
            usuario_id=current_user.id,
            image_base64=payload.imageBase64
        )

        return FacialRegisterResponse(
            success=True,
            message="Perfil facial registrado correctamente.",
            usuarioId=usuario.id
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/facial/register-for-user", response_model=FacialRegisterResponse)
def register_face_for_user(
    payload: FacialRegisterForUserRequest,
    current_user: Usuario = Depends(require_roles("admin", "recepcionista")),
    db: Session = Depends(get_db)
):
    try:
        usuario = FaceService.register_face(
            db=db,
            usuario_id=payload.usuario_id,
            image_base64=payload.imageBase64
        )
        return FacialRegisterResponse(
            success=True,
            message="Perfil facial registrado correctamente.",
            usuarioId=usuario.id
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/face-auth/start", response_model=FaceAuthStartResponse)
def start_face_auth(request: Request, db: Session = Depends(get_db)):
    try:
        ip_cliente = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")

        session = FaceService.start_face_auth(
            db=db,
            ip_cliente=ip_cliente,
            user_agent=user_agent
        )

        return FaceAuthStartResponse(
            sessionToken=session.session_token,
            challengeType=session.challenge_type,
            message=session.challenge_descripcion
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/face-auth/verify", response_model=FaceAuthVerifyResponse)
def verify_face_auth(payload: FaceAuthVerifyRequest, db: Session = Depends(get_db)):
    try:
        result = FaceService.verify_face_auth(
            db=db,
            session_token=payload.sessionToken,
            frames=payload.frames
        )

        return FaceAuthVerifyResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))