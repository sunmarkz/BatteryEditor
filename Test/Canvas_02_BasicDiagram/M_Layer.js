function Layer (){
    this.element = new Set();
    this.link = new Set();
    this.elementSelection = new Set();
    
}

Layer_ = Layer.prototype;
Layer_.push = function(s) {

    if (s instanceof element ){
        this.element.add(s);
       return ;
   }
    if (s instanceof Link ){
       this.link.add(s);
       return;
   }
}
Layer_.del  = function (s){
    if (s instanceof element){
       this.element.delete(s);
       this.elementSelection.delete(s);
       
       return;
    }
    if (s instanceof Link){
        this.link.delete(s);
        return;
    }
}
