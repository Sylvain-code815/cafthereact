/**
 * Page où revenir après connexion (?redirect=/order).
 * Seuls les chemins internes sont acceptés ("/order", pas "//site-pirate.com"),
 * sinon un lien piégé pourrait renvoyer l'utilisateur vers un autre site.
 */
export const getSafeRedirect = (searchParams, fallback = "/") => {
  const target = searchParams.get("redirect");
  return target && target.startsWith("/") && !target.startsWith("//") ? target : fallback;
};
