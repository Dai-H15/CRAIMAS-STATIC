const show = {
    "search": search,
    "init": init,
    "page": page,
}

async function search(from_url){
    let table = document.getElementById("post_list")
    table.innerHTML = '<div class="row"><div class="spinner-border text-success mx-auto text-center" role="status" id = "loading"><span class="visually-hidden">Loading...</span></div></div>';
    let search_str = document.getElementById("search_str").value;
    if (search_str.length ==0){
        alert("検索文字列を入力してください");
        return
    }
    let URL = from_url.replace("placeholder", document.getElementById("search_str").value)
    URL = URL.replace("page_num", 1)
    let res = await fetch(URL)
    let data = await res.text()
    table.innerHTML = data
}
async function init(url){
    let table = document.getElementById("post_list")
    table.innerHTML = '<div class="row"><div class="spinner-border text-success mx-auto text-center" role="status" id = "loading"><span class="visually-hidden">Loading...</span></div></div>';
    let res = await fetch(url)
    let data = await res.text()
    table.innerHTML = data
    document.getElementById("search_str").value = ""
}

async function page(from_url, page_num) {
    let table = document.getElementById("post_list")
    table.innerHTML = '<div class="row"><div class="spinner-border text-success mx-auto text-center" role="status" id = "loading"><span class="visually-hidden">Loading...</span></div></div>';
    let URL = from_url
        URL = URL.replace("page_num", page_num)
    let res = await fetch(URL)
    let data = await res.text()
    table.innerHTML = data
}
export default show;