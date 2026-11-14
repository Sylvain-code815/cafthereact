import React, { useRef } from "react";
import Modal from "./Modal.jsx";

/**
 * Demande de confirmation avant une action irréversible (CDC 4.3)
 * Le focus est placé sur « Annuler » : Entrée par réflexe ne supprime rien.
 */
const ConfirmDialog = ({ title, message, confirmLabel = "Confirmer", onConfirm, onCancel }) => {
  const cancelRef = useRef(null);

  return (
    <Modal title={title} titleId="confirm-dialog-title" onClose={onCancel} initialFocusRef={cancelRef}>
      <p className="confirm-message">{message}</p>
      <div className="confirm-actions">
        <button type="button" className="btn-outline" ref={cancelRef} onClick={onCancel}>
          Annuler
        </button>
        <button type="button" className="btn-filled" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
