export const focusField = (
  e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const target = e.target;

  if (target instanceof HTMLInputElement && target.type !== "textarea") {
    setTimeout(() => {
      target.select();
    }, 10);
  } else {
    const textarea = target as HTMLTextAreaElement;
    setTimeout(() => {
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }, 10);
  }
};
