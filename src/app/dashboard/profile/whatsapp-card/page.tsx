"use client"

import { useState, useEffect } from "react"
import {
  MessageSquare,
  Download,
  Share2,
  QrCode,
  Edit,
  Zap,
  Copy,
  ExternalLink,
  Phone,
  MapPin,
  Clock,
  Star,
  Camera,
  Palette,
} from "lucide-react"

export default function WhatsAppCardPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("design")
  const [isGenerated, setIsGenerated] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const [cardData, setCardData] = useState({
    restaurantName: "Spice Garden",
    tagline: "Authentic Indian Cuisine",
    description: "Experience the rich flavors of traditional Indian cuisine with modern flair.",
    phone: "+91 98765 43210",
    address: "123 Food Street, Mumbai",
    hours: "11 AM - 11 PM",
    rating: 4.6,
    reviewCount: 342,
    specialties: ["Butter Chicken", "Biryani", "Tandoori"],
    image: "/placeholder.svg?height=200&width=300&text=Restaurant+Photo",
    logo: "/placeholder.svg?height=80&width=80&text=Logo",
    theme: {
      primaryColor: "#25D366",
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
    },
  })

  const [qrCode, setQrCode] = useState("")
  const whatsappNumber = cardData.phone.replace(/[^\d]/g, "")
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  const handleAIGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerated(true)
      setIsGenerating(false)
      setQrCode("/placeholder.svg?height=200&width=200&text=QR+Code")
      alert("WhatsApp Business Card generated successfully!")
    }, 2000)
  }

  const handleDownload = () => {
    alert("WhatsApp Business Card downloaded as image!")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${cardData.restaurantName} - WhatsApp Business Card`,
        text: cardData.description,
        url: whatsappUrl,
      })
    } else {
      navigator.clipboard.writeText(whatsappUrl)
      alert("WhatsApp link copied to clipboard!")
    }
  }

  const copyWhatsAppLink = () => {
    navigator.clipboard.writeText(whatsappUrl)
    alert("WhatsApp link copied to clipboard!")
  }

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <div className="breadcrumb mb-4">
        <a href="/dashboard" className="breadcrumb-item">
          Dashboard
        </a>
        <span className="breadcrumb-separator">/</span>
        <a href="/dashboard/profile" className="breadcrumb-item">
          Profile
        </a>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">WhatsApp Business Card</span>
      </div>

      {/* Header */}
      <div className="mb-4">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "0.75rem" : "0",
          }}
        >
          <div>
            <h1 style={{ fontSize: isMobile ? "1.25rem" : "1.5rem", marginBottom: "0.25rem" }}>
              WhatsApp Business Card
            </h1>
            <p style={{ fontSize: "0.75rem", color: "#6c757d" }}>
              Create a shareable digital business card for WhatsApp
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
            {isGenerated && (
              <>
                <button
                  onClick={handleDownload}
                  className="btn btn-secondary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.625rem",
                    padding: "0.375rem 0.5rem",
                  }}
                >
                  <Download className="h-3 w-3" />
                  Download
                </button>
                <button
                  onClick={handleShare}
                  className="btn btn-secondary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.625rem",
                    padding: "0.375rem 0.5rem",
                  }}
                >
                  <Share2 className="h-3 w-3" />
                  Share
                </button>
              </>
            )}
            <button
              onClick={handleAIGenerate}
              disabled={isGenerating}
              className="btn btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.625rem",
                padding: "0.375rem 0.5rem",
                cursor: isGenerating ? "not-allowed" : "pointer",
                opacity: isGenerating ? 0.7 : 1,
              }}
            >
              <Zap className="h-3 w-3" />
              {isGenerating ? "Generating..." : isGenerated ? "Regenerate" : "Generate Card"}
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Link Status */}
      {isGenerated && (
        <div
          className="card mb-4"
          style={{ padding: "0.75rem", backgroundColor: "#e8f5e8", border: "1px solid #c3e6c3" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MessageSquare className="h-4 w-4" style={{ color: "#2d5a2d" }} />
              <span style={{ fontSize: "0.75rem", fontWeight: "500", color: "#2d5a2d" }}>
                WhatsApp Business Card ready: {whatsappUrl}
              </span>
            </div>
            <div style={{ display: "flex", gap: "0.25rem" }}>
              <button
                onClick={copyWhatsAppLink}
                className="btn btn-secondary"
                style={{ padding: "0.25rem 0.5rem", fontSize: "0.625rem" }}
              >
                <Copy className="h-3 w-3" />
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: "0.25rem 0.5rem", fontSize: "0.625rem" }}
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Design Panel */}
        <div className="card">
          <div style={{ borderBottom: "1px solid #e9ecef" }}>
            <div style={{ display: "flex", gap: "0" }}>
              {[
                { id: "design", label: "Design", icon: Palette },
                { id: "content", label: "Content", icon: Edit },
                { id: "qr", label: "QR Code", icon: QrCode },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: "0.75rem 1rem",
                      border: "none",
                      backgroundColor: activeTab === tab.id ? "#f8f9fa" : "transparent",
                      borderBottom: activeTab === tab.id ? "2px solid #495057" : "2px solid transparent",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                    }}
                  >
                    <Icon className="h-3 w-3" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div style={{ padding: "1rem" }}>
            {activeTab === "design" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label className="form-label">Theme Color</label>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <input
                      type="color"
                      value={cardData.theme.primaryColor}
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          theme: { ...cardData.theme, primaryColor: e.target.value },
                        })
                      }
                      style={{
                        width: "2.5rem",
                        height: "2rem",
                        border: "1px solid #dee2e6",
                        borderRadius: "0.25rem",
                      }}
                    />
                    <input
                      type="text"
                      value={cardData.theme.primaryColor}
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          theme: { ...cardData.theme, primaryColor: e.target.value },
                        })
                      }
                      className="form-input"
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Restaurant Logo</label>
                  <div
                    style={{
                      border: "1px dashed #dee2e6",
                      borderRadius: "0.375rem",
                      padding: "1rem",
                      textAlign: "center",
                    }}
                  >
                    <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: "0 0 0.5rem 0" }}>
                      Upload your restaurant logo
                    </p>
                    <button className="btn btn-secondary btn-sm">Choose File</button>
                  </div>
                </div>

                <div>
                  <label className="form-label">Restaurant Photo</label>
                  <div
                    style={{
                      border: "1px dashed #dee2e6",
                      borderRadius: "0.375rem",
                      padding: "1rem",
                      textAlign: "center",
                    }}
                  >
                    <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: "0 0 0.5rem 0" }}>
                      Upload a photo of your restaurant
                    </p>
                    <button className="btn btn-secondary btn-sm">Choose File</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "content" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label className="form-label">Restaurant Name</label>
                  <input
                    type="text"
                    value={cardData.restaurantName}
                    onChange={(e) => setCardData({ ...cardData, restaurantName: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Tagline</label>
                  <input
                    type="text"
                    value={cardData.tagline}
                    onChange={(e) => setCardData({ ...cardData, tagline: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Description</label>
                  <textarea
                    value={cardData.description}
                    onChange={(e) => setCardData({ ...cardData, description: e.target.value })}
                    className="form-textarea"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="form-label">WhatsApp Number</label>
                  <input
                    type="text"
                    value={cardData.phone}
                    onChange={(e) => setCardData({ ...cardData, phone: e.target.value })}
                    className="form-input"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    value={cardData.address}
                    onChange={(e) => setCardData({ ...cardData, address: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Operating Hours</label>
                  <input
                    type="text"
                    value={cardData.hours}
                    onChange={(e) => setCardData({ ...cardData, hours: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Specialties (comma-separated)</label>
                  <input
                    type="text"
                    value={cardData.specialties.join(", ")}
                    onChange={(e) => setCardData({ ...cardData, specialties: e.target.value.split(", ") })}
                    className="form-input"
                    placeholder="Butter Chicken, Biryani, Tandoori"
                  />
                </div>
              </div>
            )}

            {activeTab === "qr" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ textAlign: "center" }}>
                  {qrCode ? (
                    <div>
                      <img
                        src={qrCode || "/placeholder.svg"}
                        alt="WhatsApp QR Code"
                        style={{
                          width: "200px",
                          height: "200px",
                          margin: "0 auto 1rem",
                          border: "1px solid #dee2e6",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: "0 0 1rem 0" }}>
                        Scan this QR code to start a WhatsApp conversation
                      </p>
                      <button onClick={handleDownload} className="btn btn-primary btn-sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download QR Code
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "200px",
                        height: "200px",
                        margin: "0 auto 1rem",
                        border: "2px dashed #dee2e6",
                        borderRadius: "0.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      <QrCode className="h-8 w-8 text-gray-400" />
                      <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: "0" }}>
                        Generate card to create QR code
                      </p>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    padding: "1rem",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "0.5rem",
                    border: "1px solid #e9ecef",
                  }}
                >
                  <h4 style={{ fontSize: "0.875rem", fontWeight: "600", margin: "0 0 0.5rem 0" }}>WhatsApp Link</h4>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input
                      type="text"
                      value={whatsappUrl}
                      readOnly
                      className="form-input"
                      style={{ flex: 1, fontSize: "0.75rem", fontFamily: "monospace" }}
                    />
                    <button onClick={copyWhatsAppLink} className="btn btn-secondary btn-sm">
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        <div className="card">
          <div style={{ padding: "1rem", borderBottom: "1px solid #e9ecef" }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: "600", margin: "0" }}>Preview</h3>
            <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: "0.25rem 0 0 0" }}>
              How your WhatsApp Business Card will look
            </p>
          </div>

          <div style={{ padding: "1rem" }}>
            {isGenerated ? (
              <div
                style={{
                  maxWidth: "320px",
                  margin: "0 auto",
                  border: "1px solid #e9ecef",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  backgroundColor: cardData.theme.backgroundColor,
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                {/* Header Image */}
                <div style={{ position: "relative", height: "120px", overflow: "hidden" }}>
                  <img
                    src={cardData.image || "/placeholder.svg"}
                    alt="Restaurant"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      left: "0.75rem",
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "2px solid white",
                      backgroundColor: "white",
                    }}
                  >
                    <img
                      src={cardData.logo || "/placeholder.svg"}
                      alt="Logo"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "1rem" }}>
                  <h2
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "700",
                      margin: "0 0 0.25rem 0",
                      color: cardData.theme.textColor,
                    }}
                  >
                    {cardData.restaurantName}
                  </h2>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: cardData.theme.primaryColor,
                      fontWeight: "500",
                      margin: "0 0 0.5rem 0",
                    }}
                  >
                    {cardData.tagline}
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#6c757d",
                      margin: "0 0 1rem 0",
                      lineHeight: "1.4",
                    }}
                  >
                    {cardData.description}
                  </p>

                  {/* Rating */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.75rem" }}>
                    <Star className="h-4 w-4" style={{ color: "#fbbf24", fill: "#fbbf24" }} />
                    <span style={{ fontSize: "0.75rem", fontWeight: "500" }}>
                      {cardData.rating} ({cardData.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Phone className="h-3 w-3" style={{ color: "#6c757d" }} />
                      <span style={{ fontSize: "0.75rem", color: "#6c757d" }}>{cardData.phone}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <MapPin className="h-3 w-3" style={{ color: "#6c757d" }} />
                      <span style={{ fontSize: "0.75rem", color: "#6c757d" }}>{cardData.address}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Clock className="h-3 w-3" style={{ color: "#6c757d" }} />
                      <span style={{ fontSize: "0.75rem", color: "#6c757d" }}>{cardData.hours}</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div style={{ marginBottom: "1rem" }}>
                    <h4 style={{ fontSize: "0.75rem", fontWeight: "600", margin: "0 0 0.5rem 0" }}>Specialties</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                      {cardData.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          style={{
                            padding: "0.25rem 0.5rem",
                            backgroundColor: "#f3f4f6",
                            color: "#374151",
                            borderRadius: "0.25rem",
                            fontSize: "0.625rem",
                            fontWeight: "500",
                          }}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp Button */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "0.75rem",
                      backgroundColor: cardData.theme.primaryColor,
                      color: "white",
                      borderRadius: "0.5rem",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      transition: "all 0.2s",
                    }}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div
                style={{
                  maxWidth: "320px",
                  margin: "0 auto",
                  border: "2px dashed #dee2e6",
                  borderRadius: "0.75rem",
                  padding: "3rem 1rem",
                  textAlign: "center",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 style={{ fontSize: "1rem", fontWeight: "600", margin: "0 0 0.5rem 0", color: "#6c757d" }}>
                  Generate Your Card
                </h3>
                <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: "0 0 1rem 0" }}>
                  Click "Generate Card" to create your WhatsApp Business Card preview
                </p>
                <button
                  onClick={handleAIGenerate}
                  disabled={isGenerating}
                  className="btn btn-primary"
                  style={{
                    cursor: isGenerating ? "not-allowed" : "pointer",
                    opacity: isGenerating ? 0.7 : 1,
                  }}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating..." : "Generate Card"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="card mt-6" style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: "600", margin: "0 0 1rem 0" }}>
          How to Use Your WhatsApp Business Card
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "3rem",
                height: "3rem",
                backgroundColor: "#e8f5e8",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 0.75rem",
              }}
            >
              <span style={{ fontSize: "1rem", fontWeight: "600", color: "#2d5a2d" }}>1</span>
            </div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: "600", margin: "0 0 0.5rem 0" }}>Share the Link</h4>
            <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: "0" }}>
              Share your WhatsApp link on social media, website, or business cards
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "3rem",
                height: "3rem",
                backgroundColor: "#e8f4fd",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 0.75rem",
              }}
            >
              <span style={{ fontSize: "1rem", fontWeight: "600", color: "#0c5460" }}>2</span>
            </div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: "600", margin: "0 0 0.5rem 0" }}>Print QR Code</h4>
            <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: "0" }}>
              Print the QR code on menus, flyers, or table tents for easy scanning
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "3rem",
                height: "3rem",
                backgroundColor: "#fff3cd",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 0.75rem",
              }}
            >
              <span style={{ fontSize: "1rem", fontWeight: "600", color: "#856404" }}>3</span>
            </div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: "600", margin: "0 0 0.5rem 0" }}>Connect with Customers</h4>
            <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: "0" }}>
              Customers can instantly start a WhatsApp conversation with your restaurant
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
