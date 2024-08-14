// Array para armazenar referências das janelas abertas
let openAppWindows = [];
// Variável para rastrear o valor mais alto de z-index
let highestZIndex = 1;

// Após o PHP definir $_SESSION['user_id']
let userId = localStorage.getItem('user_id');

let closeMenu;

/*#################################################
# Função para abrir o menu
##################################################*/
// Função para manipular abertura e fechamento de menus
function setupMenu(menuToggleId, menuContentId) {
    const menuToggle = document.getElementById(menuToggleId);
    const menuContent = document.getElementById(menuContentId);

    // Inicialmente esconda o menuContent
    menuContent.style.display = 'none';

    // Função para fechar o menu
    function closeMenu() {
        menuContent.classList.remove('show');
        setTimeout(function() {
            menuContent.style.display = 'none';
        }, 300); // Tempo correspondente ao valor do transition
    }

    // Abrir/fechar menu ao clicar no ícone de menu
    menuToggle.addEventListener('click', function(event) {
        event.stopPropagation(); // Impede que o evento se propague para o documento
        if (menuContent.style.display === 'none' || menuContent.style.display === '') {
            menuContent.style.display = 'block';
            setTimeout(function() {
                menuContent.classList.add('show');
            }, 10); // Pequeno delay para garantir a transição
        } else {
            closeMenu(); // Fecha o menu ao clicar novamente no ícone de menu
        }
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        var target = event.target;
        if (target !== menuToggle && !menuToggle.contains(target) && target !== menuContent && !menuContent.contains(target)) {
            closeMenu(); // Fecha o menu se o clique não foi dentro do menu ou no ícone de menu
        }
    });
}

// Inicialização dos menus
document.addEventListener('DOMContentLoaded', function() {
    setupMenu('menu', 'menu-content'); // Menu principal
});


/*#################################################
# Função para abrir uma nova janela via link
##################################################*/

function openAppWindowFromLink(link) {
    const filePath = link.getAttribute('href');
    if (filePath.endsWith('.txt') || filePath.endsWith('.css')) {
        openTextEditor(filePath);
    } else {
        const appPath = link.getAttribute('href');
        const jsonPath = `${appPath}/manifest.json`;
        fetch(jsonPath)
            .then(response => response.json())
            .then(app => {
                openAppWindow(app, appPath);
            })
            .catch(error => console.error('Erro ao carregar o manifest.json da aplicação:', error));
    }
}




function openAppWindow(app, appPath) {
    const desktop = document.getElementById('desktop');

    // Verifica se já existe uma instância do aplicativo aberta
    let existingWindow = openAppWindows.find(win => win.appname === app.appname);
    if (existingWindow) {
        if (existingWindow.minimized) {
            restoreApp(existingWindow.window);
        }
        return;
    }
    
    // Cria uma nova janela na área de desktop
    const appWindow = document.createElement('div');
    appWindow.classList.add('app-window');
    appWindow.setAttribute('data-appname', app.appname); // Adiciona atributo para identificação
    appWindow.style.zIndex = highestZIndex++; // Define o z-index e incrementa a variável

    // Cria a barra de título do aplicativo
    const titleBar = document.createElement('div');
    titleBar.classList.add('title-bar');

    // Ícone do aplicativo
    const icon = document.createElement('img');
    icon.src = `${appPath}/${app.logo}`; // Caminho para o ícone do aplicativo dentro do caminho base
    icon.alt = app.appname;
    icon.classList.add('app-icon'); // Adicione uma classe se precisar de estilos específicos
    titleBar.appendChild(icon);

    // Título do aplicativo (nome vindo do manifest)
    const title = document.createElement('span');
    title.textContent = app.appname;
    title.classList.add('title');
    titleBar.appendChild(title);

    // Botões de controle (minimizar, maximizar, fechar)
    const controls = document.createElement('div');
    controls.classList.add('controls');

    // Botão Minimizar
    const minimizeButton = document.createElement('button');
    minimizeButton.textContent = '_';
    minimizeButton.classList.add('minimize-button');
    minimizeButton.addEventListener('click', () => {
        minimizeApp(appWindow);
    });
    controls.appendChild(minimizeButton);

    // Botão Maximizar
    let maximizeButton = document.createElement('button');
    maximizeButton.textContent = '+';
    maximizeButton.classList.add('maximize-button');
    maximizeButton.addEventListener('click', () => {
        maximizeApp(appWindow);
    });
    controls.appendChild(maximizeButton);

    // Botão Fechar
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => {
        closeApp(appWindow, app);
    });
    controls.appendChild(closeButton);

    titleBar.appendChild(controls);
    appWindow.appendChild(titleBar);

    // Define o conteúdo da janela do aplicativo
    const appContent = document.createElement('iframe');
    appContent.src = `${appPath}/${app.appindex}`; // Usando o caminho do manifesto para carregar o conteúdo inicial
    appContent.width = '100%';
    appContent.height = 'calc(100% - 30px)'; // Ajusta a altura descontando a altura da barra de título
    appContent.style.border = 'none';


    

    // Adiciona o conteúdo do aplicativo à janela
    appWindow.appendChild(appContent);
    
    // Adiciona a janela à área de desktop
    desktop.appendChild(appWindow);

    // Redimensionamento da janela
    makeResizable(appWindow);
    
    // Movimentação da janela
    makeDraggable(appWindow, titleBar);
    
    // Adiciona a referência da janela aberta ao array
    openAppWindows.push({
        appname: app.appname,
        window: appWindow,
        minimized: false,
        maximized: false,
        previousSize: null
    });

    // Adiciona o ícone na barra de tarefas
    addTaskbarIcon(app.appname, `${appPath}/${app.logo}`);

    // Adiciona evento para trazer a janela para frente ao clicar nela
    appWindow.addEventListener('mousedown', () => {
        bringToFront(appWindow);
    });
    
}

/*#############################################################################
# Função para trazer a janela para frente ao trocar de janela
##############################################################################*/

// Função para trazer a janela para frente
function bringToFront(appWindow) {
    appWindow.style.zIndex = highestZIndex++;
}

/*#############################################################################
# Função para minimizar o app na barra de tarefas
##############################################################################*/


// Função para minimizar o aplicativo
function minimizeApp(appWindow) {
    const appInfo = openAppWindows.find(app => app.window === appWindow);

    if (appInfo) {
        appWindow.style.display = 'none';
        appInfo.minimized = true; // Marca como minimizado
    }
}




// Função para abrir a janela do perfil
function openProfileWindow() {
    const desktop = document.getElementById('desktop');

    // Verifica se já existe uma instância da janela do perfil aberta
    let existingWindow = openAppWindows.find(win => win.appname === 'Profile');
    if (existingWindow) {
        if (existingWindow.minimized) {
            restoreApp(existingWindow.window);
        }
        return;
    }

    // Cria uma nova janela na área de desktop para o perfil
    const profileWindow = document.createElement('div');
    profileWindow.classList.add('app-window');
    profileWindow.setAttribute('data-appname', 'Profile'); // Adiciona um atributo para identificação
    profileWindow.style.zIndex = highestZIndex++; // Define o z-index e incrementa a variável

    // Cria a barra de título da janela do perfil
    const titleBar = document.createElement('div');
    titleBar.classList.add('title-bar');

    // Ícone do perfil
    const icon = document.createElement('img');
    icon.src = 'core/systemapps/profile/img/icon.png'; // Caminho para o ícone do perfil
    icon.alt = 'Profile';
    icon.classList.add('app-icon'); // Adicione uma classe se precisar de estilos específicos
    titleBar.appendChild(icon);

    // Título da janela do perfil
    const title = document.createElement('span');
    title.textContent = 'Profile';
    title.classList.add('title');
    titleBar.appendChild(title);

    // Botões de controle (minimizar, maximizar, fechar)
    const controls = document.createElement('div');
    controls.classList.add('controls');

    // Botão Minimizar (opcional para o perfil)
    const minimizeButton = document.createElement('button');
    minimizeButton.textContent = '_';
    minimizeButton.classList.add('minimize-button');
    minimizeButton.addEventListener('click', () => {
        minimizeApp(profileWindow);
    });
    controls.appendChild(minimizeButton);

    // Botão Maximizar (opcional para o perfil)
    const maximizeButton = document.createElement('button');
    maximizeButton.textContent = '+';
    maximizeButton.classList.add('maximize-button');
    maximizeButton.addEventListener('click', () => {
        maximizeApp(profileWindow);
    });
    controls.appendChild(maximizeButton);

    // Botão Fechar
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => {
        closeApp(profileWindow, { appname: 'Profile' }); // Passe um objeto simulado para corresponder à estrutura esperada
    });
    controls.appendChild(closeButton);

    titleBar.appendChild(controls);
    profileWindow.appendChild(titleBar);

    const appContent = document.createElement('iframe');
    appContent.src = 'core/systemapps/profile'; // Caminho personalizado para o aplicativo
    appContent.width = '100%';
    appContent.height = 'calc(100% - 30px)'; // Ajusta a altura descontando a altura da barra de título
    appContent.style.border = 'none';
    // Adiciona o conteúdo do aplicativo à janela
    profileWindow.appendChild(appContent);

    // Adiciona a janela do perfil à área de desktop
    desktop.appendChild(profileWindow);

    // Redimensionamento da janela do perfil (opcional)
    makeResizable(profileWindow);

    // Movimentação da janela do perfil
    makeDraggable(profileWindow, titleBar);

    // Adiciona a referência da janela do perfil aberta ao array
    openAppWindows.push({
        appname: 'Profile',
        window: profileWindow,
        minimized: false,
        maximized: false,
        previousSize: null
    });

    // Adiciona o ícone na barra de tarefas (opcional para o perfil)
    addTaskbarIcon('Profile', 'core/systemapps/profile/img/icon.png');

    // Atualiza o user.json com as janelas abertas (opcional)
    updateOpenWindowsInJson();

    // Adiciona evento para trazer a janela do perfil para frente ao clicar nela
    profileWindow.addEventListener('mousedown', () => {
        bringToFront(profileWindow);
    });
}

// Inicialização: Adicione o listener para abrir a janela do perfil ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    const profileDiv = document.getElementById('profile');
    if (profileDiv) {
        profileDiv.addEventListener('click', (event) => {
            event.preventDefault();
            openProfileWindow();
        });
    }
});


// Função para adicionar ícone do aplicativo na barra de tarefas
function addTaskbarIcon(appname, iconSrc) {
    const taskbarApps = document.getElementById('taskbar-apps');

    // Verifica se o ícone já está na barra de tarefas
    if (taskbarApps.querySelector(`[data-appname="${appname}"]`)) {
        return; // Evita duplicatas na barra de tarefas
    }

    const appIcon = document.createElement('div');
    appIcon.classList.add('taskbar-app');
    appIcon.setAttribute('data-appname', appname); // Adiciona atributo para identificação
    appIcon.addEventListener('click', () => {
        const appWindow = openAppWindows.find(win => win.appname === appname);
        if (appWindow) {
            if (appWindow.minimized) {
                restoreApp(appWindow.window);
            } else {
                minimizeApp(appWindow.window);
            }
        }
    });

    // Cria o ícone do aplicativo
    const icon = document.createElement('img');
    icon.src = iconSrc; // Caminho para o ícone do aplicativo
    icon.alt = appname;
    icon.classList.add('taskbar-icon'); // Adicione uma classe se precisar de estilos específicos

    appIcon.appendChild(icon);
    taskbarApps.appendChild(appIcon);
}


// Função para minimizar o aplicativo
function minimizeApp(appWindow) {
    const appInfo = openAppWindows.find(app => app.window === appWindow);

    if (appInfo) {
        appWindow.style.display = 'none';
        appInfo.minimized = true; // Marca como minimizado
    }
}

// Função para restaurar o aplicativo ao clicar na barra de tarefas
function restoreApp(appWindow) {
    const appInfo = openAppWindows.find(app => app.window === appWindow);

    if (appInfo) {
        appWindow.style.display = 'block';
        appInfo.minimized = false; // Marca como não minimizado
        appWindow.style.zIndex = highestZIndex++;
    }
}

// Função para maximizar o aplicativo
function maximizeApp(appWindow) {
    const appInfo = openAppWindows.find(app => app.window === appWindow);

    if (appInfo) {
        if (!appInfo.maximized) {
            // Guarda as dimensões anteriores
            appInfo.previousSize = {
                width: appWindow.style.width,
                height: appWindow.style.height,
                top: appWindow.style.top,
                left: appWindow.style.left
            };

            // Maximiza a janela
            appWindow.style.width = '100%';
            appWindow.style.height = 'calc(100% - 30px)'; // Ajusta a altura descontando a altura da barra de título
            appWindow.style.top = '0';
            appWindow.style.left = '0';
            appInfo.maximized = true;
        } else {
            // Restaura as dimensões anteriores
            appWindow.style.width = appInfo.previousSize.width;
            appWindow.style.height = appInfo.previousSize.height;
            appWindow.style.top = appInfo.previousSize.top;
            appWindow.style.left = appInfo.previousSize.left;
            appInfo.maximized = false;
        }
    }
}

// Função para fechar o aplicativo
function closeApp(appWindow, app) {
    // Remove da área de desktop
    const desktop = document.getElementById('desktop');
    desktop.removeChild(appWindow);

    // Remove da lista de janelas abertas
    openAppWindows = openAppWindows.filter(win => win.appname !== app.appname);

    // Remove da barra de tarefas
    const taskbarApps = document.getElementById('taskbar-apps');
    const taskbarIcon = taskbarApps.querySelector(`[data-appname="${app.appname}"]`);
    if (taskbarIcon) {
        taskbarApps.removeChild(taskbarIcon);
    }
}

// Função para tornar uma janela redimensionável
function makeResizable(element) {
    const resizers = document.createElement('div');
    resizers.classList.add('resizers');

    const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top', 'right', 'bottom', 'left'];

    positions.forEach(pos => {
        const resizer = document.createElement('div');
        resizer.classList.add('resizer', pos);
        resizers.appendChild(resizer);
    });

    element.appendChild(resizers);

    const resizersList = element.querySelectorAll('.resizer');
    let originalWidth = 0;
    let originalHeight = 0;
    let originalX = 0;
    let originalY = 0;
    let originalMouseX = 0;
    let originalMouseY = 0;

    resizersList.forEach(resizer => {
        resizer.addEventListener('mousedown', function (e) {
            const appInfo = openAppWindows.find(app => app.window === element);
            if (appInfo && appInfo.maximized) {
                return; // Não permite redimensionar se estiver maximizado
            }

            e.preventDefault();
            originalWidth = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
            originalHeight = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
            originalX = element.getBoundingClientRect().left;
            originalY = element.getBoundingClientRect().top;
            originalMouseX = e.pageX;
            originalMouseY = e.pageY;
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        });

        function resize(e) {
            if (resizer.classList.contains('bottom-right')) {
                const width = originalWidth + (e.pageX - originalMouseX);
                const height = originalHeight + (e.pageY - originalMouseY);
                element.style.width = width + 'px';
                element.style.height = height + 'px';
            } else if (resizer.classList.contains('bottom-left')) {
                const height = originalHeight + (e.pageY - originalMouseY);
                const width = originalWidth - (e.pageX - originalMouseX);
                element.style.width = width + 'px';
                element.style.height = height + 'px';
                element.style.left = originalX + (e.pageX - originalMouseX) + 'px';
            } else if (resizer.classList.contains('top-right')) {
                const width = originalWidth + (e.pageX - originalMouseX);
                const height = originalHeight - (e.pageY - originalMouseY);
                element.style.width = width + 'px';
                element.style.height = height + 'px';
                element.style.top = originalY + (e.pageY - originalMouseY) + 'px';
            } else if (resizer.classList.contains('top-left')) {
                const width = originalWidth - (e.pageX - originalMouseX);
                const height = originalHeight - (e.pageY - originalMouseY);
                element.style.width = width + 'px';
                element.style.height = height + 'px';
                element.style.top = originalY + (e.pageY - originalMouseY) + 'px';
                element.style.left = originalX + (e.pageX - originalMouseX) + 'px';
            } else if (resizer.classList.contains('top')) {
                const height = originalHeight - (e.pageY - originalMouseY);
                element.style.height = height + 'px';
                element.style.top = originalY + (e.pageY - originalMouseY) + 'px';
            } else if (resizer.classList.contains('right')) {
                const width = originalWidth + (e.pageX - originalMouseX);
                element.style.width = width + 'px';
            } else if (resizer.classList.contains('bottom')) {
                const height = originalHeight + (e.pageY - originalMouseY);
                element.style.height = height + 'px';
            } else if (resizer.classList.contains('left')) {
                const width = originalWidth - (e.pageX - originalMouseX);
                element.style.width = width + 'px';
                element.style.left = originalX + (e.pageX - originalMouseX) + 'px';
            }
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResize);
        }
    });
}

// Função para redimensionar uma janela
function handleResize(event, element, handle) {
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
    const startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);

    function doResize(event) {
        if (handle.includes('right')) {
            const width = startWidth + event.clientX - startX;
            element.style.width = `${width}px`;
        }
        if (handle.includes('bottom')) {
            const height = startHeight + event.clientY - startY;
            element.style.height = `${height}px`;
        }
        if (handle.includes('left')) {
            const width = startWidth - event.clientX + startX;
            element.style.width = `${width}px`;
            element.style.left = `${startWidth - width + parseInt(element.style.left)}px`;
        }
        if (handle.includes('top')) {
            const height = startHeight - event.clientY + startY;
            element.style.height = `${height}px`;
            element.style.top = `${startHeight - height + parseInt(element.style.top)}px`;
        }
    }

    function stopResize() {
        window.removeEventListener('mousemove', doResize);
    }

    window.addEventListener('mousemove', doResize);
    window.addEventListener('mouseup', stopResize);
}



// Função para tornar uma janela arrastável e detectar cliques duplos para maximizar
function makeDraggable(element, handle) {
    let offsetX = 0;
    let offsetY = 0;

    handle.addEventListener('mousedown', function(event) {
        event.preventDefault();

        // Altera o cursor para 'grab' ao iniciar o movimento
        element.style.cursor = 'grab';
        
        // Verifica se a janela está maximizada
        const appInfo = openAppWindows.find(app => app.window === element);
        if (appInfo && appInfo.maximized) {
            return; // Não permite arrastar se estiver maximizado
        }

        offsetX = event.clientX - element.getBoundingClientRect().left;
        offsetY = event.clientY - element.getBoundingClientRect().top;
        window.addEventListener('mousemove', dragWindow);
        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', dragWindow);
            element.style.cursor = 'default';
        });
    });

    // Detecção de duplo clique para maximizar
    handle.addEventListener('dblclick', function(event) {
        event.preventDefault();
        maximizeApp(element);
    });

    function dragWindow(event) {
        element.style.top = `${event.clientY - offsetY}px`;
        element.style.left = `${event.clientX - offsetX}px`;
    }
}



// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadAppList(); // Carrega a lista de aplicativos ao iniciar
});





// Função para manipular abertura e fechamento do centro de notificações
document.addEventListener('DOMContentLoaded', function() {
    const clock = document.getElementById('clock');
    const notificationsCenter = document.getElementById('notifications-center');

    // Inicialmente esconda o notificationsCenter com opacidade 0
    notificationsCenter.style.display = 'none';

    // Abrir/fechar centro de notificações ao clicar no ícone de relógio
    clock.addEventListener('click', function(event) {
        event.stopPropagation(); // Impede que o evento se propague para o documento
        if (notificationsCenter.style.display === 'none' || notificationsCenter.style.display === '') {
            notificationsCenter.style.display = 'block';
            setTimeout(function() {
                notificationsCenter.classList.add('show');
            }, 10); // Pequeno delay para garantir a transição
        } else {
            notificationsCenter.classList.remove('show');
            setTimeout(function() {
                notificationsCenter.style.display = 'none';
            }, 500); // Tempo correspondente ao valor do transition
        }
    });

    // Fechar centro de notificações ao clicar fora dele
    document.addEventListener('click', function(event) {
        var target = event.target;
        if (target !== clock && !clock.contains(target) && target !== notificationsCenter && !notificationsCenter.contains(target)) {
            notificationsCenter.classList.remove('show');
            setTimeout(function() {
                notificationsCenter.style.display = 'none';
            }, 500); // Tempo correspondente ao valor do transition
        }
    });
});


/*
###################################################################
### Menu de Contexto (right-click no desktop)
###################################################################
*/

document.addEventListener("DOMContentLoaded", function() {
    const desktop = document.getElementById('desktop');
    const contextMenu = document.getElementById('context-menu');

    desktop.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        contextMenu.style.top = `${e.clientY}px`;
        contextMenu.style.left = `${e.clientX}px`;
        contextMenu.style.display = 'block';
    });

    document.addEventListener('click', function(e) {
        if (!contextMenu.contains(e.target)) {
            contextMenu.style.display = 'none';
        }
    });

    // Add event listeners to menu items recursively
    function addEventListeners(menu) {
        Array.prototype.forEach.call(menu.children, function(item) {
            if (item.tagName === 'LI') {
                item.addEventListener('click', function() {
                    //alert(`Opção ${item.textContent} selecionada`);
                    contextMenu.style.display = 'none';
                });
                if (item.querySelector('.submenu')) {
                    addEventListeners(item.querySelector('.submenu'));
                }
            }
        });
    }

    addEventListeners(contextMenu);
});



/*#################################################################################
# JANELA DE SETTINGS
##################################################################################*/

// Função para abrir a janela do perfil
function openSettingsWindow() {
    const desktop = document.getElementById('desktop');

    // Verifica se já existe uma instância da janela do perfil aberta
    let existingWindow = openAppWindows.find(win => win.appname === 'Settings');
    if (existingWindow) {
        if (existingWindow.minimized) {
            restoreApp(existingWindow.window);
        }
        return;
    }

    // Cria uma nova janela na área de desktop para o perfil
    const settingsWindow = document.createElement('div');
    settingsWindow.classList.add('app-window');
    settingsWindow.setAttribute('data-appname', 'Settings'); // Adiciona um atributo para identificação
    settingsWindow.style.zIndex = highestZIndex++; // Define o z-index e incrementa a variável

    // Cria a barra de título da janela do perfil
    const titleBar = document.createElement('div');
    titleBar.classList.add('title-bar');

    // Ícone do perfil
    const icon = document.createElement('img');
    icon.src = 'core/systemapps/settings/img/icon.png'; // Caminho para o ícone do perfil
    icon.alt = 'Settings';
    icon.classList.add('app-icon'); // Adicione uma classe se precisar de estilos específicos
    titleBar.appendChild(icon);

    // Título da janela do perfil
    const title = document.createElement('span');
    title.textContent = 'Settings';
    title.classList.add('title');
    titleBar.appendChild(title);

    // Botões de controle (minimizar, maximizar, fechar)
    const controls = document.createElement('div');
    controls.classList.add('controls');

    // Botão Minimizar (opcional para o perfil)
    const minimizeButton = document.createElement('button');
    minimizeButton.textContent = '_';
    minimizeButton.classList.add('minimize-button');
    minimizeButton.addEventListener('click', () => {
        minimizeApp(settingsWindow);
    });
    controls.appendChild(minimizeButton);

    // Botão Maximizar (opcional para o perfil)
    const maximizeButton = document.createElement('button');
    maximizeButton.textContent = '+';
    maximizeButton.classList.add('maximize-button');
    maximizeButton.addEventListener('click', () => {
        maximizeApp(settingsWindow);
    });
    controls.appendChild(maximizeButton);

    // Botão Fechar
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => {
        closeApp(settingsWindow, { appname: 'Settings' }); // Passe um objeto simulado para corresponder à estrutura esperada
    });
    controls.appendChild(closeButton);

    titleBar.appendChild(controls);
    settingsWindow.appendChild(titleBar);

   
    const appContent = document.createElement('iframe');
    appContent.src = 'core/systemapps/settings'; // Caminho personalizado para o aplicativo
    appContent.width = '100%';
    appContent.height = 'calc(100% - 30px)'; // Ajusta a altura descontando a altura da barra de título
    appContent.style.border = 'none';
    // Adiciona o conteúdo do aplicativo à janela
    settingsWindow.appendChild(appContent);


    // Adiciona a janela do perfil à área de desktop
    desktop.appendChild(settingsWindow);


    

    // Redimensionamento da janela do perfil (opcional)
    makeResizable(settingsWindow);

    // Movimentação da janela do perfil
    makeDraggable(settingsWindow, titleBar);

    // Adiciona a referência da janela do perfil aberta ao array
    openAppWindows.push({
        appname: 'Settings',
        window: settingsWindow,
        minimized: false,
        maximized: false,
        previousSize: null
    });

    // Adiciona o ícone na barra de tarefas (opcional para o perfil)
    addTaskbarIcon('Settings', 'core/systemapps/settings/img/icon.png');

    // Adiciona evento para trazer a janela do perfil para frente ao clicar nela
    settingsWindow.addEventListener('mousedown', () => {
        bringToFront(settingsWindow);
    });
}

// Inicialização: Adicione o listener para abrir a janela do perfil ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    const settingsDiv = document.getElementById('settings');
    if (settingsDiv) {
        settingsDiv.addEventListener('click', (event) => {
            event.preventDefault();
            openSettingsWindow();
        });
    }
});


/*#################################################################################
# JANELA DE APP STORE
##################################################################################*/

function openAppstoreWindow() {
    const desktop = document.getElementById('desktop');

    // Verifica se já existe uma instância da janela do perfil aberta
    let existingWindow = openAppWindows.find(win => win.appname === 'Appstore');
    if (existingWindow) {
        if (existingWindow.minimized) {
            restoreApp(existingWindow.window);
        }
        return;
    }

    // Cria uma nova janela na área de desktop para o perfil
    const appstoreWindow = document.createElement('div');
    appstoreWindow.classList.add('app-window');
    appstoreWindow.setAttribute('data-appname', 'appstore'); // Adiciona um atributo para identificação
    appstoreWindow.style.zIndex = highestZIndex++; // Define o z-index e incrementa a variável

    // Cria a barra de título da janela do perfil
    const titleBar = document.createElement('div');
    titleBar.classList.add('title-bar');

    // Ícone do perfil
    const icon = document.createElement('img');
    icon.src = 'core/systemapps/appstore/img/icon.png'; // Caminho para o ícone do perfil
    icon.alt = 'Appstore';
    icon.classList.add('app-icon'); // Adicione uma classe se precisar de estilos específicos
    titleBar.appendChild(icon);

    // Título da janela do perfil
    const title = document.createElement('span');
    title.textContent = 'Appstore';
    title.classList.add('title');
    titleBar.appendChild(title);

    // Botões de controle (minimizar, maximizar, fechar)
    const controls = document.createElement('div');
    controls.classList.add('controls');

    // Botão Minimizar (opcional para o perfil)
    const minimizeButton = document.createElement('button');
    minimizeButton.textContent = '_';
    minimizeButton.classList.add('minimize-button');
    minimizeButton.addEventListener('click', () => {
        minimizeApp(appstoreWindow);
    });
    controls.appendChild(minimizeButton);

    // Botão Maximizar (opcional para o perfil)
    const maximizeButton = document.createElement('button');
    maximizeButton.textContent = '+';
    maximizeButton.classList.add('maximize-button');
    maximizeButton.addEventListener('click', () => {
        maximizeApp(appstoreWindow);
    });
    controls.appendChild(maximizeButton);

    // Botão Fechar
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => {
        closeApp(appstoreWindow, { appname: 'Appstore' }); // Passe um objeto simulado para corresponder à estrutura esperada
    });
    controls.appendChild(closeButton);

    titleBar.appendChild(controls);
    appstoreWindow.appendChild(titleBar);

   

    const appContent = document.createElement('iframe');
    appContent.src = 'core/systemapps/appstore'; // Caminho personalizado para o aplicativo
    appContent.width = '100%';
    appContent.height = 'calc(100% - 30px)'; // Ajusta a altura descontando a altura da barra de título
    appContent.style.border = 'none';

    // Adiciona o conteúdo do aplicativo à janela
    appstoreWindow.appendChild(appContent);

    
    // Adiciona a janela do perfil à área de desktop
    desktop.appendChild(appstoreWindow);

    // Redimensionamento da janela do perfil (opcional)
    makeResizable(appstoreWindow);

    // Movimentação da janela do perfil
    makeDraggable(appstoreWindow, titleBar);

    // Adiciona a referência da janela do perfil aberta ao array
    openAppWindows.push({
        appname: 'Appstore',
        window: appstoreWindow,
        minimized: false,
        maximized: false,
        previousSize: null
    });

    // Adiciona o ícone na barra de tarefas (opcional para o perfil)
    addTaskbarIcon('Appstore', 'core/systemapps/appstore/img/icon.png');

    // Adiciona evento para trazer a janela do perfil para frente ao clicar nela
    appstoreWindow.addEventListener('mousedown', () => {
        bringToFront(appstoreWindow);
    });
}

// Inicialização: Adicione o listener para abrir a janela do perfil ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    const appstoreDiv = document.getElementById('appstore');
    if (appstoreDiv) {
        appstoreDiv.addEventListener('click', (event) => {
            event.preventDefault();
            openAppstoreWindow();
        });
    }
});



/*####################################################################################
# JANELA DO EXPLORADOR DE ARQUIVOS
#####################################################################################*/
function openExplorerWindow() {
    const desktop = document.getElementById('desktop');

    // Verifica se já existe uma instância da janela do perfil aberta
    let existingWindow = openAppWindows.find(win => win.appname === 'Explorer');
    if (existingWindow) {
        if (existingWindow.minimized) {
            restoreApp(existingWindow.window);
        }
        return;
    }

    // Cria uma nova janela na área de desktop para o perfil
    const explorerWindow = document.createElement('div');
    explorerWindow.classList.add('app-window');
    explorerWindow.setAttribute('data-appname', 'Explorer'); // Adiciona um atributo para identificação
    explorerWindow.style.zIndex = highestZIndex++; // Define o z-index e incrementa a variável

    // Cria a barra de título da janela do perfil
    const titleBar = document.createElement('div');
    titleBar.classList.add('title-bar');

    // Ícone do perfil
    const icon = document.createElement('img');
    icon.src = 'core/systemapps/explorer/assets/img/icon.png'; // Caminho para o ícone do perfil
    icon.alt = 'Explorer';
    icon.classList.add('app-icon'); // Adicione uma classe se precisar de estilos específicos
    titleBar.appendChild(icon);

    // Título da janela do perfil
    const title = document.createElement('span');
    title.textContent = 'Explorer';
    title.classList.add('title');
    titleBar.appendChild(title);

    // Botões de controle (minimizar, maximizar, fechar)
    const controls = document.createElement('div');
    controls.classList.add('controls');

    // Botão Minimizar (opcional para o perfil)
    const minimizeButton = document.createElement('button');
    minimizeButton.textContent = '_';
    minimizeButton.classList.add('minimize-button');
    minimizeButton.addEventListener('click', () => {
        minimizeApp(explorerWindow);
    });
    controls.appendChild(minimizeButton);

    // Botão Maximizar (opcional para o perfil)
    const maximizeButton = document.createElement('button');
    maximizeButton.textContent = '+';
    maximizeButton.classList.add('maximize-button');
    maximizeButton.addEventListener('click', () => {
        maximizeApp(explorerWindow);
    });
    controls.appendChild(maximizeButton);

    // Botão Fechar
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => {
        closeApp(explorerWindow, { appname: 'Explorer' }); // Passe um objeto simulado para corresponder à estrutura esperada
    });
    controls.appendChild(closeButton);

    titleBar.appendChild(controls);
    explorerWindow.appendChild(titleBar);

    const appContent = document.createElement('iframe');
    appContent.src = 'core/systemapps/explorer'; // Caminho personalizado para o aplicativo
    appContent.width = '100%';
    appContent.height = 'calc(100% - 30px)'; // Ajusta a altura descontando a altura da barra de título
    appContent.style.border = 'none';
    // Adiciona o conteúdo do aplicativo à janela
    explorerWindow.appendChild(appContent);

    // Adiciona a janela do perfil à área de desktop
    desktop.appendChild(explorerWindow);

    // Redimensionamento da janela do perfil (opcional)
    makeResizable(explorerWindow);

    // Movimentação da janela do perfil
    makeDraggable(explorerWindow, titleBar);

    // Adiciona a referência da janela do perfil aberta ao array
    openAppWindows.push({
        appname: 'Explorer',
        window: explorerWindow,
        minimized: false,
        maximized: false,
        previousSize: null
    });

    // Adiciona o ícone na barra de tarefas (opcional para o perfil)
    //addTaskbarIcon('Explorer', 'core/systemapps/explorer/img/icon.png');

    // Atualiza o user.json com as janelas abertas (opcional)
    updateOpenWindowsInJson();

    // Adiciona evento para trazer a janela do perfil para frente ao clicar nela
    explorerWindow.addEventListener('mousedown', () => {
        bringToFront(explorerWindow);
    });
}

// Inicialização: Adicione o listener para abrir a janela do perfil ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    const explorerDiv = document.getElementById('explorer');
    if (explorerDiv) {
        explorerDiv.addEventListener('click', (event) => {
            event.preventDefault();
            openExplorerWindow();
        });
    }
});

/*####################### FIM DO EXPLORADOR DE ARQUIVOS########################################*/


/*#################### OPEN TEXT EDITOR #######################################################*/
function openTextEditor(filePath) {
    // Verifica se já existe uma instância do editor aberta
    let existingWindow = openAppWindows.find(win => win.appname === 'TextEditor');
    if (existingWindow) {
        if (existingWindow.minimized) {
            restoreApp(existingWindow.window);
        }
        return;
    }

    // Cria uma nova janela para o editor de texto
    const appWindow = document.createElement('div');
    appWindow.classList.add('app-window');
    appWindow.setAttribute('data-appname', 'TextEditor');
    appWindow.style.zIndex = highestZIndex++;

    const titleBar = document.createElement('div');
    titleBar.classList.add('title-bar');

    const title = document.createElement('span');
    title.textContent = 'Text Editor';
    title.classList.add('title');
    titleBar.appendChild(title);

    const controls = document.createElement('div');
    controls.classList.add('controls');

    const minimizeButton = document.createElement('button');
    minimizeButton.textContent = '_';
    minimizeButton.classList.add('minimize-button');
    minimizeButton.addEventListener('click', () => minimizeApp(appWindow));
    controls.appendChild(minimizeButton);

    const maximizeButton = document.createElement('button');
    maximizeButton.textContent = '+';
    maximizeButton.classList.add('maximize-button');
    maximizeButton.addEventListener('click', () => maximizeApp(appWindow));
    controls.appendChild(maximizeButton);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => closeApp(appWindow, { appname: 'TextEditor' }));
    controls.appendChild(closeButton);

    titleBar.appendChild(controls);
    appWindow.appendChild(titleBar);

    // Cria o conteúdo da janela
    const textContent = document.createElement('textarea');
    textContent.id = 'text-editor-content';
    textContent.style.width = '100%';
    textContent.style.height = 'calc(100% - 30px)'; // Ajusta altura descontando a altura da barra de título
    textContent.style.border = 'none';

    appWindow.appendChild(textContent);
    document.getElementById('desktop').appendChild(appWindow);

    makeResizable(appWindow);
    makeDraggable(appWindow, titleBar);

    openAppWindows.push({
        appname: 'TextEditor',
        window: appWindow,
        minimized: false,
        maximized: false,
        previousSize: null
    });

    addTaskbarIcon('TextEditor', 'path/to/text-editor-icon.png');

    appWindow.addEventListener('mousedown', () => bringToFront(appWindow));

    // Carrega o conteúdo do arquivo de texto
    fetch(filePath)
        .then(response => response.text())
        .then(text => {
            textContent.value = text;
        })
        .catch(error => console.error('Erro ao carregar o arquivo de texto:', error));
}

/*#################### OPEN TEXT EDITOR END ####################################################*/
function openTextEditor(filePath) {
    // Verifica se já existe uma instância do editor de texto aberta
    let existingEditor = openAppWindows.find(win => win.appname === 'Text Editor');
    if (existingEditor) {
        if (existingEditor.minimized) {
            restoreApp(existingEditor.window);
        }
        return;
    }
    
    // Cria uma nova janela para o editor de texto
    const appWindow = document.createElement('div');
    appWindow.classList.add('app-window');
    appWindow.setAttribute('data-appname', 'Text Editor'); // Identifica a janela como Editor de Texto
    appWindow.style.zIndex = highestZIndex++; // Define o z-index e incrementa a variável

    // Cria a barra de título do editor
    const titleBar = document.createElement('div');
    titleBar.classList.add('title-bar');

    // Ícone do editor
    const icon = document.createElement('img');
    icon.src = 'assets/img/text-editor-icon.png'; // Caminho para o ícone do editor
    icon.alt = 'Text Editor';
    icon.classList.add('app-icon');
    titleBar.appendChild(icon);

    // Título do editor
    const title = document.createElement('span');
    title.textContent = 'Text Editor';
    title.classList.add('title');
    titleBar.appendChild(title);

    // Botões de controle (minimizar, maximizar, fechar)
    const controls = document.createElement('div');
    controls.classList.add('controls');

    // Botão Minimizar
    const minimizeButton = document.createElement('button');
    minimizeButton.textContent = '_';
    minimizeButton.classList.add('minimize-button');
    minimizeButton.addEventListener('click', () => {
        minimizeApp(appWindow);
    });
    controls.appendChild(minimizeButton);

    // Botão Maximizar
    const maximizeButton = document.createElement('button');
    maximizeButton.textContent = '+';
    maximizeButton.classList.add('maximize-button');
    maximizeButton.addEventListener('click', () => {
        maximizeApp(appWindow);
    });
    controls.appendChild(maximizeButton);

    // Botão Fechar
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => {
        closeApp(appWindow, { appname: 'Text Editor' });
    });
    controls.appendChild(closeButton);

    titleBar.appendChild(controls);
    appWindow.appendChild(titleBar);

    // Cria o conteúdo do editor (iframe)
    const appContent = document.createElement('iframe');
    appContent.src = `core/systemapps/text-editor/index.html?file=${encodeURIComponent(filePath)}`; // Passa o caminho do arquivo para o editor
    appContent.width = '100%';
    appContent.height = 'calc(100% - 30px)'; // Ajusta a altura descontando a altura da barra de título
    appContent.style.border = 'none';

    appWindow.appendChild(appContent);

    // Adiciona a janela à área de desktop
    const desktop = document.getElementById('desktop');
    desktop.appendChild(appWindow);

    // Redimensionamento da janela
    makeResizable(appWindow);

    // Movimentação da janela
    makeDraggable(appWindow, titleBar);

    // Adiciona a referência da janela aberta ao array
    openAppWindows.push({
        appname: 'Text Editor',
        window: appWindow,
        minimized: false,
        maximized: false,
        previousSize: null
    });

    // Adiciona o ícone na barra de tarefas
    addTaskbarIcon('Text Editor', 'assets/img/text-editor-icon.png');

    // Adiciona evento para trazer a janela para frente ao clicar nela
    appWindow.addEventListener('mousedown', () => {
        bringToFront(appWindow);
    });
}
