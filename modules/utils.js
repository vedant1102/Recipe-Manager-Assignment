export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function debounce(func, wait = 200) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

export function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
export function escapeHtmlAttr(str = '') {
  return escapeHtml(str).replace(/"/g, '&quot;')
}
