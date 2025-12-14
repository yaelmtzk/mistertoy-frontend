export const toyImages = import.meta.glob('/src/assets/img/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default'
})

import fallbackImg from '/src/assets/img/toy.jpg'

const imgList = Object.values(toyImages)

export function getToyImage(imgUrl) {
    const toyImg = imgList.find(imgSrc =>
        imgSrc.includes(imgUrl))
//   const key = `/src/assets/img/${imgName}`

  if (toyImg) return toyImg

  return fallbackImg
}