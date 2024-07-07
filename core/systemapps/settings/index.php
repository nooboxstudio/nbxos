<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="assets/css/settings.css">
    <style>
        /* Estilo de exemplo para esconder todas as divs de conteúdo */
        .content div {
            display: none;
        }
        /* Mostra a div de conteúdo ativa */
        .content div.active {
            display: block;
        }
    </style>
</head>
<body>
    <nav id="nav" class="left">
        <ul id="menu" class="left">
            <li><a href="#" data-target="perfil">Perfil</a></li>
            <li><a href="#" data-target="apps">Apps</a></li>
            <li><a href="#" data-target="users">Users</a></li>
            <li><a href="#" data-target="abc">abc</a></li>
        </ul>
    </nav>



    <div id="content" class="content">
        <div id="perfil" class="active">
            Conteúdo do Perfil
            
        </div>
        <div id="apps">Conteúdo dos Apps</div>
        <div id="users">Conteúdo dos Users</div>
        <div id="abc">Conteúdo do abc</div>
    </div>




    <script>
        // Obtém os elementos <a> dentro de cada <li> do menu
        const menuLinks = document.querySelectorAll('#menu li a');

        // Adiciona um evento de clique a cada <a>
        menuLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Previne o comportamento padrão do link

                // Remove a classe 'active' de todas as divs de conteúdo
                document.querySelectorAll('.content div').forEach(div => {
                    div.classList.remove('active');
                });

                // Obtém o ID do conteúdo correspondente ao link clicado
                const targetId = this.getAttribute('data-target');

                // Adiciona a classe 'active' ao conteúdo correspondente
                const targetContent = document.getElementById(targetId);
                targetContent.classList.add('active');
            });
        });
    </script>
</body>
</html>
