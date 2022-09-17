const loginURL = "http://127.0.0.1:8000/login";
//const loginURL = "https://mintic-banco-unal.herokuapp.com/customers/";

function validar_correo(string) {
    let result = false;
    const letters = /^\S+@\S+\.\S+$/;
    if (string.match(letters)) {
        result = true;
    }
    return result;
}

function validar_contrasena(string) {
    let result = false;
    if (string.length >= 5) {
        result = true;
    }
    return result;
}

function validar_datos(evt) {
    evt.preventDefault();
    const email = document.login.email.value.trim();
    const password = document.login.password.value.trim();

    result = validar_correo(email);
    if (!result) {
        alert("Correo electrónico no es válido");
        return;
    }
    result = validar_contrasena(password);
    if (!result) {
        alert("Contraseña no es válida");
        return;
    }

    if (result) {
        const customer = {
            email: email,
            password: password
        }
        const dataToSend = JSON.stringify(customer);
        sendData(dataToSend);
    }
}

function sendData(data) {
    console.log(data);
    fetch(loginURL, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: data
    })
        .then(response => {
            if (response.ok || response.status == 400)
                return response.text()
            else
                throw new Error(response.status);
        })
        .then(data => {
            console.log("Resultado: " + data);
            if (data.includes("Credenciales inválidas"))
                handleError("credenciales");
            else
                handleSuccess(JSON.parse(data));
        })
        .catch(err => {
            console.error("ERROR: ", err.message)
            handleError("otro");
        });
}

function handleSuccess(data) {
    document.querySelector("#formData").remove();
    const successMesage = document.createElement("p");
    successMesage.textContent = "Ingreso exitoso. Accediendo a su información...";
    const areaMensaje = document.getElementById("info");
    areaMensaje.appendChild(successMesage);
    setTimeout(() => window.location.href = './cliente.html?id=' + data.id, 1000);
}

function handleError(errType) {
    document.querySelector("#formData").remove();
    const errorMesage = document.createElement("p");
    if (errType == "credenciales")
        errorMesage.textContent = "Credenciales inválidas. Revise e intente de nuevo.";
    else
        errorMesage.textContent = "No se pudo ingresar. Intente luego.";
    const areaMensaje = document.getElementById("info");
    areaMensaje.appendChild(errorMesage);
}

// --------------------
document.login.addEventListener('submit', validar_datos);