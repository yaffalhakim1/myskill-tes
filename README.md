# Portfolio

for myskill.id test

## Description

This is a portfolio manager that allows users to create a portfolio and add history works to it. The user can also edit the portfolio and delete it.

## How to run

In order to run the application, you need to run both the frontend and the backend. The backend is located in the `db.json` and served using `json-server`. The frontend is located in the `src` folder and served using `Next.js`.

### Frontend

1. Clone the repository
2. Navigate to the directory where you cloned the repository
3. Run `pnpm install` to install dependencies
4. Run `pnpm dev` to start the application
5. Navigate to `http://localhost:3000` in your browser to access the application

### env

1. create .env file in root folder
2. add `NEXT_PUBLIC_DB_URL=http://localhost:3001/` and `NEXT_PUBLIC_APP_URL = "http://localhost:3000"`
   to .env file

### Backend

1. split terminal
2. type `pnpm run db` to start the backend
3. You should see `http://localhost:3001/` in your terminal

Notes:
For the images, i use personal Cloudinary. the reason is because it is easy to store the images and i can get the image url easily. Be careful what image you upload because i can see it in my cloudinary dashboard.

## Tech Used

- Next.js
- Tailwind CSS
- json-server
- Cloudinary
- pnpm
- react-hook-form
- swr
