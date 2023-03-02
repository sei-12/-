
class Modifier{
    static Ctrl  = "Control"
    static Shift = "Shift"
    static Alt   = "Alt"
    static Cmd   = "Meta"
}

class Modifiers{
    static equal(A,B){
        if(A.Alt != B.Alt){
            return false
        }
        if(A.Cmd != B.Cmd){
            return false
        }
        if(A.Ctrl != B.Ctrl){
            return false
        }
        if(A.Shift != B.Shift){
            return false
        }
        return true
    }

    static fromKeyStrings(keyStrings){
        let alt = false
        let cmd = false
        let ctrl = false
        let shift = false

        if(keyStrings.includes(Modifier.Alt)){
            alt = true
        }
        if(keyStrings.includes(Modifier.Cmd)){
            cmd = true
        }
        if(keyStrings.includes(Modifier.Ctrl)){
            ctrl = true
        }
        if(keyStrings.includes(Modifier.Shift)){
            shift = true
        }
        return new Modifiers(alt,ctrl,cmd,shift)
    }

    constructor(alt,ctrl,cmd,shift){
        this.Alt = alt
        this.Ctrl = ctrl
        this.Cmd = cmd
        this.Shift = shift
    }

    allKeyUP(){
        this.Alt = false
        this.Cmd = false
        this.Ctrl = false
        this.Shift = false
    }

    change(eDotKey,bool){
        if(eDotKey == Modifier.Alt){
            this.Alt = bool
        }
        else if(eDotKey == Modifier.Cmd){
            this.Cmd = bool
        }
        else if(eDotKey == Modifier.Ctrl){
            this.Ctrl = bool
        }
        else if(eDotKey == Modifier.Shift){
            this.Shift = bool
        }
    }
}


const Hotkey = function(node,modifiers,char,func){

    const handleNodeKeydown = (e) => {
        if(Modifiers.equal(this.modifiers,this.isDown) == false){
            return
        }

        if(e.key == this.char){
            this.func()
        }
    }

    const setChar = (char) => {
        if(this.modifiers.Shift){
            char = char.toLowerCase()
        }
        return char
    }

    const handleModikey = (e) => {
        this.isDown.change(e.key,e.type == "keydown")
    }

    this.start = function(){
        this.node.addEventListener("keydown",handleNodeKeydown)
        document.addEventListener("keydown",handleModikey)
        document.addEventListener("keyup",handleModikey)
    }

    this.stop = function(){
        this.node.removeEventListener("keydown",handleNodeKeydown)
        document.removeEventListener("keydown",handleModikey)
        document.removeEventListener("keyup",handleModikey)
        this.isDown.allKeyUP()
    }

    this.node = node
    this.modifiers = Modifiers.fromKeyStrings(modifiers)
    this.char = setChar(char)
    this.func = func

    this.isDown = new Modifiers(false,false,false,false)
}

