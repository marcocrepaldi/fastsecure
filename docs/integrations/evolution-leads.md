# Registro de cotações e aviso pela Evolution

O site envia o pedido a um webhook autenticado do n8n. O n8n grava o pedido no PostgreSQL, confirma o recebimento
ao site e envia um aviso ao WhatsApp da equipe. O cliente conclui o formulário na página.

O PostgreSQL da Fast Secure roda no serviço `fastsecure-leads-postgres` na rede interna do n8n, com volume
persistente e sem porta publicada. A credencial do n8n usa o usuário `fastsecure_leads_writer` na base
`fastsecure_leads`, com permissão de leitura, inserção e atualização somente na tabela de cotações.

## Configuração

1. Em uma base PostgreSQL autorizada para os pedidos da Fast Secure, aplique [fastsecure-leads.sql](fastsecure-leads.sql).
   Configure no n8n uma credencial com acesso de leitura, inserção e atualização na tabela de leads.
2. Importe [fastsecure-leads-evolution.n8n.json](fastsecure-leads-evolution.n8n.json) no n8n e selecione essa credencial
   em **Registrar pedido** e **Registrar envio**. O fluxo vem desativado, com nomes de referência para as credenciais.
3. Em **Receber pedido**, configure a credencial Header Auth com nome `Authorization` e valor `Bearer <token do webhook>`.
   Em **Enviar pela Evolution**, selecione uma credencial Header Auth com nome `apikey` e a chave da instância.
4. O nó **Enviar pela Evolution** já aponta para **Instancia Principal FastSecure** em `evo.omnitheus.com.br`.
   O destino em **Preparar aviso** é `5511927845928`, o número da própria instância. O teste de ativação
   deve conferir se o aviso apareceu na conversa com o próprio número e se houve uma notificação no aparelho.
5. Teste com dados fictícios e um número de teste autorizado. Depois de publicar o fluxo, configure
   `LEAD_WEBHOOK_URL` com a URL de produção do webhook e `LEAD_WEBHOOK_TOKEN` com o token, sem o prefixo
   `Bearer`, no ambiente servidor da Vercel. Restrinja o acesso aos pedidos e ao histórico de execuções no n8n.

A resposta autenticada é HTTP 202 com `{ "accepted": true, "leadId": "<id recebido>" }`.
Ela confirma a gravação no banco. O identificador é a chave primária da tabela e uma repetição com o mesmo
identificador recebe a mesma confirmação sem iniciar outro aviso.

As solicitações da página de Seguro Auto chegam com `source = auto-quote`. O aviso inclui o contato,
o veículo, o CEP de pernoite, o uso, a idade do principal condutor e a indicação de seguro novo ou renovação.
A data de nascimento deve ser consultada no registro interno pelo protocolo do pedido.

```sql
SELECT payload->'autoQuote' AS dados_da_cotacao
FROM fastsecure_quote_leads
WHERE lead_id = $1::uuid;
```

## Reenvio do aviso

O pedido permanece na tabela quando a Evolution está desconectada. A coluna `notification_submitted_at` indica
quando a Evolution aceitou o aviso, e `evolution_message_id` guarda o ID retornado pelo provedor.

Quando **Enviar pela Evolution** falhar, corrija a conexão e use **Retry execution** na execução com falha no n8n.
Antes de repetir uma execução que expirou, confira se a mensagem já chegou, usando o protocolo do pedido.
Quando a falha ocorrer apenas em **Registrar envio**, o retry retoma a atualização do registro.

Para recuperar pedidos pendentes, consulte os IDs e as datas abaixo e confira a execução correspondente no n8n.

```sql
SELECT lead_id, received_at
FROM fastsecure_quote_leads
WHERE notification_submitted_at IS NULL
ORDER BY received_at;
```

Referências oficiais do [webhook n8n](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
e da [API de envio da Evolution](https://skmtc.dev/evolution-foundation/apis/evolution-api-3/docs/message/sendText/%3Ainstance/post).
