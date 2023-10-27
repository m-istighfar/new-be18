## Live Deployment

The application is deployed live at: [Live URL](https://clinquant-nougat-f52198.netlify.app/s://your-live-url.com)

## API Endpoint

The API is available at: [API Endpoint](https://expensive-boa-pajamas.cyclic.app/api-docs)



| Method | Endpoint                          | Description                             |
|--------|-----------------------------------|-----------------------------------------|
| POST   | /auth/register                    | Register a new user                      |
| GET    | /auth/verify-email/{token}        | Verify user's email address             |
| POST   | /auth/login                       | Login user                               |
| POST   | /auth/refreshToken                | Refresh the access token                 |
| POST   | /auth/request-password-reset      | Request a password reset email           |
| POST   | /auth/reset-password/{resetToken} | Reset user's password with a given token |
| GET    | /user/tasks                       | Get all tasks for the logged-in user     |
| POST   | /user/tasks                       | Create a new task for the logged-in user |
| DELETE | /user/tasks                       | Delete all tasks for the logged-in user  |
| GET    | /user/tasks/{id}                  | Get a specific task by ID                |
| PUT    | /user/tasks/{id}                  | Update a specific task by ID             |
| DELETE | /user/tasks/{id}                  | Delete a specific task by ID             |
| PATCH  | /user/tasks/{id}/complete         | Mark a specific task as complete         |
| GET    | /admin/list-user                  | Get a list of all users (Admin only)     |
| POST   | /admin/create-user                | Create a new user (Admin only)           |
| PUT    | /admin/update-user/{id}           | Update a specific user by ID (Admin only)|
| DELETE | /admin/delete-user/{id}           | Delete a specific user by ID (Admin only)|

