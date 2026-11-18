# Game Catalog

Gestión de videojuegos con Angular, formularios reactivos (Reactive Forms) y JSON Server 0.17.4. El formulario permite crear (POST) y editar (PUT) videojuegos, `GameService` hace las peticiones y `AppComponent` gestiona la interfaz.

Este formulario se migró desde Template-Driven a Reactive Forms (ver [MIGRACION.md](./MIGRACION.md)).

## Ejecución

    npm install
    npm run api      # terminal 1: JSON Server en http://localhost:3000
    npx ng serve     # terminal 2: Angular en http://localhost:4200

## Respuestas a las cuestiones finales

- Actividad anterior (Template-Driven): [RESPUESTAS.md](./RESPUESTAS.md).
- Migración a Reactive Forms: [MIGRACION.md](./MIGRACION.md).