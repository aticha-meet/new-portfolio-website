/**
 * Central source for GitHub links displayed by the portfolio.
 * This file is public client-bundle data: only add URLs approved for public sharing.
 * Leave a repository null while private or awaiting company permission.
 */
export const github = {
  profile: "https://github.com/Jaosou",
  projects: {
    eyeDetection: "https://github.com/Jaosou/Eye-detection-project",
    smartCane: "https://github.com/Jaosou/MiniPro-GpsTraker-XYZ",
    apiLab: "https://github.com/Jaosou/Build-and-Test-API",
    currencyApp:
      "https://github.com/Jaosou/Develop-a-currency-exchange-rate-application-with-various-functions",
    smeDatabase:
      "https://github.com/Jaosou/Jaosou-Database-design-model-for-small-SMEs",
  },
  experiences: {
    adapterCms: null as string | null,
    eduFlow: null as string | null,
    groceryStore: null as string | null,
    classroomAutomation: null as string | null,
  },
} as const;
