
class Con{
    constructor(){
        this.node = document.getElementById("test-console")
    }

    log(text,end="\n"){
        this.node.innerText += "" + text + end
        this.node.scrollTop = this.node.scrollHeight
    }
}

const testBubbleCanBuild = function(){
    const test = function(lineString,answer){
        count += 1
        if(Bubble.canBuild(lineString) == answer){
            con.log(`test${count} OK!`)
        }else{
            con.log(`test${count} NG!`)
        }
    }
    let count = 0
    con.log("Test : Bubble.canBuild()")
    test("aaa<----data-separater---->red",true)
    test("bbb<----data-separater---->",false)
    test("ccc<----data-separater---->aaa<----data-separater---->ddd",false)
    test("<----data-separater---->aaa",false)
    test("ldkfj<----data-separater---->rgb(100,255,100)",true)
}

const testLoadAndSaveBubble = async function(){
    con.log("Test : loadBubbles saveBubbles")
    let config = {path:""}

    const test = async function(fileStr){
        count += 1
        fileString = fileStr
        if(await saveBubbles(config,await loadBubbles(config)) == fileStr){
            con.log(`test${count} OK!`)
        }else{
            con.log(`test${count} NG!`)
        }
    }
    let count = 0

let test1 = 
`seirta<----data-separater---->rgb(100,255,100)
fad<----data-separater---->rgb(100,255,100)
fladskjf<----data-separater---->rgb(100,255,100)
flkjads;f<----data-separater---->rgb(100,255,100)
fjladsf<----data-separater---->rgb(100,255,100)
hgbna;ds<----data-separater---->rgb(100,255,100)
`   
    test(test1)
    
}

window.myAPI = {
    loadFile : async function(path){
        return fileString
    },
    writeFile : async function(text,path){
        console.log(text)
    }
}

const testConsole = function(){
    for(let i = 0; i < 100; ++i){
        con.log(i)
    }
}
let fileString = ""
const con = new Con()
testBubbleCanBuild()
testLoadAndSaveBubble()