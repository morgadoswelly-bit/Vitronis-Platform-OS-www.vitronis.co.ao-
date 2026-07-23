/**
 * Vitronis SSO Identity Provider & Ecosystem Manager (VIAS 1.0)
 * Apache-2.0 License - Vitronis Tecnologias Lda
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePublicPortal } from './components/HomePublicPortal';
import { AdminConsole } from './components/AdminConsole';
import { StatusPage } from './components/StatusPage';
import { CentralSSOPortal } from './components/CentralSSOPortal';
import { SSOInteractiveSimulator } from './components/SSOInteractiveSimulator';
import { UserPassport } from './components/UserPassport';
import { VIASDeveloperHub } from './components/VIASDeveloperHub';

import { VitronisAppManifest, VitronisUserPayload } from './types';
import { INITIAL_APP_MANIFESTS, DEMO_USERS } from './data/mockDatabase';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [appManifests, setAppManifests] = useState<VitronisAppManifest[]>(INITIAL_APP_MANIFESTS);
  const [currentUser, setCurrentUser] = useState<VitronisUserPayload | null>(DEMO_USERS[0]);
  const [targetAppForSSO, setTargetAppForSSO] = useState<string>('preparatorio-minint');
  const [targetReturnUrlForSSO, setTargetReturnUrlForSSO] = useState<string>('https://preparacao-oficial-minint-ckkm.onrender.com/simulado/4-legislacao-policial');

  // Fetch registered manifests on mount from backend if available
  useEffect(() => {
    fetch('/api/v1/apps/manifests')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.manifests)) {
          setAppManifests(data.manifests);
        }
      })
      .catch(() => {
        // Fallback to local memory if offline
      });
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('vitronis_access_token');
  };

  const handleSelectUser = (user: VitronisUserPayload) => {
    setCurrentUser(user);
  };

  const handleLaunchSSOForApp = (app: VitronisAppManifest) => {
    setTargetAppForSSO(app.app);
    setTargetReturnUrlForSSO(app.callbackUrl || app.url);
    setActiveTab('sso');
  };

  const handleSimulateAppFlow = (app: VitronisAppManifest) => {
    setTargetAppForSSO(app.app);
    setActiveTab('simulator');
  };

  const handleLoginSuccess = (user: VitronisUserPayload, token: string, redirectUrl?: string) => {
    setCurrentUser(user);
    localStorage.setItem('vitronis_access_token', token);
  };

  const handleRegisterManifest = (manifest: VitronisAppManifest) => {
    setAppManifests(prev => {
      const idx = prev.findIndex(m => m.app === manifest.app);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = manifest;
        return copy;
      }
      return [...prev, manifest];
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        onSelectUser={handleSelectUser}
        demoUsers={DEMO_USERS}
      />

      {/* Main View Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          <HomePublicPortal
            appManifests={appManifests}
            onLaunchSSOForApp={handleLaunchSSOForApp}
            onSimulateAppFlow={handleSimulateAppFlow}
            currentUser={currentUser}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'console' && (
          <AdminConsole
            appManifests={appManifests}
            onRegisterManifest={handleRegisterManifest}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'status' && (
          <StatusPage appManifests={appManifests} />
        )}

        {activeTab === 'sso' && (
          <CentralSSOPortal
            appManifests={appManifests}
            initialAppId={targetAppForSSO}
            initialReturnUrl={targetReturnUrlForSSO}
            currentUser={currentUser}
            onLoginSuccess={handleLoginSuccess}
            demoUsers={DEMO_USERS}
          />
        )}

        {activeTab === 'simulator' && (
          <SSOInteractiveSimulator
            appManifests={appManifests}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'passport' && (
          <UserPassport currentUser={currentUser} />
        )}

        {activeTab === 'devhub' && (
          <VIASDeveloperHub
            appManifests={appManifests}
            onRegisterManifest={handleRegisterManifest}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-400 space-y-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">VITRONIS TECNOLOGIAS</span>
            <span>•</span>
            <span className="text-slate-400">www.vitronis.co.ao</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>accounts.vitronis.co.ao</span>
            <span>console.vitronis.co.ao</span>
            <span>api.vitronis.co.ao</span>
            <span>status.vitronis.co.ao</span>
          </div>

          <div>
            © {new Date().getFullYear()} Vitronis Tecnologias Lda • VIAS 1.0 Operating System
          </div>
        </div>
      </footer>
    </div>
  );
}
