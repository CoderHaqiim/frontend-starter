"use client"

import {
  ArrowLeftRight,
  ArrowRight,
  ArrowRightLeft,
  ArrowUpRight,
  BadgeAlert,
  BadgeCheck,
  BadgeInfo,
  BadgeX,
  Banknote,
  Bell,
  BookUser,
  Building,
  CalendarCheck,
  ChartPie,
  ChartSpline,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  CirclePile,
  CircleUser,
  Clock,
  Copy,
  CreditCard,
  Download,
  EllipsisVertical,
  Eye,
  EyeOff,
  FileText,
  FileUp,
  Headset,
  HeartPulse,
  House,
  Info,
  LayoutDashboard,
  Link,
  Mail,
  Maximize2,
  Moon,
  MoreHorizontal,
  MoveDown,
  MoveRight,
  MoveUp,
  NotebookPen,
  Pencil,
  Play,
  Plus,
  Receipt,
  ReceiptText,
  Search,
  Settings,
  SquareArrowOutUpRight,
  Star,
  Store,
  Sun,
  Trash2,
  TrendingDown,
  TrendingUp,
  TrendingUpDownIcon,
  User2,
  UsersRound,
  WifiOff,
  X
} from 'lucide-react'

import { ColorTypes } from '@/src/app/design/colors'
import { SizeType } from '@/src/types/types'
import { LucideProps } from 'lucide-react'
import { CSSProperties } from 'react'
import { useTheme } from '../../providers/themeProvider'


type IconProps = LucideProps & {
    size: SizeType,
    name: IconType,
    color?: ColorTypes
    style?: CSSProperties
    buttonVariant?: "ghost" | "outline" | "fill"
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
    "icon-clock" : Clock,
    "icon-money" : Banknote,
    "icon-invoice": ReceiptText,
    "icon-receipt": Receipt,
    "icon-file-text": FileText,
    "icon-file-upload": FileUp,
    "icon-building": Building,
    "icon-more-horizontal": MoreHorizontal,
    "icon-pile": CirclePile,
    "icon-users-round": UsersRound,
    "icon-download": Download,
    "icon-play" : Play,
    "icon-change": ArrowLeftRight,
    "icon-coppy": Copy
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
  const sizes2= {
    "xxs" : 16,
    "xs" : 18,
    "sm" : 22,
    "md" : 26,
    "lg" : 30,
    "xl" : 34,
    "xxl": 38
  }

export default function Icon({ buttonVariant, fill, style, stroke, size, name, color }: IconProps) {

  const {colors} = useTheme()
  const iconSize = size && (buttonVariant === "ghost" ? sizes2[size]: sizes[size]) 

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
