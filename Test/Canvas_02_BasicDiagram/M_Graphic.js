function Graphic(parent, type = ("rect" | 'c' | 'tri' | 'squ'), x, y, w_r = 0, h = 0) {
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
    if (this.type == 'tri_rbot') {
        this.edge = w_r;
    }
    if (this.type == 'squ') {
        this.edge = w_r;
    }
}
Object.defineProperties(Graphic.prototype, {
    position: {
        get: function () {
            return (point(this.x, this.y));
        }
    },
    top: {
        get: function () {
            if (this.type == 'tri_rbot') { return (this.y - this.edge) }
            if (this.type == 'rect') { return this.y }
            if (this.type == 'c') { return this.y - this.radius }
            if (this.type == 'squ') { return this.y - (this.edge ) }
        }
    },
    bot: {
        get: function () {
            if (this.type == 'rect') { return (this.y + this.height) }
            if (this.type == 'c') { return this.y + this.radius }
            if (this.type == 'tri_rbot') { }
            if (this.type == 'squ') { return this.y + (this.edge ) }
            return (this.y + (this.type == 'rect' ? this.height : this.radius));
        }
    },

    left: {
        get: function () {
            if (this.type == 'squ') { return (this.x - (this.edge )) }

            if (this.type == 'rect') {
                return ({ x: (this.x), y: (this.y + (this.height / 2)) })
            } 
            if (this.type == 'c') {
                return (point(this.x, this.y));
            }

        }
    },
    right: {
        get: function () {
            if (this.type == 'squ') { return (this.x + (this.edge )) }
            if (this.type == 'rect') {
                return ({ x: (this.x + this.width), y: (this.y + (this.height / 2)) })
            } 
            if (this.type == 'c') {
                return (point(this.x, this.y));
            }
        }
    },
    center: {
        get: function () {

            if (this.type == 'rect') {
                return (point(this.x + (this.width / 2), this.y + (this.height / 2)))
            }
            if (this.type == 'c' || 'squ') {
                return (point(this.x, this.y))
            }
        },
        set: ({ x: x, y: y }) => {
            if (this.type == 'rect') {
                this.x = x - this.width / 2;
                this.y = y - this.height / 2;
                return;
            }
            if (this.type == 'c' || 'squ') {
                this.x = x;
                this.y = y;
            }
        }
    },

});
Graphic.prototype.isOn = function (e) {
    let ex = e.x;
    let ey = e.y;
    const senseArea = 5;
    if (this.type == 'rect' ) {
        return (
            this.left.x - senseArea <= ex &&
            this.right.x + senseArea >= ex &&
            this.top - senseArea < ey &&
            this.bot + senseArea > ey);
    }

    if (this.type ==  'squ') {
        return (
            this.x-(this.edge) - senseArea <= ex &&
            this.x+(this.edge )- senseArea >= ex &&
            this.top-(this.edge )- senseArea < ey &&
            this.bot + (this.edge )+ senseArea > ey);
    }
    if (this.type == 'c') {
        let result = Di_lessThan(this.center, e, this.radius + senseArea);
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
    if (this.type == 'squ') {
        CanvDraw.rect(this.x - (this.edge / 2),
            this.y - (this.edge / 2),
            this.edge,
            this.edge);
        return;
    }

}