import { INITIAL_SERVICES } from "../data/demoData";

export const serviceDirectory = {
  getAllServices: () => {
    return INITIAL_SERVICES;
  },

  getServiceById: (id) => {
    return INITIAL_SERVICES.find((s) => s.id === id) || null;
  },

  getCategories: () => {
    const categories = new Set(INITIAL_SERVICES.map((s) => s.category));
    return ["All", ...Array.from(categories)];
  },

  /**
   * Rule-based intelligent civic recommendation engine
   * Analyzes user description/query and matches against service keywords and domain triggers.
   */
  recommendServices: (query) => {
    if (!query || typeof query !== "string" || query.trim().length < 2) {
      return [];
    }

    const cleanQuery = query.toLowerCase();
    const queryTokens = cleanQuery.split(/[\s,.'";:!?()-]+/).filter((t) => t.length > 2);

    const scored = INITIAL_SERVICES.map((service) => {
      let score = 0;
      const matchedKeywords = [];

      // Check whole query against keywords
      for (const kw of service.keywords) {
        const lowerKw = kw.toLowerCase();
        if (cleanQuery.includes(lowerKw)) {
          score += 15;
          if (!matchedKeywords.includes(kw)) {
            matchedKeywords.push(kw);
          }
        }
      }

      // Check query tokens
      for (const token of queryTokens) {
        if (service.name.toLowerCase().includes(token)) {
          score += 10;
          if (!matchedKeywords.includes(token)) {
            matchedKeywords.push(token);
          }
        }
        if (service.category.toLowerCase().includes(token)) {
          score += 5;
        }
      }

      // Determine confidence percentage (capped at 98%)
      const confidence = Math.min(Math.round((score / 25) * 100), 98);

      let reason = "";
      if (matchedKeywords.length > 0) {
        reason = `Identified key civic triggers: "${matchedKeywords.slice(0, 3).join(", ")}". Routed automatically to ${service.suggestedTeam} under ${service.category}.`;
      } else {
        reason = `Partial match based on category indexing.`;
      }

      return {
        service,
        score,
        confidence: Math.max(confidence, 35),
        matchedKeywords,
        reason,
      };
    });

    // Return only matches with score > 0, sorted by highest score
    return scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
  },
};
