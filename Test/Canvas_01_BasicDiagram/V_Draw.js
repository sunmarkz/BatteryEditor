Canvas = document.getElementById('MyCanvas');
canv = Canvas.getContext('2d');

function Draw(s) {
    input = s;
    s instanceof element && d_ele(input);
    s instanceof Node && d_node(input);
    s instanceof LinkBundle && d_bundleLink(input);

    function d_ele(el) {
        // el.node.left.drawLine();
        var element = el;
        console.log(element.node.left.get.position())
        // el.node.right.drawLine();
        Draw(el.node.left.bundle);
        Draw(el.node.right.bundle);
        // el.node.left.updatePosition();
        // el.node.right.updatePosition();
        CanvDraw.rec(el.x, el.y, el.width, el.height);
        CanvStyle.Element();
        Draw(el.node.left);
        Draw(el.node.right);
        if (el.selected) {
            Draw(el.node.left);
            Draw(el.node.right);
        }
        // Draw(el.text);
        // el.textDraw();
    }
    function d_link(s) {

        var start = s.get.fromPosition();
        var target = s.get.toPosition();
        var startOffset = s.get.type() == 'left' ? -20 : 20
        var targetOffset = s.get.type() == 'left' ? -20 : 20
        canv.beginPath();
        canv.moveTo(start);
        canv.lineTo(start.x + startOffset, start.y);
        canv.lineTo(target.position.x + targetOffset, target.position.y);
        canv.lineTo(target.position.x, target.position.y);
        CanvStyle.Link();

    }
    function d_node(s) {
        // console.log(s.get.position());
        
        canv.beginPath();
        // CanvDraw.c(position.x, position.y, 8);
        // canv.arc(s.get.position.x, s.get.position.y, 8, 0, Math.PI * 2);
        canv.closePath();
        CanvStyle.Node();
    }
    function dashLink(s) {

    }
    function d_text(s) {
        if (s.Text) {
            // if content text isnt null
            var margin = 2;
            CanvStyle.Text();
            var Widthminmum = d.measureText(s.Text).width;
            if (Widthminmum + margin * 2 > s.width) {
                s.width = Widthminmum + margin * 2;
                s.draw();
            }
            d.fillText(s.Text, s.x + margin, s.y + 15 + margin, s.width - (margin * 2));

        }
    }
    function d_bundleLink(s) {
        var s = s.get.list();
        if (s) {

            s.get.list().forEach(i => {
                Draw(i);
            });
        }
    }

}

function drawCtrl(s) {
    s instanceof element && dc_element(s);
    s instanceof Link && dc_link(s);


    function dc_element(s) {
        var left = s.node.left;
        var right = s.node.right;
        canv.beginPath();
        canv.arc(left.position.x, left.position.y, 8, 0, Math.PI * 2);
        canv.closePath();
        CanvStyle.Node();
        canv.beginPath();
        canv.arc(right.position.x, right.position.y, 8, 0, Math.PI * 2);
        canv.closePath();
        CanvStyle.Node();
    }
    function dc_dashLink(s) {
        canv.beginPath();
        canv.setLineDash([2, 2]);
        canv.moveTo(this.position.x, this.position.y);
        canv.lineTo(mouse.x, mouse.y);
        canv.stroke();
    }
    function dc_link(s) {
        var MidPoint = s.mid();
        CanvDraw.c(MidPoint.x, MidPoint.y, 3);
        CanvStyle.CtrlDot();
    }
}


