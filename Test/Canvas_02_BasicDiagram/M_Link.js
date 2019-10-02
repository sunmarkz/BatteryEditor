function Link(from, to) {
    from instanceof LinkBundle && (this.from = from);
    from instanceof Node && (this.from = from.bundle);
    to instanceof LinkBundle && (this.to = to);
    to instanceof Node && (this.to = to.bundle);
    this.type = 'pl'
    this.graphic_C = new Graphic('c',this.center.x,this.center.y,3);
}
Link.prototype.update = function (){
    this.graphic_C.x = this.center.x;
    this.graphic_C.y = this.center.y;
}
Object.defineProperties(Link.prototype,{
    positionFrom:{
        get: function(){
            return (point(this.from.parentNode.graphic.x, this.from.parentNode.graphic.y));
        }
    },
    positionTo :{
        get: function(){
            return (point(this.to.parentNode.graphic.x, this.to.parentNode.graphic.y));
        }
    },
    typeFrom : {
        get: function(){
            return this.from.parentNode.type;
        }
    },
    typeTo :{
        get: function(){
            return this.to.parentNode.type;
        }
    },
    center:{
        get: function(){
            return (point((this.positionFrom.x+this.positionTo.x+this.offsetFrom+this.offsetTo)/2,(this.positionFrom.y+this.positionTo.y)/2));
        }
    },
    offsetFrom:{
        get : function (){
            return this.from.offset; 
        }
    },
    offsetTo :{
        get : function (){
            return this.to.offset;
        }
    }

})



Link.prototype.reverse = function () {
    var temp = this.from;
    this.from = this.to;
    this.to = temp;
}




function LinkBundle(parentNode) {
    this.linkTo = [];
    this.linked = [];
    this.parentNode = parentNode;
    this.parentElement = parentNode.parentElement;
}

Object.defineProperties(LinkBundle.prototype, {
    position: {
        get: function () {
            return this.parentNode.position;
        }
    },
    x : {
        get: function(){
            return this.parentNode.x;
        }
    },
    y: {
        get: function (){
            return this.parentNode.y;
        }
    },
    type :{
        get: function(){
            return this.parentNode.type;
        }
    },
    offset:{
        get : function(){
            return this.parentNode.type==="left" ? -20 : 20
        }
    } 




})

LinkBundle.prototype.push = function (link) {
     input = link;
    link instanceof Node && (input = input.bundle);
    // if input is Node transfer to its bundle
    if (!this.isInList(input)) {
        var l = new Link(this, input);
        this.linkTo.push(l);
        input.linked.push(l);
        diagram.push(l);
    }
    
}



LinkBundle.prototype.isInList = function (link) {
    var link = link
    var result = !1;
    this.linkTo.forEach(i => {
        link == i && (result = !0);
    });
    return result;
}