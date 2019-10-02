function Di_PowDistance(P1, P2) {
    if (P1 != P2) {
        return (Math.pow(P1.x - P2.x, 2) + Math.pow(P1.y - P2.y, 2))
    }
    else {
        return 0
    }
}
function Di_lessThan(P1, P2, c, lessThan = true) {
    if (P1 != P2) {
        var x = Math.pow(P1.x - P2.x, 2) + Math.pow(P1.y - P2.y, 2) < Math.pow(c, 2)
    } else {
        var x = 0;
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
    var x = Math.pow(P1.x - e.pageX, 2) + Math.pow(P1.y - e.pageY, 2) <= Math.pow(P2.x - e.pageX, 2) + Math.pow(P2.y - e.pageY, 2) ? P1 : P2;
    return x;
}

function point(x, y) {
    return ({ x: x, y: y });

}
function midPoint(a, b) {
    {
        if (a instanceof Number && !(b instanceof Number)) {
            return (point(b.x + (a / 2), b.y));
        }
        if (!(a instanceof Number) && (b instanceof Number)) {
            return (point(a.x, a.y + (b / 2)));
        }
        if ((!(a instanceof Number) && !(b instanceof Number))) {

            return (point((a.x + b.x) / 2, (a.y + b.y) / 2));
        }
    }
}



function Graphic(type = ("rect" | 'c'), x, y, w_r = 0, h = 0) {
     this.x = x;
     this.y = y;
    this.type=type;
    if (type == 'rect') {
        this.width = w_r;
        this.height = h;
    }
    if (type == 'c') {
        this.radius = w_r;
    }
}
Object.defineProperties(Graphic.prototype, {
    // x: {
    //     get: function(){
    //         return this.x;
    //     }
    // },
    // y:{
    //     get:function (){
    //         return this.y;
    //     }
    // },
    top: {
        get: function () {
            return this.y+ this.type =='rect'? 0: this.radius;
        }
    },
    bot: {
        get: function () {
            return this.y + this.type=='rect'? this.height : this.radius;
        }
    },

    left: {
        get: function() {
            var y = this.y + ((this.type == 'rect' ? (this.height / 2) : (this.radius / 2)) );
            return ({ x: this.x, y:y })
        }
    },
    right: {
        get:function (){
            return ({ x: this.x + (this.type == 'rect' ? this.width : this.radius), y: this.y + (this.type == 'rect' ? this.height / 2 : 0) })
        }
    },
    center: {
        get: function() {
            return point(this.x + this.type == 'rect' ? this.width / 2 : 0, this.y + this.type == 'rect' ? this.height / 2 : 0)
        },
        set: ({ x: x, y: y }) => {
            if (this.type == 'rect') {
                this.x = x - this.width / 2;
                this.y = y - this.height / 2;
                return;
            }
            if (this.type == 'c') {
                this.x = x;
                this.y = y;
            }
        }
    },
    
});
Graphic.prototype.isOn = function (e) {
    var ex= e.pageX;
    var ey = e.pageY;
    if (this.type == 'rect') {
        return this.left.x<=ex&&this.right.x>=ex&& this.top<ey && this.bot>ey;
    }
    if(this.type == 'c'){
        return Di_PowDistance(point(ex,ey),this.center)<Math.pow(this.radius,2);
    }
}
Graphic.prototype.draw = function (){
    if(this.type == 'rect'){
        // console.log(this.x, this.y);
        
        CanvDraw.rect(this.x,this.y,this.width,this.height);
        return;
    }
    if(this.type == 'c'){
        // console.log(this.x,this.y);
        
        CanvDraw.c(this.x, this.y, this.radius);
        return;
    }
}

function isOnElement(e) {
    var e = point(e.pageX, e.pageY);


}
function isOnCtrl(e) {

}



function remove(e, list) {
    var index = list.indexOf(e);
    if (index != -1) {
        list.splice(index, 1);
    }
    return list;

}