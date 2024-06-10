from fastapi import APIRouter, Request
from utilities.database import Database
from utilities.response import JSONResponse
from utilities.middleware import middleware
from utilities.jwt import read_token
from utilities.schema import Expense

router = APIRouter()
db = Database()

@router.get("/expenses")
@middleware
async def get_expenses(req: Request):
    token_data = read_token(req.headers.get("Authorization"), secret=db.secret)
    expenses = db.expenses.find({"user_id": token_data["id"]})
    return JSONResponse({"expenses": list(expenses)})

@router.post("/expenses")
@middleware
async def create_expense(req: Request, expense: Expense):
    token_data = read_token(req.headers.get("Authorization"), secret=db.secret)
    expense.user_id = token_data["id"]
    db.expenses.insert_one(dict(expense))
    return JSONResponse({"message": "Expense created"})

@router.delete("/expenses/{expense_id}")
@middleware
async def delete_expense(req: Request, expense_id: str):
    token_data = read_token(req.headers.get("Authorization"), secret=db.secret)
    db.expenses.delete_one({"_id": expense_id, "user_id": token_data["id"]})
    return JSONResponse({"message": "Expense deleted"})