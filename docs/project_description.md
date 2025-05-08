# Plataforma Automatizada de Gestión de Concursos y Votación con Integración de Clerk y Análisis de Issues con IA

Objetivo: Crear una plataforma web que automatice el proceso de registro de proyectos en un concurso de programación (o similar) a través de issues de GitHub, permita la votación por parte de la comunidad de Discord (autenticada con Clerk) y proporcione herramientas de administración para el creador del concurso.

## Pila de Tecnologías:

- Frontend: Next.js (desplegado en Vercel)
- Backend (BaaS): Supabase (Base de datos PostgreSQL, Almacenamiento, Funciones Serverless - opcional)
- Autenticación: Clerk (para la autenticación de usuarios de la plataforma, incluyendo potencialmente la vinculación con cuentas de Discord)
- CI/CD y Adquisición de Datos/Imágenes: GitHub Actions (para el escaneo de issues, generación de capturas de pantalla con Playwright y CI/CD del frontend)
- Generación de Capturas de Pantalla: Playwright (ejecutado en GitHub Actions)
- Análisis de Issues: API de IA Gratuita (Hugging Face Inference API, Google Cloud AI Platform, Amazon Comprehend, OpenAI API - para extraer información de las issues de GitHub)

## Flujo de Trabajo Detallado:

### Creación del Concurso (Interfaz Next.js):

El creador del concurso utiliza una interfaz en Next.js (desplegada en Vercel) para ingresar la URL del repositorio de GitHub donde se registrarán los proyectos mediante issues.

### Registro de Proyectos (Issues de GitHub):

Los participantes del concurso crean una nueva "issue" en el repositorio de GitHub del concurso, siguiendo una plantilla definida. Esta issue debe contener la URL del proyecto, una descripción y, opcionalmente, los nombres de los participantes.

### Escaneo y Análisis de Issues (GitHub Actions + API de IA):

- Un workflow de GitHub Actions se activa periódicamente (programado)
- El workflow utiliza la API de GitHub para obtener el contenido de las issues.
- El contenido de cada issue se envía a una API de IA gratuita (o con plan gratuito) para extraer la siguiente información:

  - URL del proyecto participante.
  - Nombre del proyecto (si se menciona).
  - Descripción del proyecto.
  - Posibles participantes (si se pueden identificar de forma confiable).

- La información extraída se guarda en la base de datos de Supabase.

### Generación de Capturas de Pantalla (GitHub Actions + Playwright):

Dentro del mismo workflow de GitHub Actions (o en un workflow separado que se active al detectar un nuevo proyecto en la base de datos), se utiliza Playwright para:

- Abrir un navegador headless.
- Navegar a la URL del proyecto extraída de la issue.
- Tomar una captura de pantalla del sitio web del proyecto.
- Subir la captura de pantalla al almacenamiento de Supabase.

### Presentación de Proyectos (Next.js/Vercel):

La aplicación Next.js consulta la base de datos de Supabase para obtener la lista de proyectos, incluyendo su URL, descripción y la URL de la captura de pantalla.

Renderiza una página web accesible al público mostrando esta información, con la imagen de cada proyecto.

### Votación (Next.js/Vercel + Supabase + Clerk):

Los usuarios de la comunidad del creador del concurso acceden a una sección de la aplicación Next.js.

Autenticación con Clerk: Los usuarios se autentican utilizando Clerk (se deberá definir el método de autenticación, considerando la posible vinculación con cuentas de Discord).

Los usuarios autenticados pueden votar por hasta tres proyectos, asignando puntuaciones de 1, 2 y 3.

Los votos se registran en la base de datos de Supabase, asociados al usuario autenticado (a través de Clerk) y al proyecto votado.

### Panel de Administración (Next.js/Vercel + Supabase + Clerk):

Una sección protegida de la aplicación Next.js (accesible solo al creador del concurso, autenticado con Clerk) permite:

Visualizar la lista de proyectos y los usuarios que han votado.

Buscar usuarios (posiblemente por su ID de Discord si se implementa la vinculación).

Banear a concursantes y usuarios de la plataforma, actualizando un estado en la base de datos de Supabase.

### CI/CD (GitHub Actions + Vercel):

Un workflow de GitHub Actions se configura para realizar pruebas (si las hay) y desplegar automáticamente la aplicación Next.js a Vercel en cada push al repositorio principal o en ramas específicas.

## Consideraciones Clave:

### Diseño de la Plantilla de la Issue

Es crucial definir una plantilla clara y consistente para las issues de registro de proyectos para facilitar la extracción de información por la API de IA.

### Diseño del Prompt para la IA:

La efectividad de la extracción de información dependerá de la calidad del prompt que se envíe a la API de IA. Se recomienda experimentar con diferentes prompts.

### Manejo de Errores

Implementar un manejo robusto de errores en todos los componentes, especialmente en los workflows de GitHub Actions (fallos en la captura de pantalla, errores de la API de IA).

### Validación de Datos

Validar la información extraída por la API de IA (especialmente las URLs) antes de usarla.

### Seguridad

Implementar medidas de seguridad adecuadas en la aplicación Next.js y en la interacción con la base de datos de Supabase.

### Límites de las APIs Gratuitas

Tener en cuenta las posibles limitaciones de uso de las APIs gratuitas (tanto de IA como de los otros servicios).
