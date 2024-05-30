from fastapi import APIRouter
from utilities.database import Database
from utilities.schema import LoginSchema, CreateUserSchema
from utilities.hashing import hash_password, check_password
from utilities.response import JSONResponse
from utilities.jwt import create_token, read_token

router = APIRouter()
db = Database()


@router.post("/create_user")
async def create_user(user: CreateUserSchema):
    if db.users.find_one({"username": user.username}):
        return JSONResponse({"error": "User already exists"}, status_code=400)
    db.users.insert_one(
        {"username": user.username, "password": hash_password(user.password).decode()}
    )
    return JSONResponse({"message": "User created"})


@router.post("/login")
async def login(user: LoginSchema):
    user_data = db.users.find_one({"username": user.username})
    if not user_data:
        return JSONResponse({"error": "User does not exist"}, status_code=404)
    if not check_password(user.password, user_data["password"]):
        return JSONResponse({"error": "Invalid password"}, status_code=403)
    token = create_token(
        {
            "username": user.username,
            "password": user_data["password"],
            "id": str(user_data["_id"]),
        },
        secret=db.secret,
    )
    return JSONResponse({"token": str(token), "message": "Login validated"})
