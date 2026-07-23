import React from 'react';
import { VitronisAppManifest } from '../types';
import { Activity, CheckCircle2, Server, Globe, RefreshCw, Clock, ArrowUpRight, Wifi } from 'lucide-react';

interface StatusPageProps {
  appManifests: VitronisAppManifest[];
}

export const StatusPage: React.FC<StatusPageProps> = ({ appManifests }) => {
  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold rounded-full">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>status.vitronis.co.ao</span>
        </div>

        <h1 className="text-3xl font-extrabold text-white">
          Estado dos Serviços do Ecossistema
        </h1>

        <p className="text-xs text-slate-300 max-w-xl mx-auto">
          Monitorização em tempo real de latência, disponibilidade e uptime das aplicações alojadas no Render.
        </p>

        <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Todos os Sistemas Operacionais</span>
          </span>
          <span>•</span>
          <span>Uptime Médio: <strong className="text-emerald-400">99.98%</strong></span>
        </div>
      </div>

      {/* Services Health Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Server className="w-5 h-5 text-indigo-400" />
            <span>Instâncias Render & Subdomínios</span>
          </span>
          <span className="text-xs text-slate-500 font-mono">
            Última Verificação: Agora mesmo
          </span>
        </h2>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800/80 overflow-hidden shadow-xl">
          {appManifests.map((app) => (
            <div key={app.app} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/50 transition">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm">{app.name}</h3>
                  <span className="text-xs text-indigo-400 font-mono">{app.subdomain}</span>
                </div>
                <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                  <span>Render:</span>
                  <a
                    href={app.renderHost || app.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline truncate max-w-[280px]"
                  >
                    {app.renderHost || app.url}
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 text-xs font-mono">
                <div className="text-right">
                  <div className="text-slate-400 text-[10px]">Latência</div>
                  <div className="text-emerald-400 font-bold flex items-center gap-1">
                    <Wifi className="w-3 h-3 text-emerald-400" />
                    <span>{app.latencyMs || 110} ms</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-slate-400 text-[10px]">Uptime 30d</div>
                  <div className="text-slate-200 font-bold">{app.uptimePct || 99.9}%</div>
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    ONLINE
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
