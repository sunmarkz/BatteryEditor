
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
    this.indexOfLevel = 0;
    this.parentNode = null;
    this.lastNode = lastNode;
    this.nextNode = null;
    this.previousNode = null;
    this.firstInLevel = !this.lastNode ? this : null;
    this.childrenNode = [];


    this.width = d.measureText(splitedString).width;
    this.height = _lineHeight;

    this.lastNode && lastNode.link(this);
}
Object.defineProperties(t_Node.prototype, {
    groupHeight: {

        get: function () {
            //first level case : 
            var result = this.height; // if no next one is this.height;
            var nextnode = this.nextNode; // nextnode point to next one;
            while (nextnode) {

                result += nextnode.childrenHeight; // trace every child node;
                nextnode = nextnode.nextNode; // nextnode point to next next one;
            }
            return result;
        }

    },
    groupWith: {
        get: function () {
            //return present group width;
            var _nextnode = this.nextNode;
            var result = this.width;
            while (!_nextnode) {
                result = _nextnode.width > resut ? _nextnode.width : result;
                //if nextnode.width > this one  result change to nextnode.width;
                _nextnode = _nextnode.nextNode;
                // nextnode point to its next node;
            }
            return result;
        },
   
    },
    x: {
        get: function () {
            if (this.parentNode == null) {
                // first one initial 
                return _startLocation.x;
            }
            if (this.indexOfLevel == 0) {
                return (this.parentNode.x + this.parentNode.width);
            }

            return this.previousNode.x;
        }
    },
    groupLength: {
        get: function () {
            if (this.parentNode) {
                return this.parentNode.childrenNode.length;
            }
            var result = 0;
            var _node = this.firstInLevel;
            while (_node) {
                // EXTENTION: this can be minimal height of present, check is it clashed;
                result += _node.childrenHeight; // add _node's childheight;
                _node = _node.nextNode; // node link to next one;
            }
        }
    },
    childLength: {
        get: function () {
            return (this.childrenNode.length || 0);
        }
    },
    y: {
        get: function () {
            if (this.lastNode == null) {
                //first one initial 
                return (_startLocation.y + this.height+ (this.childrenHeight/2));
            }

            if (!this.parentNode) {
                // first level
                
                return (this.previousNode.y + (this.childrenHeight / 2) + (this.height / 2));
            }
            if (!this.previousNode) {
                //if this is first one in this group;
                return (this.parentNode.y - (this.groupHeight / 2) + this.height / 2);
            }
            return (this.previousNode.y + this.height + (this.childrenHeight / 2))
            // return previous one's y  + height + offset from its child;
        }
    },
    childrenHeight: {
        get: function () {
            if (!this.childrenNode) {
                return this.height;
            }
            var _result = 0;
            this.childrenNode.forEach(i=>{
                _result = _result+ i.childrenHeight;
            });
            console.log(_result);
            
            return _result;
        },

    }
})



t_Node.prototype.link = function (tnode) {
    if (tnode == null) {

        return;
    }
    if (tnode.level == this.level) {
        // on same level node 
        // append tnode before this
        tnode.previousNode = this;
        tnode.parentNode = this.parentNode || null;
        this.parentNode && this.parentNode.childrenNode.push(tnode); // this.parentNode push tnode!
        this.nextNode = tnode; // this nextNode link to tnode;
        tnode.firstInLevel = this.firstInLevel; // make tnode's first in group same as this
        tnode.indexOfLevel = this.indexOfLevel + 1; // make index ++
        return;
    }
    if (tnode.level < this.level) {
        //tnode is this 's parent;
        // Attention! it means new level! 
        // need to handle jumped append case;

        if (tnode.level == this.level - 1) {
            //deal prevous level node case;
            this.parentNode.nextNode = tnode;

            tnode.firstInLevel = tnode;
            tnode.previousNode = this.parentNode;
            return;
        }

        //deal jumped previous level node;
        var _tnodeBeforeNode = this.lastItemInLevel(tnode.level);
        if (!_tnodeBeforeNode) { return; }
        // here might be inifinite
        _tnodeBeforeNode.link(tnode); // same level's last item handle tnode;
        tnode.firstInLevel = _tnodeBeforeNode.firstInLevel; // link first node in present group

        return;
    }
    if (tnode.level > this.level) {
        // append child
        if (tnode.level = this.level + 1) {
            // deal with next level case, meas tnode is this's child
            tnode.parentNode = this; // tnode's parent is this.
            this.childrenNode.push(tnode); // push tnode to child list;
            return;

        } else {
            tnode.level = this.level + 1;
            // if appended node jumped level, fix to this's child node;
            this.link(tnode); // redo link (fixed node) ;
            return;
        }
    }
},
    t_Node.prototype.lastItemInLevel = function (level) {

        if (this.level > level) {
            var _parentnode = this.parentNode || null;

            while (!_parentnode) {
                if (_parentnode.level == level) {
                    // if find it return parent node 
                    //find last one in this level;

                    // while(!_parentnode.nextNode){
                    //     _parentnode = _parentnode.nextNode;
                    // }
                    break;
                }
                //if not make parentnode point to its parentnode; 
                _parentnode = _parentnode.parentNode;
            }

            return _parentnode;
        } else {
            throw ('can only find previous level last item', this.level, level);
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



