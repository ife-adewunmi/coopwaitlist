'use client'

import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Check, Download } from 'lucide-react'
import { questionnaireContent } from '@/data/questionnaire-content'
import { closeModal } from '@/states/slices/modal/modalSlice'

export function SuccessScreen() {
  const dispatch = useDispatch()
  const { successTitle, successMessage, bonusTitle, bonusDescription, bonusButtonText } =
    questionnaireContent

  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-8 text-center"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100"
      >
        <Check className="h-10 w-10 text-primary" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-4 text-3xl font-bold text-primary"
      >
        {successTitle}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8 text-lg text-muted-foreground"
      >
        {successMessage}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-auto mb-8 max-w-md rounded-lg bg-muted p-6"
      >
        <h3 className="mb-2 text-xl font-semibold">{bonusTitle}</h3>
        <p className="mb-4 text-muted-foreground">{bonusDescription}</p>
        <Button className="flex w-full items-center justify-center gap-2">
          <Download className="h-4 w-4" />
          {bonusButtonText}
        </Button>
      </motion.div>

      <Button onClick={handleClose} variant="outline" className="mt-4">
        Close
      </Button>
    </motion.div>
  )
}
