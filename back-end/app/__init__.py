from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .config import Config

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)
    jwt.init_app(app)

    # Register routes
    from app.routes.auth_routes import auth_bp
    from app.routes.letter_routes import letter_bp
    from app.routes.music_routes import music_bp
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(letter_bp, url_prefix='/api')
    app.register_blueprint(music_bp, url_prefix='/api/music')

    return app
