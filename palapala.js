/*!
 * palapala.js v1.0.0
 * http://www.palapala.jp/
 *
 * Copyright 2012, Splead Inc.
 * http://www.splead.co.jp/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */

var palapala = function( sprites, start ) {
	
	if ( typeof start === 'undefined' ) start = true;
	
	var step = 0;
	
	var endFrame = 0;
	for ( var sprite in sprites ) {
		for ( var key in sprites[ sprite ] ) {
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
			
			for ( var sprite in sprites ) {
				
				if ( sprites[ sprite ][ step ] ) {
					
					var node = document.getElementById( sprite );
					for ( var i=0; i<node.childNodes.length; i++ ) {
						if ( node.childNodes[ i ].style ) {
							node.childNodes[ i ].style.display = "none";
						}
					}
					
					id = sprites[ sprite ][ step ].id;
					document.getElementById( id ).style.display = "block";
					
					if ( _left = sprites[ sprite ][ step ][ 'left' ] ) {
						document.getElementById( sprite ).style.left = _left + "px";
					}
					if ( _top = sprites[ sprite ][ step ][ 'top' ] ) {
						document.getElementById( sprite ).style.top = _top + "px";
					}
					if ( _opacity = sprites[ sprite ][ step ].opacity ) {
						document.getElementById( sprite ).style.filter = "alpha(opacity=" + ( _opacity * 100 ) + ")";
						document.getElementById( sprite ).style.MozOpacity  = _opacity;
						document.getElementById( sprite ).style.opacity = _opacity;
					}
				}
			}
		}
		
		step = step + 1;
		setTimeout( animation, 40 );
	}
	
	if ( start ) {
		animation();
	}
	
	return {
		play: function() {
			step = 0;
			animation();
		}
	}
};
