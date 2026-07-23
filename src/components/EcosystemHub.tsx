import React from 'react';
import { VitronisAppManifest, VitronisUserPayload } from '../types';
import { 
  ShieldCheck, Briefcase, Wallet, Scale, Building2, GraduationCap, 
  ArrowRight, ExternalLink, Sparkles, CheckCircle2, Lock, Key, Network,
  Layers, ChevronRight, Zap, RefreshCw, Cpu
} from 'lucide-react';

interface EcosystemHubProps {
  appManifests: VitronisAppManifest[];
  onLaunchSSOForApp: (app: VitronisAppManifest) => void;
  onSimulateAppFlow: (app: VitronisAppManifest) => void;
  currentUser: VitronisUserPayload | null;
}

export const EcosystemHub: React.FC<EcosystemHubProps> = ({
  appManifests,
  onLaunchSSOForApp,
  onSimulateAppFlow,
  currentUser
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-amber-500" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-indigo-500" />;
      case 'Wallet': return <Wallet className="w-6 h-6 text-emerald-500" />;
      case 'Scale': return <Scale className="w-6 h-6 text-purple-500" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-blue-500" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-rose-500" />;
      default: return <Layers className="w-6 h-6 text-cyan-500" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 md:p-10 text-white shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Arquitetura de Identidade Unificada VIAS 1.0</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            A JobExpress é o <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Provedor de Identidade (IdP)</span> de Todo o Ecossistema Vitronis
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal">
            Em vez de forçar o utilizador a criar contas separadas em cada plataforma, o <strong>Preparatório MININT</strong>, a <strong>JobExpress</strong>, o <strong>KwanzaMóvel AI</strong> e a <strong>Justiça360</strong> utilizam exatamente a mesma infraestrutura de autenticação <code className="bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono">accounts.vitronis.co.ao</code>.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Status da Holding</span>
              <div className="text-xl font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Ativo & Integrado
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Sistemas No Ar</span>
              <div className="text-xl font-bold text-white">
                3 Deployed <span className="text-xs font-normal text-slate-400">(Render)</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Padrão Único</span>
              <div className="text-xl font-bold text-indigo-300 font-mono">VIAS 1.0</div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Domínio SSO</span>
              <div className="text-xs font-bold text-slate-200 font-mono truncate">
                accounts.vitronis.co.ao
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Architectural Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Network className="w-5 h-5 text-indigo-400" />
              Diagrama do Ecossistema Vitronis
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Como o site principal <span className="text-indigo-300 font-mono">www.vitronis.co.ao</span> orquestra todos os subdomínios e projetos
            </p>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700 font-mono">
            Contrato de Autenticação Unificado
          </span>
        </div>

        {/* Tree Topology Visualizer */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 space-y-8 overflow-x-auto">
          {/* Top Level: Vitronis Holding */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-blue-900/80 to-indigo-900/80 border border-indigo-500/50 rounded-2xl px-6 py-4 text-center shadow-lg shadow-indigo-950/50 min-w-[280px]">
              <div className="text-xs font-bold text-indigo-300 font-mono tracking-widest uppercase">HOLDING DONA DO ECOSSISTEMA</div>
              <div className="text-lg font-black text-white mt-0.5">VITRONIS TECNOLOGIAS</div>
              <a href="https://www.vitronis.co.ao" target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:underline flex items-center justify-center gap-1 mt-1 font-mono">
                www.vitronis.co.ao <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Connector Line Down */}
          <div className="flex justify-center">
            <div className="w-0.5 h-8 bg-gradient-to-b from-indigo-500 to-indigo-800" />
          </div>

          {/* Level 2: JobExpress Central Identity Provider */}
          <div className="flex justify-center">
            <div className="bg-slate-900 border-2 border-indigo-500 rounded-2xl p-5 text-center max-w-lg w-full shadow-2xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] uppercase font-bold px-3 py-0.5 rounded-full border border-indigo-400">
                PROVEDOR CENTRAL DE IDENTIDADE (SSO IdP)
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Key className="w-5 h-5 text-amber-400" />
                <span className="text-xl font-bold text-white">JobExpress Accounts</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 font-mono text-center">
                accounts.vitronis.co.ao / login.jobexpress.ao
              </p>
              
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] text-slate-300 font-mono text-left bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Identidade</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Autenticação</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Carteira Kz</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Certificados</span>
              </div>
            </div>
          </div>

          {/* Connectors Branching Out */}
          <div className="flex justify-center">
            <div className="w-0.5 h-8 bg-slate-700" />
          </div>

          {/* Level 3: Ecosystem Consumer Modules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {appManifests.map((app) => (
              <div
                key={app.app}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 hover:border-indigo-500/50 transition space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-slate-800 rounded-xl border border-slate-700/80">
                        {getIcon(app.icon)}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm leading-tight">{app.name}</h3>
                        <span className="text-[10px] text-slate-400 font-mono truncate block max-w-[150px]">
                          {app.subdomain || app.url}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      app.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : app.status === 'in_development'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {app.status === 'active' ? 'No Ar (Render)' : app.status === 'in_development' ? 'Em Dev' : 'Planeado'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-2.5 line-clamp-2">
                    {app.description}
                  </p>

                  <div className="mt-3 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono uppercase">Rotas Padrão VIAS 1.0:</span>
                    <div className="flex flex-wrap gap-1 text-[10px] font-mono text-indigo-300">
                      <span className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">/auth/login</span>
                      <span className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">/auth/callback</span>
                      <span className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">Bearer JWT</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSimulateAppFlow(app)}
                    className="text-xs bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white px-3 py-1.5 rounded-xl border border-indigo-500/30 transition flex items-center gap-1 font-medium"
                  >
                    <Zap className="w-3.5 h-3.5" /> Simular SSO
                  </button>

                  <a
                    href={app.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1 font-mono"
                  >
                    Aceder <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion-Driven Onboarding Secret Panel */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border border-indigo-800/60 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-600/20 rounded-2xl border border-indigo-500/40 text-indigo-400 shrink-0">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              O Segredo para Aumentar Cadastros Sem Forçar o Utilizador
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Quando o utilizador tenta aceder a um simulado no <strong>Preparatório MININT</strong> (ex: <code className="text-indigo-300 font-mono">/simulado/4</code>), o ecossistema nunca diz "Cadastre-se na JobExpress".
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Traditional Bad Approach */}
          <div className="bg-rose-950/20 border border-rose-900/40 rounded-2xl p-5 space-y-3">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider font-mono">
              ❌ Erro Comum (Abordagem Frustrante)
            </div>
            <div className="text-sm font-semibold text-rose-200">
              "Para continuar no MININT, cadastre-se no site JobExpress Angola"
            </div>
            <p className="text-xs text-rose-300/80 leading-relaxed">
              O utilizador sente-se empurrado para outra empresa desconhecida, abandona a página e perde a confiança. Após o cadastro, o sistema atira-o para a Home da JobExpress e ele perde o contexto do simulado.
            </p>
          </div>

          {/* Universal Vitronis SSO Approach */}
          <div className="bg-emerald-950/20 border border-emerald-800/50 rounded-2xl p-5 space-y-3">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Abordagem Unificada VIAS 1.0 (Alta Conversão)
            </div>
            <div className="text-sm font-semibold text-emerald-200">
              "Continue gratuitamente. Ao criar uma única conta terá acesso imediato:"
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 pl-1">
              <li className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Preparatório MININT & Simulados</li>
              <li className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Histórico e Certificados Unificados</li>
              <li className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Perfil Profissional & Oportunidades JobExpress</li>
              <li className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Carteira Digital KwanzaMóvel</li>
            </ul>
            <p className="text-xs text-emerald-300/90 font-medium pt-1 border-t border-emerald-900/40">
              ⚡ Após autenticar, regressa automaticamente ao <strong>Simulado 4</strong> desbloqueado!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
