/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import { sizeScale } from '@/Common/Scale'

/**
 * Colors
 */
export const Colors = {
  background: 'rgb(242, 242, 242)',
  white: '#ffffff',
  black: '#000000',
  text: '#212529',
  primary: '#123B7B',
  success: '#28a745',
  error: '#dc3545',
  disable: '#D0D4E0',
  placeHolder: '#BABDC2',
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
}

export const NavigationColors = {
  primary: Colors.primary,
}

/**
 * FontSize
 */
export const FontSize = {
  small: sizeScale(12),
  regular: sizeScale(14),
  large: sizeScale(18),
}

/**
 * Metrics Sizes
 */
const tiny = 5 // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
}

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
}
