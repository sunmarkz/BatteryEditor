function content(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.selected = false;
    this.dashline = false;
    this.left_ConnectTo = [];
    this.right_ConnectTo = [];

    this.left = {
        x: this.x,
        y: this.y + (this.height / 2)
    }
    this.right = {
        x: this.x + this.width,
        y: this.y + (this.height / 2)
    }
}

content.prototype.Draw_onControl = function () {
    d.fillStyle = "white";
    d.lineWidth = 1;
    d.beginPath();
    //left control bar
    d.arc(this.left.x, this.left.y, 8, 0, Math.PI * 2);
    d.stroke();
    d.closePath();
    d.fill();

    d.beginPath();
    d.arc(this.right.x, this.right.y, 8, 0, Math.PI * 2);
    d.stroke();
    d.closePath();
    d.fill();
}

content.prototype.Draw_Connection = function (input_left = null, input_right = null) {
    d.lineWidth = 1;
    var left = this.left;
    var right = this.right;
    if (input_left || input_right) {
        d.beginPath();
        d.setLineDash([2, 2]);
        if (input_left) {
            
            var input_left = {x: input_left.pageX, y: input_left.pageY};
            d.moveTo(left.x, left.y);
            d.lineTo(input_left.x, input_left.y);
            d.stroke();
        }
        if (input_right) {
            
            var input_right = { x: input_right.pageX, y: input_right.pageY };
            d.moveTo(right.x, right.y);
            d.lineTo(input_right.x, input_right.y);
            d.stroke();

        }
    }
    if (this.left_ConnectTo) {

        d.setLineDash([]);
        this.left_ConnectTo.forEach(
            function (i) {
                d.beginPath();
                d.moveTo(left.x, left.y);
                d.lineTo(left.x - 20, left.y);
                d.lineTo(i.right.x + 20, i.right.y);
                d.lineTo(i.right.x, i.right.y);
                d.stroke();
            }
        )
    }
    if (this.right_ConnectTo) {
        this.right_ConnectTo.forEach(
            function (i) {
                d.beginPath();
                d.moveTo(right.x, right.y);
                d.lineTo(right.x + 20, right.y);
                d.lineTo(i.left.x - 20, i.left.y);
                d.lineTo(i.left.x, i.left.y);
                d.stroke();
            }
        )
    }
}





//Content Draw funciton
content.prototype.draw = function () {
    if (this.selected && (this.left_ConnectTo || this.right_ConnectTo)) {//when element is on selection
        this.left = {
            x: this.x,
            y: this.y + (this.height / 2)
        }
        this.right = {
            x: this.x + this.width,
            y: this.y + (this.height / 2)
        }
    }

    d.lineWidth = 2;
    if (this.dashline) {
        d.setLineDash([6, 6]);
    } else {
        d.setLineDash([]);
    }
    if (this.selected) {
        d.fillStyle = "Grey";
        d.fillRect(this.x, this.y, this.width, this.height);
    }else{d.fillStyle="white";}
    d.beginPath();
    d.lineWidth = 2;
    d.rect(this.x, this.y, this.width, this.height);
    d.fill();
    d.closePath();
    d.stroke();
}


content.prototype.isOnControl = function (e) {
    if ((e.pageX - this.left.x) * (e.pageX - this.left.x) + (e.pageY - this.left.y) * (e.pageY - this.left.y) <= 20 * 20) {
        return ({left:true,right:false});//return left
    }
    if ((e.pageX - this.right.x) * (e.pageX - this.right.x) + (e.pageY - this.right.y) * (e.pageY - this.right.y) <= 20 * 20) {
        return ({left:false,right:true});//return right
    }
    return ({ left: false, right: false });;
}