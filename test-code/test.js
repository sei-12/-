
const testBubbleCanBuild = function(){
    const test = function(lineString,answer){
        count += 1
        if(Bubble.canBuild(lineString) == answer){
            console.log(`test${count}`,"OK!")
        }else{
            console.log(`test${count}`,"NG!")
        }
    }
    let count = 0
    test("aaa,red",true)
    test("bbb,",false)
    test("ccc,aaa,ddd",false)
    test(",aaa",false)
}

testBubbleCanBuild()