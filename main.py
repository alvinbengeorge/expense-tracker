from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from utilities.database import Database
from routes import user

load_dotenv()
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


@app.get("/")
def read_root():
    return {"Hello": "World"}
