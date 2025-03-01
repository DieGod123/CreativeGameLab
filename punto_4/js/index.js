const TIEMPO_DE_RESPUESTA_MS = 5000;

const cantidadImagenes = {
  burlandose: 5,
  esperando: 5,
  feliz: 5,
  manzana: 1,
  sudando: 5,
};

let conjuntoActual;
let estado = "resultado";

let partidas = 0;
let aciertos = 0;

let temporizador;

const divImagenCtx = document.querySelector("#imagenCtx");

const divAyuda = document.querySelector("#ayuda");
const divEstadisticas = document.querySelector("#estadisticas");
const divSistema = document.querySelector("#sistema");

const divConjunto1 = document.querySelector("#conjunto1");
const divConjunto2 = document.querySelector("#conjunto2");

const btnRespuesta1 = document.querySelector("#respuesta1");
const btnRespuesta2 = document.querySelector("#respuesta2");

const btnContinuar = document.querySelector("#continuar");
const btnResetear = document.querySelector("#resetear");

const obtenerImagen = (nombre) => {
  const numero = Math.floor(Math.random() * cantidadImagenes[nombre]) + 1;
  return `./imagenes/${nombre}_${numero}.gif`;
};

const obtenerConjuntos = () => {
  const conjunto1 = Math.floor(Math.random() * 5) + 1;
  const conjunto2 = Math.floor(Math.random() * 5) + 1;
  const respuesta = conjunto1 + conjunto2;
  let equivocacion = Math.floor(Math.random() * 10) + 1;

  if (equivocacion === respuesta) {
    equivocacion -= 1;
  }

  return {
    conjunto1,
    conjunto2,
    respuesta,
    equivocacion,
  };
};

const obtenerEstadisticas = () => {
  if (partidas === 0) {
    return "Para ver tus estadisticas, completa al menos una ronda";
  }

  const porcentaje = ((aciertos / partidas) * 100).toFixed(2);
  const apoyo = porcentaje >= 50 ? "Enhorabuena" : "Enhoramala";
  return `${apoyo}, has acertado el ${porcentaje}% de las veces`;
};

const limpiarRespuestas = () => {
  btnRespuesta1.querySelector(".valor").innerHTML = "";
  btnRespuesta2.querySelector(".valor").innerHTML = "";

  const manzana = `<img src="./imagenes/default_manzana.png" alt="manzana" class="manzana" />`;

  btnRespuesta1.querySelector(".manzanas").innerHTML = manzana;
  btnRespuesta2.querySelector(".manzanas").innerHTML = manzana;
};

const actualizarConjunto = async (elemento, valor) => {
  const divValor = elemento.querySelector(".valor");
  divValor.innerHTML = valor;
  divValor.classList.remove("aparecerTexto");
  divValor.classList.add("aparecerTexto");

  const divManzanas = elemento.querySelector(".manzanas");
  divManzanas.innerHTML = "";

  for (let i = 0; i < valor; i++) {
    const src = obtenerImagen("manzana");
    divManzanas.insertAdjacentHTML(
      "beforeend",
      `<img src="${src}" alt="manzana" class="manzana" />`,
    );

    await new Promise((r) => setTimeout(r, 300));
  }
};

const cambiarImagenCtx = (tipo) => {
  const imagen = divImagenCtx.querySelector(".imagen");
  imagen.src = obtenerImagen(tipo);
};

const prepararRonda = async () => {
  conjuntoActual = obtenerConjuntos();

  await Promise.all([
    actualizarConjunto(divConjunto1, conjuntoActual.conjunto1),
    actualizarConjunto(divConjunto2, conjuntoActual.conjunto2),
  ]);

  divSistema.innerHTML = "";

  cambiarImagenCtx("esperando");
};

const prepararRespuestas = async () => {
  const respuestas = [conjuntoActual.respuesta, conjuntoActual.equivocacion];

  const orden = Math.floor(Math.random() * 2);

  respuestas.sort((a, b) => (orden === 1 ? a - b : b - a));

  await Promise.all([
    actualizarConjunto(btnRespuesta1, respuestas[0]),
    actualizarConjunto(btnRespuesta2, respuestas[1]),
  ]);

  cambiarImagenCtx("sudando");
};

const mostrarAyuda = (texto) => {
  divAyuda.innerText = texto;
};

const mostrarMensaje = (texto) => {
  divSistema.innerText = texto;
};

const responder = async (valor) => {
  let mensaje;
  let tipo;

  if (valor === conjuntoActual.respuesta) {
    mensaje = "Respuesta correcta, ¡lo lograste!";
    tipo = "feliz";
    aciertos += 1;
  } else {
    mensaje = "Respuesta incorrecta, que verguenza";
    tipo = "burlandose";
  }

  if (valor === -1) {
    mensaje = "Muy lento, se acabó el tiempo";
  }

  partidas += 1;

  divSistema.innerText = mensaje;
  cambiarImagenCtx(tipo);

  divEstadisticas.innerText = obtenerEstadisticas();
  avanzarEstado();

  clearTimeout(temporizador);
};

const empezarTemporizador = () => {
  temporizador = setTimeout(() => {
    responder(-1);
  }, TIEMPO_DE_RESPUESTA_MS);
};

const avanzarEstado = async () => {
  switch (estado) {
    case "resultado":
      estado = "analizando";
      limpiarRespuestas();

      btnContinuar.disabled = true;
      btnResetear.disabled = true;

      await prepararRonda();

      btnContinuar.disabled = false;
      btnResetear.disabled = false;

      mostrarAyuda("Presiona continuar para mostrar las posibles respuestas");
      mostrarMensaje("Tomate tu tiempo contando estas manzanas");
      break;

    case "analizando":
      estado = "respondiendo";

      btnContinuar.disabled = true;
      btnResetear.disabled = true;

      await prepararRespuestas();

      btnResetear.disabled = false;
      btnRespuesta1.disabled = false;
      btnRespuesta2.disabled = false;

      mostrarAyuda("¡Rapido, tienes 5 segundos para responder!");
      mostrarMensaje("Ya no te tomes tu tiempo respondiendo");
      empezarTemporizador();
      break;

    case "respondiendo":
      estado = "resultado";
      btnContinuar.disabled = false;
      btnRespuesta1.disabled = true;
      btnRespuesta2.disabled = true;
      mostrarAyuda("Presiona continuar para comenzar otra ronda");
      break;

    default:
      break;
  }
};

const restablecer = () => {
  partidas = 0;
  aciertos = 0;

  estado = "resultado";

  divImagenCtx.querySelector(".imagen").src = "./imagenes/default.gif";

  btnRespuesta1.querySelector(".valor").innerText = "";
  btnRespuesta2.querySelector(".valor").innerText = "";

  btnRespuesta1.disabled = true;
  btnRespuesta2.disabled = true;

  btnContinuar.disabled = false;

  const manzana = `<img src="./imagenes/default_manzana.png" alt="manzana" class="manzana" />`;

  const restablecerElementos = (...elementos) => {
    elementos.forEach((elemento) => {
      elemento.querySelector(".manzanas").innerHTML = manzana;
      elemento.querySelector(".valor").innerText = "";
    });
  };

  restablecerElementos(
    divConjunto1,
    divConjunto2,
    btnRespuesta1,
    btnRespuesta2,
  );

  clearTimeout(temporizador);

  divEstadisticas.innerText = obtenerEstadisticas();
  mostrarAyuda("Presione continuar para empezar el juego, creado por David Viveros y Diego Delgado");
  mostrarMensaje("¿Listo para empezar?");
};

btnContinuar.addEventListener("click", avanzarEstado);

btnRespuesta1.addEventListener("click", () =>
  responder(+btnRespuesta1.innerText),
);
btnRespuesta2.addEventListener("click", () =>
  responder(+btnRespuesta2.innerText),
);

btnResetear.addEventListener("click", restablecer);

restablecer();
