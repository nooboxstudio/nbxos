function updateClock() {
  var now = new Date();
  var day = now.getDate();
  var month = now.getMonth() + 1; // Mês começa do zero, então somamos 1
  var year = now.getFullYear();
  var hours = now.getHours();
  var minutes = now.getMinutes();

  // Formatando os números para dois dígitos, se necessário
  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;

  var currentTime = hours + ':' + minutes;
  var currentDate = day + '/' + month + '/' + year;
  
  document.getElementById('time').textContent = currentTime;
  document.getElementById('date').textContent = currentDate;
}

// Chamando a função inicialmente para exibir a hora atual
updateClock();

// Atualizando a cada minuto (60 segundos)
setInterval(updateClock, 60000);