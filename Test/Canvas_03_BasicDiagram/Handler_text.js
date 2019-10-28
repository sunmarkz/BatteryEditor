
const _tabText = '-'; // this is tab letter in textarea;
const _startLocation = { x: 50, y: 50 };
const _lineHeight = singleLetterHeight;
const _lineWidth = 20;
const _gapping = 20;


function t_Node(splitedString, lastNode = null) {
    //count how many tab have define which level is.
    this.level = Handle_text.FrontKeywordsCount(splitedString, _tabText);

    // this.content = Handle_text.FrontKeywordsFilter(splitedString, _tabText);
    this.content = splitedString;
    // TODO : render text fulfill multiply line text
    // this.renderText = Handle_text.RenderTextInGraphic;

    // these attributes need to initial in link ();
    this.width = d.measureText(splitedString).width;
    this.height = _lineHeight;
    this.child = [];
    this.childHeight = 0;
}

function t_NodeGenerator(list) {
    var s = list.reverse();
    var _levelList = [];
    for (let i = 0; i < s.length; i++) {
        var _item = s[i];
        var _node = new t_Node(_item);

        _node.child = _levelList[_node.level+1] || null;

        // childrens height;
        if(_node.child ==null){
            _node.childHeight = this.height;
        }else{
            _node.child.forEach(i=>{
                _node.childHeight+= i.childHeight;
            })
        }

        _levelList[_node.level+1] = [];
        _levelList[_node.level].shift(_node);



        
        
    }
}



t_Node.prototype.draw = function () {
    CanvDraw.rect(this.x, this.y - this.height, this.width, this.height);
    CanvStyle.Node();
    CanvStyle.Text();
    
    CanvDraw.t(this.content, this.x, this.y, this.width);

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

        if (_text.indexOf(keyword) != 0) { return 0 }
        while (_text.indexOf(keyword) == 0) {
            _count++;
            _text = _text.slice(1);
        }
        return _count;
    },

    FrontKeywordsFilter: function (sourceText, keyword) {
        var _text = sourceText;
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

    s = Handle_text.levelGenerator(s);
    // Board.clear()
    s.forEach(i => {
        if (i != null) {
            i.draw();
        }

    });


}



/*
[1,-2,-3,--3]
reverse 
|
[--1,-2,-3,4,--5,-6,7]
|
read this:
--1:  this.child=level3[].reverse, this.height = ...this.childrens.height , level3=[], level2 shift(this);  
level 2 : [--1[]]
-2 : this.child= level2[--1].reverse, this.height = this.childrens.height, level2=[], level1 shift(this);
level1 : [-2[--1]]
-3 : this.child = [], this.height =0||1-line, level2 = [], level1 shift(this);
level 1 :[-3[],-2[--3]]
4 : this.child=level1[-3,-2[--3]].reverse, this.height= this.childrensHeight, level1=[], level0 shift(this);
level0: [4[-3,-2[--3]]]

[out stack]: --3.index = level2.length-i.index, -3 level2[] clear;






*/