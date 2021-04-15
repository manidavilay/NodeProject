# [03/2021] Boilerplate : NodeJS/ExpressJS API/backoffice

Ce répertoire à été réalisé dans le cadre d'une formation aux techniques spécifiques à la mise en place d'une API RestFull en NodeJS. Ce projet est connecté à une base de données MongoDB, vous devez vous assurer qu'une instance soit accessible dans votre environnement de travail.

## Utilisation de ce répertoire

### Installation des modules

Le projet développé dans ce répertoire utilise différents modules que vous devez au préalable installer en tapant la commande suivante à la racine du répertoire : 

```bash
npm i
```

> Cette commande téléchargera le dossier `node_modules` contenant les modules nécessaires.

Le fichier `package.json` à été modifier au niveau de la fonction `start` pour faire en sorte de relancer le serveur NodeJS à chaque modification. Pour ce faire, nous utilisons le module **Nodemone** que nous n'installons pas en tant que dépendance du projet mais globalement dans notre environnement : 

```bash
sudo npm i -g nodemon
```

> L'option `sudo` est nécessaire sous Linux pour s'identifier.

### Définition des variable d'environnement

Une des notions importantes à aborder dans la gestion d'une application serveur est la protection des information qui y transite. Certaine de ces informations, comme le port serveur par exemple, ne doivent par être directement inscrites dans les fichiers, il faut les protéger en les écrivant dans une fichier `.env` qui sera charger dans l'application NodeJS grâce au module Dotenv. Le fichier `.env` ne doit jamais être "#commit#" sur un répertoire distant, vous devez donc le créer dans votre répertoire en suivant le modèle défini sans le fichier `.env.dist` : 

```bash
# Serveur
PORT=
MONGO_URL=
BCRYPT=

# COOKIE
COOKIE_SECRET=
COOKIE_NAME=

# JWT
JWT_SECRET=
```

## Présentation du Boilerplate

En informatique un "Boilerplate" est un code de départ qui permet d'initier un projet qui contient des fonctionnalités basiques. Dans le cadre de notre projet d'API, ce répertoire intègre différentes fonctionnalités de gestion de l'information et de des routes qui permettent de mettre en place rapidement une API pour pouvoir ce concentrer sur des fonctionnalités spécifiques.

**Liste de fonctionnalités développées**

- [x] Gestion des CORS
- [x] Gestion des informations en MongoDB
- [x] Gestion des routers, des controllers et des models
- [x] Gestion d'un CRUD paramétrable
- [x] Système d'authentification
- [x] Vérification des requêtes
- [x] Protection des routes avec PassportJS
- [x] Gestion d'un backoffice


**Liste de fonctionnalités a développer**

- [] Protéger les information utilisateur-trice avec CryptoJS# NodeProject
