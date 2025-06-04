"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Calendar, Settings, BarChart3, Users, Megaphone, Sparkles, ChefHat } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Content Calendar", href: "/dashboard/content-calendar", icon: Calendar },
  { name: "Restaurant Setup", href: "/dashboard/setup", icon: ChefHat },
  { name: "Onboarding", href: "/dashboard/onboarding", icon: Sparkles },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: Megaphone },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function ElegantDashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              isActive
                ? "bg-orange-50 text-orange-700 border-r-2 border-orange-500"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
            )}
          >
            <item.icon
              className={cn(
                "mr-3 h-5 w-5 flex-shrink-0",
                isActive ? "text-orange-500" : "text-gray-400 group-hover:text-gray-500",
              )}
            />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
