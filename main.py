from fastapi import FastAPI
from dotenv import load_dotenv
from utilities.database import Database

import os

load_dotenv()
app = FastAPI()
db = Database(os.getenv("DB_NAME"), os.getenv("DB_URI"))


@app.get("/")
def read_root():
    return {"Hello": "World"}
