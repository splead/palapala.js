/*!
 * palapala.js v1.7.0
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
	var _speed    = 40;
	
	if ( typeof sprits === 'string' ) {
		
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
		
		if ( options.frame ) {
			_speed = 1000 / options.frame
		} else if ( options.msec ) {
			_speed = options.msec
		}
		
		for ( var sid in sprits ) {
			if( sprits[ sid ] instanceof Array ){
				var step = 0;
				for ( var i in sprits[ sid ] ) {
					if( sprits[ sid ][ i ].interval ){
						step = step + sprits[ sid ][ i ].interval
					} else if ( sprits[ sid ][ i ].i ) {
						step = step + sprits[ sid ][ i ].i
					}

					if( typeof sprits[ sid ][ i ].sprite !== 'undefined' ){
						var c_sprits = sprits[ sid ][ i ].sprite;
						for ( var csid in c_sprits ) {
							if ( c_sprits[ csid ] instanceof Array ) {
								c_sprits[ csid ].unshift( { i: ( step - 1 ) } );
								sprits[ sid + "-" + step + ":" + csid ] = c_sprits[ csid ];
							} else {
								var tmp = {};
								for ( var cstep in c_sprits[ csid ] ) {
									tmp[ parseInt(cstep) + parseInt(step) - 1 ] = c_sprits[ csid ][ cstep ];
								}
								sprits[ sid + "-" + step + ":" + csid ] = tmp;
							}
						}
					}
				}
			} else {
				for ( var step in sprits[ sid ] ) {
					
					if( typeof sprits[ sid ][ step ].sprite !== 'undefined' ) {
						var c_sprits = sprits[ sid ][ step ].sprite;
						for ( var csid in c_sprits ) {
							if( c_sprits[ csid ] instanceof Array ) {
								c_sprits[ csid ].unshift( { i: parseInt( step ) } );
								sprits[ sid + "-" + step + ":" + csid ] = c_sprits[ csid ];
							} else {
								var tmp = {};
								for ( var cstep in c_sprits[ csid ] ) {
									tmp[ parseInt( cstep ) + parseInt( step ) ] = c_sprits[ csid ][ cstep ];
								}
								sprits[ sid + "-" + step + ":" + csid ] = tmp;
							}
						}
					}
				}
			}
		}
		
		for ( var sid in sprits ) {
			
			if ( sprits[ sid ] instanceof Array ) {
				
				var tmp = {};
				var pre = {};
				var step = 0;
				
				for ( var i in sprits[ sid ] ) {
					
					if ( typeof sprits[ sid ][ i ].repeat !== 'undefined' ) {
						for ( var n = 0; n < sprits[ sid ][ i ].repeat; n++ ) {
							tmp[ step ] = pre;
							if ( pre.interval ) {
								step = step + pre.interval;
							} else if ( pre.i ) {
								step = step + pre.i;
							}
						}
					} else {
						tmp[ step ] = sprits[ sid ][ i ];
						if ( sprits[ sid ][ i ].interval ) {
							step = step + sprits[ sid ][ i ].interval;
						} else if ( sprits[ sid ][ i ].i ) {
							step = step + sprits[ sid ][ i ].i;
						}
						pre = sprits[ sid ][ i ];
					}
				}
				
				if( _lastStep < step ){
					_lastStep = step;
				}
				
				tmp[ step ] = "end";
				sprits[ sid ] = tmp;
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
				
				if ( typeof sprits[ sid ][ _step ].id !== 'undefined' ) {
					
					var node = document.getElementById( sid );
					for ( var i = 0; i < node.childNodes.length; i++ ) {
						if ( node.childNodes[ i ].style ) {
							node.childNodes[ i ].style.display = "none";
						}
					}
					id = sprits[ sid ][ _step ].id;
					document.getElementById( id ).style.display = "block";
				}
				
				if ( typeof sprits[ sid ][ _step ].left !== 'undefined' ) {
					document.getElementById( sid ).style.left = parseInt( sprits[ sid ][ _step ].left ) + "px";
				}
				
				if ( typeof sprits[ sid ][ _step ].left_add !== 'undefined' ) {
					document.getElementById( sid ).style.left =
						( parseInt( document.getElementById( sid ).style.left.replace( /px/, "" ) )
						+ parseInt( sprits[ sid ][ _step ].left_add ) ) + "px";
				}
				
				if ( typeof sprits[ sid ][ _step ].top !== 'undefined' ) {
					document.getElementById( sid ).style.top = parseInt( sprits[ sid ][ _step ].top ) + "px";
				}
				
				if ( typeof sprits[ sid ][ _step ].top_add !== 'undefined' ) {
					document.getElementById( sid ).style.top =
						( parseInt( document.getElementById( sid ).style.top.replace( /px/, "" ) )
						+ parseInt( sprits[ sid ][ _step ].top_add ) ) + "px";
				}
				
				if ( typeof sprits[ sid ][ _step ].width !== 'undefined' ) {
					document.getElementById( sid ).style.width = parseInt( sprits[ sid ][ _step ].width ) + "px";
				}
				
				if ( typeof sprits[ sid ][ _step ].width_add !== 'undefined' ) {
					document.getElementById( sid ).style.width =
						( parseInt( document.getElementById( sid ).style.width.replace( /px/, "" ) )
						+ parseInt( sprits[ sid ][ _step ].width_add ) ) + "px";
				}
				
				if ( typeof sprits[ sid ][ _step ].height !== 'undefined' ) {
					document.getElementById( sid ).style.height = parseInt( sprits[ sid ][ _step ].height ) + "px";
				}
				
				if ( typeof sprits[ sid ][ _step ].height_add !== 'undefined' ) {
					document.getElementById( sid ).style.height =
						( parseInt( document.getElementById( sid ).style.height.replace( /px/, "" ) )
						+ parseInt( sprits[ sid ][ _step ].height_add ) ) + "px";
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
			
			if ( options.complete ) {
				options.complete.call( this, sprits );
			} else if (options.callback) {
				options.callback.call( this, sprits );
			}
			
			if ( options.repeat === false ) {
				return;
			} else {
				_step = 0;
				setTimeout( animation, _speed );
			}
			
		} else {
			
			_step = _step + 1;
			setTimeout( animation, _speed );
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
