function Canv(canvas, contentList) {
    this.onDrag = false;
    this.Board = canvas;
    this.list = contentList;
    this.onCreate = false;
    this.onSelection = false;
    this.onControl = null;
    this.selectedElements = [];
    this.magnetDist = 30;
    this.ConnectionNodeSize = 8;


}

Canv.prototype.magnetPoint = function (e) {
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

Canv.prototype.clear = function () {
    d.clearRect(0, 0, Canvas.width, Canvas.height);

}

Canv.prototype.redraw = function () {

    this.clear();

    var text = this.selectedElements;
    if (text) {
        d.fillStyle = "black";
        d.font = "15px Arial";
        d.fillText("Selected:" + text.length, 20, 20);
    }
    else {
        d.fillText(0, 20, 20)
    }
    this.list.forEach(function (i) {
        i.draw();
        i.Draw_Connection();
        if (i.selected) i.Draw_onControl();
    })
}



Canv.prototype.resetSelect = function () {
    this.selectedElements.forEach(function (i) {
        i.selected = false;
        // reset onControl statement
    })
    this.selectedElements = [];

}
Canv.prototype.selectList = function () {
    var s = [];
    this.list.forEach(function (i) {
        if (i.selected) {
            s.push(i);
        }
    })
    return (s);
}
Canv.prototype.isOnElement = function (e) {
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
Canv.prototype.isOnControl = function (e) {
    var result;
    Board.selectedElements.forEach(
        function (i) {
            result=i.isOnControl(e);
            if(result){
                return false;
            }
        }
    )
    return result;
}