export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL | string) => {
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  window.gtag('config', GA_TRACKING_ID as string, {
    page_path: url,
  })
}

type gtagEvent = {
  action: string
  category: string
  label: string
  value: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: gtagEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
