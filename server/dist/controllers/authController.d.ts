import { Request, Response } from 'express';
/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User Logout
 *     description: Logs out the user by revoking the current refresh token or all refresh tokens for all devices.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LogoutRequest'
 *     responses:
 *       '200':
 *         description: Logout successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       '400':
 *         description: Missing refresh token for single device logout.
 *       '401':
 *         description: Invalid refresh token.
 */
export declare function logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get Current User Profile
 *     description: Retrieves the profile of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageHeader'
 *     responses:
 *       '200':
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSummary'
 *       '401':
 *         description: Unauthorized. Valid JWT token is required.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export declare function getMe(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: Creates a new user account. Artisan-specific fields like `craftSpecialty` and `bio` are optional.
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       '201':
 *         description: Registration successful. An activation email will be sent.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationSuccess'
 *       '400':
 *         description: Validation failed or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '409':
 *         description: Conflict. Email already registered.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export declare function register(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User Login
 *     description: Authenticates a user and returns access and refresh tokens.
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       '200':
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthPayload'
 *       '401':
 *         description: Invalid email or password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '403':
 *         description: Forbidden. Account might be blocked or email not verified.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export declare function login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * @openapi
 * /api/auth/refresh-token:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Refresh Access Token
 *     description: Exchanges a valid refresh token for a new access token.
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *       '200':
 *         description: Token refreshed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccessTokenResponse'
 *       '401':
 *         description: Refresh token is invalid or expired.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export declare function refreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * @openapi
 * /api/auth/forgot-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Request Password Reset
 *     description: Sends a password reset link to the user's registered email address.
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       '200':
 *         description: Request processed. If the email exists, a reset link was sent.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       '400':
 *         description: Invalid email format.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export declare function forgotPassword(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * @openapi
 * /api/auth/reset-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Reset Password
 *     description: Sets a new password using a valid reset token.
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       '200':
 *         description: Password updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       '400':
 *         description: Token is invalid, expired, or passwords do not meet complexity.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export declare function resetPassword(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * @openapi
 * /api/auth/verify-email:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Verify Email Address
 *     description: Verifies a user's email address using the token provided in the registration email.
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         description: The unique verification token.
 *         schema:
 *           type: string
 *       - $ref: '#/components/parameters/LanguageHeader'
 *     responses:
 *       '200':
 *         description: Email verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       '400':
 *         description: Token is invalid or expired.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '404':
 *         description: User associated with the token not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export declare function verifyEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
