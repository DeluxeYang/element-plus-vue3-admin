const svgList = import.meta.glob('./svg/*.svg')

const re = /\.\/svg\/(.*)\.svg/

const icons = Object.keys(svgList).map(i => {
  // @ts-ignore
  return i.match(re)[1]
})

export default icons
