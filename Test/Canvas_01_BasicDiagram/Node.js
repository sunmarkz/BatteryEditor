function Node(element, type = ('left' | 'right')) {
    this.position={x:0,y:0};
    this.connecte_Left = [];
    this.connecte_Right = []
    this.parentElement = element;
    console.log(element.x);
    
    
    this.bundle = new LinkBundle(this);
    this.type = type;
}

Node.prototype.push = function (node) {

   this.bundle.push(node);

}
Object.defineProperties(Node.prototype, {

    position: this.updatePosition(),
    type:  this.type ,
    bundle:  this.bundle ,
    parentElement:  this.parentElement
})

Node.prototype.updatePosition = function () {
    switch (this.type) {
        case 'left':
            this.position = {
                x: this.parentElement.x,
                y: this.parentElement.y + (this.parentElement.height / 2)
            }
            return this.position;
        case 'right':
            this.position = {
                x: this.parentElement.x + this.parentElement.width,
                y: this.parentElement.y + (this.parentElement.height / 2)
            }
            return this.position;
    }
}


Node.prototype.isOnNode = function (e) {
    if (Di_lessThan(this.position, { x: e.pageX, y: e.pageY }, Board.ConnectionNodeSize * 2)) {
        return true;
    } else {
        return false;
    }
}




Node.prototype.drawPointLine = function (mouse) {
    // when on dragging, draw pointed line to mouse Location
    d.beginPath();
    d.setLineDash([2, 2]);
    d.moveTo(this.position.x, this.position.y);
    d.lineTo(mouse.x, mouse.y);
    d.stroke();
}

Node.prototype.drawLine = function () {
    start = this.position;
    var startOffset = this.type == 'left' ? -20 : 20
    if (this.connecte_Left) {
        var targetOffset = -20;
        this.connecte_Left.forEach(i => {
            d.beginPath();
            d.moveTo(start.x, start.y);
            d.lineTo(start.x + startOffset, start.y);
            d.lineTo(i.position.x + targetOffset, i.position.y);
            d.lineTo(i.position.x, i.position.y);
            d.lineWidth=0.5;
            d.stroke();
        });
    }
    if (this.connecte_Right) {
        var targetOffset = 20;
        this.connecte_Right.forEach(i => {
            d.beginPath();
            d.moveTo(start.x, start.y);
            d.lineTo(start.x + startOffset, start.y);
            d.lineTo(i.position.x + targetOffset, i.position.y);
            d.lineTo(i.position.x, i.position.y);
            d.lineWidth = 0.5;
             d.stroke();
        });
    }
}


