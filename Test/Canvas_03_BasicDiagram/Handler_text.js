
const _tabText = ' '; // this is tab letter in textarea;

function t_Node(s) {
    //count how many tab have define which level is.
    this.level = Handle_text.count(_tabText);
    this.content = s.slice(_tabText.length*this.level);
    this.parentIndex;
    this.index;
    this.x;
    this.y;
    this.width;
    this.height;
}

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


    levelGenerator: function (input) {


        // raw text will transfer to lineSeperator:
        var _lineSepertedText = input instanceof Array == true ? input : this.lineSeperator(input);

        //initialize container
        var _levels = [];// will contain each level


        //read items in line Seperated Text;
        for (let i = 0; i < _lineSepertedText.length; i++) {

            var _tNode = new t_Node(_lineSepertedText[i])
            
            //initial level array in _levels
            if (!_levels[_tNode.level]) _levels[_tNode.level] = [];

            //initial other tnode attrs
            _tNode.index = _levels[_tNode.level].length; // index start from 0;
            _tNode.parentIndex = _levels[_tNode.level-1].length; //last level's last index
            _levels[_tNode.level].push(_tNode); //push to level array.

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


