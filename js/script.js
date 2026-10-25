/* Scripts compartilhados: tema claro/escuro e menu responsivo */
/* ===== Tema claro/escuro ===== */
const raiz = document.documentElement;
const temaBtn = document.getElementById('temaBtn');

function aplicarTema(tema){
  raiz.setAttribute('data-theme', tema);
  temaBtn.textContent = tema === 'dark' ? '☀' : '☾';
}
// Recupera a escolha anterior (se o navegador permitir); padrão: escuro
let salvo = null;
try { salvo = localStorage.getItem('tema'); } catch(e) {}
aplicarTema(salvo || 'dark');

temaBtn.addEventListener('click', () => {
  const novo = raiz.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  aplicarTema(novo);
  try { localStorage.setItem('tema', novo); } catch(e) {}
});

/* ===== Menu responsivo (celular) ===== */
const menu = document.getElementById('menu');
document.getElementById('menuBtn').addEventListener('click', () => menu.classList.toggle('aberto'));
// Fecha o menu ao clicar em um link
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('aberto')));

/* ===== Formulário de contato: validação e envio simulado ===== */
const form = document.getElementById('formContato');
if (form) {
  const modal = document.getElementById('modal');
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // formato usuario@dominio.com

  // Mostra (ou limpa) a mensagem de erro de um campo
  function erro(id, texto) {
    document.getElementById(id).classList.toggle('invalido', texto !== '');
    document.getElementById('erro-' + id).textContent = texto;
    return texto === '';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // não recarrega a página
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('mensagem').value.trim();

    // Valida todos os campos (sem parar no primeiro erro)
    const okNome = erro('nome', nome === '' ? 'Informe seu nome.' : '');
    const okEmail = erro('email', email === '' ? 'Informe seu e-mail.' : (!regexEmail.test(email) ? 'E-mail inválido. Exemplo: usuario@dominio.com' : ''));
    const okMsg = erro('mensagem', msg === '' ? 'Escreva sua mensagem.' : '');

    if (okNome && okEmail && okMsg) {
      form.reset();           // limpa os campos
      modal.hidden = false;   // simula o envio exibindo a confirmação
    }
  });

  // Fecha a caixa de confirmação
  const fechar = () => { modal.hidden = true; };
  document.getElementById('modalFechar').addEventListener('click', fechar);
  modal.addEventListener('click', (e) => { if (e.target === modal) fechar(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); });
}
