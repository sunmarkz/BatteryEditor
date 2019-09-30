function Di_PowDistance(P1, P2) {
    if(P1!=P2){
    return (Math.pow(P1.x - P2.x,2) + Math.pow(P1.y - P2.y,2))
    }
    else{
        return 0
    }
}
function Di_lessThan(P1, P2, c, lessThan = true) {
    if(P1!=P2){
        var x = Math.pow(P1.x - P2.x,2) + Math.pow(P1.y - P2.y,2) < Math.pow(c,2)
    }else{
        var x =0;
    }
    // P1 to P2 < c
    if (lessThan) {
        return (x);
    }
    else {
        return (!x);
    }

}
function Di_Closest(P1, P2, e) {
    var x = Math.pow(P1.x - e.pageX,2) + Math.pow(P1.y - e.pageY,2) <= Math.pow(P2.x - e.pageX,2) + Math.pow(P2.y - e.pageY,2) ? P1 : P2;
    return x;
}

function point(x,y){
    if(x instanceof Number  && y instanceof Number){
        return({x:x,y:y});
    }else{
        return ({x: pageX,y:pageY});
    }
}
function midPoint (a,b){{
    if(a instanceof Number && !(b instanceof Number)){
        return (point(b.x+(a/2), b.y));
    }
    if(!(a instanceof Number) && (b instanceof Number) ){
        return( point(a.x , a.y+(b/2)));
    }
    if ((!(a instanceof Number) && !(b instanceof Number))){

        return(point((a.x+b.x)/2,(a.y+b.y)/2));
    }
}}