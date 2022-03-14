function searchUser(){
    var username = document.getElementById("searchId").value;
    fetch(`https://api.github.com/users/${username}`)
        .then(r => {
            return r.json();
        })
        .then(r => {
            moreInfo(r.starred_url, r.subscriptions_url, r.type);
        })
        .catch(err => console.error(err));

}

function moreInfo(dataA, dataB, dataC){
    alert(
        `starred_url: ${dataA}\n subscriptions_url: ${dataB}\n type: ${dataC}\n`
    );
}