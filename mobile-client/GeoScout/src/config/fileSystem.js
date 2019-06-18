import * as FileSystem from 'expo-file-system';

const rootDirectoryPath = FileSystem.documentDirectory + 'Circuit';

async function getCircuitsExist() {
    try {
        const res = await FileSystem.getInfoAsync(rootDirectoryPath);
        if (res.exists) {
            const nameCircuits = await FileSystem.readDirectoryAsync(
                rootDirectoryPath
            );
            if (nameCircuits.length > 0) {
                const circuitsJson = nameCircuits.map(async uriFile => {
                    const data = await this.readFile(
                        uriFile.replace('.json', '')
                    );
                    return data;
                });
                const result = await Promise.all(circuitsJson);
                return result;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

async function checkCircuitExist(fileUri) {
    try {
        const jsonInfo = await FileSystem.getInfoAsync(
            rootDirectoryPath + '/' + fileUri + '.json'
        );
        return jsonInfo.exists;
    } catch (error) {
        console.log('error try/catch fileSystem => checkCircuitExist');
        console.log(error);
    }
}

async function checkCircuitVersionUp(fileUri, version) {
    try {
        readFile(fileUri + '.json').then(data => {
            if (data.version < version) {
                console.log('circuit version supérieur');
                return true;
            } else {
                console.log('circuit version ok');
                return false;
            }
        });
    } catch (error) {
        console.log(error);
    }
}

async function writeFile(fileUri, fileContent) {
    try {
        const res = await FileSystem.getInfoAsync(rootDirectoryPath);
        if (res.exists) {
            FileSystem.writeAsStringAsync(
                rootDirectoryPath + '/' + fileUri + '.json',
                JSON.stringify(fileContent)
            );
        } else {
            await FileSystem.makeDirectoryAsync(rootDirectoryPath);
            FileSystem.writeAsStringAsync(
                rootDirectoryPath + '/' + fileUri + '.json',
                JSON.stringify(fileContent)
            );
        }
    } catch (error) {
        console.log(error);
    }
}

async function readFile(fileUri) {
    try {
        const jsonStringify = await FileSystem.readAsStringAsync(
            rootDirectoryPath + '/' + fileUri + '.json'
        );
        return JSON.parse(jsonStringify);
    } catch (error) {
        console.log(error);
    }
}

async function deleteFile(fileUri) {
    try {
        FileSystem.deleteAsync(rootDirectoryPath + '/' + fileUri);
    } catch (error) {
        console.log(error);
    }
}

async function deleteAllCircuits() {
    try {
        const nameCircuits = await FileSystem.readDirectoryAsync(
            rootDirectoryPath
        );
        if (nameCircuits) {
            nameCircuits.map(async nameCircuit => {
                FileSystem.deleteAsync(rootDirectoryPath + '/' + nameCircuit);
            });
        }
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
    deleteAllCircuits,
    readDirectory
};
