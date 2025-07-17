// JS para operações CRUD com Fetch API
// API Endpoints
// As URLs da API são definidas para os cursos e alunos
const API_CURSOS = 'https://trab1-restapi-h3lito.onrender.com/cursos';
const API_ALUNOS = 'https://trab1-restapi-h3lito.onrender.com/alunos';

//TESTES
document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdown");
  const loginBtn = document.getElementById("loginBtn");
  const loginForm = document.getElementById("loginForm");

  


  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector("a");

    trigger.addEventListener("click", function (e) {
      e.preventDefault(); // Impede o salto de link
      dropdown.classList.toggle("show");

      // Fecha outros dropdowns
      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove("show");
        }
      });
    });
  });

  // Fecha os dropdowns se clicares fora
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      dropdowns.forEach((dropdown) => dropdown.classList.remove("show"));
    }
  });
});



setInterval(() => {
  plusSlides(1);
}, 4000); // muda a imagem a cada 4 segundos
 
// Carregar cursos ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('curso')) {
    carregarCursos();
    showSlides();
  }

   //INDEX
let slideIndex = 0;
showSlides();

function plusSlides(n) {
  let slides = document.getElementsByClassName("carousel-slide");
  if (slides.length === 0) return;
  slideIndex += n;
  showSlides();
}
window.plusSlides = plusSlides;

function showSlides() {
  let slides = document.getElementsByClassName("carousel-slide");
  if (slideIndex >= slides.length) { slideIndex = 0 }
  if (slideIndex < 0) { slideIndex = slides.length - 1 }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";
}
window.showSlides= showSlides;

  const formAluno = document.querySelector('form');
  if (formAluno && formAluno.id !== 'cursoForm') {
    formAluno.addEventListener('submit', adicionarAluno);
  }

  const formCurso = document.querySelector('.curso-form');
  if (formCurso) {
    formCurso.addEventListener('submit', adicionarCurso);
  }
});
// Função para carregar cursos no select do formulário de alunos
// Esta função é chamada quando a página é carregada ou quando o formulário de alunos é aberto

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

// Função para adicionar aluno
// Esta função é chamada quando o formulário de alunos é submetido
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

  const aluno = { nome, apelido, curso, anoCurricular: parseInt(ano) };

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

// Função para adicionar curso  
// Esta função é chamada quando o formulário de cursos é submetido

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

// Função para carregar alunos na página de consulta
async function carregarAlunosConsulta() {
  try {
    const resposta = await fetch(API_ALUNOS);
    const alunos = await resposta.json();
    exibirAlunosTabela(alunos);
  } catch (erro) {
    console.error('Erro ao carregar alunos:', erro);
    alert('Erro ao carregar lista de alunos.');
  }
}

// Função para exibir alunos na tabela de consulta
function exibirAlunosTabela(alunos) {
  const tbody = document.getElementById('tbodyAlunos');
  if (!tbody) return;
  
  tbody.innerHTML = '';

  alunos.forEach(aluno => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.apelido}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.anoCurricular}º Ano</td>
      <td>
        <button class="btn-action btn-edit" data-id="${aluno._id}">Editar</button>
        <button class="btn-action btn-delete" data-id="${aluno._id}">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Adiciona eventos aos botões de ação
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => carregarAlunoParaEdicao(btn.dataset.id));
  });

  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => confirmarExclusaoAluno(btn.dataset.id));
  });
}

// Função para carregar um aluno para edição na consulta
async function carregarAlunoParaEdicao(id) {
  try {
    const resposta = await fetch(`${API_ALUNOS}/${id}`);
    const aluno = await resposta.json();
    
    document.getElementById('alunoId').value = aluno._id;
    document.getElementById('editNome').value = aluno.nome;
    document.getElementById('editApelido').value = aluno.apelido;
    document.getElementById('editAno').value = aluno.anoCurricular;
    
    // Carrega os cursos e seleciona o curso do aluno
    await carregarCursosSelect(aluno.curso);
    
    document.getElementById('formTitle').textContent = 'Editar Aluno';
  } catch (erro) {
    console.error('Erro ao carregar aluno:', erro);
    alert('Erro ao carregar dados do aluno.');
  }
}

// Função para carregar cursos no select de edição
async function carregarCursosSelect(cursoSelecionado = '') {
  const selectCurso = document.getElementById('editCurso');
  if (!selectCurso) return;
  
  try {
    const resposta = await fetch(API_CURSOS);
    const cursos = await resposta.json();
  
    
    selectCurso.innerHTML = '<option value="">Selecione um curso</option>';
    
    cursos.forEach(curso => {
      const option = document.createElement('option');
      option.value = curso.nomeDoCurso;
      option.textContent = curso.nomeDoCurso;
      if (curso.nomeDoCurso === cursoSelecionado) {
        option.selected = true;
      }
      selectCurso.appendChild(option);
    });
  } catch (erro) {
    console.error('Erro ao carregar cursos:', erro);
  }
}

// Função para confirmar exclusão de aluno
function confirmarExclusaoAluno(id) {
  if (confirm('Tem certeza que deseja excluir este aluno?')) {
    excluirAluno(id);
  }
}

// Função para excluir aluno
async function excluirAluno(id) {
  try {
    const resposta = await fetch(`${API_ALUNOS}/${id}`, {
      method: 'DELETE'
    });
    
    if (!resposta.ok) throw new Error('Erro ao excluir aluno');
    
    alert('Aluno excluído com sucesso!');
    carregarAlunosConsulta();
    document.getElementById('alunoForm').reset();
    document.getElementById('formTitle').textContent = 'Editar Aluno';
  } catch (erro) {
    console.error('Erro ao excluir aluno:', erro);
    alert('Erro ao excluir aluno.');
  }
}

// Função para pesquisar alunos
async function pesquisarAlunos() {
  const termo = document.getElementById('searchInput').value.trim();
  
  try {
    const resposta = await fetch(`${API_ALUNOS}?nome=${termo}`);
   
    const alunos = await resposta.json();
    exibirAlunosTabela(alunos);
  } catch (erro) {
    console.error('Erro ao pesquisar alunos:', erro);
    alert('Erro ao pesquisar alunos.');
  }
}

// Evento de submit do formulário de edição
if (document.getElementById('alunoForm')) {
  document.getElementById('alunoForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const id = document.getElementById('alunoId').value;
    const nome = document.getElementById('editNome').value.trim();
    const apelido = document.getElementById('editApelido').value.trim();
    const curso = document.getElementById('editCurso').value;
    const ano = document.getElementById('editAno').value;
    
    if (!nome || !apelido || !curso || !ano) {
      alert('Preencha todos os campos.');
      return;
    }
    
    const aluno = { nome, apelido, curso, anoCurricular: parseInt(ano) };
    
    try {
      const url = id ? `${API_ALUNOS}/${id}` : API_ALUNOS;
      const method = id ? 'PUT' : 'POST';
      
      const resposta = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aluno)
      });
      
      if (!resposta.ok) throw new Error('Erro ao salvar aluno');
      
      alert('Aluno salvo com sucesso!');
      carregarAlunosConsulta();
      this.reset();
      document.getElementById('formTitle').textContent = 'Editar Aluno';
    } catch (erro) {
      console.error('Erro:', erro);
      alert('Não foi possível salvar o aluno.');
    }
  });
}

// Botão cancelar
if (document.getElementById('btnCancelar')) {
  document.getElementById('btnCancelar').addEventListener('click', function() {
    document.getElementById('alunoForm').reset();
    document.getElementById('formTitle').textContent = 'Editar Aluno';
  });
}

// Botão de pesquisa
if (document.getElementById('btnSearch')) {
  document.getElementById('btnSearch').addEventListener('click', pesquisarAlunos);
}

// Carrega os dados quando a página de consulta é carregada
if (document.getElementById('tabelaAlunos')) {
  document.addEventListener('DOMContentLoaded', () => {
    carregarAlunosConsulta();
    carregarCursosConsulta();
  });
}
// ==============================================
// CONSULTA DE CURSOS
// ==============================================

async function carregarCursosConsulta() {
  try {
    const resposta = await fetch(API_CURSOS);
    const cursos = await resposta.json();
    exibirCursosTabela(cursos);
  } catch (erro) {
    console.error('Erro ao carregar cursos:', erro);
    alert('Erro ao carregar lista de cursos.');
  }
}

function exibirCursosTabela(cursos) {
  const tbody = document.getElementById('tbodyCursos');
  if (!tbody) return;
  
  tbody.innerHTML = '';

  cursos.forEach(curso => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${curso.nomeDoCurso}</td>
      <td>
        <button class="btn-action btn-edit" data-id="${curso._id}">Editar</button>
        <button class="btn-action btn-delete" data-id="${curso._id}">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Adiciona eventos aos botões
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => carregarCursoParaEdicao(btn.dataset.id));
  });

  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => confirmarExclusaoCurso(btn.dataset.id));
  });
}

async function carregarCursoParaEdicao(id) {
  try {
    const resposta = await fetch(`${API_CURSOS}/${id}`);
    const curso = await resposta.json();
    
    document.getElementById('cursoId').value = curso._id;
    document.getElementById('editNomeCurso').value = curso.nomeDoCurso;
    document.getElementById('formCursoTitle').textContent = 'Editar Curso';
  } catch (erro) {
    console.error('Erro ao carregar curso:', erro);
    alert('Erro ao carregar dados do curso.');
  }
}

function confirmarExclusaoCurso(id) {
  if (confirm('Tem certeza que deseja excluir este curso?')) {
    excluirCurso(id);
  }
}

async function excluirCurso(id) {
  try {
    const resposta = await fetch(`${API_CURSOS}/${id}`, {
      method: 'DELETE'
    });
    
    if (!resposta.ok) throw new Error('Erro ao excluir curso');
    
    alert('Curso excluído com sucesso!');
    carregarCursosConsulta();
    document.getElementById('cursoForm').reset();
    document.getElementById('formCursoTitle').textContent = 'Editar Curso';
  } catch (erro) {
    console.error('Erro ao excluir curso:', erro);
    alert('Erro ao excluir curso. Verifique se não há alunos vinculados.');
  }
}

async function pesquisarCursos() {
  const termo = document.getElementById('searchCursoInput').value.trim();
  try {
    const resposta = await fetch(`${API_CURSOS}?nome=${termo}`);
    const cursos = await resposta.json();
    exibirCursosTabela(cursos);
  } catch (erro) {
    console.error('Erro ao pesquisar cursos:', erro);
    alert('Erro ao pesquisar cursos.');
  }
}


// Evento de submit do formulário de edição
if (document.getElementById('cursoForm')) {
  document.getElementById('cursoForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const id = document.getElementById('cursoId').value;
    const nomeDoCurso = document.getElementById('editNomeCurso').value.trim();
    
    if (!nomeDoCurso) {
      alert('Preencha o nome do curso.');
      return;
    }
    
    const curso = { nomeDoCurso };
    
    try {
      const url = id ? `${API_CURSOS}/${id}` : API_CURSOS;
      const method = id ? 'PUT' : 'POST';
      
      const resposta = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(curso)
      });
      
      if (!resposta.ok) throw new Error('Erro ao salvar curso');
      
      alert('Curso salvo com sucesso!');
      carregarCursosConsulta();
      this.reset();
      document.getElementById('formCursoTitle').textContent = 'Editar Curso';
    } catch (erro) {
      console.error('Erro:', erro);
      alert('Não foi possível salvar o curso.');
    }
  });
}

// Botão cancelar
if (document.getElementById('btnCancelarCurso')) {
  document.getElementById('btnCancelarCurso').addEventListener('click', function() {
    document.getElementById('cursoForm').reset();
    document.getElementById('formCursoTitle').textContent = 'Editar Curso';
  });
}

// Botão de pesquisa
if (document.getElementById('btnSearchCurso')) {
  document.getElementById('btnSearchCurso').addEventListener('click', pesquisarCursos);
}

// Carrega os dados quando a página de consulta é carregada
if (document.getElementById('tabelaCursos')) {
  document.addEventListener('DOMContentLoaded', () => {
    carregarCursosConsulta();
  });
}