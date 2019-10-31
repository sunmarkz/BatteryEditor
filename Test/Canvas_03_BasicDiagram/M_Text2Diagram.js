
function Text2Diagram() {
    _ResourceManager.clear();
    var s = inputTextarea.value;

    s = Handle_text.lineSeperator(s);
    s.reverse();
    s = t_NodeGenerator(s);
    s.locationUpdate(10, 15);
    s.draw();
    Board.redraw();


}

const _startLocation = { x: 50, y: 50 };
const _lineHeight = _singleLetterHeight;
const _lineWidth = 20;
const _gapping = 20;
const _xgapping = 100 ; 
const _ygapping = 50;


function t_Node(splitedString) {

    if (splitedString != false) {
        this.level =(( Handle_text.FrontKeywordsCount(splitedString, _tabText) )+ 1);
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
    this.groupX = Xstart ;
    this.groupY = Ystart;
    this.x = this.groupX;
    this.y = this.groupY + (this.childHeight / 2)  ;
    
    if (!this.child) {
        return;
    }

    var _yAddtion = 0;
    for (let i = 0; i < this.child.length; i++) {
        let _item = this.child[i];
        _item.locationUpdate(this.groupX + this.width +_xgapping, this.groupY + _yAddtion);
        _item.groupY = this.groupY + _yAddtion;
        _yAddtion += _item.childHeight;
    }

}

function t_NodeGenerator(list) {

    var s = list;
    var _levelList = [];

    for (let i = 0; i < s.length; i++) {
        var _item = s[i];
        var _node = new t_Node(_item);

        _levelList[_node.level + 1] && (_node.child = _levelList[_node.level + 1]);

        // childrens height;
        if (_node.child == false) {
            _node.childHeight = _node.height+_ygapping ;
            _node.childWidth = _node.width+_xgapping ;
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

    _levelList = _levelList.filter(function(x){
        return x });
            

    var _startNode = new t_Node(null);
    _startNode.level = 0;
    _startNode.x = 10;
    _startNode.y = 50;
    _startNode.child = _levelList[0];

    return (_startNode);

}

t_Node.prototype.draw = function () {
    if (this.content != null) {
        this.battery = new eBattery(this.x, this.y , this.width +_margin*2, this.height + _margin*2,this.content)

        _ResourceManager.push(this.battery);
    }
    if (this.child == false) { return; }
    for (let i = 0; i < this.child.length; i++) {
        this.child[i].draw();
        
        this.battery && doEvent.create(new eLink(this.battery.node.right,
            this.child[i].battery.node.left));
    }

}