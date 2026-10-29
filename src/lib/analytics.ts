import posthog from 'posthog-js'

/**
 * Counts visits with PostHog (EU) and stores nothing on the device.
 *
 * `persistence: 'memory'` keeps the visitor id for the page load only, so no
 * cookie and no localStorage entry is ever written, which is why the page has
 * no cookie banner. What leaves is the page, the referrer, browser, device
 * type and an approximate country (PostHog discards the IP after that).
 *
 * Sends only from a production build with a key. Until the site's host is
 * known there is no same-origin proxy, so the SDK talks to PostHog directly.
 */
export function startAnalytics() {
  const key = import.meta.env.VITE_POSTHOG_KEY
  if (!import.meta.env.PROD || !key) return

  posthog.init(key, {
    api_host: 'https://eu.i.posthog.com',
    ui_host: 'https://eu.posthog.com',
    persistence: 'memory',
    person_profiles: 'identified_only',
    autocapture: false,
    capture_heatmaps: false,
    capture_dead_clicks: false,
    rageclick: false,
    disable_session_recording: true,
    disable_surveys: true,
    capture_exceptions: false,
    capture_pageview: true,
    capture_pageleave: true,
    property_denylist: ['title'],
  })
}
