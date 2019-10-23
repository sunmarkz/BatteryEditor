const margin = 7;
const singleLetterHeight = 30;

var CanvDraw = {
    rect: function (x , y , w , h ){
        d.beginPath();
        d.rect(x, y, w, h);
        d.closePath();
    },
    c: function (x,y,r){
        d.beginPath();
        d.arc(x, y, r, 0, Math.PI * 2);
        d.closePath();
    },
    t:function(t,x,y,width,height = singleLetterHeight){
        
        d.fillText(t, x , y  , width,height);
    }
}