"use client"

import { useState, useEffect } from "react"

export default function CalendarPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("month")
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const scheduledPosts = [
    {
      date: "2024-12-15",
      time: "18:00",
      platform: "Instagram",
      type: "Food Photo",
      content: "Fresh pasta made with love! 🍝 #FreshPasta #ItalianCuisine",
      status: "Scheduled",
    },
    {
      date: "2024-12-15",
      time: "20:00",
      platform: "Facebook",
      type: "Promotion",
      content: "Weekend special: 20% off on all main courses! Book now.",
      status: "Scheduled",
    },
    {
      date: "2024-12-16",
      time: "12:00",
      platform: "WhatsApp",
      type: "Menu Update",
      content: "New lunch menu available! Check out our healthy options.",
      status: "Draft",
    },
  ]

  const contentSuggestions = [
    {
      type: "Food Photography",
      content: "Showcase your signature dish with natural lighting",
      bestTime: "6:00 PM - 8:00 PM",
      platforms: ["Instagram", "Facebook"],
      engagement: "High",
    },
    {
      type: "Behind the Scenes",
      content: "Show your chef preparing fresh ingredients",
      bestTime: "2:00 PM - 4:00 PM",
      platforms: ["Instagram Stories", "TikTok"],
      engagement: "Medium",
    },
    {
      type: "Customer Testimonial",
      content: "Share positive reviews and customer photos",
      bestTime: "7:00 PM - 9:00 PM",
      platforms: ["Facebook", "Google"],
      engagement: "High",
    },
  ]

  const generateWeeklyContent = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      alert("Weekly content generated! Check your calendar.")
    }, 3000)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getPostsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return scheduledPosts.filter((post) => post.date === dateStr)
  }

  const days = getDaysInMonth(selectedDate)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 style={{ fontSize: isMobile ? "1.5rem" : "2rem", marginBottom: "0.5rem" }}>Marketing Calendar</h1>
        <p style={{ fontSize: isMobile ? "0.875rem" : "1rem", color: "#6b7280" }}>
          AI-powered content scheduling and planning
        </p>
      </div>

      {/* AI Content Generator */}
      <div className="elegant-card mb-6" style={{ padding: "2rem" }}>
        <h3 style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          🤖 AI Content Planner
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="form-group">
            <label className="form-label">Content Type</label>
            <select className="form-select">
              <option>Mixed Content</option>
              <option>Food Photography</option>
              <option>Promotional Posts</option>
              <option>Behind the Scenes</option>
              <option>Customer Stories</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Frequency</label>
            <select className="form-select">
              <option>Daily</option>
              <option>3x per week</option>
              <option>5x per week</option>
              <option>Custom</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Duration</label>
            <select className="form-select">
              <option>1 week</option>
              <option>2 weeks</option>
              <option>1 month</option>
              <option>3 months</option>
            </select>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={generateWeeklyContent}
          disabled={isGenerating}
          style={{ width: isMobile ? "100%" : "auto" }}
        >
          {isGenerating ? "🤖 Generating Content..." : "🤖 Generate Content Plan"}
        </button>
      </div>

      {/* Calendar Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            className="btn btn-ghost"
            onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
          >
            ←
          </button>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", margin: 0 }}>
            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </h2>
          <button
            className="btn btn-ghost"
            onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
          >
            →
          </button>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            className={`btn ${viewMode === "month" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setViewMode("month")}
            style={{ fontSize: "0.75rem", padding: "0.5rem 1rem" }}
          >
            Month
          </button>
          <button
            className={`btn ${viewMode === "week" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setViewMode("week")}
            style={{ fontSize: "0.75rem", padding: "0.5rem 1rem" }}
          >
            Week
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="elegant-card mb-6" style={{ padding: "1rem" }}>
        {/* Day Headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "1px",
            marginBottom: "1rem",
          }}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              style={{
                padding: "0.5rem",
                textAlign: "center",
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "#6b7280",
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "1px",
            background: "#e5e7eb",
            borderRadius: "0.5rem",
            overflow: "hidden",
          }}
        >
          {days.map((day, index) => {
            const posts = day ? getPostsForDate(day) : []
            const isToday = day && day.toDateString() === new Date().toDateString()

            return (
              <div
                key={index}
                style={{
                  background: day ? "white" : "#f9fafb",
                  padding: isMobile ? "0.5rem" : "1rem",
                  minHeight: isMobile ? "60px" : "100px",
                  cursor: day ? "pointer" : "default",
                  border: isToday ? "2px solid #3b82f6" : "none",
                }}
                onClick={() => day && setSelectedDate(day)}
              >
                {day && (
                  <>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: isToday ? "600" : "500",
                        color: isToday ? "#3b82f6" : "#1f2937",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {day.getDate()}
                    </div>
                    {posts.map((post, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: "0.625rem",
                          padding: "0.125rem 0.25rem",
                          borderRadius: "0.25rem",
                          background:
                            post.platform === "Instagram"
                              ? "#e1306c"
                              : post.platform === "Facebook"
                                ? "#1877f2"
                                : "#25d366",
                          color: "white",
                          marginBottom: "0.125rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {post.time} {post.type}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Content Suggestions */}
      <div className="mb-6">
        <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>AI Content Suggestions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contentSuggestions.map((suggestion, index) => (
            <div key={index} className="elegant-card" style={{ padding: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                }}
              >
                <h4 style={{ fontSize: "1rem", fontWeight: "600" }}>{suggestion.type}</h4>
                <span
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.5rem",
                    background: suggestion.engagement === "High" ? "#dcfce7" : "#fef3c7",
                    color: suggestion.engagement === "High" ? "#166534" : "#92400e",
                  }}
                >
                  {suggestion.engagement}
                </span>
              </div>

              <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>{suggestion.content}</p>

              <div style={{ marginBottom: "1rem" }}>
                <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.25rem" }}>Best Time:</div>
                <div style={{ fontSize: "0.875rem", fontWeight: "500" }}>{suggestion.bestTime}</div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.25rem" }}>Platforms:</div>
                <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
                  {suggestion.platforms.map((platform, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: "0.625rem",
                        padding: "0.125rem 0.5rem",
                        borderRadius: "0.5rem",
                        background: "#f3f4f6",
                        color: "#6b7280",
                      }}
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: "100%", fontSize: "0.75rem" }}>
                Schedule Post
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Posts */}
      <div>
        <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Upcoming Posts</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {scheduledPosts.map((post, index) => (
            <div key={index} className="elegant-card" style={{ padding: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.25rem" }}>
                    {post.platform} - {post.type}
                  </h4>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                    {post.date} at {post.time}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.5rem",
                    background: post.status === "Scheduled" ? "#dbeafe" : "#fef3c7",
                    color: post.status === "Scheduled" ? "#1e40af" : "#92400e",
                  }}
                >
                  {post.status}
                </span>
              </div>

              <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>{post.content}</p>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="btn btn-secondary" style={{ flex: 1, fontSize: "0.75rem" }}>
                  Edit
                </button>
                <button className="btn btn-ghost" style={{ flex: 1, fontSize: "0.75rem" }}>
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
