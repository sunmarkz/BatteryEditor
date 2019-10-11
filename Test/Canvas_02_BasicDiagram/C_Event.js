var doEvent = {
    create: function (input) {
        if (input instanceof element == true) {
            diagram.push(input);
            return;
        }
        if (input instanceof Node == true) {

            var TempConnectElement;
            Canvas.onmousemove = function (move_e) {
                var onMagnet = Board.magnetPoint(move_e);
                TempConnectElement = onMagnet.element;
                Board.redraw()
                input.drawPointLine(onMagnet.position);
            }
            Canvas.onmouseup = function (e) {
                if (TempConnectElement) {
                    input.push(TempConnectElement);
                    Board.redraw();
                }
                else {
                    Board.redraw();
                }
                Canvas.onmouseup = null;
            }
        }
    },
    remove: function (input) {
        if (input instanceof Link) {
            input.del();
        }
        if(input instanceof Node){
            input.bundle.clear();
        }
    },
    size: function (input = Graphic, e = null) {
        if (input.parent instanceof element) {
            var last_e = e;
            Canvas.onmouseup = function () {
                Canvas.onmousemove = null;
            };
            Canvas.onmousemove = function (mousemove_e) {
                var p = point(mousemove_e);
                var offset = { x: (p.x - last_e.x), y: (p.y - last_e.y) }
                diagram.elementSelection.forEach(function (i) {
                    i.width = i.width + offset.x;
                    i.height = i.height + offset.y;
                    i.node.left.update();
                    i.node.right.update();
                });
                Board.redraw();
                last_e = p;
            }
        }
    },
    move: function (input, e = null) {
        if (input instanceof element) {
            var last_e = e;
            Canvas.onmouseup = function(){
                Canvas.onmousemove = null;
            };
            Canvas.onmousemove = function (mousemove_e) {
                var p = point(mousemove_e);
                var offset = { x: (p.x - last_e.x), y: (p.y - last_e.y) }
                diagram.elementSelection.forEach(function (i) {
                    i.x = i.x + offset.x;
                    i.y = i.y + offset.y;
                    i.node.left.update();
                    i.node.right.update();
                });
                Board.redraw();
                last_e = p;
            }
        }
    },
    resetMove: function (redraw = false) {
        Canvas.onmousemove = null;
        if (redraw) {
            Board.redraw();
        }
    },
    resetUp: function (redraw = false) {
        Canvas.onmouseup = null;
        if (redraw) {
            Board.redraw();
        }
    },
    multiplySelect: function (k) {

        var fromE = point(k);
        Canvas.onmousemove = function (e) {
            p = point(e);
            //## forEach find inSelctBox element
            diagram.element.forEach(function (i) {
                if ((fromE.x < i.x) && (p.x > i.x + i.width) && (fromE.y < i.y) && (p.y > i.y + i.height)) {
                    !i.selected && i.select();
                } else {
                    i.unselect();
                }
            })
            Board.redraw();
            CanvDraw.rect(fromE.x, fromE.y, p.x - fromE.x, p.y - fromE.y);
            CanvStyle.SelectionBox();
        }
    },
    singleSelect: function (input) {
        this.resetSelect();
        input.select();
    },
    resetSelect: function () {
        diagram.elementSelection.forEach(function (i) {
            i.unselect();
            // reset onControl statement
        });

        diagram.elementSelection.clear();
    },
    textEdit: function (input){
        // var text = document.querySelector('textarea');
        // var textarea = document.querySelector('textarea');
        // textarea!=null && body.removeChild(textarea);
        var text = document.createElement('textarea');
        text.setAttribute('elementID', input.id);
        text.id = 'ElementAtt';
        text.value = input.Text;
        
        var t = text.style;
        t.left = input.x / CanvQualityEnhanceVector+'px';
        t.top = input.y / CanvQualityEnhanceVector+'px';
        t.width = input.width / CanvQualityEnhanceVector +'px';
        t.height = input.height / CanvQualityEnhanceVector +'px';
        t.position = 'absolute';
        t.margin = "0";
        t.padding = "5px";
        t.border = "0";
        t.outline = "none";
        t.whiteSpace = "pre-wrap";
        t.fontSize = 18 +'px';
        t.overflow = "hidden";
        text.onblur = function(){ 
            
            doEvent.textCancel(this, input);
        } ;
        text.focus();
        text.select();
    body.appendChild(text);  
    text.focus();
    },
    textCancel: function (text, onElement){
        onElement.Text = text.value;
        onElement.width = parseFloat(text.style.width) * CanvQualityEnhanceVector;
        onElement.height = parseFloat(text.style.height) * CanvQualityEnhanceVector;
        body.removeChild(text);
        Board.redraw();
    }
}