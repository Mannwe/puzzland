/*******************************************************************************/
/*  Clase encargada de gestionar las etiquetas en distintos idiomas		       */
/*******************************************************************************/

var internationalization = {
	labels: [],
	selectedLanguage: 'spanish', // Para los textos dinámicos
	load: function(){
		
		internationalization.labels['spanish'] = new Array();
		internationalization.labels['english'] = new Array();

		internationalization.initializeSpanishLabels();
		internationalization.initializeEnglishLabels();	
	},
	initializeSpanishLabels: function(){
		internationalization.labels['spanish']['lng-welcome'] = '¡Bienvenido a puzzland!';
		internationalization.labels['spanish']['lng-new-game'] = 'Nueva Partida';
		internationalization.labels['spanish']['lng-load-game'] = 'Cargar Partida';
		internationalization.labels['spanish']['lng-credits'] = 'Créditos';
		internationalization.labels['spanish']['lng-sel-img'] = 'Selecciona una imagen...';
		internationalization.labels['spanish']['lng-choose'] = '¡Me quedo con esta!';
		internationalization.labels['spanish']['lng-sel-size'] = 'Selecciona el tamaño del puzzle...';
		internationalization.labels['spanish']['lng-16'] = '16 piezas';
		internationalization.labels['spanish']['lng-25'] = '25 piezas';
		internationalization.labels['spanish']['lng-36'] = '36 piezas';
		internationalization.labels['spanish']['lng-64'] = '64 piezas';
		internationalization.labels['spanish']['lng-credits-header'] = 'Créditos';
		internationalization.labels['spanish']['lng-thanks-intro'] = 'Expreso mi agradecimiento a los siguientes desarrolladores anónimos, cuyo trabajo me ha sido de gran utilidad:';
		internationalization.labels['spanish']['lng-thanks1'] = 'Por sus fantásticos diseños de banderas';
		internationalization.labels['spanish']['lng-thanks2'] = 'Por sus melodías en Playonloop';
		internationalization.labels['spanish']['lng-thanks3'] = 'Por sus melodías en Freesound';
		internationalization.labels['spanish']['lng-thanks4'] = 'Por su fantástico trabajo en Pixabay';
		internationalization.labels['spanish']['lng-thanks5'] = 'Por su fantástico trabajo en Pixabay';
		internationalization.labels['spanish']['lng-thanks6'] = 'Por su fantástico trabajo en Pixabay';
		internationalization.labels['spanish']['lng-thanks7'] = 'Por su fantástico trabajo en Pixabay';
		internationalization.labels['spanish']['lng-thanks8'] = 'Por su fantástico trabajo en Pixabay';
		internationalization.labels['spanish']['lng-thanks9'] = 'Por su fantástico trabajo en Pixabay';
		internationalization.labels['spanish']['lng-thanks-message'] = '¡¡¡Gracias!!!';

		// Traducimos los títulos para los tooltips
		internationalization.labels['spanish']['shuffle'] = 'Barajar';
		internationalization.labels['spanish']['view-image'] = 'Ver Imagen';
		internationalization.labels['spanish']['view-grid'] = 'Ver Rejilla';
		internationalization.labels['spanish']['save'] = 'Guardar la partida';
		internationalization.labels['spanish']['home'] = 'Inicio';
		internationalization.labels['spanish']['english'] = 'Inglés';
		internationalization.labels['spanish']['spanish'] = 'Español';
		
	},
	initializeEnglishLabels: function(){
		internationalization.labels['english']['lng-welcome'] = 'Welcome to puzzland!';
		internationalization.labels['english']['lng-new-game'] = 'New Game';
		internationalization.labels['english']['lng-load-game'] = 'Load Game';
		internationalization.labels['english']['lng-credits'] = 'Credits';
		internationalization.labels['english']['lng-sel-img'] = 'Choose an image...';
		internationalization.labels['english']['lng-choose'] = 'I will take this one!';
		internationalization.labels['english']['lng-sel-size'] = 'Choose puzzle size...';
		internationalization.labels['english']['lng-16'] = '16 tiles';
		internationalization.labels['english']['lng-25'] = '25 tiles';
		internationalization.labels['english']['lng-36'] = '36 tiles';
		internationalization.labels['english']['lng-64'] = '64 tiles';
		internationalization.labels['english']['lng-credits-header'] = 'Credits';
		internationalization.labels['english']['lng-thanks-intro'] = 'I would like to express my gratitude to the below anonymus developers, whoose work have been so much useful:';
		internationalization.labels['english']['lng-thanks1'] = 'For her/his great flag designs';
		internationalization.labels['english']['lng-thanks2'] = 'For her/his nice sounds in Playonloop';
		internationalization.labels['english']['lng-thanks3'] = 'For her/his nice sounds in Freesound';
		internationalization.labels['english']['lng-thanks4'] = 'For her/his awesome work in Pixabay';
		internationalization.labels['english']['lng-thanks5'] = 'For her/his awesome work in Pixabay';
		internationalization.labels['english']['lng-thanks6'] = 'For her/his awesome work in Pixabay';
		internationalization.labels['english']['lng-thanks7'] = 'For her/his awesome work in Pixabay';
		internationalization.labels['english']['lng-thanks8'] = 'For her/his awesome work in Pixabay';
		internationalization.labels['english']['lng-thanks9'] = 'For her/his awesome work in Pixabay';
		internationalization.labels['english']['lng-thanks-message'] = 'Thanks!!!';

		// Traducimos los títulos para los tooltips
		internationalization.labels['english']['shuffle'] = 'Shuffle';
		internationalization.labels['english']['view-image'] = 'Show Image';
		internationalization.labels['english']['view-grid'] = 'Show Grid';
		internationalization.labels['english']['save'] = 'Save the game';
		internationalization.labels['english']['home'] = 'Home';
		internationalization.labels['english']['english'] = 'English';
		internationalization.labels['english']['spanish'] = 'Spanish';
	},
	translateToSpanish: function(){
		$('.translatable').each(function(){
			id = $(this).attr('id');
			$('#' + id).html(internationalization.labels['spanish'][id]);
		});

		$('.title-translatable').each(function(){
			id = $(this).attr('id');
			$('#' + id).attr('title', internationalization.labels['spanish'][id]);
		});
	},
	translateToEnglish: function(){
		$('.translatable').each(function(){
			id = $(this).attr('id');
			$('#' + id).html(internationalization.labels['english'][id]);
		});

		$('.title-translatable').each(function(){
			id = $(this).attr('id');
			$('#' + id).attr('title', internationalization.labels['english'][id]);
		});
	}
}