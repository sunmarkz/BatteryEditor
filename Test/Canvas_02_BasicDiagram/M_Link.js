function Link(from, to) {
    from instanceof LinkBundle && (this.from = from);
    from instanceof Node && (this.from = from.bundle);
    to instanceof LinkBundle && (this.to = to);
    to instanceof Node && (this.to = to.bundle);
    this.type = 'pl'
    this.graphic_C = new Graphic(this, 'c', this.center.x, this.center.y, 5);
}
Link.prototype.update = function () {
    this.graphic_C.x = this.center.x;
    this.graphic_C.y = this.center.y;
}
Object.defineProperties(Link.prototype, {
    positionFrom: {
        get: function () {
            return (point(this.from.parentNode.graphic.x, this.from.parentNode.graphic.y));
        }
    },
    positionTo: {
        get: function () {
            return (point(this.to.parentNode.graphic.x, this.to.parentNode.graphic.y));
        }
    },
    typeFrom: {
        get: function () {
            return this.from.parentNode.type;
        }
    },
    typeTo: {
        get: function () {
            return this.to.parentNode.type;
        }
    },
    center: {
        get: function () {
            return (point((this.positionFrom.x + this.positionTo.x + this.offsetFrom + this.offsetTo) / 2, (this.positionFrom.y + this.positionTo.y) / 2));
        }
    },
    offsetFrom: {
        get: function () {
            return this.from.offset;
        }
    },
    offsetTo: {
        get: function () {
            return this.to.offset;
        }
    }

})



Link.prototype.reverse = function () {
    var temp = this.from;
    this.from = this.to;
    this.to = temp;
}
Link.prototype.del = function () {
    this.from.linkTo.delete(this);
    this.to.linked.delete(this);
    diagram.del(this);

}



function LinkBundle(parentNode) {
    this.linkTo = new Set();
    this.linked = new Set();
    this.parentNode = parentNode;
    this.parentElement = parentNode.parentElement;
}


Object.defineProperties(LinkBundle.prototype, {
    position: {
        get: function () {
            return this.parentNode.position;
        }
    },
    x: {
        get: function () {
            return this.parentNode.x;
        }
    },
    y: {
        get: function () {
            return this.parentNode.y;
        }
    },
    type: {
        get: function () {
            return this.parentNode.type;
        }
    },
    offset: {
        get: function () {
            return this.parentNode.type === "left" ? -20 : 20
        }
    }




})

LinkBundle.prototype.push = function (link) {
    var input = link;
    link instanceof Node && (input = link.bundle);
    // if input is Node transfer to its bundle
    var l = new Link(this, input);
    this.linkTo.add(l);
    input.linked.add(l);
    diagram.push(l);

}


LinkBundle.prototype.clear = function () {
    this.linked.forEach((j) => {
        j.del();
    });
    this.linkTo.forEach((i) => {
        i.del();
    });
}
