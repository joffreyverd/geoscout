
## Organisation du code

Le code de l'application web est structuré en vues principales, appelant elles-mêmes des composantes impriqués les uns dans les autres.
L'objectif est ici de diminuer la duplication de code et d'utiliser un maxium de fois chaque composantes sur un maximum de vues.

Lorsqu'un jeu de données est récupéré avec pour objectif de les afficher à la suite les unes des autres, nous utilisons un pattern d'embrication des éléments les uns dans les autres.

Exemple : 
Le composant de commentaires contient -> un map qui itère sur tous les commentaires -> qui contient lui-même un un composant par commentaire.

Chacun de ses composants fait l'objet d'un fichier séparé.

## Normes de nommage

Avant toute chose, nous avons implémenté eslint, et les normes de nommage proposées par Airbnb. De ce fait, un certain nombre de contraintes sont appliquées lors de l'ajout de nouvelles fonctionnalités :
* Utilisation de camelCase
* Destructuration des objets avant leur appel
* Non-utilisation de classes si les states sont vides
* Utilisation de const ou let et non de var (portée des variables)
* Appel de variables d'environnement afin d'éviter le code écrit en dur
* Utilisation de bind, et non de constructeurs
* Utilisation d'arrow functions
* Indentation par bloc de 4 espaces
* Autres règles syntaxiques à respecter, qui sont automatiquement corrigées

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
