/*!
 * palapala.js v1.3.2
 * http://www.palapala.jp/
 *
 * Copyright 2012, Splead Inc.
 * http://www.splead.co.jp/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */

function palapala ( sprites, options ) {
	
	options = options || {};
	var step     = 0;
	var lastStep = 0;
	
	for ( var sid in sprites ) {
		
		if ( sprites[ sid ] instanceof Array ) {
			var tmp = {};
			var _step = 0;
			for ( var i in sprites[ sid ] ) {
				tmp[ _step ] = sprites[ sid ][ i ];
				_step = _step + sprites[ sid ][ i ].interval;
			}
			sprites[ sid ] = tmp;
			if( lastStep < _step ){
				lastStep = _step;
			}
		}
		
		for ( var _step in sprites[ sid ] ) {
			if ( lastStep < parseInt( _step ) ) {
				lastStep = parseInt( _step );
			}
		}
	}
	
	var animation = function() {
		
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
				
				if ( typeof sprites[ sid ][ step ][ 'left' ] !== 'undefined' ) {
					var _left = sprites[ sid ][ step ][ 'left' ];
					document.getElementById( sid ).style.left = _left + "px";
				}
				if ( typeof sprites[ sid ][ step ][ 'top' ] !== 'undefined' ) {
					var _top = sprites[ sid ][ step ][ 'top' ];
					document.getElementById( sid ).style.top = _top + "px";
				}
				if ( typeof sprites[ sid ][ step ].opacity !== 'undefined' ) {
					var _opacity = sprites[ sid ][ step ].opacity
					document.getElementById( sid ).style.filter = "alpha(opacity=" + ( _opacity * 100 ) + ")";
					document.getElementById( sid ).style.MozOpacity  = _opacity;
					document.getElementById( sid ).style.opacity = _opacity;
				}
			}
		}
		
		if ( step >= lastStep ) {
			
			if ( options.repeat === false ) {
				if ( options.callback ) {
					options.callback.call( this, sprites );
				}
				return;
			} else {
				step = 0;
				setTimeout( animation, 40 );
			}
			
		} else {
			
			step = step + 1;
			setTimeout( animation, 40 );
		}
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
