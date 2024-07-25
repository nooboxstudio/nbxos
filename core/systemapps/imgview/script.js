// core/systemapps/imgview/script.js

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const filePath = urlParams.get('file');

    if (filePath) {
        const imageElement = document.getElementById('image');
        imageElement.src = filePath;
    }
});

