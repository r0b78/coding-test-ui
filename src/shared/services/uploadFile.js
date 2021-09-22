import firebase from 'firebase';
const storage = firebase.storage();

export const uploadFile = async (uniqueIdentifier, file) => {
  try {
    const fileRef = storage.ref(uniqueIdentifier + '/' + file.name);
    console.log(fileRef);
    await fileRef.put(file);
    return fileRef.getDownloadURL();
  } catch (error) {
    console.error(error);
  }
  return null;
};
