# Levantar el proyecto

## Paso 1: Instalar soporte de entornos en Debian
Asegúrate de tener todas las herramientas necesarias ejecutando en tu terminal:

```bash
sudo apt update && sudo apt install python3-venv python3-full -y
```

## Paso 2: Crear el entorno virtual
Ubícate en la carpeta de tu proyecto (`~/Escritorio/Desarrollo-Software-/Backend/app`) y crea el entorno ejecutando:

```bash
python3 -m venv venv
```

## Paso 3: Activar el entorno virtual
Levanta el entorno para indicarle a la terminal que use el `pip` aislado:

```bash
source venv/bin/activate
```
*Nota: Sabrás que funcionó porque tu terminal ahora empezará con el indicador `(venv)`.*

## Paso 4: Instalar las librerías del proyecto
Ahora que estás dentro del entorno protegido, ejecuta tu comando de instalación:

```bash
pip install -r requirements.txt
```

## Paso 5: Levantar el proyecto

```bash
uvicorn main:app --reload
```

## Comandos Útiles de Referencia

* **Desactivar el entorno:** Cuando termines de trabajar, puedes cerrarlo escribiendo:
  ```bash
  deactivate
  ```
* **Volver a activar el entorno:** Cada vez que abras una nueva terminal para trabajar en este proyecto, solo debes situarte en la carpeta y ejecutar:
  ```bash
  source venv/bin/activate
  ```
