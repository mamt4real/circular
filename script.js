function placeChildrens(
  parent,
  noChildrens = 6,
  childSize = 50,
  parentRadius = 250,
  initialOffset = 0
) {
  const angleChange = 360 / noChildrens

  for (let i = 0; i < noChildrens; i++) {
    const angle = (initialOffset + (angleChange * i * Math.PI) / 180) % 360

    const dX = Math.sin(angle)
    const dY = Math.cos(angle)
    var leftOffset = 0
    var topOffset = 0

    switch (true) {
      case 0 <= angle && angle < 90: {
        leftOffset = parentRadius * (1 + dX)
        topOffset = parentRadius * (1 - dY)
        break
      }
      case 90 <= angle && angle < 180: {
        leftOffset = parentRadius * (2 - dX)
        topOffset = parentRadius * (1 + dY)
        break
      }
      case 180 <= angle && angle < 270: {
        leftOffset = parentRadius * (1 - dX)
        topOffset = parentRadius * (2 - dY)
        break
      }

      case 270 <= angle && angle <= 360: {
        leftOffset = parentRadius * dX
        topOffset = parentRadius * (1 - dY)
      }
    }
    const child = getChild(childSize, i)
    child.style.top = `${topOffset}px`
    child.style.left = `${leftOffset}px`
    // console.log(child)
    parent.appendChild(child)
  }
}

function placeCentroids(
  id = 'main',
  no = 12,
  childSize = 80,
  initialOffset = 0
) {
  const cont = document.getElementById(id)

  const height = Math.max(cont.clientHeight, cont.clientWidth)

  const parentRadius = height / 2

  //remove childrens
  const childrens = document.querySelectorAll(`#${id} > .child`)
  childrens.forEach((ch) => ch.remove())
  // cont.innerHTML = ''
  placeChildrens(cont, no, childSize, parentRadius, initialOffset)
}

function getChild(childSize = 50, index) {
  const child = document.createElement('div')
  child.className = 'circle child'
  child.style.width = `${childSize}px`
  child.style.height = `${childSize}px`
  const img = document.createElement('img')
  img.className = 'child__image'
  img.setAttribute('src', `img/user${index % 10 || 1}.jpg`)
  child.appendChild(img)
  return child
}

function handleFormSubmit(e) {
  e.preventDefault()

  const no = e.target.no.value

  placeCentroids('main', no, 80)
  placeCentroids('inner', parseInt((2 * no) / 3), 65, 30)
  placeCentroids('inner2', parseInt(no / 2), 45, 45)
}

placeCentroids()
document.getElementById('form').addEventListener('submit', handleFormSubmit)
