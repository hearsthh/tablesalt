"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)" }}>
      {/* Mobile-First Header */}
      <header
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(229, 231, 235, 0.3)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div className="container" style={{ padding: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
                  borderRadius: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 14px 0 rgba(31, 41, 55, 0.25)",
                }}
              >
                <div
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    backgroundColor: "white",
                    borderRadius: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{ width: "0.5rem", height: "0.5rem", backgroundColor: "#1f2937", borderRadius: "50%" }}
                  ></div>
                </div>
              </div>
              <div>
                <h1
                  style={{
                    fontSize: isMobile ? "1.25rem" : "1.5rem",
                    fontWeight: "700",
                    background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    margin: 0,
                  }}
                >
                  TableSalt
                </h1>
                {!isMobile && <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: 0 }}>Essential AI</p>}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {!isMobile && (
                <Link
                  href="/signin"
                  style={{
                    color: "#374151",
                    fontWeight: "500",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                >
                  Sign In
                </Link>
              )}
              <Link href="/dashboard" style={{ textDecoration: "none" }}>
                <button className="btn btn-primary" style={{ fontSize: isMobile ? "0.875rem" : "1rem" }}>
                  <span>{isMobile ? "Start" : "Get Started"}</span>
                  <span style={{ marginLeft: "0.5rem" }}>→</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-12" style={{ textAlign: "center" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-block",
              marginBottom: "2rem",
              background: "rgba(59, 130, 246, 0.1)",
              color: "#1f2937",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              fontSize: "0.875rem",
              padding: "0.5rem 1rem",
              borderRadius: "2rem",
              fontWeight: "500",
            }}
          >
            <span style={{ marginRight: "0.5rem" }}>✨</span>
            Essential for every table
          </div>

          <h1
            style={{
              fontSize: isMobile ? "2.5rem" : "4rem",
              fontWeight: "800",
              marginBottom: "2rem",
              lineHeight: "1.1",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              The Essential
            </span>
            <span
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "block",
              }}
            >
              Marketing Ingredient
            </span>
          </h1>

          <p
            style={{
              fontSize: isMobile ? "1.125rem" : "1.25rem",
              color: "#6b7280",
              marginBottom: "3rem",
              maxWidth: "36rem",
              margin: "0 auto 3rem auto",
              lineHeight: "1.6",
            }}
          >
            Just like salt is essential on every table, TableSalt is essential for every restaurant's success. The one
            AI marketing ingredient you absolutely can't do without.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "4rem",
            }}
          >
            <Link href="/dashboard" style={{ textDecoration: "none", width: isMobile ? "100%" : "auto" }}>
              <button
                className="btn btn-primary"
                style={{
                  width: isMobile ? "100%" : "auto",
                  fontSize: "1.125rem",
                  padding: "1rem 2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                }}
              >
                Add TableSalt to Your Restaurant
                <span>→</span>
              </button>
            </Link>
            <button
              className="btn btn-secondary"
              style={{
                width: isMobile ? "100%" : "auto",
                fontSize: "1.125rem",
                padding: "1rem 2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
              }}
            >
              <span>▶</span>
              See the Transformation
            </button>
          </div>

          {/* Social Proof */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "center",
              gap: isMobile ? "1rem" : "2rem",
              color: "#6b7280",
              fontSize: "0.875rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#f59e0b" }}>✓</span>
              Essential Daily
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#f59e0b" }}>✓</span>
              Universal Appeal
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#f59e0b" }}>✓</span>
              Transformative Results
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "4rem 0", background: "rgba(255, 255, 255, 0.5)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: isMobile ? "2rem" : "2.5rem",
                fontWeight: "700",
                marginBottom: "1rem",
                background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Essential Ingredients for Success
            </h2>
            <p style={{ fontSize: "1.125rem", color: "#6b7280", maxWidth: "32rem", margin: "0 auto" }}>
              Every feature designed to be as essential as salt on your table
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🧂",
                title: "TableSalt Pages",
                description: "Essential restaurant pages that showcase everything your customers need to know",
                gradient: "linear-gradient(135deg, #4b5563 0%, #1f2937 100%)",
              },
              {
                icon: "📱",
                title: "TableSalt Posts",
                description: "Daily social content that's as essential as salt - simple, effective, transformative",
                gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              },
              {
                icon: "📅",
                title: "TableSalt Planner",
                description: "Content scheduling that ensures you never miss the essential posting moments",
                gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              },
              {
                icon: "📊",
                title: "TableSalt Pulse",
                description: "Pure, unfiltered customer insights - no fluff, just essential data",
                gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              },
              {
                icon: "🎯",
                title: "TableSalt Promotions",
                description: "Campaigns that hit the sweet spot - essential offers your customers actually want",
                gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              },
              {
                icon: "⚡",
                title: "Essential Growth",
                description: "Fundamental growth strategies that work - no gimmicks, just essential results",
                gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              },
            ].map((feature, index) => (
              <div key={index} className="elegant-card" style={{ padding: "2rem", textAlign: "center" }}>
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    background: feature.gradient,
                    borderRadius: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    fontSize: "1.5rem",
                    boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.75rem", color: "#1f2937" }}>
                  {feature.title}
                </h3>
                <p style={{ color: "#6b7280", lineHeight: "1.6", fontSize: "0.875rem" }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "4rem 0",
          background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(234, 88, 12, 0.1) 100%)",
          }}
        ></div>
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
          <h2
            style={{
              fontSize: isMobile ? "2rem" : "3rem",
              fontWeight: "700",
              marginBottom: "1rem",
            }}
          >
            Ready to Add TableSalt?
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#d1d5db",
              marginBottom: "3rem",
              maxWidth: "32rem",
              margin: "0 auto 3rem auto",
            }}
          >
            Join restaurants that have discovered the essential ingredient for marketing success
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <Link href="/dashboard" style={{ textDecoration: "none", width: isMobile ? "100%" : "auto" }}>
              <button
                style={{
                  width: isMobile ? "100%" : "auto",
                  backgroundColor: "white",
                  color: "#1f2937",
                  padding: "1rem 2rem",
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "0.75rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  boxShadow: "0 4px 14px 0 rgba(255, 255, 255, 0.25)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 6px 20px 0 rgba(255, 255, 255, 0.35)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 4px 14px 0 rgba(255, 255, 255, 0.25)"
                }}
              >
                Get Your Essential Ingredient
                <span>→</span>
              </button>
            </Link>
            <button
              className="btn btn-ghost"
              style={{
                width: isMobile ? "100%" : "auto",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "#d1d5db",
                padding: "1rem 2rem",
                fontSize: "1.125rem",
                backgroundColor: "transparent",
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
