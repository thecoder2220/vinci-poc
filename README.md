projet buildé d'après https://github.com/algolia/create-instantsearch-app

Open http://localhost:5001 to see your app.

Hot reloading OK


=> problème en cours

defaultShowMoreTemplates.js

templates={
active: '<a class="ais-show-more ais-show-more__active">Show less</a>',
inactive: '<a class="ais-show-more ais-show-more__inactive">Show more</a>',
	 }
	 
	 voir translations
	  
	  https://community.algolia.com/instantsearch.js/v2/widgets/menu.html
	  
	  https://community.algolia.com/instantsearch.js/v1/documentation/#refinementlist
	 
	 var MyMenu = require('react-instantsearch-dom');
     var MyMenuShowMoreFalse = new MyMenu;
     
     console.log(MyMenuShowMoreFalse)
translations={{
            showMore(extended) {
              return extended ? "Less" : "More";
            }
          }} 

dn-attr-c => showMore-count-customized
dn-attr => one-category

dn-attr-hdr => header-category

debugger // eslint-disable-line

/**** RESPONSIVE ***/

Le min width s'applique à l'écran d'ordi
Le max width s'applique à l'écrans d'un mobile
 
 écran d'ordi
 
 @media only screen and (min-width: 901px)  =>  
 main {
     padding-top: 99px;
     margin-top: 1rem;
 }
 
 écrans d'un mobile
 
 @media only screen and (max-width: 900px)
 main {
     padding-top: 69px;
 }
 
 @media only screen and (max-width: 1000px)
 main {
     margin-top: 0;
 }
 
