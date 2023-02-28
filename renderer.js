
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
        this.filePath = logFilePath
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
        this.node.addEventListener("click",()=>{
            talkRoomView.set(this)
            talkRoomView.updateView()
        })
    }

    toLine(){

    }
}

class Bubble{
    static canBuild(lineString){

    }

    static fromLine(line){

    }

    constructor(color,text){
        this.node = this.buildNode()
        this.node.innerText = text
        this.node.style.backgroundColor = color
    }

    toLine(){

    }

    buildNode(){
        let node = document.createElement("div")// 要
        return node
    }

}

const loadBubbles = async function(config){
    let dataText = await window.loadFile(config.filePath)
    let bubbles = []
    dataText.split("\n").forEach(line => {
        if(Bubble.canBuild(line)){
            bubbles.push(Bubble.fromLine(line))
        }
    })

    return bubbles
}
const saveBubbles = async function(config,bubbles){
    let dataText = ""
    bubbles.forEach(bubble => {
        dataText += bubble.toLine() + "\n"
    })

    await window.writeFile(dataText,config.filePath)
}


// 表示する
// 表示されている対話を揮発のデータで保持している
class TalkRoomView{ // <- talkRoomBubblesの方がいい?
    constructor(){
        this.bubbles = []
        this.config = null
    }

    init(){
        this.title = document.getElementById("")
        this.node = document.getElementById("")
    }

    setNoTitled(){
        this.title.innerText = "No Titled"
        this.bubbles = []
    }

    pushBubble(bubble){
        this.bubbles.push(bubble)

        if(this.talkroom == null) return;
        saveBubbles(this.config)
    }

    async namingTitle(title){
        // 未保存のthis.bubblesを渡すことがこの操作におけるこのクラスの仕事

        // この操作はこの階層ではないきがする
        // リファクタリングの時に直す


        if(this.talkroom != null){
            // この操作をすることはできない
            throw Error("できない! 説明はソースをみろ")
        }
        let filePath = await window.myAPI.createFile()
        let config = new TalkRoomConfig(title,filePath)
        
        let talkroom = new TalkRoom(config)
        talkroom.saveBubbles(this.bubbles)
        return config
    }

    set(config){
        this.config = config
        this.bubbles = loadBubbles(config)
        this.title.innerText = config.title
    }
    
    updateView(){
        this.node.innerHTML = ""
        this.bubbles.forEach(bubble => {
            this.node.appendChild(bubble.node)
        })
    }

    // 何も表示されない場合はnotitledがある <- タイトルを後からつけることもできる
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
    talkRoomView.updateView()
    let loadedConfigs = TalkRoomConfig.fromFileToConfigs(
        await window.myAPI.loadFile(Config.TalkRoomConfigsFilePath)
    )
    talkRoomConfigs.push(...loadedConfigs)
    setTalkRooms()

}

class Elms{
    init(){
        this.talkRoomList = document.getElementById("talk-room-list")
        this.speechInputBox = document.getElementById("speech-input-box")

    }
}



// ユーザーからの操作のハンドラ

// トーク(configを持っていない)にconfigを与えて保存する
// その操作をユーザーから受け取った時に最初に呼ばれる
const handleNamingTitle = function(){

}


const handleCraeteBubble = function(color,text){
    let bubble = new Bubble(color,text)
    talkRoomView.pushBubble(bubble)
    talkRoomView.updateView()
}

const handleCreateTalkRoom = function(){

}


const handleOpenTalkRoom = function(talkRoomConfig){
    window.open("./talkroom/index.html")
    // 新しいウィンドウを開く
    // 最後からN個分の吹き出しを読み込む
    
}


const elms = new Elms()
const talkRoomConfigs = [];
const talkRoomView = new TalkRoomView()

window.addEventListener("load",init)