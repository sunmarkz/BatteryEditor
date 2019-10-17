/**
 * this function is history function include pop operation and redo operation;
*/
function history() {
    // initial history instance, Actually here is a singleton function just dont know how to fulfill yet.
    let operation_ = [];
    let recordStep_ = 50;

};

/**
 * Push to history what did for operation
 * @param {Array} OperatedElement - operated elements
 * @param {String} act - type of operation
 * @param {Array} recordInfo - move : elements:[{x:x,y:y}...] | remove : null | linkTo : null
 * @ return
 */

history.prototype.record = function (operatedElement, act = 'move' | 'remove' | 'linkTo', recordInfo=null) {


    // if operation_ full shift first one;
    this.operation_.length >= this.recordStep_ && this.operation_.shift();
    this.operation_.push({ element: operatedElement, action: act ,recordInfo});
}


history.redo = function () {
    if (this.operation_.length == 0) {
        return;
    }

    let redoOperation_ = this.operation_.pop();
    switch (redoOperation_.action) {
        case 'move':
            for (let i = 0; i < redoOperation_.element.length; i++) {
                let element_ = redoOperation_.element[i];
                let record_ = redoOperation_.recordInfo[i];
                element_.x = record_.x;
                element_.y = record_.y; 
            }
            break;
        case 'remove':
            element
            break;
        case 'linkTo':

            break;

        default:
            break;
    }


}

