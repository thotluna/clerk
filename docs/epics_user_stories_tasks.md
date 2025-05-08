# Documento Completo: Plataforma de Gestión de Concursos

Este documento describe las épicas, historias de usuario y tareas necesarias para el desarrollo de la plataforma de gestión de concursos.

## 1. Épica: Registro y Gestión de Concursos

Como creador de un concurso, quiero poder registrar un nuevo concurso en la plataforma, especificando el repositorio de GitHub donde los participantes registrarán sus proyectos, para poder gestionar centralizadamente la información del concurso.

### Historias de Usuario:

- Como creador de un concurso, quiero poder acceder a una sección de administración donde pueda crear un nuevo concurso.

- Como creador de un concurso, quiero poder ingresar el nombre del concurso.

- Como creador de un concurso, quiero poder ingresar una descripción del concurso.

- Como creador de un concurso, quiero poder ingresar la URL del repositorio de GitHub donde los participantes registrarán sus proyectos.

- Como creador de un concurso, quiero poder especificar la fecha de inicio del concurso.

- Como creador de un concurso, quiero poder especificar la fecha de fin del concurso.

- Como creador de un concurso, quiero poder definir las reglas del concurso.

- Como creador de un concurso, quiero poder ver un resumen de la información del concurso antes de confirmarlo.

- Como creador de un concurso, quiero poder editar la información del concurso después de haberlo creado, en caso de que necesite hacer cambios.

- Como creador de un concurso, quiero poder cancelar un concurso si es necesario.

- Como creador de un concurso, quiero poder ver una lista de todos los concursos que he creado.

- Como creador de un concurso, quiero poder ver los detalles de un concurso específico que he creado.

## 2. Épica: Registro de Proyectos por los Participantes

Como participante de un concurso, quiero poder registrar mi proyecto creando una "issue" en el repositorio de GitHub del concurso, siguiendo una plantilla, para que mi proyecto sea considerado en el concurso.

### Historias de Usuario:

- Como participante de un concurso, quiero poder acceder al repositorio de GitHub del concurso.

- Como participante de un concurso, quiero poder crear una nueva "issue" en el repositorio del concurso.

- Como participante de un concurso, quiero poder usar una plantilla predefinida para crear la "issue" de mi proyecto.

- Como participante de un concurso, quiero poder ingresar el nombre de mi proyecto en la "issue".

- Como participante de un concurso, quiero poder ingresar la URL de mi proyecto en la "issue".

- Como participante de un concurso, quiero poder ingresar una descripción de mi proyecto en la "issue".

- Como participante de un concurso, quiero poder (opcionalmente) ingresar los nombres de los miembros de mi equipo en la "issue".

- Como participante de un concurso, quiero poder confirmar que he seguido las reglas del concurso al crear la "issue".

- Como participante de un concurso, quiero poder ver un mensaje de confirmación después de crear la "issue" de mi proyecto.

- Como participante de un concurso, quiero poder editar la "issue" de mi proyecto después de haberla creado, en caso de que necesite hacer cambios.

## 3. Épica: Visualización de Proyectos Participantes

Como usuario de la plataforma, quiero poder ver una lista de los proyectos registrados en un concurso, incluyendo una descripción y una vista previa del proyecto, para poder explorar los proyectos participantes.

### Historias de Usuario:

- Como usuario de la plataforma, quiero poder ver una lista de todos los proyectos participantes en un concurso.

- Como usuario de la plataforma, quiero que la lista de proyectos muestre el nombre de cada proyecto.

- Como usuario de la plataforma, quiero que la lista de proyectos muestre una breve descripción de cada proyecto.

- Como usuario de la plataforma, quiero que la lista de proyectos muestre una vista previa visual de cada proyecto (captura de pantalla).

- Como usuario de la plataforma, quiero poder ordenar la lista de proyectos por diferentes criterios (ej., fecha de registro, número de votos).

- Como usuario de la plataforma, quiero poder filtrar la lista de proyectos por diferentes criterios (ej., categoría, tecnología).

- Como usuario de la plataforma, quiero poder hacer clic en un proyecto para ver más detalles.

- Como usuario de la plataforma, quiero que la página de detalles del proyecto muestre una descripción completa del proyecto.

- Como usuario de la plataforma, quiero que la página de detalles del proyecto muestre la URL del proyecto.

- Como usuario de la plataforma, quiero que la página de detalles del proyecto muestre los nombres de los participantes del proyecto.

## 4. Épica: Sistema de Votación de la Comunidad

Como usuario de la plataforma autenticado con Clerk, quiero poder votar por mis proyectos favoritos, asignando una puntuación, para poder apoyar a los proyectos que considero más valiosos.

### Historias de Usuario:

- Como usuario de la plataforma, quiero poder acceder a la sección de votación de un concurso.

- Como usuario de la plataforma, quiero poder ver la lista de proyectos participantes disponibles para votar.

- Como usuario de la plataforma, quiero poder ver el nombre y una breve descripción de cada proyecto en la lista de votación.

- Como usuario de la plataforma, quiero poder ver una vista previa visual de cada proyecto (captura de pantalla) en la lista de votación.

- Como usuario de la plataforma, quiero poder seleccionar hasta tres proyectos para votar.

- Como usuario de la plataforma, quiero poder asignar una puntuación a cada uno de los proyectos que selecciono (por ejemplo, 3 puntos al proyecto que más me gusta, 2 al siguiente y 1 al tercero).

- Como usuario de la plataforma, quiero poder ver un resumen de mi selección y las puntuaciones asignadas antes de confirmar mi voto.

- Como usuario de la plataforma, quiero poder confirmar mi voto una vez que estoy satisfecho con mi selección.

- Como usuario de la plataforma, quiero ver un mensaje de confirmación después de que mi voto se haya registrado con éxito.

- Como usuario de la plataforma, quiero poder ver los resultados de la votación después de que termine el período de votación.

- Como usuario de la plataforma, quiero poder ver los proyectos ordenados por el número de votos recibidos.

- Como usuario de la plataforma, quiero poder ver el nombre, descripción, vista previa y puntuación total de cada proyecto en los resultados de la votación.

## 5. Épica: Administración de Usuarios y Proyectos

Como creador de un concurso, quiero poder administrar los usuarios y proyectos de mi concurso, incluyendo la capacidad de banear usuarios y concursantes, para mantener la integridad del concurso.

### Historias de Usuario:

- Como creador de un concurso, quiero poder ver una lista de todos los usuarios que han participado en el concurso.

- Como creador de un concurso, quiero poder buscar usuarios por su nombre o ID.

- Como creador de un concurso, quiero poder ver el perfil de un usuario, incluyendo su información de registro y actividad en la plataforma.

- Como creador de un concurso, quiero poder ver una lista de todos los proyectos registrados en el concurso.

- Como creador de un concurso, quiero poder buscar proyectos por su nombre o descripción.

- Como creador de un concurso, quiero poder ver los detalles de un proyecto, incluyendo su descripción completa, URL y participantes.

- Como creador de un concurso, quiero poder ver el estado de un usuario (por ejemplo, activo, baneado).

- Como creador de un concurso, quiero poder banear a un usuario de la plataforma, impidiéndole participar en futuras votaciones o concursos.

- Como creador de un concurso, quiero poder ver el estado de un proyecto (por ejemplo, aprobado, rechazado).

- Como creador de un concurso, quiero poder aprobar o rechazar un proyecto, determinando si es elegible para participar en el concurso.

- Como creador de un concurso, quiero poder editar la información de un proyecto, en caso de que necesite corregir algún error.

## 6. Épica: Automatización del Flujo de Trabajo

Como desarrollador de la plataforma, quiero automatizar el proceso de recolección de información de los proyectos y la generación de vistas previas de los mismos, para reducir el trabajo manual y mejorar la eficiencia.

### Historias de Usuario:

- Como desarrollador de la plataforma, quiero que el sistema capture automáticamente la información esencial del proyecto (URL, descripción) desde la "issue" de GitHub, para evitar la entrada manual de datos.

- Como desarrollador de la plataforma, quiero que el sistema genere automáticamente una vista previa visual del proyecto a partir de la URL proporcionada, para que los usuarios puedan ver una representación del proyecto sin tener que visitarlo.

- Como desarrollador de la plataforma, quiero que el sistema almacene automáticamente la información del proyecto y la vista previa generada, para que estén disponibles para su visualización y votación.

- Como desarrollador de la plataforma, quiero que el sistema maneje automáticamente los errores que puedan ocurrir durante la captura de la vista previa, para asegurar que el proceso sea robusto y confiable.

### Tareas:

- Configurar un workflow en GitHub Actions para que se ejecute al crearse una nueva "issue" en el repositorio del concurso.

- Extraer la URL del proyecto y la descripción de la "issue" de GitHub.

- Utilizar Playwright para tomar una captura de pantalla del proyecto.

- Subir la captura de pantalla a Supabase Storage.

- Guardar la URL de la captura de pantalla, la URL del proyecto y la descripción en la base de datos.

- Implementar lógica de reintento para la captura de pantalla.

- Implementar registro de errores.

## 7. Épica: Despliegue e Integración Continua

Como desarrollador de la plataforma, quiero automatizar el proceso de despliegue de la aplicación a producción y asegurar la calidad del código mediante pruebas automáticas.

### Tareas:

- Configurar un pipeline de CI/CD en GitHub Actions.

- Definir los pasos del pipeline (ej., linting, pruebas unitarias, pruebas de integración, despliegue).

- Configurar el despliegue automático de la aplicación Next.js a Vercel.

- Configurar las pruebas automáticas para que se ejecuten en cada cambio de código.

- Asegurar que el despliegue solo se realice si todas las pruebas pasan.

- Implementar notificaciones sobre el estado del pipeline (ej., éxito, fallo).

- Configurar el versionamiento de la aplicación.
