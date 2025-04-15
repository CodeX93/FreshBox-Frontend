"use client"
import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  TextField, 
  IconButton,
  Collapse,
  Fade
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Add as AddIcon, 
  Remove as RemoveIcon,
  HelpOutline as HelpIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {theme} from "../../../contexts/Theme"

const FAQSection = () => {
  const router = useRouter();
  const [expandedQuestion, setExpandedQuestion] = useState(0); // First question expanded by default
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);

  const faqs = [
    {
      question: "How much does the service cost?",
      answer: "Our pricing is weight-based at $2.99 per pound with a 10-pound minimum. We also offer subscription plans that can save you up to 20% for regular service. Special items like comforters or formal wear may have additional charges. You'll always see the full price before confirming.",
    },
    {
      question: "What is the typical turnaround time?",
      answer: "Our standard turnaround time is 48 hours from pickup to delivery. Need it faster? Our express service guarantees 24-hour turnaround for an additional fee. You'll receive real-time updates through our app.",
    },
    {
      question: "How do you handle delicate items?",
      answer: "Delicate items receive special attention. We sort all laundry by color, fabric type, and washing instructions. We use gentle cycles, appropriate water temperatures, and specialized detergents for delicate fabrics.",
    },
    {
      question: "What if an item is lost or damaged?",
      answer: "While extremely rare, we take full responsibility for any lost or damaged items. We'll reimburse you for the estimated value of the item up to $250 per item.",
    },
    {
      question: "Are your cleaning products eco-friendly?",
      answer: "Yes! We use environmentally friendly, hypoallergenic detergents by default. You can also specify your preferred detergent or request fragrance-free options.",
    },
    {
      question: "Do I need to be home for pickup and delivery?",
      answer: "No need to be home! Just leave your laundry bag in your designated spot, and our driver will pick it up. Same for delivery—we'll leave your freshly cleaned clothes where you specify.",
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchFocus = () => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box textAlign="center" mb={4}>
          {/* Question Mark Header */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20 
            }}
          >
            <Box 
              sx={{ 
                width: 100, 
                height: 100, 
                borderRadius: '50%', 
                backgroundColor: '#2D4059',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                mb: 3,
                boxShadow: '0 10px 30px rgba(45, 64, 89, 0.3)'
              }}
            >
              <HelpIcon sx={{ color: 'white', fontSize: 50 }} />
            </Box>
          </motion.div>

          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700, 
              color: '#2D4059',
              mb: 2,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 100,
                height: 4,
                backgroundColor: '#F5D547'
              }
            }}
          >
            Frequently Asked Questions
          </Typography>

          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: '#2D4059',
              opacity: 0.7,
              mt: 3,
              mb: 4,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Everything you need to know about our laundry service
          </Typography>

          {/* Enhanced Search Bar */}
          <Box 
            sx={{ 
              position: 'relative', 
              maxWidth: 600,
              mx: 'auto',
              color:'#FBFFCF',
              mb: 4, 
              
            }}
          >
              <TextField
                fullWidth
                variant="outlined"
                inputRef={searchRef}
                placeholder="Search for answers..."
                value={searchQuery}
                
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <IconButton 
                      onClick={handleSearchFocus}
                      sx={{ mr: 1, color: '#2D4059' }}
                    >
                      <SearchIcon />
                    </IconButton>
                  ),
                  sx: {
                    
                    backgroundColor: '#FFFBE6',
                    borderRadius: 1,
                    
                  }
                }}

              />
          </Box>

          {/* FAQ List */}
          <Box 
            sx={{ 
              border: '2px solid #F5D547', 
              borderRadius: 3,
              backgroundColor: '#FBFFCF',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(45, 64, 89, 0.1)'
            }}
          >
            {filteredFAQs.map((faq, index) => (
              <Box key={index}>
                {index > 0 && <Box sx={{ borderTop: '1px solid #F5D547' }} />}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    p: 2,
                    cursor: 'pointer',
                    backgroundColor: expandedQuestion === index 
                      ? 'rgba(245, 213, 71, 0.1)' 
                      : 'transparent',
                    transition: 'background-color 0.3s ease'
                  }}
                  onClick={() => setExpandedQuestion(
                    expandedQuestion === index ? null : index
                  )}
                >
                  <Typography 
                    sx={{ 
                      color: '#2D4059', 
                      fontWeight: expandedQuestion === index ? 600 : 400,
                      flex: 1,
                      textAlign: 'left'
                    }}
                  >
                    {faq.question}
                  </Typography>
                  <motion.div
                    animate={{ 
                      rotate: expandedQuestion === index ? 180 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconButton 
                      sx={{ 
                        color: '#2D4059',
                        backgroundColor: expandedQuestion === index 
                          ? 'rgba(245, 213, 71, 0.2)' 
                          : 'transparent'
                      }}
                    >
                      {expandedQuestion === index ? <RemoveIcon /> : <AddIcon />}
                    </IconButton>
                  </motion.div>
                </Box>
                <Collapse in={expandedQuestion === index}>
                  <Fade in={expandedQuestion === index}>
                    <Box 
                      sx={{ 
                        p: 3, 
                        backgroundColor: 'white', 
                        borderTop: '1px solid #F5D547',
                        textAlign: 'left'
                      }}
                    >
                      <Typography 
                        sx={{ 
                          color: '#2D4059',
                          lineHeight: 1.6
                        }}
                      >
                        {faq.answer}
                      </Typography>
                    </Box>
                  </Fade>
                </Collapse>
              </Box>
            ))}
          </Box>

         {/* Contact Support Section */}
<Box
  sx={{
    mt: 4,
    backgroundColor: theme.palette.primary.darkBlue,
    borderRadius: 3,
    p: 4,
    color: theme.palette.primary.whitishMint,
    display: 'flex',
    alignItems: 'left',
    justifyContent:'left',
    textAlign:'left',

    position: 'relative',
    overflow: 'hidden'
  }}
>
  <Box sx={{ flex: 1, zIndex: 2, pr: 4 }}>
    <Typography
      variant="h5"
      sx={{
        mb: 2,
        color: theme.palette.primary.yellowish,
        fontWeight: 700,
        textAlign:'left',
      }}
    >
      Still have questions?
    </Typography>
    <Typography
      sx={{
        mb: 3,
        opacity: 0.8,
        lineHeight: 1.6,
        color: theme.palette.primary.yellowish,
        textAlign:'left',

      }}
    >
      Our dedicated support team is ready to help. Reach out anytime, and we'll provide prompt and personalized assistance.
    </Typography>
    
      <Button
        variant="contained"
        onClick={() => router.push('/support')}
        sx={{
          backgroundColor: theme.palette.primary.yellowish,
          color: theme.palette.primary.darkBlue,
          fontWeight: 600,
          px: 3,
          py: 1,
          borderRadius: 1,
          
          '&:hover': {
            backgroundColor: theme.palette.primary.darkBlue,
            color: theme.palette.primary.yellowish,
          }
        }}
      >
        Contact Support
      </Button>
    
  </Box>
  {/* Question Mark Graphic - Using the SVG from the document */}
  <Box
    sx={{
      display: { xs: 'none', md: 'flex' },
      width: 180,
      height: 180,
      zIndex: 2,
      justifyContent: 'left',
      alignItems: 'left'
    }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
    >
      <svg width="150" height="150" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_10_244" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="500" height="500">
          <path d="M500 0H0V500H500V0Z" fill="white"/>
        </mask>
        <g mask="url(#mask0_10_244)">
          <mask id="mask1_10_244" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="-79" y="-61" width="640" height="640">
            <path d="M-79 -61H561V579H-79V-61Z" fill="white"/>
          </mask>
          <g mask="url(#mask1_10_244)">
            <path d="M168.209 329.506C157.486 334.183 145 329.282 140.323 318.558L136.731 310.322C128.372 291.157 132.964 268.749 148.157 254.563C159.585 243.892 162.464 226.734 155.157 212.836C147.155 197.618 128.921 190.538 112.742 196.368C95.6247 202.525 86.0415 221.007 90.9119 238.422C91.3471 239.979 91.8991 241.529 92.5527 243.027C97.2295 253.75 92.3279 266.236 81.6039 270.913C70.8807 275.59 58.3951 270.687 53.7183 259.963C52.2839 256.676 51.0703 253.267 50.1095 249.83C39.2959 211.152 60.4951 170.155 98.3783 156.51C134.34 143.55 174.871 159.29 192.656 193.12C208.822 223.867 202.412 261.867 177.07 285.53C174.973 287.486 174.368 290.642 175.563 293.384L179.156 301.62C183.834 312.344 178.933 324.83 168.209 329.506Z" fill="#FFCB5B"/>
            <path d="M193.406 387.281C182.683 391.958 170.197 387.057 165.52 376.333L165.449 376.172C160.773 365.449 165.674 352.963 176.398 348.286C187.121 343.609 199.607 348.511 204.284 359.235L204.354 359.396C209.031 370.12 204.13 382.605 193.406 387.281Z" fill="#FFCB5B"/>
            <path d="M67.2751 242.346C68.2319 245.785 69.4511 249.189 70.8855 252.477C74.2183 260.118 81.5159 264.809 89.3159 265.17C87.2847 267.58 84.6879 269.567 81.6039 270.912C70.8871 275.586 58.3975 270.69 53.7191 259.964C52.2855 256.676 51.0759 253.267 50.1183 249.829C39.2959 211.146 60.5031 170.153 98.3815 156.507C99.7383 156.019 101.103 155.573 102.474 155.171C72.9687 172.612 57.7791 208.372 67.2751 242.346Z" fill="#FBFFCF"/>
            <path d="M165.321 247.075C150.13 261.261 145.532 283.674 153.891 302.839L157.482 311.073C160.814 318.716 168.122 323.401 175.922 323.762C173.891 326.172 171.294 328.158 168.21 329.504C157.484 334.182 145.005 329.282 140.326 318.556L136.735 310.322C128.377 291.157 132.963 268.749 148.164 254.558C159.589 243.884 162.463 226.735 155.156 212.838C148.288 199.765 133.87 192.697 119.69 194.669C122.674 192.224 126.109 190.252 129.91 188.884C146.089 183.051 164.322 190.129 172.322 205.351C179.63 219.248 176.746 236.402 165.321 247.075Z" fill="#FBFFCF"/>
            <path d="M201.12 381.538C199.089 383.947 196.492 385.934 193.409 387.279C182.682 391.958 170.201 387.058 165.524 376.331L165.452 376.166C160.777 365.449 165.673 352.959 176.4 348.281C179.484 346.936 182.706 346.385 185.854 346.536C180.817 352.508 179.279 361.051 182.608 368.684L182.68 368.849C186.013 376.49 193.321 381.176 201.12 381.538Z" fill="#FBFFCF"/>
            <path d="M331.488 328.49C320.188 325.462 313.481 313.846 316.509 302.546L318.835 293.867C324.246 273.67 341.806 259.011 362.529 257.391C378.117 256.171 391.065 244.55 394.014 229.127C397.246 212.24 387.401 195.337 371.116 189.811C353.894 183.954 334.881 192.431 327.83 209.084C327.201 210.572 326.666 212.128 326.244 213.707C323.216 225.007 311.6 231.715 300.299 228.687C288.999 225.659 282.293 214.043 285.321 202.743C286.249 199.278 287.425 195.856 288.817 192.57C304.473 155.586 346.606 136.746 384.733 149.693C420.93 161.979 442.81 199.551 435.628 237.09C429.1 271.209 400.399 296.926 365.833 299.631C362.974 299.854 360.533 301.944 359.759 304.832L357.433 313.511C354.404 324.811 342.788 331.518 331.488 328.49Z" fill="#FFE4AC"/>
            <path d="M315.174 389.373C303.874 386.345 297.166 374.729 300.194 363.429L300.24 363.258C303.268 351.958 314.884 345.252 326.184 348.28C337.484 351.308 344.191 362.924 341.163 374.224L341.118 374.393C338.09 385.694 326.474 392.401 315.174 389.373Z" fill="#FFE4AC"/>
            <path d="M306.902 197.417C305.508 200.702 304.338 204.125 303.41 207.59C301.253 215.644 304.035 223.859 309.908 229.004C306.818 229.622 303.549 229.557 300.299 228.686C289.006 225.66 282.292 214.046 285.321 202.742C286.249 199.276 287.428 195.857 288.823 192.573C304.476 155.58 346.613 136.746 384.738 149.69C386.103 150.154 387.448 150.656 388.77 151.197C354.826 146.44 320.657 164.932 306.902 197.417Z" fill="#FFCE66"/>
            <path d="M380.618 262.235C359.896 263.857 342.33 278.517 336.918 298.712L334.593 307.389C332.435 315.443 335.228 323.662 341.101 328.806C338.01 329.424 334.742 329.36 331.492 328.488C320.188 325.46 313.485 313.848 316.514 302.544L318.838 293.868C324.25 273.672 341.806 259.009 362.538 257.39C378.125 256.166 391.064 244.549 394.013 229.128C396.793 214.624 389.925 200.11 377.607 192.812C381.466 192.761 385.38 193.36 389.206 194.66C405.493 200.184 415.336 217.084 412.102 233.975C409.154 249.397 396.205 261.012 380.618 262.235Z" fill="#FFCE66"/>
            <path d="M324.786 389.69C321.696 390.308 318.427 390.242 315.178 389.371C303.874 386.342 297.17 374.732 300.199 363.429L300.246 363.254C303.272 351.961 314.886 345.248 326.189 348.277C329.439 349.148 332.302 350.726 334.67 352.806C327.008 354.335 320.48 360.056 318.324 368.099L318.278 368.274C316.121 376.327 318.914 384.546 324.786 389.69Z" fill="#FFCE66"/>
            <path d="M250.502 318.903C237.367 318.903 226.719 308.255 226.719 295.121V285.032C226.719 261.557 241.501 240.557 263.504 232.777C280.054 226.925 290.72 210.559 289.437 192.977C288.033 173.724 272.445 158.255 253.178 156.993C232.799 155.647 214.642 170.365 211.837 190.473C211.586 192.271 211.459 194.113 211.459 195.949C211.459 209.084 200.81 219.732 187.675 219.732C174.54 219.732 163.892 209.084 163.892 195.949C163.892 191.922 164.173 187.868 164.726 183.9C170.958 139.241 211.176 106.567 256.286 109.527C299.112 112.332 333.759 146.72 336.878 189.518C339.714 228.417 316.062 264.646 279.361 277.624C276.326 278.697 274.286 281.674 274.286 285.032V295.121C274.285 308.255 263.638 318.903 250.502 318.903Z" fill="#FFCE66"/>
            <path d="M250.502 389.671C237.366 389.671 226.718 379.022 226.718 365.888V365.692C226.718 352.557 237.366 341.907 250.502 341.907C263.637 341.907 274.285 352.557 274.285 365.692V365.888C274.285 379.022 263.637 389.671 250.502 389.671Z" fill="#FFCE66"/>
            <path d="M185.749 183.902C185.19 187.87 184.917 191.921 184.917 195.948C184.917 205.309 190.322 213.411 198.186 217.284C195.015 218.852 191.451 219.731 187.674 219.731C174.546 219.731 163.89 209.087 163.89 195.948C163.89 191.921 164.175 187.87 164.734 183.902C170.959 139.235 211.183 106.564 256.29 109.523C257.905 109.63 259.51 109.785 261.102 109.988C222.909 114.692 191.226 144.676 185.749 183.902Z" fill="#FFE4AC"/>
            <path d="M284.529 232.775C262.528 240.556 247.738 261.559 247.738 285.034V295.119C247.738 304.48 253.155 312.583 261.019 316.455C257.848 318.023 254.284 318.903 250.506 318.903C237.367 318.903 226.724 308.258 226.724 295.119V285.034C226.724 261.559 241.502 240.556 263.514 232.775C280.063 226.919 290.719 210.561 289.435 192.979C288.235 176.443 276.57 162.698 261.09 158.362C265.261 157.186 269.679 156.699 274.206 156.996C293.474 158.256 309.061 173.723 310.462 192.979C311.745 210.561 301.077 226.918 284.529 232.775Z" fill="#FFE4AC"/>
            <path d="M261.018 387.221C257.847 388.79 254.283 389.669 250.505 389.669C237.366 389.669 226.722 379.025 226.722 365.886V365.684C226.722 352.557 237.366 341.901 250.505 341.901C254.283 341.901 257.846 342.78 261.018 344.349C253.154 348.233 247.737 356.335 247.737 365.684V365.886C247.737 375.247 253.154 383.349 261.018 387.221Z" fill="#FFE4AC"/>
          </g>
        </g>
      </svg>
    </motion.div>
  </Box>
</Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default FAQSection;