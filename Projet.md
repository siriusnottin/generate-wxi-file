# Projet

## Contexte

Nous avons besoin de générer un fichier WXI (Wix Toolset v3) à partir d'un fichier YAML. Le but poursuivi est de permettre de construire des setups de manière modulaire (en incluant des modules durant la création de l'exécutable).

## Informations

Le fichier YAML, d'entrée, a la tête suivante :

``` yaml
- target: europe
  modules:
    - name: authentication
  setups:
    - name: full
      modules:
        - name: client
          type: feature
    - name: demo
      modules:
        - name: client
          type: feature
        - name: seq
          type: logging
          
- target: asia
  setups:
    - name: full
      modules:
        - name: client
          type: feature

```

Ce fichier représente les différents "setup" que nous voulons générer dans une pipeline de déploiement continu.

Nous avons plusieurs "target", qui correspondent aux différentes régions où nous allons déployer l'applicatif. 

Une "target" est composé d'un nom, d'une liste de "setups" et de modules "globaux". Les modules globaux sont insérés automatiquement dans chaque setup défini dans la target (dans notre exemple, le setup full contiendra l'authentification et la feature demo). 

Un setup possède un nom et une liste de modules spécialisés. Les modules spécialisés sont les modules spécifiques que nous voulons inclure dans le module (dans notre exemple, la feature client)

Parmi les règles que nous souhaitons valider, nous devons nous assurer qu'au moins une feature est présente dans chaque setup avant de générer un fichier wxi.

Une fois ces infos récupérées et validées, il faudra générer les fichier XML suivant :

``` xml
<?xml version="1.0" encoding="utf-8"?>
<Include>
    <?include Features\client.wxi?>
    <?include Modules\module.authentication.wxi?>
</Include>
```

Ce fichier est nommé europe.full.generated.wxi. Il correspond donc à la target "europe" et au setup "full" de notre fichier YAML.

Nous devons avoir un fichier par setup présent dans le fichier. Dans notre exemple, il y aura donc 3 fichiers : europe.full.generated.wxi, europe.demo.generated.wxi et asia.full.generated.wxi.

Pour générer ces 3 fichiers, nous souhaitons utiliser/exécuter une commande et donc créer un CLI.

Exemple : Celle-ci pourrait être lancée avec la commande suivante :

```
node index.js --target europe --setup full
```