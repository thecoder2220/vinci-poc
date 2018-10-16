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

                 <CustomizedSortBy
                                items={[
                                    { value: 'site2_sort_by_date', label: 'Tri par date' },
                                    { value: 'site2', label: 'Tri par pertinence' },
                                ]}
                                defaultRefinement="site2"
                            />
                            
                                                        <span className="fontsize18"><a ctype="sort" href="">Tri par date</a><font
                                                            color="#000000"> / Tri par pertinence</font></span>
