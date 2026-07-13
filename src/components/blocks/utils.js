// Shared utility — computes Tailwind responsive visibility classes
// from a block's visibility config: { hideOnMobile, hideOnTablet, hideOnDesktop }
export function getVisibilityClass({ hideOnMobile, hideOnTablet, hideOnDesktop } = {}) {
  const classes = []
  if (hideOnMobile)  classes.push('hidden', 'md:block')
  if (hideOnTablet)  classes.push('md:hidden', 'lg:block')
  if (hideOnDesktop) classes.push('lg:hidden')
  return classes.join(' ')
}
