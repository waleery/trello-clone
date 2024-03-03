![LandingPage](screenshots/ScreenshotBoard.png)

Achiveo is a Trello clone with additional features such as workspaces, boards, lists, cards, audit logs/activity tracking, and member roles. This project for example utilizes various technologies including PostgreSQL, Prisma ORM, shadcnUI, TailwindCSS, and integrates with the Unsplash API for fetching beautiful cover images.

## Demo

https://achiveo.vercel.app/

## Tech Stack


[![Next.js](https://img.shields.io/badge/Next.js-gray.svg?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Clerk](https://img.shields.io/badge/Clerk-grey.svg?logo=clerk)](https://clerk.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-gray.svg?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![React Query](https://img.shields.io/badge/React_Query-gray.svg?logo=reactquery&logoColor=white)](https://react-query.tanstack.com/)
[![Lodash](https://img.shields.io/badge/Lodash-gray.svg?logo=lodash&logoColor=white)](https://lodash.com/)
[![Stripe](https://img.shields.io/badge/Stripe-gray.svg?logo=stripe&logoColor=white)](https://stripe.com/)
[![Zod](https://img.shields.io/badge/Zod-gray.svg?logo=zod)](https://www.npmjs.com/package/zod)
[![Zustand](https://img.shields.io/badge/Zustand-gray.svg)](https://www.npmjs.com/package/zustand)
[![UseHooks TS](https://img.shields.io/badge/UseHooks_TS-gray.svg?logo=typescript&logoColor=white)](https://usehooks-ts.com/)
[![Date-fns](https://img.shields.io/badge/Date_fns-gray.svg?logo=date-fns)](https://date-fns.org/)
[![Unsplash JS](https://img.shields.io/badge/Unsplash_JS-gray.svg?logo=unsplash)](https://github.com/unsplash/unsplash-js)
[![ShadcnUI](https://img.shields.io/badge/ShadcnUI-gray.svg?logo=shadcnui)](https://github.com/shadcnUI)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-gray.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Sonner](https://img.shields.io/badge/Sonner-gray.svg)](https://github.com/benjick/sonner)
[![Hello Pangea/DND](https://img.shields.io/badge/Hello_Pangea/DND-gray.svg)](https://github.com/hello-pangea/dnd)




## Features

- Auth 
- Organizations / Workspaces
- Board creation
- Responsive
- Unsplash API for random cover images
- Activity log for entire organization
- Board rename and delete
- List creation / delete / rename / duplicate
- List and card Drag & drop reorder
- Card creation / delete / rename / duplicate / 
- Card activity log
- Board limit for every organization
- Stripe subscription for each organization to unlock unlimited boards
- Landing page
- PosgreSQL DB
- Prisma ORM
- shadcnUI & TailwindCSS


## Run Locally

Clone the project

```bash
  git clone https://github.com/waleery/trello-clone
```

Go to the project directory

```bash
  cd trello-clone
```

Install dependencies

```bash
  npm install
```

### Setup .env file

To run this project, you will need to add the following environment variables to your .env file
```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

DATABASE_URL=

NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=

STRIPE_API_KEY=

NEXT_PUBLIC_APP_URL=

STRIPE_WEBHOOK_SECRET=
```
### Setup Prisma

Add PostgreSQL Database (I used Supabase)

```shell
npx prisma generate
npx prisma db push

```

### Start the app

```shell
npm run dev
```


## Screenshots

![App Ssascreenshot](https://via.placeholder.com/468x300?text=App+Scraseenshot+Here)

