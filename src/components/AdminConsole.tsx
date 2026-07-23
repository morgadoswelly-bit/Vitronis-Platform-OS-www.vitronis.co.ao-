import React, { useState } from 'react';
import { VitronisAppManifest, VitronisUserPayload, RenderDeployment, ReverseProxyRoute, FirestoreSchema, AuditLog } from '../types';
import { MOCK_RENDER_DEPLOYMENTS, MOCK_REVERSE_PROXY_ROUTES, MOCK_FIRESTORE_SCHEMAS, MOCK_AUDIT_LOGS } from '../data/mockDatabase';
import {
  Cpu,
  Plus,
  Server,
  Database,
  Users,
  ShieldAlert,
  Globe,
  Layers,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Code2,
  Lock,
  Search,
  Activity,
  Terminal,
  Clock,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface AdminConsoleProps {
  appManifests: VitronisAppManifest[];
  onRegisterManifest: (manifest: VitronisAppManifest) => void;
  currentUser: VitronisUserPayload | null;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  appManifests,
  onRegisterManifest,
  currentUser
}) => {
  const [activeConsoleTab, setActiveConsoleTab] = useState<'apps' | 'deploys' | 'proxy' | 'firestore' | 'users' | 'audit'>('apps');
  const [showAddAppModal, setShowAddAppModal] = useState<boolean>(false);
  const [deploymentsList, setDeploymentsList] = useState<RenderDeployment[]>(MOCK_RENDER_DEPLOYMENTS);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // New Application Form State
  const [newAppName, setNewAppName] = useState<string>('');
  const [newAppId, setNewAppId] = useState<string>('');
  const [newAppDescription, setNewAppDescription] = useState<string>('');
  const [newAppSubdomain, setNewAppSubdomain] = useState<string>('');
  const [newAppRenderHost, setNewAppRenderHost] = useState<string>('');
  const [newAppCategory, setNewAppCategory] = useState<'emprego' | 'educacao' | 'financas' | 'governo' | 'servicos'>('servicos');
  const [newAppIcon, setNewAppIcon] = useState<string>('AppWindow');
  const [newAppVersion, setNewAppVersion] = useState<string>('1.0.0');

  const handleCreateNewApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppName || !newAppId || !newAppRenderHost) return;

    const formattedSubdomain = newAppSubdomain || `${newAppId}.vitronis.co.ao`;
    const fullSubdomain = formattedSubdomain.endsWith('.vitronis.co.ao') ? formattedSubdomain : `${formattedSubdomain}.vitronis.co.ao`;

    const newManifest: VitronisAppManifest = {
      app: newAppId.toLowerCase().trim(),
      name: newAppName.trim(),
      url: `https://${fullSubdomain}`,
      renderHost: newAppRenderHost.trim(),
      callbackUrl: `${newAppRenderHost.trim()}/auth/callback`,
      requiresAuthentication: true,
      minimumRole: 'user',
      description: newAppDescription.trim() || 'Nova solução integrada ao ecossistema Vitronis',
      category: newAppCategory,
      icon: newAppIcon,
      benefits: [
        'Integrado ao Login Unificado (accounts.vitronis.co.ao)',
        'Hospedado de forma autónoma na infraestrutura Render',
        'Subdomínio oficial configurado em Nginx Reverse Proxy'
      ],
      subdomain: fullSubdomain,
      status: 'online',
      visibility: 'public',
      version: newAppVersion || '1.0.0',
      latencyMs: Math.floor(80 + Math.random() * 100),
      uptimePct: 100.0,
      lastDeployAt: new Date().toLocaleString('pt-AO'),
      activeSessionsCount: 1
    };

    onRegisterManifest(newManifest);

    // Also register in mock deployment history
    const newDep: RenderDeployment = {
      id: `dep_${Date.now()}`,
      appId: newManifest.app,
      appName: newManifest.name,
      renderHost: newManifest.renderHost || '',
      customDomain: newManifest.subdomain || '',
      commitHash: 'b91a31c',
      branch: 'main',
      status: 'live',
      deployedAt: new Date().toLocaleString('pt-AO'),
      version: newManifest.version || '1.0.0',
      triggeredBy: 'Console Admin Vitronis'
    };

    setDeploymentsList(prev => [newDep, ...prev]);

    // Reset Form
    setNewAppName('');
    setNewAppId('');
    setNewAppDescription('');
    setNewAppSubdomain('');
    setNewAppRenderHost('');
    setShowAddAppModal(false);
  };

  const handleSyncRenderHealth = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Console Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              console.vitronis.co.ao
            </span>
            <span className="text-xs text-slate-400 font-mono">VIAS 1.0 Administrative OS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Cpu className="w-8 h-8 text-indigo-400" />
            <span>Console de Gestão do Ecossistema</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Painel operacional para gerir módulos, instâncias Render, rotas de Reverse Proxy Nginx/Cloudflare e permissões de utilizadores.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowAddAppModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Nova Plataforma</span>
          </button>

          <button
            onClick={handleSyncRenderHealth}
            disabled={isSyncing}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Sincronizando...' : 'Ping Render Hosts'}</span>
          </button>
        </div>
      </div>

      {/* Console Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800 pb-2 scrollbar-none">
        <button
          onClick={() => setActiveConsoleTab('apps')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 whitespace-nowrap ${
            activeConsoleTab === 'apps'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Aplicações Registadas ({appManifests.length})</span>
        </button>

        <button
          onClick={() => setActiveConsoleTab('deploys')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 whitespace-nowrap ${
            activeConsoleTab === 'deploys'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Server className="w-4 h-4 text-cyan-400" />
          <span>Render Deployments ({deploymentsList.length})</span>
        </button>

        <button
          onClick={() => setActiveConsoleTab('proxy')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 whitespace-nowrap ${
            activeConsoleTab === 'proxy'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>Reverse Proxy & Domínios</span>
        </button>

        <button
          onClick={() => setActiveConsoleTab('firestore')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 whitespace-nowrap ${
            activeConsoleTab === 'firestore'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Database className="w-4 h-4 text-amber-400" />
          <span>Coleções Firestore</span>
        </button>

        <button
          onClick={() => setActiveConsoleTab('audit')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 whitespace-nowrap ${
            activeConsoleTab === 'audit'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Activity className="w-4 h-4 text-rose-400" />
          <span>Audit Logs</span>
        </button>
      </div>

      {/* TAB 1: APPLICATIONS LIST & MANAGEMENT */}
      {activeConsoleTab === 'apps' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Módulos de Aplicação Ativos</span>
              <span className="text-xs bg-indigo-500/20 text-indigo-300 font-mono px-2 py-0.5 rounded border border-indigo-500/30">
                Catálogo Dinâmico
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Cadastre e altere URLs do Render sem alterar o código-fonte das aplicações.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appManifests.map((app) => (
              <div
                key={app.app}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      <span>{app.name}</span>
                    </h3>
                    <span className="text-xs text-indigo-400 font-mono">{app.subdomain}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                    app.status === 'online' || app.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2">{app.description}</p>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-[11px] font-mono space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Render Host:</span>
                    <a
                      href={app.renderHost || app.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:underline truncate max-w-[170px]"
                    >
                      {app.renderHost || app.url}
                    </a>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Latência:</span>
                    <span className="text-emerald-400">{app.latencyMs || 120} ms</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Versão:</span>
                    <span className="text-slate-200">v{app.version || '1.0'}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{app.lastDeployAt || 'Ativo'}</span>
                  </span>

                  <a
                    href={app.renderHost || app.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 text-xs"
                  >
                    <span>Abrir Directo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: RENDER DEPLOYMENTS */}
      {activeConsoleTab === 'deploys' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Estado das Instâncias no Render</h2>
              <p className="text-xs text-slate-400">
                Monitorização em tempo real de web services hospedados no Render Cloud Platform.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-3.5">Aplicação</th>
                    <th className="px-6 py-3.5">Host no Render</th>
                    <th className="px-6 py-3.5">Subdomínio Oficial</th>
                    <th className="px-6 py-3.5">Versão / Commit</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Último Deploy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {deploymentsList.map((dep) => (
                    <tr key={dep.id} className="hover:bg-slate-800/50 transition">
                      <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                        <Server className="w-4 h-4 text-cyan-400" />
                        <span>{dep.appName}</span>
                      </td>
                      <td className="px-6 py-4 font-mono text-cyan-300">
                        <a href={dep.renderHost} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                          <span>{dep.renderHost}</span>
                          <ExternalLink className="w-3 h-3 text-slate-500" />
                        </a>
                      </td>
                      <td className="px-6 py-4 font-mono text-indigo-300">
                        {dep.customDomain}
                      </td>
                      <td className="px-6 py-4 font-mono">
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">v{dep.version}</span>
                        <span className="ml-2 text-slate-500">({dep.commitHash})</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> LIVE
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">
                        {dep.deployedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REVERSE PROXY & DOMAINS */}
      {activeConsoleTab === 'proxy' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" />
              <span>Configuração Nginx & Cloudflare Reverse Proxy</span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Os utilizadores acedem exclusivamente pelos subdomínios oficiais <code className="text-indigo-300">*.vitronis.co.ao</code>.
              O reverse proxy do Nginx reencaminha transparentemente os pedidos para o backend correspondente no Render.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {MOCK_REVERSE_PROXY_ROUTES.map((route, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-indigo-300 text-xs">{route.subdomain}</span>
                    <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                      HTTP {route.httpResponseCode} OK
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                    <span>➔ Target Render:</span>
                    <span className="text-slate-200 truncate">{route.targetRenderHost}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 font-mono">
                    <span>SSL: {route.sslProvider}</span>
                    <span>Último Ping: {route.lastPing}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FIRESTORE COLLECTIONS */}
      {activeConsoleTab === 'firestore' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                <span>Base de Dados Firestore Unificada</span>
              </h2>
              <p className="text-xs text-slate-400">
                Visualização do schema de coleções para gerir estado global, sessões e permissões.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_FIRESTORE_SCHEMAS.map((schema, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-300 text-sm">/{schema.collection}</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                    {schema.recordCount.toLocaleString()} docs
                  </span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto">
                  <pre className="text-slate-400 text-[10px]">
                    {JSON.stringify(schema.sampleRecord, null, 2)}
                  </pre>
                </div>

                <div className="text-[10px] text-slate-500 font-mono text-right">
                  Atualizado: {schema.lastUpdated}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: AUDIT LOGS */}
      {activeConsoleTab === 'audit' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-rose-400" />
            <span>Logs de Auditoria e Segurança</span>
          </h2>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            {MOCK_AUDIT_LOGS.map((log) => (
              <div key={log.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-indigo-400">{log.action}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300">{log.targetApp}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{log.details}</p>
                </div>

                <div className="text-right font-mono text-[10px] text-slate-500 shrink-0">
                  <div>Ator: {log.actor}</div>
                  <div>IP: {log.ip} | {log.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: REGISTER NEW APPLICATION */}
      {showAddAppModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <span>Cadastrar Nova Plataforma / Módulo</span>
              </h2>
              <button
                onClick={() => setShowAddAppModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewApp} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nome da Plataforma:</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: GovOS Angola"
                  value={newAppName}
                  onChange={(e) => setNewAppName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Identificador ID:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: govos-ao"
                    value={newAppId}
                    onChange={(e) => setNewAppId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Subdomínio Desejado:</label>
                  <input
                    type="text"
                    placeholder="Ex: govos.vitronis.co.ao"
                    value={newAppSubdomain}
                    onChange={(e) => setNewAppSubdomain(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">URL do Render Host (App Backend):</label>
                <input
                  type="url"
                  required
                  placeholder="https://sua-app.onrender.com"
                  value={newAppRenderHost}
                  onChange={(e) => setNewAppRenderHost(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-cyan-300 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Descrição Breve:</label>
                <textarea
                  rows={2}
                  placeholder="Descrição da solução para o catálogo da Vitronis..."
                  value={newAppDescription}
                  onChange={(e) => setNewAppDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Categoria:</label>
                  <select
                    value={newAppCategory}
                    onChange={(e: any) => setNewAppCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="emprego">Emprego</option>
                    <option value="educacao">Educação</option>
                    <option value="financas">Finanças</option>
                    <option value="governo">Governo</option>
                    <option value="servicos">Serviços</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Versão Inicial:</label>
                  <input
                    type="text"
                    value={newAppVersion}
                    onChange={(e) => setNewAppVersion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddAppModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-md shadow-indigo-600/30"
                >
                  Publicar Plataforma
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
