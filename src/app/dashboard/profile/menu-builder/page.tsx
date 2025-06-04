"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Eye,
  Save,
  Search,
  ArrowLeft,
  Copy,
  ExternalLink,
  X,
  FileText,
  Download,
  MenuIcon,
  Zap,
  Globe,
  Camera,
  Star,
  Award,
  TrendingUp,
  Heart,
  Monitor,
  Smartphone,
  CheckCircle,
} from "lucide-react"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  dietary: string[]
  isPopular: boolean
  isAvailable: boolean
  image?: string
  aiGenerated?: boolean
  tags: string[]
}

interface MenuCategory {
  id: string
  name: string
  description: string
  items: MenuItem[]
  color?: string
}

interface BrandSettings {
  primaryColor: string
  secondaryColor: string
  logo?: string
  fontStyle: string
  restaurantName: string
  tagline: string
}

interface ComboPreferences {
  priceRange: string
  comboTypes: string[]
  maxPrice: number
  minPrice: number
  targetSavings: number
  customPrompt: string
  includeTypes: {
    lunch: boolean
    dinner: boolean
    family: boolean
    couple: boolean
    individual: boolean
  }
}

const menuTags = [
  { id: "top-pick", label: "Top Pick", icon: Star, color: "#f59e0b" },
  { id: "best-seller", label: "Best Seller", icon: TrendingUp, color: "#ef4444" },
  { id: "must-have", label: "Must Have", icon: Heart, color: "#ec4899" },
  { id: "top-rated", label: "Top Rated", icon: Award, color: "#8b5cf6" },
  { id: "chef-special", label: "Chef's Special", icon: Star, color: "#10b981" },
  { id: "new", label: "New", icon: Plus, color: "#06b6d4" },
  { id: "ai-generated", label: "AI Generated", icon: Zap, color: "#7c3aed" },
]

const dietaryOptions = [
  { id: "vegetarian", label: "Vegetarian", color: "#10b981" },
  { id: "vegan", label: "Vegan", color: "#059669" },
  { id: "gluten-free", label: "Gluten-Free", color: "#0891b2" },
  { id: "dairy-free", label: "Dairy-Free", color: "#7c3aed" },
  { id: "nut-free", label: "Nut-Free", color: "#dc2626" },
  { id: "spicy", label: "Spicy", color: "#ea580c" },
]

export default function MenuBuilderPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [showAddItemModal, setShowAddItemModal] = useState(false)
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showSummaryModal, setShowSummaryModal] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null)
  const [showSidebar, setShowSidebar] = useState(!isMobile)
  const [isProcessingAI, setIsProcessingAI] = useState(false)
  const [previewCategory, setPreviewCategory] = useState("all")
  const [showComboModal, setShowComboModal] = useState(false)
  const [isGeneratingCombos, setIsGeneratingCombos] = useState(false)
  const [previewFormat, setPreviewFormat] = useState<"mobile" | "web">("web")
  const [generatedCombos, setGeneratedCombos] = useState<MenuItem[]>([])
  const [showComboPreview, setShowComboPreview] = useState(false)
  const [saveProgress, setSaveProgress] = useState(0)

  // Form states for modals
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    category: "",
    dietary: [],
    isPopular: false,
    isAvailable: true,
    tags: [],
  })

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    color: "#fef3c7",
  })

  const [comboPreferences, setComboPreferences] = useState<ComboPreferences>({
    priceRange: "mid-range",
    comboTypes: ["value", "family", "premium"],
    maxPrice: 1000,
    minPrice: 200,
    targetSavings: 15,
    customPrompt: "",
    includeTypes: {
      lunch: true,
      dinner: true,
      family: true,
      couple: true,
      individual: true,
    },
  })

  const [brandSettings] = useState<BrandSettings>({
    primaryColor: "#d97706",
    secondaryColor: "#f59e0b",
    fontStyle: "modern",
    restaurantName: "Spice Garden",
    tagline: "Authentic Indian Flavors",
  })

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setShowSidebar(!mobile)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([
    {
      id: "appetizers",
      name: "Appetizers",
      description: "Start your meal with our delicious appetizers",
      color: "#fef3c7",
      items: [
        {
          id: "1",
          name: "Samosa",
          description: "Crispy pastry filled with spiced potatoes and peas, served with mint chutney",
          price: 120,
          category: "appetizers",
          dietary: ["vegetarian", "vegan"],
          isPopular: true,
          isAvailable: true,
          image: "/placeholder.svg?height=200&width=300&text=Samosa",
          tags: ["top-pick", "best-seller"],
        },
        {
          id: "2",
          name: "Chicken Tikka",
          description: "Tender chicken pieces marinated in yogurt and spices, grilled to perfection",
          price: 280,
          category: "appetizers",
          dietary: ["non-vegetarian"],
          isPopular: true,
          isAvailable: true,
          tags: ["chef-special"],
        },
      ],
    },
    {
      id: "mains",
      name: "Main Courses",
      description: "Our signature main dishes",
      color: "#dbeafe",
      items: [
        {
          id: "3",
          name: "Butter Chicken",
          description: "Creamy tomato-based curry with tender chicken pieces, a true classic",
          price: 450,
          category: "mains",
          dietary: ["non-vegetarian"],
          isPopular: true,
          isAvailable: true,
          image: "/placeholder.svg?height=200&width=300&text=Butter+Chicken",
          tags: ["must-have", "top-rated"],
        },
        {
          id: "4",
          name: "Dal Makhani",
          description: "Rich and creamy black lentils slow-cooked with butter and aromatic spices",
          price: 320,
          category: "mains",
          dietary: ["vegetarian"],
          isPopular: false,
          isAvailable: true,
          tags: ["top-pick"],
        },
      ],
    },
  ])

  const allItems = menuCategories.flatMap((category) => category.items)
  const filteredItems = allItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getTagIcon = (tagId: string) => {
    const tag = menuTags.find((t) => t.id === tagId)
    return tag ? tag.icon : Star
  }

  const getTagColor = (tagId: string) => {
    const tag = menuTags.find((t) => t.id === tagId)
    return tag ? tag.color : "#6b7280"
  }

  const getTagLabel = (tagId: string) => {
    const tag = menuTags.find((t) => t.id === tagId)
    return tag ? tag.label : tagId
  }

  const getDietaryColor = (dietaryId: string) => {
    const dietary = dietaryOptions.find((d) => d.id === dietaryId)
    return dietary ? dietary.color : "#6b7280"
  }

  const handleAddItem = () => {
    setEditingItem(null)
    setNewItem({
      name: "",
      description: "",
      price: 0,
      category: menuCategories[0]?.id || "",
      dietary: [],
      isPopular: false,
      isAvailable: true,
      tags: [],
    })
    setShowAddItemModal(true)
  }

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item)
    setNewItem(item)
    setShowAddItemModal(true)
  }

  const handleSaveItem = () => {
    if (!newItem.name || !newItem.description || !newItem.price) {
      alert("Please fill in all required fields")
      return
    }

    const itemToSave: MenuItem = {
      id: editingItem?.id || `item-${Date.now()}`,
      name: newItem.name!,
      description: newItem.description!,
      price: newItem.price!,
      category: newItem.category!,
      dietary: newItem.dietary || [],
      isPopular: newItem.isPopular || false,
      isAvailable: newItem.isAvailable !== false,
      tags: newItem.tags || [],
      aiGenerated: newItem.aiGenerated,
    }

    setMenuCategories((prev) =>
      prev.map((category) => {
        if (category.id === itemToSave.category) {
          if (editingItem) {
            // Update existing item
            return {
              ...category,
              items: category.items.map((item) => (item.id === editingItem.id ? itemToSave : item)),
            }
          } else {
            // Add new item
            return {
              ...category,
              items: [...category.items, itemToSave],
            }
          }
        }
        // Remove item from other categories if editing
        if (editingItem) {
          return {
            ...category,
            items: category.items.filter((item) => item.id !== editingItem.id),
          }
        }
        return category
      }),
    )

    setShowAddItemModal(false)
    setEditingItem(null)
  }

  const removeMenuItem = (itemId: string) => {
    setMenuCategories((prev) =>
      prev.map((category) => ({
        ...category,
        items: category.items.filter((item) => item.id !== itemId),
      })),
    )
  }

  const handleSave = () => {
    alert("Menu saved successfully!")
  }

  const handlePublish = () => {
    setIsPublished(true)
    alert("Menu published! Your digital menu is now live.")
  }

  const handleDownloadPDF = (format: "mobile" | "web") => {
    alert(`${format === "mobile" ? "Mobile" : "Web"} PDF will be downloaded`)
  }

  const handleGenerateCombos = async () => {
    console.log("Starting combo generation with preferences:", comboPreferences)

    setIsGeneratingCombos(true)
    try {
      const response = await fetch("/api/ai/generate-combos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menuItems: allItems,
          restaurantData: {
            name: brandSettings.restaurantName,
            cuisine: "Indian",
            priceRange: comboPreferences.priceRange,
          },
          comboPreferences,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Combo generation result:", result)

      if (result.success && result.combos) {
        setGeneratedCombos(result.combos)
        setShowComboPreview(true)
        setShowComboModal(false)
      } else {
        alert(`Failed to generate combos: ${result.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error generating combos:", error)
      alert(`Error generating combos: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsGeneratingCombos(false)
    }
  }

  const handleAddCombosToMenu = () => {
    const comboCategory: MenuCategory = {
      id: "ai-combos",
      name: "AI Combo Meals",
      description: "AI-generated combo deals and value meals",
      color: "#e0e7ff",
      items: generatedCombos.map((combo) => ({
        ...combo,
        category: "ai-combos",
      })),
    }

    setMenuCategories((prev) => {
      const existingComboIndex = prev.findIndex((cat) => cat.id === "ai-combos")
      if (existingComboIndex >= 0) {
        const updated = [...prev]
        updated[existingComboIndex] = comboCategory
        return updated
      } else {
        return [...prev, comboCategory]
      }
    })

    setShowComboPreview(false)
    setGeneratedCombos([])
    alert(`Successfully added ${generatedCombos.length} AI-generated combos to your menu!`)
  }

  const scrollToCategory = (categoryId: string) => {
    setSelectedCategory(categoryId)
    const element = document.getElementById(`category-${categoryId}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const menuUrl = "spice-garden.tablesalt.ai/menu"

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://${menuUrl}`)
    alert("Menu URL copied to clipboard!")
  }

  const handleEditCategory = (category: MenuCategory) => {
    setEditingCategory(category)
    setNewCategory({
      name: category.name,
      description: category.description,
      color: category.color || "#fef3c7",
    })
    setShowAddCategoryModal(true)
  }

  const handleAddCategory = () => {
    setEditingCategory(null)
    setNewCategory({
      name: "",
      description: "",
      color: "#fef3c7",
    })
    setShowAddCategoryModal(true)
  }

  const handleSaveCategory = () => {
    if (!newCategory.name || !newCategory.description) {
      alert("Please fill in all required fields")
      return
    }

    const categoryToSave: MenuCategory = {
      id: editingCategory?.id || `category-${Date.now()}`,
      name: newCategory.name,
      description: newCategory.description,
      color: newCategory.color,
      items: editingCategory?.items || [],
    }

    setMenuCategories((prev) => {
      if (editingCategory) {
        // Update existing category
        return prev.map((cat) => (cat.id === editingCategory.id ? categoryToSave : cat))
      } else {
        // Add new category
        return [...prev, categoryToSave]
      }
    })

    setShowAddCategoryModal(false)
    setEditingCategory(null)
  }

  // Preview mode component - COMPLETE IMPLEMENTATION
  if (isPreviewMode) {
    const filteredCategories = menuCategories.filter((category) => {
      if (previewCategory === "all") return true
      return category.id === previewCategory
    })

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom right, #f9fafb, #f3f4f6)",
          fontFamily: brandSettings.fontStyle === "modern" ? "system-ui" : "serif",
        }}
      >
        {/* Admin Controls Header */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            backgroundColor: "white",
            borderBottom: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "16px 24px",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              gap: "16px",
            }}
          >
            {/* Left Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button
                onClick={() => setIsPreviewMode(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  backgroundColor: "#111827",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  transition: "all 0.2s ease",
                }}
              >
                <ArrowLeft style={{ width: "16px", height: "16px" }} />
                Back to Editor
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#10b981",
                    borderRadius: "50%",
                    animation: "pulse 2s infinite",
                  }}
                ></div>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#6b7280" }}>Live Preview</span>
              </div>
            </div>

            {/* Center - Format Toggle */}
            <div
              style={{
                display: "flex",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
                padding: "4px",
              }}
            >
              <button
                onClick={() => setPreviewFormat("web")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  backgroundColor: previewFormat === "web" ? "white" : "transparent",
                  color: previewFormat === "web" ? "#111827" : "#6b7280",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  boxShadow: previewFormat === "web" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <Monitor style={{ width: "16px", height: "16px" }} />
                Web View
              </button>
              <button
                onClick={() => setPreviewFormat("mobile")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  backgroundColor: previewFormat === "mobile" ? "white" : "transparent",
                  color: previewFormat === "mobile" ? "#111827" : "#6b7280",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  boxShadow: previewFormat === "mobile" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <Smartphone style={{ width: "16px", height: "16px" }} />
                Mobile View
              </button>
            </div>

            {/* Right Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={() => handleDownloadPDF("mobile")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  backgroundColor: "white",
                  color: "#374151",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  transition: "all 0.2s ease",
                }}
              >
                <Download style={{ width: "16px", height: "16px" }} />
                Mobile PDF
              </button>
              <button
                onClick={() => handleDownloadPDF("web")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  backgroundColor: "white",
                  color: "#374151",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  transition: "all 0.2s ease",
                }}
              >
                <Download style={{ width: "16px", height: "16px" }} />
                Web PDF
              </button>
              <div
                style={{
                  display: isMobile ? "none" : "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  color: "#6b7280",
                }}
              >
                <Globe style={{ width: "12px", height: "12px" }} />
                {menuUrl}
              </div>
            </div>
          </div>
        </div>

        {/* Customer-Facing Menu */}
        <div
          style={{
            maxWidth: previewFormat === "mobile" ? "480px" : "1280px",
            margin: "0 auto",
            padding: "32px 24px",
          }}
        >
          {/* Web View: Sidebar Layout */}
          {previewFormat === "web" && (
            <div style={{ display: "flex", gap: "32px" }}>
              {/* Web Sidebar */}
              <div
                style={{
                  width: "320px",
                  position: "sticky",
                  top: "120px",
                  alignSelf: "flex-start",
                  height: "fit-content",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(229, 231, 235, 0.5)",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      marginBottom: "24px",
                      color: brandSettings.primaryColor,
                    }}
                  >
                    Menu Categories
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <button
                      onClick={() => setPreviewCategory("all")}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "12px 16px",
                        backgroundColor: previewCategory === "all" ? `${brandSettings.primaryColor}15` : "transparent",
                        color: previewCategory === "all" ? brandSettings.primaryColor : "#374151",
                        border: "none",
                        borderLeft:
                          previewCategory === "all"
                            ? `3px solid ${brandSettings.primaryColor}`
                            : "3px solid transparent",
                        borderRadius: "12px",
                        fontSize: "15px",
                        fontWeight: "500",
                        cursor: "pointer",
                        boxShadow: previewCategory === "all" ? "0 2px 5px rgba(0,0,0,0.05)" : "none",
                        transform: previewCategory === "all" ? "scale(1.02)" : "scale(1)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>All Items</span>
                        <span style={{ fontSize: "14px", opacity: "0.6" }}>({allItems.length})</span>
                      </div>
                    </button>
                    {menuCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setPreviewCategory(category.id)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "12px 16px",
                          backgroundColor:
                            previewCategory === category.id ? `${brandSettings.primaryColor}15` : "transparent",
                          color: previewCategory === category.id ? brandSettings.primaryColor : "#374151",
                          border: "none",
                          borderLeft:
                            previewCategory === category.id
                              ? `3px solid ${brandSettings.primaryColor}`
                              : "3px solid transparent",
                          borderRadius: "12px",
                          fontSize: "15px",
                          fontWeight: "500",
                          cursor: "pointer",
                          boxShadow: previewCategory === category.id ? "0 2px 5px rgba(0,0,0,0.05)" : "none",
                          transform: previewCategory === category.id ? "scale(1.02)" : "scale(1)",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span>{category.name}</span>
                          <span style={{ fontSize: "14px", opacity: "0.6" }}>({category.items.length})</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div style={{ flex: "1" }}>
                {/* Restaurant Header */}
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "48px",
                    backgroundColor: "white",
                    borderRadius: "16px",
                    padding: "32px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    border: "1px solid rgba(229, 231, 235, 0.5)",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      margin: "0 auto 16px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `linear-gradient(135deg, ${brandSettings.primaryColor}, ${brandSettings.secondaryColor})`,
                    }}
                  >
                    <span style={{ fontSize: "28px", fontWeight: "700", color: "white" }}>
                      {brandSettings.restaurantName.charAt(0)}
                    </span>
                  </div>
                  <h1
                    style={{
                      fontSize: "42px",
                      fontWeight: "700",
                      marginBottom: "12px",
                      background: `linear-gradient(135deg, ${brandSettings.primaryColor}, ${brandSettings.secondaryColor})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {brandSettings.restaurantName}
                  </h1>
                  <p style={{ fontSize: "20px", color: "#6b7280", fontWeight: "300" }}>{brandSettings.tagline}</p>
                  <div
                    style={{
                      marginTop: "24px",
                      width: "96px",
                      height: "4px",
                      borderRadius: "2px",
                      background: `linear-gradient(90deg, ${brandSettings.primaryColor}, ${brandSettings.secondaryColor})`,
                      margin: "24px auto 0",
                    }}
                  ></div>
                </div>

                {/* Menu Items */}
                {previewCategory === "all"
                  ? menuCategories.map((category) => (
                      <section key={category.id} style={{ marginBottom: "64px" }}>
                        <div style={{ marginBottom: "32px" }}>
                          <h2
                            style={{
                              fontSize: "32px",
                              fontWeight: "700",
                              marginBottom: "12px",
                              color: brandSettings.primaryColor,
                            }}
                          >
                            {category.name}
                          </h2>
                          <p style={{ fontSize: "18px", color: "#6b7280" }}>{category.description}</p>
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                            gap: "24px",
                          }}
                        >
                          {category.items.map((item) => (
                            <div
                              key={item.id}
                              style={{
                                backgroundColor: "white",
                                border: "1px solid #e5e7eb",
                                borderRadius: "16px",
                                overflow: "hidden",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                transition: "all 0.3s ease",
                              }}
                            >
                              {/* Only show image if it exists and is not placeholder */}
                              {item.image && !item.image.includes("placeholder") && (
                                <div style={{ position: "relative" }}>
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    style={{
                                      width: "100%",
                                      height: "192px",
                                      objectFit: "cover",
                                    }}
                                  />
                                  {/* Tags on image */}
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "12px",
                                      left: "12px",
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: "4px",
                                    }}
                                  >
                                    {item.tags.slice(0, 2).map((tagId) => {
                                      const TagIcon = getTagIcon(tagId)
                                      return (
                                        <span
                                          key={tagId}
                                          style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            padding: "4px 10px",
                                            borderRadius: "9999px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: "white",
                                            backgroundColor: getTagColor(tagId),
                                            backdropFilter: "blur(4px)",
                                          }}
                                        >
                                          <TagIcon style={{ width: "12px", height: "12px" }} />
                                          {getTagLabel(tagId)}
                                        </span>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* Content Section */}
                              <div style={{ padding: "24px" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: "12px",
                                  }}
                                >
                                  <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#111827", margin: 0 }}>
                                    {item.name}
                                  </h3>
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: "600",
                                      color: brandSettings.primaryColor,
                                      marginLeft: "12px",
                                    }}
                                  >
                                    ₹{item.price}
                                  </span>
                                </div>
                                <p
                                  style={{
                                    color: "#6b7280",
                                    fontSize: "14px",
                                    lineHeight: "1.5",
                                    marginBottom: "16px",
                                  }}
                                >
                                  {item.description}
                                </p>

                                {/* Tags for items without images */}
                                {(!item.image || item.image.includes("placeholder")) && item.tags.length > 0 && (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: "6px",
                                      marginBottom: "16px",
                                    }}
                                  >
                                    {item.tags.map((tagId) => {
                                      const TagIcon = getTagIcon(tagId)
                                      return (
                                        <span
                                          key={tagId}
                                          style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            padding: "4px 10px",
                                            borderRadius: "9999px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: "white",
                                            backgroundColor: getTagColor(tagId),
                                          }}
                                        >
                                          <TagIcon style={{ width: "12px", height: "12px" }} />
                                          {getTagLabel(tagId)}
                                        </span>
                                      )
                                    })}
                                  </div>
                                )}

                                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                  {item.dietary.map((diet) => (
                                    <span
                                      key={diet}
                                      style={{
                                        fontSize: "12px",
                                        padding: "4px 10px",
                                        borderRadius: "9999px",
                                        backgroundColor: "#ecfdf5",
                                        color: "#047857",
                                        fontWeight: "500",
                                        textTransform: "capitalize",
                                        border: "1px solid #a7f3d0",
                                      }}
                                    >
                                      {diet}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    ))
                  : filteredCategories.map((category) => (
                      <section key={category.id} style={{ marginBottom: "64px" }}>
                        <div style={{ marginBottom: "32px" }}>
                          <h2
                            style={{
                              fontSize: "32px",
                              fontWeight: "700",
                              marginBottom: "12px",
                              color: brandSettings.primaryColor,
                            }}
                          >
                            {category.name}
                          </h2>
                          <p style={{ fontSize: "18px", color: "#6b7280" }}>{category.description}</p>
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                            gap: "24px",
                          }}
                        >
                          {category.items.map((item) => (
                            <div
                              key={item.id}
                              style={{
                                backgroundColor: "white",
                                border: "1px solid #e5e7eb",
                                borderRadius: "16px",
                                overflow: "hidden",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                transition: "all 0.3s ease",
                              }}
                            >
                              {/* Only show image if it exists and is not placeholder */}
                              {item.image && !item.image.includes("placeholder") && (
                                <div style={{ position: "relative" }}>
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    style={{
                                      width: "100%",
                                      height: "192px",
                                      objectFit: "cover",
                                    }}
                                  />
                                  {/* Tags on image */}
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "12px",
                                      left: "12px",
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: "4px",
                                    }}
                                  >
                                    {item.tags.slice(0, 2).map((tagId) => {
                                      const TagIcon = getTagIcon(tagId)
                                      return (
                                        <span
                                          key={tagId}
                                          style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            padding: "4px 10px",
                                            borderRadius: "9999px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: "white",
                                            backgroundColor: getTagColor(tagId),
                                            backdropFilter: "blur(4px)",
                                          }}
                                        >
                                          <TagIcon style={{ width: "12px", height: "12px" }} />
                                          {getTagLabel(tagId)}
                                        </span>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* Content Section */}
                              <div style={{ padding: "24px" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: "12px",
                                  }}
                                >
                                  <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#111827", margin: 0 }}>
                                    {item.name}
                                  </h3>
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: "600",
                                      color: brandSettings.primaryColor,
                                      marginLeft: "12px",
                                    }}
                                  >
                                    ₹{item.price}
                                  </span>
                                </div>
                                <p
                                  style={{
                                    color: "#6b7280",
                                    fontSize: "14px",
                                    lineHeight: "1.5",
                                    marginBottom: "16px",
                                  }}
                                >
                                  {item.description}
                                </p>

                                {/* Tags for items without images */}
                                {(!item.image || item.image.includes("placeholder")) && item.tags.length > 0 && (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: "6px",
                                      marginBottom: "16px",
                                    }}
                                  >
                                    {item.tags.map((tagId) => {
                                      const TagIcon = getTagIcon(tagId)
                                      return (
                                        <span
                                          key={tagId}
                                          style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            padding: "4px 10px",
                                            borderRadius: "9999px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: "white",
                                            backgroundColor: getTagColor(tagId),
                                          }}
                                        >
                                          <TagIcon style={{ width: "12px", height: "12px" }} />
                                          {getTagLabel(tagId)}
                                        </span>
                                      )
                                    })}
                                  </div>
                                )}

                                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                  {item.dietary.map((diet) => (
                                    <span
                                      key={diet}
                                      style={{
                                        fontSize: "12px",
                                        padding: "4px 10px",
                                        borderRadius: "9999px",
                                        backgroundColor: "#ecfdf5",
                                        color: "#047857",
                                        fontWeight: "500",
                                        textTransform: "capitalize",
                                        border: "1px solid #a7f3d0",
                                      }}
                                    >
                                      {diet}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    ))}
              </div>
            </div>
          )}

          {/* Mobile View: Tabs Layout */}
          {previewFormat === "mobile" && (
            <div style={{ maxWidth: "480px", margin: "0 auto" }}>
              {/* Restaurant Header for Mobile */}
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "32px",
                  backgroundColor: "white",
                  borderRadius: "16px",
                  padding: "24px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  border: "1px solid rgba(229, 231, 235, 0.5)",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    margin: "0 auto 12px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(135deg, ${brandSettings.primaryColor}, ${brandSettings.secondaryColor})`,
                  }}
                >
                  <span style={{ fontSize: "24px", fontWeight: "700", color: "white" }}>
                    {brandSettings.restaurantName.charAt(0)}
                  </span>
                </div>
                <h1
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    marginBottom: "8px",
                    background: `linear-gradient(135deg, ${brandSettings.primaryColor}, ${brandSettings.secondaryColor})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {brandSettings.restaurantName}
                </h1>
                <p style={{ fontSize: "16px", color: "#6b7280", fontWeight: "300" }}>{brandSettings.tagline}</p>
                <div
                  style={{
                    marginTop: "16px",
                    width: "64px",
                    height: "3px",
                    borderRadius: "1.5px",
                    background: `linear-gradient(90deg, ${brandSettings.primaryColor}, ${brandSettings.secondaryColor})`,
                    margin: "16px auto 0",
                  }}
                ></div>
              </div>

              {/* Mobile Category Tabs */}
              <div
                style={{
                  position: "sticky",
                  top: "96px",
                  zIndex: "40",
                  marginLeft: "-24px",
                  marginRight: "-24px",
                  padding: "16px 24px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(8px)",
                  borderBottom: "1px solid rgba(229, 231, 235, 0.5)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    overflowX: "auto",
                    gap: "8px",
                    paddingBottom: "4px",
                    scrollbarWidth: "none", // Firefox
                  }}
                >
                  <button
                    onClick={() => setPreviewCategory("all")}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "9999px",
                      fontSize: "14px",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                      transition: "all 0.2s ease",
                      backgroundColor: previewCategory === "all" ? brandSettings.primaryColor : "white",
                      color: previewCategory === "all" ? "white" : "#6b7280",
                      border: previewCategory === "all" ? "none" : "1px solid #e5e7eb",
                      boxShadow: previewCategory === "all" ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
                    }}
                  >
                    All
                  </button>
                  {menuCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setPreviewCategory(category.id)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "9999px",
                        fontSize: "14px",
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                        transition: "all 0.2s ease",
                        backgroundColor: previewCategory === category.id ? brandSettings.primaryColor : "white",
                        color: previewCategory === category.id ? "white" : "#6b7280",
                        border: previewCategory === category.id ? "none" : "1px solid #e5e7eb",
                        boxShadow: previewCategory === category.id ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
                      }}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu Items for Mobile */}
              <div style={{ marginTop: "24px" }}>
                {previewCategory === "all"
                  ? menuCategories.map((category) => (
                      <section key={category.id} style={{ marginBottom: "40px" }}>
                        <div style={{ marginBottom: "16px" }}>
                          <h2
                            style={{
                              fontSize: "24px",
                              fontWeight: "700",
                              marginBottom: "8px",
                              color: brandSettings.primaryColor,
                            }}
                          >
                            {category.name}
                          </h2>
                          <p style={{ fontSize: "16px", color: "#6b7280" }}>{category.description}</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                          {category.items.map((item) => (
                            <div
                              key={item.id}
                              style={{
                                backgroundColor: "white",
                                border: "1px solid #e5e7eb",
                                borderRadius: "12px",
                                overflow: "hidden",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                                transition: "all 0.3s ease",
                              }}
                            >
                              {/* Only show image if it exists and is not placeholder */}
                              {item.image && !item.image.includes("placeholder") && (
                                <div style={{ position: "relative" }}>
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    style={{
                                      width: "100%",
                                      height: "192px",
                                      objectFit: "cover",
                                    }}
                                  />
                                  {/* Tags on image */}
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "12px",
                                      left: "12px",
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: "4px",
                                    }}
                                  >
                                    {item.tags.slice(0, 1).map((tagId) => {
                                      const TagIcon = getTagIcon(tagId)
                                      return (
                                        <span
                                          key={tagId}
                                          style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            padding: "4px 10px",
                                            borderRadius: "9999px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: "white",
                                            backgroundColor: getTagColor(tagId),
                                          }}
                                        >
                                          <TagIcon style={{ width: "12px", height: "12px" }} />
                                          {getTagLabel(tagId)}
                                        </span>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* Content Section */}
                              <div style={{ padding: "20px" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: "12px",
                                  }}
                                >
                                  <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", margin: 0 }}>
                                    {item.name}
                                  </h3>
                                  <span
                                    style={{
                                      fontSize: "18px",
                                      fontWeight: "600",
                                      color: brandSettings.primaryColor,
                                      marginLeft: "12px",
                                    }}
                                  >
                                    ₹{item.price}
                                  </span>
                                </div>
                                <p
                                  style={{
                                    color: "#6b7280",
                                    fontSize: "14px",
                                    lineHeight: "1.5",
                                    marginBottom: "16px",
                                  }}
                                >
                                  {item.description}
                                </p>

                                {/* Tags for items without images */}
                                {(!item.image || item.image.includes("placeholder")) && item.tags.length > 0 && (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: "6px",
                                      marginBottom: "16px",
                                    }}
                                  >
                                    {item.tags.map((tagId) => {
                                      const TagIcon = getTagIcon(tagId)
                                      return (
                                        <span
                                          key={tagId}
                                          style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            padding: "4px 10px",
                                            borderRadius: "9999px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: "white",
                                            backgroundColor: getTagColor(tagId),
                                          }}
                                        >
                                          <TagIcon style={{ width: "12px", height: "12px" }} />
                                          {getTagLabel(tagId)}
                                        </span>
                                      )
                                    })}
                                  </div>
                                )}

                                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                  {item.dietary.map((diet) => (
                                    <span
                                      key={diet}
                                      style={{
                                        fontSize: "12px",
                                        padding: "4px 10px",
                                        borderRadius: "9999px",
                                        backgroundColor: "#ecfdf5",
                                        color: "#047857",
                                        fontWeight: "500",
                                        textTransform: "capitalize",
                                        border: "1px solid #a7f3d0",
                                      }}
                                    >
                                      {diet}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    ))
                  : filteredCategories.map((category) => (
                      <section key={category.id} style={{ marginBottom: "40px" }}>
                        <div style={{ marginBottom: "16px" }}>
                          <h2
                            style={{
                              fontSize: "24px",
                              fontWeight: "700",
                              marginBottom: "8px",
                              color: brandSettings.primaryColor,
                            }}
                          >
                            {category.name}
                          </h2>
                          <p style={{ fontSize: "16px", color: "#6b7280" }}>{category.description}</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                          {category.items.map((item) => (
                            <div
                              key={item.id}
                              style={{
                                backgroundColor: "white",
                                border: "1px solid #e5e7eb",
                                borderRadius: "12px",
                                overflow: "hidden",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                                transition: "all 0.3s ease",
                              }}
                            >
                              {/* Only show image if it exists and is not placeholder */}
                              {item.image && !item.image.includes("placeholder") && (
                                <div style={{ position: "relative" }}>
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    style={{
                                      width: "100%",
                                      height: "192px",
                                      objectFit: "cover",
                                    }}
                                  />
                                  {/* Tags on image */}
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "12px",
                                      left: "12px",
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: "4px",
                                    }}
                                  >
                                    {item.tags.slice(0, 1).map((tagId) => {
                                      const TagIcon = getTagIcon(tagId)
                                      return (
                                        <span
                                          key={tagId}
                                          style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            padding: "4px 10px",
                                            borderRadius: "9999px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: "white",
                                            backgroundColor: getTagColor(tagId),
                                          }}
                                        >
                                          <TagIcon style={{ width: "12px", height: "12px" }} />
                                          {getTagLabel(tagId)}
                                        </span>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* Content Section */}
                              <div style={{ padding: "20px" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: "12px",
                                  }}
                                >
                                  <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", margin: 0 }}>
                                    {item.name}
                                  </h3>
                                  <span
                                    style={{
                                      fontSize: "18px",
                                      fontWeight: "600",
                                      color: brandSettings.primaryColor,
                                      marginLeft: "12px",
                                    }}
                                  >
                                    ₹{item.price}
                                  </span>
                                </div>
                                <p
                                  style={{
                                    color: "#6b7280",
                                    fontSize: "14px",
                                    lineHeight: "1.5",
                                    marginBottom: "16px",
                                  }}
                                >
                                  {item.description}
                                </p>

                                {/* Tags for items without images */}
                                {(!item.image || item.image.includes("placeholder")) && item.tags.length > 0 && (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: "6px",
                                      marginBottom: "16px",
                                    }}
                                  >
                                    {item.tags.map((tagId) => {
                                      const TagIcon = getTagIcon(tagId)
                                      return (
                                        <span
                                          key={tagId}
                                          style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            padding: "4px 10px",
                                            borderRadius: "9999px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: "white",
                                            backgroundColor: getTagColor(tagId),
                                          }}
                                        >
                                          <TagIcon style={{ width: "12px", height: "12px" }} />
                                          {getTagLabel(tagId)}
                                        </span>
                                      )
                                    })}
                                  </div>
                                )}

                                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                  {item.dietary.map((diet) => (
                                    <span
                                      key={diet}
                                      style={{
                                        fontSize: "12px",
                                        padding: "4px 10px",
                                        borderRadius: "9999px",
                                        backgroundColor: "#ecfdf5",
                                        color: "#047857",
                                        fontWeight: "500",
                                        textTransform: "capitalize",
                                        border: "1px solid #a7f3d0",
                                      }}
                                    >
                                      {diet}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    ))}
              </div>
            </div>
          )}
        </div>

        {/* Restaurant Footer */}
        <div
          style={{
            backgroundColor: "white",
            borderTop: "1px solid #e5e7eb",
            marginTop: "64px",
            padding: "32px 0",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 24px",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div style={{ textAlign: isMobile ? "center" : "left" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "4px" }}>
                {brandSettings.restaurantName}
              </h3>
              <p style={{ fontSize: "14px", color: "#6b7280" }}>{brandSettings.tagline}</p>
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              <a
                href="#"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b7280",
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b7280",
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a
                href="#"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b7280",
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#9ca3af",
              marginTop: "24px",
            }}
          >
            <p>
              © {new Date().getFullYear()} {brandSettings.restaurantName}. All rights reserved.
            </p>
            <p style={{ marginTop: "4px" }}>
              Powered by{" "}
              <a
                href="#"
                style={{
                  color: "#4b5563",
                  fontWeight: "500",
                  transition: "color 0.2s ease",
                }}
              >
                TableSalt
              </a>
            </p>
          </div>
        </div>

        {/* Floating Action Button */}
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: "50",
          }}
        >
          <button
            onClick={() => setIsPreviewMode(false)}
            style={{
              width: "56px",
              height: "56px",
              background: "linear-gradient(135deg, #1f2937, #111827)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            <Edit style={{ width: "24px", height: "24px" }} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", display: "flex" }}>
      {/* Sidebar (same as before) */}
      {showSidebar && (
        <div
          style={{
            width: "280px",
            backgroundColor: "#ffffff",
            borderRight: "1px solid #e5e7eb",
            position: isMobile ? "fixed" : "sticky",
            top: "0",
            height: "100vh",
            overflowY: "auto",
            zIndex: isMobile ? "1000" : "auto",
          }}
        >
          <div style={{ padding: "24px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0" }}>Menu Navigation</h3>
              {isMobile && (
                <button
                  onClick={() => setShowSidebar(false)}
                  style={{ padding: "4px", border: "none", background: "none", cursor: "pointer" }}
                >
                  <X style={{ width: "16px", height: "16px" }} />
                </button>
              )}
            </div>

            <div style={{ marginBottom: "24px" }}>
              <button
                onClick={() => setShowSummaryModal(true)}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FileText style={{ width: "16px", height: "16px" }} />
                Menu Summary
              </button>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#6b7280",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                }}
              >
                Categories
              </div>
              <button
                onClick={() => scrollToCategory("all")}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  backgroundColor: selectedCategory === "all" ? "#f3f4f6" : "transparent",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  cursor: "pointer",
                  textAlign: "left",
                  marginBottom: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>All Items ({allItems.length})</span>
              </button>
              {menuCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    backgroundColor: selectedCategory === category.id ? "#f3f4f6" : "transparent",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    cursor: "pointer",
                    textAlign: "left",
                    marginBottom: "4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{category.name}</span>
                  <span style={{ fontSize: "12px", color: "#6b7280" }}>({category.items.length})</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleAddCategory}
              style={{
                width: "100%",
                padding: "8px 12px",
                backgroundColor: "transparent",
                border: "1px dashed #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
                color: "#6b7280",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Plus style={{ width: "14px", height: "14px" }} />
              Add Category
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ flex: "1", padding: "24px", maxWidth: showSidebar ? "calc(100vw - 280px)" : "100%" }}>
        {/* Mobile Menu Toggle */}
        {isMobile && !showSidebar && (
          <button
            onClick={() => setShowSidebar(true)}
            style={{
              position: "fixed",
              top: "20px",
              left: "20px",
              zIndex: "999",
              padding: "8px",
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <MenuIcon style={{ width: "20px", height: "20px" }} />
          </button>
        )}

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", fontSize: "14px" }}>
          <a href="/dashboard" style={{ color: "#6b7280", textDecoration: "none" }}>
            Dashboard
          </a>
          <span style={{ color: "#d1d5db" }}>/</span>
          <a href="/dashboard/profile" style={{ color: "#6b7280", textDecoration: "none" }}>
            Profile
          </a>
          <span style={{ color: "#d1d5db" }}>/</span>
          <span style={{ color: "#000000", fontWeight: "500" }}>Menu Builder</span>
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px", color: "#000000" }}>
              Digital Menu Builder
            </h1>
            <p style={{ color: "#6b7280", fontSize: "16px", margin: "0" }}>
              Create and manage your restaurant's digital menu with AI assistance
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              onClick={() => setShowUploadModal(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                backgroundColor: "#7c3aed",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
                boxShadow: "0 1px 2px rgba(124, 58, 237, 0.2)",
              }}
            >
              <Zap style={{ width: "14px", height: "14px" }} />
              AI Upload
            </button>
            <button
              onClick={() => setIsPreviewMode(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                color: "#374151",
              }}
            >
              <Eye style={{ width: "16px", height: "16px" }} />
              Preview
            </button>
            <button
              onClick={handleSave}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                color: "#374151",
              }}
            >
              <Save style={{ width: "16px", height: "16px" }} />
              Save
            </button>
            <button
              onClick={handlePublish}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                backgroundColor: "#000000",
                border: "1px solid #000000",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                color: "#ffffff",
              }}
            >
              <Upload style={{ width: "16px", height: "16px" }} />
              {isPublished ? "Published" : "Publish"}
            </button>
            <button
              onClick={() => setShowComboModal(true)}
              disabled={isGeneratingCombos}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                backgroundColor: isGeneratingCombos ? "#a78bfa" : "#7c3aed",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: isGeneratingCombos ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
                boxShadow: "0 1px 2px rgba(124, 58, 237, 0.2)",
                opacity: isGeneratingCombos ? 0.7 : 1,
              }}
            >
              <Zap style={{ width: "14px", height: "14px" }} />
              {isGeneratingCombos ? "Generating..." : "AI Combos"}
            </button>
          </div>
        </div>

        {/* Menu Status */}
        {isPublished && (
          <div
            style={{
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "8px", height: "8px", backgroundColor: "#22c55e", borderRadius: "50%" }}></div>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#000000" }}>
                  Your menu is live at: {menuUrl}
                </span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => handleDownloadPDF("web")}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "12px",
                  }}
                >
                  <Download style={{ width: "14px", height: "14px" }} />
                  PDF
                </button>
                <button
                  onClick={copyUrl}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  <Copy style={{ width: "14px", height: "14px" }} />
                </button>
                <a
                  href={`https://${menuUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "4px 8px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    textDecoration: "none",
                  }}
                >
                  <ExternalLink style={{ width: "14px", height: "14px" }} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "16px",
              alignItems: isMobile ? "stretch" : "center",
            }}
          >
            <div style={{ flex: "1", position: "relative" }}>
              <Search
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "16px",
                  height: "16px",
                  color: "#6b7280",
                }}
              />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  paddingLeft: "40px",
                  paddingRight: "16px",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: "12px 16px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "14px",
                minWidth: "160px",
                outline: "none",
              }}
            >
              <option value="all">All Categories</option>
              {menuCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddItem}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 20px",
                backgroundColor: "#000000",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <Plus style={{ width: "16px", height: "16px" }} />
              Add Item
            </button>
          </div>
        </div>

        {/* AI Processing Indicator */}
        {isProcessingAI && (
          <div
            style={{
              backgroundColor: "#fef3c7",
              border: "1px solid #f59e0b",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                border: "2px solid #f59e0b",
                borderTop: "2px solid transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            ></div>
            <span style={{ fontSize: "14px", fontWeight: "500", color: "#92400e" }}>
              AI is processing your menu with high accuracy extraction...
            </span>
          </div>
        )}

        {/* Menu Categories */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {menuCategories.map((category) => {
            const categoryItems = category.items.filter((item) => {
              const matchesSearch =
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
              const matchesCategory = selectedCategory === "all" || selectedCategory === category.id
              return matchesSearch && matchesCategory
            })

            if (categoryItems.length === 0 && selectedCategory !== "all" && selectedCategory !== category.id) {
              return null
            }

            return (
              <div
                key={category.id}
                id={`category-${category.id}`}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "32px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "4px", color: "#000000" }}>
                      {category.name}
                      {category.id === "ai-combos" && (
                        <span
                          style={{
                            marginLeft: "8px",
                            fontSize: "12px",
                            padding: "2px 6px",
                            backgroundColor: "#7c3aed",
                            color: "white",
                            borderRadius: "4px",
                            fontWeight: "500",
                          }}
                        >
                          AI Generated
                        </span>
                      )}
                    </h2>
                    <p style={{ fontSize: "14px", color: "#6b7280", margin: "0" }}>
                      {category.description} • {categoryItems.length} items
                    </p>
                  </div>
                  <button
                    onClick={() => handleEditCategory(category)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 12px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    <Edit style={{ width: "14px", height: "14px" }} />
                    Edit Category
                  </button>
                </div>

                {categoryItems.length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
                      gap: "20px",
                    }}
                  >
                    {categoryItems.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "12px",
                          overflow: "hidden",
                          transition: "all 0.2s ease",
                          position: "relative",
                        }}
                      >
                        {/* AI Generated Badge */}
                        {item.aiGenerated && (
                          <div
                            style={{
                              position: "absolute",
                              top: "8px",
                              left: "8px",
                              zIndex: 10,
                              backgroundColor: "#7c3aed",
                              color: "white",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              fontSize: "10px",
                              fontWeight: "600",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <Zap style={{ width: "10px", height: "10px" }} />
                            AI Generated
                          </div>
                        )}

                        {/* Image Section */}
                        {item.image ? (
                          <div style={{ position: "relative" }}>
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                              }}
                            />
                            <button
                              onClick={() => handleEditItem(item)}
                              style={{
                                position: "absolute",
                                top: "8px",
                                right: "8px",
                                padding: "6px",
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                color: "#6b7280",
                              }}
                            >
                              <Edit style={{ width: "14px", height: "14px" }} />
                            </button>
                          </div>
                        ) : (
                          <div
                            style={{
                              height: "120px",
                              backgroundColor: "#f9fafb",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "relative",
                            }}
                          >
                            <div style={{ textAlign: "center", color: "#6b7280" }}>
                              <Camera style={{ width: "24px", height: "24px", margin: "0 auto 8px" }} />
                              <p style={{ fontSize: "12px", margin: "0" }}>No image</p>
                            </div>
                            <button
                              onClick={() => handleEditItem(item)}
                              style={{
                                position: "absolute",
                                top: "8px",
                                right: "8px",
                                padding: "6px",
                                backgroundColor: "#ffffff",
                                border: "1px solid #e5e7eb",
                                borderRadius: "6px",
                                cursor: "pointer",
                                color: "#6b7280",
                              }}
                            >
                              <Edit style={{ width: "14px", height: "14px" }} />
                            </button>
                          </div>
                        )}

                        {/* Content Section */}
                        <div style={{ padding: "20px" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              marginBottom: "12px",
                            }}
                          >
                            <h4 style={{ fontSize: "18px", fontWeight: "600", margin: "0", color: "#000000" }}>
                              {item.name}
                            </h4>
                            <span style={{ fontSize: "18px", fontWeight: "600", color: "#000000" }}>₹{item.price}</span>
                          </div>
                          <p
                            style={{
                              color: "#6b7280",
                              fontSize: "14px",
                              marginBottom: "16px",
                              lineHeight: "1.5",
                              margin: "0 0 16px 0",
                            }}
                          >
                            {item.description}
                          </p>

                          {/* Tags */}
                          {item.tags.length > 0 && (
                            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
                              {item.tags.map((tagId) => {
                                const TagIcon = getTagIcon(tagId)
                                return (
                                  <span
                                    key={tagId}
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      fontSize: "11px",
                                      padding: "3px 6px",
                                      borderRadius: "4px",
                                      fontWeight: "500",
                                      color: "#ffffff",
                                      backgroundColor: getTagColor(tagId),
                                    }}
                                  >
                                    <TagIcon style={{ width: "10px", height: "10px" }} />
                                    {getTagLabel(tagId)}
                                  </span>
                                )
                              })}
                            </div>
                          )}

                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                              {item.isPopular && (
                                <span
                                  style={{
                                    backgroundColor: "#fef3c7",
                                    color: "#92400e",
                                    fontSize: "12px",
                                    padding: "4px 8px",
                                    borderRadius: "6px",
                                    fontWeight: "500",
                                  }}
                                >
                                  Popular
                                </span>
                              )}
                              {!item.isAvailable && (
                                <span
                                  style={{
                                    backgroundColor: "#fee2e2",
                                    color: "#991b1b",
                                    fontSize: "12px",
                                    padding: "4px 8px",
                                    borderRadius: "6px",
                                    fontWeight: "500",
                                  }}
                                >
                                  Unavailable
                                </span>
                              )}
                              {item.dietary.map((diet) => (
                                <span
                                  key={diet}
                                  style={{
                                    backgroundColor: "#dcfce7",
                                    color: "#166534",
                                    fontSize: "12px",
                                    padding: "4px 8px",
                                    borderRadius: "6px",
                                    fontWeight: "500",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {diet}
                                </span>
                              ))}
                            </div>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <button
                                onClick={() => removeMenuItem(item.id)}
                                style={{
                                  padding: "6px",
                                  backgroundColor: "#f9fafb",
                                  border: "1px solid #e5e7eb",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                  color: "#6b7280",
                                }}
                              >
                                <Trash2 style={{ width: "14px", height: "14px" }} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "48px 24px", color: "#6b7280" }}>
                    <h4 style={{ margin: "0 0 8px 0", color: "#000000", fontWeight: "500" }}>
                      No items in this category
                    </h4>
                    <p style={{ fontSize: "14px", margin: "0 0 16px 0" }}>Add your first menu item to get started</p>
                    <button
                      onClick={handleAddItem}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 16px",
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                    >
                      <Plus style={{ width: "14px", height: "14px" }} />
                      Add Item
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Enhanced Upload Modal */}
      {showUploadModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            zIndex: "1000",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              maxWidth: "600px",
              width: "100%",
              padding: "32px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(229, 231, 235, 0.2)",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0", color: "#000000" }}>
                AI-Powered Menu Upload
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                style={{
                  padding: "4px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
              >
                <X style={{ width: "20px", height: "20px" }} />
              </button>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "16px" }}>
                Upload your menu in any format and our AI will extract all items with high accuracy. Supports multiple
                sources and formats including scanned menus.
              </p>

              <div
                style={{
                  border: "2px dashed #d1d5db",
                  borderRadius: "8px",
                  padding: "32px",
                  textAlign: "center",
                  marginBottom: "16px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onClick={() => document.getElementById("file-upload")?.click()}
                onDragOver={(e) => {
                  e.preventDefault()
                  e.currentTarget.style.borderColor = "#7c3aed"
                  e.currentTarget.style.backgroundColor = "#faf5ff"
                }}
                onDragLeave={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db"
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  e.currentTarget.style.borderColor = "#d1d5db"
                  e.currentTarget.style.backgroundColor = "transparent"
                  const files = e.dataTransfer.files
                  if (files.length > 0) {
                    const fileInput = document.getElementById("file-upload") as HTMLInputElement
                    fileInput.files = files
                    fileInput.dispatchEvent(new Event("change", { bubbles: true }))
                  }
                }}
              >
                <Upload style={{ width: "32px", height: "32px", color: "#6b7280", margin: "0 auto 8px" }} />
                <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 8px 0" }}>
                  Drop your menu file here or click to browse
                </p>
                <p style={{ fontSize: "12px", color: "#9ca3af", margin: "0" }}>
                  Supports: TXT, PDF, JPG, PNG, AVIF, WebP, DOCX, Scanned Menus
                </p>
                <input
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                  accept=".pdf,.jpg,.jpeg,.png,.docx,.txt,.doc,.avif,.webp,.heic"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      console.log(`Selected file: ${file.name}, type: ${file.type}, size: ${file.size}`)

                      setIsProcessingAI(true)
                      setShowUploadModal(false)

                      const formData = new FormData()
                      formData.append("file", file)
                      formData.append("restaurantName", brandSettings.restaurantName)
                      formData.append("cuisine", "Indian")
                      formData.append("source", "upload")

                      try {
                        console.log("Sending file to enhanced AI processing...")
                        const response = await fetch("/api/ai/process-menu-file", {
                          method: "POST",
                          body: formData,
                        })

                        const result = await response.json()
                        console.log("Enhanced AI processing result:", result)

                        if (result.success) {
                          // COMPLETELY REPLACE existing menu data
                          setMenuCategories(result.processedMenu.categories)
                          setSelectedCategory("all")

                          alert(
                            `✅ Successfully processed ${file.name}!\n\n` +
                              `🎯 Extraction Confidence: ${result.confidence}%\n` +
                              `📊 Categories: ${result.processedMenu.categories.length}\n` +
                              `🍽️ Items Extracted: ${result.itemsCount}\n\n` +
                              `${result.processingNotes?.length > 0 ? `📝 Notes: ${result.processingNotes.join(", ")}\n\n` : ""}` +
                              `Your menu has been completely updated with AI-enhanced data.`,
                          )
                        } else {
                          alert(
                            `❌ Failed to process menu file:\n\n${result.error}\n\nPlease try again or use a different file format.`,
                          )
                        }
                      } catch (error) {
                        console.error("Error processing file:", error)
                        alert(
                          `❌ Error processing file:\n\n${error instanceof Error ? error.message : "Unknown error"}\n\nPlease check your connection and try again.`,
                        )
                      } finally {
                        setIsProcessingAI(false)
                      }
                    }
                  }}
                />
              </div>

              {/* Enhanced file format support info */}
              <div
                style={{
                  backgroundColor: "#f0f9ff",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #0ea5e9",
                  marginBottom: "16px",
                }}
              >
                <h4 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px", color: "#0369a1" }}>
                  🚀 Enhanced AI Processing Capabilities:
                </h4>
                <div
                  style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px" }}
                >
                  <div style={{ fontSize: "12px", color: "#0369a1" }}>
                    <strong>📄 Text Files:</strong> 99% accuracy
                  </div>
                  <div style={{ fontSize: "12px", color: "#0369a1" }}>
                    <strong>📋 PDF Menus:</strong> High accuracy extraction
                  </div>
                  <div style={{ fontSize: "12px", color: "#0369a1" }}>
                    <strong>📸 Scanned Menus:</strong> OCR processing
                  </div>
                  <div style={{ fontSize: "12px", color: "#0369a1" }}>
                    <strong>🏪 Platform Menus:</strong> Swiggy, Zomato formats
                  </div>
                  <div style={{ fontSize: "12px", color: "#0369a1" }}>
                    <strong>🖼️ Image Formats:</strong> JPG, PNG, AVIF, WebP
                  </div>
                  <div style={{ fontSize: "12px", color: "#0369a1" }}>
                    <strong>💰 Smart Pricing:</strong> Preserves original prices
                  </div>
                </div>
              </div>

              {/* Platform integration buttons */}
              <div style={{ marginBottom: "16px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px", color: "#000000" }}>
                  Or import from delivery platforms:
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                  <button
                    onClick={() => {
                      setShowUploadModal(false)
                      alert(
                        "Zomato integration coming soon! For now, please download your menu from Zomato and upload the file.",
                      )
                    }}
                    style={{
                      padding: "12px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#e23744",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Z
                    </div>
                    Import from Zomato
                  </button>
                  <button
                    onClick={() => {
                      setShowUploadModal(false)
                      alert(
                        "Swiggy integration coming soon! For now, please download your menu from Swiggy and upload the file.",
                      )
                    }}
                    style={{
                      padding: "12px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#fc8019",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      S
                    </div>
                    Import from Swiggy
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setShowUploadModal(false)}
                style={{
                  flex: "1",
                  padding: "10px 16px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  color: "#374151",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Combo Generation Modal */}
      {showComboModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              maxWidth: "700px",
              width: "100%",
              padding: "24px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0", color: "#000000" }}>AI Combo Generator</h3>
              <button
                onClick={() => setShowComboModal(false)}
                style={{
                  padding: "4px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
              >
                <X style={{ width: "20px", height: "20px" }} />
              </button>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "16px" }}>
                Configure AI preferences to generate intelligent combo meals that boost sales and customer satisfaction.
              </p>

              {/* Price Range Settings */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000000",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Price Range
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                  {["budget", "mid-range", "premium"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setComboPreferences((prev) => ({ ...prev, priceRange: range }))}
                      style={{
                        padding: "8px 12px",
                        backgroundColor: comboPreferences.priceRange === range ? "#7c3aed" : "#ffffff",
                        color: comboPreferences.priceRange === range ? "white" : "#374151",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "500",
                        cursor: "pointer",
                        textTransform: "capitalize",
                      }}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Limits */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div>
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#000000",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Min Price (₹)
                  </label>
                  <input
                    type="number"
                    value={comboPreferences.minPrice}
                    onChange={(e) =>
                      setComboPreferences((prev) => ({ ...prev, minPrice: Number.parseInt(e.target.value) || 0 }))
                    }
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#000000",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Max Price (₹)
                  </label>
                  <input
                    type="number"
                    value={comboPreferences.maxPrice}
                    onChange={(e) =>
                      setComboPreferences((prev) => ({ ...prev, maxPrice: Number.parseInt(e.target.value) || 1000 }))
                    }
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>
              </div>

              {/* Target Savings */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000000",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Target Savings: {comboPreferences.targetSavings}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="30"
                  value={comboPreferences.targetSavings}
                  onChange={(e) =>
                    setComboPreferences((prev) => ({ ...prev, targetSavings: Number.parseInt(e.target.value) }))
                  }
                  style={{
                    width: "100%",
                    height: "6px",
                    borderRadius: "3px",
                    background: "#e5e7eb",
                    outline: "none",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#6b7280",
                    marginTop: "4px",
                  }}
                >
                  <span>10%</span>
                  <span>20%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Combo Types */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000000",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Combo Types to Include
                </label>
                <div
                  style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "8px" }}
                >
                  {Object.entries(comboPreferences.includeTypes).map(([type, included]) => (
                    <label key={type} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={included}
                        onChange={(e) =>
                          setComboPreferences((prev) => ({
                            ...prev,
                            includeTypes: { ...prev.includeTypes, [type]: e.target.checked },
                          }))
                        }
                        style={{ width: "16px", height: "16px" }}
                      />
                      <span style={{ fontSize: "13px", textTransform: "capitalize" }}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Custom Prompt */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000000",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Custom Requirements (Optional)
                </label>
                <textarea
                  value={comboPreferences.customPrompt}
                  onChange={(e) => setComboPreferences((prev) => ({ ...prev, customPrompt: e.target.value }))}
                  placeholder="e.g., Focus on healthy options, include regional specialties, create family-friendly combos..."
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    minHeight: "80px",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Current Menu Summary */}
              <div
                style={{
                  backgroundColor: "#f9fafb",
                  padding: "16px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                }}
              >
                <h4 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "#000000" }}>
                  Current Menu Analysis
                </h4>
                <div
                  style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "8px" }}
                >
                  <div style={{ fontSize: "12px", color: "#374151" }}>
                    <strong>Total Items:</strong> {allItems.length}
                  </div>
                  <div style={{ fontSize: "12px", color: "#374151" }}>
                    <strong>Categories:</strong> {menuCategories.length}
                  </div>
                  <div style={{ fontSize: "12px", color: "#374151" }}>
                    <strong>Avg Price:</strong> ₹
                    {Math.round(allItems.reduce((sum, item) => sum + item.price, 0) / allItems.length || 0)}
                  </div>
                  <div style={{ fontSize: "12px", color: "#374151" }}>
                    <strong>Veg Items:</strong> {allItems.filter((item) => item.dietary.includes("vegetarian")).length}
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div
                style={{
                  backgroundColor: "#fef3c7",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #f59e0b",
                }}
              >
                <p style={{ fontSize: "12px", color: "#92400e", margin: "0" }}>
                  💡 AI will analyze your menu items, create intelligent pairings, calculate optimal pricing with{" "}
                  {comboPreferences.targetSavings}% savings, and generate{" "}
                  {Object.values(comboPreferences.includeTypes).filter(Boolean).length} types of combos within ₹
                  {comboPreferences.minPrice}-₹{comboPreferences.maxPrice} range.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setShowComboModal(false)}
                style={{
                  flex: "1",
                  padding: "10px 16px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  color: "#374151",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateCombos}
                disabled={isGeneratingCombos || allItems.length < 3}
                style={{
                  flex: "2",
                  padding: "10px 16px",
                  backgroundColor: isGeneratingCombos || allItems.length < 3 ? "#9ca3af" : "#7c3aed",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: isGeneratingCombos || allItems.length < 3 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {isGeneratingCombos && (
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid #ffffff",
                      borderTop: "2px solid transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                )}
                <Zap style={{ width: "16px", height: "16px" }} />
                {isGeneratingCombos ? "Generating AI Combos..." : "Generate Smart Combos"}
              </button>
            </div>

            {allItems.length < 3 && (
              <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "8px", textAlign: "center" }}>
                Need at least 3 menu items to generate intelligent combos
              </p>
            )}
          </div>
        </div>
      )}

      {/* Combo Preview Modal */}
      {showComboPreview && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              maxWidth: "800px",
              width: "100%",
              padding: "24px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0", color: "#000000" }}>
                AI Generated Combos Preview
              </h3>
              <button
                onClick={() => setShowComboPreview(false)}
                style={{
                  padding: "4px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
              >
                <X style={{ width: "20px", height: "20px" }} />
              </button>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  backgroundColor: "#f0f9ff",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #0ea5e9",
                  marginBottom: "16px",
                }}
              >
                <p style={{ fontSize: "14px", color: "#0369a1", margin: "0" }}>
                  <strong>🤖 AI Generated {generatedCombos.length} combo meals</strong> with intelligent pricing and
                  pairings. Review and add to your menu.
                </p>
              </div>

              <div style={{ display: "grid", gap: "16px", maxHeight: "400px", overflowY: "auto" }}>
                {generatedCombos.map((combo, index) => (
                  <div
                    key={combo.id}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      padding: "16px",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "8px",
                      }}
                    >
                      <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0", color: "#000000" }}>
                        {combo.name}
                      </h4>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#7c3aed" }}>₹{combo.price}</div>
                        {(combo as any).originalPrice && (
                          <div style={{ fontSize: "12px", color: "#6b7280", textDecoration: "line-through" }}>
                            ₹{(combo as any).originalPrice}
                          </div>
                        )}
                        {(combo as any).savingsPercentage && (
                          <div style={{ fontSize: "12px", color: "#059669", fontWeight: "500" }}>
                            Save {(combo as any).savingsPercentage}%
                          </div>
                        )}
                      </div>
                    </div>
                    <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "12px", lineHeight: "1.4" }}>
                      {combo.description}
                    </p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          padding: "3px 6px",
                          backgroundColor: "#7c3aed",
                          color: "white",
                          borderRadius: "4px",
                          fontWeight: "500",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Zap style={{ width: "10px", height: "10px" }} />
                        AI Generated
                      </span>
                      {(combo as any).comboType && (
                        <span
                          style={{
                            fontSize: "11px",
                            padding: "3px 6px",
                            backgroundColor: "#f59e0b",
                            color: "white",
                            borderRadius: "4px",
                            fontWeight: "500",
                            textTransform: "capitalize",
                          }}
                        >
                          {(combo as any).comboType}
                        </span>
                      )}
                      {combo.dietary.map((diet) => (
                        <span
                          key={diet}
                          style={{
                            fontSize: "11px",
                            padding: "3px 6px",
                            backgroundColor: "#dcfce7",
                            color: "#166534",
                            borderRadius: "4px",
                            fontWeight: "500",
                            textTransform: "capitalize",
                          }}
                        >
                          {diet}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setShowComboPreview(false)}
                style={{
                  flex: "1",
                  padding: "10px 16px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  color: "#374151",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddCombosToMenu}
                style={{
                  flex: "2",
                  padding: "10px 16px",
                  backgroundColor: "#7c3aed",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <CheckCircle style={{ width: "16px", height: "16px" }} />
                Add {generatedCombos.length} Combos to Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Item Modal */}
      {showAddItemModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              maxWidth: "500px",
              width: "100%",
              padding: "24px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0", color: "#000000" }}>
                {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
              </h3>
              <button
                onClick={() => setShowAddItemModal(false)}
                style={{
                  padding: "4px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
              >
                <X style={{ width: "20px", height: "20px" }} />
              </button>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000000",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Item Name *
                </label>
                <input
                  type="text"
                  value={newItem.name || ""}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Butter Chicken"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000000",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Description *
                </label>
                <textarea
                  value={newItem.description || ""}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the dish, ingredients, and preparation..."
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    minHeight: "80px",
                    resize: "vertical",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#000000",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={newItem.price || ""}
                    onChange={(e) => setNewItem((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) || 0 }))}
                    placeholder="0"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#000000",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Category *
                  </label>
                  <select
                    value={newItem.category || ""}
                    onChange={(e) => setNewItem((prev) => ({ ...prev, category: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  >
                    <option value="">Select Category</option>
                    {menuCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000000",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Dietary Information
                </label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {["vegetarian", "non-vegetarian", "vegan", "gluten-free", "dairy-free"].map((diet) => (
                    <label key={diet} style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={newItem.dietary?.includes(diet) || false}
                        onChange={(e) => {
                          const dietary = newItem.dietary || []
                          if (e.target.checked) {
                            setNewItem((prev) => ({ ...prev, dietary: [...dietary, diet] }))
                          } else {
                            setNewItem((prev) => ({ ...prev, dietary: dietary.filter((d) => d !== diet) }))
                          }
                        }}
                        style={{ width: "14px", height: "14px" }}
                      />
                      <span style={{ fontSize: "12px", textTransform: "capitalize" }}>{diet}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000000",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Tags
                </label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {menuTags
                    .filter((tag) => tag.id !== "ai-generated")
                    .map((tag) => {
                      const isChecked = (newItem.tags || []).includes(tag.id)
                      return (
                        <label
                          key={tag.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            cursor: "pointer",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            backgroundColor: isChecked ? `${tag.color}20` : "transparent",
                            border: `1px solid ${isChecked ? tag.color : "#e5e7eb"}`,
                            transition: "all 0.2s ease",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              const tags = newItem.tags || []
                              if (e.target.checked) {
                                setNewItem((prev) => ({ ...prev, tags: [...tags, tag.id] }))
                              } else {
                                setNewItem((prev) => ({ ...prev, tags: tags.filter((t) => t !== tag.id) }))
                              }
                            }}
                            style={{ width: "14px", height: "14px" }}
                          />
                          <tag.icon style={{ width: "12px", height: "12px", color: tag.color }} />
                          <span style={{ fontSize: "12px", fontWeight: "500" }}>{tag.label}</span>
                        </label>
                      )
                    })}
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={newItem.isPopular || false}
                    onChange={(e) => setNewItem((prev) => ({ ...prev, isPopular: e.target.checked }))}
                    style={{ width: "16px", height: "16px" }}
                  />
                  <span style={{ fontSize: "14px" }}>Popular Item</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={newItem.isAvailable !== false}
                    onChange={(e) => setNewItem((prev) => ({ ...prev, isAvailable: e.target.checked }))}
                    style={{ width: "16px", height: "16px" }}
                  />
                  <span style={{ fontSize: "14px" }}>Available</span>
                </label>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setShowAddItemModal(false)}
                style={{
                  flex: "1",
                  padding: "10px 16px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  color: "#374151",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveItem}
                style={{
                  flex: "1",
                  padding: "10px 16px",
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                {editingItem ? "Update Item" : "Add Item"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {showAddCategoryModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              maxWidth: "400px",
              width: "100%",
              padding: "24px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0", color: "#000000" }}>
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h3>
              <button
                onClick={() => setShowAddCategoryModal(false)}
                style={{
                  padding: "4px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
              >
                <X style={{ width: "20px", height: "20px" }} />
              </button>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000000",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Category Name *
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Appetizers"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000000",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Description *
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe this category..."
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    minHeight: "60px",
                    resize: "vertical",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000000",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Color Theme
                </label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {["#fef3c7", "#dbeafe", "#fce7f3", "#ecfdf5", "#f3e8ff", "#fef2f2"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewCategory((prev) => ({ ...prev, color }))}
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: color,
                        border: newCategory.color === color ? "2px solid #000000" : "1px solid #e5e7eb",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setShowAddCategoryModal(false)}
                style={{
                  flex: "1",
                  padding: "10px 16px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  color: "#374151",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCategory}
                style={{
                  flex: "1",
                  padding: "10px 16px",
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                {editingCategory ? "Update Category" : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
