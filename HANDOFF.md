# Fast Secure — Handoff de Modernização & SEO

> Documento de passagem. Resume tudo que foi implementado nesta rodada (UI moderna,
> navbar/footer, WhatsApp, formulários de lead e SEO profissional) e o que ficou pendente.
> Stack: **Next.js 15 (App Router) + React 18 + Bootstrap 5 + TypeScript**.

Última atualização: 2026-06-11

---

## 🚀 Como rodar

```bash
npm run dev      # ambiente de desenvolvimento (http://localhost:3000)
npm run build    # build de produção (valida as 51 páginas/rotas estáticas)
npm run start    # serve o build
npx tsc --noEmit # type-check
```

---

## ✅ O que foi criado / alterado

### 1. Modernização visual (direção "Premium equilibrado")
Inspirado em referência moderna (awwwards/Hubtown), mas adaptado para conversão B2B —
**sem WebGL/GSAP**, para preservar performance e SEO.

- **`src/components/ScrollFX.tsx`** *(novo)* — camada de micro-interações sem libs (~1KB):
  scroll-reveal (`[data-reveal]`), count-up (`[data-count]`) e toggle de scroll da navbar.
  Re-escaneia o DOM a cada troca de rota (`usePathname`). Respeita `prefers-reduced-motion`.
  Montado uma vez no layout → vale em todas as páginas.
- **`src/app/globals.css`** — nova "MODERN LAYER": tipografia display, `text-gradient`,
  badges com dot pulsante, bento cards, seção navy de destaque, glow, hovers ricos,
  navbar glassmorphism, footer navy e widget de WhatsApp.
- **`src/app/page.tsx`** (home) — hero display, métricas com count-up, pilares em bento grid,
  diferenciais, "como funciona" e CTA em seção navy. Todas com scroll-reveal.
- **`src/components/HeroSection.tsx`** — hero das páginas de produto modernizado
  (título display, glow, imagem arredondada, reveal). Mesma assinatura de props → 0 quebra.
- **`src/components/BenefitsGrid.tsx`** — bento grid com índice numerado e reveal escalonado.

### 2. Navbar & Footer
- **Navbar** (`src/app/layout.tsx` + CSS + ScrollFX): glassmorphism com `backdrop-filter`,
  classe `is-scrolled` ao rolar (sombra/opacidade), links com sublinhado animado.
- **Footer**: tema **navy premium** com glow, **links reais** para as rotas de produto,
  badges de confiança (SUSEP & ANS, LGPD, 15 seguradoras).

### 3. WhatsApp
- **`src/components/WhatsAppButton.tsx`** *(novo)* — widget flutuante (FAB verde + anel pulsante)
  com **popover estilo chat** ("Online agora", balões, CTA "Iniciar conversa") e dica
  discreta após 4s (uma vez por sessão). Montado no layout → todas as páginas.
- Número lido de `WHATSAPP_NUMBER` (server-side) e passado ao componente.

### 4. Formulários de Lead (API interna + WhatsApp)
- **`src/app/api/lead/route.ts`** *(novo)* — valida nome/e-mail/telefone, registra o lead no
  log do servidor (ponto de integração comentado) e retorna a `whatsappUrl` com a mensagem
  pré-preenchida.
- **`src/components/LeadForm.tsx`** — formulário das páginas de produto agora **envia de verdade**
  (loading/erro/sucesso, abre o WhatsApp).
- **`src/components/LeadFormB2B.tsx`** *(novo)* — formulário corporativo da home (Empresa,
  Nº de colaboradores, Interesse) conectado à mesma API. Substituiu o `<form>` estático.

### 5. SEO profissional
- **`src/lib/seo.ts`** *(novo)* — config central `SITE` + helper `buildMetadata({title, description, path})`
  (canonical + Open Graph + Twitter por página). As 43 páginas de produto foram migradas para usá-lo.
- **`src/app/layout.tsx`** — `metadataBase`, title template `%s | Fast Secure`, keywords, robots,
  e **JSON-LD** `InsuranceAgency` + `WebSite`.
- **`src/app/page.tsx`** — metadata de marketing da home (título branded + prova social).
- **`src/components/FAQ.tsx`** — **JSON-LD `FAQPage`** (rich snippet) gerado das perguntas.
- **`src/components/ProductSchema.tsx`** *(novo)* — **JSON-LD `Service`** por produto.
  Injetado via `HeroSection` (41 páginas) + manualmente em `consorcios` e `investimentos`.
- **`src/app/opengraph-image.tsx`** *(novo)* — **imagem OG 1200×630 dinâmica** (gerada por código),
  usada como `og:image` e `twitter:image` em todas as páginas.
- **`src/app/sitemap.ts`** *(novo)* — gera `/sitemap.xml` varrendo `src/app` (44 URLs).
- **`src/app/robots.ts`** *(novo)* — gera `/robots.txt` (libera tudo, bloqueia `/api/`, aponta sitemap).

#### Estado do SEO
| Recurso | Status |
|---|---|
| Title/description únicos | ✅ 44 páginas |
| Canonical | ✅ todas |
| Open Graph + Twitter Card | ✅ todas |
| Imagem OG dinâmica branded | ✅ todas |
| JSON-LD Organization/WebSite | ✅ global |
| JSON-LD Service (por produto) | ✅ 43 produtos |
| JSON-LD FAQPage | ✅ onde há FAQ |
| sitemap.xml / robots.txt | ✅ automáticos |

---

## ⚠️ Pendências / Ações necessárias

### 🔴 Crítico (configuração) — `.env.local`
| Variável | Valor atual | Ação |
|---|---|---|
| `WHATSAPP_NUMBER` | `5511985266582` | Confirmar se é o número real que recebe leads. |
| `NEXT_PUBLIC_SITE_URL` | `https://www.fastsecure.com.br` | **Trocar pelo domínio real** — canonical, OG e sitemap derivam daqui. |

> Atenção: o `.env.local` **não vai para o git** — replicar as variáveis no ambiente de produção
> (Vercel/host) na hora do deploy.

### 🟠 Lead — ainda não há persistência
- O lead hoje só é **logado** no servidor (`console.log('[LEAD]', ...)` em `src/app/api/lead/route.ts`).
- Plugar destino definitivo: banco de dados, e-mail (Resend/SMTP) ou CRM (RD Station/HubSpot).
  O ponto de integração já está marcado com comentário no arquivo.
- Sugestão de hardening: honeypot/anti-spam e máscara no campo de telefone.

### 🟡 SEO — melhorias opcionais (não bloqueiam)
- [ ] **BreadcrumbList JSON-LD** nas páginas de produto (o breadcrumb visual já existe).
- [ ] **Google Search Console / GA4** — adicionar verification tag (campo previsto para o helper).
- [ ] Reescrever ~10 descrições curtas/genéricas (ex.: Capitalização) com foco em palavra-chave.
- [ ] OG image **por produto** (hoje todas usam o card branded padrão).
- [ ] Conteúdo/Blog para buscas de topo de funil.

### 🟢 UI — polimento opcional
- [ ] Mensagem padrão do widget de WhatsApp **personalizada por página** (ex.: já abrir falando
      de "Seguro Auto" na página de seguro auto).
- [ ] Propagar tokens visuais (display type, reveal) para as páginas que usam markup inline
      (`consorcios`, `investimentos`) — hoje usam estilo antigo no corpo.

---

## 🗂️ Arquivos-chave (mapa rápido)

```
src/
├── app/
│   ├── layout.tsx            # navbar, footer, metadata global, JSON-LD, ScrollFX, WhatsApp
│   ├── page.tsx              # home modernizada + metadata marketing
│   ├── opengraph-image.tsx   # imagem OG dinâmica 1200x630
│   ├── sitemap.ts            # /sitemap.xml
│   ├── robots.ts             # /robots.txt
│   ├── api/lead/route.ts     # endpoint de lead (valida + WhatsApp)
│   └── <44 rotas>/page.tsx   # páginas de produto (metadata via buildMetadata)
├── components/
│   ├── ScrollFX.tsx          # micro-interações (reveal/count-up/navbar)
│   ├── HeroSection.tsx       # hero produto + ProductSchema
│   ├── BenefitsGrid.tsx      # bento grid
│   ├── FAQ.tsx               # accordion + JSON-LD FAQPage
│   ├── LeadForm.tsx          # form produto (funcional)
│   ├── LeadFormB2B.tsx       # form corporativo da home
│   ├── WhatsAppButton.tsx    # widget flutuante
│   └── ProductSchema.tsx     # JSON-LD Service
└── lib/
    └── seo.ts                # SITE + buildMetadata
```

> Nota: o projeto **não é um repositório git** (nenhum commit foi feito). Considerar
> `git init` + primeiro commit antes de seguir.
