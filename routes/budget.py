from fastapi import Request, APIRouter
from utilities.database import Database
from utilities.schema import BudgetSchema, EditBudgetSchema
from utilities.middleware import middleware
from utilities.response import JSONResponse
from utilities.jwt import read_token
from bson import ObjectId

router = APIRouter()
db = Database()


@router.get("/budget")
@middleware
async def get_budgets(req: Request):
    token_data = read_token(req.headers.get("Authorization"), secret=db.secret)
    budgets = db.budgets.find({"user_id": token_data["id"]})
    budgets = list(budgets)
    for i in range(len(budgets)):
        budgets[i]["_id"] = str(budgets[i]["_id"])
        budgets[i]["percentage"] = (budgets[i]["progress"] / budgets[i]["amount"]) * 100
    return JSONResponse({"budgets": budgets})


@router.post("/budget")
@middleware
async def create_budget(req: Request, budget: BudgetSchema):
    token_data = read_token(req.headers.get("Authorization"), secret=db.secret)
    budget = dict(budget)
    budget["user_id"] = token_data["id"]
    budget["progress"] = 0
    budget_result = db.budgets.insert_one(budget)
    return JSONResponse(
        {"message": "Budget created", "budget_id": str(budget_result.inserted_id)}
    )


@router.put("/budget/{budget_id}")
@middleware
async def update_budget(req: Request, budget_id: str, budget: EditBudgetSchema):
    token_data = read_token(req.headers.get("Authorization"), secret=db.secret)
    print(dict(budget))
    db.budgets.update_one(
        {"_id": ObjectId(budget_id), "user_id": token_data["id"]},
        {"$set": dict(budget)},
    )
    return JSONResponse({"message": "Budget updated"})


@router.delete("/budget/{budget_id}")
@middleware
async def delete_budget(req: Request, budget_id: str):
    token_data = read_token(req.headers.get("Authorization"), secret=db.secret)
    db.budgets.delete_one({"_id": ObjectId(budget_id), "user_id": token_data["id"]})
    return JSONResponse({"message": "Budget deleted"})
