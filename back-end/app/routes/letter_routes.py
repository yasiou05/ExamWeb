from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Letter, User
from app import db

letter_bp = Blueprint('letters', __name__)

# Get all letters (only for logged-in users)
@letter_bp.route('/letters', methods=['GET'])
@jwt_required()
def get_letters():
    current_user_id = get_jwt_identity()
    letters = Letter.query.filter_by(author_id=current_user_id).all()
    return jsonify([
        {
            "id": letter.id,
            "content": letter.content,
            "created_at": letter.created_at
        } for letter in letters
    ]), 200

# Add a new letter
@letter_bp.route('/letters', methods=['POST'])
@jwt_required()
def create_letter():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    content = data.get('content')
    if not content:
        return jsonify({"error": "Content is required"}), 400

    new_letter = Letter(content=content, author_id=current_user_id)
    db.session.add(new_letter)
    db.session.commit()

    return jsonify({"message": "Letter saved!"}), 201

@letter_bp.route('/letters/<int:letter_id>', methods=['DELETE'])
@jwt_required()
def delete_letter(letter_id):
    current_user_id = get_jwt_identity()

    letter = Letter.query.get(letter_id)
    if not letter:
        return jsonify({"error": "Letter not found"}), 404

    # 🔐 Ensure type match
    if int(letter.author_id) != int(current_user_id):
        return jsonify({"error": "Not authorized to delete this letter"}), 403

    db.session.delete(letter)
    db.session.commit()
    return jsonify({"message": "Letter deleted successfully"}), 200

@letter_bp.route('/letters/<int:letter_id>', methods=['PUT'])
@jwt_required()
def update_letter(letter_id):
    current_user_id = get_jwt_identity()
    letter = Letter.query.get(letter_id)

    if not letter:
        return jsonify({"error": "Letter not found"}), 404

    if int(letter.author_id) != int(current_user_id):
        return jsonify({"error": "Not authorized to edit this letter"}), 403

    data = request.get_json()
    new_content = data.get("content")
    if not new_content:
        return jsonify({"error": "Content is required"}), 400

    letter.content = new_content
    db.session.commit()

    return jsonify({"message": "Letter updated successfully"}), 200

