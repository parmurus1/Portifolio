# Portfólio · Murilo Neves Teixeira

Portfólio dev com fundo escuro, editor de código que se digita sozinho no topo, projetos em cards grandes com prints reais (a borda acende sob o mouse), trajetória com linha que se preenche ao rolar, terminal interativo (`help`, `sudo contratar`, `frango`…) e contato em destaque.

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
index.html          página única: hero, projetos, outros projetos, sobre + terminal, trajetória, stack, contato
css/style.css       visual (tokens no topo: fundo, superfícies, bordas e o acento índigo)
js/main.js          editor que digita, revelações ao rolar, luz do mouse, terminal, copiar e-mail
assets/shots/       prints reais dos projetos (WebP) e o mascote do Frangão
PRODUCT.md          contexto do produto
DESIGN.md           sistema visual
```

## Como editar

- **Projeto em destaque:** copie um `<article class="card">` dentro de `.bento` e troque `--accent` pela cor do projeto. `card--wide` ocupa a linha inteira.
- **Outros projetos:** um `<li>` dentro de `.more`.
- **Trajetória:** um `<li>` em `.timeline` (`is-star` destaca em amarelo).
- **Texto do editor do topo:** array `CODE` em `js/main.js`.
- **Comandos do terminal:** objeto `CMDS` em `js/main.js`.
- **E-mail:** constante `EMAIL` em `js/main.js` e os links `mailto:` em `index.html`.
