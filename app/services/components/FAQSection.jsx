'use client';
import React, { useState } from 'react';
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ThemeProvider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion, AnimatePresence } from 'framer-motion';
import { faqData } from '../ServicesData'; // Update this path
import { theme } from '../../../contexts/Theme'; // Import your theme context

const FAQSection = () => {
  const [expandedAccordion, setExpandedAccordion] = useState('panel1');

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const accordionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.4
      }
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mt: 6 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.div variants={titleVariants}>
            <Typography variant="h4" sx={{ 
              fontWeight: 700, 
              mb: 3,
              color: theme.palette.primary.main // Using your turquoise color
            }}>
              Frequently Asked Questions
            </Typography>
          </motion.div>
          
          {faqData.map((faq, index) => (
            <motion.div
              key={faq.id}
              custom={index}
              variants={accordionVariants}
            >
              <Accordion 
                expanded={expandedAccordion === faq.id} 
                onChange={handleAccordionChange(faq.id)}
                sx={{ 
                  mb: 2, 
                  borderRadius: '8px !important', 
                  overflow: 'hidden',
                  '&:before': {
                    display: 'none',
                  },
                  boxShadow: expandedAccordion === faq.id ? 
                    '0 4px 20px rgba(0,0,0,0.1)' : 
                    '0 2px 8px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  // Highlight active accordion with primary color accent
                  ...(expandedAccordion === faq.id && {
                    borderLeft: `4px solid ${theme.palette.primary.main}`, // Using your turquoise color
                  })
                }}
              >
                <AccordionSummary 
                  expandIcon={
                    <ExpandMoreIcon 
                      sx={{ 
                        color: expandedAccordion === faq.id ? 
                          theme.palette.primary.main : // Using your turquoise color
                          'inherit'
                      }} 
                    />
                  }
                >
                  <Typography variant="subtitle1" sx={{ 
                    fontWeight: 600,
                    color: expandedAccordion === faq.id ? 
                      theme.palette.primary.main : // Using your turquoise color
                      'inherit'
                  }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <AnimatePresence>
                    {expandedAccordion === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Typography variant="body2" sx={{ color: '#4a5568' }}>
                          {faq.answer}
                        </Typography>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
          
          {/* "Still have questions?" box with your brand colors */}
          <motion.div
            variants={accordionVariants}
            custom={faqData.length}
          >
            <Box
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 2,
                backgroundColor: `${theme.palette.primary.main}10`, // Light turquoise background
                border: `1px solid ${theme.palette.primary.main}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Typography variant="h6" sx={{ 
                fontWeight: 600, 
                mb: 1,
                color: theme.palette.primary.main // Using turquoise color
              }}>
                Still have questions?
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Our support team is here to help. Contact us anytime and we'll get back to you as soon as possible.
              </Typography>
            </Box>
          </motion.div>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
};

export default FAQSection;