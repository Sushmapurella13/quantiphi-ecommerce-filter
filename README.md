# Marketly – E-Commerce Multi-Filter Sidebar

A full-stack e-commerce browsing interface built with React, Vite, Node.js and Express.

## Features
- Multi-select category checkboxes
- Dual-handle minimum/maximum price range
- Minimum star-rating radio filters
- Instant filtering through backend API requests
- Server-side filtering followed by sorting
- Price low-to-high and top-rated sorting
- Empty-state message and Reset Filters button
- Responsive product grid

## Requirements
- Node.js 18 or newer
- npm
- Git

## Run locally

### 1. Start backend
```bash
cd backend
npm install
npm run dev
```
Backend runs at http://localhost:5000

### 2. Start frontend in a second terminal
```bash
cd frontend
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## API
`GET /api/products?categories=Electronics,Apparel&minPrice=500&maxPrice=2000&minRating=4&sort=price-asc`

Query parameters:
- `categories`: comma-separated category names; omit/empty means all
- `minPrice`: inclusive minimum price
- `maxPrice`: inclusive maximum price
- `minRating`: minimum rating from 0 to 5
- `sort`: `default`, `price-asc`, or `top-rated`

`GET /api/health` checks server availability.

## GitHub submission
Create a public GitHub repository, then from the project root:
```bash
git init
git add .
git commit -m "Initial full-stack e-commerce filter implementation"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```
Use your own repository URL. Follow the assessment platform's submission instructions and deadline.
