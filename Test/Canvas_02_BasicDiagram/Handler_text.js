
Handler_text = function (input){
    // input is get from textarea, handle new line event
    // return a array of strings, contain lines
    if (input ==  null){
        return null;
    }else{
        var text = new String(input);
        text = text.split('\n');
        return text;
    }

}
