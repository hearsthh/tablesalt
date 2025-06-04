"use client"

import { useState, useEffect } from "react"
import {
  Star,
  TrendingUp,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Download,
  RefreshCw,
  CheckCircle,
  Clock,
  ExternalLink,
  Search,
  Filter,
} from "lucide-react"

interface Review {
  id: string
  platform: string
  author: string
  rating: number
  text: string
  date: string
  sentiment: "positive" | "negative" | "neutral"
  responded: boolean
  helpful: number
  verified: boolean
}

interface PlatformStats {
  platform: string
  totalReviews: number
  averageRating: number
  lastSync: string
  connected: boolean
  logo: string
  status: "connected" | "disconnected" | "syncing"
}

export default function ReviewsAggregatorPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [selectedSentiment, setSelectedSentiment] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const [platformStats] = useState<PlatformStats[]>([
    {
      platform: "Google",
      totalReviews: 156,
      averageRating: 4.6,
      lastSync: "2 minutes ago",
      connected: true,
      logo: "/google-logo.svg",
      status: "connected",
    },
    {
      platform: "Zomato",
      totalReviews: 89,
      averageRating: 4.4,
      lastSync: "5 minutes ago",
      connected: true,
      logo: "/zomato-logo.svg",
      status: "connected",
    },
    {
      platform: "TripAdvisor",
      totalReviews: 67,
      averageRating: 4.5,
      lastSync: "1 hour ago",
      connected: true,
      logo: "/tripadvisor-logo.svg",
      status: "syncing",
    },
    {
      platform: "Facebook",
      totalReviews: 0,
      averageRating: 0,
      lastSync: "Never",
      connected: false,
      logo: "",
      status: "disconnected",
    },
  ])

  const [reviews] = useState<Review[]>([
    {
      id: "1",
      platform: "Google",
      author: "Priya Sharma",
      rating: 5,
      text: "Absolutely amazing food! The butter chicken was perfectly creamy and the naan was fresh and warm. Service was excellent and the ambiance was perfect for a family dinner. Will definitely be coming back!",
      date: "2024-01-15",
      sentiment: "positive",
      responded: true,
      helpful: 12,
      verified: true,
    },
    {
      id: "2",
      platform: "Zomato",
      author: "Rahul Kumar",
      rating: 4,
      text: "Good food overall, but the wait time was a bit long during peak hours. The biryani was flavorful and the portions were generous. Staff was friendly and accommodating.",
      date: "2024-01-14",
      sentiment: "positive",
      responded: false,
      helpful: 8,
      verified: true,
    },
    {
      id: "3",
      platform: "Google",
      author: "Sarah Johnson",
      rating: 2,
      text: "Disappointed with our experience. The food was cold when it arrived and the service was slow. The restaurant was also quite noisy. Expected better based on the reviews.",
      date: "2024-01-13",
      sentiment: "negative",
      responded: true,
      helpful: 3,
      verified: false,
    },
  ])

  const totalReviews = platformStats.reduce((sum, platform) => sum + platform.totalReviews, 0)
  const overallRating =
    platformStats.reduce((sum, platform) => sum + platform.averageRating * platform.totalReviews, 0) / totalReviews
  const connectedPlatforms = platformStats.filter((p) => p.connected).length

  const filteredReviews = reviews.filter((review) => {
    const matchesPlatform = selectedPlatform === "all" || review.platform === selectedPlatform
    const matchesSentiment = selectedSentiment === "all" || review.sentiment === selectedSentiment
    const matchesSearch =
      review.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.author.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesPlatform && matchesSentiment && matchesSearch
  })

  const sentimentCounts = {
    positive: reviews.filter((r) => r.sentiment === "positive").length,
    negative: reviews.filter((r) => r.sentiment === "negative").length,
    neutral: reviews.filter((r) => r.sentiment === "neutral").length,
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      alert("Reviews refreshed successfully!")
    }, 2000)
  }

  const handleExport = () => {
    alert("Reviews exported to CSV!")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "#22c55e"
      case "syncing":
        return "#f59e0b"
      case "disconnected":
        return "#ef4444"
      default:
        return "#94a3b8"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "connected":
        return "Connected"
      case "syncing":
        return "Syncing"
      case "disconnected":
        return "Connect"
      default:
        return "Unknown"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp style={{ width: "14px", height: "14px" }} />
      case "negative":
        return <ThumbsDown style={{ width: "14px", height: "14px" }} />
      case "neutral":
        return <MessageSquare style={{ width: "14px", height: "14px" }} />
      default:
        return <MessageSquare style={{ width: "14px", height: "14px" }} />
    }
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/dashboard" className="breadcrumb-item">
          Dashboard
        </a>
        <span className="breadcrumb-separator">/</span>
        <a href="/dashboard/profile" className="breadcrumb-item">
          Profile
        </a>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Reviews Aggregator</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
        <div>
          <h1>Reviews & Ratings</h1>
          <p>Monitor and manage reviews from all platforms in one place</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={handleRefresh} disabled={isRefreshing} className="btn btn-secondary btn-sm">
            <RefreshCw style={{ width: "16px", height: "16px" }} className={isRefreshing ? "animate-spin" : ""} />
            {isRefreshing ? "Syncing..." : "Sync"}
          </button>
          <button onClick={handleExport} className="btn btn-secondary btn-sm">
            <Download style={{ width: "16px", height: "16px" }} />
            Export
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="stats-grid mb-8">
        <div className="stat-card">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <Star style={{ width: "20px", height: "20px", color: "#f59e0b" }} />
            <span className="stat-label">Overall Rating</span>
          </div>
          <div className="stat-number">{overallRating.toFixed(1)}</div>
          <div style={{ fontSize: "12px", color: "#666666" }}>Based on {totalReviews} reviews</div>
        </div>

        <div className="stat-card">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <MessageSquare style={{ width: "20px", height: "20px", color: "#3b82f6" }} />
            <span className="stat-label">Total Reviews</span>
          </div>
          <div className="stat-number">{totalReviews}</div>
          <div style={{ fontSize: "12px", color: "#666666" }}>Across {connectedPlatforms} platforms</div>
        </div>

        <div className="stat-card">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <TrendingUp style={{ width: "20px", height: "20px", color: "#22c55e" }} />
            <span className="stat-label">Positive Reviews</span>
          </div>
          <div className="stat-number">{sentimentCounts.positive}</div>
          <div style={{ fontSize: "12px", color: "#666666" }}>
            {Math.round((sentimentCounts.positive / reviews.length) * 100)}% of total
          </div>
        </div>

        <div className="stat-card">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <Clock style={{ width: "20px", height: "20px", color: "#f59e0b" }} />
            <span className="stat-label">Response Rate</span>
          </div>
          <div className="stat-number">
            {Math.round((reviews.filter((r) => r.responded).length / reviews.length) * 100)}%
          </div>
          <div style={{ fontSize: "12px", color: "#666666" }}>
            {reviews.filter((r) => r.responded).length} of {reviews.length} responded
          </div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="card mb-8" style={{ padding: "32px" }}>
        <h3 style={{ marginBottom: "24px" }}>Platform Overview</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {platformStats.map((platform) => (
            <div key={platform.platform} className="platform-card">
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {platform.logo ? (
                    <img src={platform.logo || "/placeholder.svg"} alt={platform.platform} className="platform-logo" />
                  ) : (
                    <div className="platform-logo-text">{platform.platform.substring(0, 2).toUpperCase()}</div>
                  )}
                  <span style={{ fontWeight: "600", color: "#000000" }}>{platform.platform}</span>
                </div>
                <span
                  className="badge"
                  style={{
                    background: `${getStatusColor(platform.status)}15`,
                    color: getStatusColor(platform.status),
                  }}
                >
                  {getStatusText(platform.status)}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: "700", color: "#000000" }}>{platform.totalReviews}</div>
                  <div style={{ fontSize: "12px", color: "#666666" }}>Reviews</div>
                </div>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: "700", color: "#000000" }}>
                    {platform.averageRating > 0 ? `${platform.averageRating.toFixed(1)}★` : "—"}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666666" }}>Rating</div>
                </div>
              </div>

              <div style={{ fontSize: "12px", color: "#666666", marginBottom: "12px" }}>
                Last sync: {platform.lastSync}
              </div>

              {platform.connected ? (
                <button className="btn btn-secondary btn-sm" style={{ width: "100%" }}>
                  <Eye style={{ width: "14px", height: "14px" }} />
                  View Reviews
                </button>
              ) : (
                <button className="btn btn-primary btn-sm" style={{ width: "100%" }}>
                  <ExternalLink style={{ width: "14px", height: "14px" }} />
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-8" style={{ padding: "24px" }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "200px", position: "relative" }}>
            <Search
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "16px",
                height: "16px",
                color: "#666666",
              }}
            />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: "40px" }}
            />
          </div>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="form-select"
            style={{ minWidth: "140px" }}
          >
            <option value="all">All Platforms</option>
            {platformStats.map((platform) => (
              <option key={platform.platform} value={platform.platform}>
                {platform.platform}
              </option>
            ))}
          </select>
          <select
            value={selectedSentiment}
            onChange={(e) => setSelectedSentiment(e.target.value)}
            className="form-select"
            style={{ minWidth: "120px" }}
          >
            <option value="all">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
          <button className="btn btn-secondary btn-sm">
            <Filter style={{ width: "16px", height: "16px" }} />
            More Filters
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="card" style={{ padding: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h3 style={{ margin: "0" }}>Reviews ({filteredReviews.length})</h3>
        </div>

        {filteredReviews.length > 0 ? (
          <div className="reviews-list">
            {filteredReviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="review-author">
                    <div className="review-author-avatar">{review.author.charAt(0).toUpperCase()}</div>
                    <div>
                      <div className="review-author-name">
                        {review.author}
                        {review.verified && <CheckCircle className="verified-icon" />}
                      </div>
                      <div className="review-info">
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="star-icon"
                              style={{ color: i < review.rating ? "#f59e0b" : "#e5e7eb" }}
                            />
                          ))}
                        </div>
                        <span>
                          {review.platform} • {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="review-actions">
                    {review.responded && <span className="badge badge-success">Responded</span>}
                    <span>{review.helpful} helpful</span>
                  </div>
                </div>

                <p className="review-text">{review.text}</p>

                <div className="review-footer">
                  <div className="review-buttons">
                    {!review.responded && (
                      <button className="btn btn-primary btn-sm">
                        <MessageSquare className="button-icon" />
                        Reply
                      </button>
                    )}
                    <button className="btn btn-secondary btn-sm">
                      <ThumbsUp className="button-icon" />
                      Helpful
                    </button>
                  </div>
                  <button className="btn btn-secondary btn-sm">
                    <ExternalLink className="button-icon" />
                    View on {review.platform}
                  </button>
                  <span
                    className="badge"
                    style={{
                      background:
                        review.sentiment === "positive"
                          ? "#f0f9f0"
                          : review.sentiment === "negative"
                            ? "#fef2f2"
                            : "#f8f9fa",
                      color:
                        review.sentiment === "positive"
                          ? "#22c55e"
                          : review.sentiment === "negative"
                            ? "#ef4444"
                            : "#666666",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {getSentimentIcon(review.sentiment)}
                    {review.sentiment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <MessageSquare className="empty-state-icon" />
            <h4>No reviews found</h4>
            <p>Try adjusting your filters or connect more platforms to see reviews.</p>
          </div>
        )}
      </div>
    </div>
  )
}
