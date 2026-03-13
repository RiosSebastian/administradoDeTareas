Sistema de Gestión de Proyectos.
-----------------------------------------
Una aplicación full-stack para la gestión de tareas y proyectos, construida con Spring Boot y Next.js. Permite la creación de proyectos, asignación de tareas a usuarios específicos, cambio de estados en tiempo real y un sistema de comentarios.
-----------------------------------------

🚀 Ejecución Rápida con Docker

El proyecto está totalmente contenedorizado para que pueda ejecutarse sin pasos manuales complejos.

**Requisitos previos:** Docker y Docker Compose instalados.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/RiosSebastian/administradoDeTareas.git
   cd administradoDeTareas

2. Levanta la aplicación completa:
     docker compose up --build

3. Accede a la aplicación:
     Frontend: http://localhost:3000
     API Backend: http://localhost:8080
     Base de Datos: MySQL en el puerto 3306.
---------------------------------------------
🏗️ Arquitectura del Sistema
Se ha diseñado una arquitectura desacoplada para garantizar escalabilidad y facilidad de mantenimiento.

🔹 Backend (Spring Boot)
Siguiendo las directrices técnicas, se implementó una arquitectura en capas (N-Tier):

Controladores (Controllers): Exponen los endpoints REST y gestionan las peticiones HTTP.

Servicios (Services): Contienen la lógica de negocio, desacoplados mediante interfaces para permitir inyección de dependencias.

Repositorios (Repositories): Capa de abstracción de datos utilizando Spring Data JPA.

Mappers: Clases dedicadas a la transformación entre Entidades JPA y DTOs (Data Transfer Objects), evitando exponer el modelo de datos interno.

Seguridad: Sistema de autenticación Stateless mediante JWT y encriptación de contraseñas con BCrypt.

🔹 Frontend (Next.js)
Construido con un enfoque moderno y reactivo:

Componentización: Uso de componentes reutilizables (Modales, Sidebar, TaskCards).

Tailwind CSS: Diseño 100% Responsivo (Mobile-First) con soporte para dispositivos móviles, tablets y escritorio.

Gestión de Estado: Uso de Hooks (useState, useEffect, useCallback) para un ciclo de vida eficiente y un renderizado optimizado.

---------------------------------------------------------------------------------

🛠️ Tecnologías Utilizadas

Frontend: Next.js 14, TypeScript, Tailwind CSS.

Backend: Java 17, Spring Boot 3, Spring Security (JWT).

Persistencia: MySQL 8.

Infraestructura: Docker, Docker Compose.

-----------------------------------------------------------
📋 Entidades Implementadas
Usuario: Registro, Login y relación con proyectos/tareas.

Proyecto: Agrupador de tareas creado por un usuario.

Tarea: Entidad principal con estados (PENDIENTE, EN PROCESO, COMPLETADA).

Comentario: Retroalimentación dentro de cada tarea.
