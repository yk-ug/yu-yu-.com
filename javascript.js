//先行のマーク
const FIRST_MARK = "○";

//後攻のマーク
const NEXT_MARK = "×";

//ターン数(変数)
let count = 1;

//マス目のＩＤリスト(二次元配列)
const IDs =[
    ['b1','b2','b3'],
    ['b4','b5','b6'],
    ['b7','b8','b9']
];

//ゲームが実行中かどうか判定する変数
let isRun = true;

//先行がどうか判定する関数
function isFirstMove(){
    let isFirst = count % 2;
    return isFirst == 1;
}

//IDからオブジェクトを取得する
function $(id){
    return document.getElementById(id);
}

//ターン表示を切り替える関数
function changeDisplayCount(){
    if(isFirstMove()){
        //先攻だったら
        $("display-count").innerHTML = FIRST_MARK + "の番";
    } else {
        //後攻だったら
        $("display-count").innerHTML = NEXT_MARK + "の番";
    }
}

//試合終了を判定する関数
function judgeEnd(){
    let isEnd = false;
    //横3マスが同じマークかどうかを判定
    for(let row = 0; row < 3; row++){
        //勝敗を判定
        isEnd = isWin(IDs[row][0],IDs[row][1],IDs[row][2]);
        if (isEnd){
            displayResult($(IDs[row][0]).value + "の勝ち！！");
            return true;
        }
    }
    //縦3マスが同じマークかどうか判定
    for(let col = 0; col < 3; col++){
        //勝敗を判定
        isEnd = isWin(IDs[0][col],IDs[1][col],IDs[2][col]);
        if (isEnd){
            displayResult($(IDs[0][col]).value + "の勝ち！！");
            return true;
        }
    }
    //斜め(右下がり)3マスが同じマークかどうか判定
    isEnd = isWin(IDs[0][0],IDs[1][1],IDs[2][2]);
    if (isEnd){
        displayResult($(IDs[0][0]).value + "の勝ち！！");
        return true;
    }
    //斜め(左下がり)3マスが同じマークかどうか判定
    isEnd = isWin(IDs[0][2],IDs[1][1],IDs[2][0]);
    if (isEnd){
        displayResult($(IDs[2][0]).value + "の勝ち！！");
        return true;
    }

//引き分けの時
    if(count >= 9) {
        displayResult("引き分け！")
    }

    //まだ終わりじゃないとき
    return false;
}

//勝利判定する関数
function isWin(firstId, secondId, thirdId){
    //１つ目のマスが空なら、この処理終わり
    if($(firstId).value ==""){
        return false;
    }
    //２つ目のマスが空なら、この処理終わり
    if($(secondId).value ==""){
        return false;
    }
    //３つ目のマスが空なら、この処理終わり
    if($(thirdId).value ==""){
        return false;
    }

    //全て空ではなく、３つ同じマークなら勝ち
    if(
        ($(firstId).value == $(secondId).value)
        && ($(secondId).value == $(thirdId).value)
    ) {
        return true;
    }
    //全て空ではなく、３つ異なるマークならドロー
    return false;
}

//勝敗の結果を表示させる関数
function displayResult(message){
    $("display-result").innerHTML = message;
    isRun = false;
}

//クリックされた時の処理
function clickAction(event){
    //ゲームが終了しているならこの命令は終了
    if(!isRun) {
        return;
    }

    //eventからクリックされた時のマス目を取得する
    let id = event.target.id;

    //IDからオブジェクトを取得する
    let object = $(id);

    //すでにマス目に入っているときはスキップ
    if(object.value !=""){
        return;
    }
    // オブジェクト(マス目)に印を設定する
    if(isFirstMove()){
        object.value = FIRST_MARK;
    } else {
        object.value = NEXT_MARK ;
    }

    if(judgeEnd()){
        return;
    }

    //ゲーム終了かどうか判定
    judgeEnd();

    //ターン数を＋１
    count = count +1;

    //ターン表記を切り替える関数
    changeDisplayCount();
}

//もう一度遊ぶボタンを押したときの処理
function resetAction(){
    //ターン数を1に戻す
    count = 1;
    changeDisplayCount();

    //マス目を空にする
    for (let row = 0; row < 3; row++){
        for (let col = 0; col < 3; col++){
            $(IDs[row][col]).value = "";
        }
    } 

    //結果の表示をなくす
    displayResult("");

    //ゲームを「実行中」
    isRun = true;
}

//画面を読み込んだ時の処理
function onloadAction(){

    //マス目にイベントを設定する（どうなったら動き出すか）
    for (let row = 0; row < 3; row++){
        for (let col = 0; col < 3; col++){
            $(IDs[row][col]).onclick = clickAction;
        }
    } 
    //もう一度遊ぶボタンにイベントを設定
    $("reset").onclick = resetAction;
}

//画面を読み込んだら自動でやってもらうイベントを設定
window.onload= onloadAction();