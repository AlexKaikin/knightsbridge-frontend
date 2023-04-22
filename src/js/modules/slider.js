const sliders = document.querySelector('.features__slides')
if (sliders) {
  let offset = 0
  sliders.style.left = '0px'

  const slidePrev = document.querySelector('.slide-prev')
  slidePrev.addEventListener('click', () => {
    const slideWith = document.querySelector('.features__slide').offsetWidth

    if (offset !== 0) offset += slideWith
    sliders.style.left = offset + 'px'
  })

  const slideNext = document.querySelector('.slide-next')
  slideNext.addEventListener('click', () => {
    const slidesCount = document.querySelectorAll('.features__slide').length - 1
    const slideWith = document.querySelector('.features__slide').offsetWidth

    if (offset > -1 * slideWith * slidesCount) offset -= slideWith
    sliders.style.left = offset + 'px'
  })
}
