// Onboarding Types
export interface RestaurantData {
  id?: string
  name: string
  cuisine: string
  description: string
  address: string
  phone: string
  email?: string
  website?: string
  hours?: string
  price_range: string
  specialties: string[]
  awards: string[]
}

export interface BrandAssets {
  logo_url?: string
  tagline: string
  brand_colors: string[]
  brand_fonts: string[]
  brand_voice: string
  brand_personality: string[]
}

export interface MediaAsset {
  id: string
  url: string
  type: "image" | "video"
  category: "restaurant" | "kitchen" | "food" | "ambiance" | "staff"
  description?: string
  tags: string[]
}

export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  category: string
  dietary_info: string[]
  is_popular?: boolean
  is_available?: boolean
}

export interface ChannelConnection {
  platform: string
  connected: boolean
  account_id?: string
  access_token?: string
  page_id?: string
}

export interface AdPlatform {
  platform: string
  connected: boolean
  account_id?: string
  monthly_budget?: number
  campaign_objectives: string[]
}

export interface CustomerData {
  source: "crm" | "upload" | "manual"
  total_customers?: number
  segments: CustomerSegment[]
  preferences: string[]
  avg_order_value?: number
}

export interface CustomerSegment {
  name: string
  count: number
  characteristics: string[]
}

export interface OnboardingStepProps {
  onComplete: (data: any) => void
  initialData?: any
  allData?: Record<number, any>
}

// AI Content Types
export interface AIContentRequest {
  type: "social-post" | "weekly-plan" | "strategy" | "promotion"
  restaurantData: RestaurantData
  platform?: string
  contentType?: string
  customPrompt?: string
  duration?: number
}

export interface GeneratedPost {
  caption: string
  hashtags: string[]
  bestTimeToPost: string
  engagementPrediction: string
  platform: string
  contentType: string
}

export interface WeeklyPlan {
  posts: {
    title: string
    content: string
    platform: string
    scheduledTime: string
    contentType: string
    hashtags: string[]
  }[]
}

// Onboarding Flow Types
export interface OnboardingData {
  currentStep: number
  totalSteps: number
  restaurantData?: RestaurantData
  brandAssets?: BrandAssets
  menuData?: MenuItem[]
  mediaAssets?: MediaAsset[]
  channelConnections?: ChannelConnection[]
  adPlatforms?: AdPlatform[]
  customerData?: CustomerData
  completed: boolean
}

// Dashboard Types
export interface DashboardStats {
  totalPosts: number
  engagementRate: number
  followers: number
  messages: number
  monthlyGrowth: {
    posts: number
    engagement: number
    followers: number
    messages: number
  }
}

export interface RecentPost {
  id: string
  platform: string
  content: string
  timestamp: string
  engagement: {
    likes: number
    comments: number
    shares?: number
  }
  status: "published" | "scheduled" | "draft"
}

export interface UpcomingPost {
  id: string
  platform: string
  title: string
  scheduledTime: string
  status: "ready" | "scheduled" | "draft"
}

// Content Calendar Types
export interface CalendarPost {
  id: string
  date: Date
  platform: string[]
  title: string
  content: string
  status: "published" | "scheduled" | "draft"
  engagement?: {
    likes: number
    comments: number
    shares: number
  }
}

export interface CalendarDay {
  date: Date
  posts: CalendarPost[]
  hasContent: boolean
}

// Setup Types
export interface SetupStep {
  id: string
  title: string
  description: string
  completed: boolean
  required: boolean
  href: string
  icon: any
}

export interface SetupProgress {
  totalSteps: number
  completedSteps: number
  requiredSteps: number
  completedRequiredSteps: number
  percentage: number
}
