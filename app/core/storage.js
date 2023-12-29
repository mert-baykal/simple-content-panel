import { StorageKey } from "./config"

/**
 * 
 * @param {object} payload | Content List Array
 */
const appendStorage = (payload) => {
  window.localStorage.setItem(StorageKey, JSON.stringify(payload));
}

export const readStorage = () => {
  const content = window.localStorage.getItem(StorageKey);

  if (content) {
    return JSON.parse(content);
  }

  return [];
}

/**
 * 
 * @param {object} payload 
 * @param.id {number}
 * @param.name {string}
 * @param.description {string}
 */
export const writeStorage = (payload) => {
  const content = readStorage();
  content.push(payload);
  appendStorage(content);
}

/**
 * 
 * @param {number} id | Content Id
 */
export const deleteStorage = (id) => {
  const content = readStorage();
  const newContent = content.filter(f => f.id != id);

  appendStorage(newContent);
}