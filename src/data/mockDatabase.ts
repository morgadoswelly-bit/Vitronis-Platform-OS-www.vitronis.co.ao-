import { VitronisUserPayload, VitronisAppManifest, UniversalConfigFile, RenderDeployment, ReverseProxyRoute, FirestoreSchema, AuditLog } from '../types';

export const INITIAL_APP_MANIFESTS: VitronisAppManifest[] = [
  {
    app: 'jobexpress',
    name: 'JobExpress Angola',
    url: 'https://jobexpress.vitronis.co.ao',
    renderHost: 'https://jobexpress-angola.onrender.com',
    callbackUrl: 'https://jobexpress-angola.onrender.com/auth/callback',
    requiresAuthentication: true,
    minimumRole: 'user',
    description: 'Emprego, recrutamento e gestão curricular unificada em Angola.',
    category: 'emprego',
    icon: 'Briefcase',
    benefits: [
      'Provedor de Identidade Único para todo o Ecossistema Vitronis',
      'Perfil Profissional e Curricular Unificado em Angola',
      'Candidaturas a vagas com 1 clique',
      'Carteira Digital e Histórico de Certificados'
    ],
    subdomain: 'jobexpress.vitronis.co.ao',
    status: 'online',
    visibility: 'public',
    version: '1.0.2',
    latencyMs: 142,
    uptimePct: 99.98,
    lastDeployAt: '2026-07-22 18:40',
    activeSessionsCount: 1420
  },
  {
    app: 'preparatorio-minint',
    name: 'Preparatório MININT',
    url: 'https://preparatorio.vitronis.co.ao',
    renderHost: 'https://preparacao-oficial-minint-ckkm.onrender.com',
    callbackUrl: 'https://preparacao-oficial-minint-ckkm.onrender.com/auth/callback',
    requiresAuthentication: true,
    minimumRole: 'user',
    description: 'Simulados, materiais oficiais e preparação para o concurso do MININT.',
    category: 'educacao',
    icon: 'ShieldCheck',
    benefits: [
      'Simulados Interativos com Gabarito Comentado em Tempo Real',
      'Histórico de Desempenho e Estatísticas de Aprovação',
      'Certificados de Conclusão com Validação QR Code na Vitronis',
      'Acesso Imediato com a sua Conta Única Vitronis'
    ],
    subdomain: 'preparatorio.vitronis.co.ao',
    status: 'online',
    visibility: 'public',
    version: '2.1.0',
    latencyMs: 118,
    uptimePct: 99.95,
    lastDeployAt: '2026-07-23 09:12',
    activeSessionsCount: 2840
  },
  {
    app: 'kwanzamovel-ai',
    name: 'KwanzaMóvel AI',
    url: 'https://kwanzamovel.vitronis.co.ao',
    renderHost: 'https://kwanzam-vel-ai.onrender.com',
    callbackUrl: 'https://kwanzam-vel-ai.onrender.com/auth/callback',
    requiresAuthentication: true,
    minimumRole: 'user',
    description: 'Carteira digital, pagamentos instantâneos e liquidação em Kwanzas.',
    category: 'financas',
    icon: 'Wallet',
    benefits: [
      'Carteira Digital Integrada com Saldo em Kwanzas (Kz)',
      'Transferências Imediatas entre serviços Vitronis',
      'Pagamento de Inscrições e Certificados com 1 Clique',
      'Autenticação de Segurança Unificada VIAS 1.0'
    ],
    subdomain: 'kwanzamovel.vitronis.co.ao',
    status: 'online',
    visibility: 'public',
    version: '1.4.0',
    latencyMs: 95,
    uptimePct: 99.99,
    lastDeployAt: '2026-07-21 12:00',
    activeSessionsCount: 890
  },
  {
    app: 'justica360',
    name: 'Justiça360',
    url: 'https://justica360.vitronis.co.ao',
    renderHost: 'https://justica360.onrender.com',
    callbackUrl: 'https://justica360.vitronis.co.ao/auth/callback',
    requiresAuthentication: true,
    minimumRole: 'user',
    description: 'Gestão de processos jurídicos e certidões eletrónicas.',
    category: 'governo',
    icon: 'Scale',
    benefits: [
      'Acompanhamento de Processos e Pareceres Legais',
      'Assinatura Digital de Documentos com Identidade Vitronis',
      'Validação de Antecedentes e Certidões'
    ],
    subdomain: 'justica360.vitronis.co.ao',
    status: 'in_development',
    visibility: 'public',
    version: '0.9.1-beta',
    latencyMs: 210,
    uptimePct: 98.40,
    lastDeployAt: '2026-07-20 15:30',
    activeSessionsCount: 120
  },
  {
    app: 'sila-govos',
    name: 'Sila GovOS',
    url: 'https://govos.vitronis.co.ao',
    renderHost: 'https://sila-govos.onrender.com',
    callbackUrl: 'https://govos.vitronis.co.ao/auth/callback',
    requiresAuthentication: true,
    minimumRole: 'admin',
    description: 'Sistema operacional de administração pública e concursos estatais.',
    category: 'governo',
    icon: 'Building2',
    benefits: [
      'Integração Interministerial Unificada',
      'Painéis Analíticos com IA e Relatórios Oficiais',
      'Gestão de Quadros e Concursos do Estado'
    ],
    subdomain: 'govos.vitronis.co.ao',
    status: 'in_development',
    visibility: 'restricted',
    version: '0.8.0',
    latencyMs: 180,
    uptimePct: 99.10,
    lastDeployAt: '2026-07-19 11:15',
    activeSessionsCount: 45
  },
  {
    app: 'pnap-ao',
    name: 'PNAP.AO',
    url: 'https://pnap.vitronis.co.ao',
    renderHost: 'https://pnap-capacitacao.onrender.com',
    callbackUrl: 'https://pnap.vitronis.co.ao/auth/callback',
    requiresAuthentication: true,
    minimumRole: 'user',
    description: 'Programa Nacional de Apoio ao Profissional e Capacitação Técnica.',
    category: 'servicos',
    icon: 'GraduationCap',
    benefits: [
      'Cursos Técnicos Profissionalizantes',
      'Incentivos e Bolsas de Estudo para Jovens Angolanos',
      'Acesso Integrado a Oportunidades no JobExpress'
    ],
    subdomain: 'pnap.vitronis.co.ao',
    status: 'planned',
    visibility: 'public',
    version: '1.0.0-draft',
    latencyMs: 0,
    uptimePct: 100.0,
    lastDeployAt: 'Aguardando Lançamento',
    activeSessionsCount: 0
  }
];

export const MOCK_RENDER_DEPLOYMENTS: RenderDeployment[] = [
  {
    id: 'dep_job_001',
    appId: 'jobexpress',
    appName: 'JobExpress Angola',
    renderHost: 'https://jobexpress-angola.onrender.com',
    customDomain: 'jobexpress.vitronis.co.ao',
    commitHash: 'a89c2f1',
    branch: 'main',
    status: 'live',
    deployedAt: '2026-07-22 18:40:12',
    version: '1.0.2',
    triggeredBy: 'CI/CD GitHub Workflow'
  },
  {
    id: 'dep_min_002',
    appId: 'preparatorio-minint',
    appName: 'Preparatório MININT',
    renderHost: 'https://preparacao-oficial-minint-ckkm.onrender.com',
    customDomain: 'preparatorio.vitronis.co.ao',
    commitHash: '98bc1e4',
    branch: 'main',
    status: 'live',
    deployedAt: '2026-07-23 09:12:05',
    version: '2.1.0',
    triggeredBy: 'Manual Trigger via Console'
  },
  {
    id: 'dep_kwa_003',
    appId: 'kwanzamovel-ai',
    appName: 'KwanzaMóvel AI',
    renderHost: 'https://kwanzam-vel-ai.onrender.com',
    customDomain: 'kwanzamovel.vitronis.co.ao',
    commitHash: '77ea10c',
    branch: 'main',
    status: 'live',
    deployedAt: '2026-07-21 12:00:00',
    version: '1.4.0',
    triggeredBy: 'Webhook Render Web'
  }
];

export const MOCK_REVERSE_PROXY_ROUTES: ReverseProxyRoute[] = [
  {
    subdomain: 'www.vitronis.co.ao',
    domain: 'vitronis.co.ao',
    targetRenderHost: 'https://vitronis-platform-os.onrender.com',
    status: 'active',
    sslProvider: 'Cloudflare',
    lastPing: 'Agora mesmo',
    httpResponseCode: 200
  },
  {
    subdomain: 'accounts.vitronis.co.ao',
    domain: 'vitronis.co.ao',
    targetRenderHost: 'https://vitronis-platform-os.onrender.com/sso',
    status: 'active',
    sslProvider: 'Cloudflare',
    lastPing: 'Agora mesmo',
    httpResponseCode: 200
  },
  {
    subdomain: 'console.vitronis.co.ao',
    domain: 'vitronis.co.ao',
    targetRenderHost: 'https://vitronis-platform-os.onrender.com/admin',
    status: 'active',
    sslProvider: 'Cloudflare',
    lastPing: 'Agora mesmo',
    httpResponseCode: 200
  },
  {
    subdomain: 'jobexpress.vitronis.co.ao',
    domain: 'vitronis.co.ao',
    targetRenderHost: 'https://jobexpress-angola.onrender.com',
    status: 'active',
    sslProvider: 'Cloudflare',
    lastPing: '1 min atrás',
    httpResponseCode: 200
  },
  {
    subdomain: 'preparatorio.vitronis.co.ao',
    domain: 'vitronis.co.ao',
    targetRenderHost: 'https://preparacao-oficial-minint-ckkm.onrender.com',
    status: 'active',
    sslProvider: 'Cloudflare',
    lastPing: '30 seg atrás',
    httpResponseCode: 200
  },
  {
    subdomain: 'kwanzamovel.vitronis.co.ao',
    domain: 'vitronis.co.ao',
    targetRenderHost: 'https://kwanzam-vel-ai.onrender.com',
    status: 'active',
    sslProvider: 'Cloudflare',
    lastPing: '2 min atrás',
    httpResponseCode: 200
  }
];

export const MOCK_FIRESTORE_SCHEMAS: FirestoreSchema[] = [
  {
    collection: 'applications',
    recordCount: 6,
    lastUpdated: '2026-07-23 11:20',
    sampleRecord: { id: 'jobexpress', name: 'JobExpress Angola', renderHost: 'https://jobexpress-angola.onrender.com', status: 'online' }
  },
  {
    collection: 'users',
    recordCount: 14200,
    lastUpdated: '2026-07-23 11:50',
    sampleRecord: { uid: 'vit_usr_morgado', email: 'morgadoswelly@gmail.com', role: 'admin', walletKz: 250000 }
  },
  {
    collection: 'roles',
    recordCount: 5,
    lastUpdated: '2026-07-01 00:00',
    sampleRecord: { role: 'admin', permissions: ['*'] }
  },
  {
    collection: 'sessions',
    recordCount: 3890,
    lastUpdated: 'Agora mesmo',
    sampleRecord: { sessionId: 'sess_9912', userId: 'vit_usr_morgado', app: 'preparatorio-minint', expiresAt: '2026-07-30' }
  },
  {
    collection: 'audit_logs',
    recordCount: 89200,
    lastUpdated: 'Agora mesmo',
    sampleRecord: { action: 'SSO_LOGIN', user: 'morgadoswelly@gmail.com', app: 'preparatorio-minint', ip: '102.218.42.1' }
  },
  {
    collection: 'deployments',
    recordCount: 42,
    lastUpdated: '2026-07-23 09:12',
    sampleRecord: { appId: 'preparatorio-minint', renderHost: 'https://preparacao-oficial-minint-ckkm.onrender.com', status: 'live' }
  },
  {
    collection: 'domains',
    recordCount: 12,
    lastUpdated: '2026-07-22 10:00',
    sampleRecord: { subdomain: 'preparatorio.vitronis.co.ao', target: 'https://preparacao-oficial-minint-ckkm.onrender.com' }
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_001',
    actor: 'morgadoswelly@gmail.com',
    action: 'REVERSE_PROXY_SYNC',
    targetApp: 'JobExpress Angola',
    ip: '102.218.42.11',
    timestamp: '2026-07-23 11:45:10',
    status: 'success',
    details: 'Rota proxy jobexpress.vitronis.co.ao re-verificada com sucesso (HTTP 200)'
  },
  {
    id: 'log_002',
    actor: 'candidato.minint@gmail.com',
    action: 'SSO_JWT_ISSUED',
    targetApp: 'Preparatório MININT',
    ip: '197.231.10.4',
    timestamp: '2026-07-23 11:40:22',
    status: 'success',
    details: 'Token de Identidade Única assinado por accounts.vitronis.co.ao'
  },
  {
    id: 'log_003',
    actor: 'system.render.webhook',
    action: 'RENDER_DEPLOY_HEALTH_CHECK',
    targetApp: 'KwanzaMóvel AI',
    ip: '35.192.12.8',
    timestamp: '2026-07-23 11:30:00',
    status: 'success',
    details: 'Instância Render saudável (Latency: 95ms, CPU: 12%, Mem: 180MB)'
  }
];

export const DEMO_USERS: VitronisUserPayload[] = [
  {
    uid: 'vit_usr_morgado',
    email: 'morgadoswelly@gmail.com',
    name: 'Morgado Swelly',
    role: 'admin',
    permissions: [
      'vitronis:admin',
      'jobexpress:manage',
      'minint:simulados_full',
      'kwanzamovel:transactions',
      'justica360:read'
    ],
    company: 'Vitronis Tecnologias Lda',
    tenant: 'vitronis_main',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    phone: '+244 923 456 789',
    nif: '005849301LA042',
    wallet: {
      balanceKz: 250000,
      currency: 'AOA (Kz)',
      accountNumber: 'AO06.0040.0000.8921.4019.1018.1'
    },
    certificates: [
      {
        id: 'cert_minint_001',
        title: 'Certificado de Excelência em Simulados MININT 2026',
        issuerApp: 'Preparatório MININT',
        issuedAt: '2026-06-15',
        code: 'VIT-MININT-98421'
      },
      {
        id: 'cert_jobexpress_002',
        title: 'Acreditação Profissional de Desenvolvimento de Software',
        issuerApp: 'JobExpress Angola',
        issuedAt: '2026-05-10',
        code: 'VIT-JOB-44102'
      }
    ],
    history: [
      {
        id: 'hist_101',
        app: 'Preparatório MININT',
        action: 'Conclusão do Simulado 4 - Legislação Policial',
        timestamp: '2026-07-22 14:30',
        details: 'Pontuação: 95/100 (Aprovado)'
      },
      {
        id: 'hist_102',
        app: 'KwanzaMóvel AI',
        action: 'Pagamento de Taxa de Inscrição Simulado',
        timestamp: '2026-07-22 14:25',
        details: 'Valor: 2.500 Kz (Debitado com sucesso)'
      },
      {
        id: 'hist_103',
        app: 'JobExpress Angola',
        action: 'Login Unificado via VIAS 1.0 SSO',
        timestamp: '2026-07-22 14:20',
        details: 'Origem: accounts.vitronis.co.ao'
      }
    ]
  },
  {
    uid: 'vit_usr_candidato',
    email: 'candidato.minint@gmail.com',
    name: 'Manuel António Kiala',
    role: 'candidate',
    permissions: [
      'minint:simulados_basic',
      'jobexpress:apply',
      'kwanzamovel:pay'
    ],
    company: 'Independente',
    tenant: 'minint_candidates',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    phone: '+244 945 112 334',
    nif: '008912304LA011',
    wallet: {
      balanceKz: 45000,
      currency: 'AOA (Kz)',
      accountNumber: 'AO06.0040.0000.1102.3049.2011.8'
    },
    certificates: [
      {
        id: 'cert_minint_003',
        title: 'Certificado de Preparação Inicial MININT',
        issuerApp: 'Preparatório MININT',
        issuedAt: '2026-07-01',
        code: 'VIT-MININT-10293'
      }
    ],
    history: [
      {
        id: 'hist_104',
        app: 'Preparatório MININT',
        action: 'Conclusão de Simulado Geral de Conhecimentos',
        timestamp: '2026-07-20 10:15',
        details: 'Pontuação: 82/100 (Aprovado)'
      }
    ]
  },
  {
    uid: 'vit_usr_estudante',
    email: 'ana.silva@vitronis.co.ao',
    name: 'Ana Maria Silva',
    role: 'student',
    permissions: [
      'minint:simulados_basic',
      'pnap:courses_read',
      'jobexpress:view_jobs'
    ],
    company: 'Universidade Agostinho Neto',
    tenant: 'student_network',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    phone: '+244 912 887 665',
    nif: '002381902LA099',
    wallet: {
      balanceKz: 18500,
      currency: 'AOA (Kz)',
      accountNumber: 'AO06.0040.0000.5512.9901.8821.3'
    },
    certificates: [],
    history: []
  }
];

export function getUniversalConfig(appId: string): UniversalConfigFile {
  const manifests = INITIAL_APP_MANIFESTS;
  const targetManifest = manifests.find(m => m.app === appId) || manifests[0];

  return {
    version: 'VIAS-1.0',
    issuer: 'https://accounts.vitronis.co.ao',
    app_manifest: targetManifest,
    standard_routes: {
      login: '/auth/login',
      logout: '/auth/logout',
      callback: '/auth/callback',
      verify: 'https://accounts.vitronis.co.ao/api/v1/auth/verify'
    },
    ecosystem: {
      hub_url: 'https://www.vitronis.co.ao',
      jobexpress_url: 'https://jobexpress-angola.onrender.com',
      minint_url: 'https://preparacao-oficial-minint-ckkm.onrender.com',
      kwanzamovel_url: 'https://kwanzam-vel-ai.onrender.com'
    }
  };
}
