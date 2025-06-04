"use client"

import Link from "next/link"
import { ArrowLeft, Zap, Clock, Target, CheckCircle } from "lucide-react"

export default function SmartPagesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: "1rem 0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link href="/" style={{ textDecoration: "none", color: "#666" }}>
              <ArrowLeft size={20} />
            </Link>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#000", margin: 0 }}>Smart Pages</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: "4rem 0", background: "linear-gradient(135deg, #f8f9fa 0%, #fff 100%)" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "3rem", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <Zap size={20} style={{ color: "#f59e0b" }} />
                <span style={{ fontSize: "0.875rem", color: "#f59e0b", fontWeight: "500" }}>AI-POWERED</span>
              </div>
              <h1 style={{ fontSize: "2.5rem", fontWeight: "300", marginBottom: "1rem", color: "#000" }}>
                Smart Pages that
                <span style={{ fontWeight: "600", display: "block" }}>Convert Visitors</span>
              </h1>
              <p style={{ fontSize: "1.125rem", color: "#666", lineHeight: "1.6", marginBottom: "2rem" }}>
                AI creates stunning restaurant pages in minutes, not weeks. Automatically optimized for conversions with
                your menu, photos, and brand voice.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle size={16} style={{ color: "#10b981" }} />
                  <span style={{ fontSize: "0.875rem", color: "#666" }}>Generated in 2 minutes</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle size={16} style={{ color: "#10b981" }} />
                  <span style={{ fontSize: "0.875rem", color: "#666" }}>Mobile optimized</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle size={16} style={{ color: "#10b981" }} />
                  <span style={{ fontSize: "0.875rem", color: "#666" }}>SEO ready</span>
                </div>
              </div>
            </div>
            <div style={{ background: "#f8f9fa", borderRadius: "0.5rem", padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📄</div>
              <p style={{ color: "#666", fontSize: "0.875rem" }}>Interactive Demo Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "300", textAlign: "center", marginBottom: "3rem", color: "#000" }}>
            How AI Makes It <span style={{ fontWeight: "600" }}>Effortless</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "2rem" }}>
            {[
              {
                icon: <Clock size={24} />,
                title: "2-Minute Setup",
                description: "AI analyzes your restaurant type and creates pages instantly. No design skills needed.",
              },
              {
                icon: <Target size={24} />,
                title: "Conversion Optimized",
                description: "AI uses restaurant industry data to place elements where they convert best.",
              },
              {
                icon: <Zap size={24} />,
                title: "Auto-Updates",
                description: "AI keeps your pages fresh with seasonal content and trending restaurant features.",
              },
            ].map((feature, index) => (
              <div key={index} style={{ textAlign: "center", padding: "2rem" }}>
                <div style={{ color: "#f59e0b", marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "500", marginBottom: "0.75rem", color: "#000" }}>
                  {feature.title}
                </h3>
                <p style={{ color: "#666", fontSize: "0.875rem", lineHeight: "1.5" }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "4rem 0", background: "#f8f9fa", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "300", marginBottom: "1rem", color: "#000" }}>
            Ready to create your <span style={{ fontWeight: "600" }}>smart pages?</span>
          </h2>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "#000",
                color: "#fff",
                border: "none",
                padding: "0.75rem 2rem",
                borderRadius: "0.25rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Start Creating
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
