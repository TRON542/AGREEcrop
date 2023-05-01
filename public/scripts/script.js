const log = document.getElementById("login_main_id");
const log1 = document.getElementById("sign_main_id");
const log_btn = document.getElementById("log")
const sign_btn = document.getElementById("sig")
                                        //login//
log_btn.addEventListener('click',shutter)
function shutter(){
    
    log.classList.toggle("login_main2")
    log.classList.remove("login_main3")
    log_btn.classList.toggle("hide")
    sign_btn.classList.toggle("hide")
}

const back = document.getElementById("bk");
back.addEventListener("click",bak);
function bak(){
    log.classList.toggle("login_main3")
    log.classList.remove("login_main2")
    log_btn.classList.remove("hide")
    sign_btn.classList.remove("hide")
}

                                         //sign in//       

sign_btn.addEventListener('click',shutter1)
function shutter1(){
    log1.classList.toggle("sign_main2")
    log1.classList.remove("sign_main3")
    log_btn.classList.toggle("hide")
    sign_btn.classList.toggle("hide")
}


const back1 = document.getElementById("bk1");
back1.addEventListener("click",bak1);
function bak1(){
    log1.classList.toggle("sign_main3")
    log1.classList.remove("sign_main2")
    sign_btn.classList.remove("hide")
    log_btn.classList.remove("hide")
}



