from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles 
from config.database import engine, Base
from routers import AuthRoute, MedicoRoute, PacienteRoute, FacialRoute, WebSocketRoute
from seed import run_seed

# Crear las tablas en la BD si no existen (en producción se recomienda usar Alembic)
Base.metadata.create_all(bind=engine)

# Si la BD está vacía, insertar datos iniciales automáticamente
run_seed()

app = FastAPI(
    title="API REST Clínica Biométrica Facial",
    description="Endpoints requeridos para gestión de usuarios, autenticación y búsquedas",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # luego lo restringes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusión de Routers
app.include_router(AuthRoute.router)
app.include_router(MedicoRoute.router)
app.include_router(PacienteRoute.router)
app.include_router(FacialRoute.router)
app.include_router(WebSocketRoute.router)
@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API de la Clínica Biométrica Facial"}
