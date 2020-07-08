export const trace =
    process.env.NODE_ENV !== 'production' ? (...args) => console.log('[src/index]', ...args) : () => {};
