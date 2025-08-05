export interface ViewProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number | null;
}