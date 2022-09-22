//const updateCustomerURL = "https://mintic-banco-unal.herokuapp.com/customers/update/";
const updateCustomerURL = "http://127.0.0.1:8000/customers/update/";

let userId = sessionStorage.getItem("clientId");

function validar_nombre_apellido(string) {
    let result = false;
    const letters = /^[A-Z a-z]+$/;
    if (string.match(letters)) {
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
    
    const fname = document.actualizar.firstName.value.trim();
    const lname = document.actualizar.lastName.value.trim();
    const email = document.actualizar.email.value.trim();
    const password = document.actualizar.password.value.trim();

    let result = true;
    if (fname) {
        result = validar_nombre_apellido(fname);
        if (!result) {
            alert("Nombre no es válido");
            return;
        }
    }
    if (lname) {
        result = validar_nombre_apellido(lname);
        if (!result) {
            alert("Apellido no es válido");
            return;
        }
    }
    if (email) {
        result = validar_correo(email);
        if (!result) {
            alert("Correo electrónico no es válido");
            return;
        }
    }
    if (password) {
        result = validar_contrasena(password);
        if (!result) {
            alert("Contraseña no es válida");
            return;
        }
    }

    if (result) {
        const customer = {}
        if (fname)
            customer.firstName = fname;
        if (lname)
            customer.lastName = lname;
        if (email)
            customer.email = email;
        if (password)
            customer.password = password;
    
        const dataToSend = JSON.stringify(customer);
        sendData(dataToSend);
    }
}

function sendData(data) {
    console.log(data);
    const token = sessionStorage.getItem('accessToken');
    console.log(token);

    fetch(updateCustomerURL + userId, {
        method: "PUT",
        headers: {
            "Content-Type": "text/json",
            "Authorization": "Bearer " + token
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
            alert('Datos actualizados');
            goBack();
        })
        .catch(err => {
            console.error("ERROR: ", err.message)
            alert('Error al actualizar datos');
            goBack();
        });
}

function goBack() {
    window.location.href = './cliente.html?id=' + userId;
}

function mostrar_datos_antiguos() {    
    let oldFname = sessionStorage.getItem("fname");
    let oldLname = sessionStorage.getItem("lname");
    let oldEmail = sessionStorage.getItem("email");
    document.actualizar.firstName.placeholder = oldFname;
    document.actualizar.lastName.placeholder = oldLname;
    document.actualizar.email.placeholder = oldEmail;
}

// --------------------
document.actualizar.addEventListener('submit', validar_datos);
document.addEventListener('DOMContentLoaded', mostrar_datos_antiguos);