# Information générale

## Couleur principale de l'application:

Utilisation de https://flatuicolors.com/palette/defo.

### Thème

-   ![#1abc9c](https://placehold.it/15/1abc9c/000000?text=+) `#1abc9c`
-   ![#16a085](https://placehold.it/15/16a085/000000?text=+) `#16a085`
-   ![#2c3e50](https://placehold.it/15/2c3e50/000000?text=+) `#2c3e50`
-   ![#fff](https://placehold.it/15/fff/000000?text=+) `#fff`

### Autres

_Etoiles :_

-   ![#ffae23](https://placehold.it/15/ffae23/000000?text=+) `#ffae23`

_Difficultés :_

-   Facile ![#4CAF50](https://placehold.it/15/4CAF50/000000?text=+) `#4CAF50`
-   Medium ![#2196F3](https://placehold.it/15/2196F3/000000?text=+) `#2196F3`
-   Difficile ![#F44336](https://placehold.it/15/F44336/000000?text=+) `#F44336`

# Documentation concernant le développement

## Modèle de fichier

### assets
Dossier qui comprend l'icône de l'application et l'image de lancement.

### src
Dossier qui comprend le code source de l'application.

Components : dossier qui comprend les components principaux de l'application.

Config : dossier qui comprend les fonctions sur le Token pour identification, fileSystem (fonction qui permette d'écrire dans le téléphone), les méthodes pour faire les requêtes API et le fichier router qui définit les routes de l'application.

Screens : dossier qui comprend toutes les pages de l'application.

### utils
Dossier qui comprend les choses qui sont publiques et utiles dans le cadre de l'application.

style : comprend le style de la map Google.
img : comprend les logos GéoScout et l'image user par défaut.

### app.json
Fichier qui définit les permissions sur l'application, la couleur par défaut, les chemins icône et splash, les plateformes supportées... 


## Components principales:

### ListCircuit
Permets de lister tous les circuits via le component Callout qui lui définie un circuit avec ses informations.

### ListComment
Permets de lister tous les commentaires de circuit via le component Comment qui renvoie un avatar, commentaires, notes...

### Carousel
Liste les images selon un array de lien d'image (les images sont récupérées sur le serveur).

### Compass
Reçois la localisation de l'utilisateur, du point de l'étape et la direction de l'utilisateur et transforme ces coordonnées en une direction qui pointe vers le point.

### PlayMenu
Comprend les fonctionnalités pour abondonner un circuit et le mettre en pause.

### NavigationDrawer
Comprend les routes pour naviguer sur les screens circuit en cours, télécharger, mes circuits, profil...

### Rate
Prend une note et renvoie une liste d'étoiles qui correspond à la note du circuit.

# Documentation concernant le déploiement de l'application
Nous utilisons Expo qui est une surcouche react native pour pouvoir déployer vite sur IOS et ANDROID. Expo nécessite d'installer Node et d'installer Expo sur mobile via le PlayStore et pc via la commande : 'npm install -g expo-cli'.

Une fois Expo installée, il vous suffit de rentrer la commande 'npm start' pour lancer Expo et 'npm build' pour construire l'apk. Attention, il faut avoir un compte Expo pour pouvoir construire l'application.

Pour la commande 'npm start', vous accédez à 3 modes de fonctionnement, 'LOCAL' qui permet de build l'application via un câble USB.
'TUNNEL' qui permet de scanner le QR CODE sur l'application Expo et de pouvoir lancer l'application mobile.

