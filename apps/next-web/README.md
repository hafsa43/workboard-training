# Workboard Next.js App

Next.js 14+ application with App Router for workboard project management.

## Features
- ✅ App Router with nested layouts
- ✅ Server/Client Components
- ✅ Authentication with Zustand
- ✅ Protected routes with middleware
- ✅ TailwindCSS styling
- ✅ TypeScript strict mode

## Getting Started

npm run dev      # Development server (port 3000)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check

## Project Structure
```
src/
├── app/                 # App Router pages
│   ├── (app)/          # Protected routes with layout
│   │   ├── dashboard/
│   │   └── projects/
│   ├── login/          # Public login page
│   └── layout.tsx      # Root layout
├── components/
│   └── ui/             # Reusable UI primitives
├── stores/             # Zustand state management
└── lib/                # Utilities
```

## Routes
- `/login` - Public authentication
- `/dashboard` - Protected dashboard
- `/projects` - Protected projects list

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
