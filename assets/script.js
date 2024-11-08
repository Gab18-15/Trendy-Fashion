document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.diffuser-image');
    let currentIndex = 0;

    function diffuseNextImage() {
        images.forEach((img, index) => {
            if (index === currentIndex) {
                img.style.filter = 'blur(0)';
                img.style.transform = 'scale(1.05)';
            } else {
                img.style.filter = 'blur(8px)';
                img.style.transform = 'scale(1)';
            }
        });
        currentIndex = (currentIndex + 1) % images.length;
    }

    // Cambia de imagen cada 4 segundos
    setInterval(diffuseNextImage, 4000);
});
const entrarBtn = document.getElementById('boton');
const formContainer = document.getElementById('formContainer');
const closeBtn = document.getElementById('closeBtn');
function redirectToLogin() {
    window.location.href = "form.html"; // Cambia "login.html" a la ruta de tu página de login y registro
}
