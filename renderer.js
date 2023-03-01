
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
        this.node.addEventListener("click",async ()=>{
            talkRoomView.config = this
            await talkRoomView.loadBubbles()
            talkRoomView.title.innerText = this.title
            talkRoomView.updateView()
        })
    }

    toLine(){

    }
}

class Bubble{
    static canBuild(lineString){
        let s_line = lineString.split(",")
        if(s_line.length != 2){
            return false
        }
        if(s_line.includes("")){
            return false
        }
        return true
    }

    static fromLine(line){
        return new Bubble(...line.split(","))
    }

    constructor(text,color){
        this.node = this.buildNode()
        this.node.innerText = text
        this.node.style.backgroundColor = color
        this.text = text
        this.color = color
    }

    toLine(){
        return this.text + "," + this.color
    }

    buildNode(){
        let node = document.createElement("div")// 要
        node.classList.add("bubble")
        return node
    }

}

const loadBubbles = async function(config){
    let dataText = await window.myAPI.loadFile(config.filePath)
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
    await window.myAPI.writeFile({text:dataText,path:config.filePath})
    return dataText
}


// 表示する
// 表示されている対話を揮発のデータで保持している
class TalkRoomView{ // <- talkRoomBubblesの方がいい?
    constructor(){
        this.bubbles = []
        this.config = null
    }

    init(){
        this.title = document.getElementById("talk-room-title")
        this.node = document.getElementById("bubbles")
    }

    setNoTitled(){
        this.title.innerText = "No Titled"
        this.bubbles = []
    }

    async loadBubbles(){
        this.bubbles = await loadBubbles(this.config)
    }

    saveBubbles(){
        saveBubbles(this.config,this.bubbles)
    }

    pushBubble(bubble){
        this.bubbles.push(bubble)

        if(this.config == null) return;
        this.saveBubbles()
    }

    
    updateView(){
        this.node.innerHTML = ""
        this.bubbles.forEach(bubble => {
            this.node.appendChild(bubble.node)
        })
        this.node.scrollTop = this.node.scrollHeight
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
    talkRoomView.setNoTitled()
    let loadedConfigs = TalkRoomConfig.fromFileToConfigs(
        await window.myAPI.loadFile(Config.TalkRoomConfigsFilePath)
    )
    talkRoomConfigs.push(...loadedConfigs)
    setTalkRooms()
    setEventListeners()

}

class Elms{
    init(){
        this.talkRoomList = document.getElementById("talk-room-list")
        this.speechInputBox = document.getElementById("speech-input-box")

    }
}

const setEventListeners = function(){
    elms.speechInputBox.addEventListener("keydown",handleCraeteBubble)
}

// ユーザーからの操作のハンドラ
const handleNamingTitle = async function(){
    
    if(talkRoomView.config != null){
        alert("できない操作です")
    }

    // 入力待ち タイトル
    let title = null
    let filePath = await window.myAPI.createFile()
    let config = new TalkRoomConfig(title,filePath)
    talkRoomView.config = config
    talkRoomView.saveBubbles()
    talkRoomConfigs.push(config)
}


const handleCraeteBubble = function(e){
    if(elms.speechInputBox.value == ""){
        return
    }
    if(e.isComposing || e.key != "Enter") {
        return
    }
    let bubble = new Bubble(elms.speechInputBox.value,"red")
    talkRoomView.pushBubble(bubble)
    talkRoomView.updateView()
    elms.speechInputBox.value = ""
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

