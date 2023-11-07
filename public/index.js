const buttonLogOut = document.getElementById('signOut')

function handleCredentialResponse(response) {

    const body = { id_token: response.credential }

    fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(res => localStorage.setItem('email', res.usuario.correo))
        .then(() => document.title = 'Acceso | Permitido')
        .catch(console.warn)
}

buttonLogOut.addEventListener('click', async () => {
    console.log(google.accounts.id)
    google.accounts.id.disableAutoSelect()
    google.accounts.id.revoke(localStorage.getItem('email'), () => {
        localStorage.clear()
        location.reload()
    })
    document.title = 'Acceso | Denegado'
})

buttonLogOut.addEventListener('mouseenter', () => {
    buttonLogOut.style.cursor = 'pointer'
})

