"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ConfirmDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export default function ConfirmDeleteModal({
  open,
  onOpenChange,
  onConfirm,
  title = "Delete paste?",
  description = "This action cannot be undone. Are you sure you want to delete this paste?",
}: ConfirmDeleteModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay noir semi-transparent */}
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

        {/* Contenu centré */}
        <Dialog.Content asChild>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#11131c] rounded-2xl p-6 shadow-xl w-[90%] max-w-md border border-white/10"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-lg font-semibold text-white">
                  {title}
                </Dialog.Title>
                <Dialog.Close className="text-neutral-400 hover:text-white">
                  <X size={18} />
                </Dialog.Close>
              </div>

              {/* Description */}
              <Dialog.Description className="text-sm text-neutral-400 mb-6">
                {description}
              </Dialog.Description>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <Dialog.Close asChild>
                  <button className="cursor-pointer px-4 py-2 rounded-lg bg-neutral-700 text-white text-sm hover:bg-neutral-600 transition-colors">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  onClick={() => {
                    onConfirm();
                    onOpenChange(false);
                  }}
                  className="cursor-pointer px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-500 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}