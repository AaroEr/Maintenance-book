# 📘 DOCUMENTATION: Maintenance Book

This documentation provides an overview of the internal structure and logic of the Maintenance Book project. For the general purpose, features and technologies used, please refer to the [README.md](./README.md) file.

## 🛠 Project Overview

Maintenance Book is a full-stack web application for managing and logging vehicle maintenance records. The application supports multiple users with authentication and allows each user to add vehicles and record maintenance actions.

The project was created as a student project. In some of the most complicated parts of the project, ChatGPT was used during development to help with planning features and writing some of the more difficult code snippets. However, AI was **not used to handle or design larger architectural parts**, due to limitations in code context handling. Most importantly, all code generated with the help of AI was carefully reviewed and understood to avoid unexpected behavior.

Version control was mainly done using **GitLab**, with collaboration between two developers. The project was moved to **GitHub** once it was completed.

---

## 📁 Project Structure

```
Maintenance-book-main/
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── assets/
├── server/
│   └── src/
│       ├── routes/
│       ├── models/
│       └── server.ts
```

---

## 🧩 Frontend

The frontend is built with **React** and **TypeScript**, using **Tailwind CSS** for styling.

### Key Components
- `VehicleCard.tsx`: shows a vehicle's details in a card
- `CardGrid.tsx`: Grid layout for displaying all vehicle cards responsively.
- `AddCard.tsx`: Visual “+” card to trigger adding a new vehicle (UI shortcut).
- `AddVehicleModal.tsx`: form for adding a new vehicle
- `ViewVehicleModal.tsx`: shows the vehicle's maintenance history
- `Navbar.tsx`: Navigation bar shown at the top of the app.
- `LoginPage.tsx` & `RegisterPage.tsx`: handles user login and signup

State is managed locally inside components. No global state manager (like Redux) is used.

Routing is done with React Router (via Vite).

---

## 🔐 Authentication

User authentication is implemented with **Firebase Auth**. Users can:
- Create an account
- Log in securely
- All their vehicles and maintenance records are stored under their user ID

---

## 🌐 Backend API

The backend is a **Node.js** server using **Express** for routing and **MongoDB** (via Mongoose) for data storage.

### Routes

| Method | Endpoint                 | Description                      |
|--------|--------------------------|----------------------------------|
| GET    | `/api/vehicles`          | Get all vehicles for a user     |
| POST   | `/api/vehicles`          | Add a new vehicle                |
| GET    | `/api/maintenance/:id`   | Get maintenance for a vehicle    |
| POST   | `/api/maintenance`       | Add a new maintenance entry      |

See `server/src/routes/vehicleRoutes.ts` for implementation.

Test requests can be found in the file:  
`server/testVehicleRequest.http` – can be used with REST Client in VS Code.

---

## 🧾 Data Models

All data is stored in **MongoDB**. The main schema is for `Vehicle`, defined in:

`server/src/models/Vehicle.ts`

Each vehicle includes:
- Name
- Brand
- Description
- User ID (to associate with Firebase Auth)
- Maintenance records (as an array inside the vehicle document)

> Currently, all maintenance entries are saved inside each vehicle document (embedded structure).

---

## 🚧 Known Limitations & Future Improvements

- **Editing or deleting individual maintenance records is not possible.**
  - This could be improved by adding unique IDs for each record and creating edit/delete endpoints.
- **No backend validation or error handling**
  - More robust input checks and feedback for the user would improve reliability.
- **No unit or integration testing implemented**
  - Only manual testing with HTTP requests was used.

---

## 🧪 Development Notes

To run the project locally, follow these steps:

### 1. Clone the repository

If you haven't already, clone the project to your computer.

### 2. Install dependencies

The project has two parts: `client` (frontend) and `server` (backend).  
You need to install dependencies for both.

```bash
cd client
npm install
cd ../server
npm install
```

### 3. Start the frontend

Start the development server for the frontend:

```bash
cd client
npm run dev
```

It will typically run on: `http://localhost:5173/`

### 4. Start the backend

Start the backend server in a separate terminal:

```bash
cd server
npm run dev
```

It will typically run on: `http://localhost:3000/`

> 🔐 Make sure you have a working MongoDB instance running locally or remotely.

---

### Environment Variables

The backend requires a `.env` file in the `server/` folder.  
Create a file named `.env` and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

> ℹ️ The `MONGODB_URI` is a connection string for your MongoDB database.  
If you're using MongoDB Atlas (recommended for beginners), you can find this string in your Atlas dashboard under *Database > Connect > Drivers*.

Example:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
```

This is needed because the backend server uses MongoDB to store vehicle and maintenance data. Without this connection, the app cannot save or retrieve any data.

---

### Development Notes Summary

- You need to run **two servers**: frontend (Vite) and backend (Express)
- MongoDB must be running locally or remotely
- Use `npm run dev` in both `client/` and `server/`
- A `.env` file is required for the backend


## 📎 Summary

This documentation explains the internal structure of the Maintenance Book project for review purposes. For a full list of features and installation instructions, see the [README.md](./README.md). Code was written with learning in mind, and while AI helped with tricky parts, understanding and validation were always done by the developers.
