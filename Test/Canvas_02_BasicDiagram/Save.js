function Save_(){
    var overall = [];
    var elements = [];
    var links = [];
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
            elements.push(element);
        });
    diagram.link.forEach(j=>{
        var link = {
            'fromElement': j.from.parentElement.id,
            'fromNode': j.from.parentNode.type,
            'toElement': j.to.parentElement.id,
            'toNode': j.to.parentNode.type
        }
        links.push(link);
    });
var result = {
    'element' : elements,
    'link' : links
}
    var string = JSON.stringify(result);
  return(string);
}

function Load_(input){
    var input = eval('('+input+')');
    diagram = new Layer;

    input.element.forEach( i =>{
        diagram.push(new element(i.x, i.y, i.width, i.height, i.text));
    }
    );
    input.link.forEach(
        j=>{
            var from = j.fromNode == 'left' ? [...diagram.element][j.fromElement].node.left : [...diagram.element][j.fromElement].node.right 
            var to = j.toNode == 'left' ? [...diagram.element][j.toElement].node.left : [...diagram.element][j.toElement].node.right 
            from.push(to);
        }
    );
    Board = new Canv(d, diagram);
    Board.redraw();
    // eventListener = new EventHandler(Canvas);
}

var inputElement = document.getElementById("files");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
    var selectedFile = document.getElementById("files").files[0];//获取读取的File对象
    console.log(selectedFile);
    
    var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile);//读取文件的内容
    reader.onload = function () {
        console.log(this.result);
        Load_(this.result);
        
    };
}
var button = document.getElementById("export");
button.addEventListener("click", saveHandler, false);
function saveHandler() {
    let content = Save_();
    var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "diagram.json");
}