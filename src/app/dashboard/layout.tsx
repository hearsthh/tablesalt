"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const navigation = [
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: "👤",
  },
  {
    name: "Marketing",
    href: "/dashboard/marketing",
    icon: "📈",
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
    icon: "👥",
  },
  {
    name: "Integrations",
    href: "/dashboard/integrations",
    icon: "🔗",
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #f0f0f0",
          background: "#ffffff",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: isMobile ? "16px 0" : "20px 0",
            }}
          >
            {/* Logo */}
            <a href="/" style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: isMobile ? "32px" : "36px",
                    height: isMobile ? "32px" : "36px",
                    background: "#000000",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? "16px" : "18px",
                  }}
                >
                  🧂
                </div>
                <h1
                  style={{
                    fontSize: isMobile ? "20px" : "24px",
                    fontWeight: "700",
                    color: "#000000",
                    margin: 0,
                  }}
                >
                  TableSalt
                </h1>
              </div>
            </a>

            {/* Navigation */}
            <nav>
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  background: "#f8f9fa",
                  padding: "4px",
                  borderRadius: "10px",
                  border: "1px solid #f0f0f0",
                }}
              >
                {navigation.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: isMobile ? "6px" : "8px",
                        padding: isMobile ? "8px 12px" : "10px 16px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        fontSize: isMobile ? "13px" : "14px",
                        fontWeight: "500",
                        transition: "all 0.15s ease",
                        backgroundColor: isActive ? "#ffffff" : "transparent",
                        color: isActive ? "#000000" : "#666666",
                        border: isActive ? "1px solid #e0e0e0" : "1px solid transparent",
                      }}
                    >
                      <span style={{ fontSize: isMobile ? "14px" : "16px" }}>{item.icon}</span>
                      {(!isMobile || item.name.length <= 8) && item.name}
                    </a>
                  )
                })}
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}
