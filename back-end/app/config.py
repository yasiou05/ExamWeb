import os
from dotenv import load_dotenv
load_dotenv()
import pymysql

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{os.getenv('MYSQL_USER')}:"
        f"{os.getenv('MYSQL_PASSWORD')}@"
        f"{os.getenv('MYSQL_HOST')}/"
        f"{os.getenv('MYSQL_DB')}"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

# ✅ Add this function below the Config class
def get_db_connection():
    connection = pymysql.connect(
        host=os.getenv('MYSQL_HOST'),
        user=os.getenv('MYSQL_USER'),
        password=os.getenv('MYSQL_PASSWORD'),
        database=os.getenv('MYSQL_DB'),
        cursorclass=pymysql.cursors.DictCursor  # Optional: return rows as dicts
    )
    return connection