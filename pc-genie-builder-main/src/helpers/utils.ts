export const getItemFromLocalStorage = (id: string) => {
  const item = localStorage.getItem(id);
  return item ? JSON.parse(item) : null;
};

export const setItemToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeItemFromLocalstorage = (name: string) => {
  localStorage.removeItem(name);
};

export const joinClass = (...classNames: any) => classNames.join(" ");
