document.getElementById('loginBtn').addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    // Параметры запроса
    var requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
        redirect: 'follow'
    };
    
    // Замените 'https://your-api-url.com/login' на URL вашего API
    fetch('/login', requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                // Пользователь найден, переадресация на защищенную страницу
                window.location.href = 'main/main.html';
            } else {
                // Пользователь не найден, отображение ошибки
                document.getElementById('errorMessage').style.display = 'block';
                document.getElementById('errorMessage').textContent = result.message;
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
});