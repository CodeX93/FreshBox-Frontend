import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper
} from '@mui/material';

import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

import ClientContactInfo from '../ClientSideInterations/ClientContactInfo';
import {theme} from "../../../contexts/Theme"
// Define constants
const TURQUOISE = theme.palette.primary.main;
const DARK_TURQUOISE = theme.palette.primary.darkBlue;
const LightMintColor = theme.palette.primary.whitishMint;


// Define contact information - this static data will be indexed by search engines
const contactOptions = [
  { 
    icon: <EmailIcon sx={{ fontSize: 36 }} />, 
    title: "Email Us", 
    detail: "support@freshbox.com", 
    subDetail: "24/7 email support",
    type: "email",
    href: "mailto:support@freshbox.com"
  },
  { 
    icon: <PhoneIcon sx={{ fontSize: 36 }} />, 
    title: "Call Us", 
    detail: "(800) 123-4567", 
    subDetail: "Mon-Fri: 8am-8pm, Sat-Sun: 9am-5pm",
    type: "phone",
    href: "tel:8001234567"
  },
  { 
    icon: <LocationIcon sx={{ fontSize: 36 }} />, 
    title: "Visit Us", 
    detail: "123 Clean Street, Suite 200", 
    subDetail: "Metro City, ST 12345",
    type: "address",
    href: "https://maps.google.com/?q=123+Clean+Street,+Metro+City,+ST+12345"
  },
];

const ContactInfoSection = ({ loaded }) => {
  return (
    <Box id="contact-information" aria-labelledby="contact-section-heading">
      {/* SEO-optimized content that will be indexed by search engines */}
      <div className="seo-content" style={{ position: 'absolute', visibility: 'hidden', height: 0, overflow: 'hidden' }}>
        <h2 id="contact-section-heading">Ways to Connect with FreshBox Laundry Services</h2>
        <div itemScope itemType="https://schema.org/LocalBusiness">
          <h3>Contact Information</h3>
          <ul>
            <li>
              <strong>Email:</strong> <span itemProp="email">support@freshbox.com</span> - 24/7 email support
            </li>
            <li>
              <strong>Phone:</strong> <span itemProp="telephone">(800) 123-4567</span> - Mon-Fri: 8am-8pm, Sat-Sun: 9am-5pm
            </li>
            <li>
              <address itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <strong>Address:</strong> <span itemProp="streetAddress">123 Clean Street, Suite 200</span>,
                <span itemProp="addressLocality">Metro City</span>, <span itemProp="addressRegion">ST</span> <span itemProp="postalCode">12345</span>
              </address>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Visual component for users, with animations and interactions */}
      <ClientContactInfo loaded={loaded} contactOptions={contactOptions} />
    </Box>
  );
};

export default ContactInfoSection;