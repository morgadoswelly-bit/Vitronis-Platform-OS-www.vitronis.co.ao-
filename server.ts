import express from 'express';
import path from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { createServer as createViteServer } from 'vite';
import { INITIAL_APP_MANIFESTS, DEMO_USERS, getUniversalConfig } from './src/data/mockDatabase.js';
import { VitronisUserPayload, VitronisAppManifest } from './src/types.js';

const JWT_SECRET = process.env.VITRONIS_JWT_SECRET || 'vitronis_vias_10_super_secret_key_2026';
const PORT = 3000;

// Mutable store in memory for live updates during session
let appManifestsList = [...INITIAL_APP_MANIFESTS];
let usersList = [...DEMO_USERS];

async function startServer() {
  const app = express();

  // Enable CORS so subdomains (Render, GitHub apps, subdomains) can execute auth API calls
  app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Vitronis-App-ID', 'X-Vitronis-Client-Secret']
  }));

  app.use(express.json());

  // Log API requests
  app.use('/api', (req, res, next) => {
    console.log(`[VIAS 1.0 Server] ${req.method} ${req.originalUrl}`);
    next();
  });

  // --------------------------------------------------------
  // API ROUTES (VIAS 1.0 Identity Standard Specification)
  // --------------------------------------------------------

  // 1. Health check
  app.get('/api/v1/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'accounts.vitronis.co.ao (VIAS 1.0 SSO IdP)',
      version: 'VIAS-1.0',
      timestamp: new Date().toISOString(),
      activeApps: appManifestsList.length,
      activeUsers: usersList.length
    });
  });

  // 2. Vitronis App Manifests List
  app.get('/api/v1/apps/manifests', (req, res) => {
    res.json({
      success: true,
      standard: 'VIAS 1.0 App Manifest',
      manifests: appManifestsList
    });
  });

  // Register new app manifest dynamically
  app.post('/api/v1/apps/manifests', (req, res) => {
    const newManifest: VitronisAppManifest = req.body;
    if (!newManifest.app || !newManifest.name || !newManifest.url) {
      res.status(400).json({ error: 'Campos app, name, e url são obrigatórios.' });
      return;
    }

    const existingIndex = appManifestsList.findIndex(m => m.app === newManifest.app);
    if (existingIndex >= 0) {
      appManifestsList[existingIndex] = { ...appManifestsList[existingIndex], ...newManifest };
    } else {
      appManifestsList.push({
        app: newManifest.app,
        name: newManifest.name,
        url: newManifest.url,
        callbackUrl: newManifest.callbackUrl || `${newManifest.url}/auth/callback`,
        requiresAuthentication: newManifest.requiresAuthentication ?? true,
        minimumRole: newManifest.minimumRole || 'user',
        description: newManifest.description || 'Aplicação integrada ao Ecossistema Vitronis',
        category: newManifest.category || 'servicos',
        icon: newManifest.icon || 'AppWindow',
        benefits: newManifest.benefits || ['Autenticação Única Vitronis SSO', 'Perfis Unificados'],
        status: newManifest.status || 'active'
      });
    }

    res.json({
      success: true,
      message: `Manifesto da aplicação ${newManifest.name} registrado com sucesso em VIAS 1.0.`,
      manifest: newManifest
    });
  });

  // 3. Central Login Endpoint
  app.post('/api/v1/auth/login', (req, res) => {
    const { email, password, app: requestingApp, returnUrl } = req.body;

    if (!email) {
      res.status(400).json({ success: false, error: 'Email é obrigatório.' });
      return;
    }

    // Find user in store or create quick demo profile if matches
    let user = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      // Auto-create realistic demo profile if testing new email
      const nameParts = email.split('@')[0].replace('.', ' ');
      const formattedName = nameParts.charAt(0).toUpperCase() + nameParts.slice(1);
      user = {
        uid: `vit_usr_${Date.now().toString(36)}`,
        email: email,
        name: formattedName || 'Usuário Vitronis',
        role: 'candidate',
        permissions: ['minint:simulados_basic', 'jobexpress:apply', 'kwanzamovel:pay'],
        company: 'Independente',
        tenant: 'vitronis_users',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        phone: '+244 923 000 000',
        wallet: {
          balanceKz: 50000,
          currency: 'AOA (Kz)',
          accountNumber: `AO06.0040.0000.${Math.floor(1000 + Math.random() * 9000)}.${Math.floor(1000 + Math.random() * 9000)}.1`
        },
        certificates: [
          {
            id: `cert_${Date.now()}`,
            title: 'Membro Oficial do Ecossistema Vitronis',
            issuerApp: 'JobExpress Angola / Vitronis',
            issuedAt: new Date().toISOString().split('T')[0],
            code: `VIT-ECO-${Math.floor(10000 + Math.random() * 90000)}`
          }
        ],
        history: [
          {
            id: `hist_${Date.now()}`,
            app: requestingApp || 'JobExpress',
            action: 'Login Unificado Realizado',
            timestamp: new Date().toLocaleString('pt-AO'),
            details: 'Acesso autenticado via accounts.vitronis.co.ao'
          }
        ]
      };
      usersList.push(user);
    }

    // Sign JWT Token with standard claims according to VIS-1.0
    const tokenPayload = {
      uid: user.uid,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: user.permissions,
      company: user.company,
      tenant: user.tenant,
      avatar: user.avatar,
      certificates: user.certificates,
      wallet: user.wallet,
      iss: 'https://accounts.vitronis.co.ao',
      aud: requestingApp || 'vitronis-ecosystem'
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' });

    const manifest = appManifestsList.find(m => m.app === requestingApp) || appManifestsList[0];
    const callbackTarget = returnUrl || manifest.callbackUrl;

    res.json({
      success: true,
      access_token: token,
      token_type: 'Bearer',
      expires_in: 604800, // 7 days
      user,
      app_manifest: manifest,
      redirect_to: callbackTarget ? `${callbackTarget}?token=${token}&returnUrl=${encodeURIComponent(returnUrl || '')}` : null
    });
  });

  // 4. Central Sign-Up Endpoint with Unified Benefits
  app.post('/api/v1/auth/signup', (req, res) => {
    const { name, email, password, phone, role, requestingApp, returnUrl } = req.body;

    if (!email || !name) {
      res.status(400).json({ success: false, error: 'Nome e Email são obrigatórios.' });
      return;
    }

    const existing = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      res.status(400).json({ success: false, error: 'Este e-mail já está cadastrado no ecossistema Vitronis. Por favor, faça login.' });
      return;
    }

    const newUser: VitronisUserPayload = {
      uid: `vit_usr_${Date.now().toString(36)}`,
      email,
      name,
      phone: phone || '+244 900 000 000',
      role: role || 'candidate',
      permissions: [
        'minint:simulados_full',
        'jobexpress:apply',
        'kwanzamovel:pay',
        'justica360:read'
      ],
      company: 'Independente',
      tenant: 'vitronis_network',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      wallet: {
        balanceKz: 10000, // Bónus de boas-vindas na Carteira KwanzaMóvel!
        currency: 'AOA (Kz)',
        accountNumber: `AO06.0040.0000.${Math.floor(1000 + Math.random() * 9000)}.${Math.floor(1000 + Math.random() * 9000)}.1`
      },
      certificates: [
        {
          id: `cert_welcome_${Date.now()}`,
          title: 'Conta Única Ecossistema Vitronis Ativada',
          issuerApp: 'Vitronis Identity Standard',
          issuedAt: new Date().toISOString().split('T')[0],
          code: `VIT-SSO-${Math.floor(10000 + Math.random() * 90000)}`
        }
      ],
      history: [
        {
          id: `hist_signup_${Date.now()}`,
          app: requestingApp || 'JobExpress SSO',
          action: 'Cadastro Unificado no Ecossistema Vitronis',
          timestamp: new Date().toLocaleString('pt-AO'),
          details: 'Conta criada com acesso a MININT, JobExpress e KwanzaMóvel'
        }
      ]
    };

    usersList.push(newUser);

    const tokenPayload = {
      uid: newUser.uid,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      permissions: newUser.permissions,
      company: newUser.company,
      tenant: newUser.tenant,
      avatar: newUser.avatar,
      certificates: newUser.certificates,
      wallet: newUser.wallet,
      iss: 'https://accounts.vitronis.co.ao',
      aud: requestingApp || 'vitronis-ecosystem'
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' });
    const manifest = appManifestsList.find(m => m.app === requestingApp) || appManifestsList[0];

    res.json({
      success: true,
      message: 'Conta única Vitronis criada com sucesso!',
      access_token: token,
      token_type: 'Bearer',
      expires_in: 604800,
      user: newUser,
      app_manifest: manifest,
      redirect_to: returnUrl || manifest.url
    });
  });

  // 5. Token verification endpoint (For backend middleware on subdomains)
  app.post('/api/v1/auth/verify', (req, res) => {
    const authHeader = req.headers.authorization;
    const bodyToken = req.body?.token;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : bodyToken;

    if (!token) {
      res.status(401).json({ success: false, valid: false, error: 'Token de autorização não fornecido.' });
      return;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as VitronisUserPayload;
      const fullUser = usersList.find(u => u.uid === decoded.uid) || decoded;

      res.json({
        success: true,
        valid: true,
        standard: 'VIAS 1.0',
        issuer: 'https://accounts.vitronis.co.ao',
        user: fullUser
      });
    } catch (err: any) {
      res.status(401).json({
        success: false,
        valid: false,
        error: 'Token inválido ou expirado.',
        details: err.message
      });
    }
  });

  // 6. Token Exchange Endpoint (Exchange Auth Code for JWT token)
  app.post('/api/v1/auth/token-exchange', (req, res) => {
    const { code, app: requestingApp } = req.body;
    
    // Demo code validation
    const demoUser = usersList[0];
    const tokenPayload = {
      uid: demoUser.uid,
      email: demoUser.email,
      name: demoUser.name,
      role: demoUser.role,
      permissions: demoUser.permissions,
      company: demoUser.company,
      tenant: demoUser.tenant,
      avatar: demoUser.avatar,
      certificates: demoUser.certificates,
      wallet: demoUser.wallet,
      iss: 'https://accounts.vitronis.co.ao',
      aud: requestingApp || 'vitronis-ecosystem'
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      access_token: token,
      token_type: 'Bearer',
      expires_in: 604800,
      user: demoUser
    });
  });

  // 7. Download Universal Config for GitHub Repos & Render Deployments (`vitronis.config.json`)
  app.get('/api/v1/sdk/config', (req, res) => {
    const appId = (req.query.app as string) || 'jobexpress';
    const config = getUniversalConfig(appId);
    res.json(config);
  });

  // 8. Serve universal browser script SDK
  app.get('/api/v1/sdk/vias.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.send(`
      /** Vitronis Identity & Application Standard (VIAS 1.0) SDK **/
      window.VitronisAuth = {
        ssoDomain: 'https://accounts.vitronis.co.ao',
        login: function(appId, returnUrl) {
          const currentUrl = returnUrl || window.location.href;
          window.location.href = 'https://accounts.vitronis.co.ao/sso?app=' + encodeURIComponent(appId) + '&returnUrl=' + encodeURIComponent(currentUrl);
        },
        getToken: function() {
          return localStorage.getItem('vitronis_access_token');
        },
        logout: function() {
          localStorage.removeItem('vitronis_access_token');
          window.location.reload();
        }
      };
      console.log('⚡ VIAS 1.0 SDK Loaded for domain: ' + window.location.hostname);
    `);
  });

  // --------------------------------------------------------
  // Vite Dev Server / Static Asset Handler
  // --------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Vitronis SSO & Identity Provider (VIAS 1.0) running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
