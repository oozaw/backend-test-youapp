# Backend Test - YouApp

## API Documentation

### Base URL
```bash
http://localhost:3000/api
```

<!-- Register -->
### Register

#### Request
- Method: POST
- Endpoint: `/register`
- Headers:
  - Content-Type: `application/json`
  - Accept: `application/json`
- Body:
```json
{
    "email": "",
    "username": "",
    "password": "",
    "password_confirmation": ""
}
```
- Response:
```json
{
  "status": true,
  "message": "User created successfully",
  "data": {
    "name": "John Doe",
    "email": "jhondoe@email.com"
  }
}
```

<!-- Login -->
### Login

#### Request
- Method: POST
- Endpoint: `/login`
- Headers:
  - Content-Type: `application/json`
  - Accept: `application/json`
- Body:
```json
{
    "email": "",
    "username": "",
    "password": ""
}
```
- Response:
```json
{
  "status": true,
  "message": "User logged in successfully",
  "data": {
    "name": "John Doe",
    "email": "jhondoe@email.com"
  }
}
```