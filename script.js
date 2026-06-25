// ===== script.js =====
// Bem-estar digital · uso consciente
// Versão super ampliada com mais conteúdo e acessibilidade

(function() {
    "use strict";

    // ---- Garantir que o DOM está totalmente carregado ----
    document.addEventListener('DOMContentLoaded', function() {
        
        // ---- elementos DOM ----
        const contrastBtn = document.getElementById('contrastBtn');
        const fontBtn = document.getElementById('fontBtn');
        const quizFeedback = document.getElementById('quizFeedback');
        const submitBtn = document.getElementById('submitQuiz');
        const options = document.querySelectorAll('input[name="quiz"]');

        // ---- Verificar se os elementos existem ----
        if (!contrastBtn || !fontBtn) {
            console.error('Botões de acessibilidade não encontrados!');
            return;
        }

        // ---- alternância de alto contraste ----
        contrastBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.toggle('high-contrast');
            const isHighContrast = document.body.classList.contains('high-contrast');
            this.innerHTML = isHighContrast ?
                '<i class="fas fa-circle"></i> Contraste off' :
                '<i class="fas fa-circle"></i> Contraste';
            
            // Feedback para leitores de tela
            const mensagem = isHighContrast ? 'Modo de alto contraste ativado' : 'Modo de alto contraste desativado';
            anunciarParaLeitorTela(mensagem);
        });

        // ---- aumento de fonte (toggle) ----
        fontBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.toggle('font-large');
            const isLarge = document.body.classList.contains('font-large');
            this.innerHTML = isLarge ?
                '<i class="fas fa-font"></i> Fonte normal' :
                '<i class="fas fa-font"></i> Fonte +';
            
            // Feedback para leitores de tela
            const mensagem = isLarge ? 'Fonte aumentada' : 'Fonte normal';
            anunciarParaLeitorTela(mensagem);
        });

        // ---- Função para anunciar mudanças para leitores de tela ----
        function anunciarParaLeitorTela(mensagem) {
            const anuncio = document.getElementById('anuncioAcessibilidade');
            if (anuncio) {
                anuncio.textContent = mensagem;
            }
        }

        // ---- dados do quiz (com mais perguntas e explicações) ----
        const questions = [{
            question: "Qual é a recomendação geral para pausas durante o uso de telas?",
            options: ["10 min a cada 2h", "5 min a cada 30 min", "15 min a cada 1h", "20 min a cada 3h"],
            correct: 1,
            explicacao: "A recomendação mais aceita é fazer pausas de 5 minutos a cada 30 minutos de uso, ou a regra 20-20-20: a cada 20 minutos, olhe para um objeto a 20 pés (6 metros) por 20 segundos."
        }, {
            question: "Quanto tempo o cérebro leva para retomar o foco após uma interrupção?",
            options: ["5 minutos", "15 minutos", "23 minutos", "30 minutos"],
            correct: 2,
            explicacao: "Estudos mostram que leva em média 23 minutos para retomar o foco total após uma interrupção. Por isso, é importante evitar distrações durante tarefas importantes."
        }, {
            question: "O uso de telas antes de dormir pode reduzir a produção de qual hormônio?",
            options: ["Serotonina", "Melatonina", "Dopamina", "Adrenalina"],
            correct: 1,
            explicacao: "A luz azul das telas suprime a produção de melatonina, o hormônio que regula o ciclo do sono, podendo reduzir sua produção em até 50%."
        }, {
            question: "Quantas vezes, em média, uma pessoa toca o celular por dia?",
            options: ["500 vezes", "1.000 vezes", "2.600 vezes", "5.000 vezes"],
            correct: 2,
            explicacao: "Estudos indicam que uma pessoa toca o celular em média 2.617 vezes por dia, com usuários mais pesados chegando a mais de 5.000 toques."
        }];

        let currentQuestionIndex = 0;
        let totalCorrect = 0;
        let answeredQuestions = 0;

        // ---- carregar pergunta ----
        function loadQuestion(index) {
            const q = questions[index];
            if (!q) {
                // Fim do quiz
                const percentual = Math.round((totalCorrect / questions.length) * 100);
                let mensagem = '';
                if (percentual === 100) {
                    mensagem = '🌟 Perfeito! Você é um especialista em bem-estar digital!';
                } else if (percentual >= 75) {
                    mensagem = '👏 Muito bom! Você tem ótimos conhecimentos!';
                } else if (percentual >= 50) {
                    mensagem = '📚 Bom! Continue aprendendo sobre o tema.';
                } else {
                    mensagem = '🌱 Que tal revisar o conteúdo e tentar novamente?';
                }
                
                const questionElement = document.getElementById('questionText');
                if (questionElement) {
                    questionElement.textContent = '🎉 Quiz concluído!';
                }
                const optionsContainer = document.querySelector('.options');
                if (optionsContainer) {
                    optionsContainer.style.display = 'none';
                }
                if (submitBtn) {
                    submitBtn.style.display = 'none';
                }
                if (quizFeedback) {
                    quizFeedback.innerHTML = `Você acertou ${totalCorrect} de ${questions.length} perguntas (${percentual}%). ${mensagem}`;
                    quizFeedback.style.background = '#c8f0d6';
                    quizFeedback.setAttribute('role', 'status');
                }
                return;
            }

            const questionElement = document.getElementById('questionText');
            if (questionElement) {
                questionElement.textContent = q.question;
            }
            
            const labels = document.querySelectorAll('.options label');
            labels.forEach((label, i) => {
                const radio = label.querySelector('input[type="radio"]');
                if (radio) {
                    radio.value = i;
                    const textNode = label.childNodes[1];
                    if (textNode) label.removeChild(textNode);
                    label.appendChild(document.createTextNode(' ' + q.options[i]));
                    radio.checked = false;
                    radio.setAttribute('id', 'opcao' + i);
                    label.setAttribute('for', 'opcao' + i);
                }
            });
            
            const optionsContainer = document.querySelector('.options');
            if (optionsContainer) {
                optionsContainer.style.display = 'flex';
            }
            if (submitBtn) {
                submitBtn.style.display = 'inline-block';
            }
            if (quizFeedback) {
                quizFeedback.innerHTML = `📝 Pergunta ${index + 1} de ${questions.length}. Escolha uma opção e responda.`;
                quizFeedback.style.background = '#e3f0e9';
                quizFeedback.setAttribute('role', 'status');
            }
        }

        // Carregar primeira pergunta
        loadQuestion(currentQuestionIndex);

        // ---- submit do quiz ----
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const q = questions[currentQuestionIndex];
                if (!q) return;

                let selectedValue = null;
                options.forEach((opt) => {
                    if (opt.checked) {
                        selectedValue = opt.value;
                    }
                });

                if (selectedValue === null) {
                    if (quizFeedback) {
                        quizFeedback.innerHTML = '⚠️ Por favor, selecione uma alternativa.';
                        quizFeedback.style.background = '#fce4e4';
                        quizFeedback.setAttribute('role', 'alert');
                    }
                    return;
                }

                const isCorrect = (parseInt(selectedValue) === q.correct);
                const correctText = q.options[q.correct];

                if (isCorrect) {
                    totalCorrect++;
                    if (quizFeedback) {
                        quizFeedback.innerHTML = `✅ Correto! A resposta é "${correctText}". 🎉<br><span style="font-size:1rem; opacity:0.8;">${q.explicacao || ''}</span>`;
                        quizFeedback.style.background = '#c8f0d6';
                        quizFeedback.setAttribute('role', 'status');
                    }
                } else {
                    if (quizFeedback) {
                        quizFeedback.innerHTML = `
