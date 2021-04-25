import React from 'react'
import { RouterProvider } from 'react-router5'
import styled from 'styled-components'

import { COLORS, DESIGN, SCROLL_ROOT_ID, TABLET_WIDTH } from './constants'
import { router } from './utils/routes'
import { Router } from './components/Router'
import { Navbar } from './components/navigation/Navbar'

export default () => (
  <RouterProvider router={router}>
    <PageWrapper id={SCROLL_ROOT_ID}>
      <Navbar />
      <PageContent>
        <Router />
      </PageContent>
    </PageWrapper>
  </RouterProvider>
)

const PageContent = styled.main`
  flex-grow: 1;
  margin: ${DESIGN.NAVBAR_HEIGHT + 10}px 80px 20px 80px;
  transition: margin 0.4s;
  
  @media (max-width: ${TABLET_WIDTH}px) {
    margin: 20px 10px;
  } 
`

const PageWrapper = styled.section`
  background-color: ${COLORS.BACKGROUND};
  color: ${COLORS.FONT};
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  
  > * ::-webkit-scrollbar, ::-webkit-scrollbar {
    appearance: none;
    width: 4px;
    height: 4px;
  }
`
