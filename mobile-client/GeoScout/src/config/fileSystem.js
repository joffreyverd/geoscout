import { FileSystem } from 'expo';
//FileSystem.readDirectoryAsync(fileUri) //Lire un répertoire
//FileSystem.makeDirectoryAsync(fileUri, options) //créer un dossier
//FileSystem.writeAsStringAsync(fileUri, contents, options) //Ecrire un fichier
//FileSystem.readAsStringAsync(fileUri, options) //Lire un fichier
//FileSystem.deleteAsync(fileUri, options) //Supprimer un fichier ou un dossier
//FileSystem.documentDirectory + 'myDirectory/myFile' //Document directory
//FileSystem.getInfoAsync(fileUri, options) //information sur un fichier ou dossier

const rootDirectoryPath = FileSystem.documentDirectory + 'circuit';
const getCircuitsExist = async () => {
    try {
        const res = await FileSystem.getInfoAsync(rootDirectoryPath); //information sur un fichier ou dossier
        if (res.exist) {
            const nameCircuit = await FileSystem.readDirectoryAsync(
                rootDirectoryPath
            ); //Lire un répertoire

            let circuitInfo = '';
            if(nameCircuit){
                nameCircuit.map(uriFile => {
                    const infoCircuit = await FileSystem.readAsStringAsync(rootDirectoryPath+'/'+uriFile) //Lire un fichier
                    circuitInfo += infoCircuit.id_circuit;
                    circuitInfo += infoCircuit.name;
                    circuitInfo += infoCircuit.description;
                    circuitInfo += infoCircuit.time;
                    circuitInfo += infoCircuit.length;
                });
                return circuitInfo;
            }
        } else {
            FileSystem.makeDirectoryAsync(rootDirectoryPath); //créer un dossier
        }
    } catch (error) {
        console.log(error);
    }
};

const checkCircuitExist = async (fileUri) => {
    try {
        const res = FileSystem.getInfoAsync(rootDirectoryPath+'/'+fileUri) //info sur un fichier
        if(res.exist){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

const writeFile = async (fileUri, fileContent) => {
    try {
        FileSystem.writeAsStringAsync(rootDirectoryPath+'/'+fileUri, fileContent) //Ecrire un fichier
    } catch (error) {
        console.log(error);
    }
}

const readFile = async (fileUri) => {
    try {
        return FileSystem.readAsStringAsync(rootDirectoryPath+'/'+fileUri) //lire un fichier
    } catch (error) {
        console.log(error);
    }
}

const deleteFile = async (fileUri) => {
    try {
        FileSystem.deleteAsync(rootDirectoryPath+'/'+fileUri) //Supprimer un fichier
    } catch (error) {
        console.log(error);
    }
}

export default {
    getCircuitsExist,
    checkCircuitExist,
    writeFile,
    readFile,
    deleteFile
}
