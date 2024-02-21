const formatearDinero = ( valor ) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format( valor );
}

const formatoNombre = ( nombre ) => {
  const nombreDisplay = nombre.split(' ')[0] + ' ' + nombre.split(' ')[1];
  return nombreDisplay;
};

const nombreIniciales = ( nombre ) => {
  const nombreDisplay = nombre.split(' ')[0].charAt(0) + nombre.split(' ')[1].charAt(0);
  return nombreDisplay;
};

const classNames = ( ...classes ) => {
  return classes.filter(Boolean).join(' ')
}

const currentNavItem = (item, pathname) => {
  return item.href === '/' + pathname.split('/')[1];
}

export {
  formatearDinero,
  formatoNombre,
  nombreIniciales,
  classNames,
  currentNavItem
}