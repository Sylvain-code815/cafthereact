/**
 * Règle de robustesse du mot de passe : la même que l'API (utils/password.js, PASSWORD_RULE),
 * vérifiée aussi côté serveur à l'inscription et à la réinitialisation.
 */
export const PASSWORD_MIN_LENGTH = 12;
// bcrypt ignore tout ce qui dépasse 72 octets : l'API refuse au-delà
export const PASSWORD_MAX_LENGTH = 72;

export const PASSWORD_RULE =
  "Le mot de passe doit contenir au moins 12 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial";

export const isStrongPassword = (mdp) =>
  typeof mdp === "string" &&
  mdp.length >= PASSWORD_MIN_LENGTH &&
  mdp.length <= PASSWORD_MAX_LENGTH &&
  /[A-Z]/.test(mdp) &&
  /[a-z]/.test(mdp) &&
  /[0-9]/.test(mdp) &&
  /[^A-Za-z0-9]/.test(mdp);

/**
 * Vérifie un nouveau mot de passe et sa confirmation.
 * Renvoie le message d'erreur à afficher, ou "" si tout est correct.
 */
export const validateNewPassword = (mdp, confirmMdp) => {
  if (!mdp || !confirmMdp) return "Veuillez remplir les deux champs.";
  if (!isStrongPassword(mdp)) return PASSWORD_RULE;
  if (mdp !== confirmMdp) return "Veuillez indiquer deux mots de passe identiques.";
  return "";
};

/** Le lien de l'email contient un jeton de 64 caractères hexadécimaux */
export const isValidResetToken = (token) =>
  typeof token === "string" && /^[a-f0-9]{64}$/.test(token);
