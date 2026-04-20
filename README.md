src/
│
├── firebase/
│ ├── firebase.js # Firebase connection ONLY
│
├── services/
│ ├── mealsService.js # all meal CRUD logic
│ ├── usersService.js # all user logic
│
├── pages/
│ ├── Dashboard.jsx # overview + stats
│ ├── Meals.jsx # CRUD UI for meals
│ ├── Users.jsx # user management
│ ├── Analytics.jsx # charts + numbers
│
├── components/
│ ├── layout/
│ │ ├── Sidebar.jsx
│ │ ├── Navbar.jsx
│ │
│ ├── meals/
│ │ ├── MealTable.jsx
│ │ ├── MealForm.jsx
│ │ ├── MealCard.jsx
│ │
│ ├── users/
│ │ ├── UserTable.jsx
│ │
│ ├── common/
│ ├── Button.jsx
│ ├── Modal.jsx
│ ├── Loader.jsx
│
├── hooks/
│ ├── useMeals.js
│ ├── useUsers.js
│
├── utils/
│ ├── formatDate.js
│ ├── calculateStats.js
│
├── routes/
│ ├── AppRoutes.jsx
│
├── App.jsx
└── main.jsx
