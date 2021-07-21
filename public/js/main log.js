const login= document.querySelector("#login")
const dashboardLink="/verify" // localhost server link
// default cred
// email  = admin@admin.com
// pass = admin


login.addEventListener('click',event=>{
    event.preventDefault()
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    // console.log(email+ password)
    if(email=="admin@admin.com" && password=="admin"){
        console.log("logged")
        window.location.href=dashboardLink
    }
    else{
        login.style.backgroundColor='red'
        login.innerHTML="Retry"
    }
    
})