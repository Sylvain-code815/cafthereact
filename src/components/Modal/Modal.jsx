import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Fenêtre modale accessible (RGAA / WAI-ARIA « dialog ») :
 * - role="dialog" + aria-modal, titre relié par aria-labelledby
 * - focus placé dans la fenêtre à l'ouverture, gardé à l'intérieur (Tab / Maj+Tab)
 *   puis rendu à l'élément qui l'a ouverte à la fermeture
 * - fermeture par Échap, par le bouton ✕ ou par un clic sur le fond
 */
const Modal = ({ title, titleId, onClose, children, className = "", initialFocusRef }) => {
  const dialogRef = useRef(null);
  // onClose change à chaque rendu du parent : on garde la dernière version sans relancer l'effet
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const dialog = dialogRef.current;

    // Focus initial : élément demandé, sinon premier élément focusable
    const first = initialFocusRef?.current || dialog.querySelector(FOCUSABLE);
    (first || dialog).focus();

    // Empêche la page de défiler derrière la fenêtre
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;

      // Piège à focus : on boucle entre le premier et le dernier élément
      const focusables = [...dialog.querySelectorAll(FOCUSABLE)];
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    };
  }, [initialFocusRef]);

  return createPortal(
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        // Clic sur le fond uniquement (pas sur le contenu de la fenêtre)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={`modal-dialog ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fermer">
          ✕
        </button>
        {title && (
          <h2 id={titleId} className="modal-title">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
