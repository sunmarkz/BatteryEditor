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
    var result = { position: { x: e.pageX, y: e.pageY }, element: null }
    var magnetDist = this.magnetDist
    this.list.forEach(function (i) {
        if (!i.selected) {
            if (Di_lessThan(i.node.left.position, result.position, magnetDist)) {
                result = {position: i.node.left.position, element:i.node.left};
                // console.log(result);
                
                return false;
            }
            if (Di_lessThan(i.node.right.position, result.position, magnetDist)) {
                result = { position: i.node.right.position, element: i.node.right };
                // console.log(result);
                
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
    Draw(diagram.link,'links')
    this.list.forEach(function (i) {
        Draw(i);
    })
}




cv.resetSelect = function () {
    this.list.forEach(function (i) {
        i.selected = false;
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
    Board.clear();
    var result = false;
    this.list.forEach(function (i, j) {
        i.OnElementDetect();
        if (d.isPointInPath(e.pageX, e.pageY)) {
            result = { element: i, index: j }
            return false;// escape forEach
        }
    });
    Board.redraw();
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
