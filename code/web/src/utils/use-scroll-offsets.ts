import { useLayoutEffect, useState } from 'react'

import { SCROLL_ROOT_ID } from 'webSrc/constants'

export const useScrollOffset = (scrollRootId = 'scrollRoot') => {
  // scrolled is set to null initially to distinguish first value from future that are directly computed
  // null is falsy value so it can be seamlessly converted to false anyway if needed
  const [scrollOffset, setScrollOffset] = useState<null | number>(null)

  useLayoutEffect(() => {
    const element = document.getElementById(scrollRootId)

    if (element) {
      const handleScroll = () => {
        const { scrollTop } = element
        setScrollOffset(scrollTop - element.offsetTop)
      }

      element.addEventListener('scroll', handleScroll)
      return () => element.removeEventListener('scroll', handleScroll)
    }

    console.error(`Cannot append scroll event listener to element with id ${scrollRootId} - no such element`)
    return undefined
  }, [])

  return scrollOffset
}

export const useIsScrolled = (scrollRootId = SCROLL_ROOT_ID) => {
  const scrollOffset = useScrollOffset(scrollRootId)

  return Boolean(scrollOffset && scrollOffset > 0)
}
