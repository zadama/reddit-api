$(document).ready(function () {
  const renderPosts = (subReddit) => {
    if (subReddit === undefined) {
      subReddit = "memes";
    }

    $.ajax(`https://www.reddit.com/r/${subReddit}/top.json?limit=10`, {
      success: function (responseData) {
        const { data } = responseData;
        const resultList = data.children;

        $.each(resultList, function (index, element) {
          const res = element.data;

          // Better than .url, since that will sometimes only link to an image(in case of memes)
          let urlToPost = "http://reddit.com" + res.permalink;

          let thumbnail = res.thumbnail;

          if (
            res.preview &&
            res.preview.images[0] &&
            res.preview.images[0].source
          ) {
            thumbnail = res.preview.images[0].source.url;
          }

          let col = $(`   <a href="${urlToPost}" class="col">  
      
          <img src="${thumbnail}" alt="${res.title}">
          
          <div class="col-content"> 
          <h3>${res.title}</h3>

          </div>

          </a>`)
            .hide()
            .fadeIn(800);

          $(".row").append(col);
        });
      },
      error: function () {
        alert("Something didn't work!");
      },
    });
  };

  renderPosts();

  $(".btn").click(function () {
    let subRedd = $(this).text();
    subRedd = subRedd.toLowerCase();

    $(".row").empty();

    renderPosts(subRedd);
  });

  $(document).on("mouseenter", ".col", function () {
    $(this).animate({
      opacity: "0.6",
    });
  });

  $(document).on("mouseleave", ".col", function () {
    $(this).animate({
      opacity: "1",
    });
  });

  $(".scrollable").click(function () {
    $(".row").animate({
      left: "250px",
      height: "-=500px",
      width: "-=500px",
    });
  });

  $(".normalize").click(function () {
    $(".row").animate({
      left: "250px",
      height: "+=500px",
      width: "+=500px",
    });
  });
});
