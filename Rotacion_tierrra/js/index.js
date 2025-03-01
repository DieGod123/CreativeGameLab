const colorDia = [208, 73, 84];
const colorNoche = [208, 48, 25];

const interpolarColor = (color1, color2, progress) => {
  const [h1, s1, l1] = color1;
  const [h2, s2, l2] = color2;

  const h3 = h1 + (h2 - h1) * progress;
  const s3 = s1 + (s2 - s1) * progress;
  const l3 = l1 + (l2 - l1) * progress;

  return [h3, s3, l3];
};

const calcRotacionHoras = (horas) => {
  return (360 / 24) * horas;
};

const calcRotacionMinutos = (minutos) => {
  return (360 / 24 / 60) * minutos;
};

const calcRotacionSegundos = (segundos) => {
  return (360 / 24 / 60 / 60) * segundos;
};

const calcRotacion = (horas, minutos, segundos) => {
  return (
    calcRotacionHoras(horas) +
    calcRotacionMinutos(minutos) +
    calcRotacionSegundos(segundos)
  );
};

const getValor = (labelSlider) => {
  const rangeEntrada = labelSlider.querySelector(".rangeEntrada");
  const pValor = labelSlider.querySelector(".pValor");

  const valor = rangeEntrada.value;
  pValor.innerText = valor;
  return +valor;
};

const labelHoras = document.querySelector(".labelHoras");
const labelMinutos = document.querySelector(".labelMinutos");
const labelSegundos = document.querySelector(".labelSegundos");
const divResultado = document.querySelector(".divResultado");
const body = document.querySelector("body");

const actualizarColorTiempo = (horas, minutos, segundos) => {
  let totalSegundos = horas * 60 * 60 + minutos * 60 + segundos;
  const medio = 12 * 60 * 60;

  if (totalSegundos > medio) {
    totalSegundos = totalSegundos % medio;
    totalSegundos = medio - totalSegundos;
  }

  const progreso = totalSegundos / medio;
  let [h, s, l] = interpolarColor(colorNoche, colorDia, progreso);
  body.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
};

const actualizar = () => {
  const horas = getValor(labelHoras);
  const minutos = getValor(labelMinutos);
  const segundos = getValor(labelSegundos);

  const rotacion = calcRotacion(horas, minutos, segundos);
  const texto = `${rotacion.toFixed(2)}°`;
  divResultado.innerText = texto;

  actualizarColorTiempo(horas, minutos, segundos);
};

const addActualizar = (label) => {
  label.querySelector(".rangeEntrada").addEventListener("input", actualizar);
};

addActualizar(labelHoras);
addActualizar(labelMinutos);
addActualizar(labelSegundos);

actualizar();
