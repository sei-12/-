
class TalkRoomConfig{

    static equal(A,B){

    }

    static fromFileToConfigs(fileText){
        let configs = []
        let lines = fileText.split("\n")
        lines.forEach(line =>{
            if(TalkRoomConfig.canBuildLine(line)){
                configs.push(TalkRoomConfig.fromLine(line))
            }
        })

        return configs
    }

    static fromLine(line){
        let s_line = line.split(",")
        return new TalkRoomConfig(s_line[0],s_line[1])
    }

    static canBuildLine(line){
        if(line.includes(",") == false){
            return false
        }

        return true
    }
    
    constructor(title,logFilePath){
        this.node = this.buildNode(title)
        this.setEventListener()
    }

    buildNode(title){
        let node = document.createElement("input")
        node.type = "button"
        node.value = title
        node.classList.add("talk-room-btn")
        return node
    }

    setEventListener(){
        this.node.addEventListener("click",()=>{openTalkRoom(this)})
    }

    toLine(){

    }
}

// ユーザーからの操作
const createTalkRoom = function(){

}

const openTalkRoom = function(talkRoomConfig){
    window.open("./talkroom/index.html")
    // 新しいウィンドウを開く
    // 最後からN個分の吹き出しを読み込む
    
}


class LocalFile{
    constructor(path){
        this.path = path
    }

    async read(){
        return await window.myAPI.loadFile(this.path)
    }

    async writeSync(text){
        await window.myAPI.writeFile(text,this.path)
    }

    write(){
        window.myAPI.writeFile(text,this.path)
    }
}


const setTalkRooms = function(){
    elms.talkRoomList.innerHTML = ""
    talkRoomConfigs.forEach(lm => {
        elms.talkRoomList.appendChild(lm.node)
    })
}


const init = async function(){
    elms.init()
    let loadedConfigs = TalkRoomConfig.fromFileToConfigs(await talkRoomConfigFile.read())
    talkRoomConfigs.push(...loadedConfigs)
    setTalkRooms()

}

class Elms{
    init(){
        this.talkRoomList = document.getElementById("talk-room-list")
    }
}

const elms = new Elms()
const talkRoomConfigFile = new LocalFile(Config.TalkRoomConfigsFilePath)
const talkRoomConfigs = [];


window.addEventListener("load",init)