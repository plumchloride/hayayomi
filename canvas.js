const $canvas = document.getElementById("canvas")
const ctx = $canvas.getContext('2d');

let max_canvas_size = {x:$canvas.clientWidth,y:$canvas.clientHeight}
// 設定
let font_size = 48
// let font = "serif"
let font = "'ＭＳ ゴシック'"
let lineheight = 30
let text_start = 150


var timeoutID = 0;
var delay = 300;
window.addEventListener("resize",()=>{
  if(now_read){
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function(){
        create_hayayomi(save.bun,save.index,save.talk,false);
    }, delay);
  }
})



let run = false;
let save = {"index":1,"bun":["前の文","今の文","後の文"],"talk":[false,false,false]}
const create_hayayomi = (arr,index,talk_arr,continue_flag = true)=>{
  $canvas.width = $canvas.clientWidth
  $canvas.height = $canvas.clientHeight
  max_canvas_size = {x:$canvas.clientWidth,y:$canvas.clientHeight}

  // 本体生成
  if(talk_arr[index]){
    ctx.fillStyle = 'red';
  }else{
    ctx.fillStyle = 'green';
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.font = "bold " + font_size + 'px '+ font;
  // console.log(max_canvas_size);
  ctx.fillText(arr[index],max_canvas_size.x/2,text_start+(font_size/2 + lineheight))
  if(talk_arr[index-1]){
    ctx.fillStyle = 'red';
  }else{
    ctx.fillStyle = 'green';
  }
  ctx.font = font_size/2 + 'px '+ font;
  ctx.fillText(arr[index-1]||"",max_canvas_size.x/2,text_start)
  if(talk_arr[index+1]){
    ctx.fillStyle = 'red';
  }else{
    ctx.fillStyle = 'green';
  }
  ctx.fillText(arr[index+1],max_canvas_size.x/2,text_start+(font_size/2 + font_size + lineheight * 2))

  // 進捗表示
  ctx.beginPath();
  ctx.rect(max_canvas_size.x/10,50,8*(max_canvas_size.x/10),50);
  ctx.stroke();
  // if(continue_flag && run){
  if(true){
    if(index >  arr.length){
      ;
    }else{
      setTimeout(()=>{create_hayayomi(arr,index+=1,talk_arr)},100)
    }
  }else{
    save = {"index":index,"bun":arr,"talk":talk_arr}
  }
}
let kana_del = 100;
let mini = 50;
let kanzi_del = 200;
let min_del = 300;
const kanahiraeng_cha = `あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽっアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポッqwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM、。!?！？`
const mini_cha = `ゃゅょぁぃぅぇぉャュョァィゥェォ`