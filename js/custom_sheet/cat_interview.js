const cat_interview = {
    "init": init
}

function init(){
    document.getElementById('choice').addEventListener('change', ()=>{
        const val = document.getElementById('choice').selectedOptions[0].value;
        const safeVal = escapeHTML(val);
        window.location.href = safeVal;
    });
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

export default cat_interview;