import { Request, Response } from 'express';
/**
 * @openapi
 * /api/admin/users:
 *   get:
 *     tags:
 *       - Admin
 *     summary: List All Users
 *     description: Returns a list of all registered users with their roles and status. Requires Admin privileges.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageHeader'
 *     responses:
 *       '200':
 *         description: A list of users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserListResponse'
 *       '401':
 *         description: Unauthorized. Valid Admin JWT token is required.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '403':
 *         description: Forbidden. User does not have administrative permissions.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export declare function listUsers(_req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * @openapi
 * /api/admin/users/{id}/role:
 *   patch:
 *     tags:
 *       - Admin
 *     summary: Update User Role
 *     description: Changes the role of a specific user. Admins cannot change their own roles through this endpoint.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the user.
 *         schema:
 *           type: string
 *       - $ref: '#/components/parameters/LanguageHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleUpdateRequest'
 *     responses:
 *       '200':
 *         description: Role updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       '400':
 *         description: Invalid role key provided.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '401':
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '403':
 *         description: Forbidden. Attempting to modify an Admin or insufficient permissions.
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
export declare function updateRole(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * @openapi
 * /api/admin/users/{id}/block:
 *   patch:
 *     tags:
 *       - Admin
 *     summary: Block/Unblock User
 *     description: Toggles the blocked status of a user account. Admins cannot be blocked.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the user.
 *         schema:
 *           type: string
 *       - $ref: '#/components/parameters/LanguageHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ToggleBlockRequest'
 *     responses:
 *       '200':
 *         description: User status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       '401':
 *         description: Unauthorized.
 *       '403':
 *         description: Forbidden. Cannot block an Admin.
 *       '404':
 *         description: User not found.
 */
export declare function toggleBlock(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * @openapi
 * /api/admin/users/{id}/revoke-refresh:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Revoke Refresh Tokens
 *     description: Revokes a specific refresh token (by JTI) or all refresh tokens for a user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the user.
 *         schema:
 *           type: string
 *       - $ref: '#/components/parameters/LanguageHeader'
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RevokeRefreshRequest'
 *     responses:
 *       '200':
 *         description: Refresh token(s) revoked successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       '400':
 *         description: Missing user ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '401':
 *         description: Unauthorized.
 *       '403':
 *         description: Forbidden.
 */
export declare function revokeRefresh(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * @openapi
 * /api/admin/newsletter:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Send Newsletter
 *     description: Broadcasts a newsletter email to all users with verified email addresses.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsletterRequest'
 *     responses:
 *       '200':
 *         description: Newsletter broadcasted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       '401':
 *         description: Unauthorized.
 *       '403':
 *         description: Forbidden.
 */
export declare function sendNewsletter(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
