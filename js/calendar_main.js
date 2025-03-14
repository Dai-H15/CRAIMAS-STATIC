const calendar_main = {
    "init":init,
    "get_calendar": get_calendar,
    "new_task": new_task,
    "STATIC_URL": ""
}

function init(url){
    calendar_main.STATIC_URL = url
    let loading = document.getElementById("loading");
    window.onload = async function get_init_calendar(){
        loading.style = "visibility:visible";
        let month = parseInt(document.getElementById("month").textContent);
        let year = parseInt(document.getElementById("year").textContent);
        let active = "active";
        let table = document.getElementsByTagName("table")[0];
        let newUrl = url.replace("month", month).replace("year", year).replace("status", active);
        let res = await fetch(newUrl)
        let data = await res.text();
        table.innerHTML = data;
        loading.style = "visibility:hidden";
    }
    let checkbox = document.getElementById("calendar-check");
    checkbox.addEventListener("click", ()=>{
            get_calendar('z')
    })
    document.getElementById("select-company").addEventListener("change", ()=>{
        get_calendar("s")
    })
}
    async function get_calendar(to){
        let url = calendar_main.STATIC_URL;
        loading.style = "visibility:visible";
        let contentMonth = document.getElementById("month");
        let contentYear = document.getElementById("year");
        let month = parseInt(document.getElementById("month").textContent);
        let year = parseInt(document.getElementById("year").textContent);
        let search = document.getElementById("select-company").selectedOptions[0].value;
        let checkbox = document.getElementById("calendar-check");
        let active = "deactive";
        if (to == "n"){
            if(1<= month && month <12){
                month += 1;
            }else{
                month = 1;
                year += 1;
            };
        }else if(to == "s" || to== "z"){
            if(search != 0){
                url = url.replace("search", search)
            }
        }
        else if(to == "b"){
            if(1< month && month <=12){
                month -= 1;
        }else{
            month = 12;
            year -= 1;
        }}
        ;
        contentMonth.textContent = month;
        contentYear.textContent = year;
        if(!checkbox.checked){
            active = "active"
        }
        let table = document.getElementsByTagName("table")[0];
        url = url.replace("month", month).replace("year", year).replace("status", active);
        if(search != "0"){
            url = url.replace("search", search)
        }
        let response = await fetch(url);
        let data = await response.text();
        table.innerHTML = data;
        loading.style = "visibility:hidden";
    }
    function new_task(url){
        document.querySelector("select").addEventListener("change", (event)=>{move_to_interview_main(event)})

        document.getElementById("search-field").addEventListener("change", ()=> {
            const field = document.getElementById("search-field");
            const choices = document.getElementById("choices").children;
            for(const element of choices){
                if(!element.innerText.includes(field.value)){
                    element.hidden = true
                }else{
                    element.hidden = false
                }
            }
        })
        document.getElementById("button-addon").addEventListener("click", ()=> {
            const field = document.getElementById("search-field");
            field.value = "";
            const choices = document.getElementById("choices").children;
            for(const element of choices){
                element.hidden = false
            }
        })

        function move_to_interview_main(event){
            if(event.target.selectedIndex === 0){return}
            const target = event.target.selectedOptions[0];
            Main.default.open_as_window.open_as_window(url.replace("placeholder", target.value), "new_task_tab", 500,1000);
        }
    }

export default calendar_main;