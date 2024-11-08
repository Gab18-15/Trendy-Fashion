// Importar Firebase y las funciones necesarias
import './firebase.js';
import { auth, db, storage } from './firebase.js';
import { onAuthStateChanged, updateProfile, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { query, orderBy, collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

let nombreUsuario = document.getElementById("displayName");
let nombreUsuario2 = document.getElementById("displayName2");
let nombreUsuario3 = document.getElementById("displayName3");
let fotoPublicacion = document.getElementById("foto_publicacion"); // Input de archivo para subir imagen
let tweetButton = document.getElementById("tweet_post"); // Botón para publicar
let tweetTextArea = document.getElementById("tweet_text_area"); // Área de texto para nueva publicación
const postMainBox = document.querySelector(".post_main_bx");

let idUsuario = null;

// Escuchar los cambios de autenticación
onAuthStateChanged(auth, (usuario) => {
    console.log(usuario);

    if (usuario) {
        // Mostrar el nombre del usuario
        nombreUsuario.innerHTML = usuario.displayName || "Usuario";
        nombreUsuario2.innerHTML = usuario.displayName || "Usuario";
        nombreUsuario3.innerHTML = usuario.displayName || "Usuario";
        idUsuario = usuario.uid; // Almacenar el ID del usuario

        // Recuperar la foto de perfil
        const fotoPerfil = document.getElementById("fotoPerfil");
        fotoPerfil.src = usuario.photoURL;

        const fotoPerfil2 = document.getElementById("fotoPerfil2");
        fotoPerfil2.src = usuario.photoURL;

        const fotoPerfil3 = document.getElementById("fotoPerfil3");
        fotoPerfil3.src = usuario.photoURL;
    } else {
        window.location.href = "form.html";
    }
});

// Publicar nueva publicación con foto y video
tweetButton.addEventListener("click", async () => {
    const tweetContent = tweetTextArea.value.trim();
    if (tweetContent || fotoPublicacion.files.length > 0) {
        try {
            let urlFoto = null; // Inicialmente sin foto

            // Subir foto si existe
            if (fotoPublicacion.files.length > 0) {
                const archivoFoto = fotoPublicacion.files[0];
                const fotoRef = ref(storage, 'fotos_publicaciones/' + archivoFoto.name);
                await uploadBytes(fotoRef, archivoFoto);
                urlFoto = await getDownloadURL(fotoRef);
            }


            // Guardar la publicación con o sin imagen/video en Firestore
            await addDoc(collection(db, "publicaciones"), {
                texto: tweetContent,
                userId: idUsuario,
                userName: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL,
                imagenPublicacion: urlFoto,
                timestamp: new Date()
            });

            // Limpiar campos de publicación
            tweetTextArea.value = "";
            fotoPublicacion.value = "";

            cargarPublicaciones();
        } catch (error) {
            console.log("Error al publicar: ", error);
        }
    } else {
        console.log("El campo de publicación está vacío.");
    }
});

// Cargar todas las publicaciones, incluyendo imágenes
async function cargarPublicaciones() {
    postMainBox.innerHTML = "";
    const publicacionesQuery = query(collection(db, "publicaciones"), orderBy("timestamp", "desc"));
    const consulta = await getDocs(publicacionesQuery);

    consulta.forEach((doc) => {
        const publicacion = doc.data();
        const newTweet = document.createElement("div");
        newTweet.classList.add("post_card_bx");

        // Convertir Timestamp a una fecha legible
        const fechaPublicacion = publicacion.timestamp.toDate();
        const horaPublicacion = fechaPublicacion.toLocaleTimeString();
        const fechaFormateada = fechaPublicacion.toLocaleDateString();

        let fotoPerfil = publicacion.photoURL || "user.jpg";
        // Contenido HTML del nuevo tweet
        newTweet.innerHTML = `
            <div class="post_profile">
                <img src="${publicacion.photoURL || 'imagenes/user.png'}" alt="Foto de perfil" />
            </div>
            <div class="content">
                <div class="user_name_time">
                    <h5>
                        ${publicacion.userName || "Usuario"} 
                        <img src="imagenes/bluetick.png" alt="" />
                        <p>@${publicacion.userName ? publicacion.userName.toLowerCase().replace(" ", "_") : "usuario"}</p>
                    </h5>
                    <h6><i class="fa-regular fa-clock"></i> ${fechaFormateada} ${horaPublicacion}</h6>
                </div>
                <h3>${publicacion.texto}</h3>
                ${publicacion.imagenPublicacion ? `<img src="${publicacion.imagenPublicacion}" width="200" height="200">` : ""}
                <div class="tweet_card_social_data">
                    <div class="tweet_social_card">
                        <i class="fa-solid fa-comment"></i>
                        <span>0</span>
                    </div>
                    <div class="tweet_social_card">
                        <i class="fa-solid fa-repeat"></i>
                        <span>0</span>
                    </div>
                    <div class="tweet_social_card">
                        <i class="fa-solid fa-heart"></i>
                        <span>0</span>
                    </div>
                    <div class="tweet_social_card">
                        <i class="fa-solid fa-share"></i>
                    </div>
                </div>
            </div>
        `;


        // Agregar botón de eliminar si es el autor
        
        postMainBox.appendChild(newTweet);
    });
}
cargarPublicaciones();



// Función para eliminar publicación
window.eliminarPublicacion = async function (id) {
    try {
        await deleteDoc(doc(db, "publicaciones", id)); // Eliminar la publicación
        cargarPublicaciones(); // Recargar publicaciones
    } catch (error) {
        console.log("Error al eliminar publicación: ", error); // Manejar errores al eliminar
    }
};