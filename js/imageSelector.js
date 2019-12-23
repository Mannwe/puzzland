/*******************************************************************************/
/*  Clase encargada de controlar la pantalla de selección de fotos para el     */
/*  puzzle 																	   */	
/*******************************************************************************/

var imageSelector = {
	puzzleImage: null,
	arrayImages: null,
	currentImageIndex: 0,
	loadImageSelector: function(uri){

		imageSelector.currentImageIndex = 0;

		// Cargamos la sección actual y ocultamos las otras 
		$('#' + uri).show().siblings().hide();

		imageSelector.loadEventHandlers();

		var htmlContent = '';	
		imageSelector.arrayImages.forEach((img, index) => {

			// Concatenamos los divs
			htmlContent += '<li id="array-img' + index  + '" class="carousel"></li>';
		});

		$('#carousel-container').html(htmlContent);

		// A través de su id, le asignamos la imagen de fondo 
		// y las dimensiones de cada div
		var containerWidth = $('#carousel-container').width(),
			containerHeight = $('#carousel-container').height();

		imageSelector.arrayImages.forEach((img, index) => {
			var backgroundImage = 'url("img/' + img + '")';
			$('#array-img' + index).css('background-image', backgroundImage)
								   .width(containerWidth)
								   .css('padding-top', containerHeight);
		});		

		// Inicializamos el carrusel con la primera imágen
		var firstImage = imageSelector.arrayImages[0],
		 	firstImage = 'url("img/' + firstImage + '")';
		
		$('#array-img0').css('background-image', firstImage);

		// Guardamos en la variable global puzzleImage la imagen actual
		imageSelector.loadPuzzleImage();

		// Ocultamos botones anterior/siguiente si es necesario
		imageSelector.checkFirstLastImage();
	},
	/* Método para las vinculaciones de los eventos */
	loadEventHandlers: function(){
		$('#prev i').bind('click',function(){

			imageSelector.previousImage();

			// Ocultamos botones anterior/siguiente si es necesario
			imageSelector.checkFirstLastImage();
        });

        $('#next i').bind('click',function(){
            imageSelector.nextImage();

            // Ocultamos botones anterior/siguiente si es necesario
			imageSelector.checkFirstLastImage();
        });
	},
	loadPuzzleImage: function(){
		// Cargamos la imagen para el resto de la partida
        imageSelector.puzzleImage = $('.carousel').css('background-image');
	},
	nextImage: function(){

		imageSelector.currentImageIndex++;

		var currentImage = $('#carousel-container li:first');
	    currentImage.animate({'margin-left': '-' + currentImage.width() + 'px'}, 1000, function() {
        	currentImage.remove().css({'margin-left': '0px'});
        	$('#carousel-container li:last').after(currentImage);
    	});    	
	},
	previousImage: function(){

		imageSelector.currentImageIndex--;

		var currentImage = $('#carousel-container li:last');

    	currentImage.remove().css({'margin-left': '-' + currentImage.width() + 'px'});
    	$('#carousel-container li:first').before(currentImage);
    	currentImage.animate({'margin-left': '0px'}, 1000);


	},
	loadImagesCarousel: function(){
		imageSelector.arrayImages = ['img1-1280x853.jpg', // Pixabay - Roberto Shumski - Chikilino
							         'img2-1280x853.jpg', // Pixabay - Hermann Schmider 
		  					         'img3-1280x853.jpg', // Pixabay - Valentin Sabau 
		 					         'img4-1280x853.jpg', // Pixabay - Frank Winkle
							         'img5-1280x853.jpg', // Pixabay - David Mark
							         'img6-1280x853.jpg', // Pixabay - Andreas Breitling
							         'img7-1280x853.jpg', // Pixabay - David Mark
							         'img8-1280x853.jpg', // Pixabay - Michael Siebert 
							       ];

	},
	checkFirstLastImage: function(){
		// Si es la primera imagen, ocultamos el botón anterior
		if (imageSelector.currentImageIndex == 0){
			$('#prev i').hide();
		}else{
			$('#prev i').show();
		}

		// Si es la última imagen, ocultamos el botón siguiente
		console.log('imageSelector.currentImageIndex ' + imageSelector.currentImageIndex);
		if (imageSelector.currentImageIndex == imageSelector.arrayImages.length - 1) {
			$('#next i').hide();
		}else{
			$('#next i').show();
		}
	},
}