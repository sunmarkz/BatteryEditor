
const _tabText = ' '; // this is tab letter in textarea;
const _startLocation = { x: 50, y: 50 };
const _lineHeight = 10;
const _lineWidth = 20;
const _gapping = 20;


function t_Node(splitedString, lastNode = null) {
    //count how many tab have define which level is.
    this.level = Handle_text.FrontKeywordsCount(splitedString, _tabText);
    // this.content = Handle_text.FrontKeywordsFilter(splitedString, _tabText);
    this.content = splitedString;

    
    // TODO : render text fulfill multiply line text
    // this.renderText = Handle_text.RenderTextInGraphic;

    this.lastNode = lastNode;
    // CanvStyle.Text();

    this.width = d.measureText(splitedString).width;
    this.height = singleLetterHeight;

    if (lastNode == null) {
        //first item initialize

        //this.level = 0;
        this.indexofLevel = 0;
        this.lastLevelLastItem = null;
        this.indexofAll = 0;
        this.x = _startLocation.x;
        this.y = _startLocation.y;
        this.groupHeight = 0;
        this.groupWidth = 0;

    } else {
        
        if (lastNode.level == this.level) {
            // on same level 
            this.indexofLevel = lastNode.indexofLevel + 1;
            this.lastLevelLastItem = lastNode.lastLevelLastItem;
            this.indexofAll = lastNode.indexofAll + 1;
            this.groupHeight = lastNode.groupHeight + this.height;

            lastNode.groupHeight = this.groupHeight;
            // last level item height ++;

            if(lastNode.lastLevelLastItem!=null){
                lastNode.lastLevelLastItem.groupHeight = this.height + lastNode.lastLevelLastItem.groupHeight ; }


            if (this.width > lastNode.groupWidth) {
                // get biggest width in group
                this.groupWidth = this.width;
                lastNode.groupWidth = this.width;
            }else{
                this.groupWidth = lastNode.groupWidth;
            }


            this.x = lastNode.x;
            this.y = lastNode.y + lastNode.height;
        } else {
            //level change !
            if (this.level < lastNode.level) {
                //upper level
                this.indexofLevel = 0;// first item in level
                this.lastLevelLastItem = lastNode.lastLevelLastItem.lastLevelLastItem;
                this.indexofAll = lastNode.indexofAll+1;
                this.groupHeight = lastNode.groupHeight + this.height;
                lastNode.groupHeight = this.groupHeight;

                if (this.width > lastNode.groupWidth) {
                    // get biggest width in group
                    this.groupWidth = this.width;
                    lastNode.groupWidth = this.width;
                }else{
                    this.groupWidth = lastNode.groupWidth;     
                }

                 

                this.x = lastNode.lastLevelLastItem.x;//this level's last node;
                this.y = lastNode.lastLevelLastItem.y + lastNode.lastLevelLastItem.height;
                

            } else{
                // next level
                this.indexofLevel = 0;
                this.lastLevelLastItem = lastNode;
                this.indexofAll = lastNode.indexofAll+1;
                this.groupWidth = this.width;
                this.groupHeight = this.height;
                this.x = lastNode.x+lastNode.groupWidth;
                this.y = lastNode.y+ (this.groupHeight/2);

            }
        }
    }
    this.graphic = new Graphic('rect',this.x,this.y,this.width,this.height);
}
t_Node.prototype.draw = function(){
    CanvStyle.Text();
    
    CanvDraw.t(this.content,this.x,this.y,this.width);
    this.graphic.draw();


}

Object.defineProperties(t_Node.prototype, {


})




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
        for (let i = 0; i < _text.length; i++) {
            if (_text.indexOf(keyword == 0)) {
                _count++;
                _text = _text.slice(keyword.length - 1);
            } else {
                break;
            }
        }
        return _count;
    },

    FrontKeywordsFilter: function (sourceText, keyword) {
        var _text = sourceText;
        for (let i = 0; i < _text.length; i++) {
            if (_text.indexOf(keyword == 0)) {
                _text = _text.slice(keyword.length - 1);
            } else {
                break;
            }
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

            outputNodes.push(new t_Node(_lineSepertedText[i],outputNodes[outputNodes.length-1]));

        }

        return outputNodes;
        //initialize Node;

    },

    TextInGraphic: function (textContent,graphic){
        if (graphic.type != "rect"){
            throw('Not support this graphic type :',graphic.type);
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
    RenderTextInGraphic:function(HandledText){

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
    s.forEach(i => {
        if(i!=null){
            i.draw();
        }
        
    });  


}



