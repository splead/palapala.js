
var palapala = function( program ) {
	
	var step = 0;
	
	var endFrame = 0;
	for ( var sprite in program ) {
		for ( var key in program[ sprite ] ) {
			if ( endFrame < parseInt( key ) ) {
				endFrame = parseInt( key );
			}
		}
	}
	endFrame = endFrame + 1;
	
	var animation = function() {
		
		if ( step > endFrame ) {
			return;
		} else {
			
			for ( var sprite in program ) {
				
				if ( program[ sprite ][ step ] ) {
					
					id = program[ sprite ][ step ].id;
					$( "#" + sprite + " .palapala" ).css( "display", "none" );
					$( "#" + sprite + " #" + id ).css( "display", "block" );
					
					if ( _left = program[ sprite ][ step ][ 'left' ] ) {
						$( "#" + sprite ).css( "left", _left );
					}
					if ( _top = program[ sprite ][ step ][ 'top' ] ) {
						$( "#" + sprite ).css( "top", _top );						
					}
					if ( opacity = program[ sprite ][ step ].opacity ) {
						$( "#" + sprite ).css( "opacity", opacity );
					}
				}
			}
		}
		
		step = step + 1;
		setTimeout( animation, 40 );
	}
	
	animation();
};
