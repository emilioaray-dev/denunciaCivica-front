import type { CasePublic, CaseDetail, CaseCategory, CaseStatus, TrackingResult } from '@/types';
import type { AuthUser } from '@/types';

// ─── Cases (public, verified) ────────────────────────────────────────

export const MOCK_CASES: CasePublic[] = [
  {
    id: 'c001',
    detaineeName: 'Carlos Mendoza',
    detaineeAge: 28,
    detentionDate: '2026-01-15',
    residenceCity: 'Caracas',
    detentionLocation: 'Frente al Palacio Federal Legislativo, Caracas',
    detentionCenter: 'El Helicoide, SEBIN, Caracas',
    category: 'peaceful_protest',
    summary:
      'Detenido durante manifestación pacífica frente al Palacio Federal Legislativo. Testigos reportan uso excesivo de fuerza por parte de efectivos de seguridad del Estado.',
    status: 'verified',
    isAnonymized: false,
    supportCount: 142,
    publishedAt: '2026-01-20T14:30:00Z',
  },
  {
    id: 'c002',
    detaineeName: 'Identidad protegida',
    detaineeAge: 34,
    detentionDate: '2026-01-18',
    residenceCity: 'Barquisimeto',
    detentionLocation: 'Domicilio particular, Barquisimeto, Lara',
    detentionCenter: 'SEBIN, Barquisimeto',
    category: 'journalism',
    summary:
      'Periodista detenido en su domicilio por publicar investigación sobre irregularidades en procesos electorales. Permanece incomunicado desde su detención.',
    status: 'verified',
    isAnonymized: true,
    supportCount: 89,
    publishedAt: '2026-01-22T10:00:00Z',
  },
  {
    id: 'c003',
    detaineeName: 'María Elena Gutiérrez',
    detaineeAge: 45,
    detentionDate: '2026-01-10',
    residenceCity: 'Mérida',
    detentionLocation: 'Centro comunitario Los Andes, Mérida',
    detentionCenter: 'Internado Judicial de Mérida',
    category: 'human_rights',
    summary:
      'Defensora de derechos humanos detenida tras organizar taller sobre derechos civiles en su comunidad. Familiares reportan que no se le permite acceso a representación legal.',
    status: 'verified',
    isAnonymized: false,
    supportCount: 215,
    publishedAt: '2026-01-16T08:45:00Z',
  },
  {
    id: 'c004',
    detaineeName: 'Andrés Felipe Rojas',
    detaineeAge: 21,
    detentionDate: '2026-02-01',
    residenceCity: 'Maracaibo',
    detentionLocation: 'Campus de la Universidad del Zulia (LUZ), Maracaibo',
    detentionCenter: 'Comando de la GNB, Maracaibo',
    category: 'student_protest',
    summary:
      'Estudiante universitario detenido durante protesta estudiantil en el campus de la Universidad del Zulia. Compañeros reportan que fue trasladado a instalaciones policiales sin notificación formal.',
    status: 'verified',
    isAnonymized: false,
    supportCount: 67,
    publishedAt: '2026-02-05T16:20:00Z',
  },
  {
    id: 'c005',
    detaineeName: 'Identidad protegida',
    detentionDate: '2026-01-25',
    residenceCity: 'San Cristóbal',
    detentionLocation: 'Av. España, San Cristóbal, Táchira',
    detentionCenter: 'Centro de Coordinación Policial, San Cristóbal',
    category: 'community_leadership',
    summary:
      'Líder comunitario detenido tras denunciar irregularidades en proyecto de viviendas que afecta a comunidades de la zona. Organizaciones locales exigen su liberación inmediata.',
    status: 'verified',
    isAnonymized: true,
    supportCount: 178,
    publishedAt: '2026-01-30T12:00:00Z',
  },
  {
    id: 'c006',
    detaineeName: 'Roberto Sánchez Mora',
    detaineeAge: 38,
    detentionDate: '2026-02-03',
    residenceCity: 'Valencia',
    detentionLocation: 'Palacio de Justicia de Carabobo, Valencia',
    detentionCenter: 'SEBIN, Caracas (trasladado)',
    category: 'legal_defense',
    summary:
      'Abogado de derechos humanos detenido mientras asistía legalmente a familiares de presos políticos. Colegas reportan que los cargos carecen de fundamento jurídico.',
    status: 'verified',
    isAnonymized: false,
    supportCount: 324,
    publishedAt: '2026-02-07T09:15:00Z',
  },
  {
    id: 'c007',
    detaineeName: 'Laura Patricia Díaz',
    detaineeAge: 31,
    detentionDate: '2026-01-28',
    residenceCity: 'Barquisimeto',
    detentionLocation: 'Residencia particular, Barquisimeto, Lara',
    category: 'freedom_of_expression',
    summary:
      'Activista en redes sociales detenida tras publicar contenido crítico sobre el manejo de la crisis alimentaria. Su familia no ha recibido información oficial sobre su paradero.',
    status: 'verified',
    isAnonymized: false,
    supportCount: 198,
    publishedAt: '2026-02-02T11:30:00Z',
  },
  {
    id: 'c008',
    detaineeName: 'Identidad protegida',
    detaineeAge: 52,
    detentionDate: '2026-02-06',
    residenceCity: 'Puerto Ordaz',
    detentionLocation: 'Plaza Bolívar de Puerto Ordaz, Bolívar',
    detentionCenter: 'Comando de la PNB, Ciudad Guayana',
    category: 'other',
    summary:
      'Ciudadano detenido por portar pancartas con mensajes de protesta pacífica en vía pública. Organizaciones de derechos civiles califican la detención como arbitraria.',
    status: 'verified',
    isAnonymized: true,
    supportCount: 56,
    publishedAt: '2026-02-09T15:45:00Z',
  },
];

// ─── Case Details ────────────────────────────────────────────────────

export const MOCK_CASE_DETAILS: Record<string, CaseDetail> = {
  c001: {
    id: 'c001',
    detaineeName: 'Carlos Mendoza',
    detaineeAge: 28,
    detentionDate: '2026-01-15',
    residenceCity: 'Caracas',
    detentionLocation: 'Frente al Palacio Federal Legislativo, Caracas',
    detentionCenter: 'El Helicoide, SEBIN, Caracas',
    category: 'peaceful_protest',
    circumstances:
      'Carlos Mendoza, de 28 años, fue detenido el 15 de enero de 2026 durante una manifestación pacífica frente al Palacio Federal Legislativo en Caracas. Según testigos presenciales, Mendoza participaba de forma pacífica cuando efectivos de seguridad del Estado dispersaron la concentración con gas lacrimógeno y balas de goma. Testigos indican que fue golpeado durante su detención y trasladado en una unidad sin identificación. Su familia fue notificada 48 horas después y se le negó acceso a representación legal durante los primeros cinco días. Actualmente se encuentra recluido en el Helicoide, sede del SEBIN en Caracas, donde organizaciones de derechos humanos han denunciado condiciones inhumanas de reclusión.',
    status: 'verified',
    isAnonymized: false,
    supportCount: 142,
    publishedAt: '2026-01-20T14:30:00Z',
    createdAt: '2026-01-16T08:00:00Z',
    timeline: [
      { event: 'Denuncia recibida', date: '2026-01-16T08:00:00Z', type: 'info' },
      { event: 'Caso en revisión por moderador', date: '2026-01-17T10:00:00Z', type: 'info' },
      { event: 'Evidencia verificada', date: '2026-01-19T14:00:00Z', type: 'success' },
      { event: 'Caso verificado y publicado', date: '2026-01-20T14:30:00Z', type: 'success' },
    ],
  },
  c002: {
    id: 'c002',
    detaineeName: 'Identidad protegida',
    detaineeAge: 34,
    detentionDate: '2026-01-18',
    residenceCity: 'Barquisimeto',
    detentionLocation: 'Domicilio particular, Barquisimeto, Lara',
    detentionCenter: 'SEBIN, Barquisimeto',
    category: 'journalism',
    circumstances:
      'El periodista, cuya identidad se mantiene protegida por razones de seguridad, fue detenido el 18 de enero de 2026 en su domicilio en Barquisimeto, estado Lara, tras publicar una investigación sobre irregularidades en los procesos electorales recientes. Según fuentes cercanas, agentes del SEBIN se presentaron en su domicilio a las 5:30 AM y lo trasladaron sin orden judicial. Su equipo de cómputo, teléfonos y discos duros fueron confiscados. Desde su detención permanece incomunicado en la sede del SEBIN en Barquisimeto; ni su familia ni su abogado han podido tener contacto con él. El Sindicato Nacional de Trabajadores de la Prensa (SNTP) ha emitido un comunicado exigiendo su liberación inmediata y la devolución de su equipo periodístico. Colegas del medio donde laboraba reportan que otros periodistas de la redacción han recibido amenazas.',
    status: 'verified',
    isAnonymized: true,
    supportCount: 89,
    publishedAt: '2026-01-22T10:00:00Z',
    createdAt: '2026-01-19T07:00:00Z',
    timeline: [
      { event: 'Denuncia recibida', date: '2026-01-19T07:00:00Z', type: 'info' },
      { event: 'Caso en revisión por moderador', date: '2026-01-19T14:00:00Z', type: 'info' },
      { event: 'Información adicional solicitada', date: '2026-01-20T09:00:00Z', type: 'warning' },
      { event: 'Evidencia verificada por fuentes independientes', date: '2026-01-21T16:00:00Z', type: 'success' },
      { event: 'Caso verificado y publicado', date: '2026-01-22T10:00:00Z', type: 'success' },
    ],
  },
  c003: {
    id: 'c003',
    detaineeName: 'María Elena Gutiérrez',
    detaineeAge: 45,
    detentionDate: '2026-01-10',
    residenceCity: 'Mérida',
    detentionLocation: 'Centro comunitario Los Andes, Mérida',
    detentionCenter: 'Internado Judicial de Mérida',
    category: 'human_rights',
    circumstances:
      'María Elena Gutiérrez, defensora de derechos humanos de 45 años y residente de la ciudad de Mérida, fue detenida el 10 de enero de 2026 tras organizar un taller sobre derechos civiles en el centro comunitario Los Andes. Las autoridades irrumpieron en el evento y se llevaron a Gutiérrez junto con material educativo. Fue trasladada al Internado Judicial de Mérida. Desde su detención, sus familiares reportan que no se le ha permitido acceso a representación legal y que las visitas familiares han sido severamente restringidas. Organizaciones internacionales han expresado preocupación por su estado de salud, dado que padece una condición crónica que requiere medicación regular.',
    status: 'verified',
    isAnonymized: false,
    supportCount: 215,
    publishedAt: '2026-01-16T08:45:00Z',
    createdAt: '2026-01-11T06:30:00Z',
    timeline: [
      { event: 'Denuncia recibida', date: '2026-01-11T06:30:00Z', type: 'info' },
      { event: 'Caso en revisión por moderador', date: '2026-01-12T09:00:00Z', type: 'info' },
      { event: 'Información adicional solicitada', date: '2026-01-13T11:00:00Z', type: 'warning' },
      { event: 'Información recibida y verificada', date: '2026-01-15T16:00:00Z', type: 'success' },
      { event: 'Caso verificado y publicado', date: '2026-01-16T08:45:00Z', type: 'success' },
    ],
  },
  c004: {
    id: 'c004',
    detaineeName: 'Andrés Felipe Rojas',
    detaineeAge: 21,
    detentionDate: '2026-02-01',
    residenceCity: 'Maracaibo',
    detentionLocation: 'Campus de la Universidad del Zulia (LUZ), Maracaibo',
    detentionCenter: 'Comando de la GNB, Maracaibo',
    category: 'student_protest',
    circumstances:
      'Andrés Felipe Rojas, estudiante de ingeniería de 21 años residente en Maracaibo, fue detenido el 1 de febrero de 2026 durante una protesta estudiantil en el campus de la Universidad del Zulia (LUZ). Los estudiantes se manifestaban pacíficamente contra los recortes presupuestarios a las universidades públicas cuando efectivos de la Guardia Nacional Bolivariana ingresaron al campus violando la autonomía universitaria. Según compañeros presentes, Rojas fue identificado como uno de los organizadores y separado del grupo. Fue trasladado al Comando de la GNB en Maracaibo sin notificación formal a su familia. Su madre fue informada por otros estudiantes horas después. Los cargos presentados incluyen "instigación a la desobediencia" y "asociación para delinquir", que organizaciones de derechos humanos han calificado como desproporcionados. La Federación de Centros Universitarios ha convocado a un paro académico en solidaridad.',
    status: 'verified',
    isAnonymized: false,
    supportCount: 67,
    publishedAt: '2026-02-05T16:20:00Z',
    createdAt: '2026-02-02T06:00:00Z',
    timeline: [
      { event: 'Denuncia recibida', date: '2026-02-02T06:00:00Z', type: 'info' },
      { event: 'Caso en revisión por moderador', date: '2026-02-02T11:00:00Z', type: 'info' },
      { event: 'Evidencia fotográfica y testimonios verificados', date: '2026-02-04T14:00:00Z', type: 'success' },
      { event: 'Caso verificado y publicado', date: '2026-02-05T16:20:00Z', type: 'success' },
    ],
  },
  c005: {
    id: 'c005',
    detaineeName: 'Identidad protegida',
    detentionDate: '2026-01-25',
    residenceCity: 'San Cristóbal',
    detentionLocation: 'Av. España, San Cristóbal, Táchira',
    detentionCenter: 'Centro de Coordinación Policial, San Cristóbal',
    category: 'community_leadership',
    circumstances:
      'El líder comunitario, cuya identidad se protege por la seguridad de su familia, fue detenido el 25 de enero de 2026 en la Av. España de San Cristóbal, estado Táchira, después de denunciar públicamente irregularidades en un proyecto de viviendas que afecta a comunidades de la zona sur de la ciudad. Según testigos, fue interceptado por funcionarios del CICPC vestidos de civil cuando salía de una reunión con representantes de la comunidad. Fue trasladado al Centro de Coordinación Policial de San Cristóbal donde permaneció sin comunicación durante las primeras 72 horas antes de ser procesado formalmente. Los cargos incluyen "instigación pública" y "asociación", que organizaciones como Provea han calificado como criminalizantes del derecho a la protesta. Múltiples organizaciones comunitarias y de derechos humanos del Táchira han exigido su liberación inmediata.',
    status: 'verified',
    isAnonymized: true,
    supportCount: 178,
    publishedAt: '2026-01-30T12:00:00Z',
    createdAt: '2026-01-26T09:00:00Z',
    timeline: [
      { event: 'Denuncia recibida', date: '2026-01-26T09:00:00Z', type: 'info' },
      { event: 'Caso en revisión por moderador', date: '2026-01-27T08:00:00Z', type: 'info' },
      { event: 'Información adicional solicitada', date: '2026-01-28T10:00:00Z', type: 'warning' },
      { event: 'Documentación recibida y contrastada', date: '2026-01-29T15:00:00Z', type: 'success' },
      { event: 'Caso verificado y publicado', date: '2026-01-30T12:00:00Z', type: 'success' },
    ],
  },
  c006: {
    id: 'c006',
    detaineeName: 'Roberto Sánchez Mora',
    detaineeAge: 38,
    detentionDate: '2026-02-03',
    residenceCity: 'Valencia',
    detentionLocation: 'Palacio de Justicia de Carabobo, Valencia',
    detentionCenter: 'SEBIN, Caracas (trasladado)',
    category: 'legal_defense',
    circumstances:
      'Roberto Sánchez Mora, abogado de derechos humanos de 38 años residente en Valencia, fue detenido el 3 de febrero de 2026 mientras asistía legalmente a familiares de presos políticos en una audiencia judicial en el Palacio de Justicia de Carabobo. Según colegas presentes, funcionarios del SEBIN lo interceptaron a la salida del tribunal y lo condujeron a una patrulla sin orden de detención visible. Fue trasladado inicialmente al comando del SEBIN en Valencia y posteriormente a la sede central del SEBIN en Caracas. El Colegio de Abogados del estado Carabobo ha emitido un comunicado denunciando la detención como una violación del derecho al ejercicio profesional y ha solicitado su liberación inmediata. Organizaciones internacionales de abogados se han sumado al reclamo.',
    status: 'verified',
    isAnonymized: false,
    supportCount: 324,
    publishedAt: '2026-02-07T09:15:00Z',
    createdAt: '2026-02-04T07:00:00Z',
    timeline: [
      { event: 'Denuncia recibida', date: '2026-02-04T07:00:00Z', type: 'info' },
      { event: 'Caso en revisión por moderador', date: '2026-02-04T15:00:00Z', type: 'info' },
      { event: 'Evidencia verificada', date: '2026-02-06T10:00:00Z', type: 'success' },
      { event: 'Caso verificado y publicado', date: '2026-02-07T09:15:00Z', type: 'success' },
    ],
  },
  c007: {
    id: 'c007',
    detaineeName: 'Laura Patricia Díaz',
    detaineeAge: 31,
    detentionDate: '2026-01-28',
    residenceCity: 'Barquisimeto',
    detentionLocation: 'Residencia particular, Barquisimeto, Lara',
    category: 'freedom_of_expression',
    circumstances:
      'Laura Patricia Díaz, activista digital de 31 años residente en Barquisimeto, estado Lara, fue detenida el 28 de enero de 2026 en su residencia tras publicar una serie de videos en redes sociales documentando la crisis alimentaria en comunidades vulnerables de la región. En los videos, Díaz mostraba estantes vacíos en establecimientos de distribución de alimentos subsidiados y recogía testimonios de familias afectadas. Funcionarios del SEBIN se presentaron en su domicilio sin orden de allanamiento, según reportan vecinos. Confiscaron su teléfono celular, computadora portátil y memorias USB con material audiovisual. Su familia no ha recibido información oficial sobre su paradero exacto ni los cargos formales en su contra. El Sindicato Nacional de Trabajadores de la Prensa ha denunciado el caso como un acto de censura y persecución contra la libertad de expresión digital.',
    status: 'verified',
    isAnonymized: false,
    supportCount: 198,
    publishedAt: '2026-02-02T11:30:00Z',
    createdAt: '2026-01-29T05:00:00Z',
    timeline: [
      { event: 'Denuncia recibida', date: '2026-01-29T05:00:00Z', type: 'info' },
      { event: 'Caso en revisión por moderador', date: '2026-01-29T12:00:00Z', type: 'info' },
      { event: 'Verificación cruzada con fuentes locales', date: '2026-01-31T09:00:00Z', type: 'info' },
      { event: 'Evidencia verificada', date: '2026-02-01T14:00:00Z', type: 'success' },
      { event: 'Caso verificado y publicado', date: '2026-02-02T11:30:00Z', type: 'success' },
    ],
  },
  c008: {
    id: 'c008',
    detaineeName: 'Identidad protegida',
    detaineeAge: 52,
    detentionDate: '2026-02-06',
    residenceCity: 'Puerto Ordaz',
    detentionLocation: 'Plaza Bolívar de Puerto Ordaz, Bolívar',
    detentionCenter: 'Comando de la PNB, Ciudad Guayana',
    category: 'other',
    circumstances:
      'El ciudadano, de 52 años residente en Puerto Ordaz y cuya identidad se mantiene protegida, fue detenido el 6 de febrero de 2026 en la Plaza Bolívar de Puerto Ordaz, estado Bolívar, mientras portaba pancartas con mensajes de protesta pacífica. Según testigos presenciales, agentes de la Policía Nacional Bolivariana (PNB) lo rodearon y lo detuvieron sin mediar provocación alguna. Las pancartas contenían mensajes alusivos a la libertad de presos políticos y la restauración de garantías constitucionales. Fue trasladado al Comando de la PNB en Ciudad Guayana donde permanece detenido bajo cargos de "instigación al odio". Organizaciones locales de derechos civiles, incluyendo Provea Bolívar, han calificado la detención como arbitraria y como una violación flagrante del derecho a la libre expresión y manifestación pacífica.',
    status: 'verified',
    isAnonymized: true,
    supportCount: 56,
    publishedAt: '2026-02-09T15:45:00Z',
    createdAt: '2026-02-07T08:00:00Z',
    timeline: [
      { event: 'Denuncia recibida', date: '2026-02-07T08:00:00Z', type: 'info' },
      { event: 'Caso en revisión por moderador', date: '2026-02-07T16:00:00Z', type: 'info' },
      { event: 'Testimonios de testigos presenciales verificados', date: '2026-02-08T11:00:00Z', type: 'success' },
      { event: 'Provea Bolívar confirma detención arbitraria', date: '2026-02-09T10:00:00Z', type: 'success' },
      { event: 'Caso verificado y publicado', date: '2026-02-09T15:45:00Z', type: 'success' },
    ],
  },
};

// ─── Tracking Codes ──────────────────────────────────────────────────

export const MOCK_TRACKING: Record<string, TrackingResult> = {
  'DC-2026-00142': {
    trackingCode: 'DC-2026-00142',
    status: 'verified',
    statusLabel: 'Verificado',
    lastUpdated: '2026-01-20T14:30:00Z',
    message: 'Su denuncia ha sido verificada y publicada en la plataforma.',
  },
  'DC-2026-00198': {
    trackingCode: 'DC-2026-00198',
    status: 'under_review',
    statusLabel: 'En revisión',
    lastUpdated: '2026-02-10T09:00:00Z',
    message: 'Su denuncia está siendo revisada por nuestro equipo de moderación.',
  },
  'DC-2026-00205': {
    trackingCode: 'DC-2026-00205',
    status: 'info_requested',
    statusLabel: 'Información solicitada',
    lastUpdated: '2026-02-08T16:00:00Z',
    message:
      'Se requiere información adicional para continuar con la verificación. Revise el correo proporcionado.',
  },
  'DC-2026-00210': {
    trackingCode: 'DC-2026-00210',
    status: 'submitted',
    statusLabel: 'Enviado',
    lastUpdated: '2026-02-11T08:00:00Z',
  },
};

// ─── Auth (mock users) ──────────────────────────────────────────────

export const MOCK_USERS: Record<string, AuthUser> = {
  moderator: {
    id: 'u001',
    email: 'moderador@denunciacivica.org',
    name: 'Ana Moderadora',
    roles: ['moderator'],
  },
  communicator: {
    id: 'u002',
    email: 'comunicador@denunciacivica.org',
    name: 'Luis Comunicador',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=LC',
    roles: ['communicator'],
  },
  admin: {
    id: 'u003',
    email: 'admin@denunciacivica.org',
    name: 'Carlos Admin',
    roles: ['admin', 'moderator'],
  },
};

// ─── Moderation Queue ────────────────────────────────────────────────

export interface ModerationQueueItem {
  id: string;
  trackingCode: string;
  detaineeName: string;
  detentionLocation: string;
  category: CaseCategory;
  status: CaseStatus;
  createdAt: string;
  evidenceCount: number;
}

export const MOCK_MODERATION_QUEUE: ModerationQueueItem[] = [
  {
    id: 'c009',
    trackingCode: 'DC-2026-00210',
    detaineeName: 'Pedro Ramírez Luna',
    detentionLocation: 'Mérida, Venezuela',
    category: 'student_protest',
    status: 'submitted',
    createdAt: '2026-02-11T08:00:00Z',
    evidenceCount: 2,
  },
  {
    id: 'c010',
    trackingCode: 'DC-2026-00198',
    detaineeName: 'Identidad protegida',
    detentionLocation: 'Maracay, Aragua',
    category: 'freedom_of_expression',
    status: 'under_review',
    createdAt: '2026-02-09T14:30:00Z',
    evidenceCount: 1,
  },
  {
    id: 'c011',
    trackingCode: 'DC-2026-00205',
    detaineeName: 'Sofía Martínez Prado',
    detentionLocation: 'Puerto La Cruz, Anzoátegui',
    category: 'human_rights',
    status: 'info_requested',
    createdAt: '2026-02-07T11:00:00Z',
    evidenceCount: 3,
  },
];

// ─── Communicator Stats ──────────────────────────────────────────────

export const MOCK_STATS = {
  totalCases: 47,
  verifiedCases: 32,
  totalSupports: 4218,
  casesByCategory: [
    { category: 'peaceful_protest', count: 12 },
    { category: 'human_rights', count: 9 },
    { category: 'journalism', count: 7 },
    { category: 'student_protest', count: 6 },
    { category: 'freedom_of_expression', count: 5 },
    { category: 'community_leadership', count: 4 },
    { category: 'legal_defense', count: 3 },
    { category: 'other', count: 1 },
  ],
  casesByMonth: [
    { month: '2025-10', count: 3 },
    { month: '2025-11', count: 5 },
    { month: '2025-12', count: 8 },
    { month: '2026-01', count: 18 },
    { month: '2026-02', count: 13 },
  ],
};
