// Aguarda o carregamento completo do HTML antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. SCROLLSPY (Destacar o menu conforme a rolagem da página)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Verifica se a rolagem atingiu a seção (com um pequeno desconto de 150px)
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       2. ANIMAÇÃO DE ENTRADA (Fade-in nos cards dos Pilares)
       ========================================================================== */
    const observerOptions = {
        threshold: 0.2 // Dispara quando 20% do card estiver visível na tela
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aplica a animação
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.pilar-item');
    cards.forEach(card => {
        // Prepara os cards escondendo-os via JS (assim não quebra caso o JS falhe)
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });

});
