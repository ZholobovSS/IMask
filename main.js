const telInput = document.querySelector('[data-tel]')
const telephone = new IMask('+7 (xxx) xxx xx-xx', telInput, { x: '9', xType: 'Number' })
telephone.run()