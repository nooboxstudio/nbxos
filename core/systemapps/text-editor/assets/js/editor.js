function saveFile() {
    const editor = document.querySelector('.editor textarea');
    const filePath = editor.getAttribute('data-file-path');
    const content = editor.value;

    fetch('saveFile.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `filePath=${encodeURIComponent(filePath)}&content=${encodeURIComponent(content)}`
    })
    .then(response => response.text())
    .then(data => {
        console.log('Arquivo salvo com sucesso:', data);
    })
    .catch(error => console.error('Erro ao salvar o arquivo:', error));
}
document.getElementById('save-button').addEventListener('click', saveFile);
