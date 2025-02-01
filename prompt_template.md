# Prompt Template for Current Project

template of pronpt { f:I→O|{} I|{} O|{} f|{} Structure(tree)|{} Architecture (marmaid)|{} Design(CSS)|{} }

now creating prompt{
f:I→O|{}
 I|{}  
O|{}  
f|{} 

Structure(tree)|{} 
\`\`\`
.eslintrc.json
.gitignore
components.json
docker-compose.yml
Dockerfile
mise.toml
next.config.ts
package-lock.json
package.json
postcss.config.mjs
README.md
RequirementsDefinition.md
tailwind.config.js
tailwind.config.ts
tsconfig.json
lexicons/
lexicons/app.vercel.decoboko/
lexicons/app.vercel.decoboko/event.json
lexicons/app.vercel.decoboko/post.json
prisma/
prisma/schema.prisma
prisma/migrations/
prisma/migrations/migration_lock.toml
prisma/migrations/20241226094735_init/
prisma/migrations/20241226094735_init/migration.sql
prisma/migrations/20250105133530_add_post/
prisma/migrations/20250105133530_add_post/migration.sql
prisma/migrations/20250112082152_create_event/
prisma/migrations/20250112082152_create_event/migration.sql
public/
public/file.svg
public/globe.svg
public/next.svg
public/vercel.svg
public/window.svg
public/images/
public/images/logo.png
public/images/nft-icons/
src/
src/middleware.ts
src/app/
src/app/favicon.ico
src/app/globals.css
src/app/layout.tsx
src/app/page.tsx
src/app/actions/
src/app/actions/auth.ts
src/app/actions/post.ts
src/app/api/
src/app/api/[[...route]]/
src/app/boken/
src/app/dekoboko/
src/app/dekoboko/page.tsx
src/app/login/
src/app/login/page.tsx
src/app/profile/
src/app/profile/page.tsx
src/app/quest/
src/app/quest/page.tsx
src/app/xrpc/
src/app/xrpc/[[...route]]/
src/components/
src/components/navigation.tsx
src/components/PostForm.tsx
src/components/QuestForm.tsx
src/components/ui/
src/components/ui/avatar.tsx
src/components/ui/badge.tsx
src/components/ui/button.tsx
src/components/ui/card.tsx
src/components/ui/error-message.tsx
src/components/ui/form.tsx
src/components/ui/hint.tsx
src/components/ui/input.tsx
src/components/ui/label.tsx
src/components/ui/radio-group.tsx
src/components/ui/scroll-area.tsx
src/components/ui/tabs.tsx
src/components/ui/textarea.tsx
src/components/ui/toast.tsx
src/components/ui/toaster.tsx
src/fonts/
src/fonts/GeistMonoVF.woff
src/fonts/GeistVF.woff
src/generated/
src/generated/api/
src/generated/api/index.ts
src/generated/api/lexicons.ts
src/generated/api/util.ts
src/generated/api/types/
src/generated/api/types/app/
src/generated/api/types/app/vercel/
src/generated/api/types/app/vercel/dekoboko/
src/generated/api/types/app/vercel/dekoboko/event.ts
src/generated/api/types/app/vercel/dekoboko/post.ts
src/hooks/
src/hooks/supabaseClient.ts
src/hooks/use-toast.ts
src/hooks/useAuth.ts
src/lib/
src/lib/supabaseClient.ts
src/lib/utils.ts
src/lib/auth/
src/lib/auth/client.ts
src/lib/auth/session.server.ts
src/lib/auth/storage.ts
src/lib/db/
src/lib/db/prisma.ts
src/lib/jetstream/
src/lib/jetstream/subscription.ts
\`\`\`
Architecture (marmaid)|{}
\`\`\`mermaid
graph LR
    subgraph Frontend
        A[React Components] --> B[Actions]
        B --> C[lib/auth]
        B --> D[lib/db]
        A --> E[UI Components]
        E --> F[Tailwind CSS]
    end

    subgraph Backend
        G[Prisma Schema] --> H[Prisma Client]
        H --> I[Database (PostgreSQL or similar)]
        J[Lexicons]
        K[XRPC Routes]
        K --> L[API Routes]
        L --> H
    end

    Frontend --> K[XRPC Routes]
    Frontend --> L[API Routes]
    Actions --> Backend
\`\`\`
Design(CSS)|{}
\`\`\`javascript
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: \`var(--radius)\`,
        md: \`calc(var(--radius) - 2px)\`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", ...fontFamily.sans],
        noto: ["var(--font-noto-sans-jp)", ...fontFamily.sans],
        zen: ["var(--font-zen-kaku-gothic)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
\`\`\`
}
