document.addEventListener('DOMContentLoaded', () => {
    const usuarioPrefereMenosAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const estilosAnimacoes = document.createElement('style');

    estilosAnimacoes.textContent = `
                .js-reveal {
                    opacity: 0;
                    transform: translateY(26px);
                    transition:
                        opacity 0.65s ease,
                        transform 0.65s ease;
                }

                .js-reveal.visivel {
                    opacity: 1;
                    transform: translateY(0);
                }

                .js-delay-1 {
                    transition-delay: 0.08s;
                }

                .js-delay-2 {
                    transition-delay: 0.16s;
                }

                .js-delay-3 {
                    transition-delay: 0.24s;
                }

                .js-delay-4 {
                    transition-delay: 0.32s;
                }

                .js-barra-progresso {
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 9999;
                    width: 0%;
                    height: 4px;
                    background: linear-gradient(90deg, #4f633d, #735f20);
                    box-shadow: 0 4px 14px rgba(31, 45, 31, 0.25);
                    transition: width 0.08s linear;
                }

                #banner-modulo-logo {
                    animation: logoFlutuando 4s ease-in-out infinite;
                }

                @keyframes logoFlutuando {
                    0%, 100% {
                        transform: translateY(0);
                    }

                    50% {
                        transform: translateY(-7px);
                    }
                }

                .banner-info-card,
                .unidade-card,
                #forum-pratica-card,
                .faq-item {
                    transition:
                        transform 0.28s ease,
                        box-shadow 0.28s ease,
                        border-color 0.28s ease;
                }

                .banner-info-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 18px 40px rgba(31, 45, 31, 0.14);
                    border-color: rgba(115, 95, 32, 0.5);
                }

                #forum-pratica-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 30px 70px rgba(31, 45, 31, 0.16);
                }

                .unidade-card:hover {
                    transform: translateY(-7px);
                    box-shadow: 0 26px 62px rgba(31, 45, 31, 0.18);
                }

                .faq-item:hover {
                    transform: translateX(4px);
                }

                .faq-item.ativo {
                    box-shadow: 0 28px 70px rgba(31, 45, 31, 0.13);
                }

                .unidade-card-botao,
                #forum-pratica-botao {
                    position: relative;
                    overflow: hidden;
                }

                .efeito-ripple {
                    position: absolute;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    pointer-events: none;
                    background-color: rgba(255, 255, 255, 0.5);
                    transform: translate(-50%, -50%) scale(0);
                    animation: rippleBotao 0.55s ease-out forwards;
                }

                @keyframes rippleBotao {
                    to {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(18);
                    }
                }

                .js-contador-pulso {
                    animation: contadorPulso 0.45s ease;
                }

                @keyframes contadorPulso {
                    0% {
                        transform: scale(1);
                    }

                    45% {
                        transform: scale(1.05);
                    }

                    100% {
                        transform: scale(1);
                    }
                }

                @media (max-width: 768px) {
                    .unidade-card:hover,
                    .banner-info-card:hover,
                    #forum-pratica-card:hover,
                    .faq-item:hover {
                        transform: none;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .js-reveal,
                    .js-reveal.visivel,
                    #banner-modulo-logo,
                    .banner-info-card,
                    .unidade-card,
                    #forum-pratica-card,
                    .faq-item,
                    .js-barra-progresso,
                    .js-contador-pulso {
                        opacity: 1 !important;
                        transform: none !important;
                        transition: none !important;
                        animation: none !important;
                    }
                }
            `;

    document.head.appendChild(estilosAnimacoes);

    const barraProgresso = document.createElement('div');
    barraProgresso.className = 'js-barra-progresso';
    barraProgresso.setAttribute('aria-hidden', 'true');
    document.body.appendChild(barraProgresso);

    const atualizarBarraProgresso = () => {
        const alturaPagina = document.documentElement.scrollHeight - window.innerHeight;
        const progresso = alturaPagina > 0 ? (window.scrollY / alturaPagina) * 100 : 0;

        barraProgresso.style.width = `${progresso}%`;
    };

    window.addEventListener('scroll', atualizarBarraProgresso, { passive: true });
    atualizarBarraProgresso();

    const elementosParaAnimar = document.querySelectorAll(`
                #banner-modulo-box-textual,
                .banner-info-card,
                #forum-pratica-card,
                #unidades-modulo-cabecalho,
                .unidade-card,
                #faq-modulo-cabecalho,
                .faq-item
            `);

    elementosParaAnimar.forEach((elemento, index) => {
        elemento.classList.add('js-reveal');

        if (
            elemento.classList.contains('banner-info-card') ||
            elemento.classList.contains('unidade-card') ||
            elemento.classList.contains('faq-item')
        ) {
            elemento.classList.add(`js-delay-${(index % 4) + 1}`);
        }
    });

    if (usuarioPrefereMenosAnimacao) {
        elementosParaAnimar.forEach((elemento) => {
            elemento.classList.add('visivel');
        });
    } else if ('IntersectionObserver' in window) {
        const observadorEntrada = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('visivel');
                    observadorEntrada.unobserve(entrada.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        elementosParaAnimar.forEach((elemento) => {
            observadorEntrada.observe(elemento);
        });
    } else {
        elementosParaAnimar.forEach((elemento) => {
            elemento.classList.add('visivel');
        });
    }

    setTimeout(() => {
        elementosParaAnimar.forEach((elemento) => {
            elemento.classList.add('visivel');
        });
    }, 1400);

    const blocoInformacoes = document.querySelector('#banner-informacoes-modulo');
    let contadoresJaRodaram = false;

    const animarContadores = () => {
        if (contadoresJaRodaram || usuarioPrefereMenosAnimacao) return;

        contadoresJaRodaram = true;

        const textosAnimaveis = Array.from(document.querySelectorAll('.banner-info-conteudo p')).filter((texto) => {
            const conteudo = texto.textContent.trim().toLowerCase();

            return conteudo === '20 horas' || conteudo === '5 unidades';
        });

        textosAnimaveis.forEach((texto) => {
            const conteudoOriginal = texto.textContent.trim();
            const numeroEncontrado = conteudoOriginal.match(/\d+/);

            if (!numeroEncontrado) return;

            const numeroFinal = Number(numeroEncontrado[0]);
            const duracao = 850;
            const inicio = performance.now();

            texto.classList.add('js-contador-pulso');

            const animar = (tempoAtual) => {
                const progresso = Math.min((tempoAtual - inicio) / duracao, 1);
                const valorAtual = Math.floor(progresso * numeroFinal);

                texto.textContent = conteudoOriginal.replace(numeroEncontrado[0], valorAtual);

                if (progresso < 1) {
                    requestAnimationFrame(animar);
                } else {
                    texto.textContent = conteudoOriginal;

                    setTimeout(() => {
                        texto.classList.remove('js-contador-pulso');
                    }, 450);
                }
            };

            requestAnimationFrame(animar);
        });
    };

    if (blocoInformacoes && !usuarioPrefereMenosAnimacao && 'IntersectionObserver' in window) {
        const observadorContadores = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    animarContadores();
                    observadorContadores.unobserve(entrada.target);
                }
            });
        }, {
            threshold: 0.3
        });

        observadorContadores.observe(blocoInformacoes);
    } else if (blocoInformacoes && !usuarioPrefereMenosAnimacao) {
        animarContadores();
    }

    const botoes = document.querySelectorAll('.unidade-card-botao, #forum-pratica-botao');

    botoes.forEach((botao) => {
        botao.addEventListener('click', (evento) => {
            if (usuarioPrefereMenosAnimacao) return;

            const rippleAntigo = botao.querySelector('.efeito-ripple');

            if (rippleAntigo) {
                rippleAntigo.remove();
            }

            const area = botao.getBoundingClientRect();
            const ripple = document.createElement('span');

            ripple.className = 'efeito-ripple';
            ripple.setAttribute('aria-hidden', 'true');
            ripple.style.left = `${evento.clientX - area.left}px`;
            ripple.style.top = `${evento.clientY - area.top}px`;

            botao.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    const faqItems = document.querySelectorAll('.faq-item');

    const fecharFaq = (item) => {
        const pergunta = item.querySelector('.faq-pergunta');
        const resposta = item.querySelector('.faq-resposta');

        item.classList.remove('ativo');
        pergunta.setAttribute('aria-expanded', 'false');
        resposta.hidden = true;
    };

    const abrirFaq = (item) => {
        const pergunta = item.querySelector('.faq-pergunta');
        const resposta = item.querySelector('.faq-resposta');

        item.classList.add('ativo');
        pergunta.setAttribute('aria-expanded', 'true');
        resposta.hidden = false;
    };

    faqItems.forEach((item) => {
        const pergunta = item.querySelector('.faq-pergunta');

        pergunta.addEventListener('click', () => {
            const itemEstaAberto = item.classList.contains('ativo');

            faqItems.forEach((faq) => {
                fecharFaq(faq);
            });

            if (!itemEstaAberto) {
                abrirFaq(item);
            }
        });
    });

    const logo = document.querySelector('#banner-modulo-logo');

    if (logo && !usuarioPrefereMenosAnimacao) {
        logo.addEventListener('mouseenter', () => {
            logo.animate(
                [
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.04)' },
                    { transform: 'scale(1)' }
                ],
                {
                    duration: 450,
                    easing: 'ease-out'
                }
            );
        });
    }
});