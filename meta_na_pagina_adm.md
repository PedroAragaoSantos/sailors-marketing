# Meta na Página ADM

## Ideia
Integrar dados do Meta Pixel / Meta Ads diretamente na página de administração (`admin.html`) usando a Meta Graph API / Marketing API.

## O que puxar da Meta:
- **Eventos do Pixel** — PageViews, Leads, eventos customizados
- **Dados de campanhas** — gastos, impressões, cliques, alcance, CPM, CPC
- **Conversões** — quantos leads vieram de anúncios vs orgânico

## Pré-requisitos (configurar no lado da Meta):
1. Criar um App no [developers.facebook.com](https://developers.facebook.com)
2. Gerar um Access Token (de preferência token de longa duração de System User)
3. Vincular o Pixel e a Conta de Anúncios ao App
4. Permissões necessárias: `ads_read`, `read_insights`

## Implementação:
- Colocar o token no `config.js` (já usado pro Pixel ID e senha do admin)
- Adicionar uma seção "Meta Insights" no `admin.html` com cards mostrando dados em tempo real
- Usar `fetch()` para chamar os endpoints da Graph API:
  - `GET https://graph.facebook.com/v18.0/{pixel_id}/stats` (eventos do pixel)
  - `GET https://graph.facebook.com/v18.0/act_{ad_account_id}/insights` (dados de campanhas)

## Perguntas a responder antes de implementar:
1. O Pedro já tem um App criado no Meta for Developers?
2. Quais dados ele quer ver no painel? (Só pixel ou também campanhas de anúncio?)
3. Ele tem acesso à conta de anúncios (Business Manager)?

## Segurança:
- O token NÃO deve ficar exposto no front-end em produção
- Como o `admin.html` é protegido por senha, o risco é menor
- Ideal: colocar no `config.js` para centralizar
