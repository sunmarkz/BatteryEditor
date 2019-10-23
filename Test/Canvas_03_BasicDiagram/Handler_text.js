
const _tabText = ' '; // this is tab letter in textarea;
const _startLocation = { x: 20, y: 50 };
const _lineHeight = 10;
const _lineWidth = 20;
const _gapping = 20;

function t_Node(splitedString, lastNode = null) {
    //count how many tab have define which level is.
    this.level = Handle_text.FrontKeywordsCount(splitedString, _tabText);
    this.content = Handle_text.FrontKeywordsFilter(splitedString, _tabText);
    this.lastNode = lastNode;

    this.width;
    this.height = 20 + _gapping;

    if (lastNode == null) {
        //first item initialize

        //this.level = 0;
        this.indexofLevel = 0;
        this.lastLevelLastItem = null;
        this.indexofAll = 0;
        this.x = _startLocation.x;
        this.y = _startLocation.y;
    } else {
        
        if (lastNode.level == this.level) {
            // on same level 
            this.indexofLevel = lastNode.indexofLevel + 1;
            this.lastLevelLastItem = lastNode.lastLevelLastItem;
            this.indexofAll = lastNode.indexofAll + 1;
            this.groupHeight = lastNode.groupHeight + this.height;

            lastNode.groupHeight = this.groupHeight;
            lastNode.lastLevelLastItem.groupHeight += this.height; // last level item height ++;

            if (this.width > lastNode.groupWidth) {
                // get biggest width in group
                this.groupWidth = this.width;
                lastNode.groupWidth = this.width;
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
                }

                 

                this.x = lastNode.lastLevelLastItem.x;//this level's last node;
                this.y = lastNode.lastLevelLastItem.y + lastNode.lastLevelLastItem.height;
                

            } else {
                // next level
                this.indexofLevel = 0;
                this.lastLevelLastItem = lastNode;
                this.indexofAll = lastNode.indexofAll+1;
                this.groupWidth = this.width;
                this.groupHeight = this.height;
                this.x = lastNode.x+lastNode.groupWidth;
                this.y = 

            }

        }



    }

    this.indexofLevel;
    this.lastLevelLastItem;
    this.indexofAll;
    this.width;
    this.height;
    this.groupWidth;
    this.groupHeight;
    this.x;
    this.y;
}
Object.defineProperties(t_Node.prototype, {


})
function t_NodeInitialize()



var Handle_text = {
    lineSeperator: function (input) {
        // input is get from textarea, handle new line event
        // return a array of strings, contain lines
        if (input == null) {
            return null;
        }

        if (input instanceof String != true) throw ('lineSeperator handler error : ', input);

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
        var _levels = [];// will contain each level
        var outputNodes = [];


        //read items in line Seperated Text;
        for (let i = 0; i < _lineSepertedText.length; i++) {

            var _tNode = new t_Node(_lineSepertedText[i])
            _tNode.LastLevelLastItem;

        }


        //initialize Node;

    }


}




function Text2Diagram(s) {
    //TODO: add pure text to diagram unit.
    //Handle_text split lines.
    //will return an array contain [abc, cde,  efg,]
    var s = Handle_text.lineSeperator(s);

    //Calculate level between each item.
    //seperate by count space symbol
    //will generate[node1,node2,node3,node4];
    //node Structure:
    //Level:parentNode / id : applyID / Sub-order : order in level;
    s = Handle_text.levelGenerator(s);

    // Handle location by level 

    // Generate Link

    //Convert to diagram format

    //Load_()


}


