import { 
  BadgeCheck,
  BadgeAlert,
  CircleUser,
  User2,
  LayoutDashboard,
  MessageSquareText,
  Search,
  Bell,
  House, 
  Settings, 
  Headset, 
  Eye, 
  EyeOff, 
  LogOut,
  Plus,
  X,
  Bot,
  Pencil,
  Maximize2,
  CircleDollarSign,
  Calculator
} from 'lucide-react'

export type IconName = 
"icon-eye" | 
"icon-eye-off" | 
"icon-user-circle" | 
"icon-dashboard" | 
"icon-badge-check" | 
"icon-badge-alert" | 
"icon-x" | 
"icon-house" | 
"icon-user" | 
"icon-bell" | 
"icon-search"

interface IconProps{
    size: "sm" | "md" | "lg" | "xl",
    color?: string,
    stroke?: number
    name: IconName
    fill?: string
}

export default function Icon({ fill, stroke, size, name, color }: IconProps) {
  const sizes = {
    "sm" : 14,
    "md" : 18,
    "lg" : 22,
    "xl" : 25 
  }

  const iconSize = size && sizes[size] 

  const iconProps = {
    strokeWidth: stroke ?? 1.5,
    size: iconSize ?? "18px",
    color: color ?? "var(--text-color2)",
    fill: fill ?? "transparent"
  };

  const icons = {
    "icon-house" : House,
    "icon-user-circle": CircleUser,
    "icon-eye": Eye,
    "icon-eye-off": EyeOff,
    "icon-badge-check": BadgeCheck,
    "icon-badge-alert": BadgeAlert,
    "icon-x": X,
    "icon-dashboard": LayoutDashboard,
    "icon-user": User2,
    "icon-bell" : Bell,
    "icon-search" : Search,
  };

  const IconComponent = icons[name];

  if (!IconComponent) return null;

  return <IconComponent {...iconProps} />;
}