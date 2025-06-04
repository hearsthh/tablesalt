"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CheckCircle, Zap, Users, TrendingUp, Star } from "lucide-react"

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    const handleScroll = () => setScrollY(window.scrollY)

    checkMobile()
    window.addEventListener("resize", checkMobile)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Elegant Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: scrollY > 50 ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          borderBottom: scrollY > 50 ? "1px solid rgba(0, 0, 0, 0.1)" : "1px solid rgba(255, 255, 255, 0.2)",
          zIndex: 1000,
          transition: "all 0.3s ease",
        }}
      >
        <div
          className="container"
          style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "0.75rem 1rem" : "1rem 2rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {/* TableSalt Logo */}
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  background: scrollY > 50 ? "#000" : "#fff",
                  borderRadius: "0.375rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "0.75rem",
                    height: "0.75rem",
                    backgroundColor: scrollY > 50 ? "#fff" : "#000",
                    borderRadius: "50%",
                    transition: "all 0.3s ease",
                  }}
                ></div>
                {/* Salt crystals effect */}
                <div
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    width: "3px",
                    height: "3px",
                    backgroundColor: scrollY > 50 ? "#fff" : "#000",
                    borderRadius: "50%",
                    opacity: 0.6,
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "3px",
                    left: "3px",
                    width: "2px",
                    height: "2px",
                    backgroundColor: scrollY > 50 ? "#fff" : "#000",
                    borderRadius: "50%",
                    opacity: 0.4,
                  }}
                ></div>
              </div>
              <div>
                <h1
                  style={{
                    fontSize: isMobile ? "1rem" : "1.125rem",
                    fontWeight: "600",
                    color: scrollY > 50 ? "#000" : "#fff",
                    margin: 0,
                    letterSpacing: "0.025em",
                    transition: "color 0.3s ease",
                  }}
                >
                  TableSalt
                </h1>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "0.5rem" : "1rem" }}>
              {!isMobile && (
                <Link
                  href="/signin"
                  style={{
                    color: scrollY > 50 ? "#666" : "rgba(255, 255, 255, 0.8)",
                    fontWeight: "400",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    letterSpacing: "0.025em",
                  }}
                >
                  Sign In
                </Link>
              )}
              <Link href="/dashboard" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "#000",
                    color: "#fff",
                    border: "none",
                    padding: isMobile ? "0.5rem 1rem" : "0.625rem 1.25rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    letterSpacing: "0.025em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#333"
                    e.currentTarget.style.transform = "translateY(-1px)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#000"
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  {isMobile ? "Start" : "Get Started"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          minHeight: "100vh",
          background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/placeholder.svg?height=1080&width=1920')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: "48rem",
            padding: "0 2rem",
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <div
            style={{
              display: "inline-block",
              marginBottom: "1.5rem",
              background: "rgba(255, 255, 255, 0.1)",
              color: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              fontSize: "0.75rem",
              padding: "0.375rem 0.875rem",
              borderRadius: "1.5rem",
              fontWeight: "400",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Essential for every table
          </div>

          <h1
            style={{
              fontSize: isMobile ? "2.25rem" : "3.5rem",
              fontWeight: "300",
              marginBottom: "1.5rem",
              lineHeight: "1.1",
              letterSpacing: "-0.025em",
            }}
          >
            <span style={{ display: "block", marginBottom: "0.25rem" }}>The Essential</span>
            <span style={{ fontWeight: "600", display: "block" }}>Marketing Ingredient</span>
          </h1>

          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.125rem",
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "2.5rem",
              maxWidth: "32rem",
              margin: "0 auto 2.5rem auto",
              lineHeight: "1.6",
              fontWeight: "300",
              letterSpacing: "0.025em",
            }}
          >
            AI-powered marketing that creates pages, posts, and campaigns in minutes. Just like salt enhances every
            dish, TableSalt enhances every restaurant's success.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link href="/dashboard" style={{ textDecoration: "none", width: isMobile ? "100%" : "auto" }}>
              <button
                style={{
                  background: "#fff",
                  color: "#000",
                  border: "none",
                  padding: "0.75rem 1.75rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.025em",
                  width: isMobile ? "100%" : "auto",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f5f5f5"
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.15)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff"
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.1)"
                }}
              >
                Start Your Journey
              </button>
            </Link>
            <button
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                padding: "0.75rem 1.75rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "400",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.025em",
                width: isMobile ? "100%" : "auto",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)"
                e.currentTarget.style.transform = "translateY(-1px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "8rem 0", background: "#fff" }}>
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <h2
              style={{
                fontSize: isMobile ? "2rem" : "2.75rem",
                fontWeight: "300",
                marginBottom: "1.5rem",
                color: "#000",
                letterSpacing: "-0.025em",
              }}
            >
              AI-Powered Features for
              <span style={{ fontWeight: "600", display: "block" }}>Restaurant Success</span>
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#666",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.6",
                fontWeight: "300",
              }}
            >
              Every feature designed to work automatically, faster, and with better quality than manual work
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "2.5rem" }}>
            {[
              {
                icon: "📄",
                title: "Smart Pages",
                description:
                  "AI creates stunning restaurant pages in 2 minutes. Automatically optimized for conversions with your menu and brand voice.",
                link: "/features/smart-pages",
                color: "#f59e0b",
              },
              {
                icon: "🎯",
                title: "Smart Campaigns",
                description:
                  "AI creates targeted promotions automatically. Higher conversion rates with zero guesswork.",
                link: "/features/smart-campaigns",
                color: "#f97316",
              },
              {
                icon: "📱",
                title: "Social Content",
                description:
                  "AI generates 30 days of engaging posts in 30 seconds. Perfectly crafted for your cuisine with trending hashtags.",
                link: "/features/social-content",
                color: "#3b82f6",
              },
              {
                icon: "📅",
                title: "Content Calendar",
                description:
                  "AI schedules posts at optimal times automatically. Never miss peak engagement hours again.",
                link: "/features/content-calendar",
                color: "#8b5cf6",
              },
              {
                icon: "📊",
                title: "Customer Insights",
                description:
                  "AI analyzes customer behavior instantly. Get actionable insights 10x faster than manual analysis.",
                link: "/features/customer-insights",
                color: "#10b981",
              },
              {
                icon: "⚡",
                title: "Growth Engine",
                description:
                  "AI automates your entire marketing system. Scale your success without scaling your workload.",
                link: "/features/growth-engine",
                color: "#ef4444",
              },
            ].map((feature, index) => (
              <Link key={index} href={feature.link} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #f0f0f0",
                    borderRadius: "1rem",
                    padding: "2.5rem",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    height: "100%",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = feature.color
                    e.currentTarget.style.transform = "translateY(-6px)"
                    e.currentTarget.style.boxShadow = `0 12px 30px ${feature.color}20`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#f0f0f0"
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)"
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      marginBottom: "1.5rem",
                      opacity: 0.8,
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      marginBottom: "1rem",
                      color: "#000",
                      letterSpacing: "0.025em",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      color: "#666",
                      lineHeight: "1.6",
                      fontSize: "0.875rem",
                      fontWeight: "300",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: "8rem 0", background: "#f8f9fa" }}>
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <h2
              style={{
                fontSize: isMobile ? "2rem" : "2.75rem",
                fontWeight: "300",
                marginBottom: "1.5rem",
                color: "#000",
                letterSpacing: "-0.025em",
              }}
            >
              How TableSalt <span style={{ fontWeight: "600" }}>Works</span>
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#666",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.6",
                fontWeight: "300",
              }}
            >
              Three simple steps to transform your restaurant's marketing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "4rem" }}>
            {[
              {
                step: "01",
                title: "Tell Us About Your Restaurant",
                description: "Share your cuisine type, location, and brand voice. Takes 2 minutes.",
                icon: <Users size={32} />,
              },
              {
                step: "02",
                title: "AI Creates Everything",
                description: "Our AI generates pages, posts, and campaigns tailored to your restaurant.",
                icon: <Zap size={32} />,
              },
              {
                step: "03",
                title: "Watch Your Business Grow",
                description: "Automated marketing brings in more customers while you focus on cooking.",
                icon: <TrendingUp size={32} />,
              },
            ].map((step, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "5rem",
                    height: "5rem",
                    background: "#000",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 2rem",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  {step.icon}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#999",
                    fontWeight: "500",
                    letterSpacing: "0.1em",
                    marginBottom: "0.75rem",
                  }}
                >
                  STEP {step.step}
                </div>
                <h3
                  style={{
                    fontSize: "1.375rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    color: "#000",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: "#666",
                    lineHeight: "1.6",
                    fontSize: "0.875rem",
                    fontWeight: "300",
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: "8rem 0", background: "#fff" }}>
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <h2
              style={{
                fontSize: isMobile ? "2rem" : "2.75rem",
                fontWeight: "300",
                marginBottom: "1.5rem",
                color: "#000",
                letterSpacing: "-0.025em",
              }}
            >
              Loved by <span style={{ fontWeight: "600" }}>Restaurant Owners</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "2.5rem" }}>
            {[
              {
                name: "Maria Rodriguez",
                restaurant: "Bella Vista Italian",
                quote:
                  "TableSalt created our entire social media strategy in minutes. Our engagement increased 300% in the first month!",
                rating: 5,
              },
              {
                name: "James Chen",
                restaurant: "Dragon Palace",
                quote:
                  "The AI understands Asian cuisine perfectly. Every post feels like I wrote it myself, but better.",
                rating: 5,
              },
              {
                name: "Sarah Johnson",
                restaurant: "Farm Table Bistro",
                quote:
                  "Finally, marketing that works while I focus on cooking. TableSalt is essential for any serious restaurant.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                style={{
                  background: "#f8f9fa",
                  borderRadius: "1rem",
                  padding: "2.5rem",
                  textAlign: "center",
                  border: "1px solid #f0f0f0",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                  ))}
                </div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#666",
                    lineHeight: "1.6",
                    marginBottom: "2rem",
                    fontStyle: "italic",
                  }}
                >
                  "{testimonial.quote}"
                </p>
                <div>
                  <div style={{ fontWeight: "600", color: "#000", fontSize: "0.875rem" }}>{testimonial.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#999", marginTop: "0.25rem" }}>
                    {testimonial.restaurant}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Section with Stock Food Photography */}
      <section style={{ padding: "8rem 0", background: "#f8f9fa" }}>
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "5rem", alignItems: "center" }}>
            <div>
              <h2
                style={{
                  fontSize: isMobile ? "2rem" : "2.75rem",
                  fontWeight: "300",
                  marginBottom: "2rem",
                  color: "#000",
                  letterSpacing: "-0.025em",
                  lineHeight: "1.2",
                }}
              >
                Crafted with the same care
                <span style={{ fontWeight: "600", display: "block" }}>you put into your dishes</span>
              </h2>
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "#666",
                  lineHeight: "1.6",
                  marginBottom: "2.5rem",
                  fontWeight: "300",
                }}
              >
                Every feature is thoughtfully designed to reflect the quality and attention to detail that defines your
                restaurant. AI that understands the art of hospitality.
              </p>
              <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle size={18} style={{ color: "#10b981" }} />
                  <span style={{ fontSize: "0.875rem", color: "#666" }}>Restaurant-specific AI</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle size={18} style={{ color: "#10b981" }} />
                  <span style={{ fontSize: "0.875rem", color: "#666" }}>Industry expertise built-in</span>
                </div>
              </div>
              <Link href="/dashboard" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "#000",
                    color: "#fff",
                    border: "none",
                    padding: "0.875rem 2rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    letterSpacing: "0.025em",
                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#333"
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.15)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#000"
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  Experience TableSalt
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-2" style={{ gap: "1.5rem" }}>
              <img
                src="/placeholder.svg?height=250&width=350"
                alt="Gourmet food plating"
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                }}
              />
              <img
                src="/placeholder.svg?height=250&width=350"
                alt="Restaurant dish"
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "1rem",
                  marginTop: "2rem",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "8rem 0", background: "#fff" }}>
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <h2
              style={{
                fontSize: isMobile ? "2rem" : "2.75rem",
                fontWeight: "300",
                marginBottom: "1.5rem",
                color: "#000",
                letterSpacing: "-0.025em",
              }}
            >
              Proven Results for <span style={{ fontWeight: "600" }}>Restaurants</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: "3rem" }}>
            {[
              { number: "300%", label: "Average Engagement Increase" },
              { number: "2 min", label: "To Create Complete Strategy" },
              { number: "10x", label: "Faster Than Manual Work" },
              { number: "24/7", label: "Automated Marketing" },
            ].map((stat, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: isMobile ? "2.5rem" : "3rem",
                    fontWeight: "700",
                    color: "#000",
                    marginBottom: "0.75rem",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "#666",
                    fontWeight: "300",
                    lineHeight: "1.4",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "8rem 0",
          background: "#000",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem" }}>
          <h2
            style={{
              fontSize: isMobile ? "2rem" : "2.75rem",
              fontWeight: "300",
              marginBottom: "1.5rem",
              letterSpacing: "-0.025em",
            }}
          >
            Ready to add the essential
            <span style={{ fontWeight: "600", display: "block" }}>ingredient to your success?</span>
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: "3rem",
              lineHeight: "1.6",
              fontWeight: "300",
            }}
          >
            Join restaurants that have discovered what makes the difference
          </p>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "#fff",
                color: "#000",
                border: "none",
                padding: "1rem 2.5rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.025em",
                boxShadow: "0 4px 14px rgba(255, 255, 255, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f5f5f5"
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 255, 255, 0.3)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff"
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(255, 255, 255, 0.2)"
              }}
            >
              Get Started Today
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
