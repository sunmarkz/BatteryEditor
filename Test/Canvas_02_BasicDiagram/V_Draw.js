Canvas = document.getElementById('MyCanvas');
canv = Canvas.getContext('2d');

function Draw(s, type = null) {
    var input = s;
    input instanceof Layer && Draw(input.element);
    input instanceof element && d_ele(input);
    input instanceof Node && d_node(input);
    input instanceof LinkBundle && d_bundleLink(input);
    input instanceof Link && d_link(input);

    function d_ele(el) {
        el.graphic.draw();  
        CanvStyle.Element();
        if (el.selected) {
            CanvStyle.ElementSelected();
            Draw(el.node.left);
            Draw(el.node.right);
            drawCtrl(el.node.left.bundle);
            drawCtrl(el.node.right.bundle);
            drawCtrl(el);
        }
        d_text(el);
    }
    function d_link(s) {

        var start = s.positionFrom;
        var target = s.positionTo;

        var startOffset = s.from.offset;
        var targetOffset = s.to.offset;
        canv.beginPath();
        canv.moveTo(start.x, start.y);
        canv.lineTo(start.x + startOffset, start.y);
        canv.lineTo(target.x + targetOffset, target.y);
        canv.lineTo(target.x, target.y);
        CanvStyle.Link();
    }
    function d_links(s) {
            Draw(s);
    }
    function d_node(s) {
        
        s.graphic.draw();
        CanvStyle.Node();
    }
    function dashLink(s) {

    }
    function d_text(s) {
        if (s.Text) {
            // if content text isnt null
            var margin = 5;
            CanvStyle.Text();
            var Widthminmum = d.measureText(s.Text).width;
            if (Widthminmum + margin * 2 > s.width) {
                s.width = Widthminmum + margin * 2;
                Draw(s);
                return;
            }
            d.fillText(s.Text, s.x + margin, s.y + 30 + margin, s.width - (margin * 2));

        }
    }
    function d_bundleLink(s) {
        var s = s.linkTo;

        if (s) {

            s.forEach(i => {
                Draw(i);
            });
        }
    }

}

function drawCtrl(s) {
    s instanceof element && dc_element(s);
    s instanceof LinkBundle && dc_bundle(s);
    s instanceof Link && dc_link(s);


    function dc_element(s) {

        // var left = s.node.left;
        // var right = s.node.right;
        // canv.beginPath();
        // canv.arc(left.position.x, left.position.y, 8, 0, Math.PI * 2);
        // canv.closePath();
        // CanvStyle.Node();
        // canv.beginPath();
        // canv.arc(right.position.x, right.position.y, 8, 0, Math.PI * 2);
        // canv.closePath();
        // CanvStyle.Node();
        s.graphic_C.draw();
        CanvStyle.CtrlDot();
    }
    function dc_dashLink(s) {
        canv.beginPath();
        canv.setLineDash([2, 2]);
        canv.moveTo(this.position.x, this.position.y);
        canv.lineTo(mouse.x, mouse.y);
        canv.stroke();
    }
    function dc_link(s) {
        s.graphic_C.draw();
        CanvStyle.CtrlDot();
        return;
    }
    function dc_bundle(s) {
        var slinkTo = s.linkTo;
        var slinked = s.linked;


        if (slinked) {
            slinked.forEach(j => {
                j.update()
                drawCtrl(j);
            });
        }
        if (slinkTo) {
            slinkTo.forEach(i => {
                i.update();
                drawCtrl(i);
            });
        }
        return;
    }
}


