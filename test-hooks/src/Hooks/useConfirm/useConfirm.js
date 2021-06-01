
export const useConfirm = (message = "", onConfirm, onCancel) => {
  if (!onConfirm || typeof callback !== "fuction") {
    return;
  }
    if (onCancel && typeof onCancel !== "function") {
    return
    } 
  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  }
  return confirmAction;
}