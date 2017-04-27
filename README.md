# HTTP Server

yarn install
yarn start
yarn test

Для тестов решил попробовать jest, но proxyquire с [jest не работает](https://github.com/facebook/jest/issues/1937)

Когда нужно было мокать, или делать spy, на этом остановился.


## Уровень сложности 1

## http-server
Реализовать (без использования модуля http) собственными средствами примитивный http-сервер.

Код, который демонстрирует использование нашего HTTP-сервера:
https://gist.github.com/xanf/fb7f1018fa7700ecf510f99c2029e0cb 

* Модуль http должен реализовывать одну функцию createServer, которая возвращает экземпляр класса HttpServer, объвленный в файле `./http.js`
* Класс HttpServer должен иметь метод listen, получающий на вход порт, и стартующий сервер на заданном порту
* Когда к серверу подключается HTTP-клиент, сервер должен сгенерирова ть событие `request`. Аргументами события являются объекты req, res являющиеся экземплярами HttpRequest и HttpResponse (смотри далее) соответственно
Событие request не должно вызываться ДО ТОГО, как были получены все заголовки запроса
* Класс HttpRequest должен быть ReadableStream и содержать в себе ВСЕ ТЕЛО http-запроса (минус заголовки)
* Класс HttpRequest должен иметь поля headers(объект, ключами являются имена заголовков, значениями - значения заголовков), поле method (метод, с которым выполняется HTTP-запрос), поле url (адрес http-запроса)
Класс HttpResponse должен быть WritableStream. Все данные, отправленные в этот WritableStream должны быть отправлены клиенту
* Класс HttpResponse должен представлять методы setHeader(headerName, value) - осуществляет установку заголовков (но не отправляет их) и writeHead (осуществляет отправку HTTP-статуса запроса)
* Класс HttpResponse должен осуществлять отправку заголовков перед отправкой тела запроса клиенту.
* Вызов setHeader после того как заголовки были отправлены должен генерировать ошибку
```