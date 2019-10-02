function Layer (){
    this.element = [];
    this.link = [];
    this.elementSelection = [];
    
}

Layer_ = Layer.prototype;
Layer_.push = function(s) {
    if (s instanceof element && !(s in this.element)){
        this.element.push(s);
       return ;
   }
    if (s instanceof Link && !(s in this.link)){
       this.link.push(s);
       return;
   }
}
Layer_.del  = function (s){
    if (s instanceof element){
        remove(s, this.element);
        return;
    }
    if (s instanceof Link){
        remove(s,this.link);
        return;
    }
}
