## 🟣 Frontend (Next.js, Apollo Client, React)

**Bespire Frontend** Frontend de la plataforma Bespire, construido en **Next.js** y **React** con **Apollo Client** para consumo de GraphQL.


## 🚀 Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [TailwindCSS](https://tailwindcss.com/)
- [HeadlessUI](https://headlessui.com/) (modals, dropdowns, transitions)
- [Typescript](https://www.typescriptlang.org/)

## 🛠️ Requisitos

- Node.js 18+
- Yarn o npm

## 🏗️ Instalación rápida

1. **Clona el repositorio**
   ```bash
   git clone https://hector62@bitbucket.org/apturalabs/bespire-app-frontend.git
   ```

2. **Instala dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   Copia el archivo `.env.example` a `.env` y ajusta los valores según tu entorno.

   ```bash
   cp .env.example .env
   ```

4. **Ejecuta la aplicación**
   ```bash
   npm run dev
   ```


## ✨ Estructura de carpetas

```ts
- src/
-   components/    # Componentes UI reutilizables
-   graphql/        # Queries y mutations organizados por módulo
-   hooks/           # Hooks reutilizables (useRequests, useAuth, etc)
-   context/       # Context global (Auth, App, Workspace)
-   guards/        # Guards de rutas y permisos
-   pages/ o app/    # Entrypoint de Next.js
-   utils/          # Helpers/utilidades
```

## 📚 Endpoints principales

- /graphql - API GraphQL principal (Apollo)

## 🔒 Token Refresh Policy

- This app automatically refreshes your JWT (using the backend’s `refreshToken` mutation) every time the page loads.
- If your permissions or roles change in the backend, you’ll immediately get a new token with the updated data.
- If the refresh fails, you’ll be logged out for security.

**You don’t need to re-login to update your permissions.**

##  🔐 Autenticación y permisos

- JWT almacenado en localStorage

- El contexto global (AppContext) expone usuario, workspace, roles, permisos, y métodos de login/logout

- Los guards controlan acceso a rutas/componentes según permisos y roles definidos en el backend


## 📝 Estilos

- TailwindCSS como base

- Soporte para dark mode y clases personalizadas

- HeadlessUI para diálogos, popovers y transiciones

## 🌍 Variables de entorno útiles
- NEXT_PUBLIC_GRAPHQL_ENDPOINT - URL del backend GraphQL


## 🧑‍💻 Contacto

- hectoracosta5@gmail.com
- [GitHub](https://github.com/hector53).