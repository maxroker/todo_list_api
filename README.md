# todo_list-api

Base URL

```
https://todo-app-back.herokuapp.com
```

*(secure)* - authentication required

For secure requests add auth header

```
"Authorization": "${your token}"
```

"Bearer" is NOT REQUIRED

## Login

Method:
```
POST
```
URL:
```
/login
```
Body
```json
{
 "email": "string",
 "password": "string"
}
```
Request example
```javascript
fetch('https://todo-app-back.herokuapp.com/login', {
  method: 'POST',
  body:
    JSON.stringify({
      email: 'blablabla@gmail.com',
      password: 'blablabla',
    }),
  headers: {
    'Content-Type': 'application/json'
  }
})
```
Response
```json
{
 "id": "***id***",
 "token": "***token***"
}
```

## Check auth

Method:
```
GET
```
URL:
```
/me
```
Request example:
```javascript
fetch('https://todo-app-back.herokuapp.com/me', {
  method: 'GET',
  headers: {
    'Authorization': '****token***'
  }
})
```
Response example:
```json
{
 "id": "***id***",
 "token": "***token***"
}
```

## Todos

### Create 

*(secure)*

Method:
```
POST
```
URL:
```
/todos
```
Body
``` json
{
 "text": "string",
 "createDate": "string",
 "completed": "boolean",
}
```
createDate, completed - optional

Request example:
```javascript
fetch('https://todo-app-back.herokuapp.com/todos', {
  method: 'POST',
  body:
    JSON.stringify({
      text: 'banana banana',
    }),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': '****token***'
  }
})
```
Response example:
```json
{
 "_id": "***id***",
 "text": "banana banana",
 "createDate": "08/08/08",
 "completedAt": 132421353435,
 "completed": false,
 "_creator": "***user-id***",
}
```

#### Read 

Fetch all your todos

*(secure)*

Method:
```
GET
```
URL:
```
/todos
```
Response example:
```json
[
 {
  "_id": "***id***",
  "text": "banana banana",
  "createDate": "08/08/08",
  "completedAt": 132421353435,
  "completed": false,
  "_creator": "***user-id***",
 }
]
```

Fetch single todo by id

Method:
```
GET
```
URL:
```
/todos/${id}
```
Response example:
```json
{
 "_id": "***id***",
 "text": "banana banana",
 "createDate": "08/08/08",
 "completedAt": 132421353435,
 "completed": false,
 "_creator": "***user-id***",
}
```

#### Update

*(secure)*

Method:
```
PUT
```
URL:
```
/todos/${id}
```
Body
``` json
{
 "text": "string",
 "completed": "boolean",
}
```
text, completed - optional

Request example:
```javascript
fetch('https://todo-app-back.herokuapp.com/todos/LNlwqelfn1324w2341', {
  method: 'PUT',
  body:
    JSON.stringify({
      completed: true,
    }),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': '****token***'
  }
})
```
Response example:
```
{
 "_id": "***id***",
 "text": "banana banana",
 "createDate": "08/08/08",
 "completedAt": 132421353435,
 "completed": true,
 "_creator": "***user-id***",
}
```
#### Delete

*(secure)*

Method:
```
DELETE
```
URL:
```
/todos/${id}
```

Request example:
```javascript
fetch('https://todo-app-back.herokuapp.com/todos/LNlwqelfn1324w2341', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': '****token***'
  }
})
```

## Register

Method:
```
POST
```
URL:
```
/register
```
Body
``` json
{
 "email": "string",
 "password": "string",
 "username": "string",
}
```