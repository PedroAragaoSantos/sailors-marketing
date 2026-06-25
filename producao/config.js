// CONFIGURAÇÕES GERAIS DA LANDING PAGE (PRODUÇÃO)
const SAILORS_CONFIG = {
    // 1. Integrações de Envio de Leads
    webhookUrl: "https://script.google.com/macros/s/AKfycbzNyNND6wpSr28AJ03uKUGkozx7A7QZLNKC7Kx1x-JDdVqCNNybH9P3duFez3HX6och/exec",         // Google Sheets webhook para salvar leads automaticamente
    discordWebhookUrl: "",  // Cole a URL do webhook do Discord se quiser notificações automáticas no canal

    // 2. Rastreamento de Tráfego Pago
    metaPixelId: "1032628654737611",        // Cole o ID do seu Meta Pixel (Facebook Ads) para registrar conversões

    // 3. Segurança do Painel Administrativo
    adminPassword: "sailors2026" // Senha para liberar o acesso ao Painel (/admin.html)
};
