//const newCustomerURL = "https://mintic-banco-unal.herokuapp.com/customers/new";
const newCustomerURL = "http://127.0.0.1:8000/customers/new";

function validar_nombre_apellido(string) {
    let result = false;
    const letters = /^[A-Z a-z]+$/;
    if (string.match(letters)) {
        result = true;
    }
    return result;
}

function validar_cedula(string) {
    let result = false;
    if (!isNaN(Number(string)) && Number(string) >= 1000) {
        result = true;
    }
    return result;
}

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
    /*
    const id = document.getElementsByName("id").value;
    const fname = document.getElementByName("firstName").value;
    const lname = document.getElementByName("lastName").value;
    const email = document.getElementByName("email").value;
    const password = document.getElementByName("password").value;
    */
    const id = document.registro.id.value;
    const fname = document.registro.firstName.value.trim();
    const lname = document.registro.lastName.value.trim();
    const email = document.registro.email.value.trim();
    const password = document.registro.password.value.trim();

    let result = validar_cedula(id);
    if (!result) {
        alert("Cédula no es válida");
        return false;
    }
    result = validar_nombre_apellido(fname);
    if (!result) {
        alert("Nombre no es válido");
        return;
    }
    result = validar_nombre_apellido(lname);
    if (!result) {
        alert("Apellido no es válido");
        return;
    }
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
            id: id,
            firstName: fname,
            lastName: lname,
            email: email,
            password: password
        }
        alert(`Usuario registrado con los siguientes datos:
            Cédula: ${customer.id}
            Nombre: ${customer.firstName} ${customer.lastName}
            Correo electrónico: ${customer.email}
        `);
        const dataToSend = JSON.stringify(customer);
        sendData(dataToSend);
    }
}

function sendData(data) {
    console.log(data);
    fetch(newCustomerURL, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: data
    })
        .then(response => {
            if (response.ok)
                return response.text()
            else
                throw new Error(response.status);
        })
        .then(data => {
            console.log("Resultado: " + data);
            handleSuccess();
        })
        .catch(err => {
            console.error("ERROR: ", err.message)
            handleError();
        });
}

function handleSuccess() {
    document.querySelector("#formData").remove();
    const successMesage = document.createElement("p");
    successMesage.textContent = "Cliente creado exitosamente";
    const areaMensaje = document.getElementById("info");
    areaMensaje.appendChild(successMesage);
}

function handleError() {
    document.querySelector("#formData").remove();
    const errorMesage = document.createElement("p");
    errorMesage.textContent = "No se pudo crear el cliente. Intente luego.";
    const areaMensaje = document.getElementById("info");
    areaMensaje.appendChild(errorMesage);
}

// --------------------
document.registro.addEventListener('submit', validar_datos);