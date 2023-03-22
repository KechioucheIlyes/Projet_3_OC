const mail = document.querySelector("#mail")
const mdp = document.querySelector("#mdp")
const btn = document.querySelector(".btn")

const denied_container = document.createElement("div")
denied_container.classList.add("hide")
const denied_text = document.createElement("p")
denied_text.innerHTML='<p style="color:red;"> Erreur dans l’identifiant ou le mot de passe </p>'
const authentification = document.querySelector(".authentification")
authentification.appendChild(denied_container)
denied_container.appendChild(denied_text)
const spinner = document.querySelector(".loader")
spinner.classList.add("hide")
const connexion = document.querySelector("#main_login")
connexion.classList.add("hide")





btn.addEventListener("click", ()=>{
    spinner.classList.remove("hide")
    denied_container.classList.add("hide")
    btn.classList.add("hide")
    const data = {
        email: mail.value ,
        password: mdp.value  
    }
    
    const option = {
        
        method :"POST", 
        body : JSON.stringify(data),
        headers :{
            "Content-Type" : 'application/json'
        }
        
        
        
    }
    fetch("http://localhost:5678/api/users/login" , option)
    .then(response => response.json())
    .then(data =>     
            {
                
            if (data.token){
                localStorage.setItem('myToken', data.token);
                document.location.href="homepage_edit.html";
                spinner.classList.remove("hide")
                denied_container.classList.add("hide")
                console.log(data)
                
            }
            else{
                spinner.classList.remove("hide")
                denied_container.classList.remove("hide")
                spinner.classList.add("hide")
                
            }

            }
        
        
        
        
        )
    

    

    

    
    /* if (mail.value != "sophie.bluel@test.tld" || mdp.value !="S0phie"){
        console.log(mail.value)
        console.log(mdp.value)
        console.log("no access")
        denied_container.classList.remove("hide")
        spinner.classList.add("hide")

    }else{
        console.log(mail.value)
        console.log(mdp.value)
        console.log("access")
        btn.classList.add("hide")
        spinner.classList.remove("hide")
        denied_container.classList.add("hide")
        setTimeout(()=>{
            document.location.href="homepage_edit.html";
        },2000)
        
        

    } */
})