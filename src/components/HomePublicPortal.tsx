import React, { useState } from 'react';
import { VitronisAppManifest, VitronisUserPayload } from '../types';
import {
  ShieldCheck,
  ArrowRight,
  BookOpen,
  FileText,
  Award,
  CheckCircle2,
  Lock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Download,
  PlayCircle,
  Bookmark,
  User,
  X,
  Briefcase,
  Layers,
  Globe,
  Cpu,
  Info
} from 'lucide-react';

interface HomePublicPortalProps {
  appManifests: VitronisAppManifest[];
  onLaunchSSOForApp: (app: VitronisAppManifest) => void;
  onSimulateAppFlow: (app: VitronisAppManifest) => void;
  currentUser: VitronisUserPayload | null;
  setActiveTab: (tab: string) => void;
}

export const HomePublicPortal: React.FC<HomePublicPortalProps> = ({
  appManifests,
  onLaunchSSOForApp,
  onSimulateAppFlow,
  currentUser,
  setActiveTab
}) => {
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [modalTriggerAction, setModalTriggerAction] = useState<string>('Iniciar Simulado');
  const [activePreparatorioTab, setActivePreparatorioTab] = useState<'inicio' | 'manual' | 'simulados' | 'materiais'>('inicio');

  const minintApp = appManifests.find(a => a.app === 'preparatorio-minint') || appManifests[1] || appManifests[0];

  const handleTriggerProtectedAction = (actionName: string) => {
    setModalTriggerAction(actionName);
    setShowAuthModal(true);
  };

  const handleProceedToSSO = () => {
    setShowAuthModal(false);
    onLaunchSSOForApp(minintApp);
  };

  return (
    <div className="space-y-12 pb-12 max-w-5xl mx-auto">
      {/* 1. HERO SECTION - VITRONIS V1 MVP POSITIONING */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 text-center shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-28 bg-indigo-500/10 blur-[90px] pointer-events-none rounded-full" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-mono uppercase tracking-wider">VITRONIS TECNOLOGIAS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Tecnologia que cria <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">oportunidades</span>.
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Somos uma empresa angolana que desenvolve soluções digitais para educação, emprego e transformação digital.
        </p>

        <div className="mt-8 pt-6 border-t border-slate-800/80 max-w-md mx-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-2">
            Conheça nossa primeira solução disponível
          </span>
          <div className="w-8 h-1 bg-indigo-500 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* 2. MAIS DESTACADA SOLUÇÃO DISPONÍVEL - PREPARATÓRIO OFICIAL MININT */}
      <section className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-600/20 rounded-2xl border border-indigo-500/30">
              <ShieldCheck className="w-10 h-10 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                  ● DISPONÍVEL & ATIVO
                </span>
                <span className="text-slate-400 text-xs font-mono">preparatorio.vitronis.co.ao</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Preparatório Oficial MININT
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Solução tecnológica oficial desenvolvida para auxílio nos exames e simulados do Concurso Público do MININT.
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={() => handleTriggerProtectedAction('Acessar Plataforma')}
              className="w-full md:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
            >
              <span>ACESSAR AGORA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Manual Eletrónico</div>
              <div className="text-[10px] text-slate-400">Capítulos & Legislação</div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Conteúdos Atualizados</div>
              <div className="text-[10px] text-slate-400">Legislação Policial 2026</div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex items-center gap-3">
            <FileText className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Simulados Reais</div>
              <div className="text-[10px] text-slate-400">Gabarito com Explicações</div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex items-center gap-3">
            <Award className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Material Gratuito</div>
              <div className="text-[10px] text-slate-400">Acesso Aberto em Angola</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE PREPARATÓRIO EXPLORER (DENTRO DO PREPARATÓRIO) */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Demonstração Interativa da Solução</span>
            <h3 className="text-lg font-bold text-white mt-0.5">Explorar o Conteúdo do Preparatório Oficial MININT</h3>
          </div>

          {/* Subtabs inside Preparatorio */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActivePreparatorioTab('inicio')}
              className={`px-3 py-1.5 rounded-lg transition ${activePreparatorioTab === 'inicio' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActivePreparatorioTab('manual')}
              className={`px-3 py-1.5 rounded-lg transition ${activePreparatorioTab === 'manual' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Manual
            </button>
            <button
              onClick={() => setActivePreparatorioTab('simulados')}
              className={`px-3 py-1.5 rounded-lg transition ${activePreparatorioTab === 'simulados' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Simulados
            </button>
          </div>
        </div>

        {/* Content Tab: Visão Geral */}
        {activePreparatorioTab === 'inicio' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase font-mono">Módulo 1</span>
                <BookOpen className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="font-bold text-white text-sm">Legislação Policial & Constituição</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Estatuto dos Funcionários da Polícia Nacional, Direitos Humanos e Organização do MININT.
              </p>
              <button
                onClick={() => handleTriggerProtectedAction('Guardar Progresso da Legislação')}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-indigo-300 font-medium text-xs rounded-xl transition flex items-center justify-center gap-1"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Guardar Progresso</span>
              </button>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase font-mono">Módulo 2</span>
                <PlayCircle className="w-4 h-4 text-amber-400" />
              </div>
              <h4 className="font-bold text-white text-sm">Simulados Interativos Online</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Testes com tempo limite, perguntas idênticas ao exame oficial e explicação detalhada.
              </p>
              <button
                onClick={() => handleTriggerProtectedAction('Iniciar Simulado Completo')}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 shadow-md shadow-indigo-600/20"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                <span>Iniciar Simulado</span>
              </button>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase font-mono">Módulo 3</span>
                <Download className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="font-bold text-white text-sm">Manual PDF & Guia de Estudo</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Faça o download do material sintetizado para estudo offline e impressão em PDF.
              </p>
              <button
                onClick={() => handleTriggerProtectedAction('Baixar Manual PDF')}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-medium text-xs rounded-xl transition flex items-center justify-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar Manual</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Tab: Manual */}
        {activePreparatorioTab === 'manual' && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Manual Eletrónico Oficial — Sumário de Disciplinas</span>
              </h4>
              <span className="text-xs text-emerald-400 font-mono">Edição Atualizada 2026</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="p-3 bg-slate-900 rounded-xl flex items-center justify-between">
                <span>Capítulo 1: Lei Orgânica do Ministério do Interior (MININT)</span>
                <button
                  onClick={() => handleTriggerProtectedAction('Ler Capítulo 1')}
                  className="text-indigo-400 hover:underline font-semibold"
                >
                  Ler Capítulo ➔
                </button>
              </li>
              <li className="p-3 bg-slate-900 rounded-xl flex items-center justify-between">
                <span>Capítulo 2: Regulamento Disciplinar da Polícia Nacional de Angola</span>
                <button
                  onClick={() => handleTriggerProtectedAction('Ler Capítulo 2')}
                  className="text-indigo-400 hover:underline font-semibold"
                >
                  Ler Capítulo ➔
                </button>
              </li>
              <li className="p-3 bg-slate-900 rounded-xl flex items-center justify-between">
                <span>Capítulo 3: Noções Fundamentais de Direito Constitucional & Penal</span>
                <button
                  onClick={() => handleTriggerProtectedAction('Ler Capítulo 3')}
                  className="text-indigo-400 hover:underline font-semibold"
                >
                  Ler Capítulo ➔
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Content Tab: Simulados */}
        {activePreparatorioTab === 'simulados' && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Simulados Disponíveis</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-white text-xs">Simulado N.º 1 — Legislação Policial</div>
                <div className="text-[11px] text-slate-400">20 Perguntas • Tempo: 30 minutos</div>
                <button
                  onClick={() => handleTriggerProtectedAction('Iniciar Simulado 1')}
                  className="mt-2 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition"
                >
                  Iniciar Agora
                </button>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-white text-xs">Simulado N.º 2 — Cultura Geral & Direito</div>
                <div className="text-[11px] text-slate-400">30 Perguntas • Tempo: 45 minutos</div>
                <button
                  onClick={() => handleTriggerProtectedAction('Iniciar Simulado 2')}
                  className="mt-2 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition"
                >
                  Iniciar Agora
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. TECHNICAL ARCHITECTURE BANNER - EXPANDABLE FOR CONSOLE/ADMIN */}
      <section className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 text-slate-400 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-indigo-400 shrink-0" />
          <div>
            <span className="font-bold text-white block">Acompanhamento do Ecossistema Vitronis</span>
            <span className="text-slate-400 text-[11px]">
              Infraestrutura unificada: www, accounts, console, api e status sob o domínio <code className="text-indigo-300">vitronis.co.ao</code>.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('console')}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Console Admin OS</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. MODAL CONTINUAR GRATUITAMENTE (EXACT REQUESTED DIALOG & COPY) */}
      {/* ========================================================================= */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Close Button */}
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Acesso Gratuito Garantido</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white">
                Continue gratuitamente
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Você está a um passo de desbloquear todos os recursos do <strong>Preparatório Oficial MININT</strong>.
              </p>
            </div>

            {/* Coherent Narrative Box */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 font-bold text-white">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <span>Conta Vitronis & JobExpress Angola</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                O <strong>Preparatório Oficial MININT</strong> é uma solução desenvolvida pela <strong>JobExpress Angola</strong>, empresa de tecnologia do ecossistema <strong>Vitronis</strong>.
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Uma conta gratuita da JobExpress Angola dá acesso aos recursos completos do Preparatório Oficial MININT e às futuras soluções do ecossistema Vitronis.
              </p>
            </div>

            {/* Benefits Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Ao criar sua conta você terá acesso a:
              </span>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200 font-medium">
                <li className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Manual Eletrónico completo</span>
                </li>
                <li className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Simulados completos</span>
                </li>
                <li className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Histórico de desempenho</span>
                </li>
                <li className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Atualizações do conteúdo</span>
                </li>
                <li className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Certificados digitais</span>
                </li>
                <li className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Perfil profissional no JobExpress</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleProceedToSSO}
                className="w-full sm:flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
              >
                <span>Criar Conta Gratuita</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowAuthModal(false)}
                className="w-full sm:w-auto px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
