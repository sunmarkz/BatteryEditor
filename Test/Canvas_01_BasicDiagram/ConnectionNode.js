function Node(element, position, type = ('left' | 'right')) {
    this.position = position;
    this.connecte_Left = new Array();
    this.connecte_Right = new Array();
    this.Appended = element;
    this.type = type;
}
Node.prototype.push = function (node) {
    var inleft = node in this.connecte_Left;
    var inright = node in this.connecte_Right;
    if (node.type == 'left' && inleft) {
        this.connecte_Left.push(node);
        return;
    }
    if (node.type == 'right' && inright) {
        this.connecte_Right.push(node);
        return;
    }
}

Node.prototype.updatePosition = function () {
    switch (this.type) {
        case 'left':
            this.position = {
                x: this.Appended.x,
                y: this.Appended.y + (this.Appended.height / 2)
            }
            break;
        case 'right':
            this.position = {
                x: this.Appended.x + this.Appended.width,
                y: this.Appended.y + (this.Appended.height / 2)
            }
            break;
    }
}
Node.prototype.draw = function () {
    d.fillStyle = "white";
    d.lineWidth = 1;
    d.beginPath();
    d.arc(this.position.x, this.position.y, 8, 0, Math.PI * 2);
    d.stroke();
    d.closePath();
    d.fill();
}


Node.prototype.isOnNode = function (e) {
    if (Di_lessThan(this.position, { x: e.pageX, y: e.pageY }, Board.ConnectionNodeSize * 3)) {
        return true;
    } else {
        return false;
    }
}


Node.prototype.drawLine = function () {
    d.lineWidth = 1;
    var startOffset = this.type == 'left' ? -20 : 20
    if (this.connecte_Left) {
        var targetOffset = -20;

        this.connecte_Left.forEach(i => {
            d.beginPath();
            d.moveTo(start.x, start.y);
            d.lineTo(start.x + startOffset, start.y);
            d.lineTo(i.left.x + targetOffset, i.left.y);
            d.lineTo(i.left.x, i.left.y);
            d.stroke();
        });
    }
    if (this.connecte_Right) {
        var targetOffset = 20;
        this.connecte_Right.forEach(i => {
            d.beginPath();
            d.moveTo(start.x, start.y);
            d.lineTo(start.x + startOffset, start.y);
            d.lineTo(i.left.x + targetOffset, i.left.y);
            d.lineTo(i.left.x, i.left.y);
            d.stroke();
        });
    }
}
Node.prototype.drawPointLine = function (mouse) {
    d.beginPath();
    d.setLineDash([2, 2]);
    d.moveTo(this.position.x, this.position.y);
    d.lineTo(mouse.x, mouse.y);
    d.stroke();
}