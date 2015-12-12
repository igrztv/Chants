var preloaders = document.getElementsByClassName("b-preloader");

function fade(el){
    el.style.opacity = 1;
    var TIMEOUT = 16;
    var preloaderTimeoutHelper = function(){
        el.style.opacity = el.style.opacity - 0.05;
        if (el.style.opacity > 0.05){ 
            setTimeout(preloaderTimeoutHelper, TIMEOUT);
        } else {
            el.style.display = "none";
         }
     }
     setTimeout(preloaderTimeoutHelper, TIMEOUT);
 }

window.onload = function(){
    //preloaders[0].fadeOut('slow');
    console.log(preloaders[0]);
    fade(preloaders[0]);
};
