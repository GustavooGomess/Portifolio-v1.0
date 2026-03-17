// ==================== SMOOTH SCROLL ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== MODAL DE CONTATO ==================== //
function createContactModal() {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.id = 'contactModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Vamos Conversar! 💬</h2>
                <button class="close-modal">&times;</button>
            </div>
            <form id="contactForm">
                <div class="form-group">
                    <label for="name">Nome Completo</label>
                    <input type="text" id="name" name="name" required placeholder="Seu nome">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required placeholder="seu@email.com">
                </div>
                <div class="form-group">
                    <label for="subject">Assunto</label>
                    <input type="text" id="subject" name="subject" required placeholder="Qual é o assunto?">
                </div>
                <div class="form-group">
                    <label for="message">Mensagem</label>
                    <textarea id="message" name="message" required placeholder="Conte mais sobre seu projeto..." rows="5"></textarea>
                </div>
                <button type="submit" class="btn-submit">Enviar Mensagem</button>
            </form>
            <div class="success-message" id="successMessage" style="display: none;">
                <p>✓ Mensagem enviada com sucesso!</p>
                <p>Entraremos em contato em breve.</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

const contactModal = createContactModal();

// Abrir modal de contato
document.querySelectorAll('.btn-contact').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        contactModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// Fechar modal
document.querySelector('.close-modal').addEventListener('click', function() {
    contactModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Fechar modal ao clicar fora
window.addEventListener('click', function(e) {
    if (e.target === contactModal) {
        contactModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Validação e envio do formulário
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validação básica
    if (!name || !email || !subject || !message) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Por favor, insira um email válido!');
        return;
    }
    
    // Simular envio (em um projeto real, isso seria uma requisição ao servidor)
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
    
    // Resetar formulário após 3 segundos
    setTimeout(() => {
        document.getElementById('contactForm').style.display = 'block';
        document.getElementById('successMessage').style.display = 'none';
        document.getElementById('contactForm').reset();
        contactModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 3000);
});

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== BOTÃO VER PROJETOS ==================== //
document.querySelector('.btn-projects').addEventListener('click', function(e) {
    e.preventDefault();
    const projectsSection = document.getElementById('projetos');
    projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// ==================== BOTÃO SECUNDÁRIO DE CONTATO ==================== //
document.querySelector('.btn-contact-secondary').addEventListener('click', function(e) {
    e.preventDefault();
    contactModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

// ==================== GALERIA COMPLETA ==================== //
document.querySelector('.view-all').addEventListener('click', function(e) {
    e.preventDefault();
    alert('🎨 Galeria completa em breve! Acompanhe as atualizações do portfólio.');
});

// ==================== DETALHES DOS PROJETOS ==================== //
document.querySelectorAll('.project-link').forEach((link, index) => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showProjectModal(index + 1);
    });
});

function showProjectModal(projectNumber) {
    const projects = [
        {
            title: 'Projeto 1',
            description: 'Este projeto ainda está em desenvolvimento. Logo você verá uma descrição completa das funcionalidades e tecnologias utilizadas.',
            technologies: 'React, Node.js, MongoDB',
            status: 'Em Breve'
        },
        {
            title: 'Projeto 2',
            description: 'Este projeto ainda está em desenvolvimento. Logo você verá uma descrição completa das funcionalidades e tecnologias utilizadas.',
            technologies: 'Next.js, GraphQL, PostgreSQL',
            status: 'Em Breve'
        },
        {
            title: 'Projeto 3',
            description: 'Este projeto ainda está em desenvolvimento. Logo você verá uma descrição completa das funcionalidades e tecnologias utilizadas.',
            technologies: 'Vue.js, Express, MySQL',
            status: 'Em Breve'
        }
    ];
    
    const project = projects[projectNumber - 1];
    alert(`📌 ${project.title}\n\n${project.description}\n\nTecnologias: ${project.technologies}\nStatus: ${project.status}`);
}

// ==================== INTERSECTION OBSERVER ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ==================== ANIMAÇÕES CSS ==================== //
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .contact-modal {
        display: none;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .modal-content {
        background-color: #1a2332;
        border: 1px solid #258CF4;
        border-radius: 12px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 10px 40px rgba(37, 140, 244, 0.2);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    
    .modal-header h2 {
        color: #258CF4;
        font-size: 1.5rem;
        margin: 0;
    }
    
    .close-modal {
        background: none;
        border: none;
        color: #ffffff;
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        transition: color 0.3s ease;
    }
    
    .close-modal:hover {
        color: #258CF4;
    }
    
    .form-group {
        margin-bottom: 1.5rem;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        color: #258CF4;
        font-weight: 600;
    }
    
    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 0.75rem;
        background-color: #0f1419;
        border: 1px solid #258CF4;
        border-radius: 6px;
        color: #ffffff;
        font-family: 'Montserrat', sans-serif;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #00d4ff;
        box-shadow: 0 0 10px rgba(37, 140, 244, 0.3);
    }
    
    .form-group textarea {
        resize: vertical;
        min-height: 120px;
    }
    
    .btn-submit {
        width: 100%;
        padding: 0.75rem 1.5rem;
        background: linear-gradient(135deg, #258CF4 0%, #00d4ff 100%);
        color: #ffffff;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .btn-submit:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(37, 140, 244, 0.4);
    }
    
    .btn-submit:active {
        transform: translateY(0);
    }
    
    .success-message {
        text-align: center;
        color: #00d4ff;
        font-weight: 600;
    }
    
    .success-message p {
        margin: 0.5rem 0;
        font-size: 1.1rem;
    }
`;
document.head.appendChild(style);
