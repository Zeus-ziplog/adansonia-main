# Kiamba Mbithi & Company Advocates - Law Firm Website

A modern, professional website for Kiamba Mbithi & Company Advocates (ADANSONIA) featuring a content management system for managing staff, insights, and practice areas.

## Features

### Public-Facing Pages

- **Home** - Hero section with firm overview, statistics, featured practice areas, and leadership profiles
- **People** - Staff directory with search and filter functionality by position and field of work
- **Capabilities** - Expandable practice area sections with detailed information
- **Insights** - Articles and resources with category filtering
- **Contact** - Contact form and office information
- **Join Us** - Careers page with current opportunities
- **Privacy Policy** - Comprehensive privacy information

### Admin Panel

Secure admin portal for content management:

- **Staff Management** - Add, edit, and delete staff profiles with expertise and education
- **Insights Management** - Create and publish articles with categories and tags
- **Practice Areas Management** - Update service offerings and detailed content
- **Authentication** - Secure login with Supabase Auth

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom jade/pistachio color scheme
- **Routing**: React Router v6
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account and project

### Installation

1. Install dependencies:
```bash
npm install
```

2. The Supabase credentials are already configured in the `.env` file

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Database Schema

The application uses the following database tables:

### `staff`
Stores information about firm employees and partners
- Full name, position, field of work
- Contact information (email, phone)
- Biography and profile image
- Expertise areas and education
- Order priority and featured status

### `practice_areas`
Stores information about the firm's practice areas
- Title, slug, and icon
- Short description and detailed content
- Order priority

### `insights`
Stores blog posts and articles
- Title, slug, and content
- Author reference, category, and tags
- Publication status and date
- Featured image

### `admin_profiles`
Extended profile information for admin users
- Links to Supabase Auth users
- Full name and role

## Admin Access

To access the admin panel:

1. Navigate to `/admin/login`
2. Create an admin account using Supabase Auth
3. Sign in with your credentials
4. Access the dashboard at `/admin/dashboard`

## Key Features

### Search & Filter
- Search staff by name, position, or biography
- Filter by field of work and position
- Filter insights by category

### Responsive Design
- Mobile-first approach
- Optimized for phones, tablets, and desktops
- Professional animations and transitions

### Content Management
- Intuitive admin interface
- Real-time updates
- Image URL support for photos
- Rich text content for articles

### Security
- Row Level Security (RLS) enabled on all tables
- Public read access for published content
- Authenticated write access for admins
- Secure authentication flow

## Color Scheme

The website uses a professional jade/emerald color palette:
- Primary: Emerald (Green)
- Accent: Teal
- Text: Gray scale
- Background: White and light gray

## Initial Data

The database is pre-populated with:
- Kiamba Mbithi's profile
- 10 practice areas
- 2 sample insights/articles

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.tsx      # Main navigation
│   └── Footer.tsx      # Site footer
├── pages/              # Page components
│   ├── Home.tsx
│   ├── People.tsx
│   ├── Capabilities.tsx
│   ├── Insights.tsx
│   ├── Contact.tsx
│   ├── JoinUs.tsx
│   ├── PrivacyPolicy.tsx
│   └── admin/          # Admin pages
│       ├── Login.tsx
│       ├── Dashboard.tsx
│       ├── ManageStaff.tsx
│       ├── ManageInsights.tsx
│       └── ManagePracticeAreas.tsx
├── lib/
│   └── supabase.ts     # Supabase client and types
├── App.tsx             # Main app component with routing
├── main.tsx            # App entry point
└── index.css           # Global styles and animations

```

## Support

For questions or issues, contact:
- Email: consult@adansonia.info
- Phone: 0748364601

## License

Copyright © 2024 Kiamba Mbithi & Company Advocates. All rights reserved.
