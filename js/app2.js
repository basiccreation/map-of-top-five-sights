// //a JSON string of buildings
 var list_Of_Buildings = '[{"name":"Peach House","address":"34 Fruits Lane","website":"233.com","imgSrc":"photo.jpg","wikiLink":"wiki.org","description":["heres a desc"]},{"name":"Plum Castle","address":"45 Fruits Lane","website":"75.com","imgSrc":"photo.jpg","wikiLink":"wiki.org","description":["heres a desc"]},{"name":"Donut cottage","address":" 234 Bread Alley","website":"15.us","imgSrc":"photo.jpg","wikiLink":"wiki.org","description":["heres a desc"]},{"name":"Milky Way","address":"90 Dairy Drive","website":"450.com","imgSrc":"photo.jpg","wikiLink":"wiki.org","description":["heres a desc"]},{"name":"Mars Mansion","address":"890 Fairy Extension","website":"33450.com","imgSrc":"photo.jpg","wikiLink":"wiki.org","description":["heres a desc"]}]';

//parse into an object
var buildingsJSONtoObject = ko.utils.parseJson(list_Of_Buildings);


var Building2 = function(data) {
    this.name = ko.observable(data.name);
    this.address = ko.observable(data.address);
    this.imgSrc = ko.observable(data.imgSrc);
    this.wikiLink = ko.observable(data.wikiLink);
    this.description = ko.observableArray(data.description);
    this.website = ko.observable(data.website);
};


var buildingViewModel = function() {
    var self = this;

    // BUILDINGS
    //create building array
    self.buildingList = ko.observableArray([]);

    //populate buildings array
    buildingsJSONtoObject.forEach(function(buildingItem) {
        self.buildingList.push(new Building2(buildingItem));
    });

    //sets current building
    this.currentBuilding = ko.observable(this.buildingList()[0]);

    //sets selection to current
    this.selection = function(selected) {
        self.currentBuilding(selected);
    };
}; // end buildingViewModel

ko.applyBindings(new buildingViewModel, document.getElementById('buildingsection'));
