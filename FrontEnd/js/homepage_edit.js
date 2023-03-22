

const token = localStorage.getItem("myToken")

console.log(token)

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
    if (datas.length ==0) {
        suppression_galerie.style.display = "none"
    }

    

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

            

    const dynamique_project_modal = document.querySelector(".dynamique_project_modal")
    // je recupere tout les data dans le localStorage pour ne pas abusé de l'api
    
    

    localStorage.setItem("allProject" , JSON.stringify(datas))

    
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

const modif = document.querySelector(".modif_project")
const myModal = document.querySelector(".modal")
const btn_close = document.querySelector(".close")
const suppression_galerie = document.querySelector(".supprimer_tout")
const modal_2 = document.querySelector("#myModalBtnAdd")

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
            prev.addEventListener("click" , ()=>{
                modal_2.style.display="none"
                myModal.style.display = "block"
                title.value =""
                img_select_category.value = ""
                img_prev.value = ""

            })
            

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
            
            
            
        });


            function updateButtonState() {
                if (condition1 && condition2 && condition3) {
                    senReqBody.disabled = false;
                    senReqBody.classList.remove("senReqBody")
                } else {
                    senReqBody.disabled = true;
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
            
                fetch('http://localhost:5678/api/works' ,options )
                .then(res => res.json())
                .then(data => console.log(data))
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






    

    
    
    
    
    
    
    
    





