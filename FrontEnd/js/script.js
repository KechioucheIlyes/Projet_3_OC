var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

/*

|--------------------------------------------------------------------------|
|   1. function pour                                                       | 
|   1. function pour                                                       |
|--------------------------------------------------------------------------|
*/



fetch("http://localhost:5678/api/categories", requestOptions)
  .then(response => response.json())
  .then(result => {

    let defaultCat = { id: 0, name: "tous" }
    result.unshift(defaultCat)
    for (let data of result) {
      console.log(data)

      const projects = document.querySelector(".projects")
      const divCategoryName = document.createElement("div")

      divCategoryName.classList.add(`divCategoryName`)
      divCategoryName.classList.add(`${data.id}`)


      divCategoryName.setAttribute("onclick", `filterWorks(${data.id})`)
      divCategoryName.innerHTML = data.name

      
      projects.appendChild(divCategoryName)
    }

  })
  .catch(error => console.log('error', error));

/*
|--------------------------------------------------------------------------|
|   1. function pour                                                       | 
|   1. function pour                                                       |
|--------------------------------------------------------------------------|
*/

fetch("http://localhost:5678/api/works", {
  method: "GET",
  credentials: "same-origin",
  'Access-Control-Allow-Origin': '*'
})
  .then(response => response.json())
  .then(result => {

    worksFiltred(result);
    localStorage.setItem("works", JSON.stringify(result));


  })
  .catch(error => console.log(error));

/*
|--------------------------------------------------------------------------|
|   1. function pour                                                       | 
|   1. function pour                                                       |
|--------------------------------------------------------------------------|
*/
function worksFiltred(works) {
  const container_filter = document.querySelector(".container_filter");
  container_filter.innerHTML = ""; // Réinitialiser le contenu précédent de la galerie

  works.forEach(work => {
    const workElement = document.createElement("div");
    workElement.classList.add("work");
    workElement.innerHTML = `
            <div class ="containerCard">
            <img class="worksimg" src="${work.imageUrl}" alt="${work.title}" crossorigin="anonymous">
            <p>${work.title}</p>
            </div>
          `;
    container_filter.appendChild(workElement);
  });
}


/*
|--------------------------------------------------------------------------|
|   1. function pour                                                       | 
|   1. function pour                                                       |
|--------------------------------------------------------------------------|
*/

function filterWorks(id) {
  const localWorks = JSON.parse(localStorage.getItem("works"))

  if (id === 0) {
    
    worksFiltred(localWorks)
  } else {
    const ex = localWorks.filter(r => r.categoryId === id)
    worksFiltred(ex)
  }

}

      /*
      |--------------------------------------------------------------------------|
      |   1. function pour                                                       | 
      |   1. function pour                                                       |
      |--------------------------------------------------------------------------|
      */

const localWorks = JSON.parse(localStorage.getItem("works"))

const token = localStorage.getItem("myToken")


if(token){
  console.log(token)
  const log = document.querySelector("#log")
  log.innerHTML = "logout"
  log.removeAttribute("href")
  log.classList.add("logout")

  const edits = document.querySelector(".edits")
  edits.style.display = "block"

  const container_edit_text = document.querySelector(".container_edit_text")
  container_edit_text.style.display = "block"

  const projects = document.querySelector(".projects")
  projects.style.display = "none"

  const container_filter = document.querySelector(".container_filter")
  container_filter.style.display = "none"

  const container_edit = document.querySelector(".container_edit")
  container_edit.style.display = "block"

  
  
const modif = document.querySelector(".modif_project")
const myModal = document.querySelector(".modal")
const btn_close = document.querySelector(".close")
const suppression_galerie = document.querySelector(".supprimer_tout")
const modal_2 = document.querySelector("#myModalBtnAdd")


const url = "http://localhost:5678/api/works"

const optionDelete = {
        
    method :"DELETE", 
    headers : {
        Authorization : `Bearer ${token}`
    }
}

fetch (url)
.then(response => response.json())
.then(datas => {
    const project_container = document.querySelector("#project_container")
    const dynamique_project_modal = document.querySelector(".dynamique_project_modal")
    if (datas.length ==0) {
        suppression_galerie.style.display = "none"
    }
    let cardCount = 0;
    
    console.log(datas[0])
    
    for (let data of datas){
        
        //main dashbord dynamic works
        const card = document.createElement("div")
        card.style.border ="1px solid black"
        const img = document.createElement("img")
        const title = document.createElement("p")
        img.crossOrigin="anonymous"
        img.src = data.imageUrl
        img.style.height = "413px"
        img.style.margin = "7px"
        title.innerText = data.title
        
        card.appendChild(img)
        card.appendChild(title)
        project_container.appendChild(card)


        // Modal dynamic works

        console.log(data.id)
        
        
        
            

    
    // je recupere tout les data dans le localStorage pour ne pas abusé de l'api
    
    localStorage.setItem("allProject" , JSON.stringify(datas))

    cardCount++;
    const modal_card = document.createElement('div')
    modal_card.classList.add("container_card")

    const img_modal = document.createElement("img")
    img_modal.crossOrigin="anonymous"
    img_modal.src = data.imageUrl
    
    const img_move = document.createElement("img")
    img_move.src = "./assets/icons/corbeille.png"
    img_move.classList.add("move_class")

    
    const text_edit_img = document.createElement("p")
    text_edit_img.innerText="éditer"
    
    modal_card.appendChild(img_modal)
    modal_card.appendChild(img_move)
    modal_card.appendChild(text_edit_img)
    dynamique_project_modal.appendChild(modal_card) 
    
    if (cardCount === 1) {
        const img_remove = document.createElement("img")
        img_remove.src="./assets/icons/Move.png"
        img_remove.classList.add("move_class2")
        modal_card.appendChild(img_remove)

    }


    // ICON QUI SERT A SUPPRIMER LES IMAGES DANS LE MODAL 

    img_move.addEventListener("click" , (e)=>{
        const token = localStorage.getItem("myToken")
        

        e.preventDefault()

        let ids = data.id 
        // FETCH DELETE ITEMS 

        fetch (`http://localhost:5678/api/works/${ids}` , optionDelete)
        .then(response => {
            if (response.ok){
                modal_card.remove(card)
                card.remove(card)
                
            }
            else{
                
                alert(`${data.title} n'a pas pu être supprimé ❌ `) 
            }

        }).catch(error => console.error(error))
    })


    }

})

const loc = JSON.parse( localStorage.getItem("allProject"))


modif.addEventListener("click", (e)=>{
    
    myModal.style.display = "block"
    const modal_btn = document.querySelector("#modal_btn")
    


    modal_btn.addEventListener("click", async (e)=>{
        e.preventDefault()
        console.log("c bn")
        const modal_2 = document.querySelector("#myModalBtnAdd")
        const close_2 = document.querySelector(".close_2")
        const ajouter_photo = document.querySelector(".add_pic")
        
        const Mo_max = document.querySelector(".Mo_max")
        modal_2.style.display="block"
        myModal.style.display = "none"

        // BUTTON CLOSE SECOND MODAL
        close_2.addEventListener("click", ()=>{
            modal_2.style.display="none"
        })
        // WINDOW CLOSE SECOND MODAL 

        window.addEventListener("click", (e)=>{
            if (e.target == modal_2){
                modal_2.style.display="none"
            }
        })
        const senReqBody = document.querySelector("#senReqBody")


        let condition1 = false;
        let condition2 = false;
        let condition3 = false;


        const title = document.querySelector(".titre_input")
        const img_select_category = document.querySelector("#projets")

            title.addEventListener("change" , ()=>{
                console.log(title.value)
                if (title.value == ""){
                    condition1 = false
                    console.log(condition1)
                }
                else{
                    condition1 = true
                    console.log(condition1)
                }
                updateButtonState();
            })

            const prev = document.querySelector(".prev")
            const files_input = document.querySelector("#files_input")
            

            img_select_category.addEventListener("change", ()=>{
                console.log(img_select_category.value)
                if (img_select_category.value == ""){
                    condition2 = false
                    console.log(condition2)
                }
                else{
                    condition2 = true
                    console.log(condition2)
                }
                updateButtonState();
            })
        
            ajouter_photo.addEventListener("click", (e)=>{
            
            e.stopPropagation()
            const img_prev = document.querySelector(".empty_pic")
            
            files_input.click()

            files_input.addEventListener('change', () => {
                
                const selectedFile = files_input.files[0];
                console.log(selectedFile);
                if (selectedFile && selectedFile.type.includes('image')) {
                    // Créez un objet URL à partir du fichier sélectionné
                    const objectURL = URL.createObjectURL(selectedFile);
                    ajouter_photo.style.display = "none"
                    Mo_max.style.display = "none"
                    // Affichez l'image dans l'élément img
                    img_prev.src = objectURL; 
                }
                if (files_input.value == ""){
                    condition3 = false
                    console.log(condition3)
                }
                else{
                    condition3 = true
                    console.log(condition3)
                }
                updateButtonState();
            });
            
            prev.addEventListener("click" , ()=>{
                modal_2.style.display="none"
                myModal.style.display = "block"
                title.value =""
                img_select_category.value = ""
                files_input.value = null; 
                URL.revokeObjectURL(img_prev.src); 
                img_prev.src = "./assets/icons/Group.svg";
                ajouter_photo.style.display = "block";
                Mo_max.style.display = "block"
                senReqBody.disabled = true;
                senReqBody.classList.add("senReqBody")

            })
            
        });


            function updateButtonState() {
                if (condition1 && condition2 && condition3) {
                    senReqBody.disabled = false;
                    senReqBody.classList.remove("senReqBody")
                } else {
                    senReqBody.disabled = true;
                    senReqBody.classList.add("senReqBody")
                }
            }

            
            
            const forms = document.querySelector(".content_gallery-2")


            senReqBody.addEventListener("click", (e)=>{
                
                e.preventDefault()
                const formData= new FormData(forms)
                const headers = new Headers({
                    'Authorization' : `Bearer ${token}`,
                    'Accept' : 'application/json'
                })
                const options = {
                    method : 'POST', 
                    headers : headers,
                    body : formData
                }
            
                fetch(url ,options )
                .then(res => res.json())
                .then(data => {console.log(data)
                    
                    const project_container = document.querySelector("#project_container")
                    
                    const card = document.createElement("div")
                    card.style.border ="1px solid black"
                    const img = document.createElement("img")
                    const title = document.createElement("p")
                    img.crossOrigin="anonymous"
                    img.src = data.imageUrl
                    img.style.height = "413px"
                    img.style.margin = "7px"
                    title.innerText = data.title
                    
                    card.appendChild(img)
                    card.appendChild(title)
                    project_container.appendChild(card)
                
                    const dynamique_project_modal = document.querySelector(".dynamique_project_modal")
                    
       
                    const modal_card = document.createElement('div')
                    modal_card.classList.add("container_card")

                    const img_modal = document.createElement("img")
                    img_modal.crossOrigin="anonymous"
                    img_modal.src = data.imageUrl
                    
                    const img_move = document.createElement("img")
                    img_move.src = "./assets/icons/corbeille.png"
                    img_move.classList.add("move_class")

                    
                    const text_edit_img = document.createElement("p")
                    text_edit_img.innerText="éditer"
                    
                    modal_card.appendChild(img_modal)
                    modal_card.appendChild(img_move)
                    modal_card.appendChild(text_edit_img)
                    dynamique_project_modal.appendChild(modal_card) 
                    
                    

                    





                }
                
                )
                
                
                .catch(error => console.error(error))
                
            })

            
        })
        

        

    })

    
    

btn_close.addEventListener("click", ()=>{
    myModal.style.display = "none"
})

window.addEventListener("click", (e)=>{
    if(e.target == myModal){
        myModal.style.display = "none"
    }
})





// RECUPERATION DU TOKEN 


// RECUPERATION DU TOKEN 


    // FETCH RECUPERATION ITEMS 

  log.setAttribute("onclick", "logout()")
}

function logout(){
  localStorage.removeItem("myToken")
  document.location.reload()
  

}

function add(){

}