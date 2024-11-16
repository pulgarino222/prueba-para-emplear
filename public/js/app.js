function signIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    if (!email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    

    fetch('http://localhost:3001/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.accessToken) {
            alert('Sesión iniciada con éxito');
     
            window.location.href = `http://localhost:3001/dashboard?token=${data.accessToken}`;
        } else {
            alert('Error al iniciar sesión');
        }
    })
    .catch(error => {
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un error al iniciar sesión');
    });
}

function googleLogin() {
    const redirectUrl = encodeURIComponent(window.location.href);  
    window.location.href = `http://localhost:3001/auth/google?redirect=${redirectUrl}`;
}
