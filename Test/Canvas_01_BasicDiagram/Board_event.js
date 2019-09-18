function Canv(canvas, contentList) {
    this.onDrag = false;
    this.Board = canvas;
    this.list = contentList;
    this.onCreate = false;
    this.onSelection = false;
    this.onControl = null;
    this.selectedElements = [];


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
        i.state_onControl = false;
        // reset onControl statement
    })
    this.selectedElements= [];

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
    var result;
    this.list.forEach(function (i, j) {
        i.draw();
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
    var feedback;
    Board.selectedElements.forEach(
        function (i) {
            result = i.isOnControl(e);
            if (result.left || result.right) {
                feedback = {position:result,element:i};
                return false;
            }
        }
    )
    return feedback;
}