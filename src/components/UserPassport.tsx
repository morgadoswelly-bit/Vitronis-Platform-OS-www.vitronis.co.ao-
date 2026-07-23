import React from 'react';
import { VitronisUserPayload } from '../types';
import { 
  UserCheck, ShieldCheck, Wallet, Award, History, Lock, CheckCircle2, 
  ExternalLink, Sparkles, Copy, Key, ArrowUpRight, ArrowDownLeft
} from 'lucide-react';

interface UserPassportProps {
  currentUser: VitronisUserPayload | null;
}

export const UserPassport: React.FC<UserPassportProps> = ({ currentUser }) => {
  if (!currentUser) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-white space-y-4 max-w-xl mx-auto my-12">
        <UserCheck className="w-12 h-12 text-indigo-400 mx-auto" />
        <h2 className="text-xl font-bold">Nenhum Passaporte Ativo Selecionado</h2>
        <p className="text-xs text-slate-400">
          Faça login no Portal SSO ou selecione um perfil de demonstração no cabeçalho superior para visualizar o Passaporte Único Vitronis.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Passport Identity Card */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-700/60 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <ShieldCheck className="w-64 h-64 text-indigo-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-500/50 shadow-xl"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{currentUser.name}</h1>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> VIAS 1.0 Verificado
                </span>
              </div>
              <div className="text-xs text-indigo-200 font-mono">{currentUser.email}</div>
              <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <span>UID: <strong className="text-slate-200">{currentUser.uid}</strong></span>
                <span>•</span>
                <span>Empresa: <strong className="text-slate-200">{currentUser.company || 'Independente'}</strong></span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-right space-y-1 min-w-[200px]">
            <span className="text-[10px] text-slate-400 font-mono uppercase block">Status de Acesso</span>
            <div className="text-sm font-bold text-emerald-400 flex items-center justify-end gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Sessão SSO Ativa
            </div>
            <span className="text-[11px] text-indigo-300 font-mono block pt-1">
              Provedor: accounts.vitronis.co.ao
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Wallet, Certificates, and Ecosystem History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KwanzaMóvel Integrated Wallet */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Wallet className="w-5 h-5 text-emerald-400" />
              Carteira KwanzaMóvel AI
            </h2>
            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
              Saldo Unificado
            </span>
          </div>

          <div className="bg-gradient-to-br from-emerald-950 to-slate-950 border border-emerald-800/60 rounded-2xl p-5 space-y-2 text-white">
            <span className="text-xs text-emerald-300 font-mono">Saldo Disponível no Ecossistema</span>
            <div className="text-3xl font-black text-emerald-400">
              {currentUser.wallet?.balanceKz.toLocaleString('pt-AO')} <span className="text-lg font-bold text-emerald-300">Kz</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-emerald-900/50 truncate">
              IBAN/Conta: {currentUser.wallet?.accountNumber || 'AO06.0040.0000.1002.3901.1'}
            </div>
          </div>

          <div className="text-xs text-slate-300 space-y-2">
            <span className="font-semibold text-white block">Serviços Habilitados:</span>
            <ul className="space-y-1 text-slate-400 text-[11px]">
              <li className="flex items-center gap-1.5">✓ Pagamento de inscrições de simulados MININT</li>
              <li className="flex items-center gap-1.5">✓ Emissão instantânea de Certificados Vitronis</li>
              <li className="flex items-center gap-1.5">✓ Transferências imediatas no ecossistema</li>
            </ul>
          </div>
        </div>

        {/* Unified Certificates */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Certificados do Ecossistema ({currentUser.certificates?.length || 0})
            </h2>
            <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
              Validado QR Code
            </span>
          </div>

          <div className="space-y-3">
            {currentUser.certificates && currentUser.certificates.length > 0 ? (
              currentUser.certificates.map(cert => (
                <div key={cert.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 space-y-1.5">
                  <div className="text-xs font-bold text-amber-300">{cert.title}</div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Emissor: <strong className="text-slate-200">{cert.issuerApp}</strong></span>
                    <span className="font-mono text-slate-500">{cert.issuedAt}</span>
                  </div>
                  <div className="text-[10px] font-mono bg-slate-900 p-1.5 rounded border border-slate-800 text-indigo-300 flex items-center justify-between">
                    <span>Código: {cert.code}</span>
                    <span className="text-emerald-400 font-bold">VÁLIDO</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 text-xs italic">
                Nenhum certificado emitido ainda. Complete simulados no Preparatório MININT para obter a sua certificação.
              </div>
            )}
          </div>
        </div>

        {/* Activity Log across apps */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <History className="w-5 h-5 text-cyan-400" />
              Histórico Cross-App
            </h2>
            <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">
              Auditoria
            </span>
          </div>

          <div className="space-y-3">
            {currentUser.history && currentUser.history.length > 0 ? (
              currentUser.history.map(item => (
                <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-3 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-300">{item.app}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{item.timestamp}</span>
                  </div>
                  <div className="text-xs text-white font-medium">{item.action}</div>
                  <div className="text-[10px] text-slate-400">{item.details}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 text-xs italic">
                Sem histórico recente registrado.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
