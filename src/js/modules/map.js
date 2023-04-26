import { data } from './api.data.js'

ymaps.ready(init)

function init() {
  var myMap = new ymaps.Map('map', {
      center: [55.74660592958217, 37.5362368787333],
      zoom: 15,
      controls: [],
    }),
    objectManager = new ymaps.ObjectManager({
      clusterize: false,
      gridSize: 64,
      clusterIconLayout: 'default#pieChart',
    })

  objectManager.add(data)
  myMap.geoObjects.add(objectManager)

  const mapCategoryDiv = document.querySelector('.map__category')

  getPlaceMarkCategory(data).map(item =>
    mapCategoryDiv.insertAdjacentHTML(
      'beforeend',
      `<button
          class="category__item"
          data-category="${item.title}"
          data-checked="true"
        >
          ${item.title} <span>${item.count}</span>
        </button>`
    )
  )

  mapCategoryDiv.addEventListener('click', e => {
    const category = e.target.closest('.category__item').dataset.category
    const isChecked =
      e.target.closest('.category__item').dataset.checked === 'true'
        ? true
        : false

    if (isChecked) {
      e.target.closest('.category__item').dataset.checked = false
      objectManager.remove(getPlaceMarkByCategory(data, category))
    } else {
      e.target.closest('.category__item').dataset.checked = true
      objectManager.add(getPlaceMarkByCategory(data, category))
    }
  })
}

function getPlaceMarkCategoryAll(data) {
  return data.features.map(item => ({
    title: item.properties.balloonContent,
    position: item.properties.position,
    count: data.features.filter(
      mark => mark.properties.balloonContent === item.properties.balloonContent
    ).length,
  }))
}

function getPlaceMarkCategory(data) {
  return getPlaceMarkCategoryAll(data)
    .reduce(
      (acc, item) => {
        if (acc.map[item.title]) return acc

        acc.map[item.title] = true
        acc.result.push(item)
        return acc
      },
      {
        map: {},
        result: [],
      }
    )
    .result.sort((a, b) => (a.position > b.position ? 1 : -1))
}

function getPlaceMarkByCategory(data, category) {
  const find = data.features.filter(
    item => item.properties.balloonContent === category
  )

  return { type: 'FeatureCollection', features: find }
}
