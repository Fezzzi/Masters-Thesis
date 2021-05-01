import React, { useMemo } from 'react'
import { useRoute } from 'react-router5'
import styled from 'styled-components'

import { COLORS, DESIGN, TABLET_WIDTH } from 'webSrc/constants'
import { useIsScrolled } from 'webSrc/utils/use-scroll-offsets'
import { RouteNames } from 'webSrc/utils/routes'
import { BrowseIcon, BenchmarkIcon } from 'webSrc/styles/icons'

import { PageSwitch } from './PageSwitch'

interface ColorVariants { primary: string; secondary: string }
const colorsMap: Record<string, { top: ColorVariants; switch: ColorVariants }> = {
  [RouteNames.benchmark]: {
    top: {
      primary: COLORS.ACCENT_PRIMARY,
      secondary: COLORS.ACCENT_SECONDARY,
    },
    switch: {
      primary: COLORS.PEACH_PRIMARY,
      secondary: COLORS.PEACH_SECONDARY,
    },
  },
  default: {
    top: {
      primary: COLORS.PEACH_PRIMARY,
      secondary: COLORS.PEACH_SECONDARY,
    },
    switch: {
      primary: COLORS.ACCENT_PRIMARY,
      secondary: COLORS.ACCENT_SECONDARY,
    },
  },
}

export const Navbar = () => {
  const isScrolled = useIsScrolled()

  const { route, router } = useRoute()
  const {
    colors,
    switchIcon,
    switchLabel,
    handleSwitchClick,
  } = useMemo(() => {
    const routeName = route.name
    const colors = colorsMap[routeName] ?? colorsMap.default
    const switchIcon = routeName === RouteNames.benchmark
      ? <BrowseIcon />
      : <BenchmarkIcon />
    const switchLabel = routeName === RouteNames.benchmark
      ? 'Browse'
      : 'Benchmark'

    const handleSwitchClick = () => router.navigate(routeName === RouteNames.benchmark
      ? RouteNames.browse
      : RouteNames.benchmark
    )

    return {
      colors,
      switchIcon,
      switchLabel,
      handleSwitchClick,
    }
  // todo: Check whether memo doesn't refresh on route query params modification and fix it if it happens
  }, [route, router])

  return (
    <>
      <PageNavbar scrolled={isScrolled} bkg={colors.top.secondary}>
        ICONS / BUTTONS FOR QUICK NAVIGATION WITHIN THE PAGE
      </PageNavbar>

      <PageSwitch
        colors={colors.switch}
        icon={switchIcon}
        label={switchLabel}
        onSwitchClick={handleSwitchClick}
      />
    </>
  )
}

const PageNavbar = styled.div<{ scrolled: boolean; bkg: string }>`
  position: fixed;
  height: ${props => props.scrolled ? DESIGN.NAVBAR_HEIGHT_SCROLLED : DESIGN.NAVBAR_HEIGHT}px;
  width: fill-available;
  padding: ${props => props.scrolled ? '0 20px' : '0 80px'};
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.bkg};
  color: ${COLORS.FONT_INVERSE};
  transition: height 0.4s, margin 0.4s;

  @media (max-width: ${TABLET_WIDTH}px) {
    padding: 0 10px;
  } 
`
