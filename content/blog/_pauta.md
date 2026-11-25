# Pauta do blog Fast Secure

Arquivo interno: começa com "_" e não aparece no site.

## Como usar

- Peça ao Claude: "publicar a próxima matéria do blog" (ou "publicar as próximas 5").
- O Claude pega o próximo tema com status `pendente`, escreve a matéria em `content/blog/<endereço>.md`
  com a data prevista, valida o site e muda o status aqui para `rascunho`.
- Depois da revisão da corretora, o status vira `revisado`; com o commit e o push, `publicado`.
- Matéria com data futura entra no ar sozinha no dia. Para mudar a ordem, edite as datas.
- Status: `pendente` → `rascunho` → `revisado` → `publicado`.

## Temas

| Data | Título | Palavra-chave principal | Produto | Categoria | Status | Arquivo |
|---|---|---|---|---|---|---|
| 2026-11-25 | O que muda o preço do seguro auto e como pagar menos | preço do seguro auto | seguro-auto | veiculos | publicado | o-que-muda-o-preco-do-seguro-auto |
| 2026-11-25 | Plano de saúde empresarial com CNPJ ou MEI: como funciona | plano de saúde empresarial MEI | plano-de-saude-empresarial | saude | publicado | plano-de-saude-empresarial-cnpj-mei |
| 2026-11-25 | Seguro de vida: como calcular o capital segurado ideal | quanto contratar de seguro de vida | seguro-de-vida | vida | publicado | como-calcular-capital-seguro-de-vida |
| 2026-11-26 | Seguro para motorista de aplicativo: o que precisa saber | seguro para motorista de aplicativo | seguro-auto | veiculos | pendente | |
| 2026-11-27 | Plano de saúde por adesão: quem pode contratar e como funciona | plano de saúde por adesão | plano-por-adesao | saude | pendente | |
| 2026-11-28 | Seguro residencial: o que cobre e por que custa menos do que parece | seguro residencial o que cobre | seguro-residencial | casa | pendente | |
| 2026-11-29 | Seguro viagem para a Europa: quando é obrigatório e o que precisa cobrir | seguro viagem Europa obrigatório | seguro-viagem | vida | pendente | |
| 2026-11-30 | Consórcio ou financiamento de carro: qual vale mais a pena | consórcio ou financiamento de carro | consorcio-auto | financeiro | pendente | |
| 2026-12-01 | Seguro de moto: como funciona a cobertura de roubo e furto | seguro de moto roubo e furto | seguro-motos | veiculos | pendente | |
| 2026-12-02 | Plano odontológico empresarial: como oferecer para a equipe | plano odontológico empresarial | plano-odontologico | saude | pendente | |
| 2026-12-03 | Seguro fiança, caução ou fiador: qual escolher no aluguel | seguro fiança aluguel | seguro-fianca | casa | pendente | |
| 2026-12-04 | Seguro de vida em grupo: quando a empresa é obrigada a oferecer | seguro de vida em grupo obrigatório | seguro-vida-em-grupo | vida | pendente | |
| 2026-12-05 | Seguro empresarial para pequenas empresas: o que proteger primeiro | seguro empresarial pequena empresa | seguro-empresarial | empresa | pendente | |
| 2026-12-06 | Seguro de celular vale a pena? Veja quando compensa | seguro de celular vale a pena | seguro-celular-notebook | casa | pendente | |
| 2026-12-07 | PGBL ou VGBL: qual previdência escolher | PGBL ou VGBL | previdencia-privada | financeiro | pendente | |
| 2026-12-08 | Carência do plano de saúde: prazos máximos e como reduzir | carência plano de saúde | plano-de-saude | saude | pendente | |
| 2026-12-09 | Seguro D&O: o que é e por que diretores precisam dele | seguro D&O o que é | seguro-rc-do | rc | pendente | |
| 2026-12-10 | Seguro de responsabilidade civil profissional: quem precisa | seguro RC profissional | seguro-rc-profissional | rc | pendente | |
| 2026-12-11 | Seguro de frota: como reduzir o custo dos veículos da empresa | seguro de frota | seguro-frota | veiculos | pendente | |
| 2026-12-12 | Seguro contra ataque hacker: como funciona o seguro cyber | seguro cyber para empresas | seguro-riscos-ciberneticos | empresa | pendente | |
| 2026-12-13 | Seguro pet: o que cobre e o que fica de fora | seguro pet o que cobre | seguro-pet | casa | pendente | |
| 2026-12-14 | Autônomo ficou sem trabalhar? Como funciona o seguro DIT | seguro DIT autônomo | seguro-dit | vida | pendente | |
| 2026-12-15 | Seguro garantia para licitação: como funciona | seguro garantia licitação | seguro-garantia | rc | pendente | |
| 2026-12-16 | Seguro condomínio é obrigatório? O que diz a lei | seguro condomínio obrigatório | seguro-condominio | casa | pendente | |
| 2026-12-17 | Consórcio de imóvel: como funcionam lance e contemplação | consórcio de imóvel lance | consorcio-imovel | financeiro | pendente | |
| 2026-12-18 | Seguro bike: proteção para bicicletas e e-bikes | seguro bike | seguro-bike | veiculos | pendente | |
| 2026-12-19 | NR-1 e riscos psicossociais: o que muda para as empresas | NR-1 riscos psicossociais | gestao-riscos-psicossociais | saude | pendente | |
| 2026-12-20 | Viagem de fim de ano: o que conferir no seguro viagem | seguro viagem fim de ano | seguro-viagem | vida | pendente | |
| 2026-12-21 | Seguro de caminhão: coberturas para quem vive da estrada | seguro de caminhão | seguro-caminhoes | veiculos | pendente | |
| 2026-12-22 | Seguro garantia judicial: como substituir o depósito em juízo | seguro garantia judicial | seguro-garantia-judicial | rc | pendente | |
| 2026-12-23 | Seguro para doenças graves: como funciona o pagamento no diagnóstico | seguro doenças graves | seguro-doencas-graves | vida | pendente | |
| 2026-12-24 | Casa vazia nas férias: como o seguro residencial protege | seguro residencial viagem | seguro-residencial | casa | pendente | |
| 2026-12-25 | Benefícios corporativos que ajudam a reter talentos | benefícios corporativos | beneficios-corporativos | saude | pendente | |

## Regras de redação

- Público: pessoa física e pequenas/médias empresas em São Paulo e no Brasil; linguagem simples, sem jargão sem explicação.
- 700 a 1.200 palavras, abertura respondendo a dúvida principal, subtítulos `##` com a palavra-chave e variações.
- Sempre linkar o produto da linha e de 1 a 2 produtos relacionados; terminar com chamada para a cotação.
- Seção `## Perguntas frequentes` com 3 perguntas reais de busca.
- Não inventar preço, percentual de desconto ou estatística. Citar lei ou norma (ANS, SUSEP, Código Civil) só quando houver certeza.
- Não prometer aprovação, preço ou cobertura: condições dependem da seguradora/operadora.
