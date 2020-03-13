@extends('layout')

@section('content')
<main name="content" role="main">
    <div class="section">
        <div class="container">
            <div class="row main-title">
                <h1 class="heading-1">Documentation</h1>
            </div>
                <p>
                    Pour créer un type de contenu, rien de plus simple ! Dirigez vous vers les pages de création :
                    Tableau, Menu ou Formulaire, et commencez l’édition.
                </p>
                <h2 class="heading-2">
                    Comment personnaliser un contenu ?
                </h2>
                <p>
                    Il vous est possible de modifier le titre de votre élément en cliquant sur le bandeau de gauche:
                    cliquez en haut du bandeau, à côté du crayon et le tour est joué.
                </p>
                <p>
                    Pour éditer votre contenu, il vous suffit de déplier les différents onglets du bandeau, comme
                    Insérer, Modifier, Tableau ou encore style. Vous pouvez ensuite personnaliser votre création à votre
                    guise. N’oubliez pas de valider votre changement pour qu’il soit pris en compte et pouvoir le
                    visualiser en temps réel.
                </p>
                <h2 class="heading-2">
                    Pourquoi créer un compte ?
                </h2>
                <p>
                    Une fois votre contenu créé, il vous est proposé deux choix : l’exporter, et/ou le sauvegarder.
                    La fonctionnalité de sauvegarde vous permettra de pouvoir stocker votre contenu après avoir créé
                    votre compte, de le réutiliser et de le modifier simplement grâce à l’interface de tableau de bord.
                    Sans compte, vous ne pourrez seulement que l’exporter, et une fois fait, vous ne pourrez plus
                    retrouver ce que vous venez de générer.
                </p>
                <p>
                    En plus de la fonctionnalité de sauvegarde qui est ajoutée, une toute autre interface vous est
                    proposé. En cliquant sur le petit “+” à côté du nom “Tableau de bord”, vous pouvez créer un contenu
                    rapidement. Pour pouvoir choisir entre un contenu vierge ou un modèle (seulement disponible une fois
                    connecté), il vous suffit de vous diriger vers la page “Nouveau” qui se situe dans le menu latéral
                    gauche.
                </p>
                <p>
                    Une fois votre compte créé, vous pouvez vous déconnecter à tout moment en appuyant sur votre nom en
                    haut à gauche, et en choisissant de vous déconnecter.
                    Pour modifiez les informations du compte telles que votre nom ou votre adresse email, vous pouvez
                    aller directement dans les paramètres.
                </p>
                <h2 class="heading-2">
                    Comment utiliser le contenu que j’ai créé ?
                </h2>
                <p>
                    Pour pouvoir utiliser l’application Jamgati pleinement, la dernière étape consiste en l’export de
                    votre contenu. Il vous suffit de cliquer sur le bouton Exporter.
                    Vous pouvez ensuite choisir le format de contenu que vous souhaitez, le copier dans votre
                    presse-papier ou bien télécharger un fichier qui contient le code de ce que vous avez créé.
                </p>
                <h2 class="heading-2">
                    Quels sont les différents types de contenus?
                </h2>
                <h3 class="heading-3">
                    Tableau
                </h3>
                <p>
                    Générez votre tableau HTML simplement en le personnalisant totalement ! Cliquez sur une cellule pour
                    y entrer votre texte, ainsi que pour le modifier.
                    Vous pouvez changer la taille de votre tableau dynamiquement, en allant choisir un nombre de
                    colonnes et de lignes. Ensuite, personnalisez votre tableau par rapport à la cellule sélectionnée en
                    ajoutant, supprimant et fusionnant des lignes, colonnes ou cellules.
                </p>
                <p>
                    Pour chaque changement que vous souhaitez réaliser, il vous suffit de sélectionner une cellule pour
                    la customiser.
                </p>
                <p>
                    Il vous est aussi possible, pour les tableaux par exemple, de styliser le contenu textuel, par
                    exemple pour changer la police d’écriture ou encore l’alignement. Une fois vos choix de style
                    décidés, vous pouvez choisir à quel endroit vous souhaitez l’appliquer grâce au bouton qui suit les
                    paramètres.
                </p>
                <h3 class="heading-3">
                    Formulaire
                </h3>
                <p>
                    Pour créer un formulaire, rien de plus rapide : sélectionnez votre type de champ (texte, bouton,
                    date, etc..), choisissez un nom de champ (qui sera affiché sur votre formulaire), remplissez les
                    différentes informations propres à votre champ, et enfin définissez la position de votre champ.
                </p>
                <p>
                    La position de votre champ définit où est sa place dans votre futur formulaire : le mettre en
                    position 1 le fera apparaître en première position, soit tout en haut, en position 2 le fera
                    apparaître en seconde position, et ainsi de suite.
                </p>
                <p>
                    N’oubliez pas de valider votre champ en appuyant sur le bouton “Ajouter au formulaire”.
                </p>
                <h3 class="heading-3">
                    Menu
                </h3>
                <p>
                    Créer un menu fonctionne de la même manière que la création de formulaire : ajoutez vos liens un par
                    un en choisissant le titre du lien ainsi que l’URL vers laquelle vous souhaitez rediriger votre
                    lien.
                </p>
                <p>
                    Une fois votre premier lien créé, vous pouvez décider, pour le lien suivant, de le définir comme
                    parent ou non. Grâce à ce choix, vous avez la possibilité de créer des menus à sous menu.
                    Pour modifier un lien déjà créé, dirigez vous vers l’onglet Modifier et choisissez le lien que vous
                    souhaitez modifier.
                </p>
                <p>
                    Pour changer le style du menu, nous vous permettons de choisir sur quel niveau vous voulez
                    intervenir : le niveau 1 (parents de liens ou non) ou le niveau 2 (enfants de liens).
                </p>
            </div>
        </div>
    </div>
</main>
@endsection
