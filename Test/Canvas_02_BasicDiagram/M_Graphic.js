function Graphic(parent, type = ("rect" | 'c'| 'tri'), x, y, w_r = 0, h = 0) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.type = type;
    if (this.type == 'rect') {
        this.width = w_r;
        this.height = h;
    }
    if (this.type == 'c') {
        this.radius = w_r;
    }
    if(this.type == 'tri_rbot'){
        this.edge = w_r;
    }
}
Object.defineProperties(Graphic.prototype, {
    position:{
        get: function(){
            return (point(this.x,this.y));
        }
    },
    top: {
        get: function () {
            if(this.type=='tri_rbot'){return this.y-this.edge}
            if(this.type=='rect'){return this.y}
            if(this.type=='c'){return this.y-this.radius}
        }
    },
    bot: {
        get: function () {
            if(this.type=='rect'){return this.y+this.height}
            if(this.type == 'c'){return this.y+this.radius}
            if(this.type=='tri_rbot'){}
            return (this.y + (this.type == 'rect' ? this.height : this.radius));
        }
    },

    left: {
        get: function () {
            if (this.type == 'rect') {
                return ({ x: (this.x), y: (this.y + (this.height / 2)) })
            } else {
                return (point(this.x, this.y));
            }

        }
    },
    right: {
        get: function () {
            if (this.type == 'rect') {
                return ({ x: (this.x + this.width), y: (this.y + (this.height / 2)) })
            } else {
                return (point(this.x, this.y));
            }
        }
    },
    center: {
        get: function () {
            if (this.type == 'rect') {
                return (point(this.x + (this.width / 2), this.y + (this.height / 2)))
            }
            if (this.type == 'c') {
                return (point(this.x, this.y))
            }
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
    var ex = e.x;
    var ey = e.y;
    if (this.type == 'rect') {
        return (this.left.x <= ex && this.right.x >= ex && this.top < ey && this.bot > ey);
    }
    if (this.type == 'c') {
        var result = Di_lessThan(this.center, e, this.radius)
        return (result);
    }
}
Graphic.prototype.draw = function () {
    if (this.type == 'rect') {

        CanvDraw.rect(this.x, this.y, this.width, this.height);
        return;
    }
    if (this.type == 'c') {

        CanvDraw.c(this.x, this.y, this.radius);
        return;
    }
}