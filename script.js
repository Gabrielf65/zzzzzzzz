document.addEventListener('DOMContentLoaded', () => {
  const perguntas = [
    {
      pergunta: "1. Quantos jogadores tem um time de vôlei em quadra?",
      opcoes: ["6", "5", "7", "4"],
      correta: 0
    },
    {
      pergunta: "2. Qual é o nome do jogador que atua apenas na defesa e usa camisa diferente?",
      opcoes: ["Levantador", "Central", "Líbero", "Oposto"],
      correta: 2
    },
    {
      pergunta: "3. Quantos toques o time pode dar antes de passar a bola?",
      opcoes: ["2", "3", "4", "5"],
      correta: 1
    },
    {
      pergunta: "4. Como se chama o movimento para iniciar uma jogada?",
      opcoes: ["Saque", "Passe", "Bloqueio", "Ataque"],
      correta: 0
    },
    {
      pergunta: "5. Qual é a altura da rede no vôlei masculino profissional?",
      opcoes: ["2,43m", "2,24m", "2,30m", "2,50m"],
      correta: 0
    },
    {
      pergunta: "6. Qual jogada impede a bola de passar para o seu lado da quadra?",
      opcoes: ["Recepção", "Bloqueio", "Saque", "Ponte"],
      correta: 1
    },
    {
      pergunta: "7. Quantos sets um time precisa vencer para ganhar o jogo?",
      opcoes: ["2", "3", "4", "5"],
      correta: 1
    },
    {
      pergunta: "8. Quando é marcado ponto no rally?",
      opcoes: ["Apenas quando saca", "Sempre que vence o rally", "Somente por erro", "Nunca"],
      correta: 1
    },
    {
      pergunta: "9. O que é um 'ace' no vôlei?",
      opcoes: ["Erro do líbero", "Saque direto sem defesa", "Ponto de bloqueio", "Erro do levantador"],
      correta: 1
    },
    {
      pergunta: "10. O que é uma 'largadinha' no vôlei?",
      opcoes: ["Um tipo de saque", "Ataque forte na diagonal", "Ataque suave por cima do bloqueio", "Recepção curta"],
      correta: 2
    }
  ];

  const perguntaEl = document.getElementById('pergunta');
  const opcoesEl = document.getElementById('opcoes');
  const progressoEl = document.getElementById('progresso');
  const btnProxima = document.getElementById('btnProxima');
  const btnReiniciar = document.getElementById('btnReiniciarTopo');
  const resultadoEl = document.getElementById('resultado');

  let perguntaAtual = 0;
  let respostasCorretas = 0;

  function carregarPergunta() {
    const p = perguntas[perguntaAtual];
    perguntaEl.textContent = p.pergunta;
    progressoEl.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    btnProxima.disabled = true;
    opcoesEl.innerHTML = '';

    p.opcoes.forEach((opcao, index) => {
      const div = document.createElement('div');
      div.classList.add('opcao');
      div.textContent = opcao;
      div.dataset.index = index;

      div.addEventListener('click', () => {
        const selecionadaAnterior = opcoesEl.querySelector('.selecionada');
        if (selecionadaAnterior) {
          selecionadaAnterior.classList.remove('selecionada');
        }
        div.classList.add('selecionada');
        btnProxima.disabled = false;
      });

      opcoesEl.appendChild(div);
    });
  }

  function mostrarResultado() {
    perguntaEl.style.display = 'none';
    opcoesEl.style.display = 'none';
    progressoEl.style.display = 'none';
    btnProxima.style.display = 'none';
    btnReiniciar.style.display = 'inline-block';

    let mensagem = '';
    let imagem = '';

    if (respostasCorretas <= 4) {
      imagem = 'foto1.jpeg';
      mensagem = `Você acertou ${respostasCorretas} de 10. Está começando no vôlei! Continue praticando.`;
    } else if (respostasCorretas < 10) {
      imagem = 'foto2.jpeg';
      mensagem = `Você acertou ${respostasCorretas} de 10. Muito bem! Você tem um bom conhecimento de vôlei.`;
    } else {
      imagem = 'foto3.jpg';
      mensagem = `Parabéns! Você acertou todas! É um verdadeiro especialista em vôlei!`;
    }

    resultadoEl.innerHTML = `
      <h2>Resultado</h2>
      <p>${mensagem}</p>
      <img src="${imagem}" alt="Resultado">
    `;
    resultadoEl.style.display = 'block';
  }

  btnProxima.addEventListener('click', () => {
    const selecionada = opcoesEl.querySelector('.selecionada');
    if (!selecionada) return;

    const indexSelecionado = parseInt(selecionada.dataset.index, 10);
    if (indexSelecionado === perguntas[perguntaAtual].correta) {
      respostasCorretas++;
    }

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
      carregarPergunta();
    } else {
      mostrarResultado();
    }
  });

  btnReiniciar.addEventListener('click', () => {
    perguntaAtual = 0;
    respostasCorretas = 0;
    resultadoEl.style.display = 'none';
    perguntaEl.style.display = 'block';
    opcoesEl.style.display = 'grid';
    progressoEl.style.display = 'block';
    btnProxima.style.display = 'inline-block';
    btnReiniciar.style.display = 'none';
    carregarPergunta();
  });

  carregarPergunta();
});