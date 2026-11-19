import { INITIAL_REQUESTS, INITIAL_NOTIFICATIONS } from "../data/demoData";

const STORAGE_KEYS = {
  REQUESTS: "civicsaathi_requests",
  NOTIFICATIONS: "civicsaathi_notifications",
  USER: "civicsaathi_current_user",
  LANGUAGE: "civicsaathi_language",
};

export const storageService = {
  getRequests: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(INITIAL_REQUESTS));
        return INITIAL_REQUESTS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error("Error reading requests from localStorage", e);
      return INITIAL_REQUESTS;
    }
  },

  saveRequests: (requests) => {
    try {
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    } catch (e) {
      console.error("Error saving requests to localStorage", e);
    }
  },

  getNotifications: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
        return INITIAL_NOTIFICATIONS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error("Error reading notifications from localStorage", e);
      return INITIAL_NOTIFICATIONS;
    }
  },

  saveNotifications: (notifications) => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch (e) {
      console.error("Error saving notifications to localStorage", e);
    }
  },

  getStoredUser: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setStoredUser: (user) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  },

  getStoredLanguage: () => {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || "en";
  },

  setStoredLanguage: (lang) => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  },

  resetDemoData: () => {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(INITIAL_REQUESTS));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    return { requests: INITIAL_REQUESTS, notifications: INITIAL_NOTIFICATIONS };
  },
};
