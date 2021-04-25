import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'

import { COLORS } from 'webSrc/constants'

interface PageSwitchProps {
  colors: { primary: string; secondary: string }
  icon: ReactElement
  label: string
  onSwitchClick: () => void
}

export const PageSwitch = ({ colors, icon, label, onSwitchClick }: PageSwitchProps) => {
  const [switchHovered, setSwitchHovered] = useState<boolean>(false)

  return (
    <PageSwitchBox
      onClick={onSwitchClick}
      onMouseEnter={() => setSwitchHovered(true)}
      onMouseLeave={() => setSwitchHovered(false)}
    >
      <PageSwitchText hovered={switchHovered} bkg={colors.secondary}>
        {label}
      </PageSwitchText>

      <PageSwitchIcon bkg={colors.primary}>
        {icon}
      </PageSwitchIcon>
    </PageSwitchBox>
  )
}

const PageSwitchBox = styled.div`
  position: fixed;
  z-index: 15;
  top: 25%;
  right: 0;
  height: 60px;
  width: 65px;
  opacity: 0.8;
  transition: width 0.5s;

  :hover {
    width: 260px;
    opacity: 1;
    cursor: pointer;
  }
`

const PageSwitchText = styled.div<{ hovered: boolean; bkg: string }>`
  position: absolute;
  z-index: -1;
  left: 30px;
  top: 25%;
  width: 0;
  padding-left: 38px;
  font-size: 24px;
  text-transform: uppercase;
  line-height: 60px;
  opacity: 0;
  height: 50%;
  overflow: visible;
  background-color: ${props => props.bkg};
  color: transparent;
  transition: top 0.5s, height 0.5s, width 0.5s, opacity 0.5s, color 0.2s ${props => props.hovered ? 0.3 : 0}s;
  user-select: none;
  
  :after {
    content: '';
    position: absolute;
    right: -15px;
    top: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 15px solid ${props => props.bkg};
    transition: border-width 0.5s, right 0.5s
  }
  
  ${props => props.hovered && `
    top: 0;
    height: 100%;
    width: 158px;
    opacity: 1;
    color: ${COLORS.FONT_INVERSE};
    
    :after {
      right: -30px;
      border-top: 30px solid transparent;
      border-bottom: 30px solid transparent;
      border-left: 30px solid ${props.bkg};
    }
  `}
`

const PageSwitchIcon = styled.div<{ bkg: string }>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 60px;
  border-radius: 50%;
  background-color: ${props => props.bkg};
  color: ${COLORS.FONT_INVERSE};
  
  > svg {
    width: 70%;
    height: 70%;
    border-radius: 25%;
    
    & > * {
      fill: ${COLORS.FONT_INVERSE};
      stroke: ${COLORS.FONT_INVERSE};
    }
  }
`
