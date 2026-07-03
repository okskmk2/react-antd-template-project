type ErrorPagePayload = {
  name?: string;
  message?: string;
};

export function getErrorPageCopy(
  state: unknown,
  fallbackTitle: string,
  fallbackMessage: string,
) {
  const payload = state as ErrorPagePayload | null;

  return {
    title: payload?.name ?? fallbackTitle,
    message: payload?.message ?? fallbackMessage,
  };
}