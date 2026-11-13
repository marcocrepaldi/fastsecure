# Fast Secure

Site de captação de leads da Fast Secure Corretora de Seguros.

**Stack:** Next.js 16 (App Router, SSG) · React 19 · TypeScript · Tailwind CSS v4 · lucide-react

## Rodar

```bash
npm install
cp .env.example .env.local   # ajuste os valores
npm run dev                  # http://localhost:3000
npm run build && npm start   # produção
npm run lint
```

## Estrutura

```
src/
  app/
    page.tsx                 # home
    [slug]/page.tsx          # landing page de cada produto (gerada do catálogo)
    [slug]/opengraph-image   # imagem de compartilhamento por produto
    produtos/                # catálogo com busca e filtros
    privacidade/             # política de privacidade (LGPD)
    api/lead/route.ts        # recebe leads → log + webhook opcional + link do WhatsApp
    sitemap.ts robots.ts opengraph-image.tsx not-found.tsx
  components/                # Header, Footer, QuoteForm, CatalogBrowser, WhatsAppFab…
  lib/
    products/                # catálogo: um arquivo por categoria
    site.ts                  # dados da empresa, WhatsApp, números de prova social
    seo.ts                   # metadata e JSON-LD
```

## Como editar

- **Produto novo ou texto de produto:** edite o arquivo da categoria em `src/lib/products/`.
  Cada item vira uma página em `/<slug>`, entra no menu, no rodapé, no catálogo e no sitemap automaticamente.
- **Telefone, e-mail, endereço, números da home:** `src/lib/site.ts`.
- **Cores e fontes:** bloco `@theme` em `src/app/globals.css`.

## Leads

Cada envio de formulário chega em `POST /api/lead` com nome, WhatsApp, e-mail (opcional), empresa,
produto, resposta da pergunta de qualificação, página de origem e parâmetros UTM. O lead é:

1. registrado no log do servidor (`[LEAD] {...}`);
2. enviado para `LEAD_WEBHOOK_URL`, se configurado;
3. devolvido como link do WhatsApp com a mensagem pronta, que abre para o visitante.
