'use client';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import IronIcon from '@mui/icons-material/Iron';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

// Service data with more details and images
export const services = [
  {
    id: 1,
    title: "Wash & Fold",
    price: 1.50,
    unit: "per item",
    icon: <LocalLaundryServiceIcon sx={{ fontSize: 40 }} />,
    image: "/images/wash-fold.jpg",
    color: "#E3F2FD", // Updated to match theme.palette.primary.light
    description: "Our premium wash & fold service cleans and neatly folds your everyday clothing and linens using eco-friendly detergents.",
    features: [
      "2-hour collection window",
      "48-hour standard service",
      "Eco-friendly detergents",
      "Weight-based pricing"
    ],
    options: [
      { name: "Standard (48h)", price: 0, turnaround: "48 hours" },
      { name: "Express (24h)", price: 5, turnaround: "24 hours" },
      { name: "Same Day", price: 10, turnaround: "Same day" }
    ]
  },
  {
    id: 2,
    title: "Dry Cleaning",
    price: 3.50,
    unit: "per item",
    icon: <DryCleaningIcon sx={{ fontSize: 40 }} />,
    image: "/images/dry-cleaning.jpg",
    color: "#FFF8E1", // Light yellow
    description: "Professional dry cleaning for your delicate garments and fabrics requiring special care and treatment.",
    features: [
      "Specialist stain removal",
      "Professional pressing",
      "Next-day service",
      "Wedding dress cleaning"
    ],
    options: [
      { name: "Standard (48h)", price: 0, turnaround: "48 hours" },
      { name: "Express (24h)", price: 7, turnaround: "24 hours" }
    ]
  },
  {
    id: 3,
    title: "Ironing",
    price: 2.00,
    unit: "per item",
    icon: <IronIcon sx={{ fontSize: 40 }} />,
    image: "/images/ironing.jpg",
    color: "#F3E5F5", // Light purple
    description: "Expert ironing service to give your garments that crisp, professional finish for work or special occasions.",
    features: [
      "Same-day service",
      "Expert handling",
      "Hanging or folding",
      "Bulk discounts"
    ],
    options: [
      { name: "Standard (48h)", price: 0, turnaround: "48 hours" },
      { name: "Express (24h)", price: 3, turnaround: "24 hours" },
      { name: "Same Day", price: 6, turnaround: "Same day" }
    ]
  },
  {
    id: 4,
    title: "Household",
    price: 10.00,
    unit: "per item",
    icon: <CheckroomIcon sx={{ fontSize: 40 }} />,
    image: "/images/household.jpg",
    color: "#E8F5E9", // Light green
    description: "Specialized cleaning for larger household items like duvets, blankets, curtains, and other home textiles.",
    features: [
      "Duvets & blankets",
      "Curtains & drapes",
      "Cushion covers",
      "Specialist cleaning"
    ],
    options: [
      { name: "Standard (72h)", price: 0, turnaround: "72 hours" },
      { name: "Express (48h)", price: 8, turnaround: "48 hours" }
    ]
  }
];

// How it works steps
export const howItWorksSteps = [
  {
    label: "Select Services",
    description: "Choose from our range of laundry and dry cleaning services",
    icon: <CleaningServicesIcon color="primary" />
  },
  {
    label: "Schedule Pickup",
    description: "Pick a convenient time for us to collect your items",
    icon: <DeliveryDiningIcon color="primary" />
  },
  {
    label: "Professional Cleaning",
    description: "We clean your items with eco-friendly methods",
    icon: <WaterDropIcon color="primary" />
  },
  {
    label: "Delivery",
    description: "Your fresh, clean items delivered back to your door",
    icon: <LocalLaundryServiceIcon color="primary" />
  }
];

// FAQ data
export const faqData = [
  {
    id: 'panel1',
    question: 'How does weight-based pricing work?',
    answer: `Our weight-based pricing works on a simple principle - we charge per kilogram of laundry. 
      The minimum order is 6kg at £9.00, and each additional kilogram is charged at £1.50. 
      This pricing model is perfect for regular laundry needs like clothing, bedding, and towels.`
  },
  {
    id: 'panel2',
    question: 'What is the difference between Dry Cleaning and Wash & Fold?',
    answer: `Wash & Fold is for everyday items that can be machine washed, while Dry Cleaning uses 
      special solvents to clean delicate fabrics that can't be washed with water. 
      Dry cleaning is recommended for suits, silk, wool, and items with "dry clean only" labels.`
  },
  {
    id: 'panel3',
    question: 'Do you offer express or same-day service?',
    answer: `Yes, we offer express and same-day services for most of our laundry options. 
      Express service has a 24-hour turnaround while same-day service ensures your items are 
      back to you on the same day if collected before 10 AM. Additional charges apply for these services.`
  }
];