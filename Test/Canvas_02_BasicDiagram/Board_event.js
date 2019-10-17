function Canv(canvas, contentList) {
    this.onDrag = false;
    this.Board = canvas;
    this.list = contentList.element;
    this.onCreate = false;
    this.onSelection = false;
    this.onControl = null;
    this.magnetDist = 30;
    this.ConnectionNodeSize = 8;
}
var cv = Canv.prototype;
cv.magnetPoint = function (e) {
    p = point(e);
    var result = { position: { x: p.x, y: p.y }, element: null }
    var magnetDist = this.magnetDist
    this.list.forEach(function (i) {
        if (!i.selected) {
            if (Di_lessThan(i.node.left.position, result.position, magnetDist)) {
                result = {position: i.node.left.position, element:i.node.left.bundle};
                
                return false;
            }
            if (Di_lessThan(i.node.right.position, result.position, magnetDist)) {
                result = { position: i.node.right.position, element: i.node.right.bundle };
                
                return false;
            }
        }
    });

    return result;
}

cv.clear = function () {
    d.clearRect(0, 0, Canvas.width, Canvas.height);
}

cv.redraw = function () {
    this.clear();

    // draw all links, make links on the bottom;
    diagram.link.forEach(j=>{
        Draw(j);
    });

    //draw all seleted elements link control;
    diagram.elementSelection.forEach(k=>{
        drawCtrl(k.node.left);
        drawCtrl(k.node.right);
    });

    this.list.forEach(function (i) {
        Draw(i);
    })
}


cv.resetSelect = function () {
    this.list.forEach(function (i) {
        i.unselect();
        // reset onControl statement
    })
    diagram.elementSelection = [];

}
cv.selectList = function () {
    var s = [];
    this.list.forEach(function (i) {
        if (i.selected) {
            s.push(i);
        }
    })
    return (s);
}
cv.isOnElement = function (e) {
    // Board.clear();
    var result = false;
    this.list.forEach(function (i) {
        // i.OnElementDetect();      
        if (i.graphic.isOn(e)) {
            result = { element:i }
            
            return false;// escape forEach
        }
    });
    // Board.redraw();
    return result;
}
cv.isOnControl = function (e) {
    var result;
    var list = diagram.elementSelection;
    list.forEach(
        function (i) {
            result=i.isOnControl(e);
            if(result){
                return false;
            }
        }
    )
    return result;
}

cv.ShowControlPoint = function(element){
    element.node.left.draw();
    element.node.right.draw();
}
