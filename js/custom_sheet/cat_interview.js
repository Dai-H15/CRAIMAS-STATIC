const cat_interview = {
    "init": init
}

function init(){
    document.getElementById('choice').addEventListener('change', ()=>{
        const val = document.getElementById('choice').selectedOptions[0].value;
        window.location.href = val;
    });
}

export default cat_interview;