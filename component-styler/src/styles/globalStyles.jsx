export const GLOBAL_STYLES = String.raw`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* ========================================
   DESIGN TOKENS — LIGHT THEME
   ======================================== */
:root,
[data-theme='light'] {
  --bg: #f4f6fb;
  --bg-secondary: #eef1f8;
  --surface: #ffffff;
  --surface-2: #f8fafd;
  --surface-hover: #f1f4fb;
  --border: #e3e8f0;
  --border-strong: #c9d2e0;
  --text: #111827;
  --text-secondary: #4b5563;
  --text-muted: #9ca3af;
  --accent: #4f46e5;
  --accent-hover: #4338ca;
  --accent-faint: #eef2ff;
  --accent-glow: rgba(79, 70, 229, 0.18);
  --accent-border: rgba(79, 70, 229, 0.35);
  --green: #10b981;
  --green-faint: #ecfdf5;
  --red: #ef4444;
  --red-faint: #fef2f2;
  --amber: #f59e0b;
  --canvas-bg: #f0f3fa;
  --canvas-dot: #cdd5e4;
  --canvas-drop: #e8eeff;
  --palette-item: #f8fafd;
  --palette-item-hover: #eef2ff;
  --btn: #f1f4fb;
  --btn-hover: #e5eaf5;
  --input-bg: #ffffff;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04);
  --shadow: 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06);
  --shadow-xl: 0 24px 60px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.08);
  --radius-sm: 6px;
  --radius: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}

/* ========================================
   DESIGN TOKENS — DARK THEME
   ======================================== */
[data-theme='dark'] {
  --bg: #0d0f18;
  --bg-secondary: #111320;
  --surface: #181b2a;
  --surface-2: #1e2235;
  --surface-hover: #222640;
  --border: #2a2f4a;
  --border-strong: #3a4060;
  --text: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #4b5678;
  --accent: #6366f1;
  --accent-hover: #818cf8;
  --accent-faint: #1a1d3a;
  --accent-glow: rgba(99, 102, 241, 0.22);
  --accent-border: rgba(99, 102, 241, 0.4);
  --green: #34d399;
  --green-faint: #0d2e24;
  --red: #f87171;
  --red-faint: #2d1515;
  --amber: #fbbf24;
  --canvas-bg: #0f1120;
  --canvas-dot: #252a42;
  --canvas-drop: #1a1e38;
  --palette-item: #1e2235;
  --palette-item-hover: #252a42;
  --btn: #1e2235;
  --btn-hover: #252a42;
  --input-bg: #1e2235;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
  --shadow: 0 4px 12px rgba(0,0,0,0.4);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.5);
  --shadow-xl: 0 24px 60px rgba(0,0,0,0.6);
}

/* ========================================
   RESET & BASE
   ======================================== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  transition: background 0.25s, color 0.25s;
  line-height: 1.5;
}

/* ========================================
   APP SHELL
   ======================================== */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-workspace {
  display: flex;
  flex: 1;
  overflow: hidden;
  height: calc(100vh - 60px);
}

/* ========================================
   DRAG OVERLAY
   ======================================== */
.drag-overlay-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 600;
  box-shadow: var(--shadow-lg);
  pointer-events: none;
  letter-spacing: 0.01em;
}

/* ========================================
   SCROLLBAR
   ======================================== */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }

/* ========================================
   FOCUS
   ======================================== */
input:focus-visible, select:focus-visible, textarea:focus-visible, button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
input:focus, select:focus, textarea:focus { outline: none; }

/* ========================================
   UTILITY CLASSES
   ======================================== */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 20px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
  letter-spacing: 0.01em;
  text-decoration: none;
}
.btn-primary:hover { background: var(--accent-hover); box-shadow: 0 4px 16px var(--accent-glow); transform: translateY(-1px); }
.btn-primary:active { transform: translateY(0); }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 16px;
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  text-decoration: none;
}
.btn-ghost:hover { background: var(--btn-hover); color: var(--text); border-color: var(--border-strong); }

.btn-danger {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 16px;
  background: transparent;
  color: var(--red);
  border: 1px solid transparent;
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.btn-danger:hover { background: var(--red-faint); border-color: var(--red); }

/* ========================================
   RESPONSIVE
   ======================================== */
@media (max-width: 900px) {
  .app-workspace { flex-direction: column; height: auto; }
  .component-palette { width: 100%; min-width: unset; flex-direction: row; height: 80px; border-right: none; border-bottom: 1px solid var(--border); overflow-x: auto; }
  .palette-list { flex-direction: row; flex-wrap: nowrap; }
  .style-editor { width: 100%; min-width: unset; border-left: none; border-top: 1px solid var(--border); max-height: 300px; }
}

.navbar {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 200;
  gap: 32px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}

.navbar-logo {
  width: 34px;
  height: 34px;
  background: var(--accent);
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 2px 8px var(--accent-glow);
}

.navbar-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: var(--radius);
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}

.nav-link:hover {
  background: var(--btn-hover);
  color: var(--text);
}

.nav-link.active {
  background: var(--accent-faint);
  color: var(--accent);
  font-weight: 600;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.theme-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--btn);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, transform 0.2s;
}

.theme-btn:hover {
  background: var(--btn-hover);
  color: var(--text);
  transform: scale(1.08);
}

@media (max-width: 600px) {
  .navbar-name { display: none; }
  .nav-link span { display: none; }
}
.landing {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

/* ── Hero ── */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 80px 0 64px;
  gap: 20px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  background: var(--accent-faint);
  color: var(--accent);
  border: 1px solid var(--accent-border);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.hero-title {
  font-size: clamp(36px, 5vw, 58px);
  font-weight: 800;
  color: var(--text);
  line-height: 1.1;
  letter-spacing: -0.03em;
  max-width: 700px;
}

.hero-accent {
  background: linear-gradient(135deg, var(--accent) 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 17px;
  color: var(--text-secondary);
  max-width: 520px;
  line-height: 1.65;
}

.hero-cta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 8px;
}

.hero-btn-primary {
  padding: 11px 28px;
  font-size: 15px;
}

.hero-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
}

.chip {
  padding: 4px 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
}

/* ── Section shared ── */
.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.025em;
  margin-bottom: 8px;
}

.section-sub {
  font-size: 15px;
  color: var(--text-secondary);
}

/* ── Features ── */
.features-section {
  padding: 48px 0;
  border-top: 1px solid var(--border);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.feature-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
}

.feature-card:hover {
  box-shadow: var(--shadow);
  border-color: var(--accent-border);
  transform: translateY(-2px);
}

.feature-icon {
  width: 42px;
  height: 42px;
  background: var(--accent-faint);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
}

.feature-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
}

.feature-desc {
  font-size: 13.5px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* ── Workflow ── */
.workflow-section {
  padding: 48px 0;
  border-top: 1px solid var(--border);
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 600px;
  margin: 0 auto;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 28px 0;
  border-bottom: 1px solid var(--border);
}

.step:last-child { border-bottom: none; }

.step-number {
  font-size: 13px;
  font-weight: 800;
  color: var(--accent);
  background: var(--accent-faint);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius);
  padding: 6px 10px;
  letter-spacing: 0.04em;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
}

.step-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
}

.step-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* ── CTA Bottom ── */
.cta-section {
  padding: 48px 0;
  border-top: 1px solid var(--border);
}

.cta-card {
  background: linear-gradient(135deg, var(--accent-faint) 0%, var(--surface) 100%);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-xl);
  padding: 56px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
}

.cta-icon {
  color: var(--accent);
}

.cta-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.025em;
}

.cta-sub {
  font-size: 15px;
  color: var(--text-secondary);
  max-width: 400px;
}

@media (max-width: 600px) {
  .hero { padding: 48px 0 40px; }
  .features-grid { grid-template-columns: 1fr; }
  .cta-card { padding: 36px 20px; }
}
.configs-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.configs-header {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
  flex-wrap: nowrap;
}

.configs-header > .btn-primary {
  margin-left: auto;
  flex-shrink: 0;
}

.configs-heading-block {
  flex: 0 0 420px;
  width: 420px;
}

.configs-title {
  font-size: 26px;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.025em;
  margin-bottom: 6px;
}

.configs-sub {
  font-size: 14px;
  color: var(--text-secondary);
  min-height: 22px;
}

/* Search */
.configs-search-wrap {
  position: relative;
  width: 400px;
  max-width: 100%;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.configs-search {
  width: 100%;
  padding: 9px 12px 9px 36px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--input-bg);
  color: var(--text);
  font-size: 13.5px;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.configs-search:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
  outline: none;
}

/* Empty */
.configs-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 64px 24px;
  text-align: center;
  color: var(--text-secondary);
}

.configs-empty-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}

.configs-empty h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
}

.configs-empty p {
  font-size: 14px;
  max-width: 320px;
  line-height: 1.6;
}

/* Grid */
.configs-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 18px;
}

.config-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1 1 300px;
  min-width: 280px;
  max-width: calc(33.333% - 12px);
  transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
}

.config-card:hover {
  box-shadow: var(--shadow);
  border-color: var(--accent-border);
  transform: translateY(-2px);
}

.config-card-preview {
  height: 120px;
  background: linear-gradient(135deg, var(--accent-faint) 0%, var(--bg-secondary) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  border-bottom: 1px solid var(--border);
}

.config-card-body {
  padding: 18px 20px 14px;
  flex: 1;
}

.config-card-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.config-card-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 11.5px;
  color: var(--text-secondary);
  font-weight: 500;
}

.config-card-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px 16px;
  border-top: 1px solid var(--border);
}

.config-load-btn {
  flex: 1;
  justify-content: center;
  padding: 8px 16px;
  font-size: 13px;
}

.config-delete-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  flex-shrink: 0;
}

.config-delete-btn:hover {
  background: var(--red-faint);
  color: var(--red);
  border-color: var(--red);
}

@media (max-width: 600px) {
  .configs-grid {
    flex-direction: column;
  }
  .config-card {
    min-width: 100%;
    max-width: 100%;
  }
  .configs-header { flex-direction: column; }
  .configs-heading-block,
  .configs-search-wrap {
    width: 100%;
    flex-basis: auto;
  }
}
.editor-page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  overflow: hidden;
}

.editor-page .app-workspace {
  height: 100%;
}
.component-palette {
  width: 160px;
  min-width: 160px;
  background: var(--surface);
  border-right: 1px solid var(--border);
  padding: 16px 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.palette-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 2px 0;
}

.palette-hint {
  font-size: 11px;
  color: var(--text-muted);
  margin: 0 0 12px 0;
}

.palette-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.palette-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: grab;
  background: var(--palette-item);
  border: 1px solid var(--border);
  transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
  user-select: none;
}

.palette-item:hover {
  background: var(--palette-item-hover);
  box-shadow: 0 2px 8px var(--shadow);
  transform: translateY(-1px);
}

.palette-item.dragging {
  opacity: 0.4;
  cursor: grabbing;
}

.palette-icon {
  font-size: 16px;
  line-height: 1;
}

.palette-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
}
.canvas {
  flex: 1;
  position: relative;
  background: var(--canvas-bg);
  overflow: hidden;
  transition: background 0.2s;
}

/* Background variants */
.canvas-bg-dots {
  background-image: radial-gradient(circle, var(--canvas-dot) 1px, transparent 1px);
  background-size: 24px 24px;
}

.canvas-bg-grid {
  background-image:
    linear-gradient(var(--canvas-dot) 1px, transparent 1px),
    linear-gradient(90deg, var(--canvas-dot) 1px, transparent 1px);
  background-size: 24px 24px;
}

.canvas-bg-plain {
  background-image: none;
}

.canvas-bg-custom {
  background-image: none;
}

.canvas.drop-over {
  background-color: var(--canvas-drop-over);
  outline: 2px dashed var(--accent);
  outline-offset: -4px;
}

.canvas.empty .canvas-empty-state {
  display: flex;
}

.canvas-empty-state {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
  pointer-events: none;
  gap: 12px;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 48px;
  opacity: 0.5;
}

.canvas-empty-state p {
  font-size: 14px;
  text-align: center;
  max-width: 240px;
  opacity: 0.7;
}

.canvas-component {
  position: absolute;
  padding: 4px;
  border-radius: 6px;
  border: 2px solid transparent;
  transition: border-color 0.15s;
  box-sizing: border-box;
}

.canvas-component:hover {
  border-color: var(--accent-light);
}

.canvas-component.selected {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.selection-badge {
  position: absolute;
  top: -20px;
  left: 0;
  background: var(--accent);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px 4px 0 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  pointer-events: none;
  white-space: nowrap;
}

.component-preview {
  display: contents;
}
.editor-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 16px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
  gap: 12px;
  z-index: 100;
  position: relative;
}

.editor-toolbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.editor-toolbar-label {
  font-size: 12.5px;
  color: var(--text-muted);
  font-weight: 500;
}

.editor-toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Buttons */
.editor-toolbar-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 13px;
  background: var(--btn);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  white-space: nowrap;
}

.editor-toolbar-btn:hover:not(:disabled) {
  background: var(--btn-hover);
  color: var(--text);
  border-color: var(--border-strong);
}

.editor-toolbar-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.editor-toolbar-btn.accent {
  background: var(--accent-faint);
  border-color: var(--accent-border);
  color: var(--accent);
}

.editor-toolbar-btn.accent:hover {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

.editor-toolbar-btn.danger:hover:not(:disabled) {
  background: var(--red-faint);
  color: var(--red);
  border-color: var(--red);
}

.count-badge {
  background: var(--accent);
  color: #fff;
  border-radius: 999px;
  padding: 1px 7px;
  font-size: 11px;
  font-weight: 700;
}

.chevron {
  transition: transform 0.2s;
  opacity: 0.6;
}
.chevron.open { transform: rotate(180deg); }

/* ── Save Dropdown ── */
.save-panel-wrap,
.bg-panel-wrap {
  position: relative;
}

.save-dropdown,
.bg-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 400px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  z-index: 200;
  overflow: hidden;
}

.bg-dropdown {
  width: 400px;
  padding: 16px;
}

.save-dropdown-section {
  padding: 14px 16px;
}

.save-dropdown-section.border-top {
  border-top: 1px solid var(--border);
}

.dropdown-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.save-input-row {
  display: flex;
  gap: 8px;
}

.save-name-input {
  flex: 1;
  padding: 7px 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--input-bg);
  color: var(--text);
  font-size: 13px;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.save-name-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
  outline: none;
}

.save-submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 14px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
}

.save-submit-btn:hover:not(:disabled) { background: var(--accent-hover); }
.save-submit-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.save-submit-btn.saved { background: var(--green); }

/* Search inside dropdown */
.dropdown-search-wrap {
  position: relative;
  margin-bottom: 6px;
}

.dropdown-search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.dropdown-search {
  width: 100%;
  padding: 6px 28px 6px 30px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--input-bg);
  color: var(--text);
  font-size: 12.5px;
}

.dropdown-search:focus { border-color: var(--accent); outline: none; }

.dropdown-search-clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
}

/* Configs list */
.configs-list {
  max-height: 200px;
  overflow-y: auto;
}

.configs-list-empty {
  text-align: center;
  padding: 14px;
  font-size: 12.5px;
  color: var(--text-muted);
}

.configs-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  transition: background 0.1s;
  gap: 8px;
}

.configs-list-item:hover { background: var(--surface-hover); }

.configs-list-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
}

.configs-list-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.configs-list-meta {
  font-size: 11px;
  color: var(--text-muted);
}

.configs-list-actions {
  display: flex;
  gap: 4px;
}

.config-action-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
  background: transparent;
  color: var(--text-muted);
}

.config-action-btn.load:hover { background: var(--accent-faint); color: var(--accent); }
.config-action-btn.delete:hover { background: var(--red-faint); color: var(--red); }

/* ── BG Panel ── */
.bg-preset-row {
  display: flex;
  gap: 6px;
}

.bg-preset-btn {
  flex: 1;
  padding: 6px 8px;
  background: var(--btn);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.12s, color 0.12s, border-color 0.12s;
}

.bg-preset-btn:hover { background: var(--btn-hover); color: var(--text); }
.bg-preset-btn.active { background: var(--accent-faint); border-color: var(--accent-border); color: var(--accent); font-weight: 600; }

.bg-color-pick {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bg-color-input {
  width: 32px;
  height: 32px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  padding: 0;
  background: none;
}

.bg-color-text {
  flex: 1;
  padding: 6px 8px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--input-bg);
  color: var(--text);
  font-size: 12px;
  font-family: monospace;
}
.style-editor {
  width: 260px;
  min-width: 260px;
  background: var(--surface);
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.style-editor.empty {
  align-items: center;
  justify-content: center;
}

.editor-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--text-muted);
  padding: 24px;
  text-align: center;
}

.editor-empty-icon {
  font-size: 36px;
  opacity: 0.5;
}

.editor-empty-state p {
  font-size: 13px;
  opacity: 0.7;
  max-width: 180px;
}

.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px 10px;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  background: var(--surface);
  z-index: 1;
}

.editor-title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
}

.editor-type {
  font-size: 11px;
  color: var(--accent);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 6px;
  border-radius: 6px;
  transition: background 0.15s;
}

.delete-btn:hover {
  background: var(--red-faint);
}

.editor-sections {
  overflow-y: auto;
  flex: 1;
  padding-bottom: 16px;
}

.editor-section {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}

.section-title {
  margin: 0 0 10px 0;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
}

.style-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 8px;
}

.style-label {
  font-size: 12px;
  color: var(--text-secondary);
  flex-shrink: 0;
  min-width: 70px;
}

.color-input-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
}

.color-picker {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 0;
  background: none;
}

.color-text {
  width: 76px;
  padding: 4px 6px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 11px;
  font-family: monospace;
  background: var(--input-bg);
  color: var(--text);
}

.number-input-wrap {
  display: flex;
  align-items: center;
  gap: 4px;
}

.number-input {
  width: 60px;
  padding: 4px 6px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 12px;
  background: var(--input-bg);
  color: var(--text);
}

.unit-label {
  font-size: 11px;
  color: var(--text-muted);
}

.select-input {
  flex: 1;
  padding: 4px 6px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 12px;
  background: var(--input-bg);
  color: var(--text);
  cursor: pointer;
}

.spacing-group {
  margin-bottom: 10px;
}

.spacing-group .style-label {
  display: block;
  margin-bottom: 6px;
}

.spacing-inputs {
  display: flex;
  gap: 6px;
}

.spacing-input-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.spacing-input {
  width: 46px;
  padding: 4px 4px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 12px;
  background: var(--input-bg);
  color: var(--text);
  text-align: center;
}

.spacing-side-label {
  font-size: 10px;
  color: var(--text-muted);
  font-weight: 600;
}

.sizing-wrap {
  display: flex;
  align-items: center;
  gap: 4px;
}

.sizing-input {
  width: 60px;
  padding: 4px 6px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 12px;
  background: var(--input-bg);
  color: var(--text);
}

.unit-select {
  padding: 4px 4px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 11px;
  background: var(--input-bg);
  color: var(--text);
  cursor: pointer;
}

.opacity-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.range-input {
  flex: 1;
  cursor: pointer;
  accent-color: var(--accent);
}

.opacity-value {
  font-size: 11px;
  color: var(--text-muted);
  min-width: 32px;
  text-align: right;
}
`;
