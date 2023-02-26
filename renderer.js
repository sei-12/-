
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
        this.title = title
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


class Bubble{
    constructor(color,text){
        this.node = this.buildNode()
        this.node.innerText = text
        this.node.style.backgroundColor = color
    }

    buildNode(){
        let node = document.createElement("div")// 要
        return node
    }
}


// 保存する
// 読み込む

class TalkRoom{
    constructor(config){
        
    }

    loadBubbles(){
        
    }

    saveBubbles(bubbles){

    }
}

// 表示する
// 表示されている対話を揮発のデータで保持している
class TalkRoomView{
    constructor(){
        this.talkroom = null // <- TalkRoom のインスタンス
        this.bubbles = []
    }

    init(){
        this.title = document.getElementById("")
        this.node = document.getElementById("")

        this.setNoTitled()
    }

    setNoTitled(){
        this.title.innerText = "No Titled"
    }

    pushBubble(bubble){
        this.bubbles.push(bubble)
        this.talkroom.saveBubbles(this.bubbles)
    }

    set(config){
        this.talkroom = new TalkRoom(config)
        this.bubbles = this.talkroom.loadBubbles()
        this.title.innerText = config.title
        this.updateView()
    }
    
    updateView(){
        this.node.innerHTML = ""
        this.bubbles.forEach(bubble => {
            this.node.appendChild(bubble.node)
        })
    }

    // 何も表示されない場合はnotitledがある <- タイトルを後からつけることもできる
}

const craeteBubble = function(color,text){
    let bubble = new Bubble(color,text)
    talkRoomView.pushBubble(bubble)
    talkRoomView.updateView()
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
    talkRoomView.init()
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
const talkRoomView = new TalkRoomView()

window.addEventListener("load",init)