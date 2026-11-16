'use strict';

/* ---------- Utilidades ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
function crear(tag, clase, texto) {
  const el = document.createElement(tag);
  if (clase) el.className = clase;
  if (texto !== undefined) el.textContent = texto;
  return el;
}
const euro = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

/* ---------- Menú hamburguesa ---------- */
function iniciarMenu() {
  const btn = $('#menuBtn'), drawer = $('#drawer'), overlay = $('#overlay');
  const cambiar = abrir => {
    drawer.classList.toggle('open', abrir);
    overlay.classList.toggle('open', abrir);
    btn.classList.toggle('open', abrir);
    btn.setAttribute('aria-expanded', String(abrir));
    btn.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('no-scroll', abrir);
  };
  btn.addEventListener('click', () => cambiar(!drawer.classList.contains('open')));
  overlay.addEventListener('click', () => cambiar(false));
  $('#closeBtn').addEventListener('click', () => cambiar(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') cambiar(false); });
  $$('a', drawer).forEach(a => a.addEventListener('click', () => cambiar(false)));
}

/* ---------- Marcas (inicio) ---------- */
function pintarMarcas() {
  const cont = $('#brands');
  if (!cont) return;
  MARCAS.forEach(m => cont.append(crear('span', 'brand', m)));
}

/* ---------- Tienda: skincare y maquillaje ---------- */
const tienda = { categoria: null, filtro: 'Todos', orden: 'default', piel: null };

function tarjetaProducto(p) {
  const card = crear('article', 'product');
  const media = crear('div', 'pmedia ' + (p.cat === 'skincare' ? 'skin' : 'make'));
  media.append(crear('span', 'mono', 'GM'));
  if (tienda.piel && p.pieles && p.pieles.includes(tienda.piel)) media.append(crear('span', 'badge', 'Recomendado para ti'));
  card.append(media);

  const body = crear('div', 'pbody');
  body.append(crear('span', 'tag', p.sub), crear('h3', null, p.nombre), crear('p', 'pdetail', p.detalle));
  if (p.tonos) {
    const dots = crear('div', 'swatches');
    p.tonos.forEach((c, i) => {
      const d = crear('span', 'dot');
      d.style.background = c;
      d.title = 'Tono ' + (i + 1);
      dots.append(d);
    });
    body.append(dots);
  }
  body.append(crear('p', 'price', euro.format(p.precio)));
  card.append(body);
  return card;
}

function pintarTienda() {
  const grid = $('#productGrid');
  let lista = PRODUCTOS.filter(p => p.cat === tienda.categoria);
  if (tienda.filtro !== 'Todos') lista = lista.filter(p => p.sub === tienda.filtro);
  if (tienda.orden === 'asc') lista.sort((a, b) => a.precio - b.precio);
  if (tienda.orden === 'desc') lista.sort((a, b) => b.precio - a.precio);
  grid.replaceChildren(...lista.map(tarjetaProducto));
}

function iniciarTienda() {
  const grid = $('#productGrid');
  if (!grid) return;
  tienda.categoria = grid.dataset.categoria;

  const subs = ['Todos', ...new Set(PRODUCTOS.filter(p => p.cat === tienda.categoria).map(p => p.sub))];
  const filtros = $('#filters');
  subs.forEach(s => {
    const b = crear('button', null, s);
    b.type = 'button';
    b.setAttribute('aria-pressed', String(s === 'Todos'));
    b.addEventListener('click', () => {
      tienda.filtro = s;
      $$('button', filtros).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      pintarTienda();
    });
    filtros.append(b);
  });
  $('#sort').addEventListener('change', e => { tienda.orden = e.target.value; pintarTienda(); });
  pintarTienda();
}

/* ---------- Recomendador de piel (skincare) ---------- */
function iniciarRecomendador() {
  const picker = $('#picker');
  if (!picker) return;
  const botones = $$('button', picker), salida = $('#result');
  botones.forEach(btn => btn.addEventListener('click', () => {
    const p = PIELES[btn.dataset.skin];
    tienda.piel = btn.dataset.skin;
    botones.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    salida.replaceChildren(crear('h3', null, p.nombre));
    const l1 = crear('p'), l2 = crear('p');
    l1.append(crear('strong', null, 'Necesita: '), document.createTextNode(p.necesita));
    l2.append(crear('strong', null, 'Te sugerimos: '), document.createTextNode(p.productos));
    salida.append(l1, l2);
    pintarTienda();
  }));
}

/* ---------- Forma del rostro (maquillaje) ---------- */
function iniciarForma() {
  const picker = $('#facePicker');
  if (!picker) return;
  const botones = $$('button', picker), salida = $('#faceResult');
  botones.forEach(btn => btn.addEventListener('click', () => {
    const f = FORMAS[btn.dataset.face];
    botones.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    salida.replaceChildren(crear('h3', null, f.nombre), crear('p', null, f.consejo));
    const ul = crear('ul');
    f.tips.forEach(t => ul.append(crear('li', null, t)));
    salida.append(ul);
  }));
}

/* ---------- Vídeos (se cargan al pulsar play) ---------- */
function tarjetaVideo(v) {
  const card = crear('article', 'video');
  const frame = crear('div', 'frame');
  const poster = crear('button', 'poster');
  poster.type = 'button';
  poster.setAttribute('aria-label', `Reproducir: ${v.nombre}, ${v.titulo}`);
  const img = document.createElement('img');
  img.src = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
  img.alt = ''; img.loading = 'lazy';
  poster.append(img, crear('span', 'play'));
  poster.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`;
    iframe.title = `Vogue · ${v.nombre}: ${v.titulo}`;
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    frame.replaceChildren(iframe);
  });
  frame.append(poster);

  const body = crear('div', 'vbody');
  const a = crear('a', 'link', 'Ver en YouTube ↗');
  a.href = `https://www.youtube.com/watch?v=${v.id}`; a.target = '_blank'; a.rel = 'noopener';
  body.append(crear('span', 'tag', 'Vogue · Beauty Secrets'), crear('h3', null, v.nombre), crear('p', 'vt', v.titulo), crear('p', null, v.texto), a);
  card.append(frame, body);
  return card;
}
function pintarVideos() {
  const grid = $('#videoGrid');
  if (grid) VIDEOS.forEach(v => grid.append(tarjetaVideo(v)));
}

/* ---------- Colaboraciones ---------- */
function tarjetaColab(c, i) {
  const card = crear('article', 'collab' + (i % 2 ? ' rev' : ''));
  const vis = crear('div', 'cvisual ' + c.estilo);
  vis.append(crear('span', 'cx', 'Glow Match x'), crear('span', 'cname', c.artista));

  const body = crear('div', 'cbody');
  body.append(crear('span', 'tag', 'Edición limitada'), crear('h2', null, c.coleccion), crear('p', null, c.texto));
  const ul = crear('ul', 'looks');
  c.looks.forEach(l => ul.append(crear('li', null, l)));
  body.append(ul);

  const lista = crear('div', 'cprods');
  c.productos.forEach(p => {
    const fila = crear('div', 'cprod');
    const izq = crear('div', 'cinfo');
    izq.append(crear('span', 'cpname', p.nombre));
    if (p.tonos) {
      const dots = crear('span', 'swatches');
      p.tonos.forEach((col, k) => { const d = crear('span', 'dot'); d.style.background = col; d.title = 'Tono ' + (k + 1); dots.append(d); });
      izq.append(dots);
    }
    fila.append(izq, crear('span', 'price small', euro.format(p.precio)));
    lista.append(fila);
  });
  body.append(lista);
  card.append(vis, body);
  return card;
}
function pintarColaboraciones() {
  const grid = $('#collabGrid');
  if (grid) COLABORACIONES.forEach((c, i) => grid.append(tarjetaColab(c, i)));
}

/* ---------- Animación al hacer scroll ---------- */
function iniciarReveal() {
  const items = $$('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) { items.forEach(s => s.classList.add('visible')); return; }
  const obs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  }), { threshold: 0.12 });
  items.forEach(s => obs.observe(s));
}

/* ---------- Inicio ---------- */
document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', () => {
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
  iniciarMenu();
  pintarMarcas();
  iniciarTienda();
  iniciarRecomendador();
  iniciarForma();
  pintarVideos();
  pintarColaboraciones();
  iniciarReveal();
});
