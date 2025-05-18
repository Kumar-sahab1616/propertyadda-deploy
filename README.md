# PropertyAdda - India's #1 Real Estate Property Portal

PropertyAdda is a comprehensive real estate property portal that connects property seekers with detailed listings, offering advanced search capabilities and a user-friendly interface.

![PropertyAdda](https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80)

## Features

- Search and filter properties by city, type, and price
- View detailed property listings with images and specifications
- Post your properties for sale or rent
- Connect with real estate services (painters, electricians, etc.)
- User authentication system
- Responsive design that works on all devices

## Tech Stack

- **Frontend**: React, TailwindCSS, Shadcn UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **State Management**: React Query
- **Routing**: Wouter
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Styling**: TailwindCSS with custom theme

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/property-adda.git
cd property-adda
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables by creating a `.env` file in the root directory:
```
DATABASE_URL=postgresql://username:password@localhost:5432/propertyadda
SESSION_SECRET=your-session-secret
```

4. Push the database schema
```bash
npm run db:push
```

5. Start the development server
```bash
npm run dev
```

The application will be available at http://localhost:5000

## Project Structure

- `client/` - Frontend React application
  - `src/components/` - UI components
  - `src/pages/` - Page components
  - `src/hooks/` - Custom React hooks
  - `src/lib/` - Utility functions
- `server/` - Backend Express server
  - `index.ts` - Server entry point
  - `routes.ts` - API routes
  - `storage.ts` - Data storage layer
  - `db.ts` - Database connection
- `shared/` - Shared code between frontend and backend
  - `schema.ts` - Database schema and types

## Deployment

See the [Deployment Guide](README.deployment.md) for instructions on deploying PropertyAdda to production environments.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries, please reach out to:
- Email: info@propertyadda.com
- Address: Om Nagar, Auraiya 206122, Uttar Pradesh
- Phone: +91 9045327038

---

© 2025 PropertyAdda. All rights reserved.