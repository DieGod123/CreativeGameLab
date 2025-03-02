const bt_jugar = document.querySelector("#jugar1");
const bt_limpiar = document.querySelector("#limpiar");
const tbody = document.querySelector("#tbody");

let pjA = 0,
    pgA = 0,
    ppA = 0,
    peA = 0,
    gfA = 0,
    gcA = 0,
    puntosA = 0;
let pjB = 0,
    pgB = 0,
    ppB = 0,
    peB = 0,
    gfB = 0,
    gcB = 0,
    puntosB = 0;
let pjC = 0,
    pgC = 0,
    ppC = 0,
    peC = 0,
    gfC = 0,
    gcC = 0,
    puntosC = 0;

bt_jugar.onclick = (ev) => {
    ev.preventDefault();

    let equipoLocal = document.querySelector("#equipoLocal").value;
    let equipoVisitante = document.querySelector("#equipoVisitante").value;
    let golesLocal = parseInt(document.querySelector("#golesLocal").value);
    let golesLocal2 = document.querySelector("#golesLocal");
    let golesVisitante = parseInt(
        document.querySelector("#golesVisitante").value,
    );
    let golesVisitante2 = document.querySelector("#golesVisitante").value;

    if (equipoLocal == equipoVisitante) {
        alert("No pueden jugar los mismos equipos");
        return;
    }

    if (golesLocal2.value.trim() === "" || golesVisitante2.trim() === "") {
        alert("Los campos de goles no pueden estar vacíos.");
        return;
    }

    if (golesLocal < 0 || golesVisitante < 0) {
        alert("No se permiten números negativos en los goles.");
        return;
    }

    if (
        +golesLocal2.value !== golesLocal ||
        +golesVisitante2 !== golesVisitante
    ) {
        alert("Los goles deben ser numeros naturales.");
        return;
    }

    if (golesLocal > golesVisitante) {
        if (equipoLocal == "A") {
            gfA += golesLocal;
            gcA += golesVisitante;
            pgA++;
            puntosA += 3;
            pjA++;
        } else if (equipoLocal == "B") {
            gfB += golesLocal;
            gcB += golesVisitante;
            pgB++;
            puntosB += 3;
            pjB++;
        } else {
            gfC += golesLocal;
            gcC += golesVisitante;
            pgC++;
            puntosC += 3;
            pjC++;
        }
        if (equipoVisitante == "A") {
            gfA += golesVisitante;
            gcA += golesLocal;
            ppA++;
            pjA++;
        } else if (equipoVisitante == "B") {
            gfB += golesVisitante;
            gcB += golesLocal;
            ppB++;
            pjB++;
        } else {
            gfC += golesVisitante;
            gcC += golesLocal;
            ppC++;
            pjC++;
        }
    } else if (golesLocal < golesVisitante) {
        if (equipoLocal == "A") {
            gfA += golesLocal;
            gcA += golesVisitante;
            ppA++;
            pjA++;
        } else if (equipoLocal == "B") {
            gfB += golesLocal;
            gcB += golesVisitante;
            ppB++;
            pjB++;
        } else {
            gfC += golesLocal;
            gcC += golesVisitante;
            ppC++;
            pjC++;
        }
        if (equipoVisitante == "A") {
            gfA += golesVisitante;
            gcA += golesLocal;
            pgA++;
            puntosA += 3;
            pjA++;
        } else if (equipoVisitante == "B") {
            gfB += golesVisitante;
            gcB += golesLocal;
            pgB++;
            puntosB += 3;
            pjB++;
        } else {
            gfC += golesVisitante;
            gcC += golesLocal;
            pgC++;
            puntosC += 3;
            pjC++;
        }
    } else {
        if (equipoLocal == "A") {
            gfA += golesLocal;
            gcA += golesVisitante;
            peA++;
            puntosA += 1;
            pjA++;
        } else if (equipoLocal == "B") {
            gfB += golesLocal;
            gcB += golesVisitante;
            peB++;
            puntosB += 1;
            pjB++;
        } else {
            gfC += golesLocal;
            gcC += golesVisitante;
            peC++;
            puntosC += 1;
            pjC++;
        }
        if (equipoVisitante == "A") {
            gfA += golesVisitante;
            gcA += golesLocal;
            peA++;
            puntosA += 1;
            pjA++;
        } else if (equipoVisitante == "B") {
            gfB += golesVisitante;
            gcB += golesLocal;
            peB++;
            puntosB += 1;
            pjB++;
        } else {
            gfC += golesVisitante;
            gcC += golesLocal;
            peC++;
            puntosC += 1;
            pjC++;
        }
    }

    const tabla = document.querySelector("#tabla");

    const columnas = tabla.querySelectorAll("#td");

    columnas.forEach((columna) => columna.remove());

    let cad = `
    <tr>
    <td>${"A:"}</td>
    <td>${pjA}</td>
    <td>${pgA}</td>
    <td>${ppA}</td>
    <td>${peA}</td>
    <td>${gfA}</td>
    <td>${gcA}</td>
    <td>${puntosA}</td>
    </tr>
    <tr>
    <td>${"B:"}</td>
    <td>${pjB}</td>
    <td>${pgB}</td>
    <td>${ppB}</td>
    <td>${peB}</td>
    <td>${gfB}</td>
    <td>${gcB}</td>
    <td>${puntosB}</td>
    </tr>
    <tr>
    <td>${"C:"}</td>
    <td>${pjC}</td>
    <td>${pgC}</td>
    <td>${ppC}</td>
    <td>${peC}</td>
    <td>${gfC}</td>
    <td>${gcC}</td>
    <td>${puntosC}</td>
    </tr>
    `;

    tbody.innerHTML = cad;
};
