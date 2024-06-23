from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from utilities.database import Database
from routes import user, expenses

app = FastAPI()
db = Database()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user.router)
app.include_router(expenses.router)

@app.get("/")
async def read_root(req: Request):
    return {"Hello": "World"}
