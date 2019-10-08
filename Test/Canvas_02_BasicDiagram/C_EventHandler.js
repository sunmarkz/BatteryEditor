
function EventHandler(CANV) {
    var onElement;
    CANV.ondblclick = function (e) {
        p = point(e);
        var onElement = Overall.isOn(p);
        onElement instanceof Link && doEvent.remove(onElement);
        onElement == null && doEvent.create(new element(p.x - 25, p.y - 25, 50, 50))
    };

    CANV.onmousedown = function (e) {
        move = false;
        var p = point(e);
        onElement = Overall.isOn(p);
        CANV.onmousemove = function () {
            move = true;
            dragging(p, onElement)
        };
        return false;
    }
    CANV.onclick = function (e) {
        var p = point(e);
        onElement = Overall.isOn(p);
        CANV.onmousemove = null;
        move && Board.redraw();
        !move && click(onElement);

    }
    function click(onElement) {
        if (onElement instanceof Node) {
            return;
        }
        if (onElement instanceof element) {
            doEvent.singleSelect(onElement);

            return;
        }
        if (onElement instanceof Link) {
            doEvent.remove(onElement);
            return;
        }
        if (onElement == null) {
            diagram.elementSelection.size != 0 && doEvent.resetSelect();
            Board.redraw();
            return;
        }
    }
    function dragging(k, onElement) {
        console.log(onElement);
        
        if (onElement instanceof Node) {
            doEvent.create(onElement);
            return;
        }
        if (onElement == null) {
            doEvent.multiplySelect(k);
            return;
        }
        if (onElement instanceof element) {

            if (onElement.selected == false) {
                doEvent.singleSelect(onElement);
            }
            doEvent.move(onElement, k);
            return;
        }
        if (onElement instanceof Graphic && onElement.parent instanceof element) {
            doEvent.size(onElement, k);
        }

        return false;

    }
    function dblclick(e) {
        p = point(e);

        var onElement = Overall.isOn(p);
        if (onElement == null) {
            doEvent.create(new element(p.x - 25, p.y - 25));
        }

        return;
    }
}