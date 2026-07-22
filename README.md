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
git clone https://github.com/abdelrahman-elkhateeb/foodie.git
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

For Directus schema versioning and database backup/restore workflow, see [cms/README.md](cms/README.md).

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

# 📸 Screenshots

<img width="1913" height="1059" alt="Screenshot 2026-07-17 174809" src="https://github.com/user-attachments/assets/670b9fe4-ef83-41c4-8c65-3a3316c25f3a" />
<img width="1919" height="1062" alt="Screenshot 2026-07-17 174747" src="https://github.com/user-attachments/assets/1e0cf938-8dd0-42b5-ab8c-dd2f8f687857" />
<img width="1914" height="1060" alt="Screenshot 2026-07-17 174706" src="https://github.com/user-attachments/assets/761f84b3-12b2-48a0-a328-0a5045b09940" />
<img width="1917" height="1064" alt="Screenshot 2026-07-17 174648" src="https://github.com/user-attachments/assets/9037e381-cc47-4a87-9469-6417a611f88b" />
<img width="1903" height="1062" alt="Screenshot 2026-07-17 174633" src="https://github.com/user-attachments/assets/1e67cce3-7e75-4bb2-a82d-03587bf1a7db" />
<img width="1902" height="1062" alt="Screenshot 2026-07-17 174606" src="https://github.com/user-attachments/assets/4f104102-d0b6-4988-a0e5-e8cdd82402df" />
<img width="1915" height="1060" alt="Screenshot 2026-07-17 174826" src="https://github.com/user-attachments/assets/eb3dfa37-e32f-48c1-b411-90919699b5a7" />

