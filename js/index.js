const Index = {
    "init": init,
    "loadContent": loadContent

}

function init(){
    const init_size = document.body.scrollHeight;
    document.getElementById('data-frame').addEventListener('load', function() {
        let iframe = document.getElementById('data-frame');
        let content = document.getElementById("content");
        let menubar = document.getElementById("menubar");
        let infobar = document.getElementById("infobar")
        let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        let iframe_height = iframeDocument.body.scrollHeight;
        if(iframe_height < init_size){
            iframe.style.height = init_size + "px"
        }else{
            iframe.style.height = iframe_height  + 'px';
        }
        if(init_size<iframe_height + infobar.scrollHeight + 10){
            menubar.style.height = iframe_height + infobar.scrollHeight + 10 +"px"
        }else{
            menubar.style.height = init_size + infobar.scrollHeight+ "px";
        }
    });
    document.getElementById('data-frame').addEventListener("DOMContentLoaded",  () =>{
        console.log("changed");
    })
}
function loadContent(url) {
    let firstShow = document.getElementById("first-show");
    firstShow.hidden = true;
    let iframe = document.getElementById("data-frame");
    iframe.hidden = false;
    iframe.src = url;
};

export default Index;