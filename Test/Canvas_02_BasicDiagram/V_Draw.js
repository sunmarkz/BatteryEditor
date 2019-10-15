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
        var textContent = Handler_text(s.Text);
        if (textContent) {
            let singleLetterHeight = 30;
            let textArea_Width = s.width -  margin * 2 ;
            let textArea_Height = (s.height - margin * 2)  / singleLetterHeight;
            let textArea_x = s.x+margin;
            let textArea_y = s.y+margin;
            var renderText = textContent;
            var LetterWidthMaximum= null;
            for (let i = 0; i < renderText.length; i++) {
                if (i > textArea_Height-1) { 
                    // if out of height, break;
                    // and renderText == where it is.
                    renderText = renderText.slice(0,i);
                    break;
                } 

                let j = renderText[i];
                if(d.measureText(j).width>textArea_Width){
                    // out of width; start splite;

                    if(LetterWidthMaximum==null){
                        //initial maximum letter count
                        let LetterTest = j;
                        for (let k = LetterTest.length-1; k >1 ; k--) {
                            let texts = LetterTest.slice(0,k);
                            if (d.measureText(texts).width <= textArea_Width){
                                LetterWidthMaximum = k;
                                break;
                            }
                        }
                    }
                    
                    renderText.splice(i, 1, renderText[i].slice(0, LetterWidthMaximum), renderText[i].slice(LetterWidthMaximum));
                }

                CanvStyle.Text();
                CanvDraw.t(renderText[i], textArea_x, textArea_y +singleLetterHeight *i, textArea_Width);
                                
            }


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