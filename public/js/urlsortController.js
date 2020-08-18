$(function() {
  $('.modal').modal();
  $('#modal1').modal('open'); 
  
  $("#tokenBtn").click(function() {
    let token = $("#tokenID").val();
    if (token !== undefined && token.length > 0) {
      getURLs(token);
      $("#tokenID").val("");
      $(".modal").modal("close");
      $("main").show();
      $("#shortURL").hide();
      $("#checkboxID").click(function () {
        $("#shortURL").show();
      });
     
      $("#urlsubBtn").click(function() {
        let fullurl = $("#fullURL").val();
        let shortURL = $("#shortURL").val();
        if (shortURL === undefined || shortURL === null || shortURL.length === 0) {
          shortURL = "morol";
        } 
        if (!isUrlValid(fullurl)) {
          showToast("Invalid URL", "yellow darken-3");
        } else {
          let apiURL = "https://mini-js.herokuapp.com/mini/urlsort/posturl?fullurl=" 
          + fullurl + "&token=" + token + "&shortURL=" + shortURL;
          $.get(apiURL, function() {})
            .done((res) => {
              if (res.status === "ok") {
                showToast("Success", "green darken-3");
                $("#fullURL").val("");
                $("#shortURL").val("");
                $("#shortURL").hide();
                $("#checkboxID"). prop("checked", false);
                getURLs(token);
              } else if (res.status === "used") {
                showToast("Already use this short url", "yellow darken-3");
              }
            })
            .fail(() => {
              showToast("Somthing wrong", "red darken-3");
            });
        }
      })
    }
  })
})

function isUrlValid(url) {
  return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

function getURLs(token) {
  let apiURL = "https://mini-js.herokuapp.com/mini/urlsort/geturls?token=" + token;
  $.get(apiURL, function() {})
    .done((res) => {
      if (res.length > 0) {
        makeTable(res);
      }
    })
    .fail(() => {
      showToast("Somthing wrong", "red darken-3");
    });
}

function makeTable(res) {
  let str = "<table><tr><th>Full URL</th><th>Sort URL</th>"
    str += "<th>Click Count</th></tr><tbody>"
  for (let i = res.length - 1; i >= 0; i--) {
    str += "<tr><td><a href='"+ res[i].fullurl +"'>"+ res[i].fullurl +"</a></td>"
    str += "<td><a href='https://mini-js.herokuapp.com/"+ res[i].shorturl +"'>"+ res[i].shorturl +"</a></td>"
    str += "<td>"+ res[i].clicks +"</td></tr>"
  }
  str += "</tbody></table>";
  $("#urltableID").html(str);
}

/*** Show Toast ***/
function showToast(data, style) {
  M.toast({
      html : data,
      classes : style
  });
}