function Link(from,to){
    from instanceof LinkBundle && (this.from = from);
    from instanceof Node && (this.from = from.bundle);
    to instanceof LinkBundle && (this.to = to); 
    to instanceof Node && (this.to = to.bundle);
    this.type = 'pl'
}

Link.prototype.get={
    from: this.from,
    fromPosition : this.from.get.position(),
    fromType : this.from.get.type(),
    toPosition : this.to.get.position(),
    to : this.to
}


Link.prototype.reverse = function(){
    var temp = this.from;
    this.from = this.to;
    this.to = temp;
    
}
Link.prototype.Mid = function(){
    return (point((this.from.position.x+this.to.position.x)/2,(this.from.position.y+this.to.position.y)/2));
}
Link.prototype.GetElement= function(){
    return this.from.Appended;
}



function LinkBundle (parentNode){
    this.linkTo=[];
    this.linked = [];
    this.parentNode=parentNode;
    this.parentElement=parentNode.parentElement;
}

LinkBundle.prototype.get = {
    position : this.parentElement.get.position(),
    parentElement : this.parentElement(),
    type:  this.parentNode.get.type(),
    node :  this.parentNode,
    list :  this.linkTo,
    linked : this.linked
}
LinkBundle.prototype.push=function(link){
    var input = link;
    input instanceof Node && (input = input.bundle);
    // if input is Node transfer to its bundle
    if(!this.isInList(input)){
        this.linkTo.push(input);
        input.linked.push(this);
    }
}

LinkBundle.prototype.isInList = function(link){
    var link = link
    var result =!1 ;
    this.linkTo.forEach(i => {
        link == i && (result=!0);
    });
    return result;
}