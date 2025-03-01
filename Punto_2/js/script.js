let totalMoto = 0;
let totalAuto = 0;
let totalCamion = 0;

const motoTabla = document
  .getElementById("moto-table")
  .getElementsByTagName("tbody")[0];
const autoTabla = document
  .getElementById("auto-table")
  .getElementsByTagName("tbody")[0];
const camionTabla = document
  .getElementById("camion-table")
  .getElementsByTagName("tbody")[0];

const calcularBtn = document.getElementById("calcular");
const limpiarBtn = document.getElementById("limpiar");

calcularBtn.addEventListener("click", function () {
  const placa = document.getElementById("placa").value;
  const tipo = document.getElementById("tipo").value;
  const horaEntrada = parseInt(document.getElementById("horaEntrada").value);
  const minutoEntrada = parseInt(
    document.getElementById("minutoEntrada").value,
  );
  const horaSalida = parseInt(document.getElementById("horaSalida").value);
  const minutoSalida = parseInt(document.getElementById("minutoSalida").value);

  if (placa === "") {
    alert("Debe tener una placa");
    return;
  }

  if (
    isNaN(horaSalida) ||
    isNaN(minutoEntrada) ||
    isNaN(horaSalida) ||
    isNaN(minutoSalida) ||
    horaEntrada < 0 ||
    horaEntrada > 23 ||
    horaSalida < 0 ||
    horaSalida > 23 ||
    minutoEntrada < 0 ||
    minutoEntrada > 59 ||
    minutoSalida < 0 ||
    minutoSalida > 59
  ) {
    alert("Por favor, ingrese valores válidos para las horas y minutos.");
    return;
  }

  if (
    horaSalida < horaEntrada ||
    (horaSalida === horaEntrada && minutoSalida < minutoEntrada)
  ) {
    alert("La hora de salida no puede ser menor que la hora de entrada");
    return;
  }

  // Calcular precio y obtener He y Hs
  const resultado = calcularPrecio(
    tipo,
    horaEntrada,
    minutoEntrada,
    horaSalida,
    minutoSalida,
  );

  switch (tipo) {
    case "Moto":
      totalMoto += resultado.precio;
      break;
    case "Automóvil":
      totalAuto += resultado.precio;
      break;
    case "Camión":
      totalCamion += resultado.precio;
      break;
  }

  const newRow = document.createElement("tr");
  newRow.innerHTML = `<td>${placa}</td>
  <td>${resultado.precio.toFixed(0)} $</td>
  <td>${resultado.horaEntrada}</td>
  <td>${resultado.horaSalida}</td>`;

  // Agregar la fila a la tabla correspondiente
  switch (tipo) {
    case "Moto":
      motoTabla.appendChild(newRow);
      document.getElementById("label1").textContent =
        "Total $" + totalMoto.toFixed(2);
      break;
    case "Automóvil":
      autoTabla.appendChild(newRow);
      document.getElementById("label2").textContent =
        "Total $" + totalAuto.toFixed(2);
      break;
    case "Camión":
      camionTabla.appendChild(newRow);
      document.getElementById("label3").textContent =
        "Total $" + totalCamion.toFixed(2);
      break;
  }

  let total3 = totalAuto + totalCamion + totalMoto;
  document.getElementById("label4").textContent =
    "Total general $" + total3.toFixed(2);
});

limpiarBtn.addEventListener("click", function () {
  document.getElementById("placa").value = "";
  document.getElementById("tipo").value = "Moto";
  document.getElementById("horaEntrada").value = "";
  document.getElementById("minutoEntrada").value = "";
  document.getElementById("horaSalida").value = "";
  document.getElementById("minutoSalida").value = "";
  document.getElementById("label1").textContent = "Total $0";
  document.getElementById("label2").textContent = "Total $0";
  document.getElementById("label3").textContent = "Total $0";
  document.getElementById("label4").textContent = "Total general $0";

  clearTable(motoTabla);
  clearTable(autoTabla);
  clearTable(camionTabla);
});

function clearTable(table) {
  table.innerHTML = "";
}

function calcularPrecio(
  tipo,
  horaEntrada,
  minutoEntrada,
  horaSalida,
  minutoSalida,
) {
  const tiempoEntrada = horaEntrada + minutoEntrada / 60;
  const tiempoSalida = horaSalida + minutoSalida / 60;
  const horasEstacionado = tiempoSalida - tiempoEntrada;

  let tarifaHora = 0;
  switch (tipo) {
    case "Moto":
      tarifaHora = 600;
      break;
    case "Automóvil":
      tarifaHora = 1800;
      break;
    case "Camión":
      tarifaHora = 2400;
      break;
  }

  const precio = tarifaHora * horasEstacionado;

  return {
    precio: precio,
    horaEntrada: `${horaEntrada}:${minutoEntrada} h`,
    horaSalida: `${horaSalida}:${minutoSalida} h`,
  };
}
