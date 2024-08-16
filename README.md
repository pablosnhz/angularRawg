# AllApp

Aplicacion donde llevo abordo todos mis conocimientos con Angular

En esta aplicacion hice uso de Estructuramiento de Carpetas, Tailwind, Sass, Interceptors, Peticiones HTTP, RxJS, Pipes, Environments, Resolvers, Reutilizacion de componentes, Reactive Forms

Empece estructurando las carpetas para un mejor orden a medida que escala el proyecto, como tambien haciendo uso de un Interceptor de Autenticacion con un query params, utilizandolo para la API que requiere autenticacion mediante token para manipular las solicitudes y respuestas HTTP de manera centralizada y consistente en toda la aplicacion.
Dentro del servicio hacemos la peticion http con el endpoint para recuperar todos los juegos y mostrarlos en pantalla mediante un Json Pipe para mostrar los datos en pantalla y empezar a manipularlos.

(de que forma sabemos que el interceptor esta funcionando correctamente? porque en cada solicitud en el network se hace presente como tambien porque justificamos el interceptor dentro del modulo principal)

Utilizacion de modulos independientes para cargas diferidas de los diversos componentes segun la estructura del proyecto para hacer uso dentro del routes.ts para la carga diferida de los mismos.
Hice pruebas con la api de TMDB la cual tenia una un token de tipo Autorizacion, lo contrario a la de Rawg que tiene uno de tipo QueryParams.

Realice la peticion definiendo la interface para la busqueda de juegos por peticion http y mediante la ruta junto con el parametro de 'games' para obtener el listado de todos los juegos. Para emitir los resultados de la peticion lo hice con un WritableSignal seteando los valores con $games, mediante inputs recibimos los valores de la interface a la cual le dimos estilo. En el componente card le dimos estilo a las card, en listComponent recorremos las cards con un for y gamePageComponent el estilo con un grid.

Aprovechando la busqueda de todos los juegos le aplicamos tambien la busqueda de juegos por input, dentro del servicio mediante un behaviorSubject, hacemos emision del public queryString$ para recibirlo en gamesPageComponent, en este solo dentro del ObjectParams le agregamos el title el cual declaramos en los parametros para la busqueda filtrada tambien el setGames para el data.results y en topBarComponent que es donde esta el input para realizar la busqueda

el behaviorSubject se hace para emitir valores pero al estar en privado hice el queryString$ asi pasar los valores en setQueryString para recibirlos en gamesPageComponente dentro del oninit me traigo el this.searchService.queryString$ para recibir los valores que emite con los parametros de busqueda de search: title y el setGames es donde va a hacer la busqueda de todos los juegos y para finalizar en topbarcomponente cada vez que el usuario escribe por el query el queryChange$ lo detecta y en base a eso hace la busqueda...

Vamos a hacer uso de un Resolver para hacer un prefetch de datos antes de hacer el redirect para los juegos por id definiendolo en la ruta la cual nos va a llevar al detalle del juego.
Estoy con problemas de que quiero el topbar con el swiper si, pero una vez seleccionado el juego por su id no quiero que aparezca haciendo esto el background addicional del juego ocuparia tanto topbar como main, estos datos para el background del juego para el details solo se encuentra en los datos por id, no venia incluido por la lista de juegos...

Herencia de componentes por medio de un componente abstracto, por medio del componente padre que es el abstracto, defini tanto las interfaces como tambien las inyecciones por medio del inject porque a la hora de extender la clase abstracta al componente hijo habria que pasarle las inyecciones por medio del constructor pero si tendriamos multiples herencias esto se volveria un caos, asi que en el componente padre hicimos uso del inject para evitar esto.
Ya por ultimo para la clase abstracta seria eso, simplemente en el componente hijo extendemos el componente padre junto al super y si queremos especificar diversos parametros para esto lo hacemos por medio del override, a simple vista ya se puede ver en accion navegando a All Games y a Recently Games.

Filtros de Order y Platform mediante un reactive forms, para empezar importamos el reactiveFormsModule para iniciar los formularios tanto para platform como para order, tome como valores de la url de rawg para aplicarlos en el template y asi tener referencia cuando nos subscribimos a los cambios del formulario para que nos traiga la lista de juegos segun lo seleccionado, la subscripcion la hacemos dentro del init del form para que detecte estos cambios. Inclusive hicimos dos funciones, una para los filtros y otra para la busqueda para los juegos, filter y del input search.
Por medio de un condicional especificado en la interface declaramos searchFilters para especificar por medio del override si queriamos o no tener los filtros del form.

Hemos implementado un sistema de infinite scroll en la lista de todos los juegos desde la clase abstracta. Para lograrlo, utilizamos el paquete ngx-infinite-scroll, compatible con la versión de Angular que estamos usando.
Al obtener la lista inicial de juegos desde la API, recibimos un objeto results que incluye una propiedad next. Esta propiedad next contiene la URL para cargar la siguiente página de resultados. Cuando hacemos scroll hacia abajo, se dispara un evento que activa la carga de la siguiente página de juegos, utilizando esta URL.
Para manejar esta funcionalidad, creamos un método en el servicio que gestiona la nextUrl. Este método se encarga de realizar la solicitud a la API para obtener la siguiente página de resultados cuando sea necesario.
En el componente, utilizamos exhaustMap para gestionar la concatenación de observables. Este operador se asegura de que solo una solicitud esté en proceso a la vez, previniendo múltiples llamadas simultáneas cuando se activa el scroll. Los nuevos juegos obtenidos se añaden a los juegos existentes en la lista, actualizando la vista de manera fluida y eficiente.
De esta forma, la lista se expande automáticamente con nuevos juegos a medida que el usuario navega hacia abajo, proporcionando una experiencia de usuario continua y sin interrupciones.
(dentro del searchGames tambien hacemos uso del pipe y del tap para concatenar la proxima informacion que va a llegar por medio de nextUrl, para que de alguna forma sepa de donde se va a gestionar la informacion de la paginacion)
