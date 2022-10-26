const sya_dic = {"natu":"夏目漱石","mori":"森鴎外","aku":"芥川竜之介","edo":"江戸川乱歩","dazai":"太宰治"}

// 検索用ボタン制御
const ex_sarch = (sakusya)=>{
  document.getElementById("tyosya").value = sya_dic[sakusya]
  document.getElementById("sakuhin").value = ""
  serch()
}
// 検索フォーム制御
const serch = () =>{
  $novels.innerHTML = ""
  var nov_name = document.getElementById("sakuhin").value
  var nov_tyosya = document.getElementById("tyosya").value
  var filter_name_index = []
  var filter_tyosya_index = []
  // 名前
  serch_data.name.filter((e,index)=>{if(e.includes(nov_name)){filter_name_index.push(index);return}})
  serch_data.tyosya.filter((e,index)=>{if(e.includes(nov_tyosya)){filter_tyosya_index.push(index);return}})
  var common_index = filter_name_index.filter(e => filter_tyosya_index.includes(e))
  var over = false
  common_index.forEach((e,index)=>{
    if(index>200){
      over = true
    }else{
      create_serch_row(serch_data.name[e],serch_data.tyosya[e],serch_data.bunrui[e],serch_data.sakuhin_url[e],e)
    }
  })
  if(over){
    $novels.innerHTML += `<h2>200作品以上は表示されません。検索ワードを変更して下さい。<a href="#top_id">TOPに戻る</a></h2>`
  }
}
const random_serch = ()=>{
  $novels.innerHTML = ""
  var random_index = []
  for(let i = 0;i<10;i++){
    var random = Math.floor(Math.random() * serch_data.name.length)
    random_index.push(random)
    create_serch_row(serch_data.name[random],serch_data.tyosya[random],serch_data.bunrui[random],serch_data.sakuhin_url[random],random)
  }
}
// イニシャライズ
// NDC情報取得
let NDC = {};
(()=>{
  var _request = new XMLHttpRequest();
  _request.addEventListener('load', (event) => {
    var response = event.target.responseText;
    var row = response.split(/\r\n|\n/);
    row.forEach(e=>{
      var data = e.split(",")
      NDC[data[0]] = data[1]
    })
  });
  _request.open('GET', "./ndc.csv", true);
  _request.send();
})();

// 小説情報取得
(()=>{
  var _request = new XMLHttpRequest();
  _request.addEventListener('load', (event) => {
    var response = event.target.responseText;
    decode_csv(response);
  });
  _request.open('GET', "./novel.csv", true);
  _request.send();
})()
let serch_data = {"name":[],"tyosya":[],"bunrui":[],"mozi":[],"sakuhin_url":[],"syuppan":[],"text_url":[],"decord":[]}
const decode_csv = (datas)=>{
  var row = datas.split(/\r\n|\n/);
  row.forEach((element,index) => {
    var data = element.split(",");
    if(index & data[5] == "なし"){
      serch_data.name.push(data[1]);
      serch_data.bunrui.push(NDC[parseInt(data[3].slice(4,7))]);
      serch_data.mozi.push(data[4]);
      serch_data.sakuhin_url.push(data[6]);
      serch_data.tyosya.push(data[8]+data[9]);
      serch_data.syuppan.push(data[10]);
      serch_data.text_url.push(data[11].replace("www.aozora.gr.jp","aozorahack.org/aozorabunko_text").replace(".zip",`${data[11].slice(data[11].lastIndexOf("/"),data[11].lastIndexOf("."))}.txt`));
    }
  });
}

const get_aozora = (text_url)=>{
  var _request = new XMLHttpRequest();
  _request.addEventListener('load', (event) => {
    const response = event.target.responseText;
    var text = azozora_remove(response)
    console.log(text);
  });
  _request.overrideMimeType('text/plain; charset=Shift_JIS');
  _request.open('GET', text_url, true);
  _request.send();
}
const azozora_remove = (text)=>{
  text = text.slice(text.lastIndexOf("-------------------------------------------------------")+56,text.lastIndexOf("底本："))
  text = text.replace(/｜.*《.*》/g,(match)=>{return match.slice(match.indexOf("｜")+1,match.indexOf("《"))})
  text = text.replace(/《.*》/g,"")
  text = text.replace(/※［＃.*］/g,"")
  text = text.replace(/［.*］/g,"")
  text = text.replace(/..／＼/g,(match)=>{return match.slice(0,2)+match.slice(0,2)})
  text = text.replace(/□/g,"　")
  return text
}
const $novels = document.getElementById("novels")
const create_serch_row = (novel_name,tyosya,genre,url,index)=>{
  $novels.innerHTML += `<div id="n-${index}" class="novel"><div class="novel_name">${novel_name}</div><div class="novel_tyosya">${tyosya}</div><div class="novel_genre">${genre}</div><div class="novel_link"><a href="${url}" target="_blanck">詳細</a></div><div onclick="add_bookshelf(${index})" class="novel_add">本棚に追加</div><div class="novel_read" onclick="add_read(${index})">今すぐ読む</div></div>`
}



// get_aozora("https://aozorahack.org/aozorabunko_text/cards/000083/files/496_ruby_19865/496_ruby_19865.txt")