/*!
 * palapala.js v1.2.1
 * http://www.palapala.jp/
 *
 * Copyright 2012, Splead Inc.
 * http://www.splead.co.jp/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */

function palapala ( sprites, options ) {
	
	options = options || {};
	
	var step = 0;
	var endFrame = 0;
	for ( var sid in sprites ) {
		
		if ( sprites[ sid ] instanceof Array ) {
			var tmp = {};
			var time = 0;
			for ( var i in sprites[ sid ] ) {
				tmp[ time ] = sprites[ sid ][ i ];
				time = time + sprites[ sid ][ i ].time;
			}
			sprites[ sid ] = tmp;
		}
		
		for ( var time in sprites[ sid ] ) {
			if ( endFrame < parseInt( time ) ) {
				endFrame = parseInt( time );
			}
		}
	}
	
	var animation = function() {
		
		if ( step > endFrame ) {
			if ( options.repeat === false ) {
				if ( options.callback ) {
					options.callback.call( this, sprites );
				}
				return;
			} else {
				step = 0;
			}
		} else {
			
			for ( var sid in sprites ) {
				
				if ( sprites[ sid ][ step ] ) {
					
					var node = document.getElementById( sid );
					for ( var i = 0; i < node.childNodes.length; i++ ) {
						if ( node.childNodes[ i ].style ) {
							node.childNodes[ i ].style.display = "none";
						}
					}
					
					id = sprites[ sid ][ step ].id;
					document.getElementById( id ).style.display = "block";
					
					if ( _left = sprites[ sid ][ step ][ 'left' ] ) {
						document.getElementById( sid ).style.left = _left + "px";
					}
					if ( _top = sprites[ sid ][ step ][ 'top' ] ) {
						document.getElementById( sid ).style.top = _top + "px";
					}
					if ( _opacity = sprites[ sid ][ step ].opacity ) {
						document.getElementById( sid ).style.filter = "alpha(opacity=" + ( _opacity * 100 ) + ")";
						document.getElementById( sid ).style.MozOpacity  = _opacity;
						document.getElementById( sid ).style.opacity = _opacity;
					}
				}
			}
			
			step = step + 1;
		}
		
		setTimeout( animation, 40 );
	}
	
	if ( options.start !== false ) {
		animation();
	}
	
	return {
		play: function() {
			step = 0;
			animation();
		}
	}
};
