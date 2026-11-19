import React, { createContext, useContext, useState, useEffect } from "react";
import { storageService } from "../services/storageService";
import { translations } from "../i18n/translations";

const AuthContext = createContext(null);

export const DEMO_USERS = {
  citizen: {
    email: "citizen@civicsaathi.demo",
    name: "Rahul Sharma",
    role: "citizen",
    phone: "+91 98765 43210",
    locality: "Mira Road",
    ward: "Ward 12 (North)",
  },
  staff: {
    email: "staff@civicsaathi.demo",
    name: "Officer Vikram Kulkarni",
    role: "staff",
    department: "Municipal Ward 12 Operations",
    badgeNumber: "MC-W12-409",
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = storageService.getStoredUser();
    // Default to citizen user for a seamless experience, or stored user
    return stored || DEMO_USERS.citizen;
  });

  const [language, setLanguage] = useState(() => {
    return storageService.getStoredLanguage();
  });

  const [examGuideOpen, setExamGuideOpen] = useState(false);

  useEffect(() => {
    storageService.setStoredUser(user);
  }, [user]);

  useEffect(() => {
    storageService.setStoredLanguage(language);
  }, [language]);

  const login = (email, password, requestedRole) => {
    const trimmedEmail = email.trim().toLowerCase();

    // Check credentials (demo password: demo123)
    if (password !== "demo123" && password !== "demo") {
      return {
        success: false,
        message: "Invalid credentials. Please use demo password: demo123",
      };
    }

    if (trimmedEmail === "staff@civicsaathi.demo" || requestedRole === "staff") {
      const staffUser = DEMO_USERS.staff;
      setUser(staffUser);
      return { success: true, user: staffUser };
    }

    // Default to citizen demo account
    const citizenUser = {
      ...DEMO_USERS.citizen,
      email: trimmedEmail || DEMO_USERS.citizen.email,
    };
    setUser(citizenUser);
    return { success: true, user: citizenUser };
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole) => {
    if (newRole === "staff") {
      setUser(DEMO_USERS.staff);
    } else {
      setUser(DEMO_USERS.citizen);
    }
  };

  const t = (path) => {
    const keys = path.split(".");
    let current = translations[language] || translations.en;
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        // Fallback to English
        let fallback = translations.en;
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : "guest",
        login,
        logout,
        switchRole,
        language,
        setLanguage,
        t,
        examGuideOpen,
        setExamGuideOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
