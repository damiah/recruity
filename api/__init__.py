from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

# from .config import config_by_name

db = SQLAlchemy()
flask_bcrypt = Bcrypt()