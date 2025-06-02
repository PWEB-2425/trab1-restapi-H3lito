// JS para operações CRUD com Fetch API

document.getElementById("verAlunos").addEventListener("click", listarAlunos);
async function listarAlunos(params) {
   const apiUrl = 'http://localhost:3000/alunos'; 

   const resposta = await fetch(apiUrl);
   console.log(resposta);
   const alunosJS = await resposta.json();
   console.log(alunosJS);
   let ulalunos = document.getElementById(listaAlunos);
   console.log(ulalunos);
    ulalunos.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

}

