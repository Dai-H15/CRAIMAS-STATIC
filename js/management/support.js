const support ={
    "init":init,
    "get_ticket": get_ticket,
    "get_detail": get_detail,
    "change_is_solved": change_is_solved,
    "selected": []
}

async function init(url){
    const choice = document.getElementById("id_choices");
    get_ticket("init", url);
    choice.addEventListener("change", ()=>{
        get_ticket(choice.value,url);
    });
}
async function get_ticket(select, url){
        const table = document.getElementById("support_table");
        table.innerHTML = '<div class="row"><div class="spinner-border text-success mx-auto text-center" role="status" id = "loading"><span class="visually-hidden">Loading...</span></div></div>';
        url = url.replace("holder", select);
        let res = await fetch(url);
        let html = await res.text();
        table.innerHTML = html;
}


async function get_detail(form_id, url){
        const selected = support.selected;
        for (let i = 0; i < selected.length; i++) {
            const item = support.selected.pop();
            const tr = document.getElementById(item.id);
            tr.style = "";
            tr.className = item.className;
        }
        const tr = document.getElementById("tr_"+form_id);
        tr.style = "background-color:#fccaf9 ";
        support.selected.push({"id": `tr_${form_id}`, "className": tr.className});
        tr.className = "selected";
        let form = document.getElementById("form_"+form_id);
        const formData = new FormData(form);
        const init = {
            method: "POST",
            body: formData
        }
        const res = await fetch(url, init);
        const data = await res.text();
        const detail = document.getElementById("support_detail");
        detail.innerHTML = data;
}

async function change_is_solved(form_id, url){
        let form = document.getElementById("form_"+form_id);
        const formData = new FormData(form);
        const init = {
            method: "POST",
            body: formData
        }
        const res = await fetch(url, init);
        if(res.ok){
            window.location.reload();
        }
}

export default support;