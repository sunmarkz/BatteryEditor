/**
 * this function is history function include pop operation and redo operation;
*/
function history() {
    // initial history instance, Actually here is a singleton function just dont know how to fulfill yet.
    let operation_ = [];
    let recordStep_ = 50;

};
/**
 * @param {Object || Array} OperatedElement - operated element / elements
 * @param {String} act - type of operation
 * @param {*} action - move : {x:x,y:y} | remove : none | linkTo : node 
 */
history.prototype.push = function (operatedElement, act = 'move' | 'remove' | 'linkTo',action) {

    // if operation_ full shift first one;
    this.operation_.length >= this.recordStep_ && this.operation_.shift();
    this.operation_.push({element:operatedElement, action : act});


}
history.prototytpe.redo= function (){
    if(this.operation_.length == 0){
        return;
    }else{
        let redoOperation_ = this.operation_.pop();
        switch (action) {
            case 'move':
                if (redoOperation_ instanceof Array){
                    redoOperation_.forEach(i => {
                        i.x
                    });
                }
                    break;
            case 'remove':

                break;
            case 'linkTo':

                break;

            default:
                break;
        }
    }
    
}