/* =============================================================
   VELARIA — animazioni e comportamento
   Questo file serve a ENTRAMBE le pagine (index.html e collezione.html):
   ogni parte controlla da sola se la pagina contiene ciò che le serve.
   I dati dei profumi arrivano da profumi.js (COLLEZIONI e PROFUMI).

   Indice:
     1. Impostazioni generali
     2. Piccoli aiuti per i dati e l'HTML
     3. Costruzione delle parti create dai dati
        (collezioni, scaffale, catalogo)
     4. Immagini (con segnaposto se un file manca)
     5. Scroll morbido (Lenis) e link interni
     6. Header: colore e menu telefono
     7. HOME — Hero: la timeline legata allo scroll
     8. HOME — Intro all'apertura
     9. HOME — "Dal fiore alla boccetta"
    10. HOME — Scaffale orizzontale
    11. Comparse delle sezioni e numeri che contano
    12. COLLEZIONE — Filtri
    13. COLLEZIONE — Scheda prodotto
    14. Bottoni "Acquista" (dimostrativi)
    15. Avvio
   ============================================================= */


/* ---------- 1. IMPOSTAZIONI GENERALI ---------- */

// L'utente ha chiesto al sistema di ridurre le animazioni?
const riduciMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (riduciMovimento) document.documentElement.classList.add('reduce-motion');

// Su quale pagina siamo?
const paginaHome = Boolean(document.querySelector('.hero'));
const paginaCollezione = Boolean(document.querySelector('[data-catalogo]'));

// Nella home, al ricaricamento si riparte dall'inizio (così l'intro ha senso),
// a meno che l'indirizzo punti a una sezione (es. index.html#note)
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
if (paginaHome && !location.hash) window.scrollTo(0, 0);


/* ---------- 2. PICCOLI AIUTI PER I DATI E L'HTML ---------- */
const trovaProfumo = (id) => PROFUMI.find((p) => p.id === id);
const trovaCollezione = (id) => COLLEZIONI.find((c) => c.id === id);
const profumiDi = (idCollezione) => PROFUMI.filter((p) => p.collezione === idCollezione);
const coloreTesto = (scuro) => (scuro ? '#F3E6D3' : '#2B1D14');

// Crea il codice di un'immagine. data-colore e data-etichetta servono
// al segnaposto della boccetta (colore del liquido e nome sull'etichetta).
function htmlImmagine(nome, { alt = '', colore = '', etichetta = '' } = {}) {
  return `<img data-img="${nome}" alt="${alt}" data-colore="${colore}" data-etichetta="${etichetta}">`;
}
const htmlBoccetta = (p) => htmlImmagine(p.boccetta, { alt: `Boccetta di ${p.nome}`, colore: p.colore, etichetta: p.nome });

// Piramide olfattiva (testa / cuore / fondo)
const htmlPiramide = (n) => `
  <dl class="pyramid">
    <div><dt>Testa</dt><dd>${n.testa}</dd></div>
    <div><dt>Cuore</dt><dd>${n.cuore}</dd></div>
    <div><dt>Fondo</dt><dd>${n.fondo}</dd></div>
  </dl>`;


/* ---------- 3. COSTRUZIONE DELLE PARTI CREATE DAI DATI ---------- */

// HOME — "Le note": una scheda per collezione, con i suoi 4 profumi
function costruisciCollezioni() {
  const griglia = document.querySelector('[data-collezioni]');
  if (!griglia) return;
  griglia.innerHTML = COLLEZIONI.map((c) => `
    <article class="note" style="--c:${c.colore}" data-reveal>
      <div class="note__visual">${htmlImmagine(c.ingrediente)}</div>
      <p class="eyebrow">${c.momento} · ${c.famiglia}</p>
      <h3 class="note__name">Collezione ${c.nome}</h3>
      <p class="note__tag">${c.descrizione}</p>
      ${htmlPiramide(c.piramide)}
      <ul class="note__list">
        ${profumiDi(c.id).map((p) => `
          <li><a href="collezione.html#${p.id}"><span>N° ${p.numero}</span>${p.nome}<i aria-hidden="true">→</i></a></li>`).join('')}
      </ul>
      <a class="link-freccia" href="collezione.html?collezione=${c.id}">Vedi la collezione ${c.nome}</a>
    </article>`).join('');
}

// HOME — scaffale orizzontale: i profumi con inHome: true + la carta finale
function costruisciScaffale() {
  const binario = document.querySelector('[data-scaffale]');
  if (!binario) return;
  const scelti = PROFUMI.filter((p) => p.inHome);

  binario.innerHTML = scelti.map((p) => {
    const c = trovaCollezione(p.collezione);
    return `
      <article class="bottle-card">
        <a class="bottle-card__link" href="collezione.html#${p.id}">
          <div class="bottle-card__bottle">${htmlBoccetta(p)}</div>
          <div class="bottle-card__board" aria-hidden="true"></div>
          <p class="bottle-card__num">N° ${p.numero} · ${c.nome}</p>
          <h3 class="bottle-card__name">${p.nome}</h3>
          <p class="bottle-card__meta">${c.famiglia} · 50 ml · € ${p.prezzo}</p>
        </a>
        <button class="btn btn--outline btn--buy" type="button">Acquista</button>
      </article>`;
  }).join('') + `
      <article class="bottle-card bottle-card--cta">
        <a class="bottle-card__cta" href="collezione.html">
          <span class="bottle-card__cta-circle" aria-hidden="true">→</span>
          <span class="bottle-card__cta-text">Scopri tutta<br><em>la collezione</em></span>
          <span class="eyebrow">${PROFUMI.length} profumi · ${COLLEZIONI.length} collezioni</span>
        </a>
        <div class="bottle-card__board" aria-hidden="true"></div>
      </article>`;
}

// COLLEZIONE — griglia con tutti i profumi
function costruisciCatalogo() {
  const griglia = document.querySelector('[data-catalogo]');
  if (!griglia) return;
  griglia.innerHTML = PROFUMI.map((p) => {
    const c = trovaCollezione(p.collezione);
    return `
      <a class="catalogo-card" href="#${p.id}" data-collezione="${p.collezione}">
        <div class="catalogo-card__visual" style="--c:${p.colore}; color:${coloreTesto(p.scuro)}">
          <span class="catalogo-card__num">N° ${p.numero}</span>
          <div class="catalogo-card__bottle">${htmlBoccetta(p)}</div>
          <span class="catalogo-card__apri">Apri la scheda</span>
        </div>
        <div class="catalogo-card__info">
          <h2 class="catalogo-card__name">${p.nome}</h2>
          <p class="catalogo-card__frase">${p.frase}</p>
          <p class="catalogo-card__meta"><span>${c.nome} · ${c.famiglia}</span><span>€ ${p.prezzo}</span></p>
        </div>
      </a>`;
  }).join('');
}

costruisciCollezioni();
costruisciScaffale();
costruisciCatalogo();


/* ---------- 4. IMMAGINI ----------
   Ogni <img> ha data-img="nome" (senza estensione). Proviamo in ordine:
     1) img/web/nome.webp  → versione leggera, veloce da caricare
     2) img/nome.png       → l'immagine "vera"
     3) segnaposto elegante con il nome del file
   Così, se aggiungi una PNG nuova in img/, compare da sola. */
function caricaImmagini(radice = document) {
  radice.querySelectorAll('img[data-img]:not([data-caricata])').forEach((img) => {
    img.dataset.caricata = '1';
    const nome = img.dataset.img;
    const fonti = [`img/web/${nome}.webp`, `img/${nome}.png`];
    let tentativo = 0;

    img.addEventListener('error', () => {
      tentativo++;
      if (tentativo < fonti.length) img.src = fonti[tentativo];
      else mostraSegnaposto(img, nome);
    });

    img.src = fonti[0];
  });
}

// Sostituisce l'immagine mancante con un segnaposto:
// - per le boccette: una boccetta disegnata in CSS, col colore del liquido e il nome
// - per gli ingredienti: un cerchio sottile con il nome del file
function mostraSegnaposto(img, nome) {
  const segnaposto = document.createElement('div');
  segnaposto.setAttribute('role', 'img');
  segnaposto.setAttribute('aria-label', img.alt || nome);

  if (nome.startsWith('boccetta')) {
    segnaposto.className = 'boccetta-finta';
    segnaposto.style.setProperty('--liquido', img.dataset.colore || '#E8D49A');
    segnaposto.innerHTML = `
      <span class="boccetta-finta__tappo"></span>
      <span class="boccetta-finta__collo"></span>
      <span class="boccetta-finta__vetro">
        <span class="boccetta-finta__etichetta">
          <b>VELARIA</b>
          <small>${img.dataset.etichetta || ''}</small>
        </span>
      </span>
      <span class="boccetta-finta__file">${nome}.png</span>`;
  } else {
    segnaposto.className = 'segnaposto';
    segnaposto.textContent = `${nome}.png`;
  }
  img.replaceWith(segnaposto);
}

caricaImmagini();

// Se le librerie dal CDN non sono arrivate (es. senza internet), la pagina resta statica ma usabile
const librerieOk = Boolean(window.gsap && window.ScrollTrigger);
if (!librerieOk) document.documentElement.classList.add('is-ready', 'reduce-motion');
else gsap.registerPlugin(ScrollTrigger);


/* ---------- 5. SCROLL MORBIDO (LENIS) E LINK INTERNI ---------- */
let lenis = null;

if (librerieOk && !riduciMovimento && window.Lenis) {
  lenis = new Lenis({
    duration: 1.2,                                             // durata dello "scivolamento"
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // rallenta dolcemente alla fine
  });
  // Lenis e ScrollTrigger vanno sincronizzati sullo stesso "orologio" di GSAP
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((tempo) => lenis.raf(tempo * 1000));
  gsap.ticker.lagSmoothing(0);
}

// Scorre fino a un elemento o a una posizione in pixel
function scorriA(destinazione, immediato = false) {
  if (lenis) {
    lenis.scrollTo(destinazione, { duration: 1.6, immediate: immediato });
  } else {
    const y = typeof destinazione === 'number'
      ? destinazione
      : destinazione.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: riduciMovimento || immediato ? 'auto' : 'smooth' });
  }
}

// I link "#sezione" della stessa pagina usano lo scroll morbido.
// (I link "#id-profumo" della pagina collezione non trovano una sezione:
//  li gestisce la scheda prodotto, punto 13.)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (evento) => {
    const id = link.getAttribute('href');
    if (id === '#') return;                      // link di esempio (es. Instagram)
    const bersaglio = document.querySelector(id);
    if (!bersaglio) return;
    evento.preventDefault();
    chiudiMenu();
    scorriA(bersaglio);
  });
});


/* ---------- 6. HEADER: COLORE E MENU TELEFONO ---------- */
const header = document.querySelector('.header');
const heroSezione = document.querySelector('.hero');

// Colore di fondo della pagina e delle barre di Safari (meta theme-color).
// Seguono la sezione visibile: così su iPhone non compaiono strisce di un altro
// colore sopra/sotto la hero (es. giallo o crema mentre si guarda Rosa Velata).
const metaTema = document.querySelector('meta[name="theme-color"]');
let ultimoFondo = '';
function coloreDi(el) {
  // risale finché trova un elemento con un colore di fondo vero (non trasparente)
  while (el && el !== document.body && el !== document.documentElement) {
    const c = getComputedStyle(el).backgroundColor;
    if (c && c !== 'transparent' && !c.startsWith('rgba(0, 0, 0, 0')) return c;
    el = el.parentElement;
  }
  return '#F4EDE3';
}
// Linea fissa in fondo allo schermo (vedi .bordo-basso in style.css)
const bordoBasso = document.createElement('div');
bordoBasso.className = 'bordo-basso';
bordoBasso.setAttribute('aria-hidden', 'true');
document.body.appendChild(bordoBasso);

// "rgb(230, 195, 190)" → "#e6c3be" (Safari legge meglio i colori esadecimali)
function inEsadecimale(c) {
  const n = c.match(/\d+(\.\d+)?/g);
  if (!n || n.length < 3) return c;
  return '#' + n.slice(0, 3).map((v) => Math.round(Number(v)).toString(16).padStart(2, '0')).join('');
}

function aggiornaFondo(sezione) {
  const c = inEsadecimale(coloreDi(sezione));
  if (c === ultimoFondo) return;
  ultimoFondo = c;
  // un'unica variabile CSS colora: fondo pagina, header e linea in basso
  document.documentElement.style.setProperty('--fondo-pagina', c);
  document.documentElement.style.backgroundColor = c;
  document.body.style.backgroundColor = c;
  metaTema?.setAttribute('content', c);
}

// Guarda cosa c'è sotto l'header: se è una sezione scura, il testo diventa chiaro
function aggiornaHeader() {
  const x = window.innerWidth / 2;
  const y = header.offsetHeight / 2;
  const sotto = document
    .elementsFromPoint(x, y)
    .map((el) => el.closest('[data-theme]'))
    .find((el) => el && !header.contains(el));

  header.classList.toggle('is-light', sotto?.dataset.theme === 'dark');
  aggiornaFondo(sotto);

  // Dopo la hero (o subito, nelle altre pagine) l'header prende un fondo sfocato
  const soglia = heroSezione
    ? heroSezione.offsetTop + heroSezione.offsetHeight - window.innerHeight + 40
    : 40;
  header.classList.toggle('is-scrolled', window.scrollY > soglia);
}

// Aggiorna header e colori al massimo una volta per fotogramma
let headerInAttesa = false;
function richiediAggiornamentoHeader() {
  if (headerInAttesa) return;
  headerInAttesa = true;
  requestAnimationFrame(() => { aggiornaHeader(); headerInAttesa = false; });
}
window.addEventListener('scroll', richiediAggiornamentoHeader, { passive: true });
// ...e un ultimo controllo quando lo scroll si ferma (es. dopo un salto lungo)
if (window.ScrollTrigger) ScrollTrigger.addEventListener('scrollEnd', aggiornaHeader);

// Menu a tutto schermo su telefono
const bottoneMenu = document.querySelector('.header__toggle');
function chiudiMenu() {
  if (!document.body.classList.contains('menu-open')) return;
  document.body.classList.remove('menu-open');
  bottoneMenu.setAttribute('aria-expanded', 'false');
  bottoneMenu.textContent = 'Menu';
  lenis?.start();
  aggiornaHeader();
}
bottoneMenu.addEventListener('click', () => {
  if (document.body.classList.contains('menu-open')) { chiudiMenu(); return; }
  document.body.classList.add('menu-open');
  bottoneMenu.setAttribute('aria-expanded', 'true');
  bottoneMenu.textContent = 'Chiudi';
  lenis?.stop();
  header.classList.remove('is-light');
});
// Un link del menu che porta a un'altra pagina chiude comunque il menu
document.querySelectorAll('.menu-mobile a').forEach((a) => a.addEventListener('click', chiudiMenu));


/* ---------- 7. HOME — HERO: LA TIMELINE LEGATA ALLO SCROLL ----------
   La timeline dura 3 "unità" di tempo, una per profumo.
   ScrollTrigger la fa avanzare mentre scorri i 300vh della sezione.
   Per ogni profumo definiamo quando ENTRA, quando RESTA (parallasse)
   e quando ESCE. I cambi avvengono intorno a 1 e 2.            */
function iniziaHero() {
  const stage = document.querySelector('.hero__stage');

  // I tre profumi della hero (colori presi da profumi.js)
  const HERO = ['alba-di-bergamotto', 'rosa-velata', 'ambra-notturna'].map((id) => {
    const p = trovaProfumo(id);
    return { sfondo: p.colore, testo: coloreTesto(p.scuro), tema: p.scuro ? 'dark' : 'light' };
  });

  const FASI = [
    { entra: null, resta: [0, 0.72],    esce: 0.72 },
    { entra: 0.8,  resta: [1.28, 1.72], esce: 1.72 },
    { entra: 1.8,  resta: [2.28, 3],    esce: null },
  ];
  const DURATA_CAMBIO = 0.48;          // quanto dura un'entrata o un'uscita
  const PUNTI_INDICE = [0, 1.5, 2.6];  // dove portare lo scroll cliccando l'indice

  // Raccogliamo gli elementi di ogni profumo
  const insiemi = [0, 1, 2].map((i) => ({
    ingredienti: gsap.utils.toArray(`.ing[data-set="${i}"]`),
    righe:       gsap.utils.toArray(`.hero__title[data-set="${i}"] .line__inner`),
    piramide:    document.querySelector(`.hero__pyramid[data-set="${i}"]`),
  }));
  const boccette = gsap.utils.toArray('.hero__bottle');   // contenitori delle 3 boccette
  const vociIndice = gsap.utils.toArray('.hero__index li');
  const pallino = document.querySelector('.hero__dot');

  // Posizione verticale del pallino accanto alla voce n. i
  const yPallino = (i) => vociIndice[i].offsetTop + vociIndice[i].offsetHeight / 2;

  // --- Calcoli per far uscire gli ingredienti "verso l'esterno" ---
  const eDavanti = (el) => el.classList.contains('ing--front');
  const profondita = (el) => (eDavanti(el) ? 1 : 0.45);          // quelli dietro si muovono meno (parallasse)

  // Direzione dal centro dello schermo verso l'ingrediente
  function direzione(el) {
    const dx = el.offsetLeft - stage.clientWidth / 2;
    const dy = el.offsetTop - stage.clientHeight / 2;
    const lunghezza = Math.hypot(dx, dy) || 1;
    return { x: dx / lunghezza, y: dy / lunghezza };
  }
  const distanzaUscita = (el) => Math.max(window.innerWidth, window.innerHeight) * 0.6 * profondita(el);
  const fuoriX = (el) => () => direzione(el).x * distanzaUscita(el);
  const fuoriY = (el) => () => direzione(el).y * distanzaUscita(el);
  const rotazioneUscita = (el) => () => (direzione(el).x >= 0 ? 1 : -1) * (eDavanti(el) ? 75 : 30);
  const deriva = (el) => window.innerHeight * 0.06 * profondita(el); // quanto sale durante la parallasse

  // Indice del profumo visibile in questo momento
  let attivo = -1;
  function impostaAttivo(i) {
    if (i === attivo) return;
    attivo = i;
    vociIndice.forEach((voce, n) => voce.classList.toggle('is-active', n === i));
    stage.dataset.theme = HERO[i].tema;

    // Con movimento ridotto i cambi li fa il CSS (dissolvenze semplici)
    if (riduciMovimento) {
      document.querySelectorAll('.hero [data-set]').forEach((el) => {
        el.classList.toggle('is-active', Number(el.dataset.set) === i);
      });
      stage.style.backgroundColor = HERO[i].sfondo;
      stage.style.setProperty('--ink', HERO[i].testo);
      gsap.set(pallino, { y: yPallino(i) });
    }
    aggiornaHeader();
  }

  // Con movimento ridotto lo sfondo cambia con una transizione CSS: a fine transizione aggiorniamo il fondo pagina
  stage.addEventListener('transitionend', () => aggiornaFondo(stage));

  // --- Stato iniziale ---
  gsap.set('.ing', { xPercent: -50, yPercent: -50 });   // gli ingredienti si posizionano dal loro centro
  gsap.set(pallino, { y: yPallino(0) });

  if (!riduciMovimento) {
    // Profumo 1 visibile, gli altri nascosti
    gsap.set(insiemi[0].ingredienti, { opacity: 1, x: 0, rotation: 0, y: (i, el) => deriva(el) });
    gsap.set([...insiemi[1].ingredienti, ...insiemi[2].ingredienti], { opacity: 0 });
    gsap.set(boccette, { opacity: (i) => (i === 0 ? 1 : 0) });
    gsap.set(insiemi.flatMap((s) => s.righe), { yPercent: 135 });   // tutte le righe sotto la maschera
    gsap.set([insiemi[1].piramide, insiemi[2].piramide], { autoAlpha: 0 });
    gsap.set(stage, { backgroundColor: HERO[0].sfondo, '--ink': HERO[0].testo });

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: heroSezione,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,                 // segue lo scroll con un piccolo ritardo morbido
        invalidateOnRefresh: true,  // ricalcola le distanze se cambia la finestra
        onUpdate: (self) => impostaAttivo(Math.min(2, Math.floor(self.progress * 3))),
      },
      // a ogni fotogramma dell'animazione (anche mentre "rallenta" dopo lo scroll)
      // il fondo della pagina segue il colore che sta sfumando
      onUpdate: richiediAggiornamentoHeader,
    });

    // L'invito "Scorri per scoprire" sparisce appena inizi a scorrere
    tl.to('.hero__hint', { autoAlpha: 0, duration: 0.15 }, 0.03);

    insiemi.forEach((insieme, i) => {
      const fase = FASI[i];

      // ---- Ingredienti ----
      insieme.ingredienti.forEach((el, n) => {
        const ritardo = n * 0.03;   // piccolo sfalsamento tra un ingrediente e l'altro
        const scalaFuori = eDavanti(el) ? 1.2 : 0.9;

        // ENTRATA: arrivano da fuori ruotando
        if (fase.entra !== null) {
          tl.fromTo(el,
            { x: fuoriX(el), y: () => fuoriY(el)() + deriva(el), rotation: () => -rotazioneUscita(el)(), opacity: 0, scale: scalaFuori },
            { x: 0, y: () => deriva(el), rotation: 0, opacity: 1, scale: 1, duration: DURATA_CAMBIO, ease: 'power2.out', immediateRender: false },
            fase.entra + ritardo);
        }

        // PARALLASSE: mentre il profumo resta, salgono piano (quelli davanti più veloci)
        tl.fromTo(el,
          { y: () => deriva(el) },
          { y: () => -deriva(el), duration: fase.resta[1] - fase.resta[0], immediateRender: false },
          fase.resta[0]);

        // USCITA: escono verso l'esterno ruotando
        if (fase.esce !== null) {
          tl.fromTo(el,
            { x: 0, y: () => -deriva(el), rotation: 0, opacity: 1, scale: 1 },
            { x: fuoriX(el), y: () => fuoriY(el)() - deriva(el), rotation: rotazioneUscita(el), opacity: 0, scale: scalaFuori, duration: DURATA_CAMBIO, ease: 'power2.in', immediateRender: false },
            fase.esce + ritardo);
        }
      });

      // ---- Titolo: righe che escono verso l'alto / entrano dal basso ----
      if (fase.esce !== null) {
        tl.fromTo(insieme.righe, { yPercent: 0 },
          { yPercent: -135, stagger: 0.04, duration: 0.26, ease: 'power2.in', immediateRender: false },
          fase.esce);
      }
      if (fase.entra !== null) {
        tl.fromTo(insieme.righe, { yPercent: 135 },
          { yPercent: 0, stagger: 0.06, duration: 0.32, ease: 'power3.out', immediateRender: false },
          fase.entra + 0.16);
      }

      // ---- Piramide olfattiva: dissolvenza con piccolo spostamento ----
      if (fase.esce !== null) {
        tl.fromTo(insieme.piramide, { autoAlpha: 1, y: 0 },
          { autoAlpha: 0, y: -16, duration: 0.25, immediateRender: false }, fase.esce + 0.05);
      }
      if (fase.entra !== null) {
        tl.fromTo(insieme.piramide, { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.3, immediateRender: false }, fase.entra + 0.2);
      }

      // ---- Cambio profumo (solo dal secondo in poi) ----
      if (i > 0) {
        const prima = HERO[i - 1];
        const ora = HERO[i];

        // Sfondo e colore dei testi sfumano
        tl.fromTo(stage,
          { backgroundColor: prima.sfondo, '--ink': prima.testo },
          { backgroundColor: ora.sfondo, '--ink': ora.testo, duration: 0.4, immediateRender: false },
          fase.entra);

        // Boccette: dissolvenza incrociata, con un respiro di scala
        tl.fromTo(boccette[i - 1], { opacity: 1, scale: 1 },
          { opacity: 0, scale: 0.97, duration: 0.3, immediateRender: false }, fase.entra + 0.05);
        tl.fromTo(boccette[i], { opacity: 0, scale: 1.03 },
          { opacity: 1, scale: 1, duration: 0.3, immediateRender: false }, fase.entra + 0.05);

        // Il pallino dell'indice scende sul nuovo profumo
        tl.fromTo(pallino, { y: () => yPallino(i - 1) },
          { y: () => yPallino(i), duration: 0.35, ease: 'power2.inOut', immediateRender: false },
          fase.entra + 0.05);
      }
    });

    // Ci assicuriamo che la timeline duri esattamente 3 unità
    tl.set({}, {}, 3);
  } else {
    // Movimento ridotto: nessuna timeline, solo il cambio di profumo in base allo scroll
    ScrollTrigger.create({
      trigger: heroSezione,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => impostaAttivo(Math.min(2, Math.floor(self.progress * 3))),
    });
  }
  impostaAttivo(0);

  // Cliccando un nome nell'indice si scorre fino a quel profumo
  document.querySelectorAll('[data-goto]').forEach((bottone) => {
    bottone.addEventListener('click', () => {
      const i = Number(bottone.dataset.goto);
      const corsa = heroSezione.offsetHeight - window.innerHeight;   // quanti pixel dura la hero
      scorriA(heroSezione.offsetTop + corsa * (PUNTI_INDICE[i] / 3));
    });
  });

  return insiemi;
}


/* ---------- 8. HOME — INTRO ALL'APERTURA ---------- */
function intro(insiemi) {
  if (riduciMovimento) return;
  const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power3.out' } });
  tl.from(header, { autoAlpha: 0, y: -16, duration: 1 }, 0)
    .from('.hero__bottles', { autoAlpha: 0, y: 40, duration: 1.4 }, 0)
    .from('.hero__layer--back', { autoAlpha: 0, scale: 0.9, duration: 1.6 }, 0.1)
    .from('.hero__layer--front', { autoAlpha: 0, scale: 1.15, duration: 1.6 }, 0.2)
    .to(insiemi[0].righe, { yPercent: 0, stagger: 0.09, duration: 1.1, ease: 'power4.out' }, 0.35)
    .from(['.hero__aside', '.hero__bottom'], { autoAlpha: 0, y: 20, duration: 1, stagger: 0.1 }, 0.7);
}


/* ---------- 9. HOME — "DAL FIORE ALLA BOCCETTA" ---------- */
function iniziaProcesso() {
  const passi = gsap.utils.toArray('.step');
  if (!passi.length) return;

  if (riduciMovimento) {
    passi.forEach((p) => p.classList.add('is-lit'));
    return;
  }
  const mm = gsap.matchMedia();

  // Schermi grandi: la sezione è ferma e i passi si accendono mentre scorri
  mm.add('(min-width: 900px)', () => {
    const accendi = (quanti) => passi.forEach((p, n) => p.classList.toggle('is-lit', n < quanti));

    ScrollTrigger.create({
      trigger: '.process',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => accendi(Math.min(4, Math.floor(self.progress * 4) + 1)),
      onLeaveBack: () => accendi(0),
    });

    // La linea si riempie seguendo lo scroll
    gsap.fromTo('.process__line-fill', { scaleX: 0 }, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: '.process', start: 'top top', end: 'bottom bottom', scrub: true },
    });

    return () => accendi(0);   // pulizia quando si cambia dimensione
  });

  // Telefono e tablet: ogni passo si accende quando arriva verso metà schermo
  mm.add('(max-width: 899px)', () => {
    passi.forEach((passo) => {
      ScrollTrigger.create({
        trigger: passo,
        start: 'top 72%',
        onEnter: () => passo.classList.add('is-lit'),
        onLeaveBack: () => passo.classList.remove('is-lit'),
      });
    });
  });
}


/* ---------- 10. HOME — SCAFFALE ORIZZONTALE ----------
   Su computer: la sezione si blocca (pin) e lo scroll verticale
   fa scorrere lo scaffale in orizzontale.
   Su telefono e con movimento ridotto: si scorre col dito / trackpad. */
function iniziaScaffale() {
  const sezione = document.querySelector('.collection');
  const finestra = document.querySelector('.scaffale__viewport');
  const binario = document.querySelector('[data-scaffale]');
  const barra = document.querySelector('.collection__progress span');
  if (!sezione || !binario) return;

  // Quanti pixel deve scorrere lo scaffale per mostrare l'ultima carta
  const distanza = () => Math.max(0, binario.scrollWidth - finestra.clientWidth);

  if (riduciMovimento) return;
  const mm = gsap.matchMedia();

  mm.add('(min-width: 900px)', () => {
    sezione.classList.add('is-pinned');

    gsap.to(binario, {
      x: () => -distanza(),
      ease: 'none',
      scrollTrigger: {
        trigger: sezione,
        start: 'top top',
        end: () => '+=' + distanza(),   // la sezione resta ferma per tutta la lunghezza dello scaffale
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => { barra.style.transform = `scaleX(${self.progress})`; },
      },
    });

    return () => sezione.classList.remove('is-pinned');
  });

  // Su telefono la barra segue lo scorrimento col dito
  mm.add('(max-width: 899px)', () => {
    const aggiorna = () => {
      const d = distanza();
      barra.style.transform = `scaleX(${d ? finestra.scrollLeft / d : 1})`;
    };
    finestra.addEventListener('scroll', aggiorna, { passive: true });
    aggiorna();
    return () => finestra.removeEventListener('scroll', aggiorna);
  });
}


/* ---------- 11. COMPARSE DELLE SEZIONI E NUMERI CHE CONTANO ---------- */
function iniziaComparse() {
  if (riduciMovimento) return;

  // Gli elementi con data-reveal salgono e compaiono quando entrano nello schermo
  gsap.set('[data-reveal]', { autoAlpha: 0 });
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 86%',
    once: true,
    onEnter: (elementi) => gsap.fromTo(elementi,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out' }),
  });

  // I numeri dell'atelier contano fino al valore finale
  document.querySelectorAll('.stat__num').forEach((numero) => {
    const da = Number(numero.dataset.from || 0);
    const a = Number(numero.dataset.to);
    const contatore = { valore: da };
    numero.textContent = da;

    ScrollTrigger.create({
      trigger: numero,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(contatore, {
        valore: a,
        duration: 2.2,
        ease: 'power2.out',
        onUpdate: () => { numero.textContent = Math.round(contatore.valore); },
      }),
    });
  });
}


/* ---------- 12. COLLEZIONE — FILTRI ----------
   I bottoni mostrano solo i profumi di una collezione.
   Il filtro scelto finisce nell'indirizzo (?collezione=luce),
   così i link dalla home aprono la pagina già filtrata. */
function iniziaFiltri() {
  const bottoni = document.querySelectorAll('[data-filtro]');
  const carte = gsap.utils.toArray('.catalogo-card');

  // Numero di profumi accanto a ogni filtro
  bottoni.forEach((b) => {
    const f = b.dataset.filtro;
    b.querySelector('span').textContent = f === 'tutti' ? PROFUMI.length : profumiDi(f).length;
  });

  function applica(filtro, anima = true) {
    if (filtro !== 'tutti' && !trovaCollezione(filtro)) filtro = 'tutti';
    bottoni.forEach((b) => {
      const attivo = b.dataset.filtro === filtro;
      b.classList.toggle('is-active', attivo);
      b.setAttribute('aria-pressed', String(attivo));
    });
    const visibili = carte.filter((c) => {
      const mostra = filtro === 'tutti' || c.dataset.collezione === filtro;
      c.hidden = !mostra;
      return mostra;
    });

    // Aggiorna l'indirizzo senza ricaricare la pagina
    const url = new URL(location.href);
    if (filtro === 'tutti') url.searchParams.delete('collezione');
    else url.searchParams.set('collezione', filtro);
    history.replaceState(null, '', url);

    if (anima && !riduciMovimento && librerieOk) {
      gsap.fromTo(visibili, { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06, ease: 'power3.out', overwrite: true });
    }
    if (librerieOk) ScrollTrigger.refresh();
  }

  bottoni.forEach((b) => b.addEventListener('click', () => applica(b.dataset.filtro)));
  applica(new URLSearchParams(location.search).get('collezione') || 'tutti');
}


/* ---------- 13. COLLEZIONE — SCHEDA PRODOTTO ----------
   Cliccando una carta l'indirizzo diventa collezione.html#id-profumo:
   la scheda si apre leggendo l'id. Così ogni scheda ha il suo link
   e il tasto "indietro" del browser la chiude. */
function iniziaScheda() {
  const scheda = document.getElementById('scheda');
  if (!scheda) return;
  const velo = scheda.querySelector('.scheda__velo');
  const pannello = scheda.querySelector('.scheda__pannello');
  const contenuto = scheda.querySelector('[data-scheda]');
  const titoloPagina = document.title;
  let aperta = false;
  let ultimoFocus = null;

  // Riempie la scheda con i dati del profumo
  function riempi(p) {
    const c = trovaCollezione(p.collezione);
    const simili = profumiDi(p.collezione).filter((x) => x.id !== p.id);

    // Posizioni degli ingredienti che fluttuano attorno alla boccetta
    const posti = [
      { x: '22%', y: '74%', w: '30%', classe: 'ing--front', fd: '7s', fdl: '-2s', r: '-12deg' },
      { x: '80%', y: '30%', w: '24%', classe: 'ing--front', fd: '8s', fdl: '-5s', r: '14deg' },
      { x: '26%', y: '22%', w: '17%', classe: 'ing--back',  fd: '9s', fdl: '-1s', r: '-24deg' },
    ];

    contenuto.innerHTML = `
      <div class="scheda__visual" style="--c:${p.colore}; color:${coloreTesto(p.scuro)}" data-theme="${p.scuro ? 'dark' : 'light'}">
        ${p.ingredienti.map((ing, n) => {
          const s = posti[n % posti.length];
          return `<div class="ing ${s.classe}" style="--x:${s.x};--y:${s.y};--w:${s.w};--r:${s.r};--fd:${s.fd};--fdl:${s.fdl}">
                    <div class="ing__float">${htmlImmagine(ing.img)}</div>
                  </div>`;
        }).join('')}
        <div class="scheda__bottle">${htmlBoccetta(p)}</div>
        <p class="scheda__luogo">N° ${p.numero} · Collezione ${c.nome}</p>
      </div>

      <div class="scheda__info">
        <p class="eyebrow">${c.momento} · ${c.famiglia}</p>
        <h2 class="scheda__nome" id="scheda-nome">${p.nome}</h2>
        <p class="scheda__frase">${p.frase}</p>

        <div class="scheda__acquisto">
          <div class="formati" role="radiogroup" aria-label="Formato">
            <button type="button" class="formato is-active" role="radio" aria-checked="true" data-formato="50">50 ml</button>
            <button type="button" class="formato" role="radio" aria-checked="false" data-formato="100">100 ml</button>
          </div>
          <p class="scheda__prezzo" aria-live="polite">€ ${p.prezzo}</p>
        </div>
        <button type="button" class="btn btn--solid btn--buy">Acquista</button>
        <p class="scheda__nota">Eau de Parfum · Spedizione gratuita in Italia · Campione in omaggio</p>

        <p class="scheda__racconto">${p.racconto}</p>

        <h3 class="scheda__sottotitolo">Piramide olfattiva</h3>
        ${htmlPiramide(p)}

        <h3 class="scheda__sottotitolo">Gli ingredienti</h3>
        <ul class="scheda__ingredienti">
          ${p.ingredienti.map((ing) => `
            <li><span class="scheda__ing-img" style="--c:${p.colore}">${htmlImmagine(ing.img)}</span>${ing.nome}</li>`).join('')}
        </ul>

        <h3 class="scheda__sottotitolo">Della stessa collezione</h3>
        <ul class="scheda__simili">
          ${simili.map((s) => `
            <li><a href="#${s.id}">
              <span class="scheda__simile-img" style="--c:${s.colore}">${htmlBoccetta(s)}</span>
              <span><b>${s.nome}</b><small>€ ${s.prezzo}</small></span>
            </a></li>`).join('')}
        </ul>
      </div>`;

    caricaImmagini(contenuto);
    collegaBottoniAcquista(contenuto);

    // Scelta del formato: cambia il prezzo
    contenuto.querySelectorAll('[data-formato]').forEach((b) => {
      b.addEventListener('click', () => {
        contenuto.querySelectorAll('[data-formato]').forEach((x) => {
          x.classList.toggle('is-active', x === b);
          x.setAttribute('aria-checked', String(x === b));
        });
        contenuto.querySelector('.scheda__prezzo').textContent =
          `€ ${b.dataset.formato === '100' ? p.prezzo100 : p.prezzo}`;
      });
    });

    document.title = `${p.nome} — Velaria`;
  }

  function apri(p) {
    riempi(p);
    contenuto.scrollTop = 0;   // la scheda riparte dall'alto

    if (aperta) {
      // Passaggio da un profumo all'altro dentro la scheda
      if (!riduciMovimento && librerieOk) gsap.fromTo(contenuto, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 });
      return;
    }
    aperta = true;
    ultimoFocus = document.activeElement;
    scheda.hidden = false;
    document.documentElement.classList.add('scheda-aperta');
    lenis?.stop();

    if (!riduciMovimento && librerieOk) {
      gsap.fromTo(velo, { opacity: 0 }, { opacity: 1, duration: 0.5 });
      gsap.fromTo(pannello, { xPercent: 100 }, { xPercent: 0, duration: 0.9, ease: 'power4.out' });
      gsap.fromTo(contenuto.querySelectorAll('.scheda__info > *'), { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.04, delay: 0.25, ease: 'power3.out' });
    }
    pannello.focus();
  }

  function chiudi() {
    if (!aperta) return;
    aperta = false;
    document.title = titoloPagina;
    // Toglie "#id" dall'indirizzo senza far saltare la pagina
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);

    const fine = () => {
      scheda.hidden = true;
      document.documentElement.classList.remove('scheda-aperta');
      lenis?.start();
      ultimoFocus?.focus?.({ preventScroll: true });
    };
    if (!riduciMovimento && librerieOk) {
      gsap.to(velo, { opacity: 0, duration: 0.4 });
      gsap.to(pannello, { xPercent: 100, duration: 0.6, ease: 'power3.in', onComplete: fine });
    } else fine();
  }

  // L'indirizzo decide se la scheda è aperta e su quale profumo
  function leggiIndirizzo() {
    const p = trovaProfumo(decodeURIComponent(location.hash.slice(1)));
    if (p) apri(p); else chiudi();
  }

  window.addEventListener('hashchange', leggiIndirizzo);
  scheda.querySelectorAll('[data-chiudi]').forEach((el) => el.addEventListener('click', chiudi));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') chiudi(); });
  leggiIndirizzo();
}


/* ---------- 14. BOTTONI "ACQUISTA" (DIMOSTRATIVI) ----------
   È un sito concept: il bottone conferma l'aggiunta e poi torna come prima. */
function collegaBottoniAcquista(radice = document) {
  radice.querySelectorAll('.btn--buy').forEach((bottone) => {
    bottone.addEventListener('click', () => {
      if (bottone.dataset.busy) return;
      bottone.dataset.busy = '1';
      bottone.textContent = 'Aggiunto ✓';
      setTimeout(() => { bottone.textContent = 'Acquista'; delete bottone.dataset.busy; }, 2000);
    });
  });
}


/* ---------- 15. AVVIO ---------- */
collegaBottoniAcquista();

if (librerieOk) {
  if (paginaHome) {
    const insiemi = iniziaHero();
    iniziaProcesso();
    iniziaScaffale();
    document.documentElement.classList.add('is-ready');   // ora possiamo mostrare hero e header
    if (!location.hash) intro(insiemi);
    else gsap.set(insiemi[0].righe, { yPercent: 0 });   // arrivo diretto a una sezione: titolo già visibile
  }
  iniziaComparse();
}
document.documentElement.classList.add('is-ready');

if (paginaCollezione) {
  iniziaFiltri();
  iniziaScheda();
}

// Quando tutte le immagini sono caricate, ricalcoliamo le misure delle animazioni.
// Se l'indirizzo punta a una sezione (es. index.html#note), ci andiamo subito.
window.addEventListener('load', () => {
  if (librerieOk) ScrollTrigger.refresh();
  const bersaglio = paginaHome && location.hash && document.querySelector(location.hash);
  if (bersaglio) scorriA(bersaglio, true);
  aggiornaHeader();
});
aggiornaHeader();
