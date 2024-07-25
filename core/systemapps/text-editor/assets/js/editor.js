let currentPath = new URLSearchParams(window.location.search).get('file');
document.getElementById('saveFile').addEventListener('click', saveFile);

if (currentPath) {
    fetch(`getFileContent.php?file=${currentPath}`)
        .then(response => response.text())
        .then(content => {
            document.getElementById('editor').innerHTML = content;
        });
}

function saveFile() {
    const content = document.getElementById('editor').innerHTML;

    fetch('saveFile.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path: currentPath, content })
    }).then(response => {
        if (response.ok) {
            alert('Arquivo salvo com sucesso!');
        } else {
            alert('Erro ao salvar o arquivo.');
        }
    });
}

function formatText(command) {
    document.execCommand(command, false, null);
}
