export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', () => {
      // Fallback without crossOrigin attribute for local/relative assets
      const fallbackImg = new Image()
      fallbackImg.addEventListener('load', () => resolve(fallbackImg))
      fallbackImg.addEventListener('error', (err) => reject(err))
      fallbackImg.src = url
    })
    if (url.startsWith('http')) {
      image.setAttribute('crossOrigin', 'anonymous')
    }
    image.src = url
  })

function rotateSize(width, height, rotation) {
  const rotRad = (rotation * Math.PI) / 180
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
  }
}

export async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  const rotRad = (rotation * Math.PI) / 180

  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation)

  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.translate(-image.width / 2, -image.height / 2)

  ctx.drawImage(image, 0, 0)

  const croppedCanvas = document.createElement('canvas')
  const croppedCtx = croppedCanvas.getContext('2d')

  if (!croppedCtx) {
    return null
  }

  // Max dimension 1200px for ultra-fast, lightweight base64 payloads
  const maxDimension = 1200
  let targetWidth = pixelCrop.width
  let targetHeight = pixelCrop.height

  if (targetWidth > maxDimension || targetHeight > maxDimension) {
    if (targetWidth > targetHeight) {
      targetHeight = Math.round((targetHeight * maxDimension) / targetWidth)
      targetWidth = maxDimension
    } else {
      targetWidth = Math.round((targetWidth * maxDimension) / targetHeight)
      targetHeight = maxDimension
    }
  }

  croppedCanvas.width = targetWidth
  croppedCanvas.height = targetHeight

  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    targetWidth,
    targetHeight
  )

  return croppedCanvas.toDataURL('image/jpeg', 0.85)
}
