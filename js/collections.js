"use strict";

//introduction
var juliaIntro = $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=query&titles=Julia%20Morgan&prop=revisions&rvprop=content&format=json",
        dataType: "jsonp",
        success: function(response) {
        var intro = response[1];
      //  $("#details").html(JSON.stringify(response, null, 4));
      //  viewModel.introduction(intro);
        }
    });

ko.applyBindings(new juliaIntro())

