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
        create_hayayomi();
    }, delay);
  }
})
const create_hayayomi = ()=>{
  $canvas.width = $canvas.clientWidth
  $canvas.height = $canvas.clientHeight
  max_canvas_size = {x:$canvas.clientWidth,y:$canvas.clientHeight}

  // 本体生成
  ctx.fillStyle = 'green';
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.font = "bold " + font_size + 'px '+ font;
  console.log(max_canvas_size);
  ctx.fillText("今の文章",max_canvas_size.x/2,text_start+(font_size/2 + lineheight))
  ctx.font = font_size/2 + 'px '+ font;
  ctx.fillText("前の文章",max_canvas_size.x/2,text_start)
  ctx.fillText("後の文章",max_canvas_size.x/2,text_start+(font_size/2 + font_size + lineheight * 2))
  

  // 進捗表示
  ctx.beginPath();
  ctx.rect(max_canvas_size.x/10,50,8*(max_canvas_size.x/10),50);
  ctx.stroke();
}