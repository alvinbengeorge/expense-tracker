from pymongo import MongoClient

import os


class Database:
    def __init__(self):
        db_name, db_uri = os.getenv("DB_NAME"), os.getenv("DB_URI")
        self.secret = os.getenv("SECRET")
        self.client = MongoClient(db_uri)
        self.db = self.client[db_name]
        self.users = self.db.users
        self.expenses = self.db.expenses

    def __del__(self):
        self.client.close()
