# Marro News - Frontend React.js Web Application

**Fontys University of Applied Sciences - Semester 3**
**Individual Project**

Marro News is a news web application built as an individual project for Semester 3 at Fontys University of Applied Sciences. The frontend provides a responsive, user-friendly interface for reading, managing, and interacting with news articles. It communicates with a Spring Boot REST API backend and supports role-based views for readers, journalists, and admins.

---

## Tech Stack

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![MUI](https://img.shields.io/badge/Material_UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_6-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

---

## Features

- Browse and read news articles filtered by genre
- Journalist portal to write and submit articles for approval
- Admin dashboard to approve or reject submitted articles
- User favourites list
- Article and journalist statistics with charts
- Real-time updates via WebSocket (STOMP)
- JWT-based authentication with role-based routing
- Fully responsive layout with Bootstrap & Material UI

---

## Screenshots

### User Flow

#### Homepage
![Homepage](screenshots/homepage.jpg)

#### Login Page
![Login](screenshots/login.jpg)

#### Articles Page
![Articles](screenshots/articles.jpg)

---

### Journalist & Admin Flow

#### Manage Articles (Journalist View)
![Manage Articles](screenshots/manage_articles.jpg)

#### Journalist Statistics (Admin View)
![Journalist Stats](screenshots/journalist_stats.jpg)

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- The [Marro News Backend](../README.md) running locally

### Install & run

```bash
cd News_Web_App_Frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

---

## Project Structure

```
src/
├── api/                        # Axios API calls per domain
│   ├── AuthAPI.jsx             # Login & token handling
│   ├── ArticleAPI.jsx          # Article CRUD
│   ├── ApprovalAPI.jsx         # Article approval flow
│   ├── AdminAPI.jsx            # Admin operations
│   ├── JournalistAPI.jsx       # Journalist management
│   ├── UserAPI.jsx             # User account operations
│   ├── FavouritesListAPI.jsx   # Favourites management
│   ├── SearchArticlesAPI.jsx   # Article search
│   ├── SearchJournalistAPI.jsx # Journalist search
│   ├── NotificationAPI.jsx     # Notifications
│   ├── ReadingTimeAPI.jsx      # Reading time tracking
│   ├── ArticleStatisticsAPI.jsx
│   ├── FavoruitesListStatistics.jsx
│   └── TokenManager.jsx        # JWT token utilities
├── components/
│   ├── article/                # Article cards, forms, approval, favourites
│   ├── journalist/             # Journalist table, forms, popups
│   ├── navigation/             # Role-based nav (user, journalist, admin)
│   ├── profile/                # Profile view, update, delete
│   ├── statistics/             # Bar, pie & donut charts
│   ├── login-register/         # Login & register forms
│   ├── form/                   # Reusable form controls & buttons
│   ├── search/                 # Search bar
│   ├── loader/                 # Loading spinners
│   ├── alert/                  # Alert messages
│   ├── access/                 # Access denied screen
│   └── utilities/              # Enum converters
├── notification/
│   ├── NotificationContainer.jsx
│   └── WebSocketNotifications.jsx  # Real-time STOMP/WebSocket
├── pages/
│   ├── HomePage.jsx
│   ├── AllArticlesPage.jsx
│   ├── ArticlesByGenrePage.jsx
│   ├── IndividualArticlePage.jsx
│   ├── ArticleApprovalPage.jsx
│   ├── JournalistArticlesPage.jsx
│   ├── JournalistInformationPage.jsx
│   ├── JournalistsPage.jsx
│   ├── FavouritesListPage.jsx
│   ├── FavouritesListStatistics.jsx
│   ├── PerformanceStatistics.jsx
│   ├── AccountPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   └── SearchResults.jsx
├── styles/                     # Component-scoped CSS files
├── validation/                 # Form validation logic per role
├── assets/                     # Images & static files
├── App.jsx                     # Routes & layout
└── main.jsx                    # Entry point
```

---

## Academic Context

| | |
|---|---|
| Institution | Fontys University of Applied Sciences |
| Semester | Semester 3 |
| Project type | Individual |
| Focus | Full-stack web development, REST APIs, security, CI/CD |

---

## License

This project was created solely for educational purposes as part of an academic programme at Fontys University of Applied Sciences.

You are welcome to read and reference the code for learning or academic purposes. However, copying, modifying, redistributing, or using any part of this project, in whole or in part ,without the explicit written consent of the author is not permitted.

© 2024 - All rights reserved.