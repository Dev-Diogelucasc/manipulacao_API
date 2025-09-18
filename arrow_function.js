let btn = document.querySelector("#search");
let searchSerie = document.querySelector("#search-serie");
let select = document.querySelector("#select-serie");


btn.addEventListener("click", () => {
    let name = searchSerie.value;
    getSeries(name);
    searchSerie.value = ""
    select.value = "";
})

// Quando digitar uma série no Input , preenche o select automaticamente
searchSerie.addEventListener("input", () => {
  sugestaoSerie(searchSerie.value);
});

// Quando selecionar uma série no select, preenche o input automaticamente
select.addEventListener("change", () => {
  searchSerie.value = select.value;
});

function sugestaoSerie(name) {
  let endpoint = `https://addedufa6qbaxxeh5xles4qzhy0ovvah.lambda-url.us-east-1.on.aws/?search=${name}`;
  fetch(endpoint)
    .then((response) => response.json())
    .then((d) => {
      const buscaNome = d.results.map((name) => name.name);
      buscaNome.forEach((nome) => {
        const option = document.createElement("option");
        option.value = nome;
        option.textContent = nome;
        select.appendChild(option);
      });
    });
}

// Requisição da API
function getSeries(serieName) {
  console.log("Buscando Série " + serieName);
  let endpoint = `https://addedufa6qbaxxeh5xles4qzhy0ovvah.lambda-url.us-east-1.on.aws/?search=${serieName}`;
  fetch(endpoint)
    .then((response) => response.json())
    .then((d) => {
      const buscaId = d.results.map((id) => id.id);
      console.log("Id encontrado", buscaId[0]);

      let urlDetalhes = `https://5gq3hyraihfvst6qq2xsbr26gu0skmws.lambda-url.us-east-1.on.aws/?id=${buscaId[0]}`;
      fetch(urlDetalhes)
        .then((response) => response.json())
        .then((d) => {
          console.log("Detalhes da Série", d);

          // Chamando a função para atualizar o site.
          atualizarSerie(d);
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}

