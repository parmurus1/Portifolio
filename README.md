# Portfólio · Murilo Neves Teixeira

O site é um `git log --graph` que se imprime enquanto você rola. Cada projeto é uma branch que sai da `main`, recebe commits (as features de verdade) e volta. Tem também um grafo vivo no topo (clique nele para criar uma branch), um terminal que aceita comandos (`help`, `git status`, `sudo contratar`, `frango`…) e prints reais dos projetos.

É um site estático com HTML, CSS e JavaScript puros. Não tem build nem dependências.

## Rodar localmente

```bash
python3 -m http.server 8000
```

Depois abra http://localhost:8000.

## Publicar

Funciona como está na Vercel, no GitHub Pages ou na Netlify. Na Vercel: **Add New → Project**, escolha este repositório e deixe o Framework Preset como **Other**, sem comando de build.

## Estrutura

```
index.html          página única: hero, projetos, mais no log, stack, sobre + terminal + trajetória, contato
css/style.css       visual (tokens no topo: cobalto, tinta, papel e as cores das branches)
js/hero.js          grafo generativo do topo, em canvas
js/main.js          espinha do grafo que acompanha a rolagem, terminal, contato, prévias
assets/shots/       prints reais dos projetos (WebP) e o mascote do Frangão
PRODUCT.md          contexto do produto
DESIGN.md           sistema visual
```

## Como editar

- **Projeto em destaque:** copie um `<article class="proj">` em `index.html`, troque `--lane` pela cor da branch e escreva cada feature como um `<li data-node="branch">`. O grafo desenha a branch sozinho.
- **Projeto na lista compacta:** um `<li data-node="main">` dentro de `.oneline`; com `data-preview` ele mostra o print ao passar o mouse.
- **Trajetória:** um `<li data-node="main">` em `.journey__list`.
- **Comandos do terminal:** objeto `CMDS` em `js/main.js`.
- **E-mail:** constante `EMAIL` em `js/main.js` e os links `mailto:` em `index.html`.
