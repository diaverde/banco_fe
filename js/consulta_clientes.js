//const getCustomersUrl = "http://127.0.0.1:8000/customers/";
const getCustomersURL = "https://mintic-banco-unal.herokuapp.com/customers";

let customers = [];

function getCustomers() {
  fetch(getCustomersURL)
    .then(response => {
      if (response.ok)
        return response.text()
      else
        throw new Error(response.status);
    })
    .then(data => {
      //console.log("Datos: " + data);
      customers = JSON.parse(data);
      handleCustomers();
    })
    .catch(err => {
      console.error("ERROR: ", err.message)
    });
}

function handleCustomers() {
  const divs = [];
  customers.forEach((cust,index) => {
    const custData = 
      `<tr><td>${index+1}</td>
      <td>${cust.firstName}</td>
      <td>${cust.lastName}</td>
      <td>${cust.id}</td></tr>`;
    divs.push(custData);
  });
  document.querySelector("#cargando").remove();
  const infoCustomers = document.querySelector("#info-customers");
  
  const table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>No. de Cliente</th>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Cédula</th>
    </tr>`;
  divs.forEach(div => table.innerHTML += div);
  infoCustomers.appendChild(table);
  //divs.forEach(div => infoCustomers.appendChild(div));
}

function handleError() {
  document.querySelector("#cargando").remove();
  const errorMesage = document.createElement("p");
  errorMesage.textContent = "No se pudo cargar la información. Intente luego.";
  const areaMensaje = document.getElementById("info-customers");
  areaMensaje.appendChild(errorMesage);
}

// --------------------

document.addEventListener("DOMContentLoaded", getCustomers);