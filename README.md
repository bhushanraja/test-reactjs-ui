# test-reactjs-ui

## Create React App
```bash
npx create-react-app agent-licensing-ui
cd agent-licensing-ui
```
----

## Install Dependencies
```bash
npm install axios react-router-dom @mui/material @mui/icons-material @emotion/react @emotion/styled date-fns
```
----

## Project Structure
```bash
src/
├── api/                  # API service classes (kept as .js)
│   ├── dataAccess.js
│   └── dataProcess.js
├── components/           # Reusable UI components (.jsx)
│   ├── Appointments.jsx
│   ├── Licenses.jsx
│   ├── Loading.jsx
│   ├── Navbar.jsx
│   └── StatusChip.jsx
├── pages/                # Page components (.jsx)
│   ├── DataAccess.jsx
│   ├── DataProcess.jsx
│   ├── EmployeeDetails.jsx
│   ├── EmployeeList.jsx
│   └── Home.jsx
├── App.jsx               # Main app component
├── App.css               # Global styles
├── index.js              # Entry point (kept as .js)
└── setupTests.js
```
----

## Running the Application

Start your Java Spring backend service (make sure it's running on http://localhost:8080 or update the API_BASE_URL in the API service files)

Start the React development server:

```bash
npm start
```
The application should open in your default browser at [http://localhost:3000](http://localhost:3000)

----

## To deploy this application:

Build the production version:

```bash
npm run build
```
----



