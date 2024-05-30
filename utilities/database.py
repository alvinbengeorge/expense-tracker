from pymongo import MongoClient


class Database:
    def __init__(self, db_name: str, db_uri: str):
        self.client = MongoClient(db_uri)
        self.db = self.client[db_name]
