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
            <h4>${work.title}</h4>
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


