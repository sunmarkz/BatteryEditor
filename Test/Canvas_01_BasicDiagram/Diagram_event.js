function content(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.selected = false;
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
    this.node = { left: new Node(this, this.left, 'left'), right: new Node(this, this.right, 'right') }

}

content.prototype.Draw_onControl = function () {
    this.node.left.draw();
    this.node.right.draw();
}

content.prototype.Draw_Connection = function () {

    this.node.left.drawLine();
    this.node.right.drawLine();

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
    this.node.left.drawLine();
    this.node.right.drawLine();
    this.node.left.updatePosition();
    this.node.right.updatePosition();



    d.beginPath();
    d.rect(this.x, this.y, this.width, this.height);
    d.closePath();
    if (this.selected) {
        CanvStyle('elementSelected');
        this.node.left.draw();
        this.node.right.draw();
    } else {
        CanvStyle('element');
    }

}

content.prototype.OnElementDetect = function () {
    d.beginPath();
    d.rect(this.x, this.y, this.width, this.height);
    d.closePath();

}

content.prototype.isOnControl = function (e) {
    if (this.node.left.isOnNode(e)) { return this.node.left; }
    if (this.node.right.isOnNode(e)) { return this.node.right; }
    return false;
}