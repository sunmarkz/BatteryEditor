function element(x, y, width = 50, height = 50, Text = null) {
    this.graphic = new Graphic(this, 'rect', x, y, width, height);
    this.selected = false;
    this.Text = Text;
    this.node = { left: new Node(this, 'left'), right: new Node(this, 'right') };
    this.graphic_C = new Graphic(this, 'squ', this.right.x, this.y + this.height, 8);
    this.id = diagram.element.size;
}
element.prototype.copy = function () {
    return {
        graphic: this.graphic,
        selected = this.selected,
        Text: this.Text,
        node: this.node,
        graphic_C: this.graphic_C,
        id: this.id,
        x = this.x,
        y = this.y,
        width = this.width,
        height = this.height
    }
}
//Content Draw funciton
Object.defineProperties(element.prototype, {
    x: {
        get: function () { return this.graphic.x },
        set: function (input) {
            this.graphic.x = input;
            this.graphic_C.x = this.rightBot.x;
            this.node.left.update();
            this.node.right.update();
        }
    },
    y: {
        get: function () { return this.graphic.y },
        set: function (input) {
            this.graphic.y = input;
            this.graphic_C.y = this.rightBot.y
            this.node.left.update();
            this.node.right.update();
        }
    },
    rightBot: {
        get: function () {
            return (point(this.x + this.width, this.y + this.height));
        }
    },
    width: {
        set: function (input) {
            this.graphic.width = input > 50 ? input : 50;
            this.graphic_C.x = this.rightBot.x;
            this.node.left.update();
            this.node.right.update();

        },
        get: function () {
            return this.graphic.width;
        }
    },
    height: {
        get: function () {
            return this.graphic.height;

        },
        set: function (input) {
            this.graphic.height = input > 50 ? input : 50;
            this.graphic_C.y = this.rightBot.y;
            this.node.left.update();
            this.node.right.update();

        }
    },
    center: {
        get: function () {
            return (point(this.x + (this.width / 2), this.y + (this.height / 2)));
        },
        set: function (input) {
            this.x = input.x - (this.width / 2);
            this.y = input.y - (this.height / 2);
        }
    },
    left: {
        get: function () {
            return this.graphic.left;
        }
    },
    right: {
        get: function () {
            return this.graphic.right
        }
    }


});



element.prototype.isOnControl = function (e) {
    if (this.node.left.isOnNode(e)) { return this.node.left; }
    if (this.node.right.isOnNode(e)) { return this.node.right; }
    return false;
}





element.prototype.select = function () {

    this.selected = true;
    //in case repeated 
    diagram.elementSelection.add(this);

}
element.prototype.unselect = function () {
    if (this.selected) {

        this.selected = false;
        diagram.elementSelection.delete(this);
    }
}