# Project Keywords

This file collects the main repository keywords, environment variables, route names, and i18n translation keys.

## Environment variables
- PORT
- SWAGGER_SERVER_URL
- JWT_SECRET
- SALT_ROUNDS
- MONGO_URI
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS
- SMTP_FROM
- SENDGRID_API_KEY

## Translation / i18n keys
- welcome
- registration_success
- email_registered
- internal_error
- invalid_role
- user_not_found
- role_updated
- missing_user_id
- all_refresh_tokens_revoked
- refresh_token_revoked
- unauthorized
- forbidden
- email_verified
- invalid_credentials
- email_not_verified
- invalid_refresh_token
- invalid_token
- artisan
- buyer
- admin
- name
- email
- password
- role
- craft_specialty
- bio
- verify_email
- refresh_token
- access_token
- send_verification_link
- health_check

## API routes
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh-token
- GET /api/auth/verify-email
- GET /api/admin/users
- PATCH /api/admin/users/{id}/role
- POST /api/admin/users/{id}/revoke-refresh
- GET /health
- GET /api/docs

## Swagger keys and tags
- Auth
- Admin
- General
- bearerAuth
- RegisterRequest
- LoginRequest
- RefreshTokenRequest
- RoleUpdateRequest
- RevokeRefreshRequest
- UserSummary
- AuthPayload
- RegistrationSuccess
- AccessTokenResponse
- UserListResponse
- ErrorResponse
