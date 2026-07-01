from config.database import SessionLocal
from models.Usuario import Usuario
from models.Doctor import Doctor
from models.Paciente import Paciente
from models.PerfilFacial import PerfilFacial
from models.SesionAutentificacionFacial import SesionAutenticacionFacial
from models.IntentoAutentificacion import IntentoAutenticacionFacial
from models.FrameAutentificacion import FrameAutenticacionFacial
from security.Hashing import hashear_password

USERS = [
    {
        "email": "drcarlos@clinica.com",
        "password": "medico123",
        "nombre": "Carlos",
        "apellido": "López",
        "telefono": "999888777",
        "rol": "doctor",
        "doctor_data": {
            "especialidad_id": 1,
            "cedula_profesional": "CMP-12345",
            "años_experiencia": 10,
        },
    },
    {
        "email": "recepcion@clinica.com",
        "password": "recepcion123",
        "nombre": "María",
        "apellido": "García",
        "telefono": "999111222",
        "rol": "recepcionista",
    },
    {
        "email": "paciente@correo.com",
        "password": "paciente123",
        "nombre": "Juan",
        "apellido": "Pérez",
        "telefono": "999333444",
        "rol": "paciente",
        "paciente_data": {
            "fecha_nacimiento": "1990-05-15",
            "genero": "Masculino",
            "direccion": "Av. Central 123",
            "alergias": "Ninguna",
        },
    },
]


def seed():
    db = SessionLocal()
    try:
        for u in USERS:
            exists = db.query(Usuario).filter(Usuario.email == u["email"]).first()
            if exists:
                print(f"  Ya existe: {u['email']}")
                continue

            usuario = Usuario(
                email=u["email"],
                password_hash=hashear_password(u["password"]),
                nombre=u["nombre"],
                apellido=u["apellido"],
                telefono=u.get("telefono"),
                rol=u["rol"],
                activo=True,
            )
            db.add(usuario)
            db.flush()

            if u["rol"] == "doctor" and "doctor_data" in u:
                d = u["doctor_data"]
                doctor = Doctor(
                    usuario_id=usuario.id,
                    especialidad_id=d["especialidad_id"],
                    cedula_profesional=d["cedula_profesional"],
                    años_experiencia=d["años_experiencia"],
                )
                db.add(doctor)

            if u["rol"] == "paciente" and "paciente_data" in u:
                p = u["paciente_data"]
                paciente = Paciente(
                    usuario_id=usuario.id,
                    fecha_nacimiento=p["fecha_nacimiento"],
                    genero=p["genero"],
                    direccion=p["direccion"],
                    alergias=p["alergias"],
                )
                db.add(paciente)

            db.commit()
            print(f"  Creado: {u['email']} ({u['rol']})")

        print("\nSeed completado. Usuarios creados:")
        for u in USERS:
            print(f"  {u['email']} / {u['password']} ({u['rol']})")
    except Exception as e:
        db.rollback()
        print(f"Error: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
