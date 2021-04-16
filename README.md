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

On logout the user is redirected to the login page.

### Routing
Routing is implemented using [React Router](https://reactrouter.com/). The user can move forward through the app using the buttons at the bottom of each page, and the back button at the top left of each page. The browser back and forward buttons work as well.

Each page is automatically scrolled to the top on mount.

### Collapsible Sections
Each food item has its own collapsible section that can be opened/closed by clicking anywhere the item's header box. The item snaps to the top on opening and automatically focuses on the input section.

### Search
The search bar at the top filters the items dynamically, and can be cleared with the button at the right edge of the box.

### Scroll To Top
The scroll to top button appears in the bottom right when not already at the top of the page and scrolls to the top as expected.

### Carryover Content
The inner content in each collapsible on the Carryover page allows number only input using the keyboard or the increment/decrement buttons on either side. The updated carryover is automatically saved in the local store on changes.

### Pull Content
The inner content in each collapsible on the Pull page allows number only input using the keyboard or the increment/decrement buttons on either side. The input is automatically set to the value of the par minus carryover and bounded within 0 to 255. The pull is not fully set in the local store until the amount is saved for that item.

#### Inner Package Rounding
If the item comes in an inner package amount greater than 1, the increment/decrement buttons change the value by that amount. If input is put in manually, the amount is rounded to a multiple of that inner package value after the pull amount is saved.

#### Previous Data Lookup
A smaller collapsible is embedded which, on each opening, fetches and displays information for the previous 5 pulls of that item.

### Pull Submit
On final submission, any unsaved values are saved with the default amount, and then the full pull information is sent for storage to the server.

### Easter Eggs
There are 2 hidden easter eggs on the Sign Up section, if you can find them...

## Development Scripts
### `npm start`

Start the Express server.

### `npm run startdev`

Start the Express server with nodemon for more descriptive logging.

### `npm run runall`

Start the Express server with nodemon and the React frontend in development mode.

### `npm run format`

Run the CLI for [`prettier`](https://prettier.io/) on the backend files.
