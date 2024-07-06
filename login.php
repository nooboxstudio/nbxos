<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>LOGIN | NBX OS</title>
    <script src="kernel/uuidGenerator.js"></script>
    <link rel="stylesheet" href="core/assets/css/login.css">
    <link rel="shortcut icon" href="core/assets/img/favicon.ico" type="image/x-icon">
</head>
<body>
    <!-- Alerta de erro -->
    <div id="alertError" class="alert alert-danger" role="alert" style="display: none;">
        <span id="alertText"></span>
        <button type="button" class="btn-close" onclick="closeAlert()">×</button>
    </div>

    <div id="loginWindow">
        <form id="loginForm">
            <div id="row">
                <span class="form-logo">NBX OS</span>
            </div>
            <div id="row">
                <input type="text" name="pcname" placeholder="PC Name" required>
            </div>
            <div id="row">
                <input type="password" name="pass" placeholder="Password" required>
            </div>
            <div id="row">
                <button type="submit" class="btn-login">Login</button>
            </div>
        </form>
        <div id="row" class="register-span">Não possui uma conta? <a href="register" class="purple">Registre-se!</a></div>
    </div>

    <script>
        // Processa o login
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);

            fetch('core/login/login.php', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
              .then(data => {
                  if (data.success) {
                      window.location.href = './';
                  } else {
                      displayError(data.message);
                  }
              }).catch(error => console.error('Error:', error));
        });

        // Função para exibir o alerta de erro
        function displayError(message) {
            const alertError = document.getElementById('alertError');
            const alertText = document.getElementById('alertText');
            alertText.textContent = `Error: ${message}`;
            alertError.style.display = 'block';

            // Evento para fechar o alerta ao clicar fora dele
            document.addEventListener('click', function(event) {
                if (!alertError.contains(event.target)) {
                    alertError.style.display = 'none';
                }
            });
        }

        // Função para fechar o alerta
        function closeAlert() {
            document.getElementById('alertError').style.display = 'none';
        }
    </script>
</body>
</html>
