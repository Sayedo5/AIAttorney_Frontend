// Icon mappings - centralized icon exports
import {
  Home, MessageCircle, BookOpen, FileText, Calendar,
  ArrowLeft, ArrowRight, Bell, Settings, User, LogOut,
  Search, X, Check, Copy, Download, Upload, Edit, Trash2,
  Eye, EyeOff, ChevronDown, ChevronUp, ChevronRight, ChevronLeft,
  Menu, Mic, MicOff, Send, Plus, Minus, Star, Bookmark,
  BookmarkCheck, Filter, MoreVertical, MoreHorizontal, RefreshCw,
  Play, Pause, Square, Volume2, VolumeX, Share2, ExternalLink,
  FileType, File, Image, AlertCircle, AlertTriangle, Info,
  CheckCircle, XCircle, Clock, MapPin, Phone, Mail, Globe,
  Building, Briefcase, Scale, Shield, Stamp, Users, Gavel,
  Crown, Zap, Sparkles, Sun, Moon, Palette,
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, List, ListOrdered, Quote, Heading1,
  Heading2, Heading3, Undo, Redo, Save, Paperclip, Hash
} from 'lucide-react';

// Icon name to component mapping
export const icons = {
  // Navigation
  home: Home,
  chat: MessageCircle,
  library: BookOpen,
  documents: FileText,
  cases: Calendar,
  
  // Actions
  back: ArrowLeft,
  forward: ArrowRight,
  notifications: Bell,
  settings: Settings,
  profile: User,
  logout: LogOut,
  search: Search,
  close: X,
  check: Check,
  copy: Copy,
  download: Download,
  upload: Upload,
  edit: Edit,
  delete: Trash2,
  eye: Eye,
  eyeOff: EyeOff,
  
  // Chevrons
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  
  // Menu & More
  menu: Menu,
  moreVertical: MoreVertical,
  moreHorizontal: MoreHorizontal,
  
  // Voice
  mic: Mic,
  micOff: MicOff,
  speaker: Volume2,
  speakerOff: VolumeX,
  
  // Media
  play: Play,
  pause: Pause,
  stop: Square,
  
  // Communication
  send: Send,
  share: Share2,
  externalLink: ExternalLink,
  
  // Quantity
  plus: Plus,
  minus: Minus,
  
  // Rating
  star: Star,
  bookmark: Bookmark,
  bookmarkFill: BookmarkCheck,
  
  // Filter
  filter: Filter,
  refresh: RefreshCw,
  
  // Files
  file: File,
  fileType: FileType,
  image: Image,
  paperclip: Paperclip,
  
  // Status
  alertCircle: AlertCircle,
  alertTriangle: AlertTriangle,
  info: Info,
  checkCircle: CheckCircle,
  xCircle: XCircle,
  
  // Misc
  clock: Clock,
  mapPin: MapPin,
  phone: Phone,
  mail: Mail,
  globe: Globe,
  
  // Legal
  building: Building,
  briefcase: Briefcase,
  scale: Scale,
  shield: Shield,
  stamp: Stamp,
  users: Users,
  gavel: Gavel,
  
  // Premium
  crown: Crown,
  zap: Zap,
  sparkles: Sparkles,
  
  // Theme
  sun: Sun,
  moon: Moon,
  palette: Palette,
  
  // Editor
  bold: Bold,
  italic: Italic,
  underline: Underline,
  strikethrough: Strikethrough,
  alignLeft: AlignLeft,
  alignCenter: AlignCenter,
  alignRight: AlignRight,
  alignJustify: AlignJustify,
  list: List,
  listOrdered: ListOrdered,
  quote: Quote,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  undo: Undo,
  redo: Redo,
  save: Save,
  hash: Hash,
};

export type IconName = keyof typeof icons;

export function getIcon(name: IconName) {
  return icons[name];
}
