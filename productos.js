'use strict';

/* Datos de la web. Para cambiar un precio, un producto o una marca, edita aquí. */

const MARCAS = ["L'Oréal Paris", 'Maybelline New York', 'Dr. Jart+', 'Cetaphil', 'Oliveda', 'Lanolips'];

const ALL = ['oily', 'dry', 'sensitive', 'combination'];

const PRODUCTOS = [
  /* ---------- SKINCARE ---------- */
  { cat: 'skincare', sub: 'Limpieza',    nombre: 'Agua micelar Cleansing',     detalle: '400 ml · Limpia y elimina el maquillaje sin aclarado', precio: 9.90,  pieles: ALL },
  { cat: 'skincare', sub: 'Limpieza',    nombre: 'Gel limpiador suave',        detalle: '150 ml · Control del brillo y frescura',              precio: 11.50, pieles: ['oily', 'combination'] },
  { cat: 'skincare', sub: 'Hidratación', nombre: 'Crema hidratante Moisturizing', detalle: '50 ml · Hidratación y suavidad todo el día',       precio: 18.90, pieles: ['dry', 'sensitive', 'combination'] },
  { cat: 'skincare', sub: 'Hidratación', nombre: 'Sérum hialurónico',          detalle: '30 ml · Hidratación profunda',                         precio: 22.50, pieles: ['dry', 'sensitive'] },
  { cat: 'skincare', sub: 'Hidratación', nombre: 'Gel hidratante oil-free',    detalle: '50 ml · Textura ligera sin aceite',                    precio: 16.50, pieles: ['oily', 'combination'] },
  { cat: 'skincare', sub: 'Tratamiento', nombre: 'Sérum Glow vitamina C',      detalle: '30 ml · Luminosidad y mejor textura',                  precio: 24.90, pieles: ['dry', 'oily', 'combination'] },
  { cat: 'skincare', sub: 'Tratamiento', nombre: 'Retinol nocturno',           detalle: '30 ml · Uso de noche, empieza poco a poco',            precio: 27.90, pieles: ['oily', 'combination'] },
  { cat: 'skincare', sub: 'Tratamiento', nombre: 'Contorno de ojos',           detalle: '15 ml · Hidrata y suaviza la zona de los ojos',        precio: 19.90, pieles: ALL },
  { cat: 'skincare', sub: 'Mascarillas', nombre: 'Mascarilla facial nutritiva', detalle: '75 ml · Nutre, suaviza y revitaliza',                 precio: 14.90, pieles: ['dry', 'combination'] },
  { cat: 'skincare', sub: 'Mascarillas', nombre: 'Mascarilla de tela calmante', detalle: 'Pack de 5 · Con aloe vera, sin perfume',              precio: 12.90, pieles: ['sensitive', 'oily'] },
  { cat: 'skincare', sub: 'Protección',  nombre: 'Protector solar SPF 50',     detalle: '50 ml · Protección diaria para el rostro',             precio: 16.90, pieles: ALL },

  /* ---------- MAQUILLAJE ---------- */
  { cat: 'maquillaje', sub: 'Rostro',  nombre: 'Base fluida Match',      detalle: 'Acabado natural · 6 tonos',      precio: 21.90, tonos: ['#F3D9C4', '#E8C4A5', '#D9A982', '#BF8B62', '#9C6B48', '#6F4A33'] },
  { cat: 'maquillaje', sub: 'Rostro',  nombre: 'Corrector luminoso',     detalle: 'Cubre ojeras · 4 tonos',         precio: 13.90, tonos: ['#F1D3BC', '#E3BB98', '#C99A74', '#9F714F'] },
  { cat: 'maquillaje', sub: 'Rostro',  nombre: 'Polvos translúcidos',    detalle: 'Sella el maquillaje sin pesadez', precio: 15.90 },
  { cat: 'maquillaje', sub: 'Rostro',  nombre: 'Colorete Glow',          detalle: 'Mejillas con color · 4 tonos',   precio: 12.90, tonos: ['#F4A6A0', '#E98477', '#D1626B', '#B24A55'] },
  { cat: 'maquillaje', sub: 'Rostro',  nombre: 'Iluminador líquido',     detalle: 'Efecto piel luminosa · 3 tonos', precio: 16.90, tonos: ['#F6E3C8', '#EBC9A0', '#D9A56E'] },
  { cat: 'maquillaje', sub: 'Rostro',  nombre: 'Bronceador en polvo',    detalle: 'Contouring y efecto bronceado',  precio: 14.90, tonos: ['#D9A982', '#B98059', '#8F5E3F'] },
  { cat: 'maquillaje', sub: 'Ojos',    nombre: 'Máscara de pestañas',    detalle: 'Volumen y definición',           precio: 12.50, tonos: ['#1E1612'] },
  { cat: 'maquillaje', sub: 'Ojos',    nombre: 'Paleta de sombras Nude', detalle: '12 tonos mate y satinados',      precio: 24.90, tonos: ['#F1D9C3', '#E2B995', '#C8946B', '#9C6B4A', '#6F4A33', '#3E2A20'] },
  { cat: 'maquillaje', sub: 'Ojos',    nombre: 'Delineador líquido',     detalle: 'Trazo preciso, larga duración',  precio: 9.90,  tonos: ['#1E1612', '#5A3A28'] },
  { cat: 'maquillaje', sub: 'Ojos',    nombre: 'Lápiz de cejas',         detalle: 'Define y rellena · 3 tonos',     precio: 8.90,  tonos: ['#B79B7E', '#7B5B43', '#3E2A20'] },
  { cat: 'maquillaje', sub: 'Labios',  nombre: 'Labial mate',            detalle: 'Color intenso · 5 tonos',        precio: 11.90, tonos: ['#C2605B', '#A8434A', '#8A2F3A', '#D88A7D', '#6E2630'] },
  { cat: 'maquillaje', sub: 'Labios',  nombre: 'Gloss brillante',        detalle: 'Brillo y volumen · 3 tonos',     precio: 9.50,  tonos: ['#F0B4A8', '#E39386', '#C96F6A'] },
  { cat: 'maquillaje', sub: 'Labios',  nombre: 'Bálsamo labial',         detalle: 'Hidrata antes del maquillaje',   precio: 6.90 },
  { cat: 'maquillaje', sub: 'Labios',  nombre: 'Perfilador de labios',   detalle: 'Define y evita que se corra · 3 tonos', precio: 7.50, tonos: ['#B8695F', '#9C4F4F', '#7B3A40'] }
];

const PIELES = {
  oily:        { nombre: 'Piel grasa',    necesita: 'Control del brillo y cuidado ligero', productos: 'Limpiadores en gel y cremas hidratantes sin aceite.' },
  dry:         { nombre: 'Piel seca',     necesita: 'Hidratación profunda',                productos: 'Cremas hidratantes ricas y productos con ácido hialurónico.' },
  sensitive:   { nombre: 'Piel sensible', necesita: 'Cuidado suave y calmante',            productos: 'Productos sin perfume y con aloe vera.' },
  combination: { nombre: 'Piel mixta',    necesita: 'Equilibrio entre zonas',              productos: 'Hidratantes ligeras y tónico suave.' }
};

const FORMAS = {
  oval:   { nombre: 'Rostro ovalado',  consejo: 'Es una forma equilibrada: casi todo te favorece.', tips: ['Colorete en la parte alta de las mejillas.', 'Contouring suave para mantener las proporciones.', 'Prueba cejas ligeramente curvas.'] },
  round:  { nombre: 'Rostro redondo',  consejo: 'Busca alargar y dar estructura.',                  tips: ['Bronceador en los laterales de la cara y bajo los pómulos.', 'Colorete subido hacia las sienes.', 'Ilumina el centro de la frente y el mentón.'] },
  square: { nombre: 'Rostro cuadrado', consejo: 'Busca suavizar la mandíbula.',                     tips: ['Bronceador en las esquinas de la frente y la mandíbula.', 'Colorete redondeado en las mejillas.', 'Ilumina el centro del rostro.'] },
  heart:  { nombre: 'Rostro corazón',  consejo: 'Busca equilibrar la frente con el mentón.',        tips: ['Bronceador en las sienes y la frente.', 'Colorete en el centro de las mejillas.', 'Ilumina la barbilla.'] }
};

const VIDEOS = [
  { id: 'XMCZEJVlyRY', nombre: 'Gigi Hadid',        titulo: 'Cuidado de la piel tras el embarazo y contouring', texto: 'Hidratación, cremas más densas en invierno y trucos de backstage.' },
  { id: 'CXvG2CBJ3SE', nombre: 'Olivia Rodrigo',    titulo: 'Skincare y maquillaje sin esfuerzo',               texto: 'Una rutina diaria sencilla, producida por Vogue con Glossier.' },
  { id: '_upZG4YctQU', nombre: 'Pharrell Williams', titulo: 'Su rutina de cuidado facial por la mañana',        texto: 'Exfoliación y constancia: el skincare también es para ellos.' },
  { id: '0zfQHuDKwZs', nombre: 'Paris Jackson',     titulo: 'Su rutina diaria de maquillaje y skincare',        texto: 'Cuidado de la piel y protección solar mientras se prepara.' },
  { id: '1hbMk_70xm0', nombre: 'Xiao Wen Ju',       titulo: 'Rutina nocturna de 9 pasos',                       texto: 'Una rutina completa de noche para una piel luminosa.' }
];
