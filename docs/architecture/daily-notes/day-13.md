# Day 13: SEO and Performance in Next.js

**Date**: January 19, 2026

## Objectives

-  Add metadata per route (title/description)
-  Use Next Image where appropriate; evaluate bundle size
-  Implement caching awareness (revalidate) where it makes sense


**Benefits:**
- Automatic format conversion (AVIF, WebP)
- Responsive image srcsets
- Lazy loading by default
- Prevents layout shift

## Technical Decisions

### Metadata Architecture

**Template Pattern:**
- Root layout defines template: `%s | Workboard`
- Child pages only need to export title
- Consistent branding across all pages

**Dynamic Metadata:**
- Used `generateMetadata()` for data-driven pages
- Adapts to search params and dynamic routes
- Provides contextual SEO for each page state

**No-Index Login:**
- Separate layout for login route
- Prevents indexing of authentication pages
- Better SEO and security

### Caching Strategy

**60-Second ISR:**
- Balances freshness with performance
- Appropriate for project management app
- Reduces server load significantly

**Stale-While-Revalidate:**
- Allows graceful degradation
- Users get instant responses
- Background revalidation keeps data fresh

**Dynamic Parameters:**
- Allows URL-based filtering and search
- Works with ISR caching
- Best of both worlds: dynamic + cached

### Image Optimization

**Modern Formats:**
- AVIF (best compression, modern browsers)
- WebP (good compression, wide support)
- Falls back to original format if needed

**Responsive Sizing:**
- Multiple device sizes for srcset
- Serves optimal image per device
- Reduces bandwidth usage

### Web Vitals

**Development Logging:**
- See metrics in real-time during development
- Identify performance issues early
- No production overhead

**Analytics Ready:**
- Easy to integrate with any analytics provider
- Structured metric data
- All Core Web Vitals covered

---
## Performance Metrics (Expected Improvements)

### Before Optimization
- No caching → every request hits server
- No metadata → poor SEO and social sharing
- No monitoring → blind to performance issues
- No bundle analysis → potential bloat

### After Optimization
- 60s caching → 60x reduction in server requests
- Full metadata → better search rankings and social previews
- Web Vitals → real-time performance insights
- Bundle analyzer → identify optimization opportunities

### Target Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)
- **TTFB**: < 600ms (Time to First Byte)


## Key Learnings

1. **Metadata Template Pattern**: Using `template` in root layout eliminates repetition
2. **ISR is Powerful**: 60s caching dramatically reduces server load
3. **Client Components**: Only 11 out of many components need 'use client'
4. **Server Components**: Default server components are a huge performance win
5. **Web Vitals**: Built-in Next.js support makes monitoring trivial
6. **Bundle Analyzer**: Visual tool makes optimization opportunities obvious
7. **Cache Headers**: API routes can use HTTP caching effectively


## Notes

- All changes are backward compatible
- No breaking changes to existing functionality
- Performance improvements are passive (don't require code changes elsewhere)
- Monitoring is non-intrusive (no UI changes)
- Documentation is comprehensive for future developers