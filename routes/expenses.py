from bson import ObjectId
from fastapi import APIRouter, Request
from utilities.database import Database
from utilities.response import JSONResponse
from utilities.middleware import middleware
from utilities.jwt import read_token
from utilities.schema import Expense
from utilities.dates import get_current_month_timestamp

router = APIRouter()
db = Database()


@router.get("/expenses")
@middleware
async def get_expenses(req: Request):
    token_data = read_token(req.headers.get("Authorization"), secret=db.secret)
    expenses = db.expenses.find({"user_id": token_data["id"]})
    expenses = list(expenses)
    for i in range(len(expenses)):
        expenses[i]["_id"] = str(expenses[i]["_id"])
    return JSONResponse({"expenses": expenses})


@router.post("/expenses")
@middleware
async def create_expense(req: Request, expense: Expense):
    token_data = read_token(req.headers.get("Authorization"), secret=db.secret)
    expense = dict(expense)
    expense["user_id"] = token_data["id"]
    db.expenses.insert_one(expense)
    return JSONResponse({"message": "Expense created"})


@router.put("/expenses/{expense_id}")
@middleware
async def update_expense(req: Request, expense_id: str, expense: Expense):
    token_data = read_token(req.headers.get("Authorization"), secret=db.secret)
    db.expenses.update_one(
        {"_id": ObjectId(expense_id), "user_id": token_data["id"]},
        {"$set": dict(expense)},
    )
    return JSONResponse({"message": "Expense updated"})


@router.delete("/expenses/{expense_id}")
@middleware
async def delete_expense(req: Request, expense_id: str):
    token_data = read_token(req.headers.get("Authorization"), secret=db.secret)
    db.expenses.delete_one({"_id": ObjectId(expense_id), "user_id": token_data["id"]})
    return JSONResponse({"message": "Expense deleted"})


@router.get("/average")
@middleware
async def get_average(req: Request):
    token_data = read_token(req.headers.get("Authorization"), secret=db.secret)
    count = db.expenses.count_documents(
        {
            "user_id": token_data["id"],
            "timestamp": {"$gte": get_current_month_timestamp()},
        }
    )
    if count == 0:
        return JSONResponse({"average": 0, "total": 0, "count": 0})
    expenses = db.expenses.find(
        {
            "user_id": token_data["id"],
            "timestamp": {"$gte": get_current_month_timestamp()},
        }
    )
    total = sum(expense["amount"] for expense in expenses)

    return JSONResponse({"average": total / count, "total": total, "count": count})


@router.get("/category/{category}")
@middleware
async def get_category_expenses(req: Request, category: str = ""):
    token_data = read_token(req.headers.get("Authorization"), secret=db.secret)
    expenses = list(
        db.expenses.find(
            {
                "user_id": token_data["id"],
                "category": category,
            }
        )
    )
    for i in range(len(expenses)):
        expenses[i]["_id"] = str(expenses[i]["_id"])
    return JSONResponse({"expenses": expenses})


@router.get("/category/")
@middleware
async def get_categorywise(req: Request):
    token_data = read_token(req.headers.get("Authorization"), secret=db.secret)
    categories = db.expenses.distinct("category", {"user_id": token_data["id"]})
    data = {}
    for i in categories:
        expenses = list(db.expenses.find({"user_id": token_data["id"], "category": i}))
        total = sum(expense["amount"] for expense in expenses)
        for j in range(len(expenses)):
            expenses[j]["_id"] = str(expenses[j]["_id"])
        data[i] = {
            "total": total,
            "count": len(expenses),
            "average": total / len(expenses),
            "expenses": expenses,
        }
    return JSONResponse({"categories": data})
