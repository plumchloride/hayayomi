const nav_list = ['rea','hon','ser','inf'];
const nav = {'rea':document.getElementById('nav_rea'),'hon':document.getElementById('nav_hon'),'ser':document.getElementById('nav_ser'),'inf':document.getElementById('nav_inf')};
const cont = {'rea':document.getElementById('rea'),'hon':document.getElementById('hon'),'ser':document.getElementById('ser'),'inf':document.getElementById('inf')};
let now_read = false
const changepage = (topage,rerode = true)=>{
  var read_change = false
  nove_stop();
  nav_list.forEach(e=>{
    if(e == topage){
      nav[e].classList .add("nav-current");
      cont[e].classList .remove("non-visi");
    }else{
      nav[e].classList .remove("nav-current");
      cont[e].classList .add("non-visi");
    }
    if(topage == "rea" && e == topage){
      now_read = true
      read_change = true
      if(rerode)create_hayayomi(save.bun,save.index,save.talk,save.name,false);
    }else if(!read_change){
      now_read = false
    }
  })
}


// 今すぐ読むクリック
let segmented_dic = {}
async function add_read(index){
  nove_stop();
  text = await get_aozora(serch_data.text_url[index],serch_data.decord[index])
  segmented_dic = await segment(text)
  changepage("rea",false)
  create_hayayomi(segmented_dic.text,0,segmented_dic.talk,serch_data.name[index],false)
}
// 本棚に追加をクリック
const add_bookshelf = (index)=>{
  alert("本棚機能は未実装です。今後実装する予定です。")
}


document.getElementById("novel_volume").addEventListener("input",(e)=>{
  nove_stop();
  $progress.cu.innerText = e.target.value
  create_hayayomi(save.bun,e.target.value,save.talk,save.name,false);
})
document.getElementById("sk_prev").addEventListener("click",(e)=>{
  nove_stop();
  $progress.cu.innerText = e.target.value
  create_hayayomi(save.bun,save.index -1,save.talk,save.name,false);
})
document.getElementById("sk_next").addEventListener("click",(e)=>{
  nove_stop();
  $progress.cu.innerText = e.target.value
  create_hayayomi(save.bun,save.index +1,save.talk,save.name,false);
})



// イニシャライズ
// 色追加
let col = {};
let current_col = {"bg": '#fffaf0', "prime": '#333333', "sub": '#6699ff'}
const $col_picer = document.getElementById("backgrounds");
(()=>{
  var _request = new XMLHttpRequest();
  _request.addEventListener('load', (event) => {
    var response = event.target.responseText;
    var row = response.split(/\r\n|\n/);
    row.forEach((e,index)=>{
      var data = e.split(",")
      col[index] = {"bg":data[0],"prime":data[1],"sub":data[2]}
      var c_class = index == 0?' bg_ex-current"':""
      $col_picer.innerHTML += `<div class="bg_ex${c_class}" onclick="bg_change(${index})" id="bg-${index}" style="background-color:${data[0]};"><span style="color:${data[1]};">地の文</span><br><span style="color:${data[2]};">会話文</span></div>`
    })
  });
  _request.open('GET', "./color.csv", true);
  _request.send();
})();

const bg_change = (index)=>{
  Object.keys(col).forEach(e=>{
    document.getElementById(`bg-${e}`).classList.remove("bg_ex-current")
  })
  document.getElementById(`bg-${index}`).classList.add("bg_ex-current")
  current_col = col[index]
  document.documentElement.style.setProperty('--bg',current_col.bg);
  document.documentElement.style.setProperty('--text',current_col.prime);
  document.documentElement.style.setProperty('--speak',current_col.sub);
  create_hayayomi(save.bun,save.index,save.talk,save.name,false);
}