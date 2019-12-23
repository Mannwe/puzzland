/*******************************************************************************/
/*  Clase encargada de controlar las mecánincas de la pantalla de juego        */
/*******************************************************************************/

var gameController = {
	MIN_OFFSET: 40, // Constante con el valor a partir del cual los tiles se recolocan solos
	tilesArray: [],
	shuffledTilesArea: null,
	topForegroundTilePosition: 1, // Los z-index de los tiles al arrastrarlos y soltarlos
    gameSucceeded: false,
	startGame: function(uri){

		// Cargamos la sección actual y ocultamos las otras 
		$('#play-section').show().siblings().hide();
		
		// Inicializamos la imagen
		puzzleImageController.start();

        /*** Inicializamos variables de la imagen ***/

		// Obtenemos las dimensiones de la imagen        
        puzzleImageController.setImageDimensions();
        
        // Resto de inicializaciones
        gameController.shuffledTilesArea = $('#shuffled-tiles-area');

        // Reseteamos si venimos de las flechas de navegación
        gameController.resetScreen();

        gameController.hideGameElements();
        timeCounter.load();

        // Timeout que arranca el juego
        setTimeout(function(){
            // Llamamos a los métodos necesarios para arrancar el juego
	        
	        // Barajamos los tiles
	        gameController.shuffleTiles();

            // Por defecto, ni la imagen de ayuda ni el grid están visibles
            puzzleImageController.helpImageVisibility(puzzleImageController.IMAGE_HIDDEN);
            puzzleImageController.imageGridVisibility(puzzleImageController.GRID_HIDDEN);

            timeCounter.start();
            gameController.showGameElements();
            
            // Cargamos los eventos y tooltips de la barra de tareas
    		gameToolbar.load();
        },2000);
	},
	splitImageInTiles: function(){
		for (var i = 0; i < puzzleImageController.lengthInTiles; i++) {
            gameController.tilesArray[i] = new Array(puzzleImageController.lengthInTiles);
            for (var j = 0; j < puzzleImageController.lengthInTiles; j++) {
            	var tile = new Tile(new Point(i,j));
            	
            	tile.insertDOM();
            	tile.setProperties();

            	tile.setupDragAndDrop();

            	gameController.tilesArray[i][j] = tile;
            }
        }        
	},
	// Ubicamos las piezas al azar en la zona de piezas barajadas
	allocateTilesRandomly: function(){

		// Dimensiones de la pantalla
		/*screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;*/

        // Calculamos las dimensiones del área donde se barajarán los tiles
        var shuffledTilesAreaTopEdge = gameController.shuffledTilesArea.offset().top + parseFloat(gameController.shuffledTilesArea.css('margin-top')) +
        							   parseFloat(gameController.shuffledTilesArea.css('border-left')),
            shuffledTilesAreaLeftEdge = gameController.shuffledTilesArea.offset().left + parseFloat(gameController.shuffledTilesArea.css('margin-left')) +
            							parseFloat(gameController.shuffledTilesArea.css('border-top')),
            shuffledTilesAreaWidth = gameController.shuffledTilesArea.width(),
            shuffledTilesAreaHeight = gameController.shuffledTilesArea.height(),
            xPositionInPixels = 0,
            yPositionInPixels = 0;

        /*console.log('gameController.shuffledTilesArea.offset().top ' + gameController.shuffledTilesArea.offset().top);
        console.log('gameController.shuffledTilesArea.css("margin-top") ' + gameController.shuffledTilesArea.css('margin-top'));*/
        for (var i = 0; i < puzzleImageController.lengthInTiles; i++) {
            for (var j = 0; j < puzzleImageController.lengthInTiles; j++) {
            	var tile = gameController.tilesArray[i][j];

                /*xPositionInPixels = shuffledTilesAreaLeftEdge + (shuffledTilesAreaWidth - screenWidth * 0.08) * Math.random(); // Le restamos el border (0.8vh)
                yPositionInPixels = shuffledTilesAreaTopEdge + (shuffledTilesAreaHeight - shuffledTilesAreaTopEdge - screenHeight * 0.08) * Math.random();
                
                // Desplazamos los tiles que se hayan quedado parcialmente fuera
                if (xPositionInPixels > (screenWidth - screenHeight * 0.08 - 160)) // Le restamos el border (0.8vh)
                    xPositionInPixels = xPositionInPixels - 160;
                if (yPositionInPixels > (screenHeight - screenHeight * 0.08 - 100)) // Le restamos el border (0.8vh)
                    yPositionInPixels = yPositionInPixels - 100;*/

                
                xPositionInPixels = shuffledTilesAreaLeftEdge + (shuffledTilesAreaWidth - tile.width - parseFloat(gameController.shuffledTilesArea.css('border-right'))) * Math.random();
                yPositionInPixels = shuffledTilesAreaTopEdge + (shuffledTilesAreaHeight - tile.height - parseFloat(gameController.shuffledTilesArea.css('border-bottom'))) * Math.random();

                //console.log('xPositionInPixels ' + xPositionInPixels);
                /*console.log('yPositionInPixels ' + yPositionInPixels);*/
                
                tile.setRandomPosition(xPositionInPixels, yPositionInPixels);
            }
        }
	},
	// Mostramos los tiles al cabo de un tiempo con efecto de difuminado
	showTilesWithDelay: function(){

		for(var i = 0; i < gameController.tilesArray.length; i++){
			for(var j = 0; j < gameController.tilesArray[i].length; j++){
				$('#' + gameController.tilesArray[i][j].tileId).fadeIn(500);	
			}
		}
    },
    findTileInArrayById: function(id){

    	var i = parseInt(id.substring(0,1)),
    		j = parseInt(id.substring(2,3));

    	return gameController.tilesArray[i][j];
    },
    shuffleTiles: function(){
        // Primero destruimos los tiles creados
        gameController.removeTiles();
        
        gameController.splitImageInTiles();
        gameController.allocateTilesRandomly();
        if (gameController.tilesArray.length)
        	gameController.showTilesWithDelay();
    },
    removeTiles: function(){
        
        /*for (var i = 0; i < puzzleImageController.lengthInTiles; i++) {
            for (var j = 0; j < puzzleImageController.lengthInTiles; j++) {
                var id = i + '-' + j;

                // Borramos el tile si está creado
                if($('#' + id).length){
                	$('#' + id).remove();
                }
            }
        }*/

        $('.tile').remove();
        gameController.tilesArray = new Array(puzzleImageController.lengthInTiles);
    },
    hideGameElements: function(){
        $('#play-counter').hide();
        $('#shuffle').hide();
        $('#view-image').hide();
        $('#view-grid').hide();
        $('#save').hide();
        $('#home').hide();
    },
    showGameElements: function(){
        $('#play-counter').show();
        $('#shuffle').show();
        $('#view-image').show();
        $('#view-grid').show();
        $('#save').show();
        $('#home').show();
    },
    checkSuccess: function(){
        
        var successCounter = 0;
        for (var i = 0; i < puzzleImageController.lengthInTiles; i++) {
            for (var j = 0; j < puzzleImageController.lengthInTiles; j++) {
            	var tile = gameController.tilesArray[i][j];
            	if(tile.xPositionInTiles == tile.xNewPositionInTiles &&
              	   tile.yPositionInTiles == tile.yNewPositionInTiles) successCounter++;
            		/*console.log('tile.xPositionInTiles ' + tile.xPositionInTiles);
            		console.log('tile.yPositionInTiles ' + tile.yPositionInTiles);
            		console.log('tile.xNewPositionInTiles ' + tile.xNewPositionInTiles);
            		console.log('tile.yNewPositionInTiles ' + tile.yNewPositionInTiles);*/
        	}
        }

        if(successCounter == sizeSelector.selectedSize) return true;
        else                                            return false;
    },
    gameSuccessful: function(){
        
        var timeCounterHTML = $('.time-counter'),
        	playCounterHTML = $('#play-counter'),
        	shuffledTilesArea = $('#shuffled-tiles-area');

        gameController.gameSucceeded = true;

        timeCounter.stop(); // Detenemos el tiempo        

		playCounterHTML.hide(); // El botón de play/pausa ya no es necesario

		// Hacemos que vibre el contador en verde cambiándole
        timeCounterHTML.removeClass('time-counter');  
        timeCounterHTML.addClass('successful-blink'); 

        soundController.playSuccessMusic();
        
        // Mostramos el mensaje
        var puzzleComplete;
        if(internationalization.selectedLanguage == 'english')
            puzzleComplete = '<span id="completed-puzzle">Puzzle Finished!!!</span>';
        else
            puzzleComplete = '<span id="completed-puzzle">¡¡¡Puzzle Completado!!!</span>';


        shuffledTilesArea.css(
        	{'background':'none',
        	 'border': 'none'
        	});
        shuffledTilesArea.append(puzzleComplete);
    },
    // Reseteamos el escenario cuando entramos en la página
    resetScreen: function(){

        // Eliminamos los tiles
        gameController.removeTiles();

        puzzleImageController.helpImageVisibility(puzzleImageController.IMAGE_HIDDEN);
        puzzleImageController.imageGridVisibility(puzzleImageController.GRID_HIDDEN);

        // En caso de venir de una pantalla de juego completado, la deshacemos
        if(gameController.gameSucceeded){

            gameController.gameSucceeded = false;

            // Restauramos la clase del contador
            var timeCounterHTML = $('.successful-blink'),
                playCounterHTML = $('#play-counter')
                shuffledTilesArea = $('#shuffled-tiles-area');     

            timeCounterHTML.removeClass('successful-blink'); 
            timeCounterHTML.addClass('time-counter');  

            playCounterHTML.show();

            soundController.play();
            
            // Suprimimos el mensaje
            $('#completed-puzzle').remove();

            shuffledTilesArea.css(
                {'background-image':'linear-gradient(#FDED4D, #FCF075, #EEF595)',
                 'border': '0.2rem solid #066CFA'
                });
        }

        // Reseteamos el reloj
        timeCounter.stop();

        timeCounter.time['seconds'] = 0;
        timeCounter.time['seconds'] = 0;
        timeCounter.time['minutes'] = 0;        
    }    
}