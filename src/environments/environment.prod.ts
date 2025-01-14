const regex = /^rejects-production-[a-zA-Z0-9]+\.up\.railway\.app$/;
const currentHost = window.location.host;

export const environment = {
  production: true,
  apiBaseUrl: regex.test(currentHost)
    ? `https://${currentHost}/api`
    : 'https://fallback-url/api' // Utilisez une URL de secours si le domaine ne correspond pas
};
