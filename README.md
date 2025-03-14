# Qantas Hotels

This is a NextJS application for displaying and sorting Qantas Hotels.

## Features

- Display a list of hotels with details including names, ratings, prices, and savings
- Sort hotels by price (high to low or low to high)
- Visually distinguish between star-rated and self-rated hotels
- Responsive design for mobile, tablet, and desktop screens
- Accessibility-friendly UI components

## Tech Stack

- **Framework**: Next.js (React-based)
- **Styling**: Tailwind CSS
- **Code Quality**: ESLint, TypeScript, Prettier
- **Testing**: Jest, React Testing Library

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
app/
├── __tests__/          # Tests for page components
├── components/         # React components
│   ├── __tests__/      # Tests for components
│   ├── HotelCard.tsx   # Hotel card component
│   ├── HotelList.tsx   # List of hotels with sorting
│   ├── Icons.tsx       # Rating icons (star/circle)
│   └── SortDropdown.tsx# Sorting dropdown component
├── services/           # Services for data fetching
├── types/              # TypeScript type definitions
├── layout.tsx          # Main layout component
└── page.tsx            # Main page component
```

## Testing

The application includes comprehensive tests for all components:

- **Unit Tests**: Test individual components functionality
- **Snapshot Tests**: Ensure UI consistency

Run the tests with:

```bash
npm test
```

Run tests with coverage report:

```bash
npm run test:coverage
```

Run the lint with:

```bash
npm run lint
```

Run the format code with:

```bash
npm run format
```

## Deployment

The application can be deployed to any platform that supports Next.js, such as Vercel, Netlify, or AWS Amplify.

To build the application for production:

```bash
npm run build
```

To start the dev server:

```bash
npm run dev
```

To start the production server:

```bash
npm run start
```
