
const detail = {
    "t_save":t_save,
    "init":init,
    "open_window": open_window,
    "id_autosave": "initialized",
}

function open_window(url, name, width, height){
    window.open(`${url}`, `${name}`, `width=${width},height=${height},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`)
    return true;
}

async function t_save(autosave){
    const url = document.getElementById("ESmodel-form").action;
    const s = document.getElementById("ESmodel-form");
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
        
        if(detail.id_autosave != "initialized"){
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

    if (data.is_saved == "OK") {
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

    detail.id_autosave =  setInterval(() =>{t_save(true)}, 30000)
    }
function disable_autosave(){
    clearInterval(detail.id_autosave);
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
        let s = document.getElementById("auto-save-check");
        s.addEventListener("click", () => {
            if(s.checked){
                enable_autosave()
            }else{
                disable_autosave()
            }
        })
}

export default detail;