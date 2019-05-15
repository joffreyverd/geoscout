// import { FileSystem } from 'expo';

// var path = RNFS.DocumentDirectoryPath + '/circuitsDownload';

// const readDir = async () => {
//     RNFS.readDir(path).then(files => {
//         return files;
//     }).catch(() => {
//         return false;
//     });
// };

// const readFile = (refCircuit) => {
//     RNFS.readFile(path+'/'+refCircuit, 'utf8').then(files => {
//         return files;
//     }).catch(() => {
//         return false;
//     });
// };

// const writeFile = (refCircuit, contentFile) => {
//     RNFS.writeFile(path+'/'+refCircuit, contentFile, 'utf8').then(() => {
//         return true;
//     }).catch(() => {
//         return false;
//     });
// };

// const deleteFile = (refCircuit) => {
//     RNFS.unlink(path+'/'+refCircuit).then(() => {
//         return true;
//     }).catch(() => {
//         return false;
//     });
// }
// export default {
//     readDir,
//     readFile,
//     writeFile,
//     deleteFile
// };