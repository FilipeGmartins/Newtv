# New TV

## Build e Cloudflare

Use Node.js 24.14.1 (definido em `.node-version`) e pnpm 11.19.0
(definido em `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm exec wrangler deploy --dry-run
```

O workflow `.github/workflows/build.yml` executa essas verificações em pushes,
pull requests e execuções manuais. O dry-run não publica o site nem exige
credenciais da Cloudflare.

O projeto usa Astro 6 com `@astrojs/cloudflare` 13 e deve ser publicado no
**Cloudflare Workers**. O adaptador não gera um site compatível com GitHub Pages
ou Cloudflare Pages, pois existem rotas executadas no servidor.

No Workers Builds, selecione a branch `FilipeGmartins-NewTV-Sports`, use
`pnpm build` como comando de build e `pnpm exec wrangler deploy` como comando
de deploy. Se o projeto ainda estiver no Pages, será necessário configurar
um Worker para esse repositório. Em GitHub Settings → Pages, desative a
publicação antiga por branch para evitar execuções automáticas do Jekyll.

Configure `EVENTS_API_URL` no ambiente de build para as páginas de jogos:
essa variável é declarada como pública de servidor em `astro:env` e é
incorporada ao build. Ela não é necessária para compilar, mas é necessária
para consultar eventos em execução.

Referência: [adaptador Cloudflare do Astro](https://docs.astro.build/en/guides/integrations-guide/cloudflare/).

## Referência do template original

```sh
pnpm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
