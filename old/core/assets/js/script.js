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

/*#############################################################################
# Função para adicionar ícone do aplicativo na barra de tarefas
##############################################################################*/ 
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

/*####################### FIM DA JANELA DO EXPLORADOR DE ARQUIVOS ########################################*/

/*####################### EXPLORADOR DE ARQUIVOS ########################################*/
document.addEventListener('DOMContentLoaded', function() {
    const baseUrl = 'list_files.php';  // Caminho para list_files.php
    let currentFolder = 'desktop'; // Variável para rastrear a pasta atual
    let currentFolderDesktop = 'desktop'; // Variável para rastrear a pasta atual
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

    // Função para criar novo item (pasta ou arquivo)
    function createNewItemDesktop(type, name) {
        const path = `${currentFolderDesktop}/${name}`;
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
                console.log('Recarregando a pasta:', currentFolderDesktop);
                loadFolder(currentFolderDesktop); // Recarrega a pasta atual
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

      // Adiciona event listeners para criar nova pasta e arquivo
      document.getElementById('new-folder-desktop').addEventListener('click', function(event) {
        event.preventDefault();
        const folderName = "Nova Pasta";
        if (folderName) {
            createNewItemDesktop('folder', folderName);
        }
    });

    document.getElementById('new-file-desktop').addEventListener('click', function(event) {
        event.preventDefault();
        const fileName = "Novo Arquivo";
        const fileextension = ".txt";
        if (fileName) {
            createNewItemDesktop('file', fileName+fileextension);
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
/*document.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // Previne a ação padrão (exibir o menu de contexto)
});*/

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


/*####################### FIM DO EXPLORADOR DE ARQUIVOS ########################################*/







