Canvas = document.getElementById('MyCanvas');
canv = Canvas.getContext('2d');

function Draw(s) {
    input = s;
    s instanceof element && d_ele(input);
    s instanceof Node && d_node(input);
    s instanceof LinkBundle && d_bundleLink(input);
    s instanceof Link && d_link(input);

    function d_ele(el) {
        var element = el;
        Draw(el.node.left.bundle);
        Draw(el.node.right.bundle);
        CanvDraw.rec(el.x, el.y, el.width, el.height);
        CanvStyle.Element();
        if (el.selected) {
            CanvStyle.ElementSelected();
            Draw(el.node.left);
            Draw(el.node.right);
            drawCtrl(el.node.left.bundle);
            drawCtrl(el.node.right.bundle);
        }
    }
    function d_link(s) {
        
        var start = s.positionFrom;
        var target = s.positionTo;
        
        var startOffset = s.from.offset;
        var targetOffset = s.to.offset;
        canv.beginPath();
        canv.moveTo(start.x,start.y);
        canv.lineTo(start.x + startOffset, start.y);
        canv.lineTo(target.x + targetOffset, target.y);
        canv.lineTo(target.x, target.y);
        CanvStyle.Link();
    }
    function d_node(s) {
        
        canv.beginPath();
        CanvDraw.c(s.position.x, s.position.y, 8);
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
        var MidPoint = s.center;
        CanvDraw.c(MidPoint.x, MidPoint.y, 3);
        CanvStyle.CtrlDot();
    }
    function dc_bundle(s){
        var s = s.linkTo;
        if (s) {
            s.forEach(i => {
                drawCtrl(i);
            });
        }
        if(s.linked){
            s.linked.forEach(i =>{
                drawCtrl (i);
            })
        }
    }
}


