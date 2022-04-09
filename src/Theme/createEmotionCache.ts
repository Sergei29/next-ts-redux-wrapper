import createCache from '@emotion/cache'

/**
 * @description prepend: true moves MUI styles to the top of the <head> so they're loaded first. It allows developers to easily override MUI styles with other styling solutions, like CSS modules
 * @returns {object} emotion cache
 */
export const createEmotionCache = () => createCache({ key: 'css', prepend: true })