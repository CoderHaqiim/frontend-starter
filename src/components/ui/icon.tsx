import { 
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

export type IconName = "icon-eye" | "icon-user-circle"

interface IconProps{
    variant: "icon-sm" | "icon-md" | "icon-lg",
    color: string,
    stroke?: number
    name: IconName
}

export default function Icon({ variant, name, color }: IconProps) {
  const iconProps = {
    strokeWidth: 1.5,
    size:
      variant === "icon-sm"
        ? 12
        : variant === "icon-md"
        ? 16
        : variant === "icon-lg"
        ? 20
        : variant === "icon-xl"
        ? 24
        : variant === "icon-flex"
        ? '100%'
        : 16,
    color,
  };

  const icons = {
    "icon-user-circle": CircleUser,
    "icon-eye": Eye,
  };

  const IconComponent = icons[name];

  if (!IconComponent) return null;

  return <IconComponent {...iconProps} />;
}