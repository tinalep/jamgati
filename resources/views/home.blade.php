@extends('layout')

@section('content')
<main name="content" role="main">
    <div class="section header-home">
        <div class="container">
            <div class="row main-title">
                <h1 class="heading-1">Editer simplement</h1>
                <p>Jamgati est un générateur de lignes de codes en ligne qui vous permettra de créer simplement et
                    rapidement différentes sortes de fonctionnalités accessibles à votre site web</p>
            </div>
            <div class="row highlight-navigation">
                <div class="col-md-4">
                    <h2 class="heading-4">Tableau</h2>
                    <p>Il est souvent utile de présenter ses idées sous forme de tableaux. Profitez de notre système de
                        création de tableaux pour publier vos idées de façon plus structurée.</p>
                    <a href="#">Commencer</a>
                </div>
                <div class="col-md-4">
                    <h2 class="heading-4">Formulaire</h2>
                    <p>Il est souvent utile de présenter ses idées sous forme de tableaux. Profitez de notre système de
                        création de tableaux pour publier vos idées de façon plus structurée.</p>
                    <a href="#">Commencer</a>
                </div>
                <div class="col-md-4">
                    <h2 class="heading-4">Menu</h2>
                    <p>Il est souvent utile de présenter ses idées sous forme de tableaux. Profitez de notre système de
                        création de tableaux pour publier vos idées de façon plus structurée.</p>
                    <a href="">Commencer</a>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="container">
            <div class="row">
                <h2 class="heading-2 heading-2--center"><span>Comment ça marche</span>Les 3 étapes</h2>
            </div>
            <div class="row steps-home">
                <div class="col-md-4 d-flex justify-content-around step">
                    <p class="number">1</p>
                    <p class="w-75"><strong>Choisissez le type de contenu</strong> que vous souhaitez éditer</p>
                </div>
                <div class="col-md-4 d-flex justify-content-around step">
                    <p class="number">2</p>
                    <p class="w-75"><strong>Ajoutez vos données</strong> à l’aide de l’éditeur</p>
                </div>
                <div class="col-md-4 d-flex justify-content-around step">
                    <p class="number">3</p>
                    <p class="w-75"><strong>Exportez</strong> votre fichier pour obtenir le code HTML/CSS</p>
                </div>
            </div>

            <div class="video">
                <img class="d-block m-auto" src="{{asset("assets/images/img-video.png")}}" loading="lazy" alt="video">
            </div>
    
    </div>
    
    <div class="section advantages">
        <div class="container">
            <div class="row">
                <h2 class="heading-2 heading-2--center"><span>L'avantage</span>Allez plus vite !</h2>
            </div>
            <div class="row">
                <div class="col-12 advantage">
                    <div class="d-flex align-items-center">
                        <div class="illustration w-lg-50">
                            <img src="assets/images/img-upload.png" loading="lazy" alt="Importez vos fichiers" longdesc="#introductionIMG">
                        </div>
                        <div class="w-lg-50 offset-lg-1">
                            <div class="content">
                                <h3>Importez vos fichiers</h3>
                                <p id="introductionIMG">
                                    L’application Jamgati vous permet de créer l’élément que vous souhaitez à partir d’un fichier existant. Que ce soit à partir d’un fichier texte pour la création d’un tableau ou encore suite à un fichier de type Json, Jamgati vous offre un large panel de choix de conception. Cette fonctionnalité n’est néanmoins disponible qu’après vous être inscrit et identifié.                                
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="col-12 advantage">
                        <div class="d-flex align-items-center">
                            <div class="w-lg-50">
                                <div class="content">
                                    <h3>Utiliser un modèle</h3>
                                    <p id="modelIMG">
                                        Vous manquez d’inspiration ou vous ne savez pas comment mettre en forme vos données ? Connectez vous et un certain nombre de modèles de base vous seront présentés pour vous faire gagner du temps. Du formulaire de contact jusqu’à la liste des courses, trouvez votre bonheur dans notre liste de modèles. 
                                    </p>
                                </div>
                            </div>
                            <div class="illustration w-lg-50 offset-lg-1">
                                    <img src="assets/images/img-form.png" loading="lazy" alt="Formulaires" longdesc="#modelIMG">
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
    </div>
    
    <div class="section tools-home">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="heading-2 heading-2--center"><span>Un outil</span>Pour tous</h2>
                    <p class="w-75 m-auto text-center mt-50">
                        En un clin d’oeil, Jamgati créé l’élément que vous souhaitez. Grâce à son interface intuitive, vous pourrez créer autant d'objets que vous le souhaitez, rapidement et efficacement.
                        Grâce à Jamgati, gagnez du temps sur votre projet web : tout est ici à votre disposition et fait pour vous aider à créer du code en un instant. Pas besoin d’avoir des compétences professionnelles en développement web pour pouvoir créer du contenu. Fini les recherches interminables et les vidéos tutorielles pour comprendre comment utiliser tel plugin pour créer un tel contenu. Tout est ici à portée de main, créé pour vous et pour tous.
                  </p>
                </div>
            </div>
            <div class="row justify-content-between cards-home">
                <div class="card">
                    <h3>Accessible</h3>
                    <p>Jamgati porte une grande attention à l’accessibilité dans le but de donner la possibilité à tous d’utiliser votre site.</p>
                </div>
                <div class="card">
                    <h3>Open source</h3>
                    <p>Une remarque ou une question ? Dirigez vous vers le footer pour accéder à notre Git et nous permettre de faire évoluer notre application web.</p>
                </div>
            </div>
        </div>
    </div>

    <div class="section dev-home">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="heading-2 heading-2--center">Pour les développeurs</h2>
                </div>
                <div class="col-md-6 tech">
                    <img src="assets/images/img-html.png" loading="lazy" alt="Logo HTML5" longdesc="#htmlIMG">
                    <div class="text" id="htmlIMG">
                        <p><strong>HTML5</strong></p>
                        <p>Pour pouvoir mettre en forme votre contenu, Jamgati utilise la technologie HTML5, nécessaire pour intégrer les éléments proposés</p>
                    </div>
                </div>
                <div class="col-md-6 tech">
                    <img src="assets/images/img-css.png" loading="lazy" alt="Logo CSS6" longdesc="#cssIMG">
                    <div class="text" id="cssIMG">
                        <p><strong>CSS 6</strong></p>
                        <p>Pour une agréable mise en forme de vos éléments. Ajouter vos couleurs, typographies ou encore taille de texte pour une personnalisation la plus complète possible.</p>
                    </div>
                </div>
                <div class="col-md-6 tech">
                    <img src="assets/images/img-bootstrap.png" loading="lazy" alt="Logo Bootstrap" longdesc="#bootIMG">
                    <div class="text" id="bootIMG">
                        <p><strong>Bootstrap</strong></p>
                        <p>
                            Pour permettre aux utilisateurs de votre site d’accéder au contenu quelque soit la taille de votre écran, Bootstrap est l’outil indispensable exploité par Jamgati.
                        </p>
                    </div>
                </div>
                <div class="col-md-6 tech">
                    <img src="assets/images/img-js.png" loading="lazy" alt="Logo Javascript" longdesc="#jsIMG">
                    <div class="text"  id="jsIMG">
                        <p><strong>Javascript</strong></p>
                        <p>Principalement utilisé pour les menus, le langage javascript permet de créer des animations simples telles que celle utilisé pour l’ouverture du menu burger.</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</main>
@endsection