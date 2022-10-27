const $canvas = document.getElementById("canvas")
const ctx = $canvas.getContext('2d');

let max_canvas_size = {x:$canvas.clientWidth,y:$canvas.clientHeight}
// 設定
let font_size = 48
// let font = "serif"
let font = "'ＭＳ ゴシック'"
let lineheight = 30
let text_start = 80


var timeoutID = 0;
var delay = 300;
window.addEventListener("resize",()=>{
  if(now_read){
    nove_stop();
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function(){
        create_hayayomi(save.bun,save.index,save.talk,save.name,false);
    }, delay);
  }
})



let run = false;
let save = {"index":0,"bun":[],"talk":[],"name":"アプリ説明"}
save.bun = ['hayayomiとは', '', '高速逐次', '視覚提示', '', '（RSVP）', 'を用いて', '高速に', '読書を', '行う事が', '出来る', 'アプリケーション', 'です。', 'RSVPとは', '同じ場所に', '単語を', '高速で表示する','（フラッシュ', '暗算のように）', '事で読書に', '必要な','眼球運動を無くし', '高速に', '文字を', '読むことが', '出来る手法です。', 'ただし','この手法では', '文字を', '後戻りする事が','出来ず、', '文章への', '理解力に', '影響が出ます。', 'また、', '適切な速度で','読書を', '行う事で', 'ストレスレベル', '低下に', 'つながるため、', '本', 'アプリケーション', 'では', 'リラックス', '目的には', '向いて', 'いません。', '以上より、', '内容への', '適切な理解や', 'ストレスレベル', '低下には', '役立つ事は', 'ありませんが、', '文章の', '流し読みや', '全体の流れ', 'の把握に', '用いる事が', '出来ます。', '高速逐次', '視覚提示に', '用いる文章の', '分かち書きは', 'すべて', 'ユーザーサイドで', '行って', 'おり、', '通信を', '行わない', 'ため', 'セキュリティ面','でも安全に', 'ご利用','いただけます。']
save.talk = [false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
const $progress = {"cu":document.getElementById("index_cu"),"max":document.getElementById("index_max"),"bar":document.getElementById("novel_volume")}
let read_timeout = 0;
const create_hayayomi = (arr,index,talk_arr,save_name,continue_flag = true)=>{
  index = Number(index)
  $canvas.width = $canvas.clientWidth
  $canvas.height = $canvas.clientHeight
  max_canvas_size = {x:$canvas.clientWidth,y:$canvas.clientHeight}

  // BG作製
  ctx.fillStyle = current_col.bg;
  ctx.beginPath();
  ctx.rect(0,0,max_canvas_size.x,max_canvas_size.y);
  ctx.fill();
  // 本体生成
  if(talk_arr[index]){
    ctx.fillStyle = current_col.sub;
  }else{
    ctx.fillStyle = current_col.prime;
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  ctx.font = "bold " + font_size + 'px '+ font;
  // console.log(max_canvas_size);
  ctx.fillText(arr[index],max_canvas_size.x/2,text_start+(font_size/2 + lineheight))

  if(talk_arr[index-1]){
    ctx.fillStyle = current_col.sub;
  }else{
    ctx.fillStyle = current_col.prime;
  }
  ctx.font = font_size/2 + 'px '+ font;
  ctx.fillText(arr[index-1]||"",max_canvas_size.x/2,text_start)

  if(talk_arr[index+1]){
    ctx.fillStyle = current_col.sub;
  }else{
    ctx.fillStyle = current_col.prime;
  }
  ctx.fillText(arr[index+1]||"",max_canvas_size.x/2,text_start+(font_size/2 + font_size + lineheight * 2))

  // // 進捗表示
  // ctx.beginPath();
  // ctx.rect(max_canvas_size.x/10,50,8*(max_canvas_size.x/10),50);
  // ctx.stroke();

  // 進捗変更
  $progress.cu.innerText = index
  $progress.max.innerText = arr.length-1
  $progress.bar.value = index
  $progress.bar.max = arr.length-1
  // 名前表示変更
  if(save_name != save.name){
    document.getElementById("read_title").innerText = save_name
  }

  save = {"index":index,"bun":arr,"talk":talk_arr,"name":save_name}
  if(continue_flag && run){
  // if(true){
    if(index >  arr.length-2){
      nove_stop();
    }else{
      var delay_time = 0
      var c_min_del = Number(del_setting.min)
      arr[index].split("").forEach(e => {
        if(kanahiraeng_cha.indexOf(e)!=-1){
          delay_time +=del_setting.kana
        }else if(mini_cha.indexOf(e)!=-1){
          delay_time +=del_setting.mini
        }else if(fin_cha.indexOf(e)!=-1){
          c_min_del +=del_setting.kugiri
          delay_time +=del_setting.kugiri
        }else{
          delay_time +=del_setting.kanzi
        }
      });
      delay_time = delay_time>=del_setting.min ? delay_time:del_setting.min;
      clearTimeout(read_timeout);
      read_timeout = setTimeout(()=>{create_hayayomi(arr,index+=1,talk_arr,save_name)},delay_time)
    }
  }else{
    nove_stop();
  }
}
let del_setting = {"kana":50,"mini":50,"kanzi":70,"kugiri":100,"min":200}
let del_setting_def = {"kana":50,"mini":50,"kanzi":70,"kugiri":100,"min":200}
const kanahiraeng_cha = `あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽっアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポッqwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM`
const mini_cha = `ゃゅょぁぃぅぇぉャュョァィゥェォ`
const fin_cha = `、。!?！？`

const $cont = {"start":document.getElementById("play"),"stop":document.getElementById("pause")}
const nove_stop = ()=>{
  clearTimeout(read_timeout);
  run = false;
  $cont.start.classList.remove("non-visi")
  $cont.stop.classList.add("non-visi")
}
const nove_start = ()=>{
  clearTimeout(read_timeout);
  run = true;
  $cont.start.classList.add("non-visi")
  $cont.stop.classList.remove("non-visi")
  create_hayayomi(save.bun,save.index,save.talk,save.name,true);
}

Object.keys(del_setting_def).forEach(e=>{
  document.getElementById(e).addEventListener("input",(e)=>{
    var targ = e.target
    var val = 0
    console.log(targ.value,targ.getAttribute("id"))
    if(targ.value == ""){
      val = del_setting_def[targ.getAttribute("id")]
    }else{
      val = targ.value
    }
    del_setting[targ.getAttribute("id")] = Number(val)
  })
})