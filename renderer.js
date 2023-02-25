
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
