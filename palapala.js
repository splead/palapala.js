/*!
 * palapala.js v2.0.1
 * https://github.com/splead/palapala.js
 * http://www.palapala.jp/
 *
 * Copyright (c) 2012, Kei Osumi
 * http://www.splead.co.jp/
 * 
 * Released under the MIT license.
 * https://github.com/splead/palapala.js/blob/master/license.txt
 * 
 */

function palapala ( actions, options ) {
	
	var timer_msec = 50;
	var time_line  = {};
	var play_list  = [];
	
	// set action onto time line
	actions = actions || {};
	time_line = setTimeline( actions );
	
	
	// set options
	options = options || {};
	
	if ( options.fps ) {
		timer_msec = 1000 / options.fps
	}
	
	if ( options.play ) {
		var play = options.play;
		if ( play instanceof Array ) {
			play = play.join( ',' );
		}
		play = ',' + play + ','
		for ( var id in time_line ) {
			if ( play.indexOf( ',' + id + ',' ) == -1 ) {
				// stop action
				time_line[ id ].step = -1;
			} else {
				// set action start point
				time_line[ id ].step = 0;
			}
		}
	}
	
	
	// start animation
	animation();
	
	
	function animation () {
		
		for ( var id in time_line ) {
			
			// set play
			for ( var i in play_list ) {
				var pid = play_list.pop();
				time_line[ pid ].step = 0;
			}
			
			// get each action
			var action = time_line[ id ];
			
			// current step of action
			var step = action.step;
			
			// do action if step > -1
			if ( step > -1 ) {
				
				// action match to step
				if ( action[ step ] ) {
					
					// show
					if ( typeof action[ step ].show !== 'undefined' ) {
						
						for ( var id in action[ step ][ 'show' ] ) {
							
							var target = action[ step ][ 'show' ][ id ];
							if ( target instanceof Array ) {
								target = target.join( ',' );
							}
							target = ',' + target + ','
							var node = document.getElementById( id );
							for ( var i=0; i<node.childNodes.length; i++ ) {
								if ( node.childNodes[ i ].style ) {
									if ( target.indexOf( ',' + node.childNodes[ i ].id + ',' ) == -1 ) {
										node.childNodes[ i ].style.display = "none";
									} else {
										node.childNodes[ i ].style.display = "block";
									}
								}
							}
						}
					}
					
					// style
					if ( typeof action[ step ].style !== 'undefined' ) {
						for ( var id in action[ step ][ 'style' ] ) {
							if ( action[ step ][ 'style' ][ id ] == "" ) {
								className = document.getElementById( id ).className;
								document.getElementById( id ).className = className.split( '  ' )[0];
							} else {
								className = document.getElementById( id ).className;
								document.getElementById( id ).className = className + '  ' + action[ step ][ 'style' ][ id ];
							}
						}
					}
					
					// action
					if ( typeof action[ step ].action !== 'undefined' ) {
						if ( action[ step ].action instanceof Array ) {
							play_list = play_list.concat( action[ step ].action );
						} else {
							play_list.push( action[ step ].action );
						}
					}
					
					// repeat
					if ( typeof action[ step ].repeat !== 'undefined' ) {
						if ( action[ step ].repeat != 0 ) {
							// set action start point
							action.step = -1;
							action[ step ].repeat = action[ step ].repeat - 1;
						} else {
							// stop action
							action.step = -2;
						}
					}
				}
				
				// count up the step of action
				action.step = action.step + 1;
			}
		}
		
		// go to next step
		setTimeout( animation, timer_msec );
	}
	
	
	function setTimeline( actions ) {
		
		var time_line = {};
		
		for ( var id in actions ) {
			
			// set action as serial format
			if ( actions[ id ] instanceof Array ) {
				
				var action = {};
				var step = 0;
				
				for ( var i in actions[ id ] ) {
					
					if ( actions[ id ][ i ].interval ) {
						step = step + actions[ id ][ i ].interval;
					} else {
						action[ step ] = actions[ id ][ i ];
						step = step + 1;
					}
				}
				time_line[ id ] = action;
			} else {
				time_line[ id ] = actions[ id ];
			}
			
			// check and add repeat
			var last = 0;
			for ( var no in time_line[ id ] ) {
				if ( last < parseInt( no ) ) {
					last = parseInt( no );
				}
			}
			if( time_line[ id ][ last ] ){
				if ( typeof time_line[ id ][ last ][ 'repeat' ] == 'undefined' ) {
					time_line[ id ][ last + 1 ] = { repeat: 0 };
					time_line[ id ][ 'repeat' ] = 0;
				} else {
					time_line[ id ][ 'repeat' ] = time_line[ id ][ last ][ 'repeat' ];
				}
			} else {
				time_line[ id ][ 0 ] = { repeat: 0 };
				time_line[ id ][ 'repeat' ] = 0;
			}
			
			// add step counter and repeat counter
			time_line[ id ][ 'step' ] = 0;
		}
		
		return time_line;
	}
	
	
	return {
		play: function( ids ) {
			if ( ids instanceof Array ) {
				play_list = play_list.concat( ids );
			} else {
				play_list.push( ids );
			}
		}
	}
};
