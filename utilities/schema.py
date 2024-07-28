from pydantic import BaseModel


class LoginSchema(BaseModel):
    username: str
    password: str


class CreateUserSchema(BaseModel):
    username: str
    password: str


class Expense(BaseModel):
    name: str
    amount: float
    timestamp: int
    category: str

class BudgetSchema(BaseModel):
    budget_name: str
    amount: float
    achieved_by: int
