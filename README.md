# AltBin.dev

A modern, open-source pastebin built with **Next.js 15**, **TypeScript**, and **PostgreSQL**.  
It allows you to create, share, and manage text snippets (pastes) with features like password protection, expiration, and view tracking.

---

## ✨ Features

- 🔑 **Password-protected pastes**
- 📊 **Dashboard with statistics** (views, size, recent pastes, etc.)
- 🎨 **Beautiful UI** with TailwindCSS + Shadcn
- 🌙 **Dark mode support**
- 🔐 **Discord authentication** (via NextAuth)
- 📥 **Download raw pastes** or copy directly to clipboard
- 📈 **View counters & limits**
- 🛡️ **Secure storage with Prisma + PostgreSQL**

---

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Prisma ORM](https://www.prisma.io/) with PostgreSQL
- [NextAuth.js](https://next-auth.js.org/) (Discord provider)
- [Lucide Icons](https://lucide.dev/)
- [Framer Motion](https://www.framer.com/motion/) for animations

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/altbin.dev.git
cd altbin.dev
````

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```env
# Database
DATABASE_URL="postgres://postgres:<password>@<host>:<port>/postgres"

# Discord OAuth
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret

# NextAuth
NEXTAUTH_SECRET=your_super_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### 4. Set up the database

Run Prisma migrations:

```bash
pnpm prisma migrate dev --name init
```

Generate the Prisma client:

```bash
pnpm prisma generate
```

### 5. Start the dev server

```bash
pnpm dev
```

The app should now be running at **[http://localhost:3000](http://localhost:3000)**

---

## 🚀 Deployment

You can deploy this project on:

* [Vercel](https://vercel.com/)
* Any Node.js hosting provider with PostgreSQL support

Make sure to set your `.env` variables on the hosting platform.

---

## 🤝 Contributing

Pull requests are welcome!
If you want to add a feature or fix a bug, feel free to fork the project and open a PR.

---

## 📜 License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute it as you wish.

---

## 👨‍💻 Author

Built with ❤️ by **[UltraLion](https://github.com/UltraLionfr)**

---