from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from config.database import get_db
from schemas.Medicos import DoctorCreate, DoctorResponse
from services.MedicoService import registrar_doctor, listar_doctores

router = APIRouter(prefix="/doctores", tags=["Médicos"])

@router.get("/", response_model=list[DoctorResponse])
def obtener_doctores(db: Session = Depends(get_db)):
    return listar_doctores(db)


@router.post("/", response_model=DoctorResponse, status_code=status.HTTP_201_CREATED)
def crear_doctor(doctor: DoctorCreate, db: Session = Depends(get_db)):
    print("registro de doctor")
    return registrar_doctor(db, doctor)
