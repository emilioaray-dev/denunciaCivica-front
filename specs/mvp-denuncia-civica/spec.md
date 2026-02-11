# Feature Specification: Denuncia Cívica – MVP Platform (Frontend)

**Feature Branch**: `preview`
**Created**: 2026-02-11
**Status**: Draft
**Input**: PRD completo para plataforma de denuncia cívica de presuntos presos políticos

---

## 1. PRODUCT REQUIREMENTS DOCUMENT (PRD)

### Problema que resuelve

No existe una plataforma centralizada, segura y verificable para documentar casos de presuntos presos políticos en Latinoamérica. La información está dispersa en redes sociales, es difícil de verificar, y los denunciantes enfrentan riesgos de represalia. Los comunicadores sociales carecen de una fuente estructurada y confiable para reportar estos casos.

### Usuarios objetivo

| Rol | Descripción | Nivel técnico |
|-----|-------------|---------------|
| **Denunciante** | Familiar, abogado, testigo o persona cercana al caso | Bajo-medio |
| **Moderador** | Equipo interno de verificación de casos | Medio-alto |
| **Comunicador** | Periodistas, ONGs, defensores de DDHH | Medio |
| **Usuario Público** | Ciudadano que consulta casos verificados | Bajo |

### Propuesta de valor

- Plataforma única y centralizada para denuncias estructuradas
- Verificación rigurosa antes de publicación
- Protección total de identidad del denunciante
- Datos accesibles para comunicadores con credenciales
- Priorización comunitaria controlada (apoyos)
- Auditoría completa de todas las acciones

### Alcance del MVP

**Incluido:**
- Registro de denuncias con formulario multi-paso
- Flujo de verificación por moderadores
- Vista pública de casos verificados
- Sistema de búsqueda y filtrado de casos
- Sistema de apoyo comunitario (support/upvote)
- Autenticación OAuth (Google) para moderadores y comunicadores
- Panel privado para comunicadores
- Cifrado de datos sensibles del denunciante
- Auditoría básica de acciones
- Responsive design (mobile-first)

**Fuera de alcance (MVP):**
- App nativa (iOS/Android)
- Chat en tiempo real
- Notificaciones push
- API pública para terceros
- Multilenguaje (solo español)
- Dashboard de analytics avanzado
- Integración con organismos internacionales
- Verificación biométrica
- Pagos o donaciones
- Sistema de alertas geográficas

### Supuestos críticos

1. Los denunciantes no necesitan crear cuenta para denunciar (formulario anónimo)
2. El equipo de moderación será reducido (2-5 personas) en MVP
3. Google OAuth es suficiente como método de autenticación para roles internos
4. El almacenamiento S3-compatible estará disponible (MinIO o similar)
5. La infraestructura será autohospedada (no cloud pública por sensibilidad)
6. No se requiere verificación de identidad gubernamental del denunciante
7. Los comunicadores serán invitados manualmente por administradores
8. El volumen inicial será < 1000 casos y < 50 usuarios internos

### Métricas de éxito

| Métrica | Objetivo MVP |
|---------|-------------|
| Denuncias completadas sin abandono | > 60% tasa de completitud |
| Tiempo de verificación promedio | < 48 horas |
| Casos publicados vs recibidos | > 40% ratio |
| Uptime de la plataforma | > 99% |
| Tiempo de carga de páginas | < 2s en 3G |
| Incidentes de seguridad | 0 filtraciones de datos |

### Riesgos principales

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Filtración de datos de denunciantes | Media | Crítico | Cifrado E2E, separación de bases, auditoría |
| Ataques DDoS/spam coordinados | Alta | Alto | Rate limiting, CAPTCHA, WAF básico |
| Uso para denuncias falsas | Alta | Alto | Verificación obligatoria, moderación |
| Compromiso de cuenta de moderador | Media | Crítico | 2FA, sesiones cortas, audit log |
| Presión legal/gubernamental | Media | Alto | Infraestructura autohospedada, backups offsite |
| Baja adopción por desconfianza | Media | Alto | UX de confianza, transparencia en proceso |

---

## 2. USER FLOWS

### Flow 1: Denunciante

```
1. Accede a la plataforma (sin login)
2. Lee información sobre privacidad y proceso
3. Acepta términos y condiciones de privacidad
4. Completa formulario multi-paso:
   a. Consentimiento informado + advertencias
   b. Datos del detenido (nombre, edad, fecha, ubicación, categoría)
   c. Circunstancias de la detención (narrativa)
   d. Información del denunciante (email, relación, opción anónimo)
   e. Adjuntar evidencia opcional (fotos, documentos)
   f. Revisión final de datos ingresados
5. Envía la denuncia
6. Recibe código de seguimiento (DC-2026-XXXXX)
7. Puede consultar estado con código de seguimiento
```

### Flow 2: Moderador

```
1. Login con Google OAuth
2. Accede al panel de moderación
3. Ve cola de casos pendientes (ordenados por fecha)
4. Selecciona un caso para revisar
5. Revisa datos del detenido + circunstancias
6. Revisa evidencia adjunta (si existe)
7. Decide acción:
   a. Verificar → caso pasa a público
   b. Solicitar más información → notificación al denunciante
   c. Rechazar → registra motivo
8. Todas las acciones quedan en audit log
9. Caso verificado aparece en listado público
```

### Flow 3: Comunicador

```
1. Recibe invitación por email del administrador
2. Login con Google OAuth
3. Accede a panel privado de comunicadores
4. Ve casos verificados con datos extendidos
5. Puede filtrar por categoría, país, fecha, estado
6. Puede exportar datos de casos (formato estructurado)
7. Ve estadísticas agregadas
8. NO tiene acceso a datos del denunciante
```

### Flow 4: Usuario Público

```
1. Accede a la plataforma (sin login)
2. Ve estadísticas generales en landing
3. Navega a explorador de casos
4. Filtra por categoría, ubicación, fecha
5. Busca por nombre o descripción
6. Ve detalle de caso verificado
7. Puede registrar apoyo al caso
8. Comparte caso en redes sociales (link)
```

---

## User Scenarios & Testing

### User Story 1 - Envío de Denuncia Anónima (Priority: P1)

Un denunciante accede a la plataforma sin necesidad de crear cuenta, completa un formulario multi-paso con información del detenido, circunstancias y evidencia opcional, y recibe un código de seguimiento.

**Why this priority**: Es la funcionalidad core. Sin denuncias, no hay plataforma. Debe ser lo más accesible y seguro posible.

**Independent Test**: Se puede probar completando el formulario completo y verificando que se genera un código de seguimiento, que los datos se persisten correctamente, y que los datos sensibles están cifrados.

**Acceptance Scenarios**:

1. **Given** un usuario sin cuenta accede a /denunciar, **When** completa todos los pasos del formulario y envía, **Then** recibe un código de seguimiento único con formato DC-2026-XXXXX
2. **Given** un denunciante completa el formulario, **When** marca la opción anónimo, **Then** su información personal se cifra y no es visible ni para moderadores
3. **Given** un denunciante está en el paso 3, **When** hace click en "Anterior", **Then** regresa al paso 2 con los datos previamente ingresados conservados
4. **Given** un denunciante no completa campos obligatorios, **When** intenta avanzar al siguiente paso, **Then** ve mensajes de validación claros sin perder datos ingresados

---

### User Story 2 - Exploración Pública de Casos Verificados (Priority: P1)

Un usuario público puede navegar, buscar y filtrar casos que han sido verificados por moderadores.

**Why this priority**: Es la cara pública de la plataforma y su razón de existir como herramienta de visibilización.

**Independent Test**: Se puede probar navegando al explorador, aplicando filtros, y verificando que solo aparecen casos con estado "verificado".

**Acceptance Scenarios**:

1. **Given** existen casos verificados en el sistema, **When** un usuario navega a /explorar, **Then** ve una grilla de casos verificados con nombre, ubicación, fecha y categoría
2. **Given** un usuario está en /explorar, **When** filtra por categoría "Manifestación pacífica", **Then** solo ve casos de esa categoría
3. **Given** un usuario busca "Venezuela", **When** escribe en el campo de búsqueda, **Then** ve resultados filtrados por ubicación que contengan "Venezuela"
4. **Given** un usuario hace click en un caso, **When** navega al detalle, **Then** ve información completa del caso, timeline de estados, y botón de apoyo

---

### User Story 3 - Moderación de Casos (Priority: P1)

Un moderador autenticado puede revisar casos pendientes, verificarlos, solicitar información o rechazarlos.

**Why this priority**: Sin moderación, no hay verificación, y sin verificación no hay publicación. Es el puente entre la denuncia y la visibilidad.

**Independent Test**: Se puede probar logeándose como moderador, accediendo al panel, seleccionando un caso pendiente, y cambiando su estado.

**Acceptance Scenarios**:

1. **Given** un moderador autenticado accede a /admin/moderacion, **When** hay casos pendientes, **Then** ve una lista ordenada por fecha de ingreso con resumen de cada caso
2. **Given** un moderador revisa un caso, **When** lo marca como verificado, **Then** el caso aparece en la vista pública y se registra en audit log
3. **Given** un moderador revisa un caso, **When** solicita más información, **Then** el estado cambia a "info_requested" y se genera notificación
4. **Given** un moderador rechaza un caso, **When** ingresa el motivo, **Then** el caso no se publica y el motivo queda en audit log

---

### User Story 4 - Sistema de Apoyo Comunitario (Priority: P2)

Un usuario público puede registrar su apoyo a un caso verificado para priorización comunitaria.

**Why this priority**: Agrega engagement y señal de prioridad, pero la plataforma funciona sin él.

**Independent Test**: Se puede probar navegando a un caso verificado y clickeando "Apoyar este caso".

**Acceptance Scenarios**:

1. **Given** un usuario público ve un caso verificado, **When** hace click en "Apoyar este caso", **Then** el contador de apoyos incrementa y el botón cambia a estado "apoyado"
2. **Given** un usuario ya apoyó un caso, **When** regresa al mismo caso, **Then** ve el botón en estado "ya apoyado" (persistido via localStorage/cookie)

---

### User Story 5 - Panel de Comunicadores (Priority: P2)

Un comunicador invitado puede acceder a un panel privado con datos extendidos de casos verificados y capacidad de exportación.

**Why this priority**: Es valor diferencial para el público objetivo secundario (periodistas, ONGs), pero no bloquea funcionalidad core.

**Independent Test**: Se puede probar logeándose como comunicador y verificando acceso a datos extendidos no visibles públicamente.

**Acceptance Scenarios**:

1. **Given** un comunicador autenticado accede a /panel/comunicador, **When** el panel carga, **Then** ve casos verificados con datos extendidos y estadísticas
2. **Given** un comunicador filtra casos, **When** aplica filtros de fecha y categoría, **Then** la lista se actualiza correctamente
3. **Given** un comunicador quiere exportar datos, **When** hace click en "Exportar", **Then** descarga un archivo con los datos estructurados de los casos filtrados

---

### User Story 6 - Consulta de Estado por Código de Seguimiento (Priority: P3)

Un denunciante puede consultar el estado de su denuncia usando el código de seguimiento recibido.

**Why this priority**: Importante para confianza, pero no bloquea la funcionalidad principal del MVP.

**Independent Test**: Se puede probar ingresando un código válido y verificando que muestra el estado actual.

**Acceptance Scenarios**:

1. **Given** un denunciante tiene un código DC-2026-12345, **When** lo ingresa en /consultar, **Then** ve el estado actual de su caso sin datos sensibles de otros
2. **Given** un usuario ingresa un código inválido, **When** busca, **Then** ve mensaje "Código no encontrado" sin revelar si el código existe o no

---

### Edge Cases

- Qué sucede si se envían múltiples denuncias del mismo caso (deduplicación)
- Cómo se maneja un formulario abandonado a mitad de proceso (sin cuenta, se pierde)
- Qué sucede si un moderador intenta verificar un caso ya verificado por otro
- Cómo se maneja evidencia en formato no soportado
- Qué sucede si el storage S3 no está disponible al subir evidencia
- Cómo responde la búsqueda con caracteres especiales o intentos de inyección
- Qué sucede si el denunciante accede desde un país con censura de internet

---

## Requirements

### Functional Requirements

- **FR-001**: El sistema DEBE permitir enviar denuncias sin crear cuenta de usuario
- **FR-002**: El sistema DEBE generar un código de seguimiento único por cada denuncia
- **FR-003**: El sistema DEBE cifrar todos los datos personales del denunciante antes de persistir
- **FR-004**: El sistema DEBE soportar formulario multi-paso con validación por paso
- **FR-005**: El sistema DEBE permitir subir evidencia (imágenes, PDFs) asociada a un caso
- **FR-006**: El sistema DEBE mostrar solo casos verificados en la vista pública
- **FR-007**: El sistema DEBE permitir autenticación via Google OAuth para roles internos
- **FR-008**: El sistema DEBE registrar todas las acciones de moderación en audit log
- **FR-009**: El sistema DEBE soportar filtrado por categoría, ubicación y fecha
- **FR-010**: El sistema DEBE soportar búsqueda de texto libre en casos públicos
- **FR-011**: El sistema DEBE permitir a comunicadores exportar datos de casos verificados
- **FR-012**: El sistema DEBE implementar rate limiting en endpoints de creación
- **FR-013**: El sistema DEBE ser completamente responsive (mobile-first)
- **FR-014**: El sistema DEBE mostrar indicadores de confianza y seguridad en la UI
- **FR-015**: El sistema DEBE soportar consulta de estado por código de seguimiento
- **FR-016**: El sistema DEBE soportar registro de apoyo comunitario sin autenticación
- **FR-017**: El sistema DEBE implementar CAPTCHA o mecanismo anti-bot en formulario de denuncia

### Key Entities

- **Case**: Caso de presunto preso político con datos del detenido, circunstancias, estado y evidencia
- **ReporterProfile**: Datos cifrados del denunciante, separados lógicamente del caso
- **CaseEvidence**: Archivos adjuntos (imágenes, documentos) asociados a un caso
- **VerificationRecord**: Registro de cada acción de moderación sobre un caso
- **SupportAction**: Registro de apoyo comunitario a un caso
- **User**: Usuario autenticado con rol (moderador, comunicador, admin)
- **AuditLog**: Registro inmutable de todas las acciones del sistema

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Un denunciante completa el formulario completo en menos de 10 minutos
- **SC-002**: La plataforma carga la página principal en menos de 2 segundos en 3G
- **SC-003**: Un moderador puede revisar y decidir sobre un caso en menos de 5 minutos
- **SC-004**: 0 incidentes de filtración de datos de denunciantes en los primeros 6 meses
- **SC-005**: El explorador de casos muestra resultados filtrados en menos de 500ms
- **SC-006**: La plataforma soporta al menos 100 usuarios concurrentes sin degradación
- **SC-007**: 100% de las acciones de moderación quedan registradas en audit log
