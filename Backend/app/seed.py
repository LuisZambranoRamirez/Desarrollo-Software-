from datetime import date
from sqlalchemy import text
from config.database import engine, Base, SessionLocal
from security.Hashing import hashear_password


def run_seed():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        count = db.execute(text("SELECT COUNT(*) FROM usuarios")).scalar()
        if count > 0:
            print(f"Seed: BD ya tiene {count} usuarios, se omite.")
            return

        # Admin
        db.execute(
            text("INSERT INTO usuarios (email, password_hash, nombre, apellido, telefono, rol, activo, login_facial_habilitado) "
                 "VALUES (:email, :pw, :nom, :ape, :tel, :rol, true, false) RETURNING id"),
            {"email": "admin@clinica.com", "pw": hashear_password("Admin2024*"), "nom": "Admin", "ape": "Sistema", "tel": "+51 999 000 000", "rol": "admin"}
        )
        db.commit()
        print("Seed: admin@clinica.com / Admin2024*")

        # Recepcionista
        db.execute(
            text("INSERT INTO usuarios (email, password_hash, nombre, apellido, telefono, rol, activo, login_facial_habilitado) "
                 "VALUES (:email, :pw, :nom, :ape, :tel, :rol, true, false) RETURNING id"),
            {"email": "recepcion@clinica.com", "pw": hashear_password("Medico2024*"), "nom": "Maria", "ape": "Garcia", "tel": "+51 999 111 222", "rol": "recepcionista"}
        )
        db.commit()
        print("Seed: recepcion@clinica.com / Medico2024*")

        # Oscar Quizpe
        r = db.execute(
            text("INSERT INTO usuarios (email, password_hash, nombre, apellido, telefono, rol, activo, login_facial_habilitado) "
                 "VALUES (:email, :pw, :nom, :ape, :tel, :rol, true, false) RETURNING id"),
            {"email": "oscarquizpe@gmail.com", "pw": hashear_password("oscar123"), "nom": "Oscar", "ape": "Quizpe", "tel": "+51 915 694 564", "rol": "doctor"}
        )
        uid = r.fetchone()[0]
        db.execute(
            text("INSERT INTO doctores (usuario_id, especialidad_id, cedula_profesional, años_experiencia, activo) "
                 "VALUES (:uid, 1, :ced, 3, true)"),
            {"uid": uid, "ced": "42342342"}
        )
        db.commit()
        print("Seed: oscarquizpe@gmail.com / oscar123")

        # Pacientes
        pacientes = [
            ("ana.torres@gmail.com", "Ana", "Torres", "+51 987 654 321", date(1988, 3, 12), "Femenino"),
            ("pedro.quispe@gmail.com", "Pedro", "Quispe", "+51 987 654 322", date(1992, 7, 25), "Masculino"),
            ("luz.ramos@gmail.com", "Luz", "Ramos", "+51 987 654 323", date(1975, 11, 8), "Femenino"),
            ("jorge.silva@gmail.com", "Jorge", "Silva", "+51 987 654 324", date(1995, 1, 30), "Masculino"),
            ("maria.luna@gmail.com", "Maria", "Luna", "+51 987 654 325", date(2000, 6, 14), "Femenino"),
        ]
        for email, nom, ape, tel, fnac, gen in pacientes:
            r = db.execute(
                text("INSERT INTO usuarios (email, password_hash, nombre, apellido, telefono, rol, activo, login_facial_habilitado) "
                     "VALUES (:email, :pw, :nom, :ape, :tel, :rol, true, false) RETURNING id"),
                {"email": email, "pw": hashear_password("Paciente2025*"), "nom": nom, "ape": ape, "tel": tel, "rol": "paciente"}
            )
            uid = r.fetchone()[0]
            db.execute(
                text("INSERT INTO pacientes (usuario_id, fecha_nacimiento, genero, activo) VALUES (:uid, :fn, :gen, true)"),
                {"uid": uid, "fn": fnac, "gen": gen}
            )
            db.commit()
            print(f"Seed: {nom} {ape} ({email})")

        print("Seed completado.")

    except Exception as e:
        db.rollback()
        print(f"Seed error: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    run_seed()
