var CanvStyle = {
    SelectionBox: function () {

        d.lineWidth = 1;
        d.fillStyle = "";
        d.setLineDash([6, 6]);
        d.stroke();
    },
    Element: function () {

        d.setLineDash([]);
        d.lineWidth = 2;
        d.fillStyle = "white";
        d.fill();
        d.stroke();
    },
ElementSelected: function () {
        d.lineWidth = 2;
        d.setLineDash([]);
        d.fillStyle = "Grey";
        d.fill();
        d.stroke();
    },

Node: function() {
        d.lineWidth = 1;
        d.setLineDash([]);
        d.fillStyle = "white";
        d.fill();
        d.stroke();
    },

Text: function() {
    d.setLineDash([]);
        d.font = '22px Calibri';
        d.fillStyle = 'black'
    },
CtrlDot : function(){
    d.setLineDash([]);
    d.fillStyle = "blue";
    d.fill();
},
Link : function(){
    d.setLineDash([]);
    d.lineWidth = 1;
    d.stroke();
}


}

