/*!
 * palapala.js v1.6.0
 * http://www.palapala.jp/
 *
 * Copyright (c) 2012, Splead Inc.
 * http://www.splead.co.jp/
 * 
 * Released under the MIT license.
 * https://github.com/splead/palapala.js/blob/master/license.txt
 * 
 */

function palapala ( sprits, options ) {
	
	var _target   = null;
	var _step     = 0;
	var _lastStep = 0;
	var _speed    = 0;
	
	
	if ( typeof sprits === "string" ) {
		
		_target = [];
		var node = document.getElementById( sprits );
		for ( var i = 0; i < node.childNodes.length; i++ ) {
			if ( node.childNodes[ i ].style ) {
				_target.push( node.childNodes[ i ] );
			}
		}
		
		_speed = options * 40;
		_lastStep = _target.length - 1;
		
		sequence();
		
	} else {
		
		options = options || {};
		
		for ( var sid in sprits ) {
			
			if ( sprits[ sid ] instanceof Array ) {
				var tmp = {};
				var step = 0;
				for ( var i in sprits[ sid ] ) {
					tmp[ step ] = sprits[ sid ][ i ];
					step = step + sprits[ sid ][ i ].interval;
				}
				sprits[ sid ] = tmp;
				if( _lastStep < step ){
					_lastStep = step;
				}
			}
			
			for ( var step in sprits[ sid ] ) {
				if ( _lastStep < parseInt( step ) ) {
					_lastStep = parseInt( step );
				}
			}
		}
		
		if ( options.start !== false ) {
			animation();
		}
	}
	
	
	function animation () {
		
		if ( typeof options.progress === 'function' ) {
			options.progress.call( this, _step, _lastStep );
		}
		
		for ( var sid in sprits ) {
			
			if ( sprits[ sid ][ _step ] ) {
				
				var node = document.getElementById( sid );
				for ( var i = 0; i < node.childNodes.length; i++ ) {
					if ( node.childNodes[ i ].style ) {
						node.childNodes[ i ].style.display = "none";
					}
				}
				
				id = sprits[ sid ][ _step ].id;
				document.getElementById( id ).style.display = "block";
				
				if ( typeof sprits[ sid ][ _step ].left !== 'undefined' ) {
					var left = sprits[ sid ][ _step ].left;
					document.getElementById( sid ).style.left = left + "px";
				}
				if ( typeof sprits[ sid ][ _step ].top !== 'undefined' ) {
					var top = sprits[ sid ][ _step ].top;
					document.getElementById( sid ).style.top = top + "px";
				}
				if ( typeof sprits[ sid ][ _step ].opacity !== 'undefined' ) {
					var opacity = sprits[ sid ][ _step ].opacity
					document.getElementById( sid ).style.filter = "alpha(opacity=" + ( opacity * 100 ) + ")";
					document.getElementById( sid ).style.MozOpacity  = opacity;
					document.getElementById( sid ).style.opacity = opacity;
				}
				if ( typeof sprits[ sid ][ _step ].fn !== 'undefined' ) {
					sprits[ sid ][ _step ].fn.call( document.getElementById( sid ) );
				}
			}
		}
		
		if ( _step >= _lastStep ) {
			
			if ( options.repeat === false ) {
				if ( options.callback ) {
					options.callback.call( this, sprits );
				}
				return;
			} else {
				_step = 0;
				setTimeout( animation, 40 );
			}
			
		} else {
			
			_step = _step + 1;
			setTimeout( animation, 40 );
		}
	}
	
	
	function sequence () {
		
		for ( var i = 0; i < _target.length; i++ ) {
			if ( _target[ i ].style ) {
				_target[ i ].style.display = "none";
			}
		}
		
		_target[ _step ].style.display = "block";
		
		if ( _step >= _lastStep ) {
			_step = 0;
		} else {
			_step = _step + 1;
		}
		
		setTimeout( sequence, _speed );
	}
	
	
	return {
		play: function() {
			_step = 0;
			animation();
		}
	}
};
