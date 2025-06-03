// JS para operações CRUD com Fetch API

 document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('btnAlunos').addEventListener('click', function() {
            document.getElementById('divAlunos').style.display = 'block';
        });

    });

    listarAlunos();

async function listarAlunos() {
    const url = "http://localhost:3000/alunos";
    const resposta = await fetch(url);
    const alunos = await resposta.json();
    const tbody = document.getElementById("tbodyAlunos");
    
    tbody.innerHTML = "";

    alunos.forEach(aluno => {
        tbody.innerHTML += `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.apelido}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.anoCurricular}</td>
                <td>${aluno.idade}</td>
            </tr>
        `;
    });
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btnAddAluno").addEventListener("click", function() {
        document.getElementById("alunoForm").style.display = "block";
    });
});