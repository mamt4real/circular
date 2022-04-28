function placeChildrens(
  parent,
  noChildrens = 6,
  childSize = 50,
  parentRadius = 250,
  initialOffset = 0
) {
  const angleChange = 360 / noChildrens

  for (let i = 0; i < noChildrens; i++) {
    //compute angular displacement of the next child
    const angle = (initialOffset + (angleChange * i * Math.PI) / 180) % 360

    //obtain the vertical and horizontal component
    const dX = Math.sin(angle)
    const dY = Math.cos(angle)

    //variables to store the left and top values of css property
    var leftOffset = 0
    var topOffset = 0

    switch (true) {
      //top right segment (1st quadrant) x+ y+
      case 0 <= angle && angle < 90: {
        leftOffset = parentRadius * (1 + dX)
        topOffset = parentRadius * (1 - dY)
        break
      }
      // botom right sengment (4th quadrant) x- y+
      case 90 <= angle && angle < 180: {
        leftOffset = parentRadius * (2 - dX)
        topOffset = parentRadius * (1 + dY)
        break
      }
      // botom left sengment (3rd quadrant) x- y-
      case 180 <= angle && angle < 270: {
        leftOffset = parentRadius * (1 - dX)
        topOffset = parentRadius * (2 - dY)
        break
      }
      // top left sengment (2nd quadrant) x+ y-
      case 270 <= angle && angle <= 360: {
        leftOffset = parentRadius * dX
        topOffset = parentRadius * (1 - dY)
      }
    }

    const child = getChild(childSize, i)
    child.style.top = `${topOffset}px`
    child.style.left = `${leftOffset}px`
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

  //get Radius of the container
  const height = Math.max(cont.clientHeight, cont.clientWidth)
  const parentRadius = height / 2

  //remove old childrens (if any)
  document.querySelectorAll(`#${id} > .child`).forEach((ch) => ch.remove())

  //place new childrens
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
//register form listener
document.getElementById('form').addEventListener('submit', handleFormSubmit)
