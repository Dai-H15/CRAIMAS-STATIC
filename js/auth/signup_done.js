const signup_done ={
    "d": redirect_to_home
}

function redirect_to_home(){
    if(window.confirm('メールの送信を行わないと、アカウントの有効化が行われません。この画面は再度表示できることができませんがよろしいですか？')){
        window.parent.document.location.reload()
    }
}
export default signup_done;
