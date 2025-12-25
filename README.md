This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Database Configuration

This project supports **database-agnostic** configuration:

- **Local Development**: Uses MySQL via XAMPP with `mysql2` driver
- **Production**: Uses TiDB Serverless with `@tidbcloud/serverless` driver

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database Driver Selection
# Options: "mysql" (local) or "tidb" (production)
# If not set, defaults based on NODE_ENV: development -> mysql, production -> tidb
DB_DRIVER=mysql

# Database URL
# For local MySQL (XAMPP): mysql://root:@localhost:3306/smart_ptur
# For TiDB Serverless: mysql://user:password@gateway.region.shared.aws.tidbcloud.com:4000/database
DATABASE_URL=mysql://root:@localhost:3306/smart_ptur

# Node Environment
NODE_ENV=development
```

### Database Commands

```bash
# Generate migrations
bun run db:generate

# Apply migrations
bun run db:migrate

# Push schema changes (development)
bun run db:push

# Open Drizzle Studio
bun run db:studio

# Seed database
bun run db:seed
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
