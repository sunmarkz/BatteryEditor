function Node(element, type = ('left' | 'right')) {
    this.parentElement = element;
    this.type = type;
    this.bundle = new LinkBundle(this);
    
    this.graphic = new Graphic('c', 
        this.type == 'left' ? this.parentElement.graphic.left.x : this.parentElement.graphic.right.x, 
        this.type == 'left' ? this.parentElement.graphic.left.y : this.parentElement.graphic.right.y,
    8);
}
Node.prototype.update = function(){
    this.graphic.x = this.type == 'left' ? this.parentElement.graphic.left.x : this.parentElement.graphic.right.x;
    this.graphic.y = this.type == 'left' ? this.parentElement.graphic.left.y : this.parentElement.graphic.right.y;
    
}
Node.prototype.push = function (node) {
   this.bundle.push(node);
}
Object.defineProperties(Node.prototype, {
    
    position:{ 
        get: function(){
            return ({
                x: this.type == 'left' ? this.parentElement.graphic.left.x : this.parentElement.graphic.right.x ,
                y: this.type == 'left' ? this.parentElement.graphic.left.y : this.parentElement.graphic.right.y
            });
        }
    } ,
    x: {
        get: function(){
            return this.type == 'left' ? this.parentElement.graphic.left.x : this.parentElement.graphic.right.x 
        }

    },
    y : {
        get: function (){
            return this.type == 'left' ? this.parentElement.graphic.left.y : this.parentElement.graphic.right.y;
        },

    }
    
    
    
})

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




