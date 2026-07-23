import React, { useState } from 'react';
import { VitronisAppManifest, VitronisUserPayload } from '../types';
import { 
  Play, CheckCircle2, AlertCircle, ArrowRight, RefreshCw, Key, ShieldCheck, 
  ExternalLink, Layers, Lock, Cpu, Eye, Code, FileText, Check, CornerDownRight
} from 'lucide-react';

interface SSOInteractiveSimulatorProps {
  appManifests: VitronisAppManifest[];
  currentUser: VitronisUserPayload | null;
}

export const SSOInteractiveSimulator: React.FC<SSOInteractiveSimulatorProps> = ({
  appManifests,
  currentUser
}) => {
  const [selectedAppId, setSelectedAppId] = useState<string>('preparatorio-minint');
  const [targetPath, setTargetPath] = useState<string>('/simulado/4-legislacao-policial');
  const [step, setStep] = useState<number>(1);
  const [token, setToken] = useState<string | null>(null);
  const [simulatedLogs, setSimulatedLogs] = useState<Array<{ time: string; msg: string; type: 'info' | 'warn' | 'success' }>>([]);
  const [verifiedUserData, setVerifiedUserData] = useState<VitronisUserPayload | null>(null);

  const activeApp = appManifests.find(m => m.app === selectedAppId) || appManifests[0];
  const fullTargetUrl = `${activeApp.url}${targetPath}`;

  const addLog = (msg: string, type: 'info' | 'warn' | 'success' = 'info') => {
    const time = new Date().toLocaleTimeString('pt-AO');
    setSimulatedLogs(prev => [{ time, msg, type }, ...prev]);
  };

  const handleStartSimulation = () => {
    setStep(1);
    setToken(null);
    setVerifiedUserData(null);
    setSimulatedLogs([]);
    addLog(`Utilizador tentou aceder a: ${fullTargetUrl}`, 'info');
    addLog(`Verificando sessão local em ${activeApp.name}...`, 'info');
  };

  const handleCheckTokenStep = () => {
    if (!token) {
      addLog(`❌ Nenhuma sessão local encontrada em ${activeApp.name}. Token ausente.`, 'warn');
      addLog(`⚡ VIAS 1.0 Interceptador ativado! Redirecionando para accounts.vitronis.co.ao...`, 'warn');
      setStep(2);
    } else {
      addLog(`✅ Token local encontrado. Validando...`, 'success');
      setStep(4);
    }
  };

  const handleAuthenticateSSOStep = async () => {
    addLog(`Conectando com o Provedor Central de Identidade JobExpress / Vitronis...`, 'info');

    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentUser ? currentUser.email : 'morgadoswelly@gmail.com',
          password: 'demopassword',
          app: selectedAppId,
          returnUrl: fullTargetUrl
        })
      });

      const data = await res.json();
      if (data.success && data.access_token) {
        setToken(data.access_token);
        addLog(`✅ SSO Autenticado com Sucesso! Bearer JWT emitido pelo accounts.vitronis.co.ao`, 'success');
        addLog(`Redirecionando de volta para: ${data.redirect_to}`, 'info');
        setStep(3);
      }
    } catch (err) {
      addLog(`Erro ao simular autenticação.`, 'warn');
    }
  };

  const handleCallbackReturnStep = async () => {
    addLog(`Callback recebido em ${activeApp.name}/auth/callback`, 'info');
    addLog(`Enviando token para verificação em /api/v1/auth/verify...`, 'info');

    if (!token) return;

    try {
      const res = await fetch('/api/v1/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (data.valid && data.user) {
        setVerifiedUserData(data.user);
        addLog(`✅ Token verificado com sucesso pelo contrato VIAS 1.0!`, 'success');
        addLog(`🎉 Simulado 4 Desbloqueado! Utilizador voltou exatamente à página de origem.`, 'success');
        setStep(4);
      }
    } catch (err) {
      addLog(`Falha na verificação do token.`, 'warn');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full mb-2">
              <Cpu className="w-3.5 h-3.5" /> Sandbox de Teste de Fluxo VIAS 1.0
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Simulador Interativo de SSO em Direto
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Teste exatamente a jornada do utilizador entre as suas aplicações deployed no Render
            </p>
          </div>

          <button
            onClick={handleStartSimulation}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-2 shadow-lg shadow-indigo-600/30 self-start md:self-auto"
          >
            <RefreshCw className="w-4 h-4" /> Reiniciar Simulação
          </button>
        </div>

        {/* Configuration Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="space-y-1">
            <label className="text-slate-400 font-mono">1. Escolher Aplicação Solicitante:</label>
            <select
              value={selectedAppId}
              onChange={(e) => {
                setSelectedAppId(e.target.value);
                if (e.target.value === 'preparatorio-minint') setTargetPath('/simulado/4-legislacao-policial');
                else if (e.target.value === 'kwanzamovel-ai') setTargetPath('/transferir-saldo');
                else setTargetPath('/vagas/desenvolvedor-software');
              }}
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2 font-mono"
            >
              {appManifests.map(m => (
                <option key={m.app} value={m.app}>{m.name} ({m.url})</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-mono">2. Página de Destino do Utilizador:</label>
            <input
              type="text"
              value={targetPath}
              onChange={(e) => setTargetPath(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Step Tracker Visualiser */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Step 1 */}
        <div className={`p-5 rounded-2xl border transition ${
          step === 1 ? 'bg-indigo-950/80 border-indigo-500 shadow-xl' : 'bg-slate-900 border-slate-800 opacity-80'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-[10px] font-bold font-mono text-indigo-400 uppercase">Passo 1</span>
            <span className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-indigo-500' : 'bg-slate-700'}`} />
          </div>
          <h3 className="font-bold text-white text-sm mt-3">Tentativa de Acesso</h3>
          <p className="text-xs text-slate-300 mt-1">
            Utilizador entra em <code className="text-indigo-300 font-mono">{targetPath}</code> sem token.
          </p>
          {step === 1 && (
            <button
              onClick={handleCheckTokenStep}
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1.5"
            >
              Executar Checagem <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Step 2 */}
        <div className={`p-5 rounded-2xl border transition ${
          step === 2 ? 'bg-indigo-950/80 border-indigo-500 shadow-xl' : 'bg-slate-900 border-slate-800 opacity-80'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-[10px] font-bold font-mono text-amber-400 uppercase">Passo 2</span>
            <span className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-amber-500' : 'bg-slate-700'}`} />
          </div>
          <h3 className="font-bold text-white text-sm mt-3">Redirecionar para SSO</h3>
          <p className="text-xs text-slate-300 mt-1">
            Abre <code className="text-amber-300 font-mono">accounts.vitronis.co.ao</code> com o manifesto do {activeApp.name}.
          </p>
          {step === 2 && (
            <button
              onClick={handleAuthenticateSSOStep}
              className="mt-4 w-full bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1.5"
            >
              Simular Autenticação SSO <Key className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Step 3 */}
        <div className={`p-5 rounded-2xl border transition ${
          step === 3 ? 'bg-indigo-950/80 border-indigo-500 shadow-xl' : 'bg-slate-900 border-slate-800 opacity-80'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-[10px] font-bold font-mono text-cyan-400 uppercase">Passo 3</span>
            <span className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-cyan-500' : 'bg-slate-700'}`} />
          </div>
          <h3 className="font-bold text-white text-sm mt-3">Callback com Token</h3>
          <p className="text-xs text-slate-300 mt-1">
            Redireciona para <code className="text-cyan-300 font-mono">/auth/callback</code> com Bearer JWT.
          </p>
          {step === 3 && (
            <button
              onClick={handleCallbackReturnStep}
              className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1.5"
            >
              Processar Callback <Check className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Step 4 */}
        <div className={`p-5 rounded-2xl border transition ${
          step === 4 ? 'bg-emerald-950/80 border-emerald-500 shadow-xl' : 'bg-slate-900 border-slate-800 opacity-80'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-[10px] font-bold font-mono text-emerald-400 uppercase">Passo 4</span>
            <span className={`w-3 h-3 rounded-full ${step === 4 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
          </div>
          <h3 className="font-bold text-white text-sm mt-3">Acesso Liberado</h3>
          <p className="text-xs text-slate-300 mt-1">
            Sessão validada! Utilizador acede ao recurso sem perder o estado.
          </p>
          {step === 4 && (
            <div className="mt-4 bg-emerald-500/20 text-emerald-300 text-xs font-bold p-2 rounded-xl text-center border border-emerald-500/30">
              ✓ Fluxo Concluído com Sucesso!
            </div>
          )}
        </div>
      </div>

      {/* Console Log & Verified Token Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Console Log */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-indigo-400" /> Log da Transação VIAS 1.0
            </span>
            <button
              onClick={() => setSimulatedLogs([])}
              className="text-[10px] text-slate-500 hover:text-slate-300"
            >
              Limpar Logs
            </button>
          </div>

          <div className="h-64 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
            {simulatedLogs.length === 0 ? (
              <div className="text-slate-600 text-center py-12 italic">
                Clique no botão "Executar Checagem" para iniciar o fluxo em direto...
              </div>
            ) : (
              simulatedLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg border leading-relaxed ${
                    log.type === 'success'
                      ? 'bg-emerald-950/40 text-emerald-300 border-emerald-900/50'
                      : log.type === 'warn'
                      ? 'bg-amber-950/40 text-amber-300 border-amber-900/50'
                      : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  <span className="text-slate-500 text-[10px] mr-2">[{log.time}]</span>
                  <span>{log.msg}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Verified User Payload Inspector */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-xs flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-emerald-400" /> Reivindicações do Token Verificado (Identity Payload)
            </h3>
            <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">
              VIS-1.0 Payload
            </span>
          </div>

          {verifiedUserData ? (
            <div className="space-y-3 font-mono text-xs">
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-emerald-300 overflow-x-auto">
                <pre>{JSON.stringify(verifiedUserData, null, 2)}</pre>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-sans">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">User ID:</span>
                  <span className="font-mono text-white">{verifiedUserData.uid}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">E-mail:</span>
                  <span className="font-mono text-white">{verifiedUserData.email}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500 text-xs">
              Complete a simulação para visualizar a carga útil de identidade verificada.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
