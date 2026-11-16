/* =============================================================
   VELARIA — I DATI DELLA COLLEZIONE
   Questo è l'unico posto dove stanno nomi, prezzi, note e immagini.
   Lo usano sia la home (index.html) sia la pagina collezione.html.

   Per cambiare un prezzo, una nota o un testo: modifica qui e salva.
   Per aggiungere un profumo: copia un blocco { ... } e cambia i valori
   (l'"id" deve essere unico, tutto minuscolo e con i trattini).

   Le immagini si indicano SENZA estensione: "boccetta-iris" cerca
   img/web/boccetta-iris.webp, poi img/boccetta-iris.png, e se non c'è
   nessuno dei due mostra un segnaposto.
   ============================================================= */


/* ---------- LE TRE COLLEZIONI ---------- */
const COLLEZIONI = [
  {
    id: 'luce',
    nome: 'Luce',
    momento: 'Il mattino',
    famiglia: 'Agrumata',
    colore: '#E8D49A',
    scuro: false,                      // true = sfondo scuro, testi chiari
    ingrediente: 'bergamotto-fetta',   // immagine che rappresenta la collezione
    descrizione: 'Agrumi italiani, fiori bianchi ed erbe aromatiche. Profumi limpidi, da indossare con la prima luce.',
    piramide: { testa: 'Agrumi del Sud', cuore: "Fiori d'arancio, erbe", fondo: 'Muschi, legni chiari' },
  },
  {
    id: 'giardino',
    nome: 'Giardino',
    momento: 'Il pomeriggio',
    famiglia: 'Floreale',
    colore: '#E6C3BE',
    scuro: false,
    ingrediente: 'peonia',
    descrizione: 'Rose, iris e fiori bianchi dei giardini italiani, resi moderni da spezie leggere e muschi.',
    piramide: { testa: 'Frutti e spezie chiare', cuore: 'Rosa, iris, gelsomino', fondo: 'Muschi, legni morbidi' },
  },
  {
    id: 'notte',
    nome: 'Notte',
    momento: 'La sera',
    famiglia: 'Ambrata e legnosa',
    colore: '#3E261C',
    scuro: true,
    ingrediente: 'ambra-resina',
    descrizione: 'Resine, legni e spezie calde. Profumi avvolgenti che restano sulla pelle fino al mattino.',
    piramide: { testa: 'Spezie calde', cuore: 'Resine, cuoio, iris', fondo: 'Ambra, oud, legni scuri' },
  },
];


/* ---------- I DODICI PROFUMI ----------
   inHome: true  → compare anche sullo scaffale della home
   ingredienti   → { img: nome del file, nome: come si legge sul sito } */
const PROFUMI = [
  /* ===== COLLEZIONE LUCE ===== */
  {
    id: 'alba-di-bergamotto', numero: '01', nome: 'Alba di Bergamotto', collezione: 'luce',
    frase: 'Bergamotto, luce del mattino.',
    colore: '#E8D49A', scuro: false,
    prezzo: 145, prezzo100: 210,
    testa: 'Bergamotto di Calabria, limone', cuore: 'Neroli, petitgrain', fondo: 'Muschio bianco, cedro',
    boccetta: 'boccetta-alba',
    ingredienti: [
      { img: 'bergamotto-fetta', nome: 'Bergamotto' },
      { img: 'bergamotto-scorza', nome: 'Scorza di bergamotto' },
      { img: 'zagara', nome: 'Zagara' },
    ],
    racconto: "Le sei del mattino in un agrumeto vicino a Reggio Calabria: la luce è ancora bassa e le scorze rilasciano il loro olio al primo tocco. Un profumo limpido, che sa di inizio.",
    inHome: true,
  },
  {
    id: 'limonaia-di-boboli', numero: '04', nome: 'Limonaia di Boboli', collezione: 'luce',
    frase: "Limone, all'ombra del giardino.",
    colore: '#DDE2A6', scuro: false,
    prezzo: 145, prezzo100: 210,
    testa: 'Limone di Amalfi, foglia di limone', cuore: "Basilico, fiore d'arancio", fondo: 'Vetiver, cedro',
    boccetta: 'boccetta-limonaia',
    ingredienti: [
      { img: 'limone-amalfi', nome: 'Limone di Amalfi' },
      { img: 'basilico', nome: 'Basilico' },
      { img: 'vetiver', nome: 'Radici di vetiver' },
    ],
    racconto: "Nel giardino di Boboli i limoni passano l'inverno al riparo, nella limonaia. Foglie verdi, basilico appena colto e il fresco della pietra all'ombra.",
    inHome: true,
  },
  {
    id: 'chinotto-di-liguria', numero: '05', nome: 'Chinotto di Liguria', collezione: 'luce',
    frase: 'Chinotto, vento di mare.',
    colore: '#C5D3B8', scuro: false,
    prezzo: 150, prezzo100: 220,
    testa: 'Chinotto, mandarino verde', cuore: 'Rosmarino, salvia', fondo: 'Ambretta, muschio',
    boccetta: 'boccetta-chinotto',
    ingredienti: [
      { img: 'chinotto', nome: 'Chinotto' },
      { img: 'rosmarino', nome: 'Rosmarino' },
      { img: 'salvia', nome: 'Salvia' },
    ],
    racconto: "Le terrazze sopra il mare di Savona, dove il chinotto cresce tra rosmarino e salvia selvatica. Amaro, salmastro, luminoso come un pomeriggio di vento.",
    inHome: false,
  },
  {
    id: 'mezzogiorno-a-ortigia', numero: '06', nome: 'Mezzogiorno a Ortigia', collezione: 'luce',
    frase: 'Arancia rossa, sole a picco.',
    colore: '#F0B394', scuro: false,
    prezzo: 155, prezzo100: 225,
    testa: 'Arancia rossa, pompelmo', cuore: 'Fiore di cappero, fico', fondo: 'Sale marino, sandalo',
    boccetta: 'boccetta-ortigia',
    ingredienti: [
      { img: 'arancia-rossa', nome: 'Arancia rossa' },
      { img: 'fiore-cappero', nome: 'Fiore di cappero' },
      { img: 'fico', nome: 'Fico' },
    ],
    racconto: "Il mercato di Ortigia a mezzogiorno: arance rosse spaccate al sole, capperi in fiore sui muri, l'odore del sale che arriva dal porto.",
    inHome: false,
  },

  /* ===== COLLEZIONE GIARDINO ===== */
  {
    id: 'rosa-velata', numero: '02', nome: 'Rosa Velata', collezione: 'giardino',
    frase: 'Rosa, velata di pepe.',
    colore: '#E6C3BE', scuro: false,
    prezzo: 165, prezzo100: 240,
    testa: 'Pepe rosa, litchi', cuore: 'Rosa damascena, peonia', fondo: 'Muschio, legno di cashmere',
    boccetta: 'boccetta-rosa',
    ingredienti: [
      { img: 'rosa-petali', nome: 'Petali di rosa' },
      { img: 'peonia', nome: 'Peonia' },
      { img: 'pepe-rosa', nome: 'Pepe rosa' },
    ],
    racconto: "Un roseto fiorentino a fine maggio, subito dopo un temporale. La rosa damascena è avvolta da un velo di pepe rosa che la rende meno dolce e più misteriosa.",
    inHome: true,
  },
  {
    id: 'iris-di-fiesole', numero: '07', nome: 'Iris di Fiesole', collezione: 'giardino',
    frase: 'Iris, polvere di cipria.',
    colore: '#C8CCD6', scuro: false,
    prezzo: 195, prezzo100: 285,
    testa: 'Bergamotto, seme di carota', cuore: 'Iris pallida, violetta', fondo: 'Muschio, sandalo',
    boccetta: 'boccetta-iris',
    ingredienti: [
      { img: 'iris', nome: 'Iris pallida' },
      { img: 'radice-iris', nome: "Rizoma d'iris" },
      { img: 'violetta', nome: 'Violetta' },
    ],
    racconto: "Sulle colline di Fiesole l'iris si coltiva da secoli, e il suo rizoma riposa tre anni prima di diventare essenza. Un profumo di cipria, seta e pazienza.",
    inHome: true,
  },
  {
    id: 'glicine-al-bardini', numero: '08', nome: 'Glicine al Bardini', collezione: 'giardino',
    frase: 'Glicine, aprile sul fiume.',
    colore: '#CDBBDA', scuro: false,
    prezzo: 165, prezzo100: 240,
    testa: 'Pera, cassis', cuore: 'Glicine, mughetto', fondo: 'Muschio bianco, legni chiari',
    boccetta: 'boccetta-glicine',
    ingredienti: [
      { img: 'glicine', nome: 'Glicine' },
      { img: 'pera', nome: 'Pera' },
      { img: 'mughetto', nome: 'Mughetto' },
    ],
    racconto: "Ad aprile il pergolato del Giardino Bardini diventa una galleria viola affacciata sull'Arno. Glicine, pera succosa e un filo di mughetto.",
    inHome: false,
  },
  {
    id: 'gelsomino-di-noto', numero: '09', nome: 'Gelsomino di Noto', collezione: 'giardino',
    frase: 'Gelsomino, pietra calda.',
    colore: '#EFE2C4', scuro: false,
    prezzo: 175, prezzo100: 255,
    testa: 'Mandarino, neroli', cuore: 'Gelsomino sambac, tuberosa', fondo: 'Miele, benzoino',
    boccetta: 'boccetta-gelsomino',
    ingredienti: [
      { img: 'gelsomino', nome: 'Gelsomino' },
      { img: 'tuberosa', nome: 'Tuberosa' },
      { img: 'favo-miele', nome: 'Favo di miele' },
    ],
    racconto: "Le sere d'estate a Noto, quando la pietra barocca restituisce il calore del giorno. Gelsomino e tuberosa su un fondo di miele e benzoino.",
    inHome: false,
  },

  /* ===== COLLEZIONE NOTTE ===== */
  {
    id: 'ambra-notturna', numero: '03', nome: 'Ambra Notturna', collezione: 'notte',
    frase: 'Ambra, dopo mezzanotte.',
    colore: '#3E261C', scuro: true,
    prezzo: 185, prezzo100: 270,
    testa: 'Cardamomo, zafferano', cuore: 'Iris, cannella', fondo: 'Vaniglia bourbon, oud, ambra',
    boccetta: 'boccetta-ambra',
    ingredienti: [
      { img: 'vaniglia', nome: 'Vaniglia bourbon' },
      { img: 'oud', nome: 'Legno di oud' },
      { img: 'ambra-resina', nome: 'Ambra' },
    ],
    racconto: "Una stanza in Oltrarno dopo mezzanotte, il camino quasi spento. Spezie calde, vaniglia bourbon e un fondo di oud che resta sulla pelle fino al mattino.",
    inHome: true,
  },
  {
    id: 'cipresso-di-bolgheri', numero: '10', nome: 'Cipresso di Bolgheri', collezione: 'notte',
    frase: 'Cipresso, strada al tramonto.',
    colore: '#2F3B2E', scuro: true,
    prezzo: 185, prezzo100: 270,
    testa: 'Ginepro, pepe nero', cuore: 'Cipresso, salvia sclarea', fondo: 'Vetiver, muschio di quercia',
    boccetta: 'boccetta-cipresso',
    ingredienti: [
      { img: 'cipresso', nome: 'Cipresso' },
      { img: 'ginepro', nome: 'Bacche di ginepro' },
      { img: 'pepe-nero', nome: 'Pepe nero' },
    ],
    racconto: "Il viale dei cipressi di Bolgheri al tramonto: chilometri di ombra verde e terra asciutta. Resine, ginepro e una scia di pepe nero.",
    inHome: true,
  },
  {
    id: 'cantina-nel-chianti', numero: '11', nome: 'Cantina nel Chianti', collezione: 'notte',
    frase: 'Vino, cuoio e quercia.',
    colore: '#4B1E26', scuro: true,
    prezzo: 195, prezzo100: 285,
    testa: 'Prugna, ribes nero', cuore: 'Rosa scura, cuoio', fondo: 'Legno di quercia, fava tonka',
    boccetta: 'boccetta-chianti',
    ingredienti: [
      { img: 'prugna', nome: 'Prugna' },
      { img: 'ribes-nero', nome: 'Ribes nero' },
      { img: 'quercia-doga', nome: 'Doga di quercia' },
    ],
    racconto: "Una cantina scavata nella collina, tra botti di rovere e bottiglie che invecchiano al buio. Frutti scuri, cuoio morbido e legno di quercia.",
    inHome: false,
  },
  {
    id: 'incenso-a-san-miniato', numero: '12', nome: 'Incenso a San Miniato', collezione: 'notte',
    frase: 'Incenso, campane della sera.',
    colore: '#34313A', scuro: true,
    prezzo: 210, prezzo100: 305,
    testa: 'Elemi, pepe rosa', cuore: 'Incenso, mirra', fondo: 'Labdano, cedro',
    boccetta: 'boccetta-incenso',
    ingredienti: [
      { img: 'incenso', nome: "Grani d'incenso" },
      { img: 'mirra', nome: 'Mirra' },
      { img: 'cedro-legno', nome: 'Legno di cedro' },
    ],
    racconto: "Le campane di San Miniato al Monte al vespro, mentre l'incenso sale tra i marmi bianchi e verdi. Resine antiche, mirra e un fondo di cedro.",
    inHome: true,
  },
];
