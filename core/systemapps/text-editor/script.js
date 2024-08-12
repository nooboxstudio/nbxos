document.getElementById('saveFile').addEventListener('click', function() {
    const editorContent = document.getElementById('editor').value;
    fetch('save_file.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            file: filePath, // o caminho do arquivo que está sendo editado
            content: editorContent
        })
    })
    .then(response => response.text())
    .then(result => {
        console.log('Arquivo salvo com sucesso:', result);
    })
    .catch(error => console.error('Erro ao salvar o arquivo:', error));
});

document.getElementById('chooseFolder').addEventListener('click', function() {
    // Lógica para escolher pasta e salvar o arquivo
});
