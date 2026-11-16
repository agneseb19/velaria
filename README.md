# Velaria — Atelier di profumi, Firenze

**Ogni profumo è un luogo.**

Sito concept per un marchio di profumi di fantasia: dodici fragranze in tre collezioni (Luce, Giardino, Notte), ognuna ispirata a un luogo italiano.

**Sito online:** https://agneseb19.github.io/velaria/

## Cosa contiene
- **Hero guidata dallo scroll:** la sezione resta ferma mentre i tre profumi principali si alternano. Il colore di sfondo sfuma, gli ingredienti escono ruotando con un effetto di parallasse e i titoli entrano riga per riga.
- **Scaffale orizzontale:** scorrendo, la sezione si blocca e le boccette scorrono di lato.
- **Pagina collezione:** filtri per collezione e una scheda prodotto per ogni profumo, con un link diretto (es. `collezione.html#iris-di-fiesole`).
- **Responsive**, con rispetto della preferenza di sistema "riduci movimento".

## Tecnologie
HTML, CSS e JavaScript senza build. GSAP, ScrollTrigger e Lenis (scroll morbido) arrivano da CDN.

## File
- `index.html`: home
- `collezione.html`: tutti i profumi e la scheda prodotto
- `profumi.js`: i dati della collezione (nomi, note, prezzi, immagini)
- `script.js`: animazioni e comportamento
- `style.css`: stili

Marchio, prodotti e testi sono inventati. Le immagini sono state generate con IA.
