import { generateText, generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

// Schema definitions for structured AI outputs
const socialMediaStrategySchema = z.object({
  objectives: z.array(z.string()),
  target_audience: z.array(z.string()),
  content_pillars: z.array(z.string()),
  posting_frequency: z.object({
    instagram: z.number(),
    facebook: z.number(),
    whatsapp: z.number(),
  }),
  optimal_times: z.object({
    instagram: z.array(z.string()),
    facebook: z.array(z.string()),
    whatsapp: z.array(z.string()),
  }),
  hashtag_strategy: z.array(z.string()),
  engagement_tactics: z.array(z.string()),
})

const contentScheduleSchema = z.object({
  posts: z.array(
    z.object({
      date: z.string(),
      time: z.string(),
      platform: z.array(z.string()),
      content_type: z.string(),
      caption: z.string(),
      hashtags: z.array(z.string()),
      media_description: z.string(),
      call_to_action: z.string(),
      target_audience: z.string(),
    }),
  ),
})

const promotionPageSchema = z.object({
  title: z.string(),
  meta_description: z.string(),
  hero_section: z.string(),
  about_section: z.string(),
  menu_highlights: z.array(z.string()),
  special_offers: z.array(z.string()),
  customer_testimonials: z.array(z.string()),
  call_to_action: z.string(),
  seo_keywords: z.array(z.string()),
})

export class AIContentGenerator {
  private restaurantData: any
  private brandAssets: any
  private menuData: any
  private mediaAssets: any[]
  private customerData: any

  constructor(data: {
    restaurantData: any
    brandAssets: any
    menuData: any
    mediaAssets: any[]
    customerData: any
  }) {
    this.restaurantData = data.restaurantData
    this.brandAssets = data.brandAssets
    this.menuData = data.menuData
    this.mediaAssets = data.mediaAssets
    this.customerData = data.customerData
  }

  async generateSocialMediaStrategy(duration = 3, customPrompt?: string): Promise<any> {
    const prompt = `
    Create a comprehensive ${duration}-month social media strategy for ${this.restaurantData.name}.

    Restaurant Details:
    - Name: ${this.restaurantData.name}
    - Cuisine: ${this.restaurantData.cuisine}
    - Description: ${this.restaurantData.description}
    - Specialties: ${this.restaurantData.specialties?.join(", ")}
    - Price Range: ${this.restaurantData.price_range}

    Brand Identity:
    - Tagline: ${this.brandAssets?.tagline}
    - Brand Voice: ${this.brandAssets?.brand_voice}
    - Personality: ${this.brandAssets?.brand_personality?.join(", ")}

    Customer Insights:
    ${
      this.customerData
        ? `
    - Total Customers: ${this.customerData.total_customers}
    - Key Segments: ${this.customerData.segments?.map((s: any) => s.name).join(", ")}
    `
        : "No customer data available"
    }

    Available Media Assets: ${this.mediaAssets.length} photos/videos

    ${customPrompt ? `Additional Requirements: ${customPrompt}` : ""}

    Create a strategy that includes objectives, target audience, content pillars, posting frequency, optimal times, hashtag strategy, and engagement tactics.
    Focus on the Indian F&B market and local engagement strategies.
    `

    try {
      const { object: strategy } = await generateObject({
        model: openai("gpt-4o"),
        schema: socialMediaStrategySchema,
        prompt,
      })

      return { success: true, strategy }
    } catch (error) {
      console.error("Strategy generation error:", error)
      return { success: false, error: "Failed to generate strategy" }
    }
  }

  async generateContentSchedule(strategy: any, month: number, year: number, customPrompt?: string): Promise<any> {
    const prompt = `
    Create a detailed monthly content schedule for ${this.restaurantData.name} for ${month}/${year}.

    Strategy Context:
    - Objectives: ${strategy.objectives?.join(", ")}
    - Content Pillars: ${strategy.content_pillars?.join(", ")}
    - Posting Frequency: Instagram ${strategy.posting_frequency?.instagram}/week, Facebook ${strategy.posting_frequency?.facebook}/week
    - Brand Voice: ${this.brandAssets?.brand_voice}

    Restaurant Details:
    - Cuisine: ${this.restaurantData.cuisine}
    - Specialties: ${this.restaurantData.specialties?.join(", ")}

    Menu Highlights:
    ${this.menuData?.categories
      ?.map(
        (cat: any) =>
          `${cat.name}: ${cat.items
            ?.slice(0, 3)
            .map((item: any) => item.name)
            .join(", ")}`,
      )
      .join("\n")}

    Available Media:
    ${this.mediaAssets.map((asset) => `${asset.category}: ${asset.description || "No description"}`).join("\n")}

    ${customPrompt ? `Additional Requirements: ${customPrompt}` : ""}

    Create 20-25 posts for the month with variety in content types (food photos, behind-the-scenes, customer stories, promotions).
    Include specific dates, times, platforms, captions, hashtags, and media descriptions.
    Focus on Indian festivals, local events, and seasonal relevance.
    `

    try {
      const { object: schedule } = await generateObject({
        model: openai("gpt-4o"),
        schema: contentScheduleSchema,
        prompt,
      })

      return { success: true, schedule }
    } catch (error) {
      console.error("Schedule generation error:", error)
      return { success: false, error: "Failed to generate schedule" }
    }
  }

  async generatePromotionPage(customPrompt?: string): Promise<any> {
    const prompt = `
    Create a compelling restaurant promotion page for ${this.restaurantData.name}.

    Restaurant Details:
    - Name: ${this.restaurantData.name}
    - Cuisine: ${this.restaurantData.cuisine}
    - Description: ${this.restaurantData.description}
    - Address: ${this.restaurantData.address}
    - Specialties: ${this.restaurantData.specialties?.join(", ")}
    - Awards: ${this.restaurantData.awards?.join(", ")}

    Brand Identity:
    - Tagline: ${this.brandAssets?.tagline}
    - Brand Voice: ${this.brandAssets?.brand_voice}
    - Personality: ${this.brandAssets?.brand_personality?.join(", ")}

    Menu Highlights:
    ${this.menuData?.categories
      ?.map(
        (cat: any) =>
          `${cat.name}: ${cat.items
            ?.filter((item: any) => item.popular)
            .map((item: any) => `${item.name} - ${item.description}`)
            .join(", ")}`,
      )
      .join("\n")}

    ${customPrompt ? `Additional Requirements: ${customPrompt}` : ""}

    Create a comprehensive promotion page that can be shared on social media or published as a landing page.
    Include SEO-optimized content, compelling copy, and clear calls-to-action.
    Focus on converting visitors to customers.
    `

    try {
      const { object: page } = await generateObject({
        model: openai("gpt-4o"),
        schema: promotionPageSchema,
        prompt,
      })

      return { success: true, page }
    } catch (error) {
      console.error("Page generation error:", error)
      return { success: false, error: "Failed to generate promotion page" }
    }
  }

  async generateAdCreatives(platform: string, objective: string, customPrompt?: string): Promise<any> {
    const prompt = `
    Create high-converting ad creatives for ${this.restaurantData.name} on ${platform}.

    Campaign Objective: ${objective}

    Restaurant Details:
    - Name: ${this.restaurantData.name}
    - Cuisine: ${this.restaurantData.cuisine}
    - Specialties: ${this.restaurantData.specialties?.join(", ")}
    - Price Range: ${this.restaurantData.price_range}

    Brand Identity:
    - Tagline: ${this.brandAssets?.tagline}
    - Brand Voice: ${this.brandAssets?.brand_voice}

    Target Audience Insights:
    ${this.customerData?.segments
      ?.map((segment: any) => `${segment.name}: ${segment.characteristics?.join(", ")}`)
      .join("\n")}

    ${customPrompt ? `Additional Requirements: ${customPrompt}` : ""}

    Create 3-5 ad variations with:
    - Compelling headlines
    - Engaging ad copy
    - Strong call-to-actions
    - Visual descriptions for creatives
    - Target audience specifications
    - Budget recommendations

    Focus on driving restaurant visits, orders, or reservations.
    `

    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt,
      })

      return { success: true, creatives: text }
    } catch (error) {
      console.error("Ad creative generation error:", error)
      return { success: false, error: "Failed to generate ad creatives" }
    }
  }

  async generateSinglePost(platform: string, contentType: string, customPrompt?: string): Promise<any> {
    const prompt = `
    Create an engaging ${contentType} post for ${this.restaurantData.name} on ${platform}.

    Restaurant Context:
    - Name: ${this.restaurantData.name}
    - Cuisine: ${this.restaurantData.cuisine}
    - Brand Voice: ${this.brandAssets?.brand_voice}
    - Specialties: ${this.restaurantData.specialties?.join(", ")}

    ${customPrompt ? `Specific Requirements: ${customPrompt}` : ""}

    Create a post with:
    - Engaging caption (platform-appropriate length)
    - Relevant hashtags
    - Visual description
    - Best posting time
    - Engagement prediction
    - Call-to-action

    Make it authentic, engaging, and likely to drive restaurant visits.
    `

    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt,
      })

      return { success: true, post: text }
    } catch (error) {
      console.error("Post generation error:", error)
      return { success: false, error: "Failed to generate post" }
    }
  }
}

// Helper function to create AI generator instance
export async function createAIGenerator(restaurantId: string) {
  try {
    // Fetch all required data
    const [restaurantRes, brandRes, menuRes, mediaRes, customerRes] = await Promise.all([
      fetch(`/api/restaurants/${restaurantId}`),
      fetch(`/api/brand-assets/${restaurantId}`),
      fetch(`/api/menu/${restaurantId}`),
      fetch(`/api/media-assets/${restaurantId}`),
      fetch(`/api/customer-data/${restaurantId}`),
    ])

    const restaurantData = await restaurantRes.json()
    const brandAssets = await brandRes.json()
    const menuData = await menuRes.json()
    const mediaAssets = await mediaRes.json()
    const customerData = await customerRes.json()

    return new AIContentGenerator({
      restaurantData: restaurantData.restaurant,
      brandAssets: brandAssets.assets,
      menuData: menuData.menu,
      mediaAssets: mediaAssets.assets || [],
      customerData: customerData.data,
    })
  } catch (error) {
    console.error("Failed to create AI generator:", error)
    throw new Error("Failed to initialize AI content generator")
  }
}
