var info = {
    intro: ["In 1904, Julia Morgan became the first woman licensed to practice architecture in California. A successful and prolific architect during the first half of the twentieth century, Morgan was born in San Francisco in 1872 and educated at the University of California at Berkeley and L’École des Beaux-Arts in Paris.",
        "Her trailblazing career helped open the field of architecture to women in the United States. Today she is perhaps best known for the design and construction of publisher W.R. Hearst’s legendary California coastal estate. Yet she was much more than the architect of San Simeon.",
        "She built a remarkably diverse practice, designing at least 700 buildings that are prized by owners and are now being rediscovered by architectural historians."
    ],
    name: 'Julia Morgan',
    title: 'Architect and Trail Blazer',
    imgSrc: 'img/xxx.jpg'
};

var subjectViewModel = function() {
    var self = this;
    //Julia Morgan
    self.intro = ko.observable(info.intro);
    self.name = ko.observable(info.name);
    self.title = ko.observable(info.title);
    self.nameandtitle = ko.computed(function() {
        return self.name() + ", " + self.title();
    }, self);

};

ko.applyBindings(new subjectViewModel, document.getElementById('introduction'));
