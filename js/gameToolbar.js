/*******************************************************************************/
/*  Clase encargada de controlar el toolbar de la pantalla principal del juego */
/*******************************************************************************/

var gameToolbar = {
    load: function(){
        //gameToolbar.gameTooltipsSetup();
        gameToolbar.toolbarEventsHandler();    
    },
	gameTooltipsSetup: function(){
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
    },
    toolbarEventsHandler: function(){
        $('#view-image').bind('click',function(){

            console.log('visible ' + puzzleImageController.helpImageVisible);

            if(puzzleImageController.helpImageVisible)
                puzzleImageController.helpImageVisibility(puzzleImageController.IMAGE_HIDDEN);
            else
                puzzleImageController.helpImageVisibility(puzzleImageController.IMAGE_VISIBLE);
        });
        
        $('#view-grid').bind('click',function(){
            if(puzzleImageController.gridVisible)
                puzzleImageController.imageGridVisibility(puzzleImageController.GRID_HIDDEN);
            else
                puzzleImageController.imageGridVisibility(puzzleImageController.GRID_VISIBLE);
        });
        
        $('#save').bind('click',function(){
            serializationController.saveGame();
        });
        
        $('#shuffle').bind('click',function(){
            gameController.shuffleTiles();
        });
    }
}