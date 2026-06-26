import json
import cv2
import numpy as np
import face_recognition
from utils.images import decode_base64_image


class FaceRecognitionService:

    @staticmethod
    def get_face_encoding_from_base64(image_base64: str):
        """
        Recibe una imagen en base64, detecta el rostro y devuelve:
        - encoding facial
        - cantidad de rostros detectados
        """
        image = decode_base64_image(image_base64)

        if image is None:
            raise ValueError("No se pudo decodificar la imagen.")

        # face_recognition trabaja mejor en RGB
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        face_locations = face_recognition.face_locations(rgb_image)
        if len(face_locations) == 0:
            raise ValueError("No se detectó ningún rostro en la imagen.")

        if len(face_locations) > 1:
            raise ValueError("Se detectaron múltiples rostros. Solo debe haber uno.")

        face_encodings = face_recognition.face_encodings(rgb_image, face_locations)

        if not face_encodings:
            raise ValueError("No se pudo generar el embedding facial.")

        return face_encodings[0], len(face_locations)

    @staticmethod
    def serialize_encoding(encoding: np.ndarray) -> str:
        return json.dumps(encoding.tolist())

    @staticmethod
    def deserialize_encoding(encoding_json: str) -> np.ndarray:
        return np.array(json.loads(encoding_json), dtype=np.float64)

    @staticmethod
    def compare_encodings(known_encodings, candidate_encoding):
        """
        Retorna:
        - índice del mejor match
        - distancia mínima
        """
        distances = face_recognition.face_distance(known_encodings, candidate_encoding)
        best_index = int(np.argmin(distances))
        best_distance = float(distances[best_index])
        return best_index, best_distance