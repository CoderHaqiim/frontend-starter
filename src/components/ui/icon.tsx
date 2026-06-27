import { 
  BadgeX,
  BadgeCheck,
  BadgeAlert,
  BadgeInfo,
  CircleUser,
  User2,
  LayoutDashboard,
  Search,
  Bell,
  House, 
  Eye, 
  EyeOff, 
  X,
  ChevronDown,
  WifiOff,
  Plus
} from 'lucide-react'


interface IconProps{
    size: "xs" | "sm" | "md" | "lg" | "xl" | "xxl",
    color?: string,
    stroke?: number
    name: IconType
    fill?: string
}

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
    "icon-chevron-down" : ChevronDown,
    "icon-wifi-off" : WifiOff,
    "icon-badge-x" : BadgeX,
    "icon-badge-info" : BadgeInfo,
    "icon-plus" : Plus
};

export type IconType = keyof typeof icons;

export default function Icon({ fill, stroke, size, name, color }: IconProps) {
  const sizes = {
    "xs" : 14,
    "sm" : 16,
    "md" : 18,
    "lg" : 20,
    "xl" : 22,
    "xxl": 24
  }

  const iconSize = size && sizes[size] 

  const iconProps = {
    strokeWidth: stroke ?? 1.5,
    size: iconSize ?? "18px",
    color: color ?? "var(--text-color1)",
    fill: fill ?? "transparent"
  };

  const IconComponent = icons[name];

  if (!IconComponent) return null;

  return <IconComponent {...iconProps} />;
}
