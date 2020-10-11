class IMask {
  constructor(mask, el, option = { x: 'x', xType: 'String' }) {
    this.mask = mask
    this.el = el
    this.x = option.x
    this.xType = option.xType
    this.setPlaceholder()
    this.getFirstStrPart()
  }

  getFirstStrPart() {
    this.firstStrPart = this.mask.substring(0, this.mask.indexOf('x'))
  }

  setPlaceholder() {
    this.el.placeholder = this.mask.replace(/x/g, this.x).toUpperCase()
  }

  run() {
    this.el.addEventListener('input', this.inputListener)
    this.el.addEventListener('focus', this.focusListener)
    this.el.addEventListener('blur', this.blurListener)
  }

  stop() {
    this.el.removeEventListener('input', this.inputListener)
    this.el.removeEventListener('focus', this.focusListener)
    this.el.removeEventListener('blur', this.blurListener)
  }

  inputListener = (e) => {
    let prevValue = e.target.value
    let newValue = ''
    if (prevValue.length <= this.mask.length) {
      let j = 0
      for (let i = 0; i < this.mask.length; i += 1) {
        if (!prevValue[j]) break
        else if (prevValue[j] && this.mask[i] === prevValue[j]) {
          newValue += prevValue[j]
          j += 1
        } else if (prevValue[j] && this.mask[i] !== 'x') {
          newValue += this.mask[i]
        } else if (prevValue[j] && this.mask[i] === 'x') {
          if (this.xType.toLowerCase() === 'number') {
            if (/\d/.test(prevValue[j])) {
              newValue += prevValue[j]
              j += 1
            } else {
              break
            }
          } else if (this.xType.toLowerCase() === 'string') {
            if (/[A-zА-я]/.test(prevValue[j])) {
              newValue += prevValue[j]
              j += 1
            } else {
              break
            }
          } else {
            break
          }

        }
      }
    } else {
      newValue = prevValue.substring(0, this.mask.length)
    }
    e.target.value = newValue
  }

  focusListener = (e) => {
    if (!this.el.value.length) {
      this.el.value = this.firstStrPart
    }
    setTimeout(() => {
      this.el.selectionStart = this.el.selectionEnd = this.el.value.length
    })
  }

  blurListener = (e) => {
    if (this.el.value === this.firstStrPart) {
      this.el.value = ''
    }
  }
}
