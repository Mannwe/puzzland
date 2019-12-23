/*******************************************************************************/
/* Clase encargada de controlar la lógica que envuelve a la imagen del puzzle  */    
/*******************************************************************************/

var puzzleImageController = {
    puzzleImage: null,
	gridVisible: false,
	helpImageVisible: false,
	imageWidthInPixels: 0,
	imageHeightInPixels: 0,
	lengthInTiles: 0,
	imageTop: 0,
	imageLeft: 0,
	// Constantes nemotécnicas para ser utilizadas como parámetros
	IMAGE_VISIBLE: true,
	IMAGE_HIDDEN: false,
	GRID_VISIBLE: true,
	GRID_HIDDEN: false,
	// Guardamos valores de la imagen
	start: function(){
		puzzleImageController.imageTop = $('#puzzle-image').offset().top + parseFloat($('#puzzle-image').css('border-top-width'));
        puzzleImageController.imageLeft = $('#puzzle-image').offset().left + parseFloat($('#puzzle-image').css('border-left-width'));

        // Guardamos el objeto DOM del marco que aloja el puzzle para futuros cálculos
        // (la imagen del carrusel es mayor, y por tanto si la utilizamos las dimensiones
        // calculadas descuadrarían)
        puzzleImageController.puzzleImage = imageSelector.puzzleImage.replace('1280x853','750x499');

        puzzleImageController.displaySelectedImageToPlay();
	},
    // Hacemos la recarga de la clase después de una carga de partida guardada (en la que ya viene el valor de puzzleImage)
    reload: function(){
        puzzleImageController.imageTop = $('#puzzle-image').offset().top + parseFloat($('#puzzle-image').css('border-top-width'));
        puzzleImageController.imageLeft = $('#puzzle-image').offset().left + parseFloat($('#puzzle-image').css('border-left-width'));

        puzzleImageController.displaySelectedImageToPlay();
    },
    setImageDimensions: function(){

        // Al ser imágenes con nxn tiles, los números de filas y columnas serán la raíz
        // cuadrada de nxn ( = n)
        puzzleImageController.lengthInTiles = Math.sqrt(sizeSelector.selectedSize);
        puzzleImageController.imageWidthInPixels = $('#puzzle-image').width();
        puzzleImageController.imageHeightInPixels = parseInt($('#puzzle-image').css('padding-top'));      
    },
	displaySelectedImageToPlay: function () {
        $('#puzzle-image').css('background-image', puzzleImageController.puzzleImage);        
	},
	// Mostramos el grid en al pantalla cuando se seleccione
	imageGridVisibility: function (visible) {
        if(visible){
            switch(sizeSelector.selectedSize){
                case 16:
                    for (var offset = 25; offset <= 75; offset = offset + 25){
                        puzzleImageController.showImageGrid(offset);
                    }
                    break;

                case 25:
                    for (var offset = 20; offset <= 80; offset = offset + 20){
                        puzzleImageController.showImageGrid(offset);
                    }
                    break;

                case 36:
                    for (var offset = 16.67; offset <= 83.36; offset = offset + 16.67){
                        console.log('offset ' + offset);
                        puzzleImageController.showImageGrid(offset);
                    }
                    break;

                case 64:
                    for (var offset = 12.5; offset <= 87.5; offset = offset + 12.5){
                        puzzleImageController.showImageGrid(offset);
                    }
                    break;
            }
        }else{
            $('.horizontal-line').remove();
            $('.vertical-line').remove();
        }
        
        // Cambiamos el icono
        if(puzzleImageController.gridVisible){
            $('#view-grid i').removeClass('fa-border-none');
            $('#view-grid i').addClass('fa-th');
        }else{
            $('#view-grid i').addClass('fa-border-none');
            $('#view-grid i').removeClass('fa-th');
        }
        
        puzzleImageController.gridVisible = visible;      
	},
	showImageGrid: function(offset){
        var verticalLine = $('<img />').addClass('vertical-line').css('left', offset + '%').attr('src', 'img/vertical.png'),
            horizontalLine = $('<img />').addClass('horizontal-line').css('top', offset + '%').attr('src', 'img/horizontal.png');

        $('#puzzle-image').append(verticalLine);
        $('#puzzle-image').append(horizontalLine);
        
        $('.horizontal-line').css('opacity', 0.6);
        $('.vertical-line').css('opacity', 0.6);    
    },
    helpImageVisibility: function(visible){

        if(visible){
            $('#puzzle-image').css({
                'background-image': puzzleImageController.puzzleImage,
                'opacity': 0.4
            });

            // Cambiamos el icono
            $('#view-image i').removeClass('fa-eye-slash');
            $('#view-image i').addClass('fa-eye');
        }else{
            $('#puzzle-image').css('background-image', 'none');
            console.log('ocultamos?');

            // Cambiamos el icono
            $('#view-image i').addClass('fa-eye-slash');
            $('#view-image i').removeClass('fa-eye');            
        }

        puzzleImageController.helpImageVisible = !puzzleImageController.helpImageVisible;
    }
}