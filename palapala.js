

var palapala = function( program ) {
	
	var frame = 0;
	
	var animation = function() {
		
		for ( var id in program ) {
			
			if ( target = animes[ id ][ frame ] ) {
				
				if ( target == "end" ) {
					
					return;
					
				} else {
					
					$( "#" + id + " .element" ).css("visibility", "hidden");
					$( "#" + id + " #" + target ).css("visibility", "visible");
				}
			}
		}
		
		frame = frame + 1;
		setTimeout( animation, 40 );
	}
	
	animation();	
};
