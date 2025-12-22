"""Хранит Enum со сложностью курса."""

from enum import Enum


class CourseDifficulty(Enum):
    """Сложность курсов."""

    HARD = "hard", "Сложный"
    MEDIUM = "medium", "Средний"
    EASY = "easy", "Легкий"
    UNKNOWN = "unknown", "Не задан"

    @staticmethod
    def choices() -> tuple[tuple[str, str], ...]:
        """Возвращает кортеж типов сложности курса."""
        return tuple(choice.value for choice in CourseDifficulty)

    @staticmethod
    def default() -> str:
        """Возваращет дефолдную сложность курса."""
        return CourseDifficulty.UNKNOWN.value[0]
