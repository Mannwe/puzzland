/*******************************************************************************/
/* Clase que enruta las diferentes páginas de la aplicación                    */    
/*******************************************************************************/

var router = {
    loadRouter: function(){
        $(window).bind('hashchange', function () {

            var uri = !location.hash ? 'menu-section' : location.hash.replace('#game/', '');

            switch(uri){
                case 'menu-section':
                    menu.loadMenu('#menu-section');
                    break;

                case 'img-selection-section':
                    imageSelector.loadImageSelector(uri);                    
                    break;

                case 'size-selection-section':
                    imageSelector.loadPuzzleImage(); // Cargamos la imagen seleccionada para e resto del juego
                    sizeSelector.loadSizeSelector(uri);
                    break;

                case 'credits-section':
                    $('#' + uri).show().siblings().hide();
                    break;
                        
                default:
                        case 'play/16pcs':
                            // Se ha seleccionado jugar con 16 piezas
                            if(!serializationController.gameLoaded){
                                sizeSelector.loadSelectedSize(16); // Cargamos el tamaño seleccionado para e resto del juego
                                gameController.startGame(sizeSelector.selectedSize);
                            }
                            break;

                        case 'play/25pcs':
                            // Se ha seleccionado jugar con 25 piezas
                            if(!serializationController.gameLoaded){
                                sizeSelector.loadSelectedSize(25); // Cargamos el tamaño seleccionado para e resto del juego
                                gameController.startGame(sizeSelector.selectedSize);
                            }
                            break;

                        case 'play/36pcs':
                            // Se ha seleccionado jugar con 25 piezas
                            if(!serializationController.gameLoaded){
                                sizeSelector.loadSelectedSize(36); // Cargamos el tamaño seleccionado para e resto del juego
                                gameController.startGame(sizeSelector.selectedSize);
                            }
                            break;

                        case 'play/64pcs':
                            // Se ha seleccionado jugar con 25 piezas
                            if(!serializationController.gameLoaded){
                                sizeSelector.loadSelectedSize(64); // Cargamos el tamaño seleccionado para e resto del juego
                                gameController.startGame(sizeSelector.selectedSize);
                            }
                            break;
            }
        }).trigger('hashchange');   
    }
}