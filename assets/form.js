//importar firebase
import '../firebase.js';
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";


// Manejar el cambio entre los formularios
document.getElementById("login-tab").addEventListener("click", showLogin);
document.getElementById("register-tab").addEventListener("click", showRegister);

// Mostrar el formulario de inicio de sesión y ocultar el de registro
function showLogin() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
}

// Mostrar el formulario de registro y ocultar el de inicio de sesión
function showRegister() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

// Redirigir a la página principal si el usuario ya está autenticado
auth.onAuthStateChanged(user => {
    if (user) {
        // Si el usuario ya está logueado, redirigirlo a la página principal
        //window.location.href = "principal.html";
        console.log('logueado');
        
    }
});

// Evento para el formulario de registro
document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let nombre = document.getElementById("register-name").value;
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;

    // Validación de los campos
    if (!nombre || !email || !password) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    // Crear usuario con correo y contraseña
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            let user = userCredential.user;

            // Actualizar el nombre del usuario
            updateProfile(user, { displayName: nombre })
                .then(() => {
                    console.log("Se actualizó el nombre a " + user.displayName);
                    // Redirigir a la página principal después de registrarse
                    window.location.href = "principal.html";  // Redirige a principal.html
                })
                .catch((error) => {
                    console.log("Error al actualizar el nombre del usuario:", error);
                    alert("Ocurrió un error al actualizar tu nombre.");
                });
        })
        .catch((error) => {
            let errorMessage = "Ocurrió un error al registrarte. Intenta de nuevo.";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Este correo electrónico ya está en uso.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "La contraseña debe tener al menos 6 caracteres.";
            }
            alert(errorMessage);  // O mostrar un mensaje en la UI
        });
});

// Evento para el formulario de inicio de sesión
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    // Validar que los campos no estén vacíos
    if (!email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Intentar iniciar sesión con Firebase
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Si el inicio de sesión es exitoso, redirigir a principal.html
            console.log("Usuario autenticado:", userCredential.user);
            window.location.href = "principal.html";  // Redirigir a la página principal
        })
        .catch((error) => {
            console.log("Error al iniciar sesión:", error.message);
            alert("Error al iniciar sesión. Verifica tus credenciales.");
        });
});

// INICIAR SESION CON GOOGLE 

let google = document.getElementById("google");
google.addEventListener("click", function () {
    console.log("google");
    
    
    const provier = new GoogleAuthProvider();
    
    signInWithPopup(auth, provier)
        .then((result) => {
            // Colocar que es lo que quieres que haga cuando inicias sesion
            console.log("iniciaste con Google");
            window.location.href = "principal.html";
            
        })
        .catch((error) => {
            // En caso haya error, se muestra por la consola
            console.log(error);
        })
})
console.log("hola");
