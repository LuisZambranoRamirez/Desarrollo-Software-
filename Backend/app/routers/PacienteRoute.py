from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from config.database import get_db
from schemas.Pacientes import PacienteCreate, PacienteResponse
from services.PcienteService import registrar_paciente, buscar_paciente_por_telefono

router = APIRouter(prefix="/pacientes", tags=["Pacientes"])

@router.post("/", response_model=PacienteResponse, status_code=status.HTTP_201_CREATED)
def crear_paciente(paciente: PacienteCreate, db: Session = Depends(get_db)):
    return registrar_paciente(db, paciente)

@router.get("/buscar", response_model=PacienteResponse)
def buscar_por_telefono(telefono: str, db: Session = Depends(get_db)):
    return buscar_paciente_por_telefono(db, telefono)