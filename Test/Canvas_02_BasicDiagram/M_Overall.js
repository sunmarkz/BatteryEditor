
var Overall = {
    isOn: function (e) {
        var list = [...this.operateList()];
        var p = e;
        var on = null;
        for (let i = 0; i < list.length; i++) {
            var j=list[i];
            if (j instanceof Link == true) {
                if (j.graphic_C.isOn(p)) {
                    on = j;
                    break;
                }
            }
            else if (j instanceof Graphic == true) {
                if (j.isOn(p)) {
                    on = j;
                    break;
                }
            }
            else if (j.graphic.isOn(p)) {
                on = j;
                break;
            }
        }
        return on;
    },
    operateList: function () {

        var result = new Set();
        if (diagram.elementSelection.size != 0) {

            diagram.elementSelection.forEach(i => {
                result.add(i.graphic_C);
                result.add(i.node.right);
                result.add(i.node.left);
                List.merge(result, i.node.left.bundle.linkTo);
                List.merge(result, i.node.right.bundle.linkTo);
                List.merge(result, i.node.left.bundle.linked);
                List.merge(result, i.node.right.bundle.linked);
            });

            List.merge(result, diagram.element)

            return (result);
        } else {
            return diagram.element;
        }
    },
    Status: function () {
        if (diagram.elementSelection.size != 0) {
            return ("onSelection");
        }
        if (diagram.elementSelection.size == 0) {
            return ('Noselection');
        }
    }

}
