# Deligo Frontend

Deligo Frontend is a modern, responsive web application for food menu browsing and restaurant management, built with Next.js, React, and Redux. It enables users to browse food menus, place orders, register/login, and allows admins to manage menus and orders with a user-friendly dashboard.

---

## Project Overview

The frontend of **Deligo** is designed to provide a seamless experience for both restaurant customers and admins:
- **Customers** can browse menus, view item details, add to cart, and place orders.
- **Admins** can log in to a dashboard to manage menu items, view and process orders, and manage users (role-based access).

This app interacts with the [Deligo backend](../deligo-backend) for all API operations like authentication, menu management, order processing, and image uploads.

---

## Technologies Used

- [Next.js](https://nextjs.org/) (App Router, SSR/SSG, Routing, API integration)
- [React.js](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) (State management)
- [Axios](https://axios-http.com/) (API requests)
- [Tailwind CSS](https://tailwindcss.com/) (UI styling)
- [TypeScript](https://www.typescriptlang.org/) (static typing)
- Helper tools: ESLint, Prettier

---

## Setup Instructions

1. **Clone the repository and install dependencies:**
    ```bash
    git clone https://github.com/Nasirul-Islam-Chowdhury/deligo.git
    cd deligo-frontend
    npm install
    ```

2. **Configure environment variables:**

   Create a `.env.local` file in the project root.  
   Example:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   ```

3. **Run the development server:**
    ```bash
    npm run dev
    ```
    The app runs by default at **[http://localhost:3000](http://localhost:3000)**

4. **Start developing:**
   - All main pages are in `app/` or `pages/`.
   - Main entry: `app/page.tsx` (homepage)
   - Components in `components/`
   - State management logic in `store/` and `features/`
   - API functions in `services/` or `utils/`

---

## API Documentation (Quick Summary)

The frontend uses the backend REST API at `/api/v1/`. Main endpoints:

- **Authentication**
  - `POST /auth/login` – User login
  - `POST /auth/register` – Register new user
  - `POST /auth/refresh-token` – Refresh JWT token
  - `POST /auth/forgot-password` – Password reset

- **Menus**
  - `GET /menus` – List all menus
  - `GET /menus/:id` – Get menu details
  - `POST /menus` – [Admin] Create menu
  - `PATCH /menus/:id` – [Admin] Update menu
  - `POST /menus/:id/items` – [Admin] Add item to menu
  - `DELETE /menus/:id/items/:itemId` – [Admin] Remove menu item

- **Orders**
  - `GET /orders` – [Admin] List all orders
  - `POST /orders` – Create new order

> Authentication required for most endpoints. See [backend API docs](../deligo-backend/Readme.md) for full details.

---

## Demo Link

> If available, visit the live app:  
> **[https://your-deligo-frontend-demo-url.com](https://your-deligo-frontend-demo-url.com)**

---

## Screenshots

*(Add screenshots here to illustrate user flows, dashboard, menus, order page, etc.)*

---

## Features Overview

- **Home page:** Landing page with restaurant highlights & browse menus.
- **Menu page:** View all menu items, categories, add to cart/order.
- **Order page:** Review cart, adjust quantities, submit order.
- **Login/Register:** User authentication & registration forms.
- **Admin Dashboard:** (for admin roles) Manage menus, items, orders, users.
- **Image Upload:** Menu and dish images are uploaded via Cloudinary.
- **Responsive Design:** Mobile and desktop optimized.

---

## Contribution

Feel free to open issues or PRs for improvements. For more info, see [`CONTRIBUTING.md`](./CONTRIBUTING.md) if present.

---

## License

[MIT](./LICENSE)

---

