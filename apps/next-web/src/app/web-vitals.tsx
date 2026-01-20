'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals]', metric);
    }
    
    // In production, send to analytics
    // Example: sendToAnalytics(metric);
    // switch (metric.name) {
    //   case 'FCP':
    //   case 'LCP':
    //   case 'CLS':
    //   case 'FID':
    //   case 'TTFB':
    //     // Send to your analytics provider
    //     break;
    // }
  });

  return null;
}
