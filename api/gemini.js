// Utiliza o global fetch nativo do Node.js 18+ fornecido pela Vercel

module.exports = async (req, res) => {
  // Garantir que é um método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method Not Allowed. Use POST.' } });
  }

  try {
    const model = req.query.model || 'gemini-2.5-flash';
    
    // Resolver qual chave de API usar
    const clientKey = req.headers['x-goog-api-key'];
    const serverKey = process.env.GEMINI_API_KEY;
    const apiKey = clientKey || serverKey;

    if (!apiKey) {
      return res.status(400).json({ 
        error: { 
          message: 'Chave de API do Gemini não configurada. Configure o GEMINI_API_KEY nas variáveis de ambiente da Vercel ou insira uma chave própria nas configurações do app.' 
        } 
      });
    }

    // Se NÃO for usada uma chave própria do cliente (BYOK), exigir autenticação com o Google
    if (!clientKey) {
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
          error: { message: 'Acesso negado. Para utilizar a IA padrão compartilhada, faça login com o Google no painel.' } 
        });
      }

      const idToken = authHeader.split(' ')[1];
      
      // Validar o token de identidade diretamente com o endpoint de verificação do Google
      const verifyResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
      if (!verifyResponse.ok) {
        return res.status(401).json({ 
          error: { message: 'Sessão do Google expirada ou inválida. Por favor, faça login novamente.' } 
        });
      }

      const tokenInfo = await verifyResponse.json();
      
      // Opcional: registrar logs de uso por e-mail para auditoria de segurança e prevenção de abusos
      console.log(`[Segurança] Requisição de IA feita pelo e-mail: ${tokenInfo.email}`);
    }

    // Montar URL oficial do Gemini
    const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    // Repassar a chamada para a API oficial do Google
    const response = await fetch(googleUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    // Repassar o status HTTP e a resposta do Google de volta ao cliente
    return res.status(response.status).json(data);

  } catch (error) {
    console.error('Erro no Proxy do Gemini:', error);
    return res.status(500).json({ error: { message: 'Erro interno no servidor do proxy: ' + error.message } });
  }
};
