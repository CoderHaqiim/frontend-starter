"use client"

import { 
  BadgeX,
  BadgeCheck,
  BadgeAlert,
  BadgeInfo,
  Bell,
  CircleUser,
  CircleArrowUp,
  CircleArrowDown,
  CheckCheck,
  User2,
  LayoutDashboard,
  Search,
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
  MoveDown,
  MoveUp,
  Pencil,
  HeartPulse,
  ChartSpline,
  Star,
  ChevronLeft,
  ChevronRight,
  CalendarCheck,
  ArrowUpRight,
  ArrowRight,
  Link,
  MoveRight,
  TrendingDown,
  TrendingUp,
  TrendingUpDownIcon,
  EllipsisVertical,
  Headset,
  SquareArrowOutUpRight,
  ChartPie,
  BookUser,
  Mail,
  Info,
  Clock
} from 'lucide-react'

import { LucideProps } from 'lucide-react'
import { SizeType } from '@/src/types/types'
import { ColorTypes } from '@/src/app/design/colors'
import { CSSProperties } from 'react'
import { useTheme } from '../../app/themeProvider'


type IconProps = LucideProps & {
    size: SizeType,
    name: IconType,
    color?: ColorTypes
    style?: CSSProperties
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
    "icon-circle-arrow-up": CircleArrowUp,
    "icon-pencil" : Pencil,
    "icon-pulse": HeartPulse,
    "icon-chart":ChartSpline,
    "icon-star": Star,
    "icon-right": ChevronRight,
    "icon-left": ChevronLeft,
    "icon-calendar-check": CalendarCheck,
    "icon-arrow-up-right": ArrowUpRight,
    "icon-arrow-right": ArrowRight,
    "icon-link": Link,
    "icon-move-right": MoveRight,
    "icon-trend-up": TrendingUp,
    "icon-trend-down": TrendingDown,
    "icon-trend-up-down": TrendingUpDownIcon,
    "icon-vertival-dots": EllipsisVertical,
    "icon-headset": Headset,
    "icon-open": SquareArrowOutUpRight,
    "icon-chart-pie": ChartPie,
    "icon-address-book": BookUser,
    "icon-mail": Mail,
    "icon-info": Info,
    "icon-clock" : Clock
};

export type IconType = keyof typeof icons;
  const sizes = {
    "xxs" : 10,
    "xs" : 12,
    "sm" : 16,
    "md" : 20,
    "lg" : 24,
    "xl" : 28,
    "xxl": 32
  }

export default function Icon({ fill, style, stroke, size, name, color }: IconProps) {

  const {colors} = useTheme()
  const iconSize = size && sizes[size] 

  const iconProps = {
    strokeWidth: stroke ?? "1.5",
    size: iconSize ?? "18px",
    color: color ? colors[color] : colors["textColor1"],
    fill: fill ?? "transparent"
  };

  const IconComponent = icons[name];

  if (!IconComponent) return null;

  return <IconComponent {...iconProps} style={{...style, pointerEvents: "none"}}/>;
}
