"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Download } from "lucide-react"
import { questionnaireContent } from "@/data/questionnaire-content"

export function SuccessScreen() {
  const { successTitle, successMessage, bonusTitle, bonusDescription, bonusButtonText } = questionnaireContent

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
        className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Check className="h-10 w-10 text-primary" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-primary mb-4"
      >
        {successTitle}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-muted-foreground mb-8"
      >
        {successMessage}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-muted p-6 rounded-lg mb-8 max-w-md mx-auto"
      >
        <h3 className="text-xl font-semibold mb-2">{bonusTitle}</h3>
        <p className="mb-4 text-muted-foreground">{bonusDescription}</p>
        <Button className="w-full flex items-center justify-center gap-2">
          <Download className="h-4 w-4" />
          {bonusButtonText}
        </Button>
      </motion.div>
    </motion.div>
  )
}
