// util/navigation.js
import { useCallback } from 'react';

/**
 * A navigation utility that uses window.location instead of Next.js Router
 * This avoids the "NextRouter was not mounted" error
 */
export const useNavigationUtil = () => {
  const navigateOrScroll = useCallback((targetRoute, sectionId) => {
    // This function will run in the browser
    if (typeof window !== 'undefined') {
      // Get the current path from window.location
      const currentPath = window.location.pathname;
      
      // Check if we're already on the home page
      if (currentPath === '/' || currentPath === '/home') {
        // We're on the home page, scroll to the section
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        } else {
          // If section doesn't exist, navigate
          window.location.href = targetRoute;
        }
      } else {
        // We're on a different page, navigate to the target route
        window.location.href = targetRoute;
      }
    }
  }, []);

  return { navigateOrScroll };
};