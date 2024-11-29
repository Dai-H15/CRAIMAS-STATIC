const ESdata = {
    "get_detail": get_detail,
    "save_check": save_check,
    "all_clear": all_clear
}
function crteateESModelTemplate(data, date){
    let resultStr = ""
    resultStr+= "\n==============\n"
    resultStr+= `\n登録日時 \n${date}\n`
    resultStr+= `\nタイトル \n${data.title}\n`
    resultStr+= `\nタグ \n${data.tag}\n`
    resultStr+= `\n詳細 \n${data.desc}\n`
    resultStr+= "<<<ここにメモを記入してください>>>\n"
    resultStr+= "\n==============\n"
    return resultStr
}
async function get_detail(url){
    let holder = document.getElementById("ES_detail");
    holder.innerHTML =  '<div class="row"><div class="spinner-border text-success mx-auto text-center" role="status" id = "loading"><span class="visually-hidden">Loading...</span></div></div>';
    let res = await fetch(url)
    let data = await res.text()
    holder.innerHTML = data;
    let f = document.getElementsByClassName("form-control");
    for (let i = 0; i < f.length; i++) {
        f[i].disabled = true;
    }
    document.getElementById("id_tag").disabled = true;
    }

async function all_clear(url){
    let form = document.getElementById("ESForm");
    let clear_input = document.createElement("input");
    clear_input.type = "hidden";
    clear_input.name ="all_clear";
    form.appendChild(clear_input);
    await save_check(url);
}

async function save_check(url){
    let inputs = document.getElementsByClassName("selectData");
    let checked = [];
    for(const element of inputs){
        if(element.checked){
            checked.push(element.value)
        }
    }
    let form = document.getElementById("ESForm");
    let formData = new FormData(form);
    formData.append('selected_data', JSON.stringify(checked));
    let res = await fetch(url, {
        method: 'POST',
        body: formData
    });
    if (res.ok) {
        let data = await res.json()
        let sets = data["sets"]
        let opener_window = window.opener.document.getElementById("id_note");
        for(let s = 0;s<sets.length;s++){
            opener_window.value+=crteateESModelTemplate(sets[s], data["date"]);
        }
        alert(data["message"]);
        window.location.reload();
    } else {
        alert('エラーが発生しました。ネットワークを確認してください');
    }
}

export default ESdata;