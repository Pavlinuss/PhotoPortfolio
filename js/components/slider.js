function initSlider() {
  const items = document.querySelectorAll('.slider__item');
  const prevBtn = document.querySelector('.slider__btn--prev');
  const nextBtn = document.querySelector('.slider__btn--next');

  if (!items.length || !prevBtn || !nextBtn) {
    console.error('Slider elements not found');
    return;
  }

  let current = 0;

  function show(index) {
    items.forEach(function (item) {
      item.classList.remove('active');
    });
    items[index].classList.add('active');
  }

  show(current);

  nextBtn.addEventListener('click', function () {
    current = (current + 1) % items.length;
    show(current);
  });

  prevBtn.addEventListener('click', function () {
    current = (current - 1 + items.length) % items.length;
    show(current);
  });
}