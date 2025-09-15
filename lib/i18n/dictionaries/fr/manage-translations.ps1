# Base path for translation dictionaries
$basePath = "C:\Users\justi\newhaiti-site\lib\i18n\dictionaries"

# Locales to fill
$locales = @("fr", "ht", "es")

# ------------------------
# French JSONs
# ------------------------
$frenchAbout = @'
{
  "title": "À propos de nous",
  "intro": "Découvrez notre mission, notre vision et les personnes qui portent Ayiti 2075.",
  "sections": [
    { "heading": "Notre Mission", "content": "Restaurer la dignité, reconstruire l’espoir et renouveler la vision en Haïti." },
    { "heading": "Notre Vision", "content": "Un Haïti uni, innovant et durable d’ici 2075." }
  ]
}
'@

$frenchProjects = @'
{
  "title": "Nos Projets",
  "intro": "Découvrez les principales initiatives qui façonnent l’avenir d’Haïti.",
  "motto": "Chaque projet est une promesse pour l’avenir.",
  "items": [
    { "name": "Éducation", "description": "Améliorer les écoles, former les enseignants et autonomiser la jeunesse." },
    { "name": "Santé", "description": "Étendre l’accès à des soins de santé de qualité à travers les communautés." },
    { "name": "Infrastructures", "description": "Construire des routes, des systèmes d’eau et des réseaux énergétiques résilients." }
  ]
}
'@

$frenchBlog = @'
{
  "title": "Notre Blog",
  "intro": "Lisez des histoires, des idées et des nouvelles du mouvement Ayiti 2075.",
  "posts": [
    { "title": "Bienvenue à Ayiti 2075", "excerpt": "Une introduction à notre vision et notre mission.", "author": "Équipe éditoriale", "date": "2025-01-01" },
    { "title": "Voix de la communauté", "excerpt": "Histoires d’Haïtiens qui façonnent le mouvement.", "author": "Auteurs communautaires", "date": "2025-02-01" }
  ]
}
'@

$frenchNewsletter = @'
{
  "title": "Restez Connectés",
  "description": "Abonnez-vous pour recevoir des mises à jour, annonces et histoires porteuses d’espoir.",
  "placeholder": "Entrez votre email",
  "subscribe": "S’abonner"
}
'@

# ------------------------
# Haitian Creole JSONs
# ------------------------
$creoleAbout = @'
{
  "title": "Sou nou",
  "intro": "Aprann sou misyon, vizyon, ak moun ki ap dirije Ayiti 2075.",
  "sections": [
    { "heading": "Misyon nou", "content": "Pou retabli diyite, rebati espwa, epi renouvle vizyon atravè Ayiti." },
    { "heading": "Vizyon nou", "content": "Yon Ayiti ini, inovatè, ak dirab anvan ane 2075." }
  ]
}
'@

$creoleProjects = @'
{
  "title": "Pwojè nou yo",
  "intro": "Dekouvri inisyativ kle yo ki ap bati lavni Ayiti.",
  "motto": "Chak pwojè se yon pwomès pou lavni.",
  "items": [
    { "name": "Edikasyon", "description": "Amelyore lekòl yo, fòme pwofesè yo, epi bay jèn yo plis kapasite." },
    { "name": "Sante", "description": "Ogmante aksè ak swen sante bon kalite nan kominote yo." },
    { "name": "Enfrastrikti", "description": "Bati wout solid, sistèm dlo, ak rezo enèji dirab." }
  ]
}
'@

$creoleBlog = @'
{
  "title": "Blog nou",
  "intro": "Li istwa, refleksyon, ak nouvèl ki sòti nan mouvman Ayiti 2075.",
  "posts": [
    { "title": "Byenveni nan Ayiti 2075", "excerpt": "Yon entwodiksyon sou vizyon ak misyon nou.", "author": "Ekip Editoryal", "date": "2025-01-01" },
    { "title": "Vwa Kominote a", "excerpt": "Istwa moun Ayiti ki ap fòme mouvman an.", "author": "Ekritè Kominotè yo", "date": "2025-02-01" }
  ]
}
'@

$creoleNewsletter = @'
{
  "title": "Rete konekte",
  "description": "Abòne pou resevwa mizajou, anons, ak istwa espwa.",
  "placeholder": "Antre imel ou",
  "subscribe": "Abòne"
}
'@

# ------------------------
# Spanish JSONs
# ------------------------
$spanishAbout = @'
{
  "title": "Sobre nosotros",
  "intro": "Conozca nuestra misión, visión y las personas que impulsan Ayiti 2075.",
  "sections": [
    { "heading": "Nuestra Misión", "content": "Restaurar la dignidad, reconstruir la esperanza y renovar la visión en Haití." },
    { "heading": "Nuestra Visión", "content": "Un Haití unido, innovador y sostenible para 2075." }
  ]
}
'@

$spanishProjects = @'
{
  "title": "Nuestros Proyectos",
  "intro": "Descubre las iniciativas clave que están moldeando el futuro de Haití.",
  "motto": "Cada proyecto es una promesa para el futuro.",
  "items": [
    { "name": "Educación", "description": "Mejorar las escuelas, capacitar a los maestros y empoderar a la juventud." },
    { "name": "Salud", "description": "Ampliar el acceso a atención médica de calidad en todas las comunidades." },
    { "name": "Infraestructura", "description": "Construir carreteras, sistemas de agua y redes energéticas resilientes." }
  ]
}
'@

$spanishBlog = @'
{
  "title": "Nuestro Blog",
  "intro": "Lee historias, ideas y actualizaciones del movimiento Ayiti 2075.",
  "posts": [
    { "title": "Bienvenidos a Ayiti 2075", "excerpt": "Una introducción a nuestra visión y misión.", "author": "Equipo Editorial", "date": "2025-01-01" },
    { "title": "Voces de la Comunidad", "excerpt": "Historias de haitianos que están moldeando el movimiento.", "author": "Escritores Comunitarios", "date": "2025-02-01" }
  ]
}
'@

$spanishNewsletter = @'
{
  "title": "Mantente Conectado",
  "description": "Suscríbete para recibir actualizaciones, anuncios e historias de esperanza.",
  "placeholder": "Ingresa tu correo",
  "subscribe": "Suscribirse"
}
'@

# ------------------------
# Write files
# ------------------------
$translations = @{
  "fr/about.json" = $frenchAbout; "fr/projects.json" = $frenchProjects; "fr/blog.json" = $frenchBlog; "fr/newsletter.json" = $frenchNewsletter;
  "ht/about.json" = $creoleAbout; "ht/projects.json" = $creoleProjects; "ht/blog.json" = $creoleBlog; "ht/newsletter.json" = $creoleNewsletter;
  "es/about.json" = $spanishAbout; "es/projects.json" = $spanishProjects; "es/blog.json" = $spanishBlog; "es/newsletter.json" = $spanishNewsletter;
}

foreach ($file in $translations.Keys) {
    $filePath = Join-Path $basePath $file
    $translations[$file] | Out-File -FilePath $filePath -Encoding utf8 -Force
    Write-Host "Written: $filePath"
}
