const interview_create = {
    "init": init,
    "search_zipcode": search_zipcode,
    "get_interviewer": get_interviewer,
    "get_address_from_sheet": get_address_from_sheet
}
export default interview_create;
        function search_zipcode(d_url){
            let zipcode = document.getElementById('id_zipcode').value;
            if (zipcode.length < 7){
                alert('入力値を確認してください');
                return;
            }
            let url = d_url.replace('placeholder', zipcode);
            wind3 = window.open(`${url}`, "get_address", "width=400,height=400,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
    };

    async function get_interviewer(url){
        const init = {method: "get"};
        let res = await fetch(url, init);
        let data = await res.json();
        if(data.status == "OK"){
            document.getElementById('id_interviewer').value = data.interviewer;
        }else{
            document.body.innerHTML = data.res;
        }
        
    };
    async function get_address_from_sheet(url){
        if(confirm("「企業データ」シート内の所在地の情報を取得します。面談録内の住所が上書きされますがよろしいですか？")){
            const init = {method: "get"};
        let res = await fetch(url, init);
        let data = await res.json();
        if(data.status == "OK"){
            document.getElementById('id_place').value = data.location;
            document.getElementById('id_zipcode').value = data.postal_code;

        }else{
            document.body.innerHTML = data.res;
        }
        }
        
    };
function init(){
    let wind3;
    window.addEventListener('beforeunload', function(){
            if (wind3){
                wind3.close();
            }
        });
}