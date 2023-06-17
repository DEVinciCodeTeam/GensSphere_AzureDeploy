validateCurrentUser();
// getJsonFromApi("forum1Posts.json");
// Objeto que almacena todos los objetos de datos creados dentro de las funciones
let allData = { id: "Semana1", postData: [] };




/*------------------------Animacion de los eventos del lado izquierdo------*/

// Lista aparece en orden con a animación
const listItems = document.querySelectorAll(".list-animation");



document.addEventListener("DOMContentLoaded", showItems); // DOMContentLoaded = Al cargarse la pagina

/*--------------------Recuperar la inforamacion del local storage---------------*/

document.addEventListener("DOMContentLoaded", () => {
  loadForumPosts("forum1Posts.json")
});
