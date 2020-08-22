$(function() {
  gethataFromBDCrimeAPI("2019");
  $('select').on('change', function() {
    let selectYear = this.value;
    gethataFromBDCrimeAPI(selectYear);
  });
});

let gethataFromBDCrimeAPI = (selectYear) => {
  $("main").hide();
  callLoader();
  $("#bdCrimeTableInfoID").html(
    "<h5 class='center'>BD Crime List (Year-"+ selectYear +")</h5>"
  );
  let apiUrl = "https://mini-js.herokuapp.com/mini/api/bdcrime?year="
    apiUrl += selectYear;
  $.get(apiUrl, function() {})
    .done((res) => {
      makeTableFromBdCrimeData(res.data, selectYear);
      $("#preLoader").hide();
      $("main").show();
    })  
    .fail(function() {
      showToast("Problem Load Files!!!", "red darken-3");
    });
}

let makeTableFromBdCrimeData = (data, selectYear) => {
  let str = "<table class='highlight'><thead><tr><th>Unit Name</th>";
    str += "<th>Dacoity</th><th>Robbery</th><th>Murder</th>";
    str += "<th>Speedy Trial</th><th>Riot</th><th>Woman & Child Repression</th>";
    str += "<th>Kidnapping</th><th>Police Assault</th><th>Burglary</th>";
    str += "<th>Theft</th><th>Other Cases</th><th>Arms Act</th>";
    str += "<th>Explosive</th><th>Narcotics</th><th>Smuggling</th>";
    str += "<th>Total</th><th>Total Cases</th></tr></thead><tbody>";
  for (let i = 0; i < data.length; i++) {
    str += "<tr><td>"+ data[i].Unit +"</td>";
    str += "<td>"+ data[i].Dacoity +"</td>";
    str += "<td>"+ data[i].Robbery +"</td>";
    str += "<td>"+ data[i].Murder +"</td>";
    str += "<td>"+ data[i].SpeedyTrial +"</td>";
    str += "<td>"+ data[i].Riot +"</td>";
    str += "<td>"+ data[i].WomanChildRepression +"</td>";
    str += "<td>"+ data[i].Kidnapping +"</td>";
    str += "<td>"+ data[i].PoliceAssault +"</td>";
    str += "<td>"+ data[i].Burglary +"</td>";
    str += "<td>"+ data[i].Theft +"</td>";
    str += "<td>"+ data[i].OtherCases +"</td>";
    str += "<td>"+ data[i].RecoveryCases.ArmsAct +"</td>";
    str += "<td>"+ data[i].RecoveryCases.Explosive +"</td>";
    str += "<td>"+ data[i].RecoveryCases.Narcotics +"</td>";
    str += "<td>"+ data[i].RecoveryCases.Smuggling +"</td>";
    str += "<td>"+ data[i].RecoveryCases.Total +"</td>";
    str += "<td>"+ data[i].TotalCases +"</td></tr>";
  }
  str += "</tbody></table>";
  $("#bdCrimeTableID").html(str);
}

let callLoader = () => {
  $("#preLoader").show();
  let str = "<div class='circle-loader'>";
    str += "<div class='loader-container'>";
    str += "<div class='ball'></div>";
    str += "<div class='ball'></div>";
    str += "<div class='ball'></div>";
    str += "<div class='ball'></div></div></div>";
  $("#preLoader").html(str);
}

/*** Show Toast ***/
let showToast = (data, style) => {
  M.toast({
      html : data,
      classes : style
  });
}
