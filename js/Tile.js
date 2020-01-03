/*******************************************************************************/
/* Clase encargada de gestionar y almacenar los datos de cada tile del puzzle  */    
/*******************************************************************************/

function Tile(pointInTiles){
	this.xPositionInTiles = pointInTiles.x;
	this.yPositionInTiles = pointInTiles.y;

	this.width = puzzleImageController.imageWidthInPixels / puzzleImageController.lengthInTiles;
	this.height = puzzleImageController.imageHeightInPixels / puzzleImageController.lengthInTiles;

    // Creamos id´s únicas por tile (no puede haber dos tiles en la misma posición)
	this.tileId = this.xPositionInTiles + '-' + this.yPositionInTiles;
    /*this.allocated = false;*/ // Para controlar si el tile ha sido colocado en un hueco
}

/* Generamos los divs físicos de cada tile */
Tile.prototype.insertDOM = function(){

    var DOMObject = $('<div id="' + this.tileId + '" class="tile" />');
    DOMObject.css('background-image', puzzleImageController.puzzleImage);

    $('#split-game-body').append(DOMObject);
}

/* Insertamos el fragmento de imagen que le corresponde a cada tile, así como sus 
   propiedades básicas */
Tile.prototype.setProperties = function(){
	/* Ajustamos las coordenadas de la imagen en función de la posición del tile
	   y obtenemos el fragmento de la misma que le corresponde */
	var tileImageCoordinates = '-' + this.xPositionInTiles * this.width +
                           	   'px -' + this.yPositionInTiles * this.height + 'px';

    $('#' + this.tileId).width(this.width)
	                    .height(this.height)
	                    .css({position: 'absolute',
	                      	  cursor: 'pointer',
	                  	 	  'background-position': tileImageCoordinates,
	                  		  'z-index': 1});
}

// Cargamos la posición al azar del tile (endX, endY)
Tile.prototype.setRandomPosition = function(endX, endY){

    this.xPositionInPixels = endX;
    this.yPositionInPixels = endY;

	/* Asignamos la nueva posición del tile */
	$('#' + this.tileId).css({top: endY,
						      left: endX});

    this.xNewPositionInTiles = Math.floor(endX / this.width);
    this.yNewPositionInTiles = Math.floor(endY / this.height);

    // Inicialmente los ocultamos para mostrar brevemente la imagen al juagdor            				
	$('#' + this.tileId).hide();
}

Tile.prototype.setupDragAndDrop = function(){

	that = this;
	$('#' + this.tileId).draggable({
        containment: $('#split-game-body'),
        drag: function(event, ui){
            /* Mecanismo para que tras cada drag la pieza seleccionada
             * se sitúe en el z-index más alto */
            gameController.topForegroundTilePosition++;
            $(this).css('z-index', gameController.topForegroundTilePosition);
            that.zIndex = gameController.topForegroundTilePosition;
        },
        stop: function (event, ui) {
            var tilePosition = new Point(ui.position.left, ui.position.top);

            id = $(this).attr('id');

            // Asignamos la nueva posición tras soltar la pieza
            that.assignNewTilePosition(tilePosition, id);

            // Comprobamos si ha completado el puzzle
            gameController.success = gameController.checkSuccess();

            if(gameController.success){
                gameController.gameSuccessful();
            }
        }
    });
}

Tile.prototype.assignNewTilePosition = function(tilePosition, tileId){

	// No podemos usar this para obtener el tile, ya que este método se llama desde 
	// una instancia de draggable
	var tile = gameController.findTileInArrayById(tileId);

    // Asignamos inicialmente la posición tras el drop
    tile.xPositionInPixels = tilePosition.x;
    tile.yPositionInPixels = tilePosition.y;

    // Calculamos en que número de bloque (xPositionInTiles e yPositionInTiles) estamos
    // Ej. si xPositionInTiles = 2 e yPositionInTiles = 1 estamos en el bloque (2,1)
    var newPositionInTiles = new Point(Math.round((tilePosition.x - puzzleImageController.imageLeft) / tile.width),
                                       Math.round((tilePosition.y - puzzleImageController.imageTop) / tile.height));

    /* Vamos a comprobar si hemos dejado el tile cerca de los bordes de un hueco. Si es así,
       lo recolocamos */

	// Comprobamos que estemos dentro de la caja del puzzle antes de recalcular su posición respecto a los bordes
    if(tile.xPositionInPixels >= puzzleImageController.imageLeft &&
       tile.xPositionInPixels < puzzleImageController.imageLeft + puzzleImageController.imageWidthInPixels &&
       tile.yPositionInPixels >= puzzleImageController.imageTop &&
       tile.yPositionInPixels < puzzleImageController.imageTop + puzzleImageController.imageHeightInPixels){

        // Calculamos la diferencia entre la posición actual y el inicio del bloque
        var offset = new Point(tilePosition.x - puzzleImageController.imageLeft - newPositionInTiles.x * tile.width,
                               tilePosition.y - puzzleImageController.imageTop - newPositionInTiles.y * tile.height);

        /* Recolocamos automáticamente la pieza si está muy cerca de los bordes */
        if (offset.x < gameController.MIN_OFFSET &&
            offset.y < gameController.MIN_OFFSET){

            // Recalculamos la posición
            tile.xPositionInPixels = puzzleImageController.imageLeft + newPositionInTiles.x * tile.width,
            tile.yPositionInPixels = puzzleImageController.imageTop + newPositionInTiles.y * tile.height;

            // Asignamos las coordenadas del tile
            tile.xNewPositionInTiles = Math.round((tile.xPositionInPixels - puzzleImageController.imageLeft) / tile.width);
            tile.yNewPositionInTiles = Math.round((tile.yPositionInPixels - puzzleImageController.imageTop) / tile.height);

            soundController.playTilePlaced();     

            // Cambiamos la posición en los objetos DOM
            $('#' + tile.tileId).css('top', tile.yPositionInPixels);
            $('#' + tile.tileId).css('left', tile.xPositionInPixels);
        }
    }

    // Si el tile está correctamente colocado en un hueco lo marcamos como tal
    /*tile.allocated = false;
    if(tile.xNewPositionInTiles == Math.floor((tile.xPositionInPixels - puzzleImageController.imageLeft) / this.width) &&
       tile.yNewPositionInTiles == Math.floor((tile.yPositionInPixels - puzzleImageController.imageTop) / this.height))
        tile.allocated = true;*/
        
    // Actualizamos el array de tiles de gameController con este tile actualizado
    gameController.tilesArray[tile.xPositionInTiles, tile.yPositionInTiles].xPositionInPixels = tile.xPositionInPixels;
    gameController.tilesArray[tile.xPositionInTiles, tile.yPositionInTiles].yPositionInPixels = tile.yPositionInPixels;
    gameController.tilesArray[tile.xPositionInTiles, tile.yPositionInTiles].xNewPositionInTiles = tile.xNewPositionInTiles;
    gameController.tilesArray[tile.xPositionInTiles, tile.yPositionInTiles].yNewPositionInTiles = tile.yNewPositionInTiles;
}

/* Recargamos los divs físicos de cada tile tras cargar el juego guardado */
Tile.prototype.reloadProperties = function(loadedTile, xPositionInTiles, yPositionInTiles, xCurrentPositionInTiles, yCurrentPositionInTiles){

    this.insertDOM();

    // Asgignamos posición
    this.xPositionInPixels = loadedTile.x;
    this.yPositionInPixels = loadedTile.y;

    this.xNewPositionInTiles = xCurrentPositionInTiles;
    this.yNewPositionInTiles = yCurrentPositionInTiles;

    console.log('xNewPositionInTiles ' + xCurrentPositionInTiles);
    console.log('yNewPositionInTiles ' + yCurrentPositionInTiles);

    /* Ajustamos las coordenadas de la imagen en función de la posición del tile
       y obtenemos el fragmento de la misma que le corresponde */
    var newTileImageCoordinates = '-' + xPositionInTiles * this.width +
                                  'px -' + yPositionInTiles * this.height + 'px';

    $('#' + this.tileId).width(this.width)
                        .height(this.height)
                        .css({'background-image': puzzleImageController.puzzleImage,
                              position: 'absolute',
                              cursor: 'pointer',
                              'background-position': newTileImageCoordinates,
                              top: loadedTile.y, 
                              left: loadedTile.x,
                              'z-index': loadedTile.zIndex})
                        .hide();

}

