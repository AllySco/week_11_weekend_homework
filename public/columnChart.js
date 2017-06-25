var ColumnChart = function(title, teamData, teamNames) {

  var container = document.querySelector( "#column-chart" );

  var columnChart = new Highcharts.Chart({
    chart: {
      type: "column",
      renderTo: container
    },
    title: { text: title },
    series: teamData,
    xAxis: {
      categories: teamNames
    }
  });
}