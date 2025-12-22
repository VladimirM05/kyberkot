# Используем Python 3.14
FROM python:3.14-slim

# Устанавливаем рабочую папку
WORKDIR /app

# Копируем файлы проекта
COPY . /app/

# Устанавливаем зависимости
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Открываем порт для сервера
EXPOSE 8000

# Команда по умолчанию
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
