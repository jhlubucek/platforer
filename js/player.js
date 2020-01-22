function Player() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
    this.jumpCounter = 10;

    this.reset = function () {
        ctx.fillStyle = "#3e3e3e";
        ctx.fillRect(this.x, this.y, scale, scale);

        this.x = scale;
        this.y = GAME_HEIGHT - scale*5;

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(this.x, this.y, scale, scale);
    }

    this.draw = function(dir,up) {
        ctx.fillStyle = "#3e3e3e";
        ctx.fillRect(this.x, this.y, scale, scale);

        this.update(dir,up)

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(this.x, this.y, scale, scale);
    }

    this.update = function (dir,up) {

        if (dir == "R" && !(this.checkColisionRight(boxes) || this.checkColisionRight(elevators) || this.checkColisionRightWall())){
            this.x += speed;
        }

        if (dir == "L" && !(this.checkColisionLeft(boxes) || this.checkColisionLeft(elevators) || this.checkColisionLeftWall())){
            this.x -= speed;
        }


        if (up && this.jumpCounter > 10 && (this.checkColisionFall(boxes) || this.checkColisionFall(elevators) || this.checkColisionFloor())){
                this.jumpCounter = 0;
            }

        if (this.jumpCounter <= 10) {
            if (this.checkColisionJump(boxes) || this.checkColisionJump(elevators)){
                this.jumpCounter = 13;
            }else{
                this.jumpCounter++;
                this.y -= gravity;
            }
        }else if (this.jumpCounter >= 10 && this.jumpCounter <=10){
            this.jumpCounter++;
        }
        else if (!this.checkColisionFloor() && !(this.checkColisionFall(boxes) || this.checkColisionFall(elevators))){
            if (this.checkColisionFall(lava)){
                this.reset()
                timeBlink = 50;
                time += 40;
                console.log("lava fall: +4s")
            }else {
                this.y += gravity;
            }
        }

        if (player.x == finish.x && player.y == finish.y){
            victory = true;
        }
    }

    this.checkColisionRight = function(items){
        for (var i = 0; i < items.length; i++) {//print items
            // ctx.fillStyle = items[i].color;
            if (items[i].x == this.x + scale && !(this.y >= items[i].y + items[i].height || this.y + scale <= items[i].y)){
                return true;
            }
        }
        return false;
    }

    this.checkColisionLeft = function(items){
        for (var i = 0; i < items.length; i++) {//print items
            // ctx.fillStyle = items[i].color;
            if (items[i].x + items[i].width == this.x && !(this.y >= items[i].y + items[i].height || this.y + scale <= items[i].y)){
                return true;
            }
        }
        return false;
    }

    this.checkColisionFall = function(items){
        for (var i = 0; i < items.length; i++) {//print items
            // ctx.fillStyle = items[i].color;
            if (this.y + scale == items[i].y && this.x + scale > items[i].x && this.x < items[i].x + items[i].width){
                return true;
            }
        }
        return false;
    }

    this.checkColisionJump = function(items){

        for (var i = 0; i < items.length; i++) {//print items
            // ctx.fillStyle = items[i].color;
            if (this.y == items[i].y + items[i].height && this.x + scale > items[i].x && this.x < items[i].x + items[i].width){
                return true;
            }
        }
        return false;
    }

    this.checkColisionFloor = function () {
        if (this.y + scale == GAME_HEIGHT){
            return true;
        }
    }

    this.checkColisionLeftWall = function () {
        if (this.x <= 0){
            return true;
        }else{
            return false;
        }
    }

    this.checkColisionRightWall = function () {
        if (this.x + scale >= GAME_WIDTH){
            return true;
        }else{
            return false;
        }
    }

}