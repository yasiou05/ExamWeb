from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import os
import uuid
from app.config import get_db_connection  # Adjust this import if needed
from flask import send_from_directory

music_bp = Blueprint('music_bp', __name__)
UPLOAD_FOLDER = 'uploads/music'
ALLOWED_EXTENSIONS = {'mp3', 'wav', 'ogg', 'flac', 'm4a'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@music_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_music():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    title = request.form.get('title', '')

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        ext = filename.rsplit('.', 1)[1].lower()
        unique_name = f"{uuid.uuid4()}.{ext}"
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        file_path = os.path.join(UPLOAD_FOLDER, unique_name)
        file.save(file_path)

        # Get user ID from JWT
        user_id = get_jwt_identity()

        # Save metadata to DB
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO songs (title, filename, path, user_id) VALUES (%s, %s, %s, %s)",
            (title or filename, unique_name, file_path, user_id)
        )
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Upload successful', 'filename': unique_name}), 201

    return jsonify({'error': 'Invalid file type'}), 400

@music_bp.route('/songs', methods=['GET'])
@jwt_required()
def get_user_songs():
    user_id = get_jwt_identity()

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id, title, filename, uploaded_at FROM songs WHERE user_id = %s ORDER BY uploaded_at DESC",
        (user_id,)
    )
    songs = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(songs), 200

@music_bp.route('/stream/<filename>', methods=['GET'])
def stream_music(filename):
    return send_from_directory(os.path.join(os.getcwd(), 'uploads/music'), filename)

@music_bp.route('/check-auth', methods=['GET'])
@jwt_required()
def check_auth():
    return {'status': 'valid'}, 200

@music_bp.route('/delete/<int:song_id>', methods=['DELETE'])
@jwt_required()
def delete_song(song_id):
    user_id = get_jwt_identity()
    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if the song exists and belongs to the user
    cursor.execute("SELECT filename, path, user_id FROM songs WHERE id = %s", (song_id,))
    song = cursor.fetchone()

    if not song:
        cursor.close()
        conn.close()
        return jsonify({'error': 'Song not found'}), 404

    if int(song['user_id']) != int(user_id):
        cursor.close()
        conn.close()
        return jsonify({'error': 'Unauthorized'}), 403

    # Delete the file from disk
    try:
        os.remove(song['path'])
    except FileNotFoundError:
        pass  # maybe already deleted, continue

    # Delete from DB
    cursor.execute("DELETE FROM songs WHERE id = %s", (song_id,))
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'message': 'Song deleted'}), 200