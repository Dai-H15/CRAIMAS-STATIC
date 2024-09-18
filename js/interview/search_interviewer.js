const search_interviewer = {
    "init":init,
    "addon": addon
}
function addon(name){
        window.opener.document.getElementById("id_interviewer").value = name;
}
function init(){
    let list = document.getElementsByName("button-addons")
for(const element of list){
    if(!window.opener.location.pathname.includes("view_interview")){
        element.children[1].children["button-addon-1"].remove();
    }
}
}
export default search_interviewer;