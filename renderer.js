
class TalkLoomConfig{
    static fromFileToConfigs(fileText){

    }

    static fromLine(){


    }
    
    constructor(title,logFilePath){

    }

    buildNode(){

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
    
    console.log("open talk loom")

    
}

class speechBubble{

    constructor(){
        this.node = this.#buildNode()
    }

    #buildNode(){

    }

    toString(node){
        
    }

    canBuildNode(fileLine){
        
    }

    canBuildString(node){

    }
}

class LocalFile{
    constructor(path){
        this.path = path
    }

    async read(){
        return await window.myAPI.loadDataFile(this.path)
    }

    async writeSync(text){
        await window.myAPI.writeFile(text,this.path)
    }

    write(){
        window.myAPI.writeFile(text,this.path)
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
    let loadedConfigs = TalkLoomConfig.fromFileToConfigs(await loomConfigsFile.read())
    talkLoomConfigs.push(...loadedConfigs)
    setTalkLooms()

}

class Elms{
    init(){
        this.talkLoomList = document.getElementById("talk-loom-list")
    }
}

const elms = new Elms()
const loomConfigsFile = new LocalFile(Config.TalkLoomConfigsFilePath)
const talkLoomConfigs = [];


window.addEventListener("load",init)