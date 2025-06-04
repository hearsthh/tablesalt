"use client"

import { useState, useEffect } from "react"

interface MenuItem {
  name: string
  description: string
  price: string
  category: string
}

export default function MenuUploadPage() {
  const [uploadMethod, setUploadMethod] = useState<"manual" | "file" | "photo">("manual")
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [newItem, setNewItem] = useState<MenuItem>({
    name: "",
    description: "",
    price: "",
    category: "",
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const addMenuItem = () => {
    if (newItem.name && newItem.price) {
      setMenuItems((prev) => [...prev, newItem])
      setNewItem({ name: "", description: "", price: "", category: "" })
    }
  }

  const removeMenuItem = (index: number) => {
    setMenuItems((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="mb-8">
        <a
          href="/dashboard/profile"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 inline-block"
        >
          ← Back to Profile
        </a>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Menu Upload</h1>
        <p className="text-gray-600">Upload your menu so AI can analyze your offerings and create targeted content</p>
      </div>

      {/* Upload Method Selection */}
      <div className="elegant-card p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Upload Method</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setUploadMethod("manual")}
            className={`p-4 rounded-lg border text-left transition-all ${
              uploadMethod === "manual"
                ? "border-blue-300 bg-blue-50 text-blue-900"
                : "border-gray-300 hover:border-blue-300"
            }`}
          >
            <h3 className="font-semibold mb-2">Manual Entry</h3>
            <p className="text-sm text-gray-600">Add menu items one by one</p>
          </button>

          <button
            onClick={() => setUploadMethod("file")}
            className={`p-4 rounded-lg border text-left transition-all ${
              uploadMethod === "file"
                ? "border-blue-300 bg-blue-50 text-blue-900"
                : "border-gray-300 hover:border-blue-300"
            }`}
          >
            <h3 className="font-semibold mb-2">File Upload</h3>
            <p className="text-sm text-gray-600">Upload PDF or document</p>
          </button>

          <button
            onClick={() => setUploadMethod("photo")}
            className={`p-4 rounded-lg border text-left transition-all ${
              uploadMethod === "photo"
                ? "border-blue-300 bg-blue-50 text-blue-900"
                : "border-gray-300 hover:border-blue-300"
            }`}
          >
            <h3 className="font-semibold mb-2">Photo Scan</h3>
            <p className="text-sm text-gray-600">Take photos of your menu</p>
          </button>
        </div>
      </div>

      {/* Manual Entry */}
      {uploadMethod === "manual" && (
        <div className="elegant-card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Add Menu Items</h2>

          {/* Add New Item Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="form-group">
              <label className="form-label">Item Name</label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Margherita Pizza"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Price</label>
              <input
                type="text"
                value={newItem.price}
                onChange={(e) => setNewItem((prev) => ({ ...prev, price: e.target.value }))}
                placeholder="e.g., $12.99"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem((prev) => ({ ...prev, category: e.target.value }))}
                className="form-select"
              >
                <option value="">Select Category</option>
                <option value="appetizers">Appetizers</option>
                <option value="mains">Main Courses</option>
                <option value="desserts">Desserts</option>
                <option value="beverages">Beverages</option>
                <option value="specials">Specials</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <input
                type="text"
                value={newItem.description}
                onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description..."
                className="form-input"
              />
            </div>

            <div className="md:col-span-2">
              <button type="button" onClick={addMenuItem} className="btn btn-primary">
                Add Item
              </button>
            </div>
          </div>

          {/* Menu Items List */}
          {menuItems.length > 0 && (
            <div>
              <h3 className="text-md font-semibold text-gray-900 mb-4">Menu Items ({menuItems.length})</h3>
              <div className="space-y-3">
                {menuItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <span className="font-semibold text-green-600">{item.price}</span>
                        {item.category && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {item.category}
                          </span>
                        )}
                      </div>
                      {item.description && <p className="text-sm text-gray-600 mt-1">{item.description}</p>}
                    </div>
                    <button onClick={() => removeMenuItem(index)} className="text-red-600 hover:text-red-800 ml-4">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* File Upload */}
      {uploadMethod === "file" && (
        <div className="elegant-card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Upload Menu File</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="mt-4">
              <label htmlFor="menu-upload" className="cursor-pointer">
                <span className="btn btn-primary">Upload Menu File</span>
                <input id="menu-upload" type="file" accept=".pdf,.doc,.docx" className="sr-only" />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX up to 10MB</p>
          </div>
        </div>
      )}

      {/* Photo Scan */}
      {uploadMethod === "photo" && (
        <div className="elegant-card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Scan Menu Photos</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h36v16a2 2 0 01-2 2H8a2 2 0 01-2-2V20zM6 12a2 2 0 012-2h32a2 2 0 012 2v8H6V12z"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="mt-4">
              <label htmlFor="menu-photos" className="cursor-pointer">
                <span className="btn btn-primary">Take/Upload Photos</span>
                <input
                  id="menu-photos"
                  type="file"
                  accept="image/*"
                  multiple
                  capture="environment"
                  className="sr-only"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">Take clear photos of each menu page</p>
          </div>
        </div>
      )}

      {/* Submit Buttons */}
      <div className="flex gap-4 pt-6">
        <a href="/dashboard/profile/brand-assets" className="btn btn-secondary">
          ← Previous: Brand Assets
        </a>
        <button type="submit" className="btn btn-primary flex-1">
          Save Menu
        </button>
        <a href="/dashboard/profile/media-assets" className="btn btn-secondary">
          Next: Media Assets →
        </a>
      </div>
    </div>
  )
}
