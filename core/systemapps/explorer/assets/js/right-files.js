document.addEventListener('DOMContentLoaded', function() {
    const rightFilesMenu = document.getElementById('right-files');
    let currentItem = null;

    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        
        const target = event.target;
        if (target.classList.contains('item') || target.classList.contains('item-view')) {
            currentItem = target;
            rightFilesMenu.style.display = 'block';
            rightFilesMenu.style.left = `${event.pageX}px`;
            rightFilesMenu.style.top = `${event.pageY}px`;
        } else {
            rightFilesMenu.style.display = 'none';
        }
    });

    document.addEventListener('click', function() {
        rightFilesMenu.style.display = 'none';
    });

    document.getElementById('rename').addEventListener('click', function() {
        if (currentItem) {
            renameItem(currentItem);
        }
    });

    document.getElementById('copy').addEventListener('click', function() {
        if (currentItem) {
            copyItem(currentItem);
        }
    });

    document.getElementById('cut').addEventListener('click', function() {
        if (currentItem) {
            cutItem(currentItem);
        }
    });

    document.getElementById('delete').addEventListener('click', function() {
        if (currentItem) {
            deleteItem(currentItem);
        }
    });
});

function renameItem(item) {
    const oldName = item.textContent.trim();
    const newName = prompt('Novo nome:', oldName);

    if (newName) {
        fetch('assets/php/rename_file.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                oldName: oldName,
                newName: newName,
                folder: item.dataset.folder // Pasta atual
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                item.textContent = newName;
            } else {
                alert(result.error);
            }
        });
    }
}

function copyItem(item) {
    const fileName = item.textContent.trim();
    const targetFolder = prompt('Digite a pasta de destino:');
    
    if (targetFolder) {
        fetch('assets/php/copy_file.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                fileName: fileName,
                sourceFolder: item.dataset.folder,
                targetFolder: targetFolder
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Arquivo copiado com sucesso!');
            } else {
                alert(result.error);
            }
        });
    }
}

function cutItem(item) {
    const fileName = item.textContent.trim();
    const targetFolder = prompt('Digite a pasta de destino:');
    
    if (targetFolder) {
        fetch('assets/php/cut_file.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                fileName: fileName,
                sourceFolder: item.dataset.folder,
                targetFolder: targetFolder
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Arquivo movido com sucesso!');
                item.remove(); // Remove item da lista
            } else {
                alert(result.error);
            }
        });
    }
}

function deleteItem(item) {
    const fileName = item.textContent.trim();

    if (confirm('Tem certeza de que deseja excluir este item?')) {
        fetch('assets/php/delete_file.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                fileName: fileName,
                folder: item.dataset.folder
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Arquivo movido para a lixeira!');
                item.remove(); // Remove item da lista
            } else {
                alert(result.error);
            }
        });
    }
}
