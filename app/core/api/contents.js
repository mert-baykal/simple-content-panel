const { writeStorage, deleteStorage, readStorage } = require("../storage")

const uniq = (repeat = 1) => {
  return Array.from({ length: repeat }).map(m => (Math.round(Math.random() * 9999)).toString(16)).join('-');
}
const createUniqId = () => {
  return uniq(2);
}

const createContent = (payload) => {
  payload.id = createUniqId();
  writeStorage(payload);
}

const deleteContent = (id) => {
  deleteStorage(id);
}

const contents = () => {
  return readStorage();
}

const readContent = (id) => {
  return contents()?.find(data => data.id == id);
}

export const Api = {
  createContent,
  deleteContent,
  contents,
  readContent
}