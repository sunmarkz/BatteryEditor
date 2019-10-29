
const _tabText = '-'; // this is tab letter in textarea;
const _startLocation = { x: 50, y: 50 };
const _lineHeight = singleLetterHeight;
const _lineWidth = 20;
const _gapping = 20;


function t_Node(splitedString) {

    if (splitedString != false) {
        this.level = Handle_text.FrontKeywordsCount(splitedString, _tabText) + 1;
        this.content = Handle_text.FrontKeywordsFilter(splitedString, _tabText);
    } else {
        this.content = null;
    }

    this.width = d.measureText(this.content).width;
    this.height = _lineHeight;
    this.child = [];
    this.childHeight = 0;
    this.childWidth = 0;
}
t_Node.prototype.locationUpdate = function (Xstart, Ystart) {
    this.groupX = Xstart;
    this.groupY = Ystart;
    this.x = this.groupX;
    this.y = this.groupY + (this.childHeight / 2);
    if (!this.child) {
        return;
    }

    var _yAddtion = 0;
    for (let i = 0; i < this.child.length; i++) {
        let _item = this.child[i];
        _item.locationUpdate(this.groupX + this.width, this.groupY + _yAddtion);
        _item.groupY = this.groupY + _yAddtion;
        _yAddtion += _item.childHeight;
    }

}

function t_NodeGenerator(list) {

    var s = list;
    var _startNode = new t_Node(null);
    _startNode.level = 0;
    _startNode.x = 10;
    _startNode.y = 50;

    var _levelList = [_startNode];
    for (let i = 0; i < s.length; i++) {
        var _item = s[i];
        var _node = new t_Node(_item);

        _levelList[_node.level + 1] && (_node.child = _levelList[_node.level + 1]);

        // childrens height;
        if (_node.child == false) {
            _node.childHeight = _node.height;
            _node.childWidth = _node.width;
        } else {
            _node.child.forEach(i => {
                _node.childHeight += i.childHeight;
                _node.childWidth < i.width && (_node.childWidth = i.width);
            })
        }
        _levelList[_node.level + 1] && delete _levelList[_node.level + 1];
        !_levelList[_node.level] && (_levelList[_node.level] = [])
        _levelList[_node.level].unshift(_node);
    }
    _levelList.length = 1;
    return (_levelList[0]);

}






t_Node.prototype.draw = function () {
    // CanvDraw.rect(20, this.y, this.width, this.height);
    if (this.content != null) {
        CanvStyle.Node();
        CanvStyle.Text();

        CanvDraw.t(this.content, this.x, this.y, this.width);
    }
    if (this.child == false) { return; }
    for (let i = 0; i < this.child.length; i++) {
        this.child[i].draw();
    }

}

var Handle_text = {
    lineSeperator: function (input) {
        // input is get from textarea, handle new line event
        // return a array of strings, contain lines
        if (input == null) {
            return null;
        }

        // if (input instanceof String != true) throw ('lineSeperator handler error : ', input);

        var text = new String(input);
        text = text.split('\n');
        return text;
    },

    FrontKeywordsCount: function (sourceText, keyword) {
        var _count = 0;
        var _text = sourceText;
        if (_text instanceof String == false){return 0}

        if ( _text.indexOf(keyword) != 0 ) { return 0 }
        while (_text.indexOf(keyword) == 0) {
            _count++;
            _text = _text.slice(1);
        }
        return _count;
    },

    FrontKeywordsFilter: function (sourceText, keyword) {
        var _count = 0;
        var _text = sourceText;
        if(_text instanceof String == false){
            return _text;
        }
        while (_text.indexOf(keyword) == 0) {
            _count++;
            _text = _text.slice(1);
        }
        return _text;
    },

    levelGenerator: function (input) {
        // raw text will transfer to lineSeperator:
        var _lineSepertedText = input instanceof Array == true ? input : this.lineSeperator(input);
        //initialize container
        var outputNodes = [null];
        //read items in line Seperated Text;
        for (let i = 0; i < _lineSepertedText.length; i++) {
            outputNodes.push(new t_Node(_lineSepertedText[i], outputNodes[outputNodes.length - 1]));
        }

        return outputNodes;
        //initialize Node;

    },

    TextInGraphic: function (textContent, graphic) {
        if (graphic.type != "rect") {
            throw ('Not support this graphic type :', graphic.type);
        }
        var s = graphic;

        if (textContent) {


            let textArea_Width = s.width - (margin * 2);
            let textArea_Height = (s.height - (margin * 2)) / singleLetterHeight;
            var renderText = textContent;
            var LetterWidthMaximum = null;


            for (let i = 0; i < renderText.length; i++) {
                if (i > textArea_Height - 1) {
                    // if out of height, break;
                    // and renderText == where it is.
                    renderText = renderText.slice(0, i);
                    break;
                }

                let j = renderText[i];
                if (d.measureText(j).width > textArea_Width) {
                    // out of width; start splite;

                    if (LetterWidthMaximum == null) {
                        //initial maximum letter count
                        let LetterTest = j;
                        for (let k = LetterTest.length - 1; k > 1; k--) {
                            let texts = LetterTest.slice(0, k);
                            if (d.measureText(texts).width < textArea_Width) {
                                LetterWidthMaximum = k;
                                break;
                            }
                        }
                    }

                    renderText.splice(i, 1, renderText[i].slice(0, LetterWidthMaximum), renderText[i].slice(LetterWidthMaximum));
                }


            }

            return renderText;
        }
    },
    RenderTextInGraphic: function (HandledText) {

    }



}


document.getElementById('sss').onkeypress = function () {
    Text2Diagram();


}

function Text2Diagram() {
    var s = document.getElementById('sss').value;
    //TODO: add pure text to diagram unit.
    //Handle_text split lines.
    //will return an array contain [abc, cde,  efg,]
    s = Handle_text.lineSeperator(s);
    s.reverse();
    //Calculate level between each item.
    //seperate by count space symbol
    //will generate[node1,node2,node3,node4];
    //node Structure:
    //Level:parentNode / id : applyID / Sub-order : order in level;

    s = t_NodeGenerator(s);
    console.log(s);
    
    s.locationUpdate(10, 15);
    s.draw();



}
document.getElementById('sss').value = 'level0\n-L1\n-L1\n--L2\n--L2_1\n\---L3';
