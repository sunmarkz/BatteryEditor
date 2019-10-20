var CanvStyle = {
    SelectionBox: function () {

        d.lineWidth = 2;
        d.fillStyle = "";
        d.setLineDash([12, 12]);
        d.stroke();
    },
    Element: function () {

        d.setLineDash([]);
        d.lineWidth = 3;
        d.fillStyle = "white";
        d.fill();
        d.stroke();
    },
ElementSelected: function () {
        d.lineWidth = 3;
        d.setLineDash([]);
        d.fillStyle = "Grey";
        d.fill();
        d.stroke();
    },

Node: function() {
        d.lineWidth = 2;
        d.setLineDash([]);
        d.fillStyle = "white";
        d.fill();
        d.stroke();
    },

Text: function() {
    d.setLineDash([]);
        d.font = '30px Calibri';
        d.fillStyle = 'black'
    },
CtrlDot : function(){
    d.setLineDash([]);
    d.fillStyle = "blue";
    d.fill();
},
Link : function(){
    d.setLineDash([]);
    d.lineWidth = 2;
    d.stroke();
},
LinkTo : function(){
    d.setLineDash([5,5]);
    d.lineWidth = 1;
    d.stroke();
}


}

