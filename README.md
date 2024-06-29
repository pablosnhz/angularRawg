# AllApp

Aplicacion donde llevo abordo todos mis conocimientos con Angular

En esta aplicacion hice uso de Estructuramiento de Carpetas, Tailwind, Sass, Interceptors, Peticiones HTTP, RxJS, Pipes, Environments,

Empece estructurando las carpetas para un mejor orden a medida que escala el proyecto, como tambien haciendo uso de un Interceptor de Autenticacion con un query params, utilizandolo para la API que requiere autenticacion mediante token para manipular las solicitudes y respuestas HTTP de manera centralizada y consistente en toda la aplicacion.
Dentro del servicio hacemos la peticion http con el endpoint para recuperar todos los juegos y mostrarlos en pantalla mediante un Json Pipe para mostrar los datos en pantalla y empezar a manipularlos.

(de que forma sabemos que el interceptor esta funcionando correctamente? porque en cada solicitud en el network se hace presente como tambien porque justificamos el interceptor dentro del modulo principal)

Utilizacion de modulos independientes para cargas diferidas de los diversos componentes segun la estructura del proyecto para hacer uso dentro del routes.ts para la carga diferida de los mismos.
