
class TalkLoomConfig{
    static fromLine(){

    }
    
    constructor(title,logFilePath){

    }

    toLine(){

    }
}

const openTalkLoom = function(talkLoomConfig){
    if(talkLoomConfig instanceof TalkLoomConfig == false){
        throw Error("talkLoomConfig instanceof TalkLoomConfig == false")
    }

    
}
