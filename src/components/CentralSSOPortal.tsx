import React, { useState } from 'react';
import { VitronisAppManifest, VitronisUserPayload } from '../types';
import { 
  Lock, Key, ShieldCheck, CheckCircle2, ArrowRight, User, Mail, Phone, 
  Sparkles, AlertCircle, ExternalLink, RefreshCw, Check, Briefcase, Wallet
} from 'lucide-react';

interface CentralSSOPortalProps {
  appManifests: VitronisAppManifest[];
  initialAppId?: string;
  initialReturnUrl?: string;
  currentUser: VitronisUserPayload | null;
  onLoginSuccess: (user: VitronisUserPayload, token: string, redirectUrl?: string) => void;
  demoUsers: VitronisUserPayload[];
}

export const CentralSSOPortal: React.FC<CentralSSOPortalProps> = ({
  appManifests,
  initialAppId = 'preparatorio-minint',
  initialReturnUrl = 'https://preparacao-oficial-minint-ckkm.onrender.com/simulado/4-legislacao-policial',
  currentUser,
  onLoginSuccess,
  demoUsers
}) => {
  const [selectedAppId, setSelectedAppId] = useState<string>(initialAppId);
  const [returnUrl, setReturnUrl] = useState<string>(initialReturnUrl);
  const [mode, setMode] = useState<'login' | 'signup'>('signup');

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'candidate' | 'student' | 'employer'>('candidate');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issuedToken, setIssuedToken] = useState<string | null>(null);

  const activeApp = appManifests.find(m => m.app === selectedAppId) || appManifests[0];

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = mode === 'login' ? '/api/v1/auth/login' : '/api/v1/auth/signup';
      const body = mode === 'login' 
        ? { email, password, app: selectedAppId, returnUrl }
        : { name, email, password, phone, role, requestingApp: selectedAppId, returnUrl };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Falha na autenticação SSO.');
      }

      setIssuedToken(data.access_token);
      onLoginSuccess(data.user, data.access_token, data.redirect_to);
    } catch (err: any) {
      setError(err.message || 'Erro de rede ao conectar com accounts.vitronis.co.ao');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = (demoUser: VitronisUserPayload) => {
    setEmail(demoUser.email);
    setPassword('demopass123');
    setName(demoUser.name);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Domain Header Simulation Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-mono text-slate-300">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-400">Serviço Central:</span>
          <strong className="text-white bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
            https://accounts.vitronis.co.ao/sso
          </strong>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Aplicação Solicitante:</span>
            <select
              value={selectedAppId}
              onChange={(e) => setSelectedAppId(e.target.value)}
              className="bg-slate-950 text-indigo-300 border border-slate-700 rounded px-2 py-1 font-mono font-semibold"
            >
              {appManifests.map(app => (
                <option key={app.app} value={app.app}>{app.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main SSO Portal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: High-Conversion Ecosystem Value Proposition (The Secret) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border border-indigo-800/80 rounded-3xl p-6 space-y-6 text-white shadow-2xl">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-600/30 rounded-xl border border-indigo-500/50 text-indigo-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-indigo-300 uppercase font-mono tracking-wider font-bold">
                  Vitronis Single Sign-On
                </span>
                <h2 className="text-lg font-bold text-white leading-tight">
                  {activeApp.name}
                </h2>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Você está prestes a aceder à plataforma <strong>{activeApp.name}</strong>. Uma única conta dá acesso a todo o ecossistema.
            </p>
          </div>

          {/* Benefit Box */}
          <div className="bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-indigo-300 uppercase font-mono flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Continue Gratuitamente
            </h3>
            <p className="text-xs text-slate-300 font-medium">
              Ao criar a sua conta única Vitronis terá acesso imediato a:
            </p>

            <ul className="space-y-2 text-xs text-slate-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>{activeApp.name}</strong> — Simulados, gabaritos e recursos completos</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>JobExpress Angola</strong> — Perfil profissional e vagas de emprego</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>KwanzaMóvel AI</strong> — Carteira digital com saldo em Kwanzas (Kz)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Histórico Unificado</strong> — Certificados com autenticidade garantida</span>
              </li>
            </ul>
          </div>

          {/* Context Return Info */}
          <div className="bg-indigo-900/30 border border-indigo-700/50 rounded-xl p-3 text-[11px] text-indigo-200 space-y-1">
            <span className="font-bold text-white block">🔄 Retorno Automático Sem Perda de Contexto:</span>
            <span className="font-mono text-slate-300 break-all block truncate">
              {returnUrl}
            </span>
            <span className="text-indigo-300 text-[10px] block pt-1">
              Após o login/cadastro você será redirecionado exatamente para a página onde estava!
            </span>
          </div>

          {/* Quick Demo Accounts Selection */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 font-mono block">Preencher Rapidamente com Demo:</span>
            <div className="grid grid-cols-1 gap-1.5">
              {demoUsers.map(u => (
                <button
                  key={u.uid}
                  type="button"
                  onClick={() => handleQuickDemoLogin(u)}
                  className="text-left bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500 rounded-xl p-2 transition text-xs flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-white group-hover:text-indigo-300">{u.name}</div>
                      <div className="text-[10px] text-slate-400">{u.email}</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono">
                    Usar
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Login/Signup Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          {/* Form Tabs */}
          <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
                mode === 'signup'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" /> Criar Conta Única (Grátis)
            </button>
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
                mode === 'login'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Key className="w-4 h-4" /> Entrar com Conta Existente
            </button>
          </div>

          {error && (
            <div className="bg-rose-950/80 border border-rose-800 text-rose-200 text-xs rounded-xl p-3.5 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {issuedToken ? (
            <div className="bg-emerald-950/90 border border-emerald-700/80 rounded-2xl p-5 space-y-4 text-white">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Autenticação Realizada com Sucesso!</span>
              </div>
              <p className="text-xs text-slate-300">
                O token JWT VIAS 1.0 foi emitido por <strong>accounts.vitronis.co.ao</strong>.
              </p>
              
              <div className="bg-slate-950 p-3 rounded-xl border border-emerald-900 font-mono text-[11px] text-emerald-300 break-all space-y-1">
                <span className="text-slate-400 text-[10px] uppercase block">Bearer JWT Issued:</span>
                <div>{issuedToken.slice(0, 80)}...</div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <a
                  href={returnUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  Regressar para {activeApp.name} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-indigo-400" /> Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Morgado Swelly"
                      className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-indigo-400" /> Telefone (Angola)
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+244 923 000 000"
                        className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Perfil Principal</label>
                      <select
                        value={role}
                        onChange={(e: any) => setRole(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="candidate">Candidato MININT / Emprego</option>
                        <option value="student">Estudante / Formando</option>
                        <option value="employer">Empresa / Recrutador</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" /> Endereço de E-mail
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-indigo-400" /> Palavra-passe
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Target Return URL Input for Custom Testing */}
              <div className="space-y-1 pt-2">
                <label className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>URL de Retorno (Target Redirect):</span>
                  <button
                    type="button"
                    onClick={() => setReturnUrl(activeApp.callbackUrl)}
                    className="text-[10px] text-indigo-400 hover:underline"
                  >
                    Resetar para Callback Padrão
                  </button>
                </label>
                <input
                  type="text"
                  value={returnUrl}
                  onChange={(e) => setReturnUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 text-xs disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Conectando com accounts.vitronis.co.ao...
                  </>
                ) : (
                  <>
                    {mode === 'signup' ? 'Criar Conta Única Vitronis & Entrar' : 'Entrar no Ecossistema Vitronis'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <p className="text-[11px] text-slate-400">
                  Protegido pela Infraestrutura de Segurança VIAS 1.0 • Vitronis Tecnologias Lda
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
