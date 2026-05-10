import React from 'react';
import { Link } from 'react-router-dom';
import {
  MousePointer2,
  Palette,
  Save,
  Layers,
  Sliders,
  LayoutGrid,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const features = [
  {
    icon: MousePointer2,
    title: 'Drag & Drop Canvas',
    desc: 'Place components anywhere on the canvas by dragging from the palette. Reposition them freely.',
  },
  {
    icon: Palette,
    title: 'Live Style Editor',
    desc: 'Instantly edit colors, typography, spacing, borders, and effects — changes appear in real time.',
  },
  {
    icon: Save,
    title: 'Save Configurations',
    desc: 'Name and save your canvas state. Load, edit, or delete saved configurations at any time.',
  },
  {
    icon: Sliders,
    title: 'Fine-Grained Controls',
    desc: 'Individual padding, margin, border radius, box shadow, opacity — full control over every property.',
  },
  {
    icon: LayoutGrid,
    title: 'Component Library',
    desc: 'Button, Input, Textarea, Card, Heading, Paragraph, Image placeholder, and Divider — ready to style.',
  },
  {
    icon: Layers,
    title: 'Light & Dark Mode',
    desc: 'Switch between light and dark app themes with one click. Your preference is remembered.',
  },
];

const components = ['Button', 'Text Input', 'Text Area', 'Card', 'Heading', 'Paragraph', 'Image', 'Divider'];

export default function Landing() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">Visual UI Composer</div>
        <h1 className="hero-title">
          Design components.<br />
          <span className="hero-accent">Without writing CSS.</span>
        </h1>
        <p className="hero-subtitle">
          Drag UI components onto a canvas, style them visually with a full property editor,
          and save your configurations to reuse later.
        </p>
        <div className="hero-cta">
          <Link to="/editor" className="btn-primary hero-btn-primary">
            Open Editor
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
          <Link to="/configs" className="btn-ghost">
            View Saved Configs
          </Link>
        </div>

        {/* Component chips */}
        <div className="hero-chips">
          {components.map(c => (
            <span key={c} className="chip">{c}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Everything you need</h2>
          <p className="section-sub">A complete visual styling environment in your browser.</p>
        </div>
        <div className="features-grid">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="feature-card">
              <div className="feature-icon">
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="workflow-section">
        <div className="section-header">
          <h2 className="section-title">How it works</h2>
          <p className="section-sub">Three steps to a styled component set.</p>
        </div>
        <div className="steps">
          {[
            { n: '01', title: 'Drag components', desc: 'Pick from the palette and drop onto the canvas.' },
            { n: '02', title: 'Style visually', desc: 'Click any component and edit every CSS property in the panel.' },
            { n: '03', title: 'Save & reuse', desc: 'Name the configuration and load it later with one click.' },
          ].map(({ n, title, desc }) => (
            <div key={n} className="step">
              <div className="step-number">{n}</div>
              <div>
                <h3 className="step-title">{title}</h3>
                <p className="step-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="cta-section">
        <div className="cta-card">
          <CheckCircle2 size={32} strokeWidth={1.5} className="cta-icon" />
          <h2 className="cta-title">Ready to start?</h2>
          <p className="cta-sub">Open the editor and build your first component composition.</p>
          <Link to="/editor" className="btn-primary">
            Launch Editor
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </div>
  );
}
