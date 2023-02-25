
class TalkLoomConfig{
    static fromLine(){

    }
    
    constructor(title,logFilePath){

    }

    toLine(){

    }
}

const createTalkLoom = function(){

}

const openTalkLoom = function(talkLoomConfig){
    if(talkLoomConfig instanceof TalkLoomConfig == false){
        throw Error("talkLoomConfig instanceof TalkLoomConfig == false")
    }

    
}

const speechBubble = {
    toNode : function(fileLine){

    },
    toString: function(node){
        
    },
    canBuildNode(fileLine){
        
    },
    canBuildString(node){

    },
}

class LocalFile{
    constructor(path){
        this.path = path
    }

    async read(){
        
    }

    async writeSync(){
        
    }

    write(){

    }
}


const setTalkLooms = function(){
    elms.talkLoomList.innerHTML = ""
    talkLoomConfigs.forEach(lm => {
        elms.talkLoomList.appendChild(lm.node)
    })
}
const init = async function(){
    elms.init()

class Elms{
    init(){
        this.talkLoomList = document.getElementById("talk-loom-list")
    }
}

const elms = new Elms()

window.addEventListener("load",init)