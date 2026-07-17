# 🍔 Foodie

A modern food ordering web application built with **Next.js** and **Directus CMS**.

This project was created as a proof of concept to demonstrate how to build a dynamic restaurant platform using a headless CMS architecture with authentication, role management, and a fully responsive frontend.

---

## ✨ Features

- 🔐 Authentication system
  - User registration
  - Login / Logout
  - Secure HTTP-only cookies
  - Protected pages

- 🍕 Dynamic menu system
  - Categories
  - Menu items
  - Product details pages

- 🎁 Offers & promotions
  - Dynamic offers fetched from Directus

- 🎨 Modern UI
  - Responsive design
  - Dark / Light mode
  - Mobile navigation

- ⚙️ CMS-powered content
  - Categories management
  - Menu management
  - Offers management
  - Assets management

---

# 🏗️ Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Axios
- Lucide React
- next-themes

## Backend & CMS

- Directus 12
- PostgreSQL
- Redis

## DevOps

- Docker
- Docker Compose

---

# 📂 Project Structure

```txt
src
├── app
│   ├── (website)
│   │   ├── menu
│   │   ├── offers
│   │   └── page.tsx
│   │
│   └── (auth)
│       ├── login
│       ├── register
│       └── profile
│
├── actions
│   └── auth-actions.ts
│
├── components
│   ├── auth
│   ├── home
│   ├── layout
│   ├── menu
│   └── offers
│
├── lib
│   └── directus
│
└── types
```

---

# 🗄️ Directus Collections

## Categories

| Field | Type |
|--------|--------|
| id | Integer |
| name | String |
| slug | String |
| image | File |

---

## Menu Items

| Field | Type |
|--------|--------|
| id | Integer |
| name | String |
| description | Text |
| price | Decimal |
| image | File |
| available | Boolean |
| featured | Boolean |
| category | Relation |

---

## Offers

| Field | Type |
|--------|--------|
| id | Integer |
| title | String |
| description | Text |
| discount_percentage | Integer |
| image | File |
| active | Boolean |

---

# 🔐 Authentication Flow

```txt
Login Form
        ↓
Server Action
        ↓
Axios
        ↓
Directus API
        ↓
HTTP-only Cookies
        ↓
Protected Routes
```

---

# 🐳 Running the Project

## Clone the repository

```bash
git clone https://github.com/your-username/foodie.git
```

## Install dependencies

```bash
npm install
```

## Create environment variables

Create a `.env.local` file:

```env
DIRECTUS_URL=http://localhost:8055
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
```

---

## Run Directus

```bash
docker compose up
```

---

## Run the frontend

```bash
npm run dev
```

---

# 📦 Docker Services

The project uses:

- PostgreSQL
- Redis
- Directus

```yaml
services:
  database:
    image: postgres:17-alpine

  cache:
    image: redis:8-alpine

  directus:
    image: directus/directus:latest
```

---

# 🔑 Public Permissions

The following collections have public read access:

- categories
- menu_items
- offers
- directus_files

---

# 🚀 Deployment

## Frontend

- Vercel

## Backend

- Railway / Render / VPS

---

# 📸 Screenshots

Add screenshots here after deployment.

```txt
/public/screenshots
```

---

# 📄 License

This project was built for educational purposes and as part of a technical assignment.

---

## 👨‍💻 Author

**Abdelrahman Elkhateeb**

- GitHub: https://github.com/abdelrahman-elkhateeb
- LinkedIn: https://www.linkedin.com/in/abdelrahman-elkhateeb/