document.addEventListener('DOMContentLoaded', loadFiles);

function loadFiles() {
    fetch('listFiles.php')
        .then(response => response.json())
        .then(files => {
            console.log('Files:', files); // Verifique a lista de arquivos

            const fileList = document.getElementById('fileList');
            fileList.innerHTML = '';

            files.forEach(file => {
                if (isTextFile(file)) {
                    const fileItem = document.createElement('a');
                    fileItem.textContent = file;
                    
                    // Ajuste a URL para o text-editor com o parâmetro de arquivo
                    const fileUrl = `../text-editor/?file=${encodeURIComponent(file)}`;
                    console.log('Generated URL:', fileUrl); // Verifique a URL gerada

                    fileItem.href = fileUrl;
                    fileItem.onclick = function () {
                        openAppWindowFromLink(this);
                        return false; // Impede o comportamento padrão do link
                    };

                    fileList.appendChild(fileItem);
                }
            });
        })
        .catch(error => console.error('Error fetching files:', error)); // Captura erros de fetch
}

function isTextFile(file) {
    const allowedExtensions = ['.txt', '.html', '.css', '.js'];
    return allowedExtensions.some(ext => file.endsWith(ext));
}
