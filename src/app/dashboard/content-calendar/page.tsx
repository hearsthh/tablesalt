"use client"

import { useState } from "react"

// Sample content data with proper typing
interface ContentItem {
  id: string
  platform: "instagram" | "facebook" | "whatsapp"
  content:
    | string
    | {
        instagram: string
        facebook: string
        whatsapp: string
      }
  time: string
  status: "scheduled" | "posted" | "draft"
}

const sampleContent: ContentItem[] = [
  {
    id: "1",
    platform: "instagram",
    content:
      "🍝 Fresh pasta made daily! Come taste the difference at our authentic Italian kitchen. #FreshPasta #ItalianCuisine",
    time: "2:00 PM",
    status: "scheduled",
  },
  {
    id: "2",
    platform: "facebook",
    content:
      "Join us tonight for our special wine tasting event! 🍷 Featuring selections from Tuscany paired with our chef's specialties.",
    time: "6:00 PM",
    status: "draft",
  },
  {
    id: "3",
    platform: "whatsapp",
    content: "Good morning! Today's special: Grilled Salmon with lemon herb butter. Reserve your table now! 📞",
    time: "10:00 AM",
    status: "posted",
  },
]

const platformColors = {
  instagram: "#e1306c",
  facebook: "#1877f2",
  whatsapp: "#25d366",
}

export default function ContentCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string>("")

  const generateContent = async () => {
    setIsGenerating(true)

    // Simulate AI content generation
    setTimeout(() => {
      const sampleGenerated = `🍕 Pizza Night Special! 

Tonight only: Buy one pizza, get the second 50% off! 

Our wood-fired pizzas are made with:
✨ Fresh mozzarella 
✨ San Marzano tomatoes
✨ Artisanal dough made daily

Perfect for date night or family dinner! 

Book your table: [phone number]
#PizzaNight #ItalianFood #SpecialOffer`

      setGeneratedContent(sampleGenerated)
      setIsGenerating(false)
    }, 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Content copied to clipboard!")
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
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
      days.push(day)
    }

    return days
  }

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
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937", marginBottom: "0.5rem" }}>
          Content Calendar
        </h1>
        <p style={{ color: "#6b7280" }}>Generate and schedule AI-powered content for your restaurant</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* AI Content Generator */}
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem", color: "#1f2937" }}>
            🤖 AI Content Generator
          </h2>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>
              Content Type
            </label>
            <select className="form-input" style={{ width: "100%" }}>
              <option>Social Media Post</option>
              <option>Weekly Menu</option>
              <option>Special Promotion</option>
              <option>Event Announcement</option>
            </select>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>
              Platform
            </label>
            <select className="form-input" style={{ width: "100%" }}>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>WhatsApp</option>
              <option>All Platforms</option>
            </select>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>
              Additional Context
            </label>
            <textarea
              className="form-textarea"
              placeholder="e.g., Today's special is grilled salmon, we have a wine tasting event..."
              rows={3}
              style={{ width: "100%" }}
            />
          </div>

          <button
            onClick={generateContent}
            disabled={isGenerating}
            className="btn-primary"
            style={{ width: "100%", marginBottom: "1rem" }}
          >
            {isGenerating ? "🔄 Generating..." : "✨ Generate Content"}
          </button>

          {generatedContent && (
            <div
              style={{
                backgroundColor: "#f9fafb",
                padding: "1rem",
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <h3 style={{ fontWeight: "600", color: "#1f2937" }}>Generated Content</h3>
                <button
                  onClick={() => copyToClipboard(generatedContent)}
                  className="btn-secondary"
                  style={{ fontSize: "0.875rem", padding: "0.25rem 0.5rem" }}
                >
                  📋 Copy
                </button>
              </div>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  fontFamily: "inherit",
                  fontSize: "0.875rem",
                  color: "#374151",
                  margin: 0,
                }}
              >
                {generatedContent}
              </pre>
            </div>
          )}
        </div>

        {/* Calendar */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>
              📅 {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </h2>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                className="btn-secondary"
                style={{ padding: "0.25rem 0.5rem" }}
              >
                ←
              </button>
              <button
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                className="btn-secondary"
                style={{ padding: "0.25rem 0.5rem" }}
              >
                →
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "1px",
              backgroundColor: "#e5e7eb",
              borderRadius: "0.5rem",
              overflow: "hidden",
              marginBottom: "1rem",
            }}
          >
            {/* Day headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                style={{
                  backgroundColor: "#f3f4f6",
                  padding: "0.5rem",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {generateCalendarDays().map((day, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: day ? "white" : "#f9fafb",
                  padding: "0.5rem",
                  minHeight: "80px",
                  cursor: day ? "pointer" : "default",
                  opacity: day ? 1 : 0.5,
                }}
                onClick={() =>
                  day && setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))
                }
              >
                {day && (
                  <>
                    <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>{day}</div>
                    {day <= 5 && (
                      <div style={{ fontSize: "0.75rem" }}>
                        <div
                          style={{
                            display: "inline-block",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: platformColors.instagram,
                            marginRight: "0.25rem",
                          }}
                        ></div>
                        <div
                          style={{
                            display: "inline-block",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: platformColors.facebook,
                            marginRight: "0.25rem",
                          }}
                        ></div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scheduled Content */}
      <div className="card" style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem", color: "#1f2937" }}>
          📋 Today's Scheduled Content
        </h2>

        <div style={{ display: "grid", gap: "1rem" }}>
          {sampleContent.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                padding: "1rem",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: platformColors[item.platform],
                    }}
                  ></div>
                  <span style={{ fontWeight: "600", textTransform: "capitalize" }}>{item.platform}</span>
                  <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>{item.time}</span>
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    backgroundColor:
                      item.status === "posted" ? "#dcfce7" : item.status === "scheduled" ? "#dbeafe" : "#fef3c7",
                    color: item.status === "posted" ? "#166534" : item.status === "scheduled" ? "#1e40af" : "#92400e",
                  }}
                >
                  {item.status}
                </span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "#374151", margin: 0 }}>
                {typeof item.content === "string" ? item.content : item.content[item.platform]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
