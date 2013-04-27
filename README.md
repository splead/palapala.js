[palapala.js](http://palapala.jp/) - palapala animation JavaScript
==================================================

#How to use

## html
    <div id=hello">
        <img id="hello1" src="hello1.png">
        <img id="hello2" src="hello2.png">
        <img id="hello3" src="hello3.png">
    </div>

## change image
    var actions = {
        action1: [
            { show: { hello: "hello1" } },
            { interval: 5 },
            { show: { hello: "hello2" } },
            { interval: 5 },
            { show: { hello: "hello1" } },
            { interval: 55 },
            { show: { hello: "hello3" } },
            { interval: 10 },
            { show: { hello: "hello1" } }
        ]
    };

* show: { id: chiled_id }
* show: { id: [ chiled_id1, .. chiled_idn ] }
* interval: frames (default frame par seconds = 20 )

## set style
    var actions = {
        action1: [
            { show: { hello: "hello1" } },
            { interval: 5 },
            { show: { hello: "hello2" } },
            { interval: 5 },
            { show: { hello: "hello1" } },
            { interval: 55 },
            { show: { hello: "hello3" } },
            { interval: 10 },
            { show: { hello: "hello1" } }
        ]
        action2: [
            { interval: 5 },
            { style: { hello: "background_red" } }
        ]
    };
    
    css
    .background_red {
        background-color: #f00;
    }

* style: { id: class_name }


## 
    var actions = {
        action1: [
            { show: { hello: "hello1" } },
            { interval: 5 },
            { action: { "action3" } },
            { interval: 5 },
            { action: { "action3" } },
        ]
        action3: [
            { show: { hello: "hello2" } },
            { interval: 5 },
            { show: { hello: "hello1" } }
        ]
    };

* action: action_id
* action: [ action_id1, .. action_idn ]


## play animation
    palapala( actions );
    var anime = palapala( actions );

## set frame par second
    palapala( actions , { fps: number_of_frames } );

## select action to play
    palapala( actions , { play: action_id } );
    palapala( actions , { play: [ action_id1, .. action_idn ] } );

## play action
    anime.play( action_id );
    anime.play( [ action_id1, .. action_idn ] );

