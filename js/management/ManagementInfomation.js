const ManagementInfomation = {
    "init": init
}


function init(){
    const addon = document.getElementById("infomation-addon");
    const ResetButton = document.createElement("button");
    ResetButton.onclick = () =>{
        let holder = document.getElementById("search-holder");
        let select = document.getElementById("search-select");
        holder.value = "";
        select.selectedIndex = 0;
        let rows = document.getElementsByName("data-rows");
        for(const element of rows){
                element.hidden = false
        }
    }
    ResetButton.className = "btn btn-secondary";
    ResetButton.innerText = "元に戻す";

    const SearchButton = document.createElement("button");
    SearchButton.onclick = () => {
        if(document.getElementById("search-select").selectedIndex == 0 || document.getElementById("search-holder").value == "")return
        let rows = document.getElementsByName("data-rows");
        for(const element of rows){
            let holder = document.getElementById("search-holder");
            let select = document.getElementById("search-select");
            if(!element.children[select.value].innerText.includes(holder.value)){
                element.hidden = true
            }
        }
        document.getElementById("search-holder").value = "";
        document.getElementById("search-select").selectedIndex = 0;
    }
    SearchButton.className = "btn btn-success";
    SearchButton.innerText = "絞り込む";
    addon.appendChild(SearchButton);
    addon.appendChild(ResetButton);
    }

export default ManagementInfomation;