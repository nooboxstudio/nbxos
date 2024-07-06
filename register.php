<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Registro | NBX OS</title>
    <script src="kernel/uuidGenerator.js"></script>
    <link rel="stylesheet" href="core/assets/css/login.css">
    <link rel="shortcut icon" href="core/assets/img/favicon.ico" type="image/x-icon">
</head>
<body>
    <div id="loginWindow">
    <form id="registerForm">
        <div id="row"><span class="form-logo">NBX OS</span></div>
        <div id="row"><input type="text" name="user" placeholder="Name" required></div>
        <div id="row"><input type="password" name="pass" placeholder="Password" required></div>
        <div id="row"><input type="text" name="pcname" placeholder="PC Name" required></div>
        <div id="row"><button type="submit" class="btn-login">Register</button></div>
        <div id="row" class="register-span">Já possuí conta? <a href="login" class="purple">Login!</a></div>
        
        
        
        
    </form>
    </div>
    <div id="message"></div>

    <script>
        document.getElementById('registerForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            data.uuid = generateUUID(); // Gera o UUID

            fetch('kernel/registerPC.php', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                return response.json().then(data => {
                    if (response.ok) {
                        alert('Registrado com sucesso');
                        window.location.href = './';
                    } else {
                        document.getElementById('message').textContent = data.message;
                    }
                });
            }).catch(error => console.error('Error:', error));
        });
    </script>
</body>
</html>
