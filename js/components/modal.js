function initModal() {
  const modal = document.getElementById('modal');
  if (!modal) {
    console.error('Modal with id="modal" not found');
    return;
  }

  const modalImg = modal.querySelector('.modal__img');
  const modalCaption = modal.querySelector('.modal__caption');
  const closeBtn = modal.querySelector('.modal__close');
  const overlay = modal.querySelector('.modal__overlay');

  if (!modalImg || !modalCaption || !closeBtn || !overlay) {
    console.error('Modal inner elements not found');
    return;
  }

  document.querySelectorAll('.portfolio__image').forEach(function (img) {
    img.style.cursor = 'pointer';

    img.addEventListener('click', function () {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalCaption.textContent = img.closest('figure')
        .querySelector('[itemprop="description"]').textContent;
      modal.classList.add('modal--open');
    });
  });

  function close() {
    modal.classList.remove('modal--open');
  }

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      close();
    }
  });
}