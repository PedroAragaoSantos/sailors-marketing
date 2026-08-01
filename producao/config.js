// CONFIGURAÇÕES GERAIS DA LANDING PAGE (PRODUÇÃO)
const SAILORS_CONFIG = {
    // 1. Banco de Dados (Supabase)
    supabaseUrl: "https://tzrdywmavpudylospimm.supabase.co",
    supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6cmR5d21hdnB1ZHlsb3NwaW1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1ODUwNDIsImV4cCI6MjEwMTE2MTA0Mn0.LguXdHajLC3syxJqyynlrMSao5hH8SvLHc3Go6pAKac",

    // 2. Notificações Discord
    discordWebhookUrl: "",  // Cole a URL do webhook do Discord se quiser notificações automáticas no canal

    // 3. Rastreamento de Tráfego Pago
    metaPixelId: "1032628654737611",        // Cole o ID do seu Meta Pixel (Facebook Ads) para registrar conversões

    // 4. Segurança do Painel Administrativo
    adminPassword: "sailors2026" // Senha para liberar o acesso ao Painel (/admin.html)
};
