import { FileSystem } from 'expo';
//FileSystem.readDirectoryAsync(fileUri) //Lire un répertoire
//FileSystem.makeDirectoryAsync(fileUri, options) //créer un dossier
//FileSystem.writeAsStringAsync(fileUri, contents, options) //Ecrire un fichier
//FileSystem.readAsStringAsync(fileUri, options) //Lire un fichier
//FileSystem.deleteAsync(fileUri, options) //Supprimer un fichier ou un dossier
//FileSystem.documentDirectory + 'myDirectory/myFile' //Document directory
//FileSystem.getInfoAsync(fileUri, options) //information sur un fichier ou dossier

const rootDirectoryPath = FileSystem.documentDirectory + 'Circuit';

async function getCircuitsExist() {
    try {
        const res = await FileSystem.getInfoAsync(rootDirectoryPath); //Information sur le dossier Circuit
        if (res.exists) {
            const nameCircuits = await FileSystem.readDirectoryAsync(
                rootDirectoryPath
            ); //Lire un répertoire
            console.log('[fileSystem] Nom des circuits');
            console.log(nameCircuits);

            let circuitsJSON = '';
            if (nameCircuits) {
                nameCircuits.map(async uriFile => {
                    const infoCircuitJSON = await readFile(uriFile + '.txt');
                    console.log('info circuit parse');
                    console.log(infoCircuitJSON);
                    circuitsJSON +=
                        '{"id_circuit": "' +
                        infoCircuitJSON.id_circuit +
                        '","name": "' +
                        infoCircuitJSON.name +
                        '","description": "' +
                        infoCircuitJSON.description +
                        '","duration": "' +
                        infoCircuitJSON.duration +
                        '","length": "' +
                        infoCircuitJSON.length +
                        '"},';
                });
                console.log('[fileSystem] circuit en json');
                console.log(circuitsJSON);
                return JSON.parse(
                    circuitsJSON.substr(0, circuitsJSON.length - 1)
                );
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function checkCircuitExist(fileUri) {
    try {
        const res = await FileSystem.getInfoAsync(
            rootDirectoryPath + '/' + fileUri + '.txt'
        ); //info sur un fichier
        return res.exists;
    } catch (error) {
        console.log(error);
    }
}

async function checkCircuitVersionUp(fileUri, version) {
    try {
        const contentFileExist = await readFile(fileUri + '.txt');
        if (contentFileExist.version < version) {
            console.log('circuit version supérieur');
            return true;
        } else {
            console.log('circuit version ok');
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

async function writeFile(fileUri, fileContent) {
    try {
        FileSystem.writeAsStringAsync(
            rootDirectoryPath + '/' + fileUri + '.txt',
            JSON.stringify(fileContent)
        ); //Ecrire un fichier
    } catch (error) {
        console.log(error);
    }
}

async function readFile(fileUri) {
    try {
        return JSON.parse(
            FileSystem.readAsStringAsync(
                rootDirectoryPath + '/' + fileUri + '.txt'
            )
        ); //lire un fichier
    } catch (error) {
        console.log(error);
    }
}

async function deleteFile(fileUri) {
    try {
        FileSystem.deleteAsync(rootDirectoryPath + '/' + fileUri + '.txt'); //Supprimer un fichier
    } catch (error) {
        console.log(error);
    }
}

async function readDirectory() {
    try {
        return FileSystem.readDirectoryAsync(rootDirectoryPath);
    } catch (error) {
        console.log(error);
    }
}

export default {
    getCircuitsExist,
    checkCircuitExist,
    checkCircuitVersionUp,
    writeFile,
    readFile,
    deleteFile,
    readDirectory
};
