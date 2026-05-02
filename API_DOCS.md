# API Documentation

**Base URL:** `http://localhost:8081`

---

## Authentication Endpoints

### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "role": "string",
  "id": "number",
  "email": "string",
  "firstName": "string",
  "lastName": "string"
}
```

---

### POST `/api/auth/register/admin`
Register a new admin user.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}
```

**Response:** LoginResponse (same as login)

---

### POST `/api/auth/register/clinic-admin`
Register a new clinic admin user.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}
```

**Response:** LoginResponse (same as login)

---

### GET `/api/auth/me`
Get current authenticated user information.

**Headers:**
- `Authorization: Bearer {token}`

**Response:** LoginResponse

---

## User Endpoints

### GET `/api/users`
Get all users.

**Response:**
```json
[
  {
    "id": "number",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "role": "ADMIN|CLINIC_ADMIN",
    "createdAt": "datetime"
  }
]
```

---

### GET `/api/users/{id}`
Get user by ID.

**Response:** UserDTO

---

### GET `/api/users/email/{email}`
Get user by email.

**Response:** UserDTO

---

### POST `/api/users/admins`
Create a new admin user.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}
```

**Response:** UserDTO

---

### POST `/api/users/clinic-admins`
Create a new clinic admin user.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}
```

**Response:** UserDTO

---

### PUT `/api/users/{id}`
Update user by ID.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}
```

**Response:** UserDTO

---

### DELETE `/api/users/{id}`
Delete user by ID.

**Response:** 204 No Content

---

## Clinic Endpoints

### GET `/api/clinics`
Get all clinics with optional filters.

**Query Parameters:**
- `city` (optional): Filter by city
- `specialtyId` (optional): Filter by specialty
- `keyword` (optional): Search by keyword

**Response:**
```json
[
  {
    "id": "number",
    "name": "string",
    "description": "string",
    "address": "string",
    "city": "string",
    "latitude": "number",
    "longitude": "number",
    "phone": "string",
    "email": "string",
    "imageUrl": "string",
    "rating": "number",
    "createdAt": "datetime",
    "clinicAdminId": "number",
    "clinicAdminName": "string",
    "specialties": [
      {
        "id": "number",
        "label": "string",
        "description": "string",
        "iconUrl": "string"
      }
    ],
    "doctors": [
      {
        "id": "number",
        "firstName": "string",
        "lastName": "string",
        "photoUrl": "string",
        "experienceYears": "number",
        "diploma": "string",
        "biography": "string",
        "clinicId": "number",
        "clinicName": "string",
        "specialty": "SpecialtyDTO"
      }
    ]
  }
]
```

---

### GET `/api/clinics/{id}`
Get clinic by ID.

**Response:** ClinicDTO

---

### GET `/api/clinics/admin/{adminId}`
Get all clinics managed by a specific admin.

**Response:** Array of ClinicDTO

---

### POST `/api/clinics`
Create a new clinic.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "address": "string",
  "city": "string",
  "latitude": "number",
  "longitude": "number",
  "phone": "string",
  "email": "string",
  "imageUrl": "string",
  "clinicAdminId": "number"
}
```

**Response:** ClinicDTO

---

### PUT `/api/clinics/{id}`
Update clinic by ID.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "address": "string",
  "city": "string",
  "latitude": "number",
  "longitude": "number",
  "phone": "string",
  "email": "string",
  "imageUrl": "string",
  "clinicAdminId": "number"
}
```

**Response:** ClinicDTO

---

### DELETE `/api/clinics/{id}`
Delete clinic by ID.

**Response:** 204 No Content

---

### POST `/api/clinics/{clinicId}/specialties/{specialtyId}`
Add a specialty to a clinic.

**Authorization:** CLINIC_ADMIN role required

**Response:** ClinicDTO

---

### DELETE `/api/clinics/{clinicId}/specialties/{specialtyId}`
Remove a specialty from a clinic.

**Authorization:** CLINIC_ADMIN role required

**Response:** 204 No Content

---

## Doctor Endpoints

### GET `/api/doctors`
Get doctors with filters.

**Query Parameters (at least one required):**
- `clinicId` (optional): Filter by clinic
- `specialtyId` (optional): Filter by specialty

**Response:**
```json
[
  {
    "id": "number",
    "firstName": "string",
    "lastName": "string",
    "photoUrl": "string",
    "experienceYears": "number",
    "diploma": "string",
    "biography": "string",
    "clinicId": "number",
    "clinicName": "string",
    "specialty": {
      "id": "number",
      "label": "string",
      "description": "string",
      "iconUrl": "string"
    }
  }
]
```

---

### GET `/api/doctors/{id}`
Get doctor by ID.

**Response:** DoctorDTO

---

### POST `/api/doctors`
Create a new doctor.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "photoUrl": "string",
  "experienceYears": "number",
  "diploma": "string",
  "biography": "string",
  "clinicId": "number",
  "specialtyId": "number"
}
```

**Response:** DoctorDTO

---

### PUT `/api/doctors/{id}`
Update doctor by ID.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "photoUrl": "string",
  "experienceYears": "number",
  "diploma": "string",
  "biography": "string",
  "clinicId": "number",
  "specialtyId": "number"
}
```

**Response:** DoctorDTO

---

### DELETE `/api/doctors/{id}`
Delete doctor by ID.

**Response:** 204 No Content

---

## Specialty Endpoints

### GET `/api/specialties`
Get all specialties.

**Response:**
```json
[
  {
    "id": "number",
    "label": "string",
    "description": "string",
    "iconUrl": "string"
  }
]
```

---

### GET `/api/specialties/{id}`
Get specialty by ID.

**Response:** SpecialtyDTO

---

### POST `/api/specialties`
Create a new specialty.

**Request Body:**
```json
{
  "label": "string",
  "description": "string",
  "iconUrl": "string"
}
```

**Response:** SpecialtyDTO

---

### PUT `/api/specialties/{id}`
Update specialty by ID.

**Request Body:**
```json
{
  "label": "string",
  "description": "string",
  "iconUrl": "string"
}
```

**Response:** SpecialtyDTO

---

### DELETE `/api/specialties/{id}`
Delete specialty by ID.

**Response:** 204 No Content

---

## Quote Request Endpoints

### GET `/api/quote-requests`
Get all quote requests with optional status filter.

**Query Parameters:**
- `status` (optional): PENDING | IN_PROGRESS | COMPLETED | CLOSED

**Response:**
```json
[
  {
    "id": "number",
    "fname": "string",
    "lname": "string",
    "email": "string",
    "phone": "string",
    "country": "string",
    "dateofBirth": "date",
    "description": "string",
    "status": "enum",
    "token": "string",
    "createdAt": "datetime",
    "specialty": {
      "id": "number",
      "label": "string",
      "description": "string",
      "iconUrl": "string"
    }
  }
]
```

---

### GET `/api/quote-requests/{id}`
Get quote request by ID.

**Response:** QuoteRequestDTO

---

### GET `/api/quote-requests/token/{token}`
Get quote request by token.

**Response:** QuoteRequestDTO

---

### POST `/api/quote-requests`
Submit a new quote request.

**Request Body:**
```json
{
  "fname": "string",
  "lname": "string",
  "email": "string",
  "phone": "string",
  "country": "string",
  "dateofBirth": "date",
  "description": "string",
  "specialtyId": "number"
}
```

**Response:** QuoteRequestDTO

---

### PATCH `/api/quote-requests/{id}/status`
Update quote request status.

**Query Parameters:**
- `status` (required): PENDING | IN_PROGRESS | COMPLETED | CLOSED

**Response:** QuoteRequestDTO

---

### PATCH `/api/quote-requests/{id}/close`
Close a quote request.

**Response:** 204 No Content

---

## Quote Response Endpoints

### GET `/api/quote-responses/request/{quoteRequestId}`
Get all responses for a specific quote request.

**Response:**
```json
[
  {
    "id": "number",
    "estimatedPrice": "decimal",
    "message": "string",
    "status": "enum",
    "createdAt": "datetime",
    "clinicId": "number",
    "clinicName": "string",
    "clinicCity": "string",
    "clinicImageUrl": "string",
    "clinicRating": "number",
    "quoteRequestId": "number"
  }
]
```

---

### GET `/api/quote-responses/clinic/{clinicId}`
Get all quote responses from a specific clinic.

**Query Parameters:**
- `status` (optional): Filter by status

**Response:** Array of QuoteResponseDTO

---

### GET `/api/quote-responses/{id}`
Get quote response by ID.

**Response:** QuoteResponseDTO

---

### POST `/api/quote-responses`
Submit a quote response from a clinic.

**Request Body:**
```json
{
  "quoteRequestId": "number",
  "clinicId": "number",
  "estimatedPrice": "decimal",
  "message": "string"
}
```

**Response:** QuoteResponseDTO

---

### PATCH `/api/quote-responses/{id}/view`
Mark a quote response as viewed.

**Response:** QuoteResponseDTO

---

### PATCH `/api/quote-responses/{id}/accept`
Accept a quote response.

**Response:** QuoteResponseDTO

---

## Review Endpoints

### GET `/api/reviews/clinic/{clinicId}`
Get all reviews for a specific clinic.

**Response:**
```json
[
  {
    "id": "number",
    "rating": "number (1-5)",
    "createdAt": "datetime",
    "clinicId": "number",
    "clinicName": "string"
  }
]
```

---

### GET `/api/reviews/clinic/{clinicId}/average`
Get average rating for a clinic.

**Response:**
```json
{
  "average": "number"
}
```

---

### POST `/api/reviews`
Create a new review for a clinic.

**Request Body:**
```json
{
  "clinicId": "number",
  "rating": "number (1-5)"
}
```

**Response:** ReviewDTO

---

### DELETE `/api/reviews/{id}`
Delete a review by ID.

**Response:** 204 No Content

---

## Summary

Total Endpoints: **45**

- Authentication: 4 endpoints
- Users: 7 endpoints
- Clinics: 8 endpoints
- Doctors: 5 endpoints
- Specialties: 5 endpoints
- Quote Requests: 6 endpoints
- Quote Responses: 6 endpoints
- Reviews: 4 endpoints
