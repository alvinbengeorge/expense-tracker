from jwt import encode, decode


def create_token(payload, secret):
    return encode(payload, secret, algorithm="HS256")


def read_token(token, secret):
    return decode(token, secret, algorithms=["HS256"])
