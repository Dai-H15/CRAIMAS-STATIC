const delete_set = {
    "init": init
}

function init(){
    let f = document.getElementsByClassName("form-control");
        for (let i = 0; i < f.length; i++) {
            f[i].disabled = true;
        }
        document.getElementById("id_tag").disabled = true;
}
export default delete_set;