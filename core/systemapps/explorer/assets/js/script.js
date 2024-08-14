document.addEventListener('DOMContentLoaded', function() {
    const baseUrl = 'list_files.php';  // Caminho para list_files.php
    let currentFolder = 'desktop'; // Variável para rastrear a pasta atual
    let selectedItem = null; // Variável para rastrear o item selecionado
    let clipboardItem = null;
    let isCut = false;

    // Função para criar atalhos fixos
    function createFixedShortcuts(contentDiv) {
        const fixedShortcuts = [
            { target: 'documents', name: 'Documentos', icon: 'assets/img/pin-folder.png' },
            { target: 'images', name: 'Imagens', icon: 'assets/img/pin-folder.png' },
            { target: 'musics', name: 'Músicas', icon: 'assets/img/pin-folder.png' },
            { target: 'videos', name: 'Vídeos', icon: 'assets/img/pin-folder.png' }
        ];

        fixedShortcuts.forEach(shortcut => {
            const itemView = document.createElement('a');
            itemView.classList.add('item-view');
            itemView.dataset.target = shortcut.target;
            itemView.innerHTML = `
                <img src="${shortcut.icon}" alt="${shortcut.name}">
                <span>${shortcut.name}</span>
            `;
            itemView.addEventListener('dblclick', function() {
                loadFolder(this.dataset.target);
            });

            contentDiv.appendChild(itemView);
        });
    }

    // Função para carregar o conteúdo da pasta
    function loadFolder(folder = '') {
        currentFolder = folder;
        fetch(`${baseUrl}?folder=${encodeURIComponent(folder)}`)
            .then(response => response.json())
            .then(data => {
                const contentDiv = document.getElementById('content');

                // Limpa o conteúdo atual
                contentDiv.innerHTML = '';

                // Se estiver na pasta 'desktop', recria os atalhos fixos
                if (folder === 'desktop') {
                    createFixedShortcuts(contentDiv);
                }

                if (data.error) {
                    contentDiv.innerHTML = `<div>${data.error}</div>`;
                    return;
                }

                // Adiciona os itens da pasta
                data.forEach(item => {
                    const itemView = document.createElement('a');
                    itemView.classList.add('item-view');
                    itemView.dataset.target = folder + '/' + item.name;

                    if (item.type === 'folder') {
                        itemView.innerHTML = `
                            <img src="assets/img/folder.png" alt="${item.name}">
                            <span>${item.name}</span>
                        `;
                        itemView.addEventListener('dblclick', function() {
                            loadFolder(this.dataset.target);
                        });

                        itemView.addEventListener('click', function() {
                            selectItem(this);
                        });
                    } else {
                        itemView.innerHTML = `
                            <img src="assets/img/file.png" alt="${item.name}">
                            <span>${item.name}</span>
                        `;
                        itemView.addEventListener('click', function() {
                            selectItem(this);
                        });

                        itemView.addEventListener('dblclick', function() {
                            const fileType = item.name.split('.').pop().toLowerCase();
                            if (fileType === 'txt' || fileType === 'css') {
                                openTextEditor(folder + '/' + item.name);
                            } else {
                                alert('Este tipo de arquivo não pode ser aberto no editor de texto.');
                            }
                        });
                    }

                    contentDiv.appendChild(itemView);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar a pasta:', error);
            });
    }
    
/*########################################################################################################*/
function openTextEditor(filePath) {
    fetch(`./assets/php/read_file.php?file=${encodeURIComponent(filePath)}`)
        .then(response => response.text())
        .then(content => {
            const editorWindow = window.open('', '', 'width=600,height=400');
            editorWindow.document.write(`
                <html>
                <head>
                    <title>Editor de Texto - ${filePath}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 10px; margin: 0; }
                        textarea { width: 100%; height: 90%; }
                        button { margin-top: 10px; }
                    </style>
                </head>
                <body>
                    <h2>${filePath}</h2>
                    <textarea id="fileContent">${content}</textarea>
                    <button onclick="window.opener.saveTextFile('${filePath}', document.getElementById('fileContent').value)">Salvar</button>
                </body>
                </html>
            `);
        })
        .catch(error => console.error('Erro ao abrir o arquivo:', error));
}

// Função para salvar o conteúdo do editor de texto
function saveFile(content, filePath) {
    fetch('./assets/php/save_file.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `file=${encodeURIComponent(filePath)}&content=${encodeURIComponent(content)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Arquivo salvo com sucesso!');
        } else {
            alert(`Erro ao salvar o arquivo: ${data.error}`);
        }
    })
    .catch(error => {
        console.error('Erro ao salvar o arquivo:', error);
    });
}

/*########################################################################################################*/
    // Função para selecionar um item
    function selectItem(item) {
        // Remove a seleção de itens anteriores
        if (selectedItem) {
            selectedItem.style.opacity = 1;
        }

        // Seleciona o novo item
        selectedItem = item;
        selectedItem.style.opacity = 0.75;

        // Habilita os botões de ação
        document.getElementById('rename-button').disabled = false;
        document.getElementById('delete-button').disabled = false;
        document.getElementById('paste-button').disabled = false;
        document.getElementById('copy-button').disabled = false;
        document.getElementById('cut-button').disabled = false;
    }

    // Função para des-selecionar o item atual
    function deselectItem() {
        if (selectedItem) {
            selectedItem.style.opacity = 1;
            selectedItem = null;

            // Desabilita os botões de ação
            document.getElementById('rename-button').disabled = true;
            document.getElementById('delete-button').disabled = true;
            document.getElementById('paste-button').disabled = true;
            document.getElementById('copy-button').disabled = true;
            document.getElementById('cut-button').disabled = true;
        }
    }

    // Adiciona um ouvinte de evento de clique no document para des-selecionar o item quando clicar fora
    document.addEventListener('click', function(event) {
        // Des-seleciona o item se o clique foi fora de um item
        if (selectedItem && !selectedItem.contains(event.target)) {
            deselectItem();
        }
    });

/*########################################################################################################*/
    // Função para criar novo item (pasta ou arquivo)
function createNewItem(type, name) {
    const path = `${currentFolder}/${name}`;
    fetch('./assets/php/create_item.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: type,
            path: path
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta do servidor:', data);
        if (data.success) {
            console.log('Recarregando a pasta:', currentFolder);
            loadFolder(currentFolder); // Recarrega a pasta atual
        } else {
            alert(`Erro ao criar ${type === 'folder' ? 'pasta' : 'arquivo'}: ${data.error}`);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

/*########################################################################################################*/
    // Função para excluir o item selecionado
    function deleteItem() {
        if (!selectedItem) {
            return;
        }

        const itemPath = selectedItem.dataset.target;
        fetch('./assets/php/delete_item.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                path: itemPath
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta do servidor:', data);
            if (data.success) {
                loadFolder(currentFolder);
            } else {
                alert(`Erro ao excluir item: ${data.error}`);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }
/*########################################################################################################*/
// Função para restaurar o item selecionado
/*function restoreItem() {
    if (!selectedItem) {
        alert('Nenhum item selecionado.');
        return;
    }

    const itemPath = selectedItem.dataset.target;
    const filename = itemPath.split('/').pop(); // Obtém o nome do arquivo/pasta

    fetch('./assets/php/restore_item.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filename: filename })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta do servidor:', data);
        if (data.success) {
            alert('Item restaurado com sucesso!');
            loadFolder(currentFolder); // Atualiza a pasta atual
        } else {
            alert(`Erro ao restaurar item: ${data.error}`);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}*/


/*########################################################################################################*/
    // Função para renomear o item selecionado
    function renameItem(newName) {
        if (!selectedItem) {
            return;
        }

        const oldPath = selectedItem.dataset.target;
        const newPath = `${currentFolder}/${newName}`;
        fetch('./assets/php/rename_item.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oldPath: oldPath,
                newPath: newPath
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta do servidor:', data);
            if (data.success) {
                loadFolder(currentFolder);
            } else {
                alert(`Erro ao renomear item: ${data.error}`);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }
    document.getElementById('rename-button').addEventListener('click', function(event) {
        event.preventDefault();
        if (!selectedItem) {
            return;
        }
        
        const currentName = selectedItem.querySelector('span').textContent; // Obtém o nome atual do item
        const newName = prompt('Novo nome:', currentName); // Define o nome atual como valor padrão no prompt
        
        if (newName && newName !== currentName) { // Verifica se o novo nome é diferente do atual
            renameItem(newName);
        }
    });

/*########################################################################################################*/
function copyItem() {
    if (!selectedItem) return alert('No item selected.');
    const itemPath = selectedItem.dataset.target;
    fetch('./assets/php/copy_item.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: itemPath })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) clipboardItem = data.clipboardPath;
        else alert(`Error copying item: ${data.error}`);
    })
    .catch(error => console.error('Error:', error));
}

// Cut item
function cutItem() {
    if (!selectedItem) return alert('No item selected.');
    const itemPath = selectedItem.dataset.target;
    fetch('./assets/php/cut_item.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: itemPath })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            clipboardItem = data.clipboardPath;
            isCut = true;
        } else alert(`Error cutting item: ${data.error}`);
    })
    .catch(error => console.error('Error:', error));
}

// Paste item
function pasteItem() {
    if (!clipboardItem) return alert('No item to paste.');
    const destPath = currentFolder;
    fetch('./assets/php/paste_item.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: clipboardItem, destination: destPath, cut: isCut })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) loadFolder(currentFolder);
        else alert(`Error pasting item: ${data.error}`);
    })
    .catch(error => console.error('Error:', error));
}

// Initialize
loadFolder('desktop');


/*########################################################################################################*/

    // Adiciona event listeners para clicar nas pastas da barra lateral
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const folder = this.getAttribute('data-target');
            loadFolder(folder);
        });
    });
/*########################################################################################################*/
    // Adiciona event listeners para criar nova pasta e arquivo
    document.getElementById('new-folder').addEventListener('click', function(event) {
        event.preventDefault();
        const folderName = "Nova Pasta";
        if (folderName) {
            createNewItem('folder', folderName);
        }
    });
/*########################################################################################################*/
    document.getElementById('new-file').addEventListener('click', function(event) {
        event.preventDefault();
        const fileName = "Novo Arquivo";
        const fileextension = ".txt";
        if (fileName) {
            createNewItem('file', fileName+fileextension);
        }
    });
    
/*########################################################################################################*/
    // Adiciona event listeners para os botões de ação
    document.getElementById('delete-button').addEventListener('click', function(event) {
        event.preventDefault();
        deleteItem();
    });
/*########################################################################################################*/
     // Adiciona ouvintes aos botões de copiar e colar
     document.getElementById('copy-button').addEventListener('click', function(event) {
        event.preventDefault();
        copyItem();
    });
/*########################################################################################################*/
    document.getElementById('paste-button').addEventListener('click', function(event) {
        event.preventDefault();
        pasteItem();
    });
/*########################################################################################################*/
    document.getElementById('cut-button').addEventListener('click', function(event) {
            event.preventDefault();
        cutItem();
    });
 
/*########################################################################################################*/
// Bloqueia o clique direito na página inteira
document.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // Previne a ação padrão (exibir o menu de contexto)
});

/*######################################## CHAMA AS FUNÇÃO AO PRESSIONAR OS BOTÕES ################################################################*/
document.addEventListener('keydown', function(event) {
    // Verifica se a tecla Delete foi pressionada
    if (event.key === 'Delete') {
        deleteItem();
    } 
    // Verifica se F2 foi pressionada
    else if (event.key === 'F2') {
        if (selectedItem) {
            const currentName = selectedItem.querySelector('span').textContent; // Obtém o nome atual do item
            const newName = prompt('Novo nome:', currentName); // Define o nome atual como valor padrão no prompt
            
            if (newName && newName !== currentName) { // Verifica se o novo nome é diferente do atual
                renameItem(newName);
            }
        }
    }
    // Verifica se Ctrl+C foi pressionado
    else if (event.ctrlKey && event.key === 'c') { 
        copyItem();
    }
    // Verifica se Ctrl+X foi pressionado
    else if (event.ctrlKey && event.key === 'x') { 
        cutItem();
    }
    // Verifica se Ctrl+V foi pressionado
    else if (event.ctrlKey && event.key === 'v') { 
        pasteItem();
    }
});


});

