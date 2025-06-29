const Aluno = require('../models/aluno');

exports.getAll = async (req, res) => {
  const nome = req.query.nome;
  let filtro = {};

  // Filtro mais abrangente (nome ou apelido)
  if (nome) {
    filtro = {
      $or: [
        { nome: { $regex: nome, $options: 'i' } },
        { apelido: { $regex: nome, $options: 'i' } }
      ]
    };
  }

  try {
    const alunos = await Aluno.find(filtro)
      .select('nome apelido curso anoCurricular') // Seleciona apenas os campos necessários
      .lean(); // Converte para objeto JavaScript puro

    // Verifica se há resultados
    if (alunos.length === 0 && nome) {
      return res.status(404).json({ msg: 'Nenhum aluno encontrado' });
    }

    res.json(alunos);
  } catch (erro) {
    console.error('Erro ao buscar alunos:', erro);
    res.status(500).json({ msg: 'Erro interno ao buscar alunos' });
  }
};

exports.getById = async (req, res) => {
  const aluno = await Aluno.findById(req.params.id);
  if (!aluno) return res.status(404).json({ msg: 'Aluno não encontrado' });

  res.json(aluno);
};

exports.create = async (req, res) => {
  const novoAluno = new Aluno(req.body);
  await novoAluno.save();

  res.status(201).json(novoAluno);
};

exports.update = async (req, res) => {
  const AlunoAtualizado = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.json(AlunoAtualizado);
};

exports.delete = async (req, res) => {
  await Aluno.findByIdAndDelete(req.params.id);
  
  res.json({ msg: 'Aluno removido' });
};
