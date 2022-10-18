const nav_list = ['hon','ser','inf'];
const nav = {'hon':document.getElementById('nav_hon'),'ser':document.getElementById('nav_ser'),'inf':document.getElementById('nav_inf')};
const cont = {'hon':document.getElementById('hon'),'ser':document.getElementById('ser'),'inf':document.getElementById('inf')};
const changepage = (topage)=>{
  nav_list.forEach(e=>{
    if(e == topage){
      nav[e].classList .add("nav-current");
      cont[e].classList .remove("non-visi");
    }else{
      nav[e].classList .remove("nav-current");
      cont[e].classList .add("non-visi");
    }
  })
}