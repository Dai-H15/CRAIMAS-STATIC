const interview = {
    "init":init,
    "open_url": open_url,
    "delete_interview":delete_interview,
    "search_zipcode":search_zipcode,
    "open_interviewer":open_interviewer,
    "t_save":t_save,
    "ai_loading_change":ai_loading_change,
    "get_note_summary":get_note_summary,
    "id_autosave": "initialized",
}
import open_as_window from "../open_as_window";
function open_url(id,name,width,height){
    let url = document.getElementById(id).value;
    let toastBootstrap;
    if (!(URL.canParse(url))){
        const toast = document.getElementById('status-toast');
        toast.className = "toast bg-danger";
        toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
        document.getElementById('toast-status').innerHTML = `表示に失敗しました<br>http または https から始まるURLを入力してください` ;
        toastBootstrap.show();
    }else{
        open_as_window.open_as_window(document.getElementById(id).value,name,width,height);
    };
};

function search_zipcode(k){
    let zipcode = document.getElementById('id_zipcode').value;
    let d_url = k
    let url = d_url.replace('placeholder', zipcode);
    wind3 = window.open(`${url}`, "get_address", "width=400,height=400,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes");

};

function open_interviewer(user_url){
    let interviewer_name = document.getElementById("id_interviewer").value;
    if(!interviewer_name.trim()){
        let toastBootstrap
        const toast = document.getElementById('status-toast');
        toast.className = "toast bg-danger";
        toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
        document.getElementById('toast-status').innerHTML = `表示に失敗しました<br>検索・登録したい担当者名を入力してください。` ;
        toastBootstrap.show();
        return
    }
    open_as_window.open_as_window(user_url.replace("interviewer_name", document.getElementById("id_interviewer").value), "interviewer_view",500,600);
};

async function t_save(autosave){
    const url = document.getElementById("interview-form").action;
    const s = document.getElementById("interview-form");
    const formData = new FormData(s);
    let res;
    let data;
    let toast = document.getElementById('status-toast');
    let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);

    const init = {
        method: "POST",
        body: formData
    }
    try{
        res = await fetch(url,init);
        data = await res.json();
    }catch{
        
        if(interview.id_autosave != "initialized"){
            const time_toast = document.getElementById('time-toast');
            const time_toastBootstrap = bootstrap.Toast.getOrCreateInstance(time_toast);
            time_toast.className = "toast bg-danger";
            document.getElementById("auto-save-check").checked = false;
            disable_autosave();
            time_toastBootstrap.show()
            }
        toast.className = "toast bg-danger";
        document.getElementById('toast-status').innerHTML = `保存に失敗しました。ネットワーク接続を確認してください。`;
        toastBootstrap.show();
        
    }

    if (data.is_saved) {
        if(autosave === false){
            toast = document.getElementById('status-toast');
            toast.className = "toast bg-info";
            toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
            document.getElementById('toast-status').innerHTML = `保存しました  保存時刻${data.saved_time.slice(0,8)}`;
            toastBootstrap.show();
        }else{
            document.getElementById('time-toast-status').innerHTML = `最終保存時刻: ${data.saved_time.slice(0,8)}`;
        }
    }else{
        toast = document.getElementById('status-toast');
        toast.className = "toast bg-danger";
        toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
        document.getElementById("auto-save-check").checked = false;
        disable_autosave();
        document.getElementById('toast-status').innerHTML = `保存に失敗しました。 <br> 理由:  ${data.errors}` ;
        toastBootstrap.show();
    }
    

};
async function delete_interview(url){
    if(window.confirm("本当に削除しますか？") == false){
        return;
    }else{
    let res = await fetch(url);
    if (res.ok){
        document.getElementById('form-container').innerText = await res.text();
        }
    }}

function enable_autosave(){
    const toast = document.getElementById('status-toast');
    toast.className = "toast bg-success";
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
    document.getElementById('toast-status').innerHTML = "自動保存が有効化されました";
    toastBootstrap.show();

    const time_toast = document.getElementById('time-toast');
    time_toast.className = "toast bg-info";
    const time_toastBootstrap = bootstrap.Toast.getOrCreateInstance(time_toast);
    document.getElementById('time-toast-status').innerHTML = "最後に自動保存された時刻が表示されます";
    time_toastBootstrap.show();

    interview.id_autosave =  setInterval(() =>{t_save(true)}, 30000)
    }
function disable_autosave(){
    clearInterval(interview.id_autosave);
    const toast = document.getElementById('status-toast');
    toast.className = "toast bg-secondary";
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
    document.getElementById('toast-status').innerHTML = "自動保存が無効化されました";
    toastBootstrap.show();

    const time_toast = document.getElementById('time-toast');
    const time_toastBootstrap = bootstrap.Toast.getOrCreateInstance(time_toast);
    time_toastBootstrap.hide();


}
function init(){
    let wind3;
    window.addEventListener('beforeunload', function(){
        if (wind3){
            wind3.close();
        }
        window.opener.location.reload();
        });

        let s = document.getElementById("auto-save-check");
        s.addEventListener("click", () => {
            if(s.checked){
                enable_autosave()
            }else{
                disable_autosave()
            }
        })
}
function ai_loading_change(){
    let aiButton = document.getElementById("ai-button");
    let loadingText = document.getElementById("ai-status-loading-text");
    let loadingSpin = document.getElementById("ai-status-loading-spin");
    let waitingStatus = document.getElementById("ai-status-waiting");
    const status = waitingStatus.hidden;
    loadingText.hidden = status;
    loadingSpin.hidden = status;
    aiButton.disabled = !status;
    waitingStatus.hidden = !status;
}
async function get_note_summary(){
    const config = document.getElementById("config");
    const url = config.action;
    const formData = new FormData(config);
    let toast = document.getElementById('status-toast');
    let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
    const summary = document.getElementById("id_summary");
    try{
        await Main.default.interview.t_save(false);
    }catch{
        return
    };
    const init = {
        method: "POST",
        body:formData
    }
    try{
        ai_loading_change()
        let res = await fetch(url, init);
        let data = await res.json();
    if(data.status === "error"){
        ai_loading_change();
        toast = document.getElementById('status-toast');
        toast.className = "toast bg-danger";
        toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
        document.getElementById('toast-status').innerHTML = data.reason ;
        toastBootstrap.show();
    }
    if(data.status === "NG"){
        toast = document.getElementById('status-toast');
        toast.className = "toast bg-danger";
        toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
        document.getElementById('toast-status').innerHTML = data.reason ;
        toastBootstrap.show();
    }
    if(data.status === "ok"){
        ai_loading_change();
        toast = document.getElementById('status-toast');
        toast.className = "toast bg-success";
        toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
        document.getElementById('toast-status').innerHTML = data.reason ;
        toastBootstrap.show();
        summary.value = `
-----
要約
-----
${data.result.summary}\r\n

-----
アドバイス
-----
${data.result.advice}\r\n
`

    }}catch{
        ai_loading_change()
        toast = document.getElementById('status-toast');
        toast.className = "toast bg-danger";
        toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
        document.getElementById("auto-save-check").checked = false;
        toastBootstrap.show();
        return
    }


}
export default interview;
