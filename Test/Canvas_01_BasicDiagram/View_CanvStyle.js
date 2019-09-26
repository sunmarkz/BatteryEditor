function CanvStyle(style = ('selectionBox' |'element'|'elementSelected'|'Node'|'Text') ){
    var canv = d;
    switch (style) {
        case 'selectionBox':
            canv.lineWidth = 1;
            canv.setLineDash([6,6]);
            canv.fillStyle = "";
            canv.stroke();

            break;
        case 'element':
            canv.lineWidth = 2;          
            canv.setLineDash([]);
            canv.fillStyle = "white";
            canv.fill();
            canv.stroke();
            break;

        case 'elementSelected':
            canv.lineWidth = 2;          
            canv.setLineDash([]);
            canv.fillStyle = "Grey";
            canv.fill();
            canv.stroke();
            break;
        case 'Node':
            canv.lineWidth = 1;
            canv.setLineDash([]);
            canv.fillStyle = "white";
            canv.fill();
            canv.stroke();
            break;
        case 'Text':
            canv.font = '15px Calibri';
            canv.fillStyle='black'
    }

}