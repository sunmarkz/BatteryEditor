function content(x, y, width, height,Text = null) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.selected = false;
    this.left_ConnectTo = [];
    this.right_ConnectTo = [];
    this.Text = Text;
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

//Content Draw funciton
content.prototype.draw = function () {

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
    this.textDraw();

}

content.prototype.textDraw=function(){
    if(this.Text){
        // if content text isnt null
        var margin = 2;
        CanvStyle('Text');
        d.fillText(this.Text,this.x+margin,this.y+15+margin,this.width-(margin*2));

    }
}


content.prototype.Draw_onControl = function () {
    this.node.left.draw();
    this.node.right.draw();
}

content.prototype.Draw_Connection = function () {

    this.node.left.drawLine();
    this.node.right.drawLine();

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