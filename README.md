# HiddenRoutes

![Hidden-Routes](./app/public/assets/img/hr_logo-removebg-preview.webp)

**HIDDEN ROUTES** is a tourism app for Colombia. Tourists can book, view, and organize activities and experiences. Hosts can offer or add their sites for a safe trip through Colombia.

## Features
- User registration and authentication (JWT)
- Booking of tourist experiences
- Host management of experiences
- Reviews and ratings for experiences
- User and profile dashboard
- Host dashboard for experience management
- RESTful API with Express and Sequelize
- Modern frontend with Vite, HTML, CSS, and JS

## Technologies
* Vite
* HTML/CSS
* JavaScript
* Express
* MySQL2
* CORS
* Sequelize
* Dotenv
* JSON Web Token
* Joi
* bcrypt
* multer

## Requirements
- Node.js >= 18.x
- npm >= 9.x
- MySQL database access

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/DiegoAG31/Hidden-Routes.git
   ```
2. Open the project:
   ```bash
   code Hidden-Routes
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the backend (Express):
   ```bash
   node app/server/server.js
   ```
The frontend is served by default at `http://localhost:3000`.

## API Endpoints
### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login and get JWT
### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
### Experiences
- `GET /api/experiences` - List experiences
- `POST /api/experiences` - Add experience

## Usage
- Access the frontend in your browser: `http://localhost:3000
- Use the API with Postman or similar tools.
- HTML views are in `app/public/views/`.
- Backend controllers and routes are in `app/server/controllers/` and `app/server/routes/`.

## Project folder structure

```
Hidden-Routes/
│   index.html
│   package.json
│   README.md
│
├── app/
│   ├── config/
│   │   └── config.js
│   ├── doc/
│   │   ├── Documento_Tecnico_hidden_routes.pdf
│   │   ├── MER.jpg
│   │   └── queryHiddenRoutes.sql
│   ├── public/
│   ├── dashboard.html
│   │   ├── assets/
│   │   │   ├── css/
│   │   │   │   └── main.css
│   │   │   ├── img/
│   │   │   └── js/
│   │   │       ├── booking.js
│   │   │       ├── dashboard.js
│   │   │       ├── experience.js
│   │   │       ├── experienceManager.js
│   │   │       ├── login.js
│   │   │       ├── profile.js
│   │   │       └── register.js
│   │   └── views/
│   │       ├── aboutUs.html
│   │       ├── booking.html
│   │       ├── experience.html
│   │       ├── experienceManager.html
│   │       ├── login.html
│   │       ├── paymentMethod.html
│   │       ├── profile.html
│   │       ├── register.html
│   └── server/
│       ├── database.js
│       ├── server.js
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── bookingController.js
│       │   ├── destinationController.js
│       │   ├── experienceController.js
│       │   └── reviewController.js
│       ├── middleware/
│       │   ├── auth.js
│       │   ├── isHost.js
│       │   ├── uploadExperienceImg.js
│       │   └── uploadProfileImg.js
│       ├── models/
│       │   ├── bookingModel.js
│       │   ├── bookingStatusModel.js
│       │   ├── destinationModel.js
│       │   ├── experienceModel.js
│       │   ├── roleModel.js
│       │   └── userModel.js
│       └── routes/
│           ├── auth.js
│           ├── bookings.js
│           ├── destinations.js
│           └── experiences.js
```

## Screenshots
You can add screenshots here to show the app in action.

## Authors
- [@DiegoAG31](https://github.com/DiegoAG31)
- [@j2rkan](https://github.com/J2rkan)
- [@rogelisdev](https://github.com/rogelisdev)
- [@SrLettuce](https://github.com/SrLettuce)
- [@ApoloKn](https://github.com/ApoloKn)

## License
Hidden-Routes Colombia is licensed under the MIT License

