import { FileSystem } from 'expo';
//FileSystem.readDirectoryAsync(fileUri) //Lire un répertoire
//FileSystem.makeDirectoryAsync(fileUri, options) //créer un dossier
//FileSystem.writeAsStringAsync(fileUri, contents, options) //Ecrire un fichier
//FileSystem.readAsStringAsync(fileUri, options) //Lire un fichier
//FileSystem.deleteAsync(fileUri, options) //Supprimer un fichier ou un dossier
//FileSystem.documentDirectory + 'myDirectory/myFile' //Document directory
//FileSystem.getInfoAsync(fileUri, options) //information sur un fichier ou dossier

const rootDirectoryPath = FileSystem.documentDirectory + 'Circuit';

const getCircuitsExist = async () => {
    try {
        const res = await FileSystem.getInfoAsync(rootDirectoryPath); //Information sur le dossier Circuit
        if (res.exists) {
            const nameCircuits = await FileSystem.readDirectoryAsync(
                rootDirectoryPath
            ); //Lire un répertoire

            let circuitsJSON = '';
            if (nameCircuits) {
                nameCircuits.map(async uriFile => {
                    const infoCircuit = await FileSystem.readAsStringAsync(
                        rootDirectoryPath + '/' + uriFile + '.txt'
                    );
                    infoCircuitJSON = JSON.parse(infoCircuit);
                    console.log(infoCircuitJSON);
                    circuitsJSON +=
                        '{"id_circuit":"' +
                        infoCircuitJSON.id_circuit +
                        '","name":"' +
                        infoCircuitJSON.name +
                        '","description":"' +
                        infoCircuitJSON.description +
                        '","duration":"' +
                        infoCircuitJSON.duration +
                        '","length":"' +
                        infoCircuitJSON.length +
                        '"}';
                });
                circuitsJSON += '';
                console.log(circuitsJSON);
                return JSON.parse(circuitsJSON);
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const checkCircuitExist = async fileUri => {
    try {
        const res = await FileSystem.getInfoAsync(
            rootDirectoryPath + '/' + fileUri + '.txt'
        ); //info sur un fichier
        return res.exists;
    } catch (error) {
        console.log(error);
    }
};

const checkCircuitVersionUp = async (fileUri, version) => {
    try {
        const contentFileExist = await readFile(fileUri + '.txt');
        const contentFileExistJSON = JSON.parse(contentFileExist);
        if (contentFileExistJSON.version < version) {
            console.log('circuit version supérieur');
            return true;
        } else {
            console.log('circuit version ok');
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

const writeFile = async (fileUri, fileContent) => {
    try {
        FileSystem.writeAsStringAsync(
            rootDirectoryPath + '/' + fileUri + '.txt',
            JSON.stringify(fileContent)
        ); //Ecrire un fichier
    } catch (error) {
        console.log(error);
    }
};

const readFile = async fileUri => {
    try {
        return FileSystem.readAsStringAsync(
            rootDirectoryPath + '/' + fileUri + '.txt'
        ); //lire un fichier
    } catch (error) {
        console.log(error);
    }
};

const deleteFile = async fileUri => {
    try {
        FileSystem.deleteAsync(rootDirectoryPath + '/' + fileUri + '.txt'); //Supprimer un fichier
    } catch (error) {
        console.log(error);
    }
};

const readDirectory = async () => {
    try {
        FileSystem.readDirectoryAsync(rootDirectoryPath);
    } catch (error) {
        console.log(error);
    }
};

export default {
    getCircuitsExist,
    checkCircuitExist,
    checkCircuitVersionUp,
    writeFile,
    readFile,
    deleteFile,
    readDirectory
};
