/* eslint-env browser */

class InputBar{
    constructor(){
        this.bar = document.querySelector(".word-input");
    }
    
    getInput(){
        return this.bar.value;
    }

    disableInputBar(){
        this.bar.disabled = true;
    }

    enableInputBar(){
        this.bar.disabled = false;
    }
    
}

export default InputBar;