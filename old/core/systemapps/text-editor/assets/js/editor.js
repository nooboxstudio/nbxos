/*###############################################################################################
 *  MENU ARQUIVO
 ###############################################################################################*/

/*###############################################################################################
 *  MENU EDITAR
 ###############################################################################################*/

// Focar no textarea antes de executar os comandos
var editor = document.getElementById('editor');

document.getElementById('undo').addEventListener('click', function() {
    editor.focus();
    document.execCommand('undo');
});

document.getElementById('cut').addEventListener('click', function() {
    editor.focus();
    document.execCommand('cut');
});

document.getElementById('copy').addEventListener('click', function() {
    editor.focus();
    document.execCommand('copy');
});

document.getElementById('paste').addEventListener('click', function() {
    editor.focus();
    document.execCommand('paste');
});

document.getElementById('delete').addEventListener('click', function() {
    editor.focus();
    document.execCommand('delete');
});


/*###############################################################################################
 *  MENU FORMATAR
 ###############################################################################################*/
// Seleciona os elementos do menu de formatação
var fontMenu = document.getElementById('font-menu');
var wrapCheckbox = document.getElementById('wrap-checkbox');
var editor = document.getElementById('editor');

// Adiciona um evento para cada item de fonte
document.querySelectorAll('#font-menu .submenu-item').forEach(function(item) {
    item.addEventListener('click', function() {
        var selectedFont = this.getAttribute('data-font');
        editor.style.fontFamily = selectedFont;
    });
});

// Adiciona um evento para o checkbox de quebra automática de linha
wrapCheckbox.addEventListener('change', function() {
    if (this.checked) {
        editor.style.whiteSpace = 'pre-wrap'; // Ativa quebra automática de linha
    } else {
        editor.style.whiteSpace = 'pre'; // Desativa quebra automática de linha
    }
});

 /*###############################################################################################
 *  MENU EXIBIR
 ###############################################################################################*/
// Seleciona o textarea e define o tamanho da fonte inicial
var editor = document.getElementById('editor');
var fontSize = 16; // Tamanho de fonte padrão em pixels

document.getElementById('zoom-in').addEventListener('click', function() {
    fontSize += 2; // Aumenta o tamanho da fonte
    editor.style.fontSize = fontSize + 'px';
});

document.getElementById('zoom-out').addEventListener('click', function() {
    fontSize -= 2; // Diminui o tamanho da fonte
    if (fontSize < 8) fontSize = 8; // Limita o tamanho mínimo da fonte
    editor.style.fontSize = fontSize + 'px';
});

document.getElementById('zoom-reset').addEventListener('click', function() {
    fontSize = 16; // Reseta o tamanho da fonte para o padrão
    editor.style.fontSize = fontSize + 'px';
});

 /*###############################################################################################
 *  MENU AJUDA
 ###############################################################################################*/
 // Seleciona os modais e botões de fechamento
var helpModal = document.getElementById('help-modal');
var feedbackModal = document.getElementById('feedback-modal');
var aboutModal = document.getElementById('about-modal');

var closeHelp = document.getElementById('close-help');
var closeFeedback = document.getElementById('close-feedback');
var closeAbout = document.getElementById('close-about');

// Abre o modal de ajuda
document.getElementById('help').addEventListener('click', function() {
    helpModal.style.display = 'block';
});

// Abre o modal de feedback
document.getElementById('feedback').addEventListener('click', function() {
    feedbackModal.style.display = 'block';
});

// Abre o modal sobre o Notepad
document.getElementById('about').addEventListener('click', function() {
    aboutModal.style.display = 'block';
});

// Fecha o modal de ajuda
closeHelp.addEventListener('click', function() {
    helpModal.style.display = 'none';
});

// Fecha o modal de feedback
closeFeedback.addEventListener('click', function() {
    feedbackModal.style.display = 'none';
});

// Fecha o modal sobre o Notepad
closeAbout.addEventListener('click', function() {
    aboutModal.style.display = 'none';
});

// Fecha qualquer modal se o usuário clicar fora dele
window.addEventListener('click', function(event) {
    if (event.target === helpModal) {
        helpModal.style.display = 'none';
    } else if (event.target === feedbackModal) {
        feedbackModal.style.display = 'none';
    } else if (event.target === aboutModal) {
        aboutModal.style.display = 'none';
    }
});



