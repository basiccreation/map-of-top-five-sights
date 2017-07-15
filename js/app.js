//Neighborhood Map

"use strict";
// Info about Julian Morgan
var info = {
  intro: ["In 1904, Julia Morgan became the first woman licensed to practice architecture in California. A successful and prolific architect during the first half of the twentieth century, Morgan was born in San Francisco in 1872 and educated at the University of California at Berkeley and L’École des Beaux-Arts in Paris.",
          "Her trailblazing career helped open the field of architecture to women in the United States. Today she is perhaps best known for the design and construction of publisher W.R. Hearst’s legendary California coastal estate. Yet she was much more than the architect of San Simeon.",
          "She built a remarkably diverse practice, designing at least 700 buildings that are prized by owners and are now being rediscovered by architectural historians."],
  name: 'Julia Morgan',
  title: 'Architect and Trail Blazer',
  imgSrc: 'img/xxx.jpg'
};

// Info about Buildings drawn fully or partially by Julia Morgan
var initialBuildings = [
    { name: "Hearst Castle",
      address: "123 Pivot Drive",
      imgSrc: "http://via.placeholder.com/350x150",
      wikiLink: "http://www.example.com",
      description: ["Description of", "Hearst Castle"]
    },
    { name: "Colby House, Berkeley",
      address: "123 Pivot Drive",
      imgSrc: "http://via.placeholder.com/350x150",
      wikiLink: "http://www.example.com",
      description: ["Description of", "Colby House"]
    },
    { name: "Derge House, Berkeley",
      address: "123 Pivot Drive",
      imgSrc: "http://via.placeholder.com/350x150",
      wikiLink: "http://www.example.com",
      description: ["Description of", "Derge House"]
    }
];

var Building = function(data) {
    this.name = ko.observable(data.name);
    this.address = ko.observable(data.address);
    this.imgSrc = ko.observable(data.imgSrc);
    this.wikiLink = ko.observable(data.wikiLink);
    this.description = ko.observableArray(data.description);

};

var viewModel = function() {
    var self = this;
//Julia Morgan

    self.intro = ko.observable(info.intro);

    self.name = ko.observable(info.name);

    self.title = ko.observable(info.title);

    self.nameandtitle = ko.computed(function(){
        return self.name() + ", " + self.title();
    }, self);

// Buildings

    self.buildingList = ko.observableArray([]);

    initialBuildings.forEach(function(buildingItem) {
         self.buildingList.push( new Building(buildingItem) );
 });

 //   this.currentBuilding = ko.observable( this.buildingList()[0]);

    // this.selection = function(selected) {
    //   self.currentBuilding(selected);
    // };

};

ko.applyBindings(new viewModel());


//var url = "http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=Julia%20Morgan";
  var url = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=Julia%20Morgan";
//var url = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=Main%20Page";
//
 $.get(
    url,
    function(response) {
      $("#details").html(JSON.stringify(response.query.pages, null, 4));
      var result = response.query.pages;
     // $("#list").html(JSON.stringify(response.query.pages['435997'].revisions[0]['*'], null, 4));
    },
    "jsonp"
  );

