const nav_list = ['rea','hon','ser','inf'];
const nav = {'rea':document.getElementById('nav_rea'),'hon':document.getElementById('nav_hon'),'ser':document.getElementById('nav_ser'),'inf':document.getElementById('nav_inf')};
const cont = {'rea':document.getElementById('rea'),'hon':document.getElementById('hon'),'ser':document.getElementById('ser'),'inf':document.getElementById('inf')};
let now_read = false
const changepage = (topage)=>{
  var read_change = false
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
      create_hayayomi();
    }else if(!read_change){
      now_read = false
    }
  })
}