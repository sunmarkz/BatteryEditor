function Draw_CreateElement(e) {
    this.e = e;
    Board.onCreate = true;
    diagram.push(new element(this.e.pageX, this.e.pageY, 0, 0));
    Canvas.onmousemove = function (j) {
        if (Board.onCreate) {
            var index = diagram.length - 1;
            diagram[index].width = j.pageX - diagram[index].x;
            diagram[index].height = j.pageY - diagram[index].y;
            Board.redraw();
        }
    }
}

function Draw_MoveElements(e) {

    Canvas.onmouseup = function () {
        Canvas.onmousemove = null;
    }
    var last_e = e;
    Canvas.onmousemove = function (mousemove_e) {
        var offset = { x: (mousemove_e.pageX - last_e.pageX), y: (mousemove_e.pageY - last_e.pageY) }

        Board.selectedElements.forEach(function (i) {
            i.x = i.x + offset.x;
            i.y = i.y + offset.y;
        });
        Board.redraw();
        last_e = mousemove_e;
    }
}


function Element_Select(element) {
    inSelectionList = Board.selectedElements.indexOf(element);
    if (inSelectionList == -1) {
        element.selected = true;
        //in case repeated 
        Board.selectedElements.push(element);
    } else {
        return;
    }
}
function Element_Unselect(element) {
    element.selected = false;
    var index = Board.selectedElements.indexOf(element);
    if (index != -1) {
        if (index == 0) {
            Board.selectedElements.shift()
        } else {
            Board.selectedElements.splice(index, index);
        }
    }

}

function Draw_SelectionBox(e) {

    mousedown = { x: e.pageX, y: e.pageY };

    Canvas.onmousemove = function (e) {
        Board.onSelection = true;
        //## forEach find inSelctBox element
        diagram.forEach(function (i) {
            if ((mousedown.x < i.x) && (e.pageX > i.x + i.width) && (mousedown.y < i.y) && (e.pageY > i.y + i.height)) {
                Element_Select(i);
            } else {
                Element_Unselect(i);
            }
        })
        Board.redraw();
        d.beginPath();
        d.rect(mousedown.x, mousedown.y, e.pageX - mousedown.x, e.pageY - mousedown.y);
        d.closePath();
        CanvStyle.SelectionBox();
    }

    //referesh mouseup EventListener
    Canvas.addEventListener('mouseup', function (e) {
        Canvas.onmousemove = null;
        Board.redraw();
    })
}

function Draw_Select(element) {
    Element_Select(element);
    Board.redraw();
}




function Connection_onMouseDown(e, node) {
    var TempConnectElement;

    Canvas.onmousemove = function (move_e) {
        var onMagnet = Board.magnetPoint(move_e);

        TempConnectElement = onMagnet.element;
        Board.redraw()
        node.drawPointLine(onMagnet.position);
    }



    Canvas.onmouseup = function (e) {
        Canvas.onmousemove = null;
        if (TempConnectElement) {
            node.push(TempConnectElement);
            Board.redraw();
            return;
        }
        else {
            Board.redraw();
        }

    }
}