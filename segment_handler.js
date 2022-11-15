// const hayayomi_setu ="hayayomiとは「高速逐次視覚提示」（RSVP）を用いて高速に読書を行う事が出来るアプリケーションです。RSVPとは同じ場所に単語を高速で表示する（フラッシュ暗算のように）事で読書に必要な眼球運動無くし高速に文字を読むことが出来る手法です。ただしこの手法では文字を後戻りする事が出来ず、文章への理解力に影響が出ます。また、適切な速度で読書を行う事でストレスレベル低下につながるため、本アプリケーションではリラックス目的には向いていません。以上より、内容への適切な理解・ストレスレベル低下には役立つ事はありませんが、文章の流し読みや全体の流れの把握に用いる事が出来ます。高速逐次視覚提示に用いる文章の分かち書きはすべてユーザーサイドで行っており、通信を行わないためセキュリティ面でも安全にご利用いただけます。"

const max_chara = 6
function segment(text){
  return new Promise(function(resolve) {
    var segmenter = new TinySegmenter();
    text = text.replace(/\s+/g, '');
    text = text.replace(/』/g, '』 ');
    let segs = segmenter.segment(text);
    var segarray = []
    var talk_array = []
    var current_talk = false
    let seg = ""
    let before_e = ""
    segs.forEach(e=>{
      if(e ==""){
        ;
      }else if(["「","『"].indexOf(e[0]) != -1){
        segarray,seg,talk_array = seg_add(segarray,seg,talk_array,current_talk)
        current_talk = true
        if(!(before_e[before_e.length-1] == "」" || before_e[before_e.length-1]  == "』")){
          segarray.push("")
          talk_array.push(false)
        }
        seg = ""
      }else if(["」","』"].indexOf(e[0]) != -1){
        segarray,seg,talk_array = seg_add(segarray,seg,talk_array,current_talk)
        current_talk = false
        segarray.push("")
        talk_array.push(false)
        seg = ""
      }else if(["て","に","を","は","と","、","。","）"].indexOf(e) != -1){
        // console.log(e)
        seg += e
        segarray,seg,talk_array = seg_add(segarray,seg,talk_array,current_talk)
        seg = ""
      }else if(["…","!","?","！","？"].indexOf(e) != -1){
        seg += e
        segarray,seg,talk_array = seg_add(segarray,seg,talk_array,current_talk)
        seg = ""
      }else if(seg.length + e.length < max_chara){
        seg += e
      }else{
        segarray,seg,talk_array = seg_add(segarray,seg,talk_array,current_talk)
        seg = e
      }
      before_e = e
    })
    resolve({"text":segarray,"talk":talk_array});
  })
}
const seg_add = (seg_a,seg,talk_array,current_talk)=>{
  // console.log(seg,current_talk)
  //確定した分かち書きをひとつ前に足しても規定文字数未満の場合はくっつける
  if(seg.length == 0){
    ;
  }else if(seg_a.length == 0){
    seg_a.push(seg)
    talk_array.push(current_talk)
  }else if(["、","。","）","？","！","?","!"].indexOf(seg) != -1){
    seg_a.splice( seg_a.length-1, 1, seg_a.slice(-1)[0] + seg)
  }else if(["","、","。","）","？","！","?","!"].indexOf(seg_a.slice(-1)[0].slice(-1)) != -1){
    seg_a.push(seg)
    talk_array.push(current_talk)
  }else if(seg_a.slice(-1)[0].length + seg.length < max_chara && seg_a.slice(-1)[0] != ""){
    seg_a.splice( seg_a.length-1, 1, seg_a.slice(-1)[0] + seg)
  }else{
    seg_a.push(seg)
    talk_array.push(current_talk)
  }
  return seg_a,"",talk_array
}