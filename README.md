# final-boiler-plate

This template should help get you started developing the final project running on Vue 3 with the composition API, Pinia as a state management tool, vue router, vite and lastly Supabase running on the backend.

This is meant as an advanced starter ready to plug in your supabase variables and run directly on a local server already connected to your Supabase instance.

You are given some functions to see how the supabase ecosystem works with Vue and more specifically, pinia as a state management tool.

You can add any CSS framework of your liking like tailwindCSS, Bootstrap, MaterialUI or many of the cool libaries that exist in the web.

## Important

This app is not setUp to be deployed to a production environment like vercel or netlify.

## Project Setup

```sh
npm install
```

## Set Up your Environment Variables from Supabase located at the root folder of the project

```sh
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

#### Once you have added your environment variables, head to your .gitIgnore file located at the root folder and uncomment the .env file naming to avoid sharing any private access keys to your database

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Day 1

Clase de Supabase.
Set up del proyecto.

### Day 2

Entender mejor la premisa del proyecto.
Repasar la logica ya escrita en el proyecto.
Aplicar mejor lo hecho en la tarde anterior.
Planificar en kanban.
Busqueda de inspiración para el diseño.
Crear el template con Figma. https://www.figma.com/file/q1C07Z615DXy62XvE5zMiE/UI-Kit-(taskit)?node-id=936%3A13105
Empezar a aplicar los estilos.

### Day 3

Continuar aplicando los estilos.
Acabados los estilos de Login y Register.
Home estilos casi acabados. Falta arreglar algunas cosas del position del nav, del add new task y el scroll de las tasks.

### Day 4

Arreglar problemillas de los estilos del home.
Hacer que las tasks se puedan borrar y poner como completed.
Log out button funcional.

### Day 5

Poner las tasks ordenadas según Active o completed.
Tasks como completed, arreglar activar/desactivar.
Modify tasks.

### Day 6

Modify tasks hacer-lo funcionar.
Alerta al eliminar tasks.
Alerta al hacer logout.
