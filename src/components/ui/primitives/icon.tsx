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
  Plus,
  Store,
  Settings,
  ArrowRightLeft,
  NotebookPen,
  CreditCard,
  Sun,
  Moon,
  Maximize2,
  Trash2,
  CheckCheck,
  MoveDown,
  MoveUp,
  CircleArrowUp,
  CircleArrowDown
} from 'lucide-react'

import { LucideProps } from 'lucide-react'
import { SizeType } from '@/src/types/types'


type IconProps = LucideProps & {
    size: SizeType,
    name: IconType,
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
    "icon-plus" : Plus,
    "icon-settings"  : Settings,
    "icon-store"  : Store,
    "icon-transactions": ArrowRightLeft,
    "icon-notes" : NotebookPen,
    "icon-credit-card" : CreditCard,
    "icon-sun" : Sun,
    "icon-moon" : Moon,
    "icon-expand" : Maximize2,
    "icon-delete" : Trash2,
    "icon-double-check": CheckCheck,
    "icon-arrow-up": MoveUp,
    "icon-arrow-down": MoveDown,
    "icon-circle-arrow-down": CircleArrowDown,
    "icon-circle-arrow-up": CircleArrowUp
};

export type IconType = keyof typeof icons;
  const sizes = {
    "xxs" : 12,
    "xs" : 14,
    "sm" : 18,
    "md" : 22,
    "lg" : 26,
    "xl" : 30,
    "xxl": 34
  }

export default function Icon({ fill, stroke, size, name, color }: IconProps) {

  const iconSize = size && sizes[size] 

  const iconProps = {
    strokeWidth: stroke ?? 1.5,
    size: iconSize ?? "18px",
    color: color ?? "var(--color-textColor1)",
    fill: fill ?? "transparent"
  };

  const IconComponent = icons[name];

  if (!IconComponent) return null;

  return <IconComponent {...iconProps} />;
}
