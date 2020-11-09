$(document).ready(function () {
  const subReddit = "cats";

  $.ajax(`https://www.reddit.com/r/${subReddit}/top.json?limit=10`, {
    success: function (responseData) {
      const { data } = responseData;
      const resultList = data.children;

      $.each(resultList, function (index, element) {
        const res = element.data;

        const thumbnail = res.preview.images[0].source.url || res.thumbnail;

        $(".row").append(
          $(`
        
            <a href="${res.url}" class="col">  

            <img src="${thumbnail}" alt="${res.title}">
            
            <div class="col-content"> 
            <h3>${res.title}</h3>

            </div>

            </a>

        
        `)
        );
      });
    },
    error: function () {
      alert("Something didn't work!");
    },
  });
});
