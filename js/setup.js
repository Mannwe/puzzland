/*******************************************************************************/
/*  Clase encargada de iniciar la preparación del juego						   */
/*******************************************************************************/

// Tooltip del juego
$(document).ready(function () {
	$(document).tooltip({
	    classes: {
	        'ui-tooltip': 'game-tooltip'
	    },
	    'game-tooltip': 'ui-widget-shadow',
	    show:{
	        effect: "blind", 
	        duration: 200
	        }
	});

	// Cargamos las melodias del juego
	soundController.setUpGameMusic();

	internationalization.load();	
});
