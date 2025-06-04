"use client"

import Link from "next/link"
import { ArrowLeft, Zap, Clock, Target, Instagram, Facebook, Twitter } from "lucide-react"

export default function SocialContentPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: "1rem 0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link href="/" style={{ textDecoration: "none", color: "#666" }}>
              <ArrowLeft size={20} />
            </Link>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#000", margin: 0 }}>Social Content</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: "4rem 0", background: "linear-gradient(135deg, #f8f9fa 0%, #fff 100%)" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "3rem", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <Zap size={20} style={{ color: "#3b82f6" }} />
                <span style={{ fontSize: "0.875rem", color: "#3b82f6", fontWeight: "500" }}>AI-GENERATED</span>
              </div>
              <h1 style={{ fontSize: "2.5rem", fontWeight: "300", marginBottom: "1rem", color: "#000" }}>
                Daily Content that
                <span style={{ fontWeight: "600", display: "block" }}>Engages Customers</span>
              </h1>
              <p style={{ fontSize: "1.125rem", color: "#666", lineHeight: "1.6", marginBottom: "2rem" }}>
                AI creates 30 days of restaurant-specific social posts in seconds. Perfectly crafted for your cuisine,
                audience, and brand voice with trending hashtags.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Instagram size={16} style={{ color: "#e1306c" }} />
                  <span style={{ fontSize: "0.875rem", color: "#666" }}>Instagram ready</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Facebook size={16} style={{ color: "#1877f2" }} />
                  <span style={{ fontSize: "0.875rem", color: "#666" }}>Facebook optimized</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Twitter size={16} style={{ color: "#1da1f2" }} />
                  <span style={{ fontSize: "0.875rem", color: "#666" }}>Twitter perfect</span>
                </div>
              </div>
            </div>
            <div style={{ background: "#f8f9fa", borderRadius: "0.5rem", padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📱</div>
              <p style={{ color: "#666", fontSize: "0.875rem" }}>Content Preview Demo</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "300", textAlign: "center", marginBottom: "3rem", color: "#000" }}>
            AI Creates Content <span style={{ fontWeight: "600" }}>10x Faster</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "2rem" }}>
            {[
              {
                icon: <Clock size={24} />,
                title: "30 Posts in 30 Seconds",
                description:
                  "AI generates a month's worth of engaging restaurant content instantly, saving you hours daily.",
              },
              {
                icon: <Target size={24} />,
                title: "Cuisine-Specific",
                description:
                  "AI understands your restaurant type and creates content that resonates with your exact audience.",
              },
              {
                icon: <Zap size={24} />,
                title: "Trending Hashtags",
                description: "AI automatically includes the most effective hashtags for maximum reach and engagement.",
              },
            ].map((feature, index) => (
              <div key={index} style={{ textAlign: "center", padding: "2rem" }}>
                <div style={{ color: "#3b82f6", marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
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
            Start creating <span style={{ fontWeight: "600" }}>engaging content?</span>
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
              Generate Content
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
