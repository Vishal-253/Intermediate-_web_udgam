import { merchData as defaultMerch } from '../data/merchData';
import { eventsData as defaultEvents } from '../data/eventsData';

const MERCH_STORAGE_KEY = 'udgam_festival_merch_v1';
const EVENTS_STORAGE_KEY = 'udgam_festival_events_v1';
const ADMIN_AUTH_KEY = 'udgam_admin_auth_session';

// Helper to safely get from localStorage
export function getStoredMerch() {
  try {
    const data = localStorage.getItem(MERCH_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored merch, falling back to defaults:', err);
  }
  return defaultMerch;
}

export function saveMerchList(merchList) {
  try {
    localStorage.setItem(MERCH_STORAGE_KEY, JSON.stringify(merchList));
    window.dispatchEvent(new CustomEvent('udgam:data_update', { detail: { type: 'merch' } }));
  } catch (err) {
    console.error('Failed to save merch to localStorage:', err);
  }
}

export function resetMerch() {
  try {
    localStorage.setItem(MERCH_STORAGE_KEY, JSON.stringify(defaultMerch));
    window.dispatchEvent(new CustomEvent('udgam:data_update', { detail: { type: 'merch' } }));
  } catch (err) {
    console.error('Failed to reset merch:', err);
  }
  return defaultMerch;
}

// Events store operations
export function getStoredEvents() {
  try {
    const data = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored events, falling back to defaults:', err);
  }
  return defaultEvents;
}

export function saveEventsList(eventsList) {
  try {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(eventsList));
    window.dispatchEvent(new CustomEvent('udgam:data_update', { detail: { type: 'events' } }));
  } catch (err) {
    console.error('Failed to save events to localStorage:', err);
  }
}

export function resetEvents() {
  try {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(defaultEvents));
    window.dispatchEvent(new CustomEvent('udgam:data_update', { detail: { type: 'events' } }));
  } catch (err) {
    console.error('Failed to reset events:', err);
  }
  return defaultEvents;
}

// Authentication Helpers
export function checkAdminAuth() {
  try {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true' || localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch (err) {
    return false;
  }
}

export function setAdminAuth(isAuth, remember = false) {
  try {
    if (isAuth) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      if (remember) {
        localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      }
    } else {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
      localStorage.removeItem(ADMIN_AUTH_KEY);
    }
  } catch (err) {
    console.error('Failed to update auth session:', err);
  }
}
