function Node(element, type = ('left' | 'right')) {
    this.parentElement = element;
    this.type = type;
    this.bundle = new LinkBundle(this);
}

Node.prototype.push = function (node) {

   this.bundle.push(node);

}
Object.defineProperties(Node.prototype, {
    
    position:{ 
        get: function(){
            return ({
                x: this.type == 'left' ? this.parentElement.x : (this.parentElement.x + this.parentElement.width),
                y: this.type == 'left' ? (this.parentElement.y + (this.parentElement.height / 2)) : (this.parentElement.y + (this.parentElement.height / 2))
            });
        }
    } ,
    x: {
        get: function(){
            return this.type == 'left' ? this.parentElement.x : (this.parentElement.x + this.parentElement.width)
        }
    },
    y : {
        get: function (){
            return this.type == 'left' ? (this.parentElement.y + (this.parentElement.height / 2)) : (this.parentElement.y + (this.parentElement.height / 2));
        }
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




