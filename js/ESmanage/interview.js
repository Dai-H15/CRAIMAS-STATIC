const interview = {
    "init": init
}

async function get_interview(url, checked){
    let interview_result = document.getElementById("interview_result");
    interview_result.innerHTML = "";
    let status_spinner = document.getElementById("status_spinner");
    status_spinner.hidden = false;
    if (checked === false){
        url=url.replace("placeholder", "act");
    }else{
        url=url.replace("placeholder", "oth");
    }
    let res = await fetch(url);
    let data = await res.text();
    interview_result.innerHTML = data;
    status_spinner.hidden = true;
}
function init(url){
    let checkbox = document.getElementById("isActive_check");
    checkbox.addEventListener("change", (e)=>{
        get_interview(url, e.target.checked)
    })
    get_interview(url, false);
}

export default interview;