
function EventHandler(CANV) {
    var onElement;
    CANV.ondblclick = function (e) {
        dblclick(e);
    };

    CANV.onmousedown = function (e) {
        var p = point(e);
        move = p;
        onElement = Overall.isOn(p);
        CANV.onmousemove = function (x) {
            var move = x;
            dragging(p, onElement);
        };
    }
    CANV.onclick = function (d) {
        CANV.onmousemove = null;
        move = point(move);
        var p = point(d);
        move = !(p.x == move.x && p.y == move.y);
        onElement = Overall.isOn(p);
        move && Board.redraw();
        !move && click(onElement);
    }
    function click(onElement) {

        (onElement instanceof element) && doEvent.singleSelect(onElement);
        (onElement instanceof Link) && doEvent.remove(onElement);
        (onElement == null) && diagram.elementSelection.size != 0 && doEvent.resetSelect();
        Board.redraw();
    }
    function dragging(k, onElement) {
        (onElement instanceof Node) && doEvent.create(onElement);
        (onElement == null) && doEvent.multiplySelect(k);
        if (onElement instanceof element) {
            if (onElement.selected == false) {
                doEvent.singleSelect(onElement);
            }
            doEvent.move(onElement, k);
        }
        (onElement instanceof Graphic && onElement.parent instanceof element) && doEvent.size(onElement, k);

    }
    function dblclick(e) {
        p = point(e);

        var onElement = Overall.isOn(p);
        (onElement == null) && doEvent.create(new element(p.x - 25, p.y - 25));
        onElement instanceof Node && doEvent.remove(onElement);
        onElement instanceof element && doEvent.textEdit(onElement);
        Board.redraw();
        return;
    }
}