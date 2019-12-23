/*******************************************************************************/
/*  Clase encargada de gestionar la grabación y carga de partidas guardadas    */
/*******************************************************************************/

var serializationController = {
	gameLoaded: false, // variable que controla si la partida ha sido cargada o es una nueva
	saveGame: function(){

		var tilesJSON = [],
            timeCounterJSON = [];

        // Paramos primero el contador
        timeCounter.stop();    

        // Creamos el objeto JSON que contendrá todos los datos necesarios
        // para guardar el juego
        var dataToSave = {};

        // Primero construimos un objeto JSON con cada tile
        for (var i = 0; i < gameController.tilesArray.length; i++){
        	for(var j = 0; j < gameController.tilesArray.length; j++){
        		var tile = gameController.tilesArray[i][j];

        		// Objeto JSON que serializaremos	
	            tileObject = {};
	            
	            tileObject.id = tile.tileId;
	            tileObject.x = tile.xPositionInPixels;
	            tileObject.y = tile.yPositionInPixels;
	            tileObject.xCurrentPositionInTiles = tile.xNewPositionInTiles;
	            tileObject.yCurrentPositionInTiles = tile.yNewPositionInTiles;
	            tileObject.zIndex = tile.zIndex;
	            
	            tilesJSON.push(tileObject);
	        }
	    }

		// Objeto JSON con el tiempo de juego
        timeCounterJSON[0] = timeCounter.time['hours'];
        timeCounterJSON[1] = timeCounter.time['minutes'];
        timeCounterJSON[2] = timeCounter.time['seconds'];
        
        // Guardamos el resto de datos necesarios
        dataToSave.timeCounter = timeCounterJSON;
        dataToSave.tiles = tilesJSON;
        dataToSave.image = puzzleImageController.puzzleImage;
        dataToSave.size = sizeSelector.selectedSize;

        // Convertimos el objeto en un string con formato JSON
        var savedDataJSON = JSON.stringify(dataToSave);

        // Limpiamos el local storage y guardamos
        localStorage.removeItem('gameData');
        localStorage.setItem('gameData', savedDataJSON);
    },
    loadGame: function(){
        
        // Recuperamos el objeto JSON del local storage
        var loadedDataJSON;
        if (localStorage.getItem('gameData') == null){
        	throw 'Error: no existe el objeto gameData';
        }
        loadedDataJSON = localStorage.getItem('gameData'); 

        // Lo convertimos a un array de objetos
        serializationController.loadedData = JSON.parse(loadedDataJSON);
		serializationController.gameLoaded = true;

        // Nos situamos en la página de juego en la que estábamos
        switch(serializationController.loadedData.size){
            case 16:
                location.hash = '#game/play/16pcs';
                break;
            case 25:
                location.hash = '#game/play/36pcs';
                break;    
            case 36:
                location.hash = '#game/play/64pcs';
                break;    
            case 64:
                location.hash = '#game/play/100pcs';
                break;    
        }
        
        // Cargamos la pantalla de juego
        $('#play-section').show().siblings().hide();
        
        // Cargamos el escenario
        serializationController.loadScenario();
        
        // Preparamos la imagen y su rejilla
        // Por defecto, ni la imagen de ayuda ni el grid están visibles
        puzzleImageController.helpImageVisibility(puzzleImageController.IMAGE_HIDDEN);
        puzzleImageController.imageGridVisibility(puzzleImageController.GRID_HIDDEN);

        // Preparamos el sistema de juego
        gameToolbar.load();
        timeCounter.counterEventsHandler();    

        // Activamos el reloj
        timeCounter.start();
    },
    loadScenario: function(){
        
        /* Reseteamos la pantalla de juego */
        gameController.resetScreen();
        
        var loadedTiles = serializationController.loadedData.tiles,
        	newGameControllerTilesArray = new Array(puzzleImageController.lengthInTiles);

        // Cargamos las variables del juego guardadas en las clases correspondientes
        timeCounter.time['hours'] = serializationController.loadedData.timeCounter[0];
        timeCounter.time['minutes'] = serializationController.loadedData.timeCounter[1];
        timeCounter.time['seconds'] = serializationController.loadedData.timeCounter[2];
        sizeSelector.selectedSize = serializationController.loadedData.size;
        puzzleImageController.puzzleImage = serializationController.loadedData.image;
        gameController.shuffledTilesArea = $('#shuffled-tiles-area');

        puzzleImageController.reload();
        puzzleImageController.setImageDimensions();

        // Generamos nuevos objetos DOM para los divs con los tiles, así como
        // el array de tiles de gameObject
        // Les asignamos las posiciones que tenían
        for (var i = 0; i < puzzleImageController.lengthInTiles; i++){
        	gameController.tilesArray[i] = new Array(puzzleImageController.lengthInTiles);
        	for (var j  = 0; j < puzzleImageController.lengthInTiles; j++){

        		var index = i * puzzleImageController.lengthInTiles + j,
            		loadedTile = loadedTiles[index],
            		temporaryTile = new Tile(new Point(i,j));

            	temporaryTile.reloadProperties(loadedTile, i, j);
            	temporaryTile.setupDragAndDrop();

            	gameController.tilesArray[i][j] = temporaryTile;	
        	}
        }
        
        gameController.showTilesWithDelay();
    }
}