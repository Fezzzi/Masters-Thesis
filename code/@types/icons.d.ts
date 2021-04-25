declare module '~/assets/svg/*.svg' {
  import React = require('react')

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>

  const src: string
  export default src
}
