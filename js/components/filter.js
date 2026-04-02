function initFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio__item');

  function applyFilter(filter) {
    buttons.forEach(b => b.classList.remove('active'));
    document.querySelector('[data-filter="' + filter + '"]').classList.add('active');

    items.forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.style.display = show ? 'block' : 'none';
    });

    saveFilter(filter);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      applyFilter(btn.dataset.filter);
    });
  });

  applyFilter(loadFilter());
}