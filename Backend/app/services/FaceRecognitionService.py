import json
import cv2
import numpy as np
from utils.images import decode_base64_image


class FaceRecognitionService:

    @staticmethod
    def get_face_encoding_from_base64(image_base64: str):
        image = decode_base64_image(image_base64)

        if image is None:
            raise ValueError("No se pudo decodificar la imagen.")

        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)

        if len(faces) == 0:
            raise ValueError("No se detectó ningún rostro en la imagen.")

        if len(faces) > 1:
            raise ValueError("Se detectaron múltiples rostros. Solo debe haber uno.")

        x, y, w, h = faces[0]
        face_roi = gray[y:y+h, x:x+w]
        face_resized = cv2.resize(face_roi, (64, 64))

        encoding = face_resized.flatten().astype(np.float64)
        encoding = encoding / np.linalg.norm(encoding)

        return encoding, len(faces)

    @staticmethod
    def serialize_encoding(encoding: np.ndarray) -> str:
        return json.dumps(encoding.tolist())

    @staticmethod
    def deserialize_encoding(encoding_json: str) -> np.ndarray:
        return np.array(json.loads(encoding_json), dtype=np.float64)

    @staticmethod
    def compare_encodings(known_encodings, candidate_encoding):
        similarities = [np.dot(candidate_encoding, known) for known in known_encodings]
        best_index = int(np.argmax(similarities))
        best_distance = float(1 - similarities[best_index])
        return best_index, best_distance
