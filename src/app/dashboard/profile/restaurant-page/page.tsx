"use client"

import { useState, useEffect } from "react"
import {
  Globe,
  Edit,
  Eye,
  Save,
  Palette,
  Layout,
  MapPin,
  Phone,
  Mail,
  Clock,
  Plus,
  Trash2,
  Move,
  Zap,
  Camera,
  ArrowLeft,
  Copy,
  ExternalLink,
} from "lucide-react"

export default function SmartPageBuilder() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("content")
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Mock restaurant data
  const [restaurantData, setRestaurantData] = useState({
    name: "Spice Garden",
    tagline: "Authentic Indian Cuisine with Modern Flair",
    description:
      "Experience the rich flavors of traditional Indian cuisine reimagined for the modern palate. Our chefs use only the finest spices and freshest ingredients.",
    cuisine: "Indian",
    location: "123 Food Street, Gourmet District, Mumbai",
    phone: "+91 98765 43210",
    email: "hello@spicegarden.com",
    website: "www.spicegarden.com",
    hours: "Mon-Sun: 11:00 AM - 11:00 PM",
    rating: 4.6,
    reviewCount: 342,
    priceRange: "₹₹",
    specialties: ["Butter Chicken", "Biryani", "Tandoori Platter", "Dal Makhani"],
    images: [
      "/placeholder.svg?height=400&width=600&text=Restaurant+Interior",
      "/placeholder.svg?height=400&width=600&text=Signature+Dish",
      "/placeholder.svg?height=400&width=600&text=Chef+Special",
      "/placeholder.svg?height=400&width=600&text=Outdoor+Seating",
      "/placeholder.svg?height=400&width=600&text=Private+Dining",
    ],
    history:
      "Founded in 2010 by Chef Raj Kumar, Spice Garden began as a small family restaurant with recipes passed down through generations. What started as a 20-seat eatery has now grown into one of the city's most beloved dining destinations, known for its authentic flavors and warm hospitality.",
    awards: [
      "Best Indian Restaurant 2022 - Food & Travel Magazine",
      "Chef of the Year 2021 - Culinary Association of India",
      "Top 10 Restaurants in Mumbai - Dining Excellence Awards",
    ],
    press: [
      {
        title: "A Taste of Tradition with Modern Twists",
        publication: "The Mumbai Times",
        date: "June 2022",
      },
      {
        title: "Chef Raj Kumar's Journey from Home Kitchen to Culinary Stardom",
        publication: "Food Enthusiast Magazine",
        date: "March 2022",
      },
    ],
    funFacts: [
      "Our spice blend includes 24 different ingredients sourced from across India",
      "Our tandoor oven reaches temperatures of 480°C for the perfect naan",
      "We make over 200 pieces of fresh naan bread every day",
    ],
    popularity: {
      weeklyVisitors: 1200,
      mostOrderedDish: "Butter Chicken",
      averageRating: 4.6,
      repeatCustomers: "68%",
    },
    topReviews: [
      {
        author: "Priya M.",
        rating: 5,
        text: "The most authentic North Indian food I've had outside of Delhi. The butter chicken is to die for!",
        date: "2 weeks ago",
      },
      {
        author: "James W.",
        rating: 5,
        text: "Incredible flavors and excellent service. The ambiance is perfect for both casual dining and special occasions.",
        date: "1 month ago",
      },
      {
        author: "Anita S.",
        rating: 4,
        text: "Wonderful selection of vegetarian options. The dal makhani is creamy perfection!",
        date: "3 weeks ago",
      },
    ],
    aiReviewSummary:
      "Customers consistently praise the authentic flavors, attentive service, and welcoming atmosphere. The butter chicken and biryani receive the most positive mentions, while some reviews suggest the restaurant can get crowded during peak hours on weekends. Overall sentiment is overwhelmingly positive with 92% of reviews being 4-stars or higher.",
    theme: {
      primaryColor: "#d97706",
      secondaryColor: "#f59e0b",
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
    },
  })

  const [pageBlocks, setPageBlocks] = useState([
    { id: "hero", type: "hero", title: "Hero Section", enabled: true },
    { id: "about", type: "about", title: "About Us", enabled: true },
    { id: "menu", type: "menu", title: "Menu Highlights", enabled: true },
    { id: "gallery", type: "gallery", title: "Photo Gallery", enabled: true },
    { id: "reviews", type: "reviews", title: "Customer Reviews", enabled: true },
    { id: "awards", type: "awards", title: "Awards & Press", enabled: true },
    { id: "facts", type: "facts", title: "Fun Facts", enabled: true },
    { id: "contact", type: "contact", title: "Contact & Location", enabled: true },
  ])

  const pageUrl = `${restaurantData.name.toLowerCase().replace(/\s+/g, "-")}.tablesalt.ai`

  const handleAIGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      alert(
        "AI content generated successfully! Your page has been updated with fresh content based on your restaurant data.",
      )
    }, 3000)
  }

  const handleSave = () => {
    alert("Smart page saved successfully!")
  }

  const handlePublish = () => {
    setIsPublished(true)
    alert("Smart page published! Your page is now live and accessible to customers.")
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://${pageUrl}`)
    alert("URL copied to clipboard!")
  }

  if (isPreviewMode) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: restaurantData.theme.backgroundColor }}>
        {/* Preview Header */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "#1e293b",
            color: "white",
            padding: isMobile ? "0.5rem 0.75rem" : "0.75rem",
            zIndex: 1000,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button
              onClick={() => setIsPreviewMode(false)}
              style={{
                backgroundColor: "#475569",
                color: "white",
                border: "none",
                padding: "0.25rem 0.5rem",
                borderRadius: "0.25rem",
                cursor: "pointer",
                fontSize: "0.625rem",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <ArrowLeft className="h-3 w-3" />
              Back
            </button>
            <span style={{ fontSize: "0.625rem", fontWeight: "500" }}>Preview Mode</span>
          </div>
          {!isMobile && (
            <div style={{ fontSize: "0.625rem", fontFamily: "monospace", color: "#94a3b8" }}>{pageUrl}</div>
          )}
        </div>

        {/* Preview Content - Same as before but with paddingTop adjustment */}
        <div style={{ paddingTop: "3.5rem" }}>
          {/* Hero Section */}
          <section
            style={{
              background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${restaurantData.images[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: isMobile ? "50vh" : "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              textAlign: "center",
              padding: "0 1rem",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: isMobile ? "1.75rem" : "2.25rem",
                  fontWeight: "700",
                  margin: "0 0 0.75rem 0",
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                {restaurantData.name}
              </h1>
              <p
                style={{
                  fontSize: isMobile ? "0.875rem" : "1rem",
                  margin: "0 0 1.5rem 0",
                  maxWidth: "600px",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                {restaurantData.tagline}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  justifyContent: "center",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    background: `linear-gradient(135deg, ${restaurantData.theme.primaryColor} 0%, ${restaurantData.theme.secondaryColor} 100%)`,
                    color: "white",
                    border: "none",
                    padding: isMobile ? "0.75rem 2rem" : "0.75rem 1.5rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    width: isMobile ? "100%" : "auto",
                    maxWidth: isMobile ? "200px" : "none",
                  }}
                >
                  View Menu
                </button>
                <button
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.3)",
                    padding: isMobile ? "0.75rem 2rem" : "0.75rem 1.5rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    backdropFilter: "blur(10px)",
                    width: isMobile ? "100%" : "auto",
                    maxWidth: isMobile ? "200px" : "none",
                  }}
                >
                  Book Table
                </button>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section style={{ backgroundColor: "#f8f9fa", padding: "3rem 1rem" }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
              <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", margin: "0 0 1.5rem 0" }}>Visit Us</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "2rem",
                  textAlign: "left",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "1.25rem", margin: "0 0 1rem 0" }}>Contact Information</h3>
                  <div>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        margin: "0.5rem 0",
                        fontSize: "0.875rem",
                      }}
                    >
                      <MapPin className="h-4 w-4" />
                      {restaurantData.location}
                    </p>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        margin: "0.5rem 0",
                        fontSize: "0.875rem",
                      }}
                    >
                      <Phone className="h-4 w-4" />
                      {restaurantData.phone}
                    </p>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        margin: "0.5rem 0",
                        fontSize: "0.875rem",
                      }}
                    >
                      <Mail className="h-4 w-4" />
                      {restaurantData.email}
                    </p>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        margin: "0.5rem 0",
                        fontSize: "0.875rem",
                      }}
                    >
                      <Clock className="h-4 w-4" />
                      {restaurantData.hours}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.25rem", margin: "0 0 1rem 0" }}>Location Map</h3>
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      backgroundColor: "#e9ecef",
                      borderRadius: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#6c757d",
                    }}
                  >
                    <MapPin className="h-6 w-6" />
                    <span style={{ marginLeft: "0.5rem", fontSize: "0.875rem" }}>Interactive Map</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ backgroundColor: "#212529", color: "white", padding: "2rem 1rem", textAlign: "center" }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "1.5rem", margin: "0 0 1rem 0" }}>{restaurantData.name}</h2>
              <p style={{ fontSize: "0.875rem", margin: "0 0 1.5rem 0", color: "#adb5bd" }}>{restaurantData.tagline}</p>
              <div style={{ fontSize: "0.75rem", color: "#6c757d" }}>
                © {new Date().getFullYear()} {restaurantData.name}. All rights reserved.
              </div>
              <div style={{ fontSize: "0.75rem", color: "#6c757d", marginTop: "0.5rem" }}>Powered by TableSalt.ai</div>
            </div>
          </footer>
        </div>
      </div>
    )
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
        <span className="breadcrumb-current">Smart Marketing Page</span>
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
            <h1 style={{ fontSize: isMobile ? "1.25rem" : "1.5rem", marginBottom: "0.25rem" }}>Smart Marketing Page</h1>
            <p style={{ fontSize: "0.75rem", color: "#6c757d" }}>
              Create and customize your AI-powered restaurant landing page
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setIsPreviewMode(true)}
              className="btn btn-secondary"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.625rem",
                padding: "0.375rem 0.5rem",
              }}
            >
              <Eye className="h-3 w-3" />
              Preview
            </button>
            <button
              onClick={handleSave}
              className="btn btn-secondary"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.625rem",
                padding: "0.375rem 0.5rem",
              }}
            >
              <Save className="h-3 w-3" />
              Save
            </button>
            <button
              onClick={handlePublish}
              className="btn btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.625rem",
                padding: "0.375rem 0.5rem",
              }}
            >
              <Globe className="h-3 w-3" />
              {isPublished ? "Published" : "Publish"}
            </button>
          </div>
        </div>
      </div>

      {/* Page Status */}
      {isPublished && (
        <div
          className="card mb-4"
          style={{ padding: "0.75rem", backgroundColor: "#e8f5e8", border: "1px solid #c3e6c3" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Globe className="h-4 w-4" style={{ color: "#2d5a2d" }} />
              <span style={{ fontSize: "0.75rem", fontWeight: "500", color: "#2d5a2d" }}>
                Your page is live at: {pageUrl}
              </span>
            </div>
            <div style={{ display: "flex", gap: "0.25rem" }}>
              <button
                onClick={copyUrl}
                className="btn btn-secondary"
                style={{ padding: "0.25rem 0.5rem", fontSize: "0.625rem" }}
              >
                <Copy className="h-3 w-3" />
              </button>
              <a
                href={`https://${pageUrl}`}
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

      {/* AI Generation Banner */}
      <div
        className="card mb-4"
        style={{
          padding: "0.75rem",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          border: "1px solid #e2e8f0",
        }}
      >
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
            <h3 style={{ margin: 0, display: "flex", alignItems: "center", fontSize: "0.75rem", fontWeight: "600" }}>
              <Zap className="h-3 w-3" style={{ color: "#475569", marginRight: "0.375rem" }} />
              AI-Powered Content Generation
            </h3>
            <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.625rem", color: "#64748b" }}>
              Generate professional content based on your restaurant data and integrations
            </p>
          </div>
          <button
            onClick={handleAIGenerate}
            disabled={isGenerating}
            className="btn btn-primary"
            style={{
              background: isGenerating ? "#94a3b8" : "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
              borderColor: "#1e293b",
              fontSize: "0.625rem",
              padding: "0.375rem 0.75rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              cursor: isGenerating ? "not-allowed" : "pointer",
            }}
          >
            <Zap className="h-3 w-3" style={{ marginRight: "0.25rem" }} />
            {isGenerating ? "Generating..." : "Generate Content"}
          </button>
        </div>
      </div>

      {/* Editor Tabs */}
      <div className="card">
        <div style={{ borderBottom: "1px solid #e9ecef" }}>
          <div style={{ display: "flex", gap: "0" }}>
            {[
              { id: "content", label: "Content", icon: Edit },
              { id: "layout", label: "Layout", icon: Layout },
              { id: "design", label: "Design", icon: Palette },
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
          {activeTab === "content" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
              {/* Basic Information */}
              <div>
                <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "0.875rem" }}>Basic Information</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div>
                    <label className="form-label">Restaurant Name</label>
                    <input
                      type="text"
                      value={restaurantData.name}
                      onChange={(e) => setRestaurantData({ ...restaurantData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Tagline</label>
                    <input
                      type="text"
                      value={restaurantData.tagline}
                      onChange={(e) => setRestaurantData({ ...restaurantData, tagline: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Description</label>
                    <textarea
                      value={restaurantData.description}
                      onChange={(e) => setRestaurantData({ ...restaurantData, description: e.target.value })}
                      className="form-textarea"
                      rows={3}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label className="form-label">Cuisine Type</label>
                      <input
                        type="text"
                        value={restaurantData.cuisine}
                        onChange={(e) => setRestaurantData({ ...restaurantData, cuisine: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="form-label">Price Range</label>
                      <select
                        value={restaurantData.priceRange}
                        onChange={(e) => setRestaurantData({ ...restaurantData, priceRange: e.target.value })}
                        className="form-select"
                      >
                        <option value="₹">₹ - Budget Friendly</option>
                        <option value="₹₹">₹₹ - Moderate</option>
                        <option value="₹₹₹">₹₹₹ - Upscale</option>
                        <option value="₹₹₹₹">₹₹₹₹ - Fine Dining</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "0.875rem" }}>Contact Information</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div>
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      value={restaurantData.location}
                      onChange={(e) => setRestaurantData({ ...restaurantData, location: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        value={restaurantData.phone}
                        onChange={(e) => setRestaurantData({ ...restaurantData, phone: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        value={restaurantData.email}
                        onChange={(e) => setRestaurantData({ ...restaurantData, email: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Operating Hours</label>
                    <input
                      type="text"
                      value={restaurantData.hours}
                      onChange={(e) => setRestaurantData({ ...restaurantData, hours: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "0.875rem" }}>Specialties</h3>
                <div>
                  <label className="form-label">Signature Dishes</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "0.5rem" }}>
                    {restaurantData.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        style={{
                          padding: "0.25rem 0.375rem",
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #dee2e6",
                          borderRadius: "0.25rem",
                          fontSize: "0.75rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        {specialty}
                        <button
                          onClick={() => {
                            const newSpecialties = restaurantData.specialties.filter((_, i) => i !== index)
                            setRestaurantData({ ...restaurantData, specialties: newSpecialties })
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "0",
                            color: "#6c757d",
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "0.375rem" }}>
                    <input
                      type="text"
                      placeholder="Add specialty"
                      className="form-input"
                      style={{ flex: 1 }}
                      onKeyPress={(e) => {
                        const target = e.target as HTMLInputElement
                        if (e.key === "Enter" && target.value.trim()) {
                          setRestaurantData({
                            ...restaurantData,
                            specialties: [...restaurantData.specialties, target.value.trim()],
                          })
                          target.value = ""
                        }
                      }}
                    />
                    <button className="btn btn-secondary">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "layout" && (
            <div>
              <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "0.875rem" }}>Page Layout</h3>
              <p style={{ color: "#6c757d", marginBottom: "1rem", fontSize: "0.75rem" }}>
                Drag and drop to reorder sections, or toggle them on/off
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {pageBlocks.map((block, index) => (
                  <div
                    key={block.id}
                    style={{
                      padding: "0.75rem",
                      border: "1px solid #e9ecef",
                      borderRadius: "0.375rem",
                      backgroundColor: block.enabled ? "#ffffff" : "#f8f9fa",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <Move className="h-4 w-4" style={{ color: "#6c757d", cursor: "grab" }} />
                      <div>
                        <div style={{ fontWeight: "500", fontSize: "0.75rem" }}>{block.title}</div>
                        <div style={{ fontSize: "0.625rem", color: "#6c757d", textTransform: "capitalize" }}>
                          {block.type} section
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.375rem", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={block.enabled}
                          onChange={(e) => {
                            const newBlocks = [...pageBlocks]
                            newBlocks[index].enabled = e.target.checked
                            setPageBlocks(newBlocks)
                          }}
                          style={{ width: "0.875rem", height: "0.875rem" }}
                        />
                        <span style={{ fontSize: "0.75rem" }}>Enabled</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "design" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
              {/* Theme Colors */}
              <div>
                <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "0.875rem" }}>Theme Colors</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div>
                    <label className="form-label">Primary Color</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <input
                        type="color"
                        value={restaurantData.theme.primaryColor}
                        onChange={(e) =>
                          setRestaurantData({
                            ...restaurantData,
                            theme: { ...restaurantData.theme, primaryColor: e.target.value },
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
                        value={restaurantData.theme.primaryColor}
                        onChange={(e) =>
                          setRestaurantData({
                            ...restaurantData,
                            theme: { ...restaurantData.theme, primaryColor: e.target.value },
                          })
                        }
                        className="form-input"
                        style={{ flex: 1 }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Secondary Color</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <input
                        type="color"
                        value={restaurantData.theme.secondaryColor}
                        onChange={(e) =>
                          setRestaurantData({
                            ...restaurantData,
                            theme: { ...restaurantData.theme, secondaryColor: e.target.value },
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
                        value={restaurantData.theme.secondaryColor}
                        onChange={(e) =>
                          setRestaurantData({
                            ...restaurantData,
                            theme: { ...restaurantData.theme, secondaryColor: e.target.value },
                          })
                        }
                        className="form-input"
                        style={{ flex: 1 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div>
                <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "0.875rem" }}>Restaurant Images</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {restaurantData.images.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.5rem",
                        border: "1px solid #e9ecef",
                        borderRadius: "0.375rem",
                      }}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Restaurant image ${index + 1}`}
                        style={{ width: "3rem", height: "2.25rem", objectFit: "cover", borderRadius: "0.25rem" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.75rem", fontWeight: "500" }}>Image {index + 1}</div>
                        <div style={{ fontSize: "0.625rem", color: "#6c757d" }}>
                          {index === 0 ? "Hero image" : `Gallery image ${index}`}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "0.25rem" }}>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: "0.25rem 0.375rem", fontSize: "0.625rem" }}
                        >
                          <Edit className="h-3 w-3" />
                        </button>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: "0.25rem 0.375rem", fontSize: "0.625rem" }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    className="btn btn-secondary"
                    style={{
                      padding: "1.5rem",
                      border: "2px dashed #dee2e6",
                      backgroundColor: "transparent",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.375rem",
                      fontSize: "0.75rem",
                    }}
                  >
                    <Camera className="h-5 w-5" style={{ color: "#6c757d" }} />
                    <span style={{ fontSize: "0.75rem", color: "#6c757d" }}>Upload Image</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
