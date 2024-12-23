const download = {
    "init": init,
}

async function main(url){
    const a = document.createElement('a');
    a.href = url;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);

}
function init(url){
    setTimeout(()=>{
        main(url)
    }, 3500)
}

export default download;