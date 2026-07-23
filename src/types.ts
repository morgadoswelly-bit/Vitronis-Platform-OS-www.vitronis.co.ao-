/**
 * VIAS 1.0 - Vitronis Identity & Application Standard Types
 */

export interface VitronisUserPayload {
  uid: string;
  email: string;
  name: string;
  role: 'user' | 'candidate' | 'student' | 'employer' | 'admin';
  permissions: string[];
  company?: string;
  tenant?: string;
  avatar?: string;
  phone?: string;
  nif?: string;
  
  // Cross-ecosystem unified features
  wallet?: {
    balanceKz: number;
    currency: string;
    accountNumber: string;
  };
  certificates?: Array<{
    id: string;
    title: string;
    issuerApp: string;
    issuedAt: string;
    code: string;
  }>;
  history?: Array<{
    id: string;
    app: string;
    action: string;
    timestamp: string;
    details: string;
  }>;

  iat?: number;
  exp?: number;
}

export interface VitronisAppManifest {
  app: string; // Identifier e.g. 'preparatorio-minint'
  name: string; // e.g. 'Preparatório MININT'
  url: string; // Base URL e.g. 'https://preparacao-oficial-minint-ckkm.onrender.com'
  callbackUrl: string; // Callback e.g. 'https://preparacao-oficial-minint-ckkm.onrender.com/auth/callback'
  requiresAuthentication: boolean;
  minimumRole: 'user' | 'candidate' | 'student' | 'employer' | 'admin';
  description: string;
  category: 'educacao' | 'emprego' | 'financas' | 'governo' | 'servicos';
  icon: string;
  benefits: string[];
  subdomain?: string;
  renderHost?: string;
  status: 'active' | 'in_development' | 'planned' | 'online' | 'degraded' | 'offline';
  visibility?: 'public' | 'private' | 'restricted';
  version?: string;
  latencyMs?: number;
  uptimePct?: number;
  lastDeployAt?: string;
  activeSessionsCount?: number;
}

export interface RenderDeployment {
  id: string;
  appId: string;
  appName: string;
  renderHost: string;
  customDomain: string;
  commitHash: string;
  branch: string;
  status: 'live' | 'building' | 'failed' | 'canceled';
  deployedAt: string;
  version: string;
  triggeredBy: string;
}

export interface ReverseProxyRoute {
  subdomain: string;
  domain: string;
  targetRenderHost: string;
  status: 'active' | 'pending_dns' | 'ssl_provisioning';
  sslProvider: 'Cloudflare' | 'Let\'s Encrypt';
  lastPing: string;
  httpResponseCode: number;
}

export interface FirestoreSchema {
  collection: 'applications' | 'users' | 'roles' | 'permissions' | 'sessions' | 'audit_logs' | 'deployments' | 'domains' | 'menus' | 'settings' | 'notifications';
  recordCount: number;
  lastUpdated: string;
  sampleRecord: Record<string, any>;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  targetApp: string;
  ip: string;
  timestamp: string;
  status: 'success' | 'warning' | 'denied';
  details: string;
}

export interface SSORequestParams {
  app: string;
  redirect_uri?: string;
  return_url?: string;
  client_id?: string;
  prompt?: 'login' | 'signup' | 'select_account';
  state?: string;
}

export interface SSOTokenResponse {
  success: boolean;
  access_token: string;
  token_type: 'Bearer';
  expires_in: number; // in seconds (e.g. 86400)
  user: VitronisUserPayload;
  app_manifest?: VitronisAppManifest;
  redirect_to?: string;
}

export interface UniversalConfigFile {
  version: 'VIAS-1.0';
  issuer: string; // e.g. 'https://accounts.vitronis.co.ao'
  jwt_secret_hash?: string;
  app_manifest: VitronisAppManifest;
  standard_routes: {
    login: string;
    logout: string;
    callback: string;
    verify: string;
  };
  ecosystem: {
    hub_url: string;
    jobexpress_url: string;
    minint_url: string;
    kwanzamovel_url: string;
  };
}
