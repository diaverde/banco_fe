//const newAccountURL = "https://mintic-banco-unal.herokuapp.com/account/new";
const newAccountURL = "http://127.0.0.1:8000/account/new";

function crear_cuenta() {
    const userData = {
        userId: sessionStorage.getItem("clientId")
    };
    const dataToSend = JSON.stringify(userData);
    const token = sessionStorage.getItem('accessToken');
    
    fetch(newAccountURL, {
        method: "POST",
        headers: {
            "Content-Type": "text/json",
            "Authorization": "Bearer " + token
        },
        body: dataToSend
    })
        .then(response => {
            if (response.ok)
                return response.text()
            else
                throw new Error(response.status);
        })
        .then(data => {
            console.log("Resultado: " + data);
            alert(data);
            goBack();
        })
        .catch(err => {
            console.error("ERROR: ", err.message)
            alert("Error creando cuenta");
            goBack();
        });
}

function goBack() {
    const userId = sessionStorage.getItem("clientId");
    window.location.href = './cliente.html?id=' + userId;
}

// --------------------
document.getElementById("newAccountBtn").addEventListener('click', crear_cuenta);
document.getElementById("backBtn").addEventListener('click', goBack);