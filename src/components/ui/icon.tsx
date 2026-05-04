import { 
  BadgeCheck,
  BadgeAlert,
  CircleUser,
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

export type IconName = "icon-eye" | "icon-user-circle" | "icon-badge-check" | "icon-badge-alert" | "icon-x" | "icon-house"

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
  const iconProps = {
    strokeWidth: stroke ?? 1.5,
    size: sizes[size],
    color: color ?? "var(--text-color2)",
    fill: fill ?? "transparent"
  };

  const icons = {
    "icon-house" : House,
    "icon-user-circle": CircleUser,
    "icon-eye": Eye,
    "icon-badge-check": BadgeCheck,
    "icon-badge-alert": BadgeAlert,
    "icon-x": X
  };

  const IconComponent = icons[name];

  if (!IconComponent) return null;

  return <IconComponent {...iconProps} />;
}