Домашнее задание 8. Методы:

Получение всех пользователей:
GET /allUser

Создание нового пользователя:
POST /newUser?name=${name}

Удаление пользователя:
DELETE /deleteUser?id=${id}

Получение всех сообщений:
GET /allMessage

Создание нового сообщения:
POST /newMessage?idUser=${idUser}&userName=${userName}&message=${message}

Адрес сервера:
https://ahj-hw8.herokuapp.com/