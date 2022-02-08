export function stringifyQuery(object) {
  if (!object) {
    return '';
  }

  const listObj = Object.keys(object);
  const createQueryVar = listObj.map((a) => {
    if (Array.isArray(object[a])) {
      const arrayToString = object[a].map((value) => `"${value}"`).toString();

      return `${a}=[${arrayToString}]`;
    }

    return object[a] ? `${a}=${object[a]}` : '';
  });

  return createQueryVar.filter(Boolean).join('&');
}
