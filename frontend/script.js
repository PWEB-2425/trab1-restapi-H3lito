// JS para operações CRUD com Fetch API
const API_CURSOS = 'http://localhost:3000/cursos';
const API_ALUNOS = 'http://localhost:3000/alunos';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('curso')) {
    carregarCursos();
  }

  const formAluno = document.querySelector('form');
  if (formAluno && formAluno.id !== 'cursoForm') {
    formAluno.addEventListener('submit', adicionarAluno);
  }

  const formCurso = document.querySelector('.curso-form');
  if (formCurso) {
    formCurso.addEventListener('submit', adicionarCurso);
  }
});

async function carregarCursos() {
  try {
    const resposta = await fetch(API_CURSOS);
    const cursos = await resposta.json();

    const selectCurso = document.getElementById('curso');
    selectCurso.innerHTML = '<option value="">Selecione um curso</option>';

    cursos.forEach(curso => {
      const option = document.createElement('option');
      option.value = curso.nomeDoCurso;
      option.textContent = curso.nomeDoCurso;
      selectCurso.appendChild(option);
    });
  } catch (erro) {
    console.error('Erro ao carregar cursos:', erro);
    alert('Erro ao carregar lista de cursos.');
  }
}

async function adicionarAluno(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const apelido = document.getElementById('apelido').value.trim();
  const curso = document.getElementById('curso').value;
  const ano = document.getElementById('ano').value;

  if (!nome || !apelido || !curso || !ano) {
    alert('Preenche todos os campos.');
    return;
  }

  const aluno = { nome, apelido, curso, ano: parseInt(ano) };

  try {
    const resposta = await fetch(API_ALUNOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    });

    if (!resposta.ok) throw new Error('Erro ao adicionar aluno');

    alert('Aluno adicionado com sucesso!');
    e.target.reset();
  } catch (erro) {
    console.error('Erro:', erro);
    alert('Não foi possível adicionar o aluno.');
  }
}

async function adicionarCurso(e) {
  e.preventDefault();

  const input = document.getElementById('nomeDoCurso');
  const nomeDoCurso = input.value.trim();

  if (!nomeDoCurso) {
    alert('Indica o nome do curso.');
    return;
  }

  try {
    const resposta = await fetch(API_CURSOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nomeDoCurso })
    });

    if (!resposta.ok) throw new Error('Erro ao adicionar curso');

    alert('Curso adicionado com sucesso!');
    input.value = '';
  } catch (erro) {
    console.error('Erro ao adicionar curso:', erro);
    alert('Erro ao registar curso.');
  }
}