import React, { useState } from 'react';
import { VitronisAppManifest, VitronisUserPayload } from '../types';
import { 
  Code2, FileText, Copy, Check, Download, ShieldCheck, Key, Globe, 
  Layers, Terminal, RefreshCw, CheckCircle2, AlertCircle, Plus, Sparkles
} from 'lucide-react';

interface VIASDeveloperHubProps {
  appManifests: VitronisAppManifest[];
  onRegisterManifest: (manifest: VitronisAppManifest) => void;
}

export const VIASDeveloperHub: React.FC<VIASDeveloperHubProps> = ({
  appManifests,
  onRegisterManifest
}) => {
  const [activeTab, setActiveTab] = useState<'config' | 'spec' | 'snippets' | 'manifests' | 'jwt'>('config');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedAppForConfig, setSelectedAppForConfig] = useState<string>('preparatorio-minint');

  // New App Manifest Form State
  const [newAppName, setNewAppName] = useState('');
  const [newAppId, setNewAppId] = useState('');
  const [newAppUrl, setNewAppUrl] = useState('');
  const [newAppDesc, setNewAppDesc] = useState('');
  const [manifestSuccess, setManifestSuccess] = useState(false);

  // JWT Tester
  const [jwtInput, setJwtInput] = useState('');
  const [jwtVerificationResult, setJwtVerificationResult] = useState<any>(null);
  const [jwtVerifying, setJwtVerifying] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRegisterAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppName || !newAppId || !newAppUrl) return;

    const manifest: VitronisAppManifest = {
      app: newAppId.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      name: newAppName,
      url: newAppUrl,
      callbackUrl: `${newAppUrl.replace(/\/$/, '')}/auth/callback`,
      requiresAuthentication: true,
      minimumRole: 'user',
      description: newAppDesc || 'Nova aplicação integrada ao Ecossistema Vitronis',
      category: 'servicos',
      icon: 'AppWindow',
      benefits: ['Autenticação Única Vitronis SSO', 'Acesso com Conta Existente'],
      status: 'active'
    };

    try {
      const res = await fetch('/api/v1/apps/manifests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manifest)
      });
      const data = await res.json();
      if (data.success) {
        onRegisterManifest(manifest);
        setManifestSuccess(true);
        setNewAppName('');
        setNewAppId('');
        setNewAppUrl('');
        setNewAppDesc('');
        setTimeout(() => setManifestSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyJwt = async () => {
    if (!jwtInput) return;
    setJwtVerifying(true);
    setJwtVerificationResult(null);

    try {
      const res = await fetch('/api/v1/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtInput.trim()}`
        }
      });
      const data = await res.json();
      setJwtVerificationResult(data);
    } catch (err: any) {
      setJwtVerificationResult({ success: false, error: err.message });
    } finally {
      setJwtVerifying(false);
    }
  };

  const currentAppManifest = appManifests.find(m => m.app === selectedAppForConfig) || appManifests[0];

  const universalJsonConfig = JSON.stringify({
    "$schema": "https://accounts.vitronis.co.ao/schemas/vias-1.0.json",
    "version": "VIAS-1.0",
    "issuer": "https://accounts.vitronis.co.ao",
    "app_manifest": {
      "app": currentAppManifest.app,
      "name": currentAppManifest.name,
      "url": currentAppManifest.url,
      "callbackUrl": currentAppManifest.callbackUrl,
      "requiresAuthentication": true,
      "minimumRole": "user"
    },
    "standard_routes": {
      "login": "/auth/login",
      "logout": "/auth/logout",
      "callback": "/auth/callback",
      "verify": "https://accounts.vitronis.co.ao/api/v1/auth/verify"
    },
    "environment": {
      "VITRONIS_SSO_HUB": "https://accounts.vitronis.co.ao",
      "VITRONIS_JWT_SECRET_KEY": "vitronis_vias_10_super_secret_key_2026"
    }
  }, null, 2);

  const expressMiddlewareCode = `
// ========================================================
// VIAS 1.0 Express Middleware (Adicionar ao seu server.js)
// Funciona em todos os projetos no Render / GitHub
// ========================================================
import express from 'express';
import jwt from 'jsonwebtoken';

const VITRONIS_JWT_SECRET = process.env.VITRONIS_JWT_SECRET_KEY || 'vitronis_vias_10_super_secret_key_2026';

export function viasAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : req.query.token;

  if (!token) {
    // Redireciona para o SSO Vitronis mantendo a URL de origem
    const returnUrl = encodeURIComponent(req.protocol + '://' + req.get('host') + req.originalUrl);
    return res.redirect(\`https://accounts.vitronis.co.ao/sso?app=${currentAppManifest.app}&returnUrl=\${returnUrl}\`);
  }

  try {
    const decodedUser = jwt.verify(token, VITRONIS_JWT_SECRET);
    req.user = decodedUser; // Contém uid, email, name, role, permissions, company, wallet
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token VIAS 1.0 inválido ou expirado.' });
  }
}

// Exemplo de uso em rotas do Preparatório MININT, JobExpress ou KwanzaMóvel:
app.get('/simulado/4', viasAuthMiddleware, (req, res) => {
  res.json({ message: \`Bem-vindo ao Simulado, \${req.user.name}!\`, user: req.user });
});
`;

  const reactHookCode = `
// ========================================================
// VIAS 1.0 React Hook (useVitronisAuth.ts)
// ========================================================
import { useState, useEffect } from 'react';

export function useVitronisAuth(appId = '${currentAppManifest.app}') {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('vitronis_token');
    if (!token) {
      setLoading(false);
      return;
    }

    fetch('https://accounts.vitronis.co.ao/api/v1/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${token}\`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.valid) setUser(data.user);
      else localStorage.removeItem('vitronis_token');
    })
    .finally(() => setLoading(false));
  }, []);

  const login = (returnUrl) => {
    const current = returnUrl || window.location.href;
    window.location.href = \`https://accounts.vitronis.co.ao/sso?app=\${appId}&returnUrl=\${encodeURIComponent(current)}\`;
  };

  const logout = () => {
    localStorage.removeItem('vitronis_token');
    setUser(null);
  };

  return { user, loading, login, logout };
}
`;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-600/20 border border-purple-500/40 rounded-2xl text-purple-400">
            <Code2 className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 bg-purple-500/20 text-purple-300 text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-purple-500/30 font-bold uppercase mb-1">
              Documentação Técnica de Unificação
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Vitronis Identity & Application Standard (VIAS 1.0)
            </h1>
          </div>
        </div>

        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
          Especificação oficial para integrar qualquer repositório no GitHub ou serviço no Render ao ecossistema de identidade centralizado <code className="text-purple-300 font-mono">accounts.vitronis.co.ao</code>.
        </p>

        {/* Subtabs */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('config')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'config'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-950 text-slate-300 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-400" /> Ficheiro Único (vitronis.config.json)
          </button>

          <button
            onClick={() => setActiveTab('snippets')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'snippets'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-950 text-slate-300 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4 text-cyan-400" /> Code Snippets (Express / React)
          </button>

          <button
            onClick={() => setActiveTab('spec')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'spec'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-950 text-slate-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" /> Especificação de Rotas
          </button>

          <button
            onClick={() => setActiveTab('manifests')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'manifests'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-950 text-slate-300 hover:text-white'
            }`}
          >
            <Plus className="w-4 h-4 text-indigo-400" /> Cadastrar Novo Subdomínio
          </button>

          <button
            onClick={() => setActiveTab('jwt')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'jwt'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-950 text-slate-300 hover:text-white'
            }`}
          >
            <Key className="w-4 h-4 text-rose-400" /> Inspetor & Validador JWT
          </button>
        </div>
      </div>

      {/* Tab 1: Universal 1-File Configuration (vitronis.config.json) */}
      {activeTab === 'config' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" /> Ficheiro Universal de Configuração (<code className="text-indigo-300 font-mono">vitronis.config.json</code>)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Copie este único ficheiro e coloque na raiz de qualquer projeto no GitHub/Render para unificar a identidade imediatamente.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Para a Aplicação:</span>
              <select
                value={selectedAppForConfig}
                onChange={(e) => setSelectedAppForConfig(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-indigo-300 text-xs rounded-xl px-3 py-1.5 font-mono font-bold"
              >
                {appManifests.map(m => (
                  <option key={m.app} value={m.app}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Config Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-emerald-300 relative group">
            <button
              onClick={() => copyToClipboard(universalJsonConfig, 'config')}
              className="absolute top-4 right-4 bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-700 transition flex items-center gap-1.5 font-sans text-xs"
            >
              {copiedKey === 'config' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" /> Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copiar Ficheiro JSON
                </>
              )}
            </button>
            <pre className="overflow-x-auto p-2">{universalJsonConfig}</pre>
          </div>
        </div>
      )}

      {/* Tab 2: Code Snippets (Express & React) */}
      {activeTab === 'snippets' && (
        <div className="space-y-6">
          {/* Express Middleware Snippet */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-400" /> Middleware Express/Node.js para Servidores Backend
              </h3>
              <button
                onClick={() => copyToClipboard(expressMiddlewareCode, 'express')}
                className="bg-slate-950 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-700 text-xs transition flex items-center gap-1.5"
              >
                {copiedKey === 'express' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                Copiar Middleware
              </button>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
              <pre>{expressMiddlewareCode}</pre>
            </div>
          </div>

          {/* React Hook Snippet */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan-400" /> Hook Customizado React (<code className="text-cyan-300 font-mono">useVitronisAuth.ts</code>)
              </h3>
              <button
                onClick={() => copyToClipboard(reactHookCode, 'react')}
                className="bg-slate-950 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-700 text-xs transition flex items-center gap-1.5"
              >
                {copiedKey === 'react' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                Copiar React Hook
              </button>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
              <pre>{reactHookCode}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Specification Documentation */}
      {activeTab === 'spec' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 text-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            Contrato Obrigatório VIAS 1.0 para Todos os Projetos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="font-bold text-indigo-300 font-mono">1. Route: /auth/login</span>
              <p className="text-slate-300 leading-relaxed">
                Nunca faz login localmente. Redireciona imediatamente o utilizador para <code className="text-indigo-400 font-mono">https://accounts.vitronis.co.ao/sso?app=NOME_DO_APP&returnUrl=URL_DE_ORIGEM</code>.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="font-bold text-amber-300 font-mono">2. Route: /auth/callback</span>
              <p className="text-slate-300 leading-relaxed">
                Recebe o token JWT assinado pela Vitronis via parâmetro na URL (<code className="text-amber-400 font-mono">?token=JWT</code>), armazena no localStorage/cookies e redireciona para a página de origem.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300 font-mono">3. Headers: Authorization Bearer</span>
              <p className="text-slate-300 leading-relaxed">
                Todas as chamadas de API do sistema devem enviar o cabeçalho <code className="text-emerald-400 font-mono">Authorization: Bearer &lt;JWT&gt;</code> para validação nos serviços de backend.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300 font-mono">4. Identity Payload Format</span>
              <p className="text-slate-300 leading-relaxed">
                O token contém obrigatoriamente os campos: <code className="text-cyan-400 font-mono">uid, email, name, role, permissions, company, tenant, wallet, certificates</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Register New App Subdomain */}
      {activeTab === 'manifests' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" /> Cadastrar Novo Projeto / Subdomínio no Ecossistema Vitronis
            </h2>
            <p className="text-xs text-slate-400">
              Adicione os dados do seu novo repositório GitHub ou Render para reconhecer imediatamente a autenticação SSO.
            </p>
          </div>

          {manifestSuccess && (
            <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs p-4 rounded-2xl flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Manifesto registrado com sucesso! O novo subdomínio já pode realizar autenticação via VIAS 1.0.</span>
            </div>
          )}

          <form onSubmit={handleRegisterAppSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold">Nome do Projeto</label>
                <input
                  type="text"
                  required
                  value={newAppName}
                  onChange={(e) => setNewAppName(e.target.value)}
                  placeholder="Ex: Justiça360 Angola"
                  className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold">Identificador (App Slug)</label>
                <input
                  type="text"
                  required
                  value={newAppId}
                  onChange={(e) => setNewAppId(e.target.value)}
                  placeholder="ex: justica360"
                  className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3.5 py-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold">URL de Acesso (Render ou Subdomínio)</label>
              <input
                type="url"
                required
                value={newAppUrl}
                onChange={(e) => setNewAppUrl(e.target.value)}
                placeholder="https://justica360.onrender.com ou https://justica360.vitronis.co.ao"
                className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3.5 py-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold">Descrição do Serviço</label>
              <textarea
                value={newAppDesc}
                onChange={(e) => setNewAppDesc(e.target.value)}
                placeholder="Descrição breve das funcionalidades do novo serviço..."
                className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={2}
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition flex items-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <Plus className="w-4 h-4" /> Registrar Manifesto no SSO Hub
            </button>
          </form>
        </div>
      )}

      {/* Tab 5: JWT Verifier */}
      {activeTab === 'jwt' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-rose-400" /> Inspetor & Validador de Token JWT VIAS 1.0
            </h2>
            <p className="text-xs text-slate-400">
              Cole qualquer token gerado pelo <code className="text-rose-300 font-mono">accounts.vitronis.co.ao</code> para testar a sua integridade e decodificar os privilégios.
            </p>
          </div>

          <div className="space-y-3">
            <textarea
              value={jwtInput}
              onChange={(e) => setJwtInput(e.target.value)}
              placeholder="Cole o Bearer JWT aqui (ex: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
              className="w-full bg-slate-950 border border-slate-700 text-rose-300 font-mono text-xs rounded-2xl p-4 h-28 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />

            <button
              onClick={handleVerifyJwt}
              disabled={jwtVerifying}
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition flex items-center gap-2 disabled:opacity-50"
            >
              {jwtVerifying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              Validar Assinatura do Token
            </button>
          </div>

          {jwtVerificationResult && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto space-y-2">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Resultado da Verificação:</div>
              <pre className={jwtVerificationResult.valid ? 'text-emerald-400' : 'text-rose-400'}>
                {JSON.stringify(jwtVerificationResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
