import bcrypt

def hashear_password(password: str) -> str:
    
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hash_bytes = bcrypt.hashpw(password_bytes, salt)
    return hash_bytes.decode('utf-8')

def verificar_password(password_plana: str, password_hasheada: str) -> bool:

    return bcrypt.checkpw(
        password_plana.encode('utf-8'),
        password_hasheada.encode('utf-8')
    )