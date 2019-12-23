/*******************************************************************************/
/*  Clase que  controla el inicio del juego, arrancando los métodos necesarios */
/*******************************************************************************/

$(document).ready(function () {
	// Entrutamos las páginas a través del selector de cada sección
	router.loadRouter();    

	// Encendemos el sonido
	soundController.play();

	// Cargamos el array de imágenes del carrusel
	imageSelector.loadImagesCarousel();

});