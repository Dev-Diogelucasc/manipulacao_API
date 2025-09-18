// Entre no site https://www.themoviedb.org
// https://5gq3hyraihfvst6qq2xsbr26gu0skmws.lambda-url.us-east-1.on.aws/?id=ID_DA_SERIE

// const urlParams = new URLSearchParams(window.location.search);
// const idSerie = urlParams.get('serieId');

document.querySelector(".info h1").innerText = bd["nome"];
document.querySelector(".info .generos").innerText = bd["generos"].join(" | ");
document.querySelector(".info p").innerText = bd["resumo"];

let nota = Math.round(parseFloat(bd["nota"]) * 10);
document.querySelector(".info .nota").innerText = nota;

document.querySelector(".poster img").src = bd["fotoPoster"];

document.querySelector(
  "header"
).style.backgroundImage = `url("${bd["fotoBg"]}")`;

// ELENCO
let elencoContainer = document.querySelector(".elenco-container");
elencoContainer.innerText = "";
for (let ator of bd["elenco"]) {
  let html = `
        <div class="ator">
            <img src="${ator["foto"]}" />
            <span class="nome">${ator["nome"]}</span>
            <span class="personagem">${ator["personagem"]}</span>
        </div>
    `;

  // elencoContainer.innerHTML += html
  elencoContainer.insertAdjacentHTML("beforeend", html);
}

// TEMPORADAS
let tempContainer = document.querySelector(".temporadas-container");
tempContainer.innerText = "";
for (let temp of bd["temporadas"]) {
  let id = temp["numero"];

  let html = `
        <div class="temporada">
            <div class="poster">
                <img src="${temp["poster"]}" />
            </div>
            <div class="info">
                <h3>Temporada ${temp["numero"]}</h3>
                <div class="subtitulo">
                    (${temp["exibicao"].substring(0, 4)})
                    ${temp["numero_episodios"]} episódios
                </div>
                <p class="sinopse">${temp["resumo"]}</p>
                <a href="#" class="botao" id="btn-${id}">Ver episódios</a>
                <div class="episodios" id="episodios-${id}"></div>
            </div>
        </div>
    `;
  tempContainer.insertAdjacentHTML("beforeend", html);

  document
    .querySelector(`#btn-${id}`)
    .addEventListener("click", carrega_episodios);
}

function carrega_episodios(evento) {
  // Impede o comportamento da tag A
  evento.preventDefault();
  // console.log(evento)

  let id = evento["target"].id.split("-")[1];
  let episodios = bd["temporadas"][id - 1]["episodios"];
  let epContainer = document.querySelector(`#episodios-${id}`);

  if (epContainer.innerText != "") {
    epContainer.innerText = "";
    return;
  }

  for (let ep of episodios) {
    let html = `
            <div class="episodio">
                <div class="foto">
                    <img src="${ep["foto"]}" />
                    <span class="nota">${ep["nota"].toFixed(1)}</span>
                </div>
                <div class="ep-info">
                    <h4>${ep["nome"]}</h4>
                    <p>${ep["resumo"]}</p>
                </div>
                <a href="#" class="botao play" id="play-${id}-${
      ep["numero"]
    }">Assistir</a>
            </div>
        `;
    epContainer.insertAdjacentHTML("beforeend", html);

    // document.querySelector(`#play-${id}-${ep['numero']}`).addEventListener("click", play_episodio)

    // UsandoArrow function
    document
      .querySelector(`#play-${id}-${ep["numero"]}`)
      .addEventListener("click", (evento) => {
        evento.preventDefault();

        let pieces = evento["target"].id.split("-");
        let temp = pieces[1] - 1;
        let ep = pieces[2] - 1;

        let episodio = bd["temporadas"][temp]["episodios"][ep];

        alert(episodio["nome"]);
      });
  }
}

function play_episodio(evento) {
  evento.preventDefault();

  let pieces = evento["target"].id.split("-");
  let temp = pieces[1] - 1;
  let ep = pieces[2] - 1;

  let episodio = bd["temporadas"][temp]["episodios"][ep];

  alert(episodio["nome"]);
}

// Função para atualizar o site.
function atualizarSerie(bd) {
  document.querySelector(".info h1").innerText = bd["nome"];
  document.querySelector(".info .generos").innerText =
    bd["generos"].join(" | ");
  document.querySelector(".info p").innerText = bd["resumo"];

  let nota = Math.round(parseFloat(bd["nota"]) * 10);
  document.querySelector(".info .nota").innerText = nota;

  document.querySelector(".poster img").src = bd["fotoPoster"];

  document.querySelector(
    "header"
  ).style.backgroundImage = `url("${bd["fotoBg"]}")`;

  // ELENCO
  let elencoContainer = document.querySelector(".elenco-container");
  elencoContainer.innerText = "";
  for (let ator of bd["elenco"]) {
    let html = `
        <div class="ator">
            <img src="${ator["foto"]}" />
            <span class="nome">${ator["nome"]}</span>
            <span class="personagem">${ator["personagem"]}</span>
        </div>
    `;

    // elencoContainer.innerHTML += html
    elencoContainer.insertAdjacentHTML("beforeend", html);
  }

  // TEMPORADAS
  let tempContainer = document.querySelector(".temporadas-container");
  tempContainer.innerText = "";
  for (let temp of bd["temporadas"]) {
    let id = temp["numero"];

    let html = `
        <div class="temporada">
            <div class="poster">
                <img src="${temp["poster"]}" />
            </div>
            <div class="info">
                <h3>Temporada ${temp["numero"]}</h3>
                <div class="subtitulo">
                    (${temp["exibicao"].substring(0, 4)})
                    ${temp["numero_episodios"]} episódios
                </div>
                <p class="sinopse">${temp["resumo"]}</p>
                <a href="#" class="botao" id="btn-${id}">Ver episódios</a>
                <div class="episodios" id="episodios-${id}"></div>
            </div>
        </div>
    `;
    tempContainer.insertAdjacentHTML("beforeend", html);

    document
      .querySelector(`#btn-${id}`)
      .addEventListener("click", carrega_episodios);
  }

  function carrega_episodios(evento) {
    // Impede o comportamento da tag A
    evento.preventDefault();
    // console.log(evento)

    let id = evento["target"].id.split("-")[1];
    let episodios = bd["temporadas"][id - 1]["episodios"];
    let epContainer = document.querySelector(`#episodios-${id}`);

    if (epContainer.innerText != "") {
      epContainer.innerText = "";
      return;
    }

    for (let ep of episodios) {
      let html = `
            <div class="episodio">
                <div class="foto">
                    <img src="${ep["foto"]}" />
                    <span class="nota">${ep["nota"].toFixed(1)}</span>
                </div>
                <div class="ep-info">
                    <h4>${ep["nome"]}</h4>
                    <p>${ep["resumo"]}</p>
                </div>
                <a href="#" class="botao play" id="play-${id}-${
        ep["numero"]
      }">Assistir</a>
            </div>
        `;
      epContainer.insertAdjacentHTML("beforeend", html);

      // document.querySelector(`#play-${id}-${ep['numero']}`).addEventListener("click", play_episodio)

      // UsandoArrow function
      document
        .querySelector(`#play-${id}-${ep["numero"]}`)
        .addEventListener("click", (evento) => {
          evento.preventDefault();

          let pieces = evento["target"].id.split("-");
          let temp = pieces[1] - 1;
          let ep = pieces[2] - 1;

          let episodio = bd["temporadas"][temp]["episodios"][ep];

          alert(episodio["nome"]);
        });
    }
  }

  function play_episodio(evento) {
    evento.preventDefault();

    let pieces = evento["target"].id.split("-");
    let temp = pieces[1] - 1;
    let ep = pieces[2] - 1;

    let episodio = bd["temporadas"][temp]["episodios"][ep];

    alert(episodio["nome"]);
  }
}

// - Mostrar e ESCONDER os episódios (qdo clicar no btn dos episódios)
// - Criar um botão de PLAY para cada episódio
// - Ao clicar no PLAY mostrar o nome do episódio em um alert()

// beforebegin -> antes do começo
// afterbegin -> depois do começo
// beforend -> antes do fim
// afterend -> depois do fim

// beforebegin<div>afterbegin    TEXTO     beforeend</div>afterend
