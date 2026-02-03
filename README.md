# Snabbit Assignment: The Cinema Seat Selector

A cinema seat booking UI built with React + Vite + Tailwind.

# VERCEL link

https://snabbit-assignment-cinema-seat-sele.vercel.app/

# Video/Demo: A quick screen recording

https://drive.google.com/file/d/1S3WbGvohP5P4reCZNVSlESdBpeUVusyy/view?usp=sharing

## Features
- Fetches “Now Playing” movies from TMDB
- Movie selection page + seat selection page
- Seat grid with Available / Selected / Occupied states
- Live booking summary with seat list + total price
- Booking confirmation toast

## Tech
- React
- Vite
- Tailwind CSS
- React Router DOM
- TMDB API

## 🎟️ Seat Data Structure

The seat selection system is designed to be simple, flexible, and easy to manage.

---

### Seat Representation
Each seat is represented as a plain JavaScript object with the following fields:

- **`id`** – Unique seat identifier (e.g. `A1`, `C5`)
- **`row`** – Row label (`A` to `F`)
- **`number`** – Seat number within the row (`1` to `8`)
- **`status`** – Current state of the seat  
  (`available`, `selected`, or `occupied`)

Example:
```js
{
  id: "A1",
  row: "A",
  number: 1,
  status: "available"
}

## Run locally
```bash
npm install
npm run dev




