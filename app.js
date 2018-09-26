//search term: ?q='x'
//start year: begin_date='x'0101
//end year: end_date='x'1231
//sort: sort=newest or sort=oldest
//need: headline, byline, pub-date, url, section-name

$("#searchButton").click(function (event) {
  event.preventDefault();
  $("#articleDiv").empty();
  var search = $("#searchTermInput").val();
  var sDate = $("#startYearInput").val();
  var eDate = $("#endYearInput").val();
  var number = $("#formSelectInput").val();

  if (!search.trim()) return;

  if ((sDate === "") && (eDate === "")) {
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=4534afcff7454eb99fe3c43e06076e78&q=" + search;
  }
  else if (sDate === "") {
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=4534afcff7454eb99fe3c43e06076e78&q=" + search + "&end_date=" + eDate + "1231";
  }
  else if (eDate === "") {
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=4534afcff7454eb99fe3c43e06076e78&q=" + search + "&start_date=" + sDate + "0101";
  }
  else {
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=4534afcff7454eb99fe3c43e06076e78&q=" + search + "&start_date=" + sDate + "0101&end_date=" + eDate + "1231";
  }
  console.log(search);
  console.log(sDate);
  console.log(eDate);
  console.log(number);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (input) {
    console.log(input)
    console.log(input.response.docs[0].headline.main);
    console.log(input.response.docs[0].byline.original);

    for (var i = 0; i < number; i++) {
      var newDiv = $("<div class='mx-5'>");

      newDiv.append("<h2>" + (i + 1) + ". " + "<a href='" + input.response.docs[i].web_url + "' target='_blank'  class='text-body'>"  + input.response.docs[i].headline.main + "</a></h2>");
      console.log(input.response.docs[i].byline);
      if (input.response.docs[i].byline) {
        if (input.response.docs[i].byline.original) {
          newDiv.append("<p>" + input.response.docs[i].byline.original + "</p>");
        }
        else { newDiv.append("<p>") }
      }
      else { newDiv.append("<p>") }

      $("#articleDiv").append(newDiv);
    }
  })

})
