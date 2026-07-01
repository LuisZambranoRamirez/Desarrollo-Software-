# Clinica SaludTotal

Sistema de gestion clinica con autenticacion biometrica facial, disenado para administrar pacientes, medicos, citas y operaciones de call center.

## Stack tecnologico

- **Backend:** FastAPI (Python 3.14), SQLAlchemy, PostgreSQL
- **Frontend:** React 19, Vite 8, Tailwind CSS 4, React Router 7
- **Autenticacion facial:** OpenCV (Haar Cascade), reconocimiento basado en encoding de pixeles

## Requisitos

- Python 3.14+
- Node.js 20+
- PostgreSQL 15+
- npm 10+

## Configuracion inicial

### 1. Clonar el repositorio

```bash
git clone <repo-url>
cd Desarrollo-Software-
```

### 2. Base de datos

Crear la base de datos en PostgreSQL:

```bash
psql -U postgres -c "CREATE DATABASE clinica;"
```

### 3. Backend

```bash
cd Backend/app

# Crear entorno virtual
python -m venv venv

# Activar (Windows)
.\venv\Scripts\activate

# Activar (Linux/Mac)
# source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt
```

Configurar archivo `.env` en `Backend/app/`:

```env
DATABASE_URL=postgresql://postgres:tu_contraseña@localhost:5432/clinica
SECRET_KEY=una_clave_secreta_segura
```

Iniciar el servidor:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

El backend crea automaticamente las tablas y los datos iniciales si la base de datos esta vacia.

### 4. Frontend

```bash
cd Frontend/clinica-front

npm install

npm run dev
```

La aplicacion se abrira en `http://localhost:5173`.

## Usuarios predefinidos

| Rol | Email | Contrasena |
|-----|-------|-----------|
| Recepcionista | recepcion@clinica.com | Medico2024* |
| Medico | oscarquizpe@gmail.com | oscar123 |
| Paciente | ana.torres@gmail.com | Paciente2025* |
| Paciente | pedro.quispe@gmail.com | Paciente2025* |
| Paciente | luz.ramos@gmail.com | Paciente2025* |
| Paciente | jorge.silva@gmail.com | Paciente2025* |
| Paciente | maria.luna@gmail.com | Paciente2025* |

> El medico Oscar Quizpe tiene cedula profesional: **42342342**

## Flujo de uso

### Recepcionista

1. Iniciar sesion en `/login-paciente` con `recepcion@clinica.com`
2. Accede al dashboard de call center automaticamente
3. Puede gestionar pacientes, citas y crear nuevos medicos desde la seccion "Medicos"

### Medico

1. Iniciar sesion en `/login-medico` con `oscarquizpe@gmail.com`
2. Puede usar autenticacion por correo/contrasena o reconocimiento facial
3. Para activar el login facial, debe registrar su rostro desde "Mi Perfil"
4. Accede a pacientes, agenda, historial clinico y reportes

### Paciente

1. Iniciar sesion en `/login-paciente`
2. Puede registrarse desde la misma pagina si no tiene cuenta
3. Accede a citas, historial medico y resultados

## Autenticacion facial

El sistema permite a los medicos iniciar sesion mediante reconocimiento facial. El flujo es:

1. El medico registra su rostro desde la seccion "Reconocimiento Facial" en su perfil
2. El sistema captura la imagen, extrae el encoding facial y lo almacena en la base de datos
3. En el login, el medico selecciona "Iniciar con reconocimiento facial"
4. La camara captura 5 fotogramas para verificar la identidad
5. Si la coincidencia supera el umbral configurado, se concede el acceso

## Registro de medicos (solo recepcionista)

Los medicos no pueden auto-registrarse. El recepcionista debe crear sus cuentas desde el panel de call center, seccion "Medicos" > "Crear Medico". Opcionalmente puede capturar una foto para el registro facial.

## Estructura del proyecto

```
Backend/app/
  config/         - Configuracion de BD y variables de entorno
  dependencies/   - Dependencias de autenticacion y roles
  models/         - Modelos SQLAlchemy (Usuario, Doctor, Paciente, PerfilFacial)
  routers/        - Endpoints de la API (Auth, Medico, Paciente, Facial, WebSocket)
  schemas/        - Esquemas Pydantic para validacion
  security/       - Hashing de passwords y JWT
  services/       - Logica de negocio (Auth, Face, Medico, Paciente)
  utils/          - Utilidades (decodificacion de imagenes)
  main.py         - Punto de entrada de la aplicacion
  seed.py         - Datos iniciales (se ejecuta automaticamente si la BD esta vacia)

Frontend/clinica-front/src/
  components/     - Componentes reutilizables (Sidebar, Card, Button, Input, etc.)
  context/        - Contextos de React (Auth, Realtime)
  data/           - Datos mock para desarrollo
  pages/          - Paginas organizadas por rol (public, paciente, medico, callcenter)
  services/       - Servicios API y facial
```

## API endpoints principales

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| POST | /api/auth/login | Inicio de sesion |
| GET | /api/auth/me | Perfil del usuario autenticado |
| POST | /pacientes/ | Registrar paciente |
| GET | /pacientes/ | Listar pacientes |
| POST | /doctores/ | Registrar medico |
| GET | /doctores/ | Listar medicos |
| POST | /api/facial/register | Registrar rostro (autenticado) |
| POST | /api/facial/register-for-user | Registrar rostro para otro usuario (admin/recepcionista) |
| GET | /api/facial/reference-image | Obtener imagen de referencia facial |
| POST | /api/face-auth/start | Iniciar sesion facial |
| POST | /api/face-auth/verify | Verificar frames faciales |
| WS | /ws/status | WebSocket para estado en tiempo real |

## Notas

- El WebSocket se conecta automaticamente desde el frontend para mostrar el estado del call center
- La autenticacion facial usa OpenCV Haar Cascade para deteccion de rostros y comparacion por similitud coseno
- El seed de datos se ejecuta solo una vez, cuando la tabla de usuarios esta vacia
