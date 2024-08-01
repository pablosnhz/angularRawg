# AllApp

Aplicacion donde llevo abordo todos mis conocimientos con Angular

En esta aplicacion hice uso de Estructuramiento de Carpetas, Tailwind, Sass, Interceptors, Peticiones HTTP, RxJS, Pipes, Environments, Resolvers, Reutilizacion de componentes

Empece estructurando las carpetas para un mejor orden a medida que escala el proyecto, como tambien haciendo uso de un Interceptor de Autenticacion con un query params, utilizandolo para la API que requiere autenticacion mediante token para manipular las solicitudes y respuestas HTTP de manera centralizada y consistente en toda la aplicacion.
Dentro del servicio hacemos la peticion http con el endpoint para recuperar todos los juegos y mostrarlos en pantalla mediante un Json Pipe para mostrar los datos en pantalla y empezar a manipularlos.

(de que forma sabemos que el interceptor esta funcionando correctamente? porque en cada solicitud en el network se hace presente como tambien porque justificamos el interceptor dentro del modulo principal)

Utilizacion de modulos independientes para cargas diferidas de los diversos componentes segun la estructura del proyecto para hacer uso dentro del routes.ts para la carga diferida de los mismos.
Hice pruebas con la api de TMDB la cual tenia una un token de tipo Autorizacion, lo contrario a la de Rawg que tiene uno de tipo QueryParams.

Realice la peticion definiendo la interface para la busqueda de juegos por peticion http y mediante la ruta junto con el parametro de 'games' para obtener el listado de todos los juegos. Para emitir los resultados de la peticion lo hice con un WritableSignal seteando los valores con $games, mediante inputs recibimos los valores de la interface a la cual le dimos estilo. En el componente card le dimos estilo a las card, en listComponent recorremos las cards con un for y gamePageComponent el estilo con un grid.

Aprovechando la busqueda de todos los juegos le aplicamos tambien la busqueda de juegos por input, dentro del servicio mediante un behaviorSubject, hacemos emision del public queryString$ para recibirlo en gamesPageComponent, en este solo dentro del ObjectParams le agregamos el title el cual declaramos en los parametros para la busqueda filtrada tambien el setGames para el data.results y en topBarComponent que es donde esta el input para realizar la busqueda

el behaviorSubject se hace para emitir valores pero al estar en privado hice el queryString$ asi pasar los valores en setQueryString para recibirlos en gamesPageComponente dentro del oninit me traigo el this.searchService.queryString$ para recibir los valores que emite con los parametros de busqueda de search: title y el setGames es donde va a hacer la busqueda de todos los juegos y para finalizar en topbarcomponente cada vez que el usuario escribe por el query el queryChange$ lo detecta y en base a eso hace la busqueda...

Vamos a hacer uso de un Resolver para hacer un prefetch de datos antes de hacer el redirect para los juegos por id definiendolo en la ruta la cual nos va a llevar al detalle del juego.

Estoy con problemas de que quiero el topbar con el swiper si, pero una vez seleccionado el juego por su id no quiero que aparezca haciendo esto el background addicional del juego ocuparia tanto topbar como main...
