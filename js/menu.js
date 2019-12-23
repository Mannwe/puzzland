/*******************************************************************************/
/*  Clase encargada de controlar la pantalla del menú inicial			       */
/*******************************************************************************/

var menu = {
	loadMenu: function(uri){

		menu.menuEventsHandler();
		// Cargamos la sección actual y ocultamos las otras 
		$(uri).show().siblings().hide();
	},
	menuEventsHandler: function(){
		$('#btn-load-game').bind('click',function(){
            serializationController.loadGame();
        });
	
		$('#spanish').bind('click', function(){
			internationalization.translateToSpanish();
			internationalization.selectedLanguage = 'spanish';
		});
		
		$('#english').bind('click', function(){
			internationalization.translateToEnglish();
			internationalization.selectedLanguage = 'english';
		});
	}
}