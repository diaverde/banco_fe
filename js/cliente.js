const getCustomerURL = "http://127.0.0.1:8000/customers/";
//const getCustomerURL = "https://mintic-banco-unal.herokuapp.com/customers/";

function getCustomer() {
    const parsedUrl = new URL(window.location.href);
    const id = parsedUrl.searchParams.get("id");
    //console.log(id);

    fetch(getCustomerURL + id)
        .then(response => {
            if (response.ok)
                return response.text()
            else
                throw new Error(response.status);
        })
        .then(data => {
            console.log("Datos: " + data);
            customer = JSON.parse(data);
            handleCustomer(customer);
        })
        .catch(err => {
            console.error("ERROR: ", err.message)
        });
}

function handleCustomer(cust) {
    const custData = document.createElement("div");
    const accountDivs = [];
    cust.accounts.forEach((acc, index) => {
        const div = `
            <h4>Cuenta: ${index + 1}</h4>    
            <h4>Número de cuenta: ${acc.accNumber}</h4>
            <h4>Saldo: ${acc.balance}</h4>`;
        accountDivs.push(div);
    });
    custData.innerHTML =
        `<h2>Cliente</h2>
        <h4>Nombre: ${cust.firstName}</h4>
        <h4>Apellido: ${cust.lastName}</h4>
        <h4>Cédula: ${cust.id}</h4>
        <h4>Cuentas:</h4>`;
    accountDivs.forEach(div => custData.innerHTML += div);
    document.querySelector("#cargando").remove();
    const infoCustomers = document.querySelector("#info-customers");
    infoCustomers.appendChild(custData);
}

function handleError() {
    document.querySelector("#cargando").remove();
    const errorMesage = document.createElement("p");
    errorMesage.textContent = "No se pudo cargar la información. Intente luego.";
    const areaMensaje = document.getElementById("info-customers");
    areaMensaje.appendChild(errorMesage);
}

// --------------------

document.addEventListener("DOMContentLoaded", getCustomer);