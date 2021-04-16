# Freezer Inventory Pull
Pull from freezer inventory for front of house food sales.

This is a mockup of an app used at work and an attempt to improve on the design and features. It is intended to be used  on a mobile device.

**[App Features](#app-features)**</br>
**[Development Scripts](#development-scripts)**

## App Features
### Sign Up
On user sign up, the username and password are verified on the backend for the given requirements and then stored in the `users` table in a MySQL database.

The username is case-insensitive, but is stored with the original formatting. The password is encrypted with [`bcrypt`](https://www.npmjs.com/package/bcrypt).

Any backend errors regarding improper formats, duplicate usernames, etc are returned to and displayed on the frontend.

### Persistent Login/Logout
If the user is found, the password will be compared to the stored encrypted password using. On login, authentication is provided by a JSON Web Token (JWT) with a 3 hour expiration.

Any backend errors regarding non-existant users, incorrect passwords, etc are returned to and displayed on the frontend.

The JWT is saved in [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) under the key `"user"`.

Pressing the logout button in the upper right deletes the `"user"` object in `localStorage`.

### Redirect Based on Authentication
On initial load, if there is no JWT in `localStorage`, or the JWT is not verified by the backend, the user will be redirected to the login/sign up page.

If any api call is attempted and fails due to authentication issues, the user will be redirected to the login/sign up page.

After a successful login, the user will be redirected back to the referring page. If there is no referring page, they will be redirected to the home page.

### Routing
Routing is implemented using [React Router](https://reactrouter.com/). The user can move forward through the app using the buttons at the bottom of each page, and the back button at the top left of each page. The browser back and forward buttons work as well.

### Collapsible Sections

### Carryover Auto Save

### Pull Save/Submit Implementations

### Previous Data Lookup
