# User Registration Endpoint Documentation

## POST /register

### Description

Registers a new user with email and password. The endpoint validates all required fields and returns a JWT authentication token upon successful registration.

### Request Method

`POST`

### Request URL

```
/register
```

### Request Headers

```
Content-Type: application/json
```

### Request Body

The request body should be a JSON object with the following structure:

```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "securePassword123"
}
```

### Request Parameters

| Field              | Type   | Required | Validation Rules             |
| ------------------ | ------ | -------- | ---------------------------- |
| email              | String | Yes      | Must be a valid email format |
| fullname.firstname | String | Yes      | Minimum 3 characters long    |
| fullname.lastname  | String | Yes      | Minimum 3 characters long    |
| password           | String | Yes      | Minimum 6 characters long    |

### Response

#### Success Response (201 Created)

```json
{
  "user": {
    "_id": "user_object_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com",
    "socketId": null
  },
  "token": "jwt_token_string"
}
```

#### Error Response (400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid_email",
      "msg": "Invalid email format",
      "path": "email",
      "location": "body"
    }
  ]
}
```

### Status Codes

| Code | Status      | Description                                                                |
| ---- | ----------- | -------------------------------------------------------------------------- |
| 201  | Created     | User successfully registered. Returns user object and authentication token |
| 400  | Bad Request | Validation failed. One or more required fields are invalid or missing      |

### Example Request

**cURL:**

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "password": "securePassword123"
  }'
```

**JavaScript (Fetch API):**

```javascript
fetch("/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "user@example.com",
    fullname: {
      firstname: "John",
      lastname: "Doe",
    },
    password: "securePassword123",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

### Response Examples

#### Example 1: Successful Registration (201 Created)

**Request:**

```json
{
  "email": "john@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}
```

**Response:**

```json
{
  "user": {
    "_id": "65b2c1f8a9c3d2e1f0g1h2i3",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIyYzFmOGE5YzNkMmUxZjBnMWgyaTMiLCJpYXQiOjE3MDYxMjM0NTZ9.abc123xyz789"
}
```

#### Example 2: Invalid Email Format (400 Bad Request)

**Request:**

```json
{
  "email": "invalid-email",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}
```

**Response:**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid email format",
      "path": "email",
      "location": "body"
    }
  ]
}
```

#### Example 3: First Name Too Short (400 Bad Request)

**Request:**

```json
{
  "email": "john@example.com",
  "fullname": {
    "firstname": "Jo",
    "lastname": "Doe"
  },
  "password": "password123"
}
```

**Response:**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "Jo",
      "msg": "First name must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

#### Example 4: Password Too Short (400 Bad Request)

**Request:**

```json
{
  "email": "john@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "pass"
}
```

**Response:**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "pass",
      "msg": "Password must be at least 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

#### Example 5: Multiple Validation Errors (400 Bad Request)

**Request:**

```json
{
  "email": "invalid",
  "fullname": {
    "firstname": "Jo",
    "lastname": "D"
  },
  "password": "123"
}
```

**Response:**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid",
      "msg": "Invalid email format",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "Jo",
      "msg": "First name must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    },
    {
      "type": "field",
      "value": "D",
      "msg": "Last name must be at least 3 characters long",
      "path": "fullname.lastname",
      "location": "body"
    },
    {
      "type": "field",
      "value": "123",
      "msg": "Password must be at least 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

### Validation Rules

- **Email**: Must be a valid email address format (e.g., user@domain.com)
- **First Name**: Minimum length of 3 characters
- **Last Name**: Minimum length of 3 characters
- **Password**: Minimum length of 6 characters, will be hashed before storage using bcrypt
