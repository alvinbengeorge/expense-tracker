from functools import wraps
from dotenv import load_dotenv
from os import getenv

from fastapi import Request

load_dotenv()
SECRET = getenv("SECRET")


def middleware(func):
    @wraps(func)
    async def wrapper(req: Request, *args, **kwargs):
        print(req.headers.get("Authorization"))
        return await func(req, *args, **kwargs)

    return wrapper
