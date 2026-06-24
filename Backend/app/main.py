from fastapi import FastAPI
from config.database import engine, Base
from routers import AuthRoute, MedicoRoute, PacienteRoute

# Crear las tablas en la BD si no existen (en producción se recomienda usar Alembic)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API REST Clínica Biométrica Facial",
    description="Endpoints requeridos para gestión de usuarios, autenticación y búsquedas",
    version="1.0.0"
)

# Inclusión de Routers
app.include_router(AuthRoute.router)
app.include_router(MedicoRoute.router)
app.include_router(PacienteRoute.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API de la Clínica Biométrica Facial"}