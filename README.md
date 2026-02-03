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
  

---

### Seat Generation Logic
- Seat rows (`A`–`F`) and seat numbers (`1`–`8`) are defined as constants.
- A utility function generates all seats programmatically by looping over rows and columns.
- Each generated seat is assigned:
  - a unique `id` (e.g. `A1`, `C5`)
  - an initial `status`

Seats that are already booked are marked as `occupied` during generation.

This avoids hardcoding seat layouts and allows easy changes to grid size.

---

### Initial Occupied Seats
- For each movie, a small set of seats is marked as `occupied` when the seat page is opened.
- Occupied seat IDs are stored in `localStorage`, scoped by movie ID.
- If occupied seats already exist for a movie, they are reused instead of regenerated.

This ensures seat bookings persist even after page refresh.

---

### Seat State Management
- Seat selection is handled by toggling the `status` field:
  - `available → selected`
  - `selected → available`
- Seats marked as `occupied` are disabled and cannot be selected.

The `status` field acts as the single source of truth for seat behavior and UI.

---

### Booking Logic
- When booking is confirmed:
  - All `selected` seats are converted to `occupied`
  - Their IDs are persisted in `localStorage`
- After booking, occupied seats remain locked and visible across refreshes.

---

### Grid Rendering Logic
- Although seats are stored as a flat list, they are grouped by `row` for display.
- Each row is rendered separately with seats ordered by seat number.
- This keeps data logic independent from UI layout and makes rendering predictable.

---

### Why This Approach
- No hardcoded seat maps
- Clear separation between data, logic, and UI
- Easy to debug and extend
- Matches real-world booking behavior




Example:
```js
{
  id: "A1",
  row: "A",
  number: 1,
  status: "available"
}
```
## Run locally
```bash
npm install
npm run dev
```



