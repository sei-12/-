
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

    static async saveConfigs(configs){
        let text = ""
        configs.forEach(config => {
            text += config.toLine() + "\n"
        })
        window.myAPI.writeFile({text:text,path:Config.TalkRoomConfigsFilePath})
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
        return this.title + "," + this.filePath
    }
}

class Bubble{
    static dataSeparater = "<----data-separater---->"
    static canBuild(lineString){
        let s_line = lineString.split(Bubble.dataSeparater)
        if(s_line.length != 2){
            return false
        }
        if(s_line.includes("")){
            return false
        }
        return true
    }

    static fromLine(line){
        return new Bubble(...line.split(Bubble.dataSeparater))
    }

    constructor(text,color){
        this.node = this.buildNode()
        this.node.innerText = text
        this.node.style.backgroundColor = color
        this.text = text
        this.color = color
    }

    toLine(){
        return this.text + Bubble.dataSeparater + this.color
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


const Prompt = async function(message,zIndex = 100){
    const createNode = {
        bg : function(){
            let node = document.createElement("div")
            node.style.position = "absolute"
            node.style.top = "0"
            node.style.zIndex = zIndex
            node.style.height = "100vh"
            node.style.width = "100vw"
            node.style.backdropFilter = "blur(3px)"
            return node
        },
        window : function(){
            let node = document.createElement("div")
            node.style.position = "absolute"
            node.style.top = "40%"
            node.style.left = "25%"
            node.style.height = "20%"
            node.style.width = "50%"
            node.style.borderRadius = "1vh"
            node.style.backgroundColor = "rgba(0,0,0,0.8)"
            node.style.backdropFilter = "blur(3px)"
            return node
        },
        message : function(){
            let node = document.createElement("div")
            node.style.color = "white"
            return node
        },
        inputBox : function(){
            let node = document.createElement("input")
            node.type = "text"
            return node
        },
        doneBtn : function(){
            let node = document.createElement("input")
            node.value = "done"
            node.type = "button"
            return node
        },
        cancelBtn : function(){
            let node = document.createElement("input")
            node.type = "button"
            node.value = "cancel"
            return node
        },
        inner : function(){
            let node = document.createElement("div")
            node.style.margin = "5%"
            return node
        }
    }
    
    const init = function(){
        buildNode()
        document.body.appendChild(bg)
        messageNode.innerText = message
        setEventListener()
    }

    const finalize = function(){
        document.body.removeChild(bg)
    }

    const buildNode = function(){
        bg.appendChild(pwindow)
            pwindow.appendChild(inner)
                inner.appendChild(messageNode)
                inner.appendChild(inputBox)
                inner.appendChild(done)
                inner.appendChild(cancel)
    }

    const handleDoneBtn = () => {
        if(inputBox.value == ""){
            alert("入力が完了していません")
        }else{
            __exit(inputBox.value)
        }
    }

    const handleCancelBtn = () => {
        __exit(null)
    }
    
    const setEventListener = function(){
        done.addEventListener("click",handleDoneBtn)
        cancel.addEventListener("click",handleCancelBtn)
    }

    const bg          = createNode.bg()
    const pwindow     = createNode.window()
    const inner       = createNode.inner()
    const messageNode = createNode.message()
    const inputBox    = createNode.inputBox()
    const done        = createNode.doneBtn()
    const cancel      = createNode.cancelBtn()
    
    init()
    const __exit = function(retValue){
        let event = new CustomEvent("resolve",{detail:{
            returnValue:retValue
        }})
        exitElm.dispatchEvent(event)
    }

    const exitElm = document.createElement("div")
    return new Promise((resolve) => {
        exitElm.addEventListener("resolve",(e)=>{
            finalize()
            resolve(e.detail.returnValue)
        },{once:true})
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

    hotkeyNamingTitle = new Hotkey(document,["Meta","s"],handleNamingTitle).start()
}

// ユーザーからの操作のハンドラ
const handleNamingTitle = async function(){
    hotkeyNamingTitle.stop()
    if(talkRoomView.config != null){
        alert("できない操作です")
        hotkeyNamingTitle.start()
        return
    }

    // 入力待ち タイトル
    let title = await Prompt("hello Prompt")
    let filePath = await window.myAPI.createFile()
    let config = new TalkRoomConfig(title,filePath)
    talkRoomView.config = config
    talkRoomView.saveBubbles()
    talkRoomView.title.innerText = config.title
    talkRoomConfigs.push(config)
    TalkRoomConfig.saveConfigs(talkRoomConfigs)
    setTalkRooms()
    hotkeyNamingTitle.start()
}


const handleCraeteBubble = function(e){
    if(elms.speechInputBox.value == ""){
        return
    }
    if(e.isComposing || e.key != "Enter") {
        return
    }
    let bubble = new Bubble(elms.speechInputBox.value,"rgb(100,255,100)")
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

let hotkeyNamingTitle = null
const elms = new Elms()
const talkRoomConfigs = [];
const talkRoomView = new TalkRoomView()

// cmd n で新規作成 <- 現在のファイルが未保存ならきく
// list のデザイン
// list 検索機能
// input speech box cmd p n で色変更
// cmd s でnotitleを保存

// ショートカットで過去のbubbleを引用
// 画像を上げれるようにする
// "" の中を変数のように扱う <- タブ補完
// if を使える <- endifを入力するまで