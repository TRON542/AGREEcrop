const spnid = document.getElementById("spanid")
const txt = document.getElementById("span")
spnid.addEventListener('click',more)
function more(){
    console.log("more clicked")
    txt.classList.toggle("spanout")
    
}