import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await initdb("jate", 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.put({ id: 1, value: content });
  await tx.done;
  console.log("Saved to the database 👍");
}
 

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("Get from the database");
  const db = await initdb("jate", 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const content = await store.get(1);
  await tx.done;
  console.log("Got from the database 👍");
  return content;
}

initdb();
