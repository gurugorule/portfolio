
# Gurunath Gorule Portfolio

Welcome to my personal portfolio website! This project showcases my skills, projects, and professional experience as a Software Engineer.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Responsive design for various screen sizes
- Interactive background animations
- Sections for projects, skills, and contact information
- Downloadable resume
- Dark mode support
- Smooth scrolling navigation
- Functional contact form with email sending capabilities using SendGrid

## Technologies Used

- [Next.js 15](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [SendGrid](https://sendgrid.com/)

## Getting Started

### Prerequisites

- Node.js (v18.18.0 or later)
- npm (v9.0.0 or later)

### Installation

1. Clone the repository:

## Configuration

1. Create a `.env.local` file in the root directory of the project.
2. Add the following environment variables to the `.env.local` file:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com

SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=your-email@example.com
TO_EMAIL=your-email@example.com

DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
JWT_SECRET="your-secret-key-here"
```

## Usage

npm install

2. Create a `.env.local` file in the root directory and add the necessary environment variables as described in the Configuration section.

3. Run the development server:

```
bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Project Structure

```
portfolio/
├── app/
│   ├── admin/
│   ├── api/
│   ├── contact/
│   ├── privacy-policy/
│   ├── error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── CookieConsent.tsx
│   ├── error-boundary.tsx
│   ├── hamburger-menu.tsx
│   ├── matrix-grid-background.tsx
│   ├── particle-background.tsx
│   ├── resume-viewer.tsx
│   ├── skill-bar.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── VisitorTracker.tsx
├── lib/
│   └── db.ts
├── prisma/
│   └── schema.prisma
├── public/
│   ├── assets/
│   └── favicon.svg
├── .env.local
├── .eslintrc.json
├── .gitignore
├── deploy.md
├── middleware.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── vercel.json
```

## Customization

To customize this portfolio for your own use:

1. Update personal information in `app/page.tsx` and other relevant files.
2. Modify the `skills` array in `app/page.tsx` to reflect your own skills.
3. Replace the project descriptions and links in the `ProjectCard` components.
4. Update the `public/assets/resume.pdf` with your own resume.
5. Modify the color scheme in `tailwind.config.js` if desired.
6. Update the `metadata` in `app/layout.tsx` with your own information.

## Deployment

This project is set up for easy deployment on Vercel. Follow these steps:

1. Push your code to a GitHub repository.
2. Sign up for a [Vercel account](https://vercel.com/signup) if you haven't already.
3. Create a new project on Vercel and link it to your GitHub repository.
4. Configure the environment variables in the Vercel dashboard.
5. Deploy the project.

For more detailed deployment instructions, refer to the `deploy.md` file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact

Gurunath Gorule - goruleguru@gmail.com

Project Link: [my-portfolio](https://github.com/gurugorule/portfolio)
