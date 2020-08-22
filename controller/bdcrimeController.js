const catchAsync = require('../util/catchAsync');
const request = require('request');
const cherio = require('cherio');
const HtmlTableToJson = require('html-table-to-json');
const bdcrimeModel = require('./../model/bdcrimeModel');



/*** get data using Web-crawling tech ***/
exports.getCrimeDataFromBDPolice = catchAsync(async (req, res, next) => {
  let baseURL = "https://www.police.gov.bd/en/crime_statistic/year/2010";
  request(baseURL, async(err, response, html) => {
    let data;
    if (!err && response.statusCode === 200) {
      const $ = cherio.load(html);
      const details = $("table").html();
      const jsonTables = HtmlTableToJson.parse("<table>"+ details +"</table>");
      
      for (let i = 0; i < jsonTables.results[0].length; i++) {
        const jsonRes = jsonTables.results[0][i];
        const now = convertFormat(jsonRes, 2010);
        // await bdcrimeModel.create(now);
        //data.push(convertFormat(jsonRes, 2019));
      }      
      data = await bdcrimeModel.find();
    } 
    res.status(200).json(data);
  });
});

function convertFormat(jsonRes, year) {
  let tempData = {
    CrimeYear: year,
    Unit: jsonRes["Arms Act"],
    Dacoity: jsonRes["Explosive"],
    Robbery: jsonRes["Narcotics"],
    Murder: jsonRes["Smuggling"],
    SpeedyTrial: jsonRes["Total"],
    Riot: jsonRes["Riot"],
    WomanChildRepression: jsonRes["Woman & Child Repression"],
    Kidnapping: jsonRes["Kidnapping"],
    PoliceAssault: jsonRes["Police Assault"],		
    Burglary: jsonRes["Burglary"],
    Theft: jsonRes["Theft"],
    OtherCases: jsonRes["Other Cases"],
    RecoveryCases: {
      ArmsAct: jsonRes["Recovery Cases"],
      Explosive: jsonRes["Total Cases"],
      Narcotics: jsonRes["15"],
      Smuggling: jsonRes["16"],
      Total: jsonRes["17"]	
    },
    TotalCases: jsonRes["18"]	
  };
  return tempData;
}