function Level() {

     this.levelInit = function() {
        boxes.push({//box on left
            x: scale*20,
            y: GAME_HEIGHT - scale*3,
            width: scale*40,
            height: scale,
            color: "#11ffd5"
        });

        boxes.push({//box on left
            x: scale*36,
            y: GAME_HEIGHT - scale*7,
            width: scale,
            height: scale*4,
        });


        boxes.push({//box on left
            x: scale*25,
            y: GAME_HEIGHT - scale*7,
            width: scale,
            height: scale*4,
        });

        boxes.push({//box on left
            x: scale*60,
            y: GAME_HEIGHT - scale*3,
            width: scale,
            height: scale*3,
        });

        elevators.push({
            x: scale*40,
            y: GAME_HEIGHT - scale*10,
            width: scale*5,
            height: scale,
            stopL: scale*40,
            stopR: scale*50,
            direction: "R",
        });

        elevators.push({
            x: scale*27,
            y: GAME_HEIGHT - scale*18,
            width: scale*6,
            height: scale,
            stopL: scale*20,
            stopR: scale*27,
            direction: "L",
        });

         elevators.push({
             x: scale*35,
             y: GAME_HEIGHT - scale*18,
             width: scale*6,
             height: scale,
             stopL: scale*35,
             stopR: scale*42,
             direction: "R",
         });

        boxes.push({
            x: scale*60,
            y: GAME_HEIGHT - scale*10,
            width: scale*5,
            height: scale,
        });

         boxes.push({
             x: scale*65,
             y: GAME_HEIGHT - scale*14,
             width: scale*5,
             height: scale,
         });


         boxes.push({
             x: scale*55,
             y: GAME_HEIGHT - scale*18,
             width: scale*10,
             height: scale,
         });

         boxes.push({
             x: scale*13,
             y: GAME_HEIGHT - scale*10,
             width: scale*3,
             height: scale,
         });

         boxes.push({
             x: 0,
             y: GAME_HEIGHT - scale*4,
             width: scale*5,
             height: scale,
         });

        lava.push({//box on left
            x: scale*26,
            y: GAME_HEIGHT - scale*6,
            width: scale*10,
            height: scale*3,
        });

         // finish = {
         //     x: scale*14,
         //     y: GAME_HEIGHT - scale*11,
         //     width: scale,
         //     height: scale,
         // }

         finish = {
             x: scale*6,
             y: GAME_HEIGHT - scale,
             width: scale,
             height: scale,
         }
    }

    this.drawLevel = function() {
        for (var i = 0; i < boxes.length; i++) {//print boxes
            drawBox(boxes[i]);
        }

        for (var i = 0; i < lava.length; i++) {//print boxes
            drawLava(lava[i]);
        }

        for (var i = 0; i < elevators.length; i++) {//print boxes
            drawBox(elevators[i]);
        }

        drawFinish(finish);

    }

    this.moveElevators = function(){
        for (var i = 0; i < elevators.length; i++) {//print boxes
            if (elevators[i].x <= elevators[i].stopL){
                elevators[i].direction = "R";
            }
            if (elevators[i].x >= elevators[i].stopR){
                elevators[i].direction = "L";
            }

            deleteBox(elevators[i]);

            if(elevators[i].direction == "R"){
                elevators[i].x += slowspeed;
            }else if(elevators[i].direction == "L"){
                elevators[i].x -= slowspeed;
            }
            drawBox(elevators[i])
        }
    }
}

function drawBox(box) {
    var my_gradient = ctx.createLinearGradient( 0 , box.y , 0, box.y+box.height);
    my_gradient.addColorStop(0, "black");
    my_gradient.addColorStop(1, "white");
    ctx.fillStyle = my_gradient;
    // ctx.fillStyle = box.color;
    ctx.fillRect(box.x, box.y, box.width, box.height);
}

function deleteBox(box) {
    ctx.fillStyle = "#3e3e3e";
    ctx.fillRect(box.x, box.y, box.width, box.height);
}

function drawLava(box) {
    var my_gradient = ctx.createLinearGradient( 0 , box.y , 0, box.y+box.height);
    my_gradient.addColorStop(0, "#890002");
    my_gradient.addColorStop(1, "#ff5134");
    ctx.fillStyle = my_gradient;
    ctx.fillRect(box.x, box.y, box.width, box.height);
}

function drawFinish(box) {
    ctx.fillStyle = "#28ff31";
    ctx.fillRect(box.x, box.y, box.width, box.height);
}



