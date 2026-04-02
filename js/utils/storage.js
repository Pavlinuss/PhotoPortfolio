function saveFilter(value) {
  localStorage.setItem('activeFilter', value);
}

function loadFilter() {
  return localStorage.getItem('activeFilter') || 'all';
}