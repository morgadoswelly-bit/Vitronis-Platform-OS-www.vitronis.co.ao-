import React from 'react';
import { ShieldCheck, Layers, Cpu, Code2, UserCheck, ExternalLink, Key, Lock, Globe, Sparkles, CheckCircle2, Activity, Server } from 'lucide-react';
import { VitronisUserPayload } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: VitronisUserPayload | null;
  onLogout: () => void;
  onSelectUser: (user: VitronisUserPayload) => void;
  demoUsers: VitronisUserPayload[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onLogout,
  onSelectUser,
  demoUsers
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-xl">
      {/* Top Identity Provider & Domain Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-b border-indigo-800/40 px-4 py-1.5 text-xs font-medium text-slate-300 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white tracking-wide">VITRONIS PLATFORM OPERATING SYSTEM</span>
          <span className="text-slate-500">•</span>
          <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 flex items-center gap-1 font-mono text-[11px]">
            <Lock className="w-3 h-3 text-indigo-400" /> accounts.vitronis.co.ao
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 hidden sm:inline">Padrão de Identidade: <strong className="text-emerald-400">VIAS 1.0</strong></span>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <button
              onClick={() => setActiveTab('home')}
              className="text-indigo-300 hover:text-white transition"
            >
              www.vitronis.co.ao
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setActiveTab('console')}
              className="text-emerald-300 hover:text-white transition"
            >
              console.vitronis.co.ao
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                Vitronis <span className="text-indigo-400">Platform OS</span>
              </h1>
              <span className="bg-indigo-500/20 text-indigo-300 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-indigo-500/30">
                VIAS 1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Sistema Operacional do Ecossistema & Provedor de Identidade Único
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'home'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Globe className="w-4 h-4 text-cyan-400" /> Portal Público
          </button>

          <button
            onClick={() => setActiveTab('sso')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'sso'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Key className="w-4 h-4 text-amber-400" /> Accounts SSO
          </button>

          <button
            onClick={() => setActiveTab('console')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'console'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4 text-emerald-400" /> Console Admin
          </button>

          <button
            onClick={() => setActiveTab('status')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'status'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Activity className="w-4 h-4 text-rose-400" /> Status Live
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Server className="w-4 h-4 text-blue-400" /> Proxy Render
          </button>

          <button
            onClick={() => setActiveTab('passport')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'passport'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <UserCheck className="w-4 h-4 text-purple-400" /> Passaporte
          </button>

          <button
            onClick={() => setActiveTab('devhub')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'devhub'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4 text-amber-300" /> Developers
          </button>
        </nav>

        {/* Active User Status & Quick Switch */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 p-1.5 rounded-xl">
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                alt={currentUser.name}
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/50"
              />
              <div className="text-left hidden lg:block pr-1">
                <div className="text-xs font-semibold text-white leading-tight flex items-center gap-1">
                  {currentUser.name}
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="text-[10px] text-slate-400 truncate max-w-[130px]">
                  {currentUser.email}
                </div>
              </div>
              <button
                onClick={onLogout}
                className="text-xs text-slate-400 hover:text-rose-400 px-2 py-1 bg-slate-900 rounded-lg hover:bg-slate-950 transition border border-slate-800"
                title="Sair da sessão SSO"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden sm:inline">Perfil Demo:</span>
              <select
                onChange={(e) => {
                  const selected = demoUsers.find(u => u.uid === e.target.value);
                  if (selected) onSelectUser(selected);
                }}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Selecionar Perfil...</option>
                {demoUsers.map(u => (
                  <option key={u.uid} value={u.uid}>
                    {u.name} ({u.role.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

