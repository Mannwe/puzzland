/*******************************************************************************/
/*  Clase encargada de gestionar los sonidos del juego			               */
/*******************************************************************************/

var soundController = {
	backgroundAudioElement: $,
    playingAudioElement: $,
    tilePlacingAudioElement: $,
    successAudioElement: $,
	setUpGameMusic: function(){
        soundController.backgroundAudioElement = document.createElement('audio');
        soundController.backgroundAudioElement.setAttribute('src', 'assets/background.wav'); // Playonloop: Summer Deal
        soundController.backgroundAudioElement.volume = 0.4;
        soundController.backgroundAudioElement.loop = true;
        
        soundController.successAudioElement = document.createElement('audio');
        soundController.successAudioElement.setAttribute('src', 'assets/success.mp3'); // Freesound: FunWithSound - https://freesound.org/people/FunWithSound/sounds/456966/
        soundController.successAudioElement.volume = 0.6;
        
        soundController.tilePlacingAudioElement = document.createElement('audio');
        soundController.tilePlacingAudioElement.setAttribute('src', 'assets/tile_placing.wav'); // Freesound: Bertrof - https://freesound.org/people/Bertrof/sounds/131660/
        soundController.tilePlacingAudioElement.volume = 0.4;
                
    },
    play: function(){
		soundController.backgroundAudioElement.play();	
    },
    playTilePlaced: function(){
        soundController.tilePlacingAudioElement.play();
    },
    playSuccessMusic: function(){
        soundController.backgroundAudioElement.pause();
        soundController.successAudioElement.play();
    }
}