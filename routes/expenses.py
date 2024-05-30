from fastapi import APIRouter, Request
from utilities.database import Database
from utilities.response import JSONResponse
from utilities.middleware import middleware
from utilities.jwt import read_token

router = APIRouter()
db = Database()


@router.get("/expenses")
@middleware
async def get_expenses(req: Request):
    if not req.headers.get("Authorization"):
        return JSONResponse({"error": "No token provided"}, status_code=403)
    try:
        token_data = read_token(req.headers.get("Authorization"), secret=db.secret)
    except Exception as e:
        return JSONResponse({"error": "Invalid token"}, status_code=403)
    expenses = db.expenses.find({"user_id": token_data["id"]})
    return JSONResponse({"expenses": list(expenses)})
