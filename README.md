# Sailors Marketing — Landing Page v2

## Estrutura do Repositório

```
├── producao/          ← Arquivos que vão pro site ao vivo (deploy automático)
├── desenvolvimento/   ← Arquivos para testar alterações antes de publicar
├── .github/workflows/ ← Deploy automático via GitHub Actions + FTP
└── meta_na_pagina_adm.md ← Anotações de features futuras
```

## Como funciona

### 🚀 Deploy Automático
Toda vez que você alterar arquivos dentro da pasta `producao/` e fizer push para o `main`, o GitHub Actions automaticamente envia os arquivos para a Hostinger via FTP.

### 🧪 Testar alterações
1. Faça suas alterações na pasta `desenvolvimento/`
2. Teste localmente com `python3 -m http.server 9000` dentro da pasta
3. Quando estiver satisfeito, copie os arquivos para `producao/`
4. Faça commit e push — o deploy acontece automaticamente

### ⚙️ Configuração dos Secrets (necessário uma vez)
No repositório do GitHub, vá em **Settings → Secrets and variables → Actions** e adicione:
- `FTP_SERVER` → endereço FTP da Hostinger
- `FTP_USERNAME` → seu usuário FTP
- `FTP_PASSWORD` → sua senha FTP
