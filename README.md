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
searchable={true}
searchable={false}
