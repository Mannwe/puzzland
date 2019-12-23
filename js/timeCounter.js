/*******************************************************************************/
/*  Clase encargada de controlar el contador de tiempo				           */
/*******************************************************************************/

var timeCounter = {
	counterStopped: true,
    time: [],    // El contador de tiempo para hacer el puzzle
    load: function(){

        // Inicializamos los contadores
        timeCounter.time['hours'] = 0;    
        timeCounter.time['minutes'] = 0;    
        timeCounter.time['seconds'] = 0;  

        if(internationalization.selectedLanguage == 'english')
            $('.time-counter').html('Time: 0s');
        else
            $('.time-counter').html('Tiempo: 0s');

        timeCounter.counterEventsHandler();
    },  
	start: function(){

        $('#play-counter').show();  

        timeCounter.counterStopped = false;

        // Cambiamos los iconos
        $('#play-counter i').removeClass('fas fa-play');
        $('#play-counter i').addClass('fas fa-pause');

        var timeCounterLabel = $('.time-counter'),
            timeToShow = '',
            timeLabel;

            if(internationalization.selectedLanguage == 'english')
                timeLabel = 'Time: ';
            else
                timeLabel = 'Tiempo: ';

        /* Con la instrucción setInterval sumamos 1 cada segundo para generar
         * el contador
         */
         timeCounter.idCounterInterval = setInterval(function(){
            
            timeCounter.time['seconds']++;

            // Transformamos el tiempo de Xs a Xh Ym Zs
            if(timeCounter.time['seconds'] === 60){
                timeCounter.time['seconds'] = 0;
                timeCounter.time['minutes']++;
            }
            
            if(timeCounter.time['minutes'] === 60){
                timeCounter.time['seconds'] = 0;
                timeCounter.time['minutes'] = 0;
                timeCounter.time['hours']++;
            }
            
            if(timeCounter.time['hours']  > 0){
                timeToShow = timeCounter.time['hours'] + 'h ' + 
                             timeCounter.time['minutes'] + 'm ' + 
                             timeCounter.time['seconds'] + 's';
            }else{
                if(timeCounter.time['minutes'] > 0){
                    timeToShow = timeCounter.time['minutes'] + 'm ' + 
                                 timeCounter.time['seconds'] + 's';
                }else{
                    timeToShow = timeCounter.time['seconds'] + 's';
                }
            }
            timeCounterLabel.html(timeLabel + timeToShow);
            
        }, 1000);

	},
	stop: function(){
        timeCounter.counterStopped = true;

        // Cambiamos los iconos
        $('#play-counter i').removeClass('fas fa-pause');
        $('#play-counter i').addClass('fas fa-play');
        
        clearInterval(timeCounter.idCounterInterval);
        
    },
    // Añadimos los eventos de pulsar los botones que actúan sobre el contador
    counterEventsHandler: function(){
        $('#play-counter i').bind('click',function(){
           if(timeCounter.counterStopped){
               timeCounter.start();
           }else{
               timeCounter.stop();
           }
        });
    }
}