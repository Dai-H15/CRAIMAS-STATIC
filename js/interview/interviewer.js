const interviewer = {
    "p_save":p_save,
    "init": init,
}

export default interviewer

async function p_save(){
    const s = document.querySelector('form');
    const url = s.action;
    const formData = new FormData(s);
    let toastBootstrap;
    const init = {
        method: "POST",
        body: formData
    }
    const res = await fetch(url,init);
    const data = await res.json();
    if (res.ok) {
        console.log(data.status);
        const toast = document.getElementById('status-toast');
        if (data.status =="OK"){
            if(data.reason === "registered"){
                window.location.href = data.redirect_to;
            }
        toast.className = "toast bg-info";
         toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
        document.getElementById('toast-status').innerHTML = `保存しました 情報: ${data.reason}`;
        toastBootstrap.show();
    }else if (data.status == "ERROR"){
            toast.className = "toast bg-danger";
             toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
            document.getElementById('toast-status').innerHTML = `保存に失敗しました。  理由:  ${data.reason}  <br>エラー項目: ${data.error_list}` ;
            toastBootstrap.show();
        }else{
            document.body.innerHTML = data.reason;
        }
    }else{
        const toast = document.getElementById('status-toast');
        toast.className = "toast bg-danger";
         toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
        document.getElementById('toast-status').innerHTML = `保存に失敗しました。  理由:  ${res.statusText}` ;
        toastBootstrap.show();
    };
    };

function init(){
    window.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('form');
        form.onsubmit = ()=>{t_save(); return false};
        ;
    });
}