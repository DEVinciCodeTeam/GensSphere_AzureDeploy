// const API_URL = "https://e818-200-68-187-97.ngrok-free.app";
const API_URL = "https://gen-sphere.azurewebsites.net";

const PERFIL_EDITABLE = API_URL.includes("localhost") || API_URL.includes("azure") ? "perfilEditable" : "perfileditable"
const PERFIL_USUARIO = API_URL.includes("localhost") || API_URL.includes("azure") ? "perfilUsuario" : "perfilusuario"
const PERFIL_EXTERNO = API_URL.includes("localhost") || API_URL.includes("azure") ? "perfilExterno" : "perfilexterno"

// In this file we grouped all the common functions used within the project
/*-------------- Reading elements ----------------*/
function changeHtmlElementsPropById(id, value, prop, testvalue = "none") {
  const element = document.getElementById(id);
  if (testvalue == "none") {
    if (element != null && value != undefined) {
      element[prop] = value;
    }
  } else {
    // if (element[prop] != testvalue) {

    if (element != null && value != undefined && element[prop] != testvalue) {
      element[prop] = value;
    } else if (value != undefined && element != null) {
      element[prop] = value;
    }
    // }
  }
}

function changeHtmlElementsPropByClass(clase, value, prop) {
  const element = document.getElementsByClassName(clase)
  if (element != null) {
    for (const subElement of element) {
      subElement[prop] = value;
    }
  }
}

function updateStorageObject(location, nameInLocation, newObjectVersion) {
  if (location == "local") {
    localStorage.setItem(nameInLocation, JSON.stringify(newObjectVersion));
  } else {
    sessionStorage.setItem(nameInLocation, JSON.stringify(newObjectVersion));
  }
}
const removeMessage = (elementId) => {
  const buttonRef = document.getElementById(elementId);
  buttonRef.style.display = "none";
}
const restoreMessage = (elementId) => {
  const buttonRef = document.getElementById(elementId);
  buttonRef.style.display = "inline";
}

function saveElementsOnObject(id, prop, objectToUpdate) {
  console.log("entro a la funcion")
  const element = document.getElementById(id).value.trim();

  if (element != null && objectToUpdate != "undefined") {
    console.log(objectToUpdate + " " + prop + " " + element)

    objectToUpdate[prop] = element;
    console.log("Entro al if de la funcion")
  }
}

function addPostToUserData(type, postData) {
  getJsonFromApi(getUserEmail()+".json");
  console.log(getUserEmail())
  let userPosts = JSON.parse(sessionStorage.getItem(getUserEmail().split(".")[0]));
  if (userPosts == undefined) { userPosts = {posts:[], replies:[]}}
  postData.postHeader[0]["post-header-replies"] = postData.replyData.length;

  if (type === 'post') {
    console.log("Entra al if")
    userPosts.posts.unshift(postData.postHeader[0]);
    sendJsonToApi(JSON.stringify(userPosts), getUserEmail()+".json")
    getJsonFromApi(getUserEmail()+".json");
  } else {
  userPosts.replies.unshift(postData.postHeader[0]);
  sendJsonToApi(JSON.stringify(userPosts), getUserEmail()+".json")
  getJsonFromApi(postData.postHeader[0]['userEmail']+".json");
  console.log(postData.postHeader[0]['userEmail'])
  const originalPostPerson = JSON.parse(sessionStorage.getItem(postData.postHeader[0]['userEmail'].split(".")[0]));
  originalPostPerson.posts.unshift(postData.postHeader[0]);
  sendJsonToApi(JSON.stringify(originalPostPerson), postData.postHeader[0]['userEmail']+".json")
  }
}

const convertStringToHTML = htmlString => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, 'text/html');

  return html.body;
}

function generateCardPost(userName, userPP, text, date, numRespuestas, type = "userPosts") {
  return `<div class="col-12 col-md-6 my-3 ${type}">
          <div class="blog_post">
            <div class="row" style="padding: 10px 0px;">
              <div class="col-3 my-3">
                <div class="img_pod2">
                  <img class="user-post-img"
                    src="${userPP}"
                    alt="random image">
                </div>
              </div>
              <div class="col-7 my-2" style="padding: 0px 23px;">
                <h1 class="user-post-title">${userName}</h1>
                <h3 class="post-date">${date}</h3>
              </div>
              <div class="col-2">
                <i class="bi bi-bookmark" style="font-size: 20px;"></i>
              </div>
            </div>
            <div class="container_copy">
              <div class="row">
                <div class="col-12">
                  <p id="post-content">${text}</p>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="col-12" style="padding: 0px;">
                  <button type="button" class="btn btn-primary" id="btn_primary">${numRespuestas} respuestas</button>
                </div>
              </div>
            </div>
          </div>
        </div>`
}



function placeCard(userName, userPP, text, date, numRespuestas, type) {
  console.log("Entramos a placeCard")
  const currentPosts = document.getElementsByClassName(type);

  const numOfCurrentPosts = currentPosts.length;
  let whereToPlaceCard;

  if (numOfCurrentPosts / 2 % 1 == 0) {
    whereToPlaceCard = (numOfCurrentPosts / 2)
  } else {
    whereToPlaceCard = Math.floor(numOfCurrentPosts / 2)
  }
  console.log(whereToPlaceCard)
  // const cardToAdd = convertStringToHTML(generateCardPost(userName, text, date, numRespuestas));
  // document.getElementsByClassName(`cardsRow ${whereToPlaceCard}`)[0].appendChild(cardToAdd);
  if (type === "userPosts") {
    document.getElementsByClassName(`cardsRow ${whereToPlaceCard}`)[0].innerHTML += generateCardPost(userName, userPP, text, date, numRespuestas);
  } else {
    console.log(document.getElementsByClassName(`cardsRowC ${whereToPlaceCard}`))
    console.log(whereToPlaceCard)
    document.getElementsByClassName(`cardsRowC ${whereToPlaceCard}`)[0].innerHTML += generateCardPost(userName, userPP, text, date, numRespuestas);
  }
}

function visualizeUserPosts() {
console.log("Entramos a visualize posts")
  if (!document.location.pathname.includes("perfilEditable")) {
    console.log("Pasamos perfil editable")
    let currentUser;
    if (document.location.pathname.includes("perfilExterno")) {
      console.log("Entramos a prfil externo")
      const identifiedPerson = JSON.parse(sessionStorage.getItem("friendProfile"));
      getJsonFromApi(identifiedPerson.userEmail+".json");
      currentUser = JSON.parse(sessionStorage.getItem("friendProfile")).userEmail;
      currentUserName = JSON.parse(sessionStorage.getItem("friendProfile")).userName;
    } else {
    console.log("Entramos a perfil usuario")
      const identifiedPerson = JSON.parse(sessionStorage.getItem("currentUser"));
      getJsonFromApi(identifiedPerson.userEmail+".json");
      currentUser = getUserEmail();
      currentUserName = JSON.parse(sessionStorage.getItem("currentUser")).userName;
    }
    console.log(currentUser)
    const userPosts = JSON.parse(sessionStorage.getItem(currentUser.split(".")[0]));
    console.log(userPosts)
    const approvedPostsText = [];
    const approvedPosts = [];
    for (let i = 0; i < userPosts.posts.length; i++) {
      console.log("Entramos al for")
      const post = userPosts.posts[i]
      if (!approvedPostsText.includes(post["post-header-text"])) {
      if (post["post-header-name"] == currentUserName){
      console.log("entramos al if")
        approvedPostsText.push(post["post-header-text"])
        approvedPosts.push(post)
        console.log([post])
        placeCard(post["post-header-name"], post["post-header-pp"], post["post-header-text"], post["post-header-date"], post["post-header-replies"], "userPosts")
        }
      }
      if (approvedPosts.length == 10) {
        break;
      }
    }

    sendJsonToApi(JSON.stringify(approvedPosts), currentUser + ".json")

  }
}

function visualizeCommentedPosts() {
  console.log("Entramos a visualize commented posts")
    if (!document.location.pathname.includes("perfilEditable")) {
      console.log("Pasamos perfil editable")
      let currentUser;
      if (document.location.pathname.includes("perfilExterno")) {
        console.log("Entramos a prfil externo")
        const identifiedPerson = JSON.parse(sessionStorage.getItem("friendProfile"));
        getJsonFromApi(identifiedPerson.userEmail+".json");
        currentUser = JSON.parse(sessionStorage.getItem("friendProfile")).userEmail;
      } else {
      console.log("Entramos a perfil usuario")
        const identifiedPerson = JSON.parse(sessionStorage.getItem("currentUser"));
        getJsonFromApi(identifiedPerson.userEmail+".json");
        currentUser = getUserEmail();
      }
      console.log(currentUser)
      const userPosts = JSON.parse(sessionStorage.getItem(currentUser.split(".")[0]));
    const approvedPostsText = [];
    const approvedPosts = [];
    for (let i = 0; i < userPosts.replies.length; i++) {
      const post = userPosts.replies[i]
      if (!approvedPostsText.includes(post["post-header-text"])) {
        approvedPostsText.push(post["post-header-text"])
        approvedPosts.push(post)
        console.log([post])
        placeCard(post["post-header-name"], post["post-header-pp"], post["post-header-text"], post["post-header-date"], post["post-header-replies"], "userReplies")
      }
      if (approvedPosts.length == 10) {
        break;
      }
    }
    sendJsonToApi(JSON.stringify(approvedPosts), currentUser+ ".json")
  }
}

// exporta la función previamente declarada
/* export { changeHtmlElementsPropById, changeHtmlElementsPropByClass, updateStorageObject, removeMessage, restoreMessage, saveElementsOnObject}; */

function buscarPorCorreo(userEmail) {
  const allUsers = JSON.parse(localStorage.getItem("allUsers"));
  const resultados = Object.values(allUsers).filter(user => user.userEmail.toLowerCase().includes(userEmail.toLowerCase()));
  return resultados;
}

if (document.location.pathname.includes(PERFIL_EXTERNO) || document.location.pathname.includes(PERFIL_USUARIO)) {

  const buscarUsuarios = document.getElementById("buscarUsuarios");

  buscarUsuarios.onsubmit = function(e) {
    e.preventDefault();
    const searchInput = document.getElementById("searchInput").value.trim();
    if (searchInput !== "") {
      getFriendProfile(searchInput);
    } else {
      // alert("El correo que incregaste no corresponde a algun usuario registrado")
      alert("Ingresa un correo por favor")
    }


  }
}
function getUserPP() {
  temporalCurrentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  return temporalCurrentUser.userProfilePicture
}

function getUserEmail() {
  temporalCurrentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  return temporalCurrentUser.userEmail
}

function transformDates(date) {
  const dateArray = date.split("-")

  const monthsToString = {
    "01": "Enero",
    "02": "Febrero",
    "03": "Marzo",
    "04": "Abril",
    "05": "Mayo",
    "06": "Junio",
    "07": "Julio",
    "08": "Agosto",
    "09": "Septiembre",
    "10": "Octubre",
    "11": "Noviembre",
    "12": "Diciembre",
  }
  return (monthsToString[dateArray[1]] + ", " + dateArray[0])
}

const cyrb53 = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};


function sendUserToApi(currentUser) {

  console.log("enviando objeto");

  $.ajax({
    url: `${API_URL}/api/save`,
    headers: {
      'ngrok-skip-browser-warning': 'true'
    },
    contentType: "application/json",
    type: "POST",
    data: JSON.stringify(currentUser),
    dataType: "json",
    success: () => {
      console.log("Usuario registrado");
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Error enviando usuario a la api")
    }
  });
}

function userSignUpApi(currentUser) {

  console.log("enviando objeto");

  $.ajax({
    url: `${API_URL}/api/save`,
    headers: {
      'ngrok-skip-browser-warning': 'true'
    },
    contentType: "application/json",
    type: "POST",
    data: JSON.stringify(currentUser),
    dataType: "json",
    success: () => {
      console.log("Usuario registrado");
      restoreMessage("singUpSuccesful");
      removeMessage("incomplitedFields");
      removeMessage("repeatedEmail");
      document.getElementById("userName").value = "";
      document.getElementById("userEmail").value = "";
      document.getElementById("userCohorte").value = "";
      document.getElementById("userPassword").value = "";
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Ya existe un registro con ese correo")
      restoreMessage("repeatedEmail");
      removeMessage("incomplitedFields");
      removeMessage("singUpSuccesful");
    }
  });
}


function userSignInApi(userEmail, userPassword) {

  console.log("obteniendo objeto");

  $.ajax({
    url: `${API_URL}/api/email/${userEmail}`,
    headers: {
      'ngrok-skip-browser-warning': 'true'
    },
    type: "GET",
    dataType: "json",
    success: function(currentUser) {
      if (userPassword == currentUser.userPassword) {
        console.log("Entraste!")
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
        window.location.href = "../../../index.html";
      } else {
        restoreMessage("wrongPassword");
        removeMessage("unregisteredEmail");
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("El usuario no existe")
      sessionStorage.removeItem("currentUser")
      restoreMessage("unregisteredEmail");
      removeMessage("wrongPassword");
    }

  });
}

function updateUserInfoInApi(currentUser, move = true) {

  console.log("Actualizando objeto");

  $.ajax({
    // url: `http://localhost:8080/api/update/${currentUser.userEmail}`,
    url: `${API_URL}/api/update/${currentUser.userEmail}`,
    contentType: "application/json",
    headers: {
      'ngrok-skip-browser-warning': 'true'
    },
    type: "PUT",
    data: JSON.stringify(currentUser),
    dataType: "json",
    success: function(updatedCurrentUser) {
      console.log("Objeto Actualizado")
      sessionStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser.usuarioActualizado));
      if (move) { window.location.href = "../../sections/perfilUsuario.html" }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("No se pudo actualizar la informacion del usuario")
    }

  });
}

function getAllUsersFromApi() {

  console.log("obteniendo objeto");

  $.ajax({
    url: `${API_URL}/api/list`,
    type: "GET",
    dataType: "json",
    success: function(res) {
      // console.log(res);
      sessionStorage.setItem("allUsers", JSON.stringify(res));
    },
  });
}

function getFriendProfile(userEmail) {

  console.log("Obteniendo perfil de amigo");

  $.ajax({
    url: `${API_URL}/api/email/${userEmail}`,
    headers: {
      'ngrok-skip-browser-warning': 'true'
    },
    type: "GET",
    dataType: "json",
    success: function(friendProfile) {
      console.log("Perfil de amigo cargado!")
      sessionStorage.setItem("friendProfile", JSON.stringify(friendProfile));
      window.location.href = "../../sections/perfilExterno.html";

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("El usuario no existe")
      sessionStorage.removeItem("friedProfile")
    }

  });
}

function sendProfilePicture(img, fileName) {
  const imgBlob = img.slice(0, img.size, 'image/png');
  newFile = new File([imgBlob], fileName, { type: 'image/png' });
  const imgFormData = new FormData();
  imgFormData.append("file", newFile);


  $.ajax({
    type: 'POST',
    url: `${API_URL}/upload`,
    data: imgFormData,
    enctype: 'multipart/form-data',
    cache: false,
    contentType: false,
    processData: false,
    headers: {
      'ngrok-skip-browser-warning': 'true'
    },
    success: function(data) {
      console.log("Profile picture loaded");
      window.location.href = "../../sections/perfilEditable.html";
    },
    error: function(data) {
      console.log("Error loading profile picture");
    }
  });

}

function sendJsonToApi(file, filename) {
  const blob = new Blob([file], { type: 'application/json' });
  let formData = new FormData();
  formData.append("file", blob, filename);

  $.ajax({
    type: 'POST',
    url: `${API_URL}/uploadJson`,
    enctype: 'multipart/form-data',
    data: formData,
    contentType: false,
    processData: false,
    cache: false,
    headers: {
      'ngrok-skip-browser-warning': 'true'
    },
    success: function(data) {
      console.log("JSON loaded");
    },
    error: function(data) {
      console.log("Error loading JSON");
    }
  });
}

function getJsonFromApi(filename) {

  console.log("Obteniendo JSON");

  $.ajax({
    url: `${API_URL}/filesJson/${filename}`,
    headers: {
      'ngrok-skip-browser-warning': 'true'
    },
    type: "GET",
    dataType: "json",
    success: function(jsonFile) {
      console.log("Archivo JSON cargado!")
      sessionStorage.setItem(filename.split(".")[0], JSON.stringify(jsonFile))
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("El archivo no existe")
    }

  });
}

function loadUserPosts(filename) {

  console.log("Obteniendo JSON");

  $.ajax({
    url: `${API_URL}/filesJson/${filename}`,
    headers: {
      'ngrok-skip-browser-warning': 'true'
    },
    type: "GET",
    dataType: "json",
    success: function(jsonFile) {
      console.log("Archivo JSON cargado!")
      sessionStorage.setItem(filename.split(".")[0], JSON.stringify(jsonFile))
      visualizeUserPosts();
      visualizeCommentedPosts();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("El archivo no existe")
    }

  });
}

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

function validateCurrentUser (){
  console.log("Entramos a curentUser")
  console.log(sessionStorage.getItem("currentUser") == undefined)
  if (sessionStorage.getItem("currentUser") == undefined){
    window.location.href = "../../sections/login.html";
  }
}

// ---------------------------------Forums -------------------------------------------
function forumFunctionality(forumName) {
let allData = { id: "Semana1", postData: [] };

function handleMouseEvents(element) {
  element.addEventListener("mouseenter", function() {
    const temp = this.textContent;
    this.textContent = this.getAttribute("data-userEmail");
    this.setAttribute("data-userEmail", temp);
  });

  element.addEventListener("mouseleave", function() {
    const temp = this.textContent;
    this.textContent = this.getAttribute("data-userEmail");
    this.setAttribute("data-userEmail", temp);
  });
}

// Counter variables
let postDataIdCounter = 1;
let postHeaderIdCounter = 1;
let postReplyIdCounter = 1;

//Funcion para guardar la informacion en Local Storage.
function appendObjectToLocalStorage(allData) {
  const element = allData;
  localStorage.setItem(forumName, JSON.stringify(element));
  sessionStorage.setItem(forumName, JSON.stringify(element));
  updateForumObject(forumName);
}

// Get the current user name from sessionStorage
const currentUser = sessionStorage.getItem("currentUser");
const userName = currentUser ? JSON.parse(currentUser).userName : "Anonymous";
const userProfilePicture = currentUser ? JSON.parse(currentUser).userProfilePicture : "Anonymous";
const userEmail = currentUser ? JSON.parse(currentUser).userEmail : "Anonymous";

//----------Funcion para conectar al Usuario al Socket
var stompClient = null;

function connect() {
  username_connect = userName
  username_profilepicture = `${API_URL}/files/`+userProfilePicture;
  user_email = userEmail;
  if(username_connect) {
    var socket = new SockJS(`${API_URL}/websocket`);
    //var socket = new SockJS('https://testgensphere.up.railway.app/websocket');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
  }
}

function onConnected() {
  // Subscribe to the Public Topic
  stompClient.subscribe('/topic/public', onMessageReceived);

  stompClient.subscribe('/topic/public/reply', onMessageReceived_Reply);

}

function onError(error) {
  alert('No fue posible conectar con el WebSocket! Actualiza tu pagina e intenta nuevamente o entra en contacto con tu administrador.');
}

//--------------------Activar Sesion de Usuario---------------
document.addEventListener("DOMContentLoaded", () => {
  connect();
});



// Función para manejar el evento de clic en el botón "Agregar publicación"
// Función para manejar el evento de clic en el botón "Publicar"

function addPost(event){
  const postInput = document.getElementById("post-input").value.trim();

  if (postInput === "") {
    alert("Favor de publicar algo.");
    return;
  }
  if(postInput && stompClient) {
    var chatMessage = {
      sender: username_connect,
      content: postInput,
      profilepicture:username_profilepicture,
      email:user_email,
      type: 'CHAT'
    };

    stompClient.send('/app/chat.send', {}, JSON.stringify(chatMessage));

  }
  event.preventDefault();
}


// Función para manejar el evento de clic en el botón "Agregar publicación"
  function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    // Crear un contenedor para la publicación
    const postContainer = document.createElement("div");
    postContainer.classList.add("post-container");
    // Generar un nuevo postDataId único
    const postDataId = allData.postData.length + 1;
    postContainer.setAttribute("data-postId", postDataId);

    // Crear un contenedor para el encabezado de la publicación
    const postHeaderUser = document.createElement("div");
    postHeaderUser.classList.add("general-post-info");

    // Crear un div para el contenido de la publicación
    const postContentDiv = document.createElement("div");
    postContentDiv.classList.add("post-content");

    // Crear un elemento de imagen para la publicación
    const postImage = document.createElement("img");
    postImage.src = message.profilepicture;
    postImage.classList.add("rounded-circle");
    postImage.classList.add("me-3");
    postImage.classList.add("shadow-1-strong");
    postImage.style.width = "60px";
    postImage.style.height = "60px";

    const nameElement = document.createElement("h3");
    nameElement.textContent = message.sender;
    nameElement.classList.add("post-name");
    nameElement.setAttribute("data-userEmail", message.email);

    handleMouseEvents(nameElement);

    // Crear un elemento para la fecha
    const postDate = document.createElement("p");
    const currentDate = new Date();
    postDate.textContent = currentDate.toLocaleDateString();
    postDate.classList.add("post-date");

    postContentDiv.appendChild(postImage);
    postContentDiv.appendChild(nameElement);
    postContentDiv.appendChild(postDate);

    postHeaderUser.appendChild(postContentDiv);

    // Crear un div para el texto de la publicación
    const postTextDiv = document.createElement("div");
    postTextDiv.classList.add("posttextdiv");

    // Crear un elemento para el texto de la publicación
    const postTextElement = document.createElement("p");
    postTextElement.textContent = message.content;
    postTextElement.classList.add("post-text");
    postTextDiv.appendChild(postTextElement);

    postHeaderUser.appendChild(postTextDiv);

    postContainer.appendChild(postHeaderUser);

    // Crear un contenedor para las respuestas de los usuarios
    const listOfAnswer = document.createElement("div");
    listOfAnswer.classList.add("users_reply__form");

    // Crear un formulario para las respuestas
    const replyForm = document.createElement("div");
    replyForm.classList.add("reply__form");

    // Crear un campo de entrada para las respuestas
    const replyInput = document.createElement("input");
    replyInput.type = "text";
    replyInput.placeholder = "¡Comenta algo!";
    replyForm.appendChild(replyInput);

    // Crear un botón para enviar las respuestas
    const replyButton = document.createElement("button");
    replyButton.classList.add("reply-btn");
    replyButton.textContent = "Comenta";
    replyButton.addEventListener("click", addReply);
    replyForm.appendChild(replyButton);

    postContainer.appendChild(listOfAnswer);
    postContainer.appendChild(replyForm);

    const wallContainer = document.querySelector(".wall__container");
    wallContainer.prepend(postContainer);

    document.getElementById("post-input").value = "";

    const postHeader = {
      postHeaderId: 1,
      "post-header-name": nameElement.textContent,
      "post-header-date": postDate.textContent,
      "post-header-text": message.content,
      "post-header-pp": message.profilepicture,
      "userEmail": message.email
    };

    const postData = {
      postDataId,
      postHeader: [postHeader],
      replyData: [],
    };

    allData.postData.push(postData);

    addPostToUserData("post", postData);

    console.clear();

    //Guardar en Local Storage
    appendObjectToLocalStorage(allData);
  }

//-----------------------------------Inicio de cambios en addReply
  function addReply(event) {
    const replyInput = event.target.parentNode.querySelector("input[type='text']");
    const replyText = replyInput.value.trim();
    const replyInputParent = event.target.parentNode.closest(".post-container");
    const replyId = replyInputParent.dataset.postid;
    console.log(replyId);
    if (replyText === "") {
      alert("Por favor comenta algo.");
      return;
    }

    if (replyText && stompClient) {
      var chatMessage = {
        sender: username_connect,
        content: replyText,
        postId: replyId,
        profilepicture: username_profilepicture,
        email: user_email,
        type: 'CHAT'
      };
      stompClient.send('/app/chat.reply', {}, JSON.stringify(chatMessage));
      replyText.value = '';
    }
    event.preventDefault();
  }

  function onMessageReceived_Reply(payload) {
    var message = JSON.parse(payload.body);

    // Create a containter for the reply
    const replyContainer = document.createElement("div");
    replyContainer.classList.add("reply-container");

    // Create the reply content
    const replyContentDiv = document.createElement("div");
    replyContentDiv.classList.add("reply-content");

    const replyImage = document.createElement("img");
    replyImage.src = message.profilepicture;
    replyImage.classList.add("rounded-circle");
    replyImage.classList.add("me-3");
    replyImage.classList.add("shadow-1-strong");
    replyImage.style.width = "60px";
    replyImage.style.height = "60px";

    const nameElement = document.createElement("h3");
    nameElement.textContent = message.sender;
    nameElement.classList.add("reply-name");
    nameElement.setAttribute("data-userEmail", message.email);

    handleMouseEvents(nameElement);

    const replyDate = document.createElement("p");
    const currentDate = new Date();
    replyDate.textContent = currentDate.toLocaleDateString();
    replyDate.classList.add("reply-date");

    replyContentDiv.appendChild(replyImage);
    replyContentDiv.appendChild(nameElement);
    replyContentDiv.appendChild(replyDate);

    const textReplyDiv = document.createElement("div");
    textReplyDiv.classList.add("text-reply");

    const replyTextElement = document.createElement("p");
    replyTextElement.textContent = message.content;
    replyTextElement.classList.add("reply-text");
    textReplyDiv.appendChild(replyTextElement);

    replyContainer.appendChild(replyContentDiv);
    replyContainer.appendChild(textReplyDiv);

    const postContainer = document.querySelector(`.post-container[data-postid="${message.postId}"]`);
    if (postContainer) {
      const listOfAnswer = postContainer.querySelector(".users_reply__form");
      listOfAnswer.appendChild(replyContainer);
    }

    const replyForm = postContainer.querySelector(".reply__form");
    const inputElement = replyForm.querySelector("input[type='text']");
    inputElement.value = "";

    const postId = parseInt(postContainer.getAttribute("data-postId")); //No mover de aquí.Trae el id del post

    let replyId = 0;

    if (Object.entries(allData.postData[postId - 1].replyData) === 0) {
      replyId = 1;
    } else {
      replyId = allData.postData[postId - 1].replyData.length + 1;
    }

    const replyData = {
      replyId,
      postHeaderId: parseInt(postContainer.getAttribute("data-postId")),
      "reply-name": nameElement.textContent,
      "reply-date": replyDate.textContent,
      "reply-text": message.content,
      "reply-pp": message.profilepicture,
      "userEmail": message.email
    };

    const postData = allData.postData.find((post) => post.postDataId === postId); //Seleccionando el postData por su id
    postData.replyData.push(replyData);

    addPostToUserData("reply", postData);

    // Save the updated data to local storage
    appendObjectToLocalStorage(allData);
  }

  /*---------------Fin de cambios en addReply */

// Add an event listener to the "Publicar" button
  const addPostButton = document.getElementById("add-post-btn");
  addPostButton.addEventListener("click", addPost);

// Add event listener for Enter keypress on the post-input field
  const postInput = document.getElementById("post-input");
  postInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addPost();
    }
  });


  function showItems() {
    listItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("fade-in");
      }, index * 350);
    });
  }

// Function to retrieve the information from local storage
  function getDataFromLocalStorage() {
    const storedData = sessionStorage.getItem(forumName);
    return JSON.parse(storedData);
  }

// Function to populate the wall__container with the retrieved data
  function populateWallContainer(data) {
    const wallContainer = document.querySelector(".wall__container");
    wallContainer.innerHTML = "";

    data.postData.forEach((postData) => {
      const postContainer = document.createElement("div");
      postContainer.classList.add("post-container");
      postContainer.setAttribute("data-postId", postData.postDataId);

      postData.postHeader.forEach((postHeader) => {
        const postHeaderUser = document.createElement("div");
        postHeaderUser.classList.add("general-post-info");

        const postContentDiv = document.createElement("div");
        postContentDiv.classList.add("post-content");

        const postImage = document.createElement("img");
        postImage.src = postHeader["post-header-pp"];
        postImage.classList.add("rounded-circle");
        postImage.classList.add("me-3");
        postImage.classList.add("shadow-1-strong");
        postImage.style.width = "60px";
        postImage.style.height = "60px";

        const nameElement = document.createElement("h3");
        nameElement.textContent = postHeader["post-header-name"];
        nameElement.setAttribute("data-userEmail", postHeader.userEmail);
        nameElement.classList.add("post-name");

        nameElement.addEventListener("mouseenter", function () {
          const temp = this.textContent;
          this.textContent = this.getAttribute("data-userEmail");
          this.setAttribute("data-userEmail", temp);
        });

        nameElement.addEventListener("mouseleave", function () {
          const temp = this.textContent;
          this.textContent = this.getAttribute("data-userEmail");
          this.setAttribute("data-userEmail", temp);
        });

        const postDate = document.createElement("p");
        postDate.textContent = postHeader["post-header-date"];
        postDate.classList.add("post-date");

        postContentDiv.appendChild(postImage);
        postContentDiv.appendChild(nameElement);
        postContentDiv.appendChild(postDate);

        postHeaderUser.appendChild(postContentDiv);

        const postTextDiv = document.createElement("div");
        postTextDiv.classList.add("posttextdiv");

        const postTextElement = document.createElement("p");
        postTextElement.textContent = postHeader["post-header-text"];
        postTextElement.classList.add("post-text");
        postTextDiv.appendChild(postTextElement);

        postHeaderUser.appendChild(postTextDiv);

        postContainer.appendChild(postHeaderUser);
      });
      //----------------Se debe crear el users_reply_form dentro del post container aunque no existan replyData----
      const usersReplyForm = document.createElement("div");
      usersReplyForm.classList.add("users_reply__form");
      postContainer.appendChild(usersReplyForm);

      postData.replyData.forEach((replyData) => {
        const replyContainer = document.createElement("div");
        replyContainer.classList.add("reply-container");

        const replyContentDiv = document.createElement("div");
        replyContentDiv.classList.add("reply-content");

        const replyImage = document.createElement("img");
        replyImage.src = replyData["reply-pp"];
        replyImage.classList.add("rounded-circle");
        replyImage.classList.add("me-3");
        replyImage.classList.add("shadow-1-strong");
        replyImage.style.width = "60px";
        replyImage.style.height = "60px";

        const nameElement = document.createElement("h3");
        nameElement.textContent = replyData["reply-name"];
        nameElement.setAttribute("data-userEmail", replyData.userEmail);
        nameElement.classList.add("reply-name");

        nameElement.addEventListener("mouseover", function () {
          this.textContent = this.getAttribute("data-userEmail");
        });

        nameElement.addEventListener("mouseout", function () {
          this.textContent = replyData["reply-name"];
        });

        const replyDate = document.createElement("p");
        replyDate.textContent = replyData["reply-date"];
        replyDate.classList.add("reply-date");

        replyContentDiv.appendChild(replyImage);
        replyContentDiv.appendChild(nameElement);
        replyContentDiv.appendChild(replyDate);

        const textReplyDiv = document.createElement("div");
        textReplyDiv.classList.add("text-reply");

        const replyTextElement = document.createElement("p");
        replyTextElement.textContent = replyData["reply-text"];
        replyTextElement.classList.add("reply-text");
        textReplyDiv.appendChild(replyTextElement);

        replyContainer.appendChild(replyContentDiv);
        replyContainer.appendChild(textReplyDiv);
        usersReplyForm.appendChild(replyContainer);
      });

      const replyForm = document.createElement("div");
      replyForm.classList.add("reply__form");

      const replyInput = document.createElement("input");
      replyInput.type = "text";
      replyInput.placeholder = "¡Comenta algo!";
      replyForm.appendChild(replyInput);

      const replyButton = document.createElement("button");
      replyButton.classList.add("reply-btn");
      replyButton.textContent = "Comenta";
      replyButton.addEventListener("click", addReply);
      replyForm.appendChild(replyButton);
      postContainer.appendChild(replyForm);
      wallContainer.prepend(postContainer);
    });
  }

  function loadForumPosts(filename) {

    console.log("Obteniendo JSON");

    $.ajax({
      url: `${API_URL}/filesJson/${filename}`,
      headers: {
        'ngrok-skip-browser-warning': 'true'
      },
      type: "GET",
      dataType: "json",
      success: function (jsonFile) {
        console.log("Archivo JSON cargado!")
        sessionStorage.setItem(filename.split(".")[0], JSON.stringify(jsonFile))
        const storedData = getDataFromLocalStorage();
        if (storedData) {
          allData = storedData;
          populateWallContainer(storedData);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("El archivo no existe")
      }

    });
  }

  function updateForumObject(name) {
    const forumObject = sessionStorage.getItem(name);
    sendJsonToApi(forumObject, name + ".json")
  }

  /*------------------------Animacion de los eventos del lado izquierdo------*/

// Lista aparece en orden con a animación
  const listItems = document.querySelectorAll(".list-animation");



  document.addEventListener("DOMContentLoaded", showItems); // DOMContentLoaded = Al cargarse la pagina

  /*--------------------Recuperar la inforamacion del local storage---------------*/

  document.addEventListener("DOMContentLoaded", () => {
    loadForumPosts(forumName + ".json")
  });

}

// ------------------------------------------------------------------------------------