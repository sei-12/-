const Key = function(keyString){
    this.down = () => {
        this.isDown = true
    }

    this.up = () => {
        this.isDown = false
    }
    
    this.keyString = keyString
    this.isDown = false
}

const Hotkey = function(htmlElement,keyStrings,func){

    const buildKeys = function(keyStrings){
        if (keyStrings.includes('Shift')){
            throw Error("Shiftは文字を大文字にすることによって表現してください (Shift + Meta + a) -> (Meta + A)")
        }
        return keyStrings.map(keyString => new Key(keyString))
    }

    const handleKeyDown = (e) => {
        let downKey = this.keys.find( key => e.key == key.keyString)
        if (downKey instanceof Key){
            downKey.down()
        }

        if ( this.keys.every( key => key.isDown ) ){
            this.func()
            downKey.up()
        }
    }

    const handleKeyUP = (e) => {
        let key = this.keys.find( key => e.key == key.keyString)
        if (key instanceof Key){
            key.up()
        }
    }

    const allKeyUP = () => {
        this.keys.forEach( key => key.up() );
    }
    
    const handleBlur = (e) => {
        // cmd + a でインスタンスが生成された例を考える　
        // cmdを押している状態でhtmlElementからフォーカスが外れるとcmdを離してもhandleKeyUPが実行されない
        // だからもう一度フォーカスするとcmdを押さなくてもaだけでthis.funcが実行される　
        // しかし
        // handleBlur関数をhandleするとcmdを押した状態でフォーカスを外しcmdを離さないままもう一度フォーカスすると
        // aを押してもthis.funcが実行されない
        allKeyUP()
    }

    this.start = function(){
        allKeyUP()
        this.htmlElement.addEventListener("keydown",handleKeyDown)
        this.htmlElement.addEventListener("keyup",  handleKeyUP)
        this.htmlElement.addEventListener("blur",handleBlur)
        return this
    }

    this.stop = function(){
        allKeyUP()
        this.htmlElement.removeEventListener("keydown",handleKeyDown)
        this.htmlElement.removeEventListener("keyup",  handleKeyUP)
        this.htmlElement.removeEventListener("blur",handleBlur)
    }

    if (!keyStrings instanceof Array){
        throw Error("keyStringsは配列である必要があります")
    }
    if ( typeof func != "function"){
        console.log(typeof func)
        throw Error("funcは関数である必要があります")
    }
    
    
    this.htmlElement = htmlElement
    this.keys = buildKeys(keyStrings)
    this.func = func
}