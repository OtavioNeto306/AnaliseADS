# Deploy na Vercel - Análise ADS

## Configuração das Variáveis de Ambiente

Este projeto utiliza a API do Google Gemini e requer configuração de variáveis de ambiente para funcionar corretamente.

### 1. Desenvolvimento Local

1. Copie o arquivo `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edite o arquivo `.env.local` e adicione sua chave da API do Gemini:
   ```
   GEMINI_API_KEY=sua_chave_da_api_gemini_aqui
   ```

3. Para obter uma chave da API do Gemini:
   - Acesse: https://aistudio.google.com/app/apikey
   - Faça login com sua conta Google
   - Crie uma nova chave de API
   - Copie a chave gerada

### 2. Deploy na Vercel

#### Passo 1: Conectar o Repositório
1. Acesse [vercel.com](https://vercel.com)
2. Faça login e clique em "New Project"
3. Conecte seu repositório GitHub/GitLab/Bitbucket

#### Passo 2: Configurar Variáveis de Ambiente
1. No dashboard do projeto na Vercel, vá em **Settings**
2. Clique em **Environment Variables**
3. Adicione a seguinte variável:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Sua chave da API do Gemini
   - **Environments**: Selecione todos (Production, Preview, Development)

#### Passo 3: Deploy
1. Clique em **Deploy** ou faça push para o branch principal
2. A Vercel automaticamente detectará que é um projeto Vite e configurará o build

### 3. Verificação

Após o deploy, verifique se:
- [ ] A aplicação carrega sem erros
- [ ] A funcionalidade de análise de criativos funciona
- [ ] Não há erros relacionados à API key no console

### 4. Troubleshooting

**Erro: "GEMINI_API_KEY não está configurada"**
- Verifique se a variável foi adicionada corretamente na Vercel
- Certifique-se de que está disponível para o ambiente correto
- Refaça o deploy após adicionar a variável

**Erro: "A sua Gemini API Key é inválida ou expirou"**
- Verifique se a chave da API está correta
- Confirme se a API do Gemini está habilitada em sua conta Google Cloud
- Gere uma nova chave se necessário

### 5. Segurança

✅ **Implementado:**
- Chave da API removida do código fonte
- Variáveis de ambiente configuradas corretamente
- Arquivos `.env*` adicionados ao `.gitignore`
- Validação de presença da chave da API

⚠️ **Importante:**
- Nunca commite arquivos `.env` com chaves reais
- Variáveis sem prefixo `VITE_` são acessíveis no servidor (Node.js/Vercel)
- Mantenha suas chaves de API seguras e não as compartilhe