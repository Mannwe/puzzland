/*******************************************************************************/
/*  Clase encargada de controlar la pantalla de selección del tamaño de la     */
/*  seleccionada															   */	
/*******************************************************************************/

var sizeSelector = {
	selectedSize: 0,
	loadSizeSelector: function(uri){

		// Cargamos la sección actual y ocultamos las otras 
		$('#' + uri).show().siblings().hide();

		sizeSelector.displayImageToChooseSize();
		sizeSelector.displaySelectedImageSizeGrid();
	},
	// Mostramos la imagen seleccionada en el formato x4, con los distintos tamaños
    displayImageToChooseSize: function () {

        // Colocamos la imagen elegida en las cuatro casillas de selección de tamaño
        var selectedImg = imageSelector.puzzleImage;

        var lowResolutionImage = selectedImg.replace('1280x853','640x426'),
        	sizeImg = $('.size-img');
        sizeImg.css('background-image', selectedImg);
    },
    displaySelectedImageSizeGrid: function () {
        
        $('.horizontal-line').css('opacity', 0.4);
        $('.vertical-line').css('opacity', 0.4);

        // Añadimos las imágenes de la rejilla de selección de tamaño dinámicamente
        for (var offset = 25; offset <= 75; offset = offset + 25) {
            var verticalLine = $('<img />').addClass('vertical-line').css('left', offset + '%').attr('src', 'img/vertical.png');
            var horizontalLine = $('<img />').addClass('horizontal-line').css('top', offset + '%').attr('src', 'img/horizontal.png');

            $('#img-1').append(verticalLine);
            $('#img-1').append(horizontalLine);
        }
        for (var offset = 20; offset <= 80; offset = offset + 20) {
            var verticalLine = $('<img />').addClass('vertical-line').css('left', offset + '%').attr('src', 'img/vertical.png');
            var horizontalLine = $('<img />').addClass('horizontal-line').css('top', offset + '%').attr('src', 'img/horizontal.png');

            $('#img-2').append(verticalLine);
            $('#img-2').append(horizontalLine);
        }
        for (var offset = 16.6; offset <= 83.2; offset = offset + 16.6) {
            var verticalLine = $('<img />').addClass('vertical-line').css('left', offset + '%').attr('src', 'img/vertical.png');
            var horizontalLine = $('<img />').addClass('horizontal-line').css('top', offset + '%').attr('src', 'img/horizontal.png');

            $('#img-3').append(verticalLine);
            $('#img-3').append(horizontalLine);
        }
        for (var offset = 12.5; offset <= 87.5; offset = offset + 12.5) {
            var verticalLine = $('<img />').addClass('vertical-line').css('left', offset + '%').attr('src', 'img/vertical.png');
            var horizontalLine = $('<img />').addClass('horizontal-line').css('top', offset + '%').attr('src', 'img/horizontal.png');

            $('#img-4').append(verticalLine);
            $('#img-4').append(horizontalLine);
        }
    },
    loadSelectedSize: function(size){
    	sizeSelector.selectedSize = size;
    }
}