function getElementLeft(i){
    return {
        x: this.x,
        y: this.y + (this.height / 2)
    };
}
function getElementRight(i){
    return{
        x: this.x + this.width,
            y: this.y + (this.height / 2)
    }
}