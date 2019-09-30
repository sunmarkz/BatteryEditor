
var CanvDraw = {
    rec: function (x , y , w , h ){
        d.beginPath();
        d.rect(x, y, w, h);
        d.closePath();
    },
    c: function (x,y,r){
        d.beginPath();
        d.arc(x, y, r, 0, Math.PI * 2);
        d.closePath();
    },
    t:function(x,y,width,t){
        var margin = 2;
        d.fillText(t, x + margin, y + 15 + margin, width - (margin * 2));
    }
}