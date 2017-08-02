/**
 * Merges passed themes by concatenating string keys and processing nested themes
 *
 * @param {...TReactCSSThemrTheme} themes - Themes
 * @returns {TReactCSSThemrTheme} - Resulting theme
 */
export function themeable (...themes) {
  return themes.reduce((acc, theme) => merge(acc, theme), {})
}

/**
 * @param {TReactCSSThemrTheme} [original] - Original theme
 * @param {TReactCSSThemrTheme} [mixin] - Mixin theme
 * @returns {TReactCSSThemrTheme} - resulting theme
 */
function merge (original = {}, mixin = {}) {
  // make a copy to avoid mutations of nested objects
  // also strip all functions injected by isomorphic-style-loader
  const result = Object.keys(original).reduce((acc, key) => {
    const value = original[key]
    if (typeof value !== 'function') {
      acc[key] = value
    }
    return acc
  }, {})

  // traverse mixin keys and merge them to resulting theme
  Object.keys(mixin).forEach(key => {
    // there's no need to set any defaults here
    const originalValue = result[key]
    const mixinValue = mixin[key]

    switch (typeof mixinValue) {
      case 'object': {
        // possibly nested theme object
        switch (typeof originalValue) {
          case 'object': {
            // exactly nested theme object - go recursive
            result[key] = merge(originalValue, mixinValue)
            break
          }

          case 'undefined': {
            // original does not contain this nested key - just take it as is
            result[key] = mixinValue
            break
          }

          default: {
            // can't merge an object with a non-object
            throw new Error(`You are merging object ${key} with a non-object ${originalValue}`)
          }
        }
        break
      }

      case 'undefined': // fallthrough - handles accidentally unset values which may come from props
      case 'function': {
        // this handles issue when isomorphic-style-loader addes helper functions to css-module
        break // just skip
      }

      default: {
        // plain values
        switch (typeof originalValue) {
          case 'object': {
            // can't merge a non-object with an object
            throw new Error(`You are merging non-object ${mixinValue} with an object ${key}`)
          }

          case 'undefined': {
            // mixin key is new to original theme - take it as is
            result[key] = mixinValue
            break
          }
          case 'function': {
            // this handles issue when isomorphic-style-loader addes helper functions to css-module
            break // just skip
          }

          default: {
            // finally we can merge
            result[key] = originalValue.split(' ')
              .concat(mixinValue.split(' '))
              .filter((item, pos, self) => self.indexOf(item) === pos && item !== '')
              .join(' ')
            break
          }
        }
        break
      }
    }
  })

  return result
}
