"use client";

import React, { createContext, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface ModalContextType {
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(<></>);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsShowing(true);
  }

  const closeModal = () => {
    setIsShowing(false);
    setModalContent(<></>)
  }

  const backdropAnimation = {
    open: {
      opacity: 1,
      zIndex: 50,
      transition: {
        duration: .2,
        type: 'linear',
        // delayChildren: .2
      }
    }
  }

  const modalAnimation = {
    closed: {
      y: -10,
      opacity: 0,
      transition: {
        type: 'linear',
        duration: .4,
      }
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0,
        duration: .4
      }
    }
  }

  const animate = isShowing ? 'open' : 'closed';

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <AnimatePresence>
        {isShowing && (
          <motion.button
            onClick={() => closeModal()}
            initial={{ opacity: 0 }}
            animate={'open'}
            variants={backdropAnimation}
            exit={{ opacity: 0 }}
            className='absolute z-50 w-full h-screen justify-center items-center flex'
          >
            <button className='absolute z-[999999] w-full h-screen' style={{ backgroundColor: 'rgba(0,0,0,0.35)' }} />
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: -1 }}
              animate={animate}
              variants={modalAnimation}
              className='absolute flex self-center z-[9999999] bg-light p-4 rounded-xl transition-all border border-[rgba(0,0,0,.5)]'
            >
              {modalContent}
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {children}
    </ModalContext.Provider >
  )
}

export const UseModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
}