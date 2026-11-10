export {
  getEventAvailability,
  getProductAvailability,
} from "./lib/availability";
export { mediaUrls } from "./lib/media";
export { formatEgp, parseMoney, toEgpLabel } from "./lib/money";
export type {
  EventAvailability,
  ProductAvailability,
} from "./lib/availability";
export type {
  CartLine,
  CartLineKind,
  CartLineSpec,
  CategoryItem,
  EventAttendee,
  EventItem,
  EventLifecycleStatus,
  OrderItem,
  OrderStatus,
  ProductItem,
  ProductStatus,
} from "./lib/types";

export {
  AppShell,
  StorefrontShell,
} from "./layout";
export type { AppShellProps, NavItem, StorefrontShellProps } from "./layout";

export {
  Badge,
  Button,
  Card,
  ConfirmDialog,
  DataTable,
  DetailList,
  EmptyState,
  ImageGallery,
  PageHeader,
  SelectField,
  Stat,
  StatGrid,
  TextArea,
  TextField,
  Toaster,
  dismissToast,
  toast,
} from "./ui";
export type {
  BadgeProps,
  ButtonProps,
  CardProps,
  ConfirmDialogProps,
  DataTableColumn,
  DataTableProps,
  DetailField,
  DetailListProps,
  EmptyStateProps,
  ImageGalleryProps,
  PageHeaderProps,
  SelectFieldProps,
  SelectOption,
  StatProps,
  TextAreaProps,
  TextFieldProps,
  ToastInput,
  ToastTone,
} from "./ui";

export {
  AvailabilityBadge,
  BrandCard,
  CategoryCard,
  MarketEventCard,
  MarketProductCard,
} from "./marketplace";
export type {
  AvailabilityBadgeProps,
  BrandCardProps,
  CategoryCardProps,
  MarketEventCardProps,
  MarketProductCardProps,
} from "./marketplace";

export {
  CART_DELIVERY_FEE,
  CART_PROMO_RATE,
  CART_PROMO_STORAGE_KEY,
  CartSummary,
  getCartTotals,
  EventCard,
  EventStatusBadge,
  LoginForm,
  NoteForm,
  OrderCard,
  ProductCard,
} from "./domain";
export type {
  CartSummaryProps,
  CartTotals,
  EventCardProps,
  EventStatusBadgeProps,
  LoginFormProps,
  LoginFormValues,
  NoteFormProps,
  OrderCardProps,
  ProductCardProps,
} from "./domain";
