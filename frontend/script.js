// JS para operações CRUD com Fetch API

  document.getElementById('btnAlunos').addEventListener('click', function() {
            document.getElementById('divAlunos').style.display = 'block';
        });

//document.getElementById("verAlunos").addEventListener("click", listarAlunos);
async function listarAlunos(params) {
   const apiUrl = 'http://localhost:3000/alunos'; 

   const resposta = await fetch(apiUrl);
   console.log(resposta);
   const alunos = await resposta.json();
   const tbodyAlunos = document.getElementById('tbodyAlunos');
   console.log(alunosJS);
  // let ulalunos = document.getElementById(listaAlunos);
   console.log(ulalunos);
   tbodyAlunos.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

   alunos.forEach(aluno => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${aluno.nome || ''}</td>
                <td>${aluno.apelido || ''}</td>
                <td>${aluno.curso || ''}</td>
                <td>${aluno.ano || ''}</td>
                <td>${aluno.idade || ''}</td>
                <td>
                    <button class="btn-editar" data-id="${aluno.id}">Editar</button>
                    <button class="btn-excluir" data-id="${aluno.id}">Excluir</button>
                </td>
            `;
            tbodyAlunos.appendChild(row);
        });

        document.addEventListener('DOMContentLoaded', function() {
    // Mostrar alunos quando clicar no botão
    document.getElementById('btnAlunos').addEventListener('click', function() {
        document.getElementById('divAlunos').style.display = 'block';
        listarAlunos(); // Carrega os alunos quando a seção é aberta
    });
});

}

