import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useModal } from '@/context/ModalContext.jsx';

function BaseModal({ id, title, children }) {
  const { activeModal, closeModal } = useModal();
  const isOpen = activeModal === id;
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/60 backdrop-blur-md"
          onClick={closeModal}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glass-panel w-full max-w-5xl max-h-[90vh] rounded-[30px] sm:rounded-[40px] flex flex-col relative overflow-hidden shadow-2xl glow-cyan-inset"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 sm:p-8 border-b border-[hsla(var(--primary)/0.1)]">
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-glow-cyan tracking-tight text-[hsl(var(--primary))]">
                {title}
              </h2>
              <button
                onClick={closeModal}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-[hsla(var(--primary)/0.1)] hover:bg-[hsla(var(--primary)/0.2)] transition-colors text-white hover:text-[hsl(var(--primary))] border border-[hsla(var(--primary)/0.2)]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div 
              id={`${id}-scroll-container`} 
              className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 custom-scrollbar"
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BaseModal;