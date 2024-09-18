const footer = {
    "init": init
}

function init(){
    if(Main.default && typeof Main.default.version !== "undefined"){
        document.getElementById("js_version").innerText = `Library version:  ${Main.default.version}`;
    }
}

export default footer;

