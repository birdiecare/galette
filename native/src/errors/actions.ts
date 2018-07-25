export const TYPE_REPORT_ERROR = '@Galette/REPORT_ERROR';
export const TYPE_DISMISS_ERROR = '@Galette/DISMISS_ERROR';

export function reportError(error: Error, action?: Action) {
  return {
    type: TYPE_REPORT_ERROR,
    error,
    action
  }
}

export function dismissError(identifier: string) {
  return {
    type: TYPE_DISMISS_ERROR,
    identifier,
  }
}
