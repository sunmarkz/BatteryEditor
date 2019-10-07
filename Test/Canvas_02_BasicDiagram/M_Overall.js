
var Overall = {
    isOn: function (e) {
        var list = this.operateList();
        var p =e;

        var on = null;
        list.forEach(
            i => {
                if (i instanceof Link == true) {
                    if (i.graphic_C.isOn(p)) {
                        on = i;
                        return false;
                    }

                } else {
                    if (i.graphic.isOn(p)) {
                        on = i;
                        i instanceof Node && console.log('NODE');
                        
                    }

                }
                return on!=null? false: true;
            });
            
        return on;
    },
    operateList: function () {
        
        var result = new Set();
            if (diagram.elementSelection.size != 0) {

            diagram.elementSelection.forEach(i => {
                result.add(i.node.right);
                result.add(i.node.left);
                List.merge(result, i.node.left.bundle.linkTo);
                List.merge(result, i.node.right.bundle.linkTo);
                List.merge(result, i.node.left.bundle.linked);
                List.merge(result, i.node.right.bundle.linked);
            });

            List.merge(result, diagram.element)
            console.log(result);
            
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
