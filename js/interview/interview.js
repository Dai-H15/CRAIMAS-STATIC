const interview = {
    "init":init,
    "open_url": open_url,
    "delete_interview":delete_interview,
    "search_zipcode":search_zipcode,
    "open_interviewer":open_interviewer,
    "t_save":t_save,
    "ai_loading_change":ai_loading_change,
    "get_note_summary":get_note_summary,
    "close_window": close_window,
    "exit_url": "",
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
        toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
        document.getElementById("auto-save-check").checked = false;
        disable_autosave();
        toast.className = "toast bg-danger";
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
function init(url){
    const session_id = document.getElementById("interview_session_code").value;
    interview.exit_url = url.replace("placeholder", session_id);
    window.addEventListener("beforeunload", async (event) =>{
        event.preventDefault();
        event.returnValue = '';
        await close_window();
        window.opener.location.reload();
    })
    //開始日時変更時に自動で終了時刻がセットされる
    let date = document.getElementById("id_date");
    date.addEventListener("change", () => {
    let end_date = document.getElementById("id_end_date");
    end_date.value = date.value;
    })
    //GoogleCalendar連携
    let GoogleCalendar = document.getElementById("GoogleCalendar")
    GoogleCalendar.addEventListener("click", () =>{
        Main.default.interview.t_save(false);
        let baseURL = "https://www.google.com/calendar/event"
        let title = document.getElementById("id_title");
        let note  = document.getElementById("id_note");
        let place = document.getElementById("id_place");
        let start = document.getElementById("id_date");
        let Event_URL = document.getElementById("id_Event_URL");
        let company_name = document.getElementById("company_name");
        let interviewer = document.getElementById("id_interviewer");
        let start_date_utc = new Date(start.value).toISOString().replace(/-|:|\.\d\d\d/g, "");
        let start_time_formatted = start_date_utc.split(".")[0] + "Z";
        let end = document.getElementById("id_end_date");
        let end_date_utc = new Date(end.value).toISOString().replace(/-|:|\.\d\d\d/g, "");
        let end_time_formatted = end_date_utc.split(".")[0] + "Z";
        if (start_date_utc > end_date_utc){
            const toast = document.getElementById('status-toast');
            toast.className = "toast bg-danger";
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
            document.getElementById('toast-status').innerHTML = "面談開始日時と面談終了日時の組み合わせが不正です<br><br>面談終了日時は面談開始日時よりも未来の日付である必要があります";
            toastBootstrap.show();
            return 1
        }
        let params = new URLSearchParams({
            action: 'TEMPLATE',
            text: `${company_name.innerText}: ${title.value}`,
            dates: `${start_time_formatted}/${end_time_formatted}`,
            details: `CRAIMASにより追加されました。 \r\n 面談録: ${window.location.href}\r\n\r\n 担当面接官: ${interviewer.value}\r\n\r\n___面談メモ___\r\n${note.value}\r\n_______________\r\n\r\n${"イベントURL: " + Event_URL.value ? Event_URL.value : ""}`,
            location: place.value,
            trp: 'false',
        });
        Main.default.open_as_window.open_as_window(`${baseURL}?${params.toString()}`, "GoogleCalendar", "800", "1000");
    })


    let s = document.getElementById("auto-save-check");
        s.addEventListener("click", () => {
            if(s.checked){
                enable_autosave()
            }else{
                disable_autosave()
            }
        })
}
async function close_window(){
    let s = document.getElementById("auto-save-check");
    if(s.checked){
        disable_autosave()
    }
    let status = document.getElementById("status-toast");
    let time = document.getElementById("time-toast");
    status.hidden = true;
    time.hidden = true;
    const res = await fetch(interview.exit_url);
    const data = await res.text()
    let view_container = document.getElementById("form-container")
    view_container.innerHTML = data;
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
