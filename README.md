# New TV

Aplicação Astro 6 para Cloudflare Workers. Canais, programação e eventos vêm
exclusivamente de https://api.reidoscanais.st.

## Desenvolvimento e validação

Use Node.js 24.14.1 e pnpm 11.19.0:

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm exec wrangler deploy --dry-run
node --test tests/rei.test.mjs
```

## Integração

- `/channels` consulta `/channels` da API e mostra nomes, logos e EPG.
- `/channels/:id` busca o canal pelo ID da API e incorpora seus `embed_url`.
- `/games` consulta `/sports?status=live`, `upcoming` e `finished`.
- `/live/:id` exibe os players do evento retornado pela API.
- `/search?q=...` usa a busca global `/search` para canais e eventos.

O catálogo fixo e a rota de proxy antigos foram removidos. Os dados são consultados
no servidor durante a navegação, com timeout de 10 segundos, sem chamadas à API
no build. Não é necessário configurar EVENTS_API_URL. Falhas da API são exibidas
na página e IDs inexistentes retornam 404. Programação vencida não aparece como
programação atual. Os players continuam em iframes com bloqueio de pop-ups;
a disponibilidade de vídeo e a compatibilidade dependem do provedor.

## Cloudflare

Use Workers, branch `FilipeGmartins-NewTV-Sports`, comando de build `pnpm build`
e comando de deploy `pnpm exec wrangler deploy`. Não use Cloudflare Pages ou
GitHub Pages para esta aplicação. O workflow do GitHub valida o build e executa
um dry-run do Wrangler sem publicar.
