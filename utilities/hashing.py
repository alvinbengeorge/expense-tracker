from bcrypt import gensalt, hashpw, checkpw


def hash_password(password):
    return hashpw(password.encode("utf-8"), gensalt())


def check_password(password, hashed):
    return checkpw(password.encode("utf-8"), hashed)
