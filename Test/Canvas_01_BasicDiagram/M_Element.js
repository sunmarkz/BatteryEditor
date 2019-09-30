function element(x, y, width, height, Text = null) {
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
    this.node = { left: new Node(this, 'left'), right: new Node(this, 'right') }
    
    this.node.left.updatePosition();
    this.node.right.updatePosition();
}

//Content Draw funciton
element.prototype.get = {
    x:  this.x ,
    y:  this.y ,
    width:  this.width ,
    height:  this.height ,
    topLeft:  (point(this.x, this.y)) ,
    botLeft:  (point(this.x, this.y + this.height)) ,
    botRight:  (point(this.x + this.width, this.y + this.height)) ,
    topRight:  (point(this.x + this.width, this.y)) ,
    left:  (point(this.x, (this.y + (this.height / 2)))) ,
    right:  (point(this.x + this.width, (this.y + this.height / 2))) 
} 

element.prototype.set = {
    x: function (s) { this.x = s },
    y: function (s) { this.y = s },
    width: function (s) { this.width = s },
    height: function (s) { this.height = s },
    topLeft: function (s = { x: null, y: null }) { this.x = s.x; this.y = s.y },
    topRight: function (s = { x: null, y: null }) { this.width = s.x - this.x; this.y = s.y }
}



element.prototype.OnElementDetect = function () {
    d.beginPath();
    d.rect(this.x, this.y, this.width, this.height);
    d.closePath();

}

element.prototype.isOnControl = function (e) {
    if (this.node.left.isOnNode(e)) { return this.node.left; }
    if (this.node.right.isOnNode(e)) { return this.node.right; }
    return false;
}


element.prototype.textDraw = function () {
    if (this.Text) {
        // if content text isnt null
        var margin = 2;
        CanvStyle.Text();
        var Widthminmum = d.measureText(this.Text).width;
        if (Widthminmum + margin * 2 > this.width) {
            this.width = Widthminmum + margin * 2;
            this.draw();
        }
        d.fillText(this.Text, this.x + margin, this.y + 15 + margin, this.width - (margin * 2));

    }
}
element.prototype.Draw_onControl = function () {
    CanvStyle.ElementSelected();
    Draw(this.node.left);
    Draw(this.node.right);
    // this.node.left.drawLinkControl();
    // this.node.right.drawLinkControl();

}