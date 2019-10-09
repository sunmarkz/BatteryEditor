function Save_(){
    var overall = [];
    diagram.element.forEach(
        i=>{
            var element = {
                'id' : i.id,
                'x' : i.x,
                'y': i.y,
                'width':i.width,
                'height': i.height,
                'text': i.text
            };

        }
    );
    diagram.link.forEach(j=>{
        var link = {
            'fromElement': j.from.parentElement.id,
            'fromNode': j.from.parentNode.type,
            'toElement': j.to.parentElement.id,
            'toNode': j.to.parentNode.type
        }
    });
var result = {
    'element' : [elements],
    'link' : [links]
}
    console.log(overall);
    
}