# Vite React Project API Documentation

This document provides comprehensive documentation for the API endpoints used in our Vite React Project. It includes details on authentication, request/response formats, and available endpoints.

## Table of Contents

1. [Authentication](#authentication)
2. [Base URL](#base-url)
3. [Response Format](#response-format)
4. [Error Handling](#error-handling)
5. [Rate Limiting](#rate-limiting)
6. [Endpoints](#endpoints)
   - [Users](#users)
   - [Products](#products)
   - [Orders](#orders)
7. [Webhooks](#webhooks)
8. [Changelog](#changelog)

## Authentication

All API requests require authentication using JSON Web Tokens (JWT). Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

To obtain a token, use the `/auth/login` endpoint.

## Base URL

All API requests should be prefixed with:

```
https://api.example.com/v1
```

## Response Format

All responses are returned in JSON format. Successful responses have the following structure:

```json
{
  "success": true,
  "data": { ... }
}
```

## Error Handling

Errors are returned with appropriate HTTP status codes and have the following structure:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "A description of the error"
  }
}
```

## Rate Limiting

API requests are limited to 100 requests per minute per API key. The following headers are included in the response:

- `X-RateLimit-Limit`: The number of allowed requests in the current period
- `X-RateLimit-Remaining`: The number of remaining requests in the current period

## Endpoints

### Users

#### GET /users

Retrieve a list of users.

Query Parameters:
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 20, max: 100)

Response:
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_id",
        "username": "john_doe",
        "email": "john@example.com",
        "created_at": "2026-03-06T18:00:00Z"
      },
      ...
    ],
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
```

#### POST /users

Create a new user.

Request Body:
```json
{
  "username": "new_user",
  "email": "newuser@example.com",
  "password": "securepassword123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "new_user_id",
    "username": "new_user",
    "email": "newuser@example.com",
    "created_at": "2026-03-06T18:30:00Z"
  }
}
```

### Products

#### GET /products

Retrieve a list of products.

Query Parameters:
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 20, max: 100)
- `category` (optional): Filter products by category

Response:
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "product_id",
        "name": "Product Name",
        "description": "Product description",
        "price": 19.99,
        "category": "electronics"
      },
      ...
    ],
    "total": 500,
    "page": 1,
    "limit": 20
  }
}
```

#### POST /products

Create a new product.

Request Body:
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 29.99,
  "category": "electronics"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "new_product_id",
    "name": "New Product",
    "description": "Product description",
    "price": 29.99,
    "category": "electronics",
    "created_at": "2026-03-06T19:00:00Z"
  }
}
```

### Orders

#### GET /orders

Retrieve a list of orders.

Query Parameters:
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 20, max: 100)
- `status` (optional): Filter orders by status (e.g., "pending", "completed")

Response:
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "order_id",
        "user_id": "user_id",
        "total_amount": 59.98,
        "status": "pending",
        "created_at": "2026-03-06T20:00:00Z",
        "items": [
          {
            "product_id": "product_id",
            "quantity": 2,
            "price": 29.99
          },
          ...
        ]
      },
      ...
    ],
    "total": 50,
    "page": 1,
    "limit": 20
  }
}
```

#### POST /orders

Create a new order.

Request Body:
```json
{
  "user_id": "user_id",
  "items": [
    {
      "product_id": "product_id",
      "quantity": 2
    },
    ...
  ]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "new_order_id",
    "user_id": "user_id",
    "total_amount": 59.98,
    "status": "pending",
    "created_at": "2026-03-06T21:00:00Z",
    "items": [
      {
        "product_id": "product_id",
        "quantity": 2,
        "price": 29.99
      },
      ...
    ]
  }
}
```

## Webhooks

Our API supports webhooks for real-time event notifications. To set up a webhook:

1. Register a webhook URL in your account settings.
2. Choose the events you want to subscribe to (e.g., "order.created", "product.updated").

Webhook payloads are sent as POST requests to your specified URL with the following structure:

```json
{
  "event": "order.created",
  "data": {
    ...
  },
  "timestamp": "2026-03-06T22:00:00Z"
}
```

## Changelog

### v1.0.0 (2026-03-06)
- Initial release of the API
- Implemented user, product, and order endpoints
- Added authentication using JWT
- Introduced rate limiting

For any questions or issues regarding the API, please contact our support team at api-support@example.com.