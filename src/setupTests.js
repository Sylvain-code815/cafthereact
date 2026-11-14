import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Sans l'option « globals » de Vitest, Testing Library ne démonte pas les composants
// entre deux tests : on le fait explicitement pour repartir d'un DOM vide
afterEach(() => {
  cleanup();
});
