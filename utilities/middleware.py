from functools import wraps
from dotenv import load_dotenv
from os import getenv

from fastapi import Request

from utilities.jwt import read_token
from utilities.response import JSONResponse

load_dotenv()
SECRET = getenv("SECRET")

def middleware(func):
    @wraps(func)
    async def wrapper(req: Request, *args, **kwargs):
        if not req.headers.get("Authorization"):
            return JSONResponse({"error": "No token provided"}, status_code=403)
        try:
            read_token(req.headers.get("Authorization"), secret=SECRET)
        except Exception as e:
            return JSONResponse({"error": "Invalid token"}, status_code=403)

    return wrapper
