
class Con{
    constructor(){
        // this.bufSize = 128
        // this.buf = []
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
    test("aaa,red",true)
    test("bbb,",false)
    test("ccc,aaa,ddd",false)
    test(",aaa",false)
}

const testConsole = function(){
    for(let i = 0; i < 100; ++i){
        con.log(i)
    }
}

const con = new Con()
testBubbleCanBuild()
