$(document).ready(function() {
    Highcharts.setOptions({
    global: {
            useUTC: false
            }
    });
    var options = {    
        chart: {
          renderTo: 'tempcontainer',/*the Id of the div that the chart is rendered in*/                 
          height:320,
 
                   },    
       title: {    
          text: 'MyTestChart'
       },
       events:{               /*IMPORTANT: HighCharts has the Events option which is an event listener */
          load: refreshChart() /*Load: Fires when the chart is finished loading.*/
       },                      /* Thus it will call the function refreshChart() upon completion of rendering the chart */
       tooltip: {             
       },
          valueSuffix: ' C'
       },
       xAxis: {
          type: 'datetime'  /*X Axis is of datetime type*/                                        
       },
       yAxis: {
        type: 'linear',
          title: {
            text: 'Temperature ( C)'
          },
       },       
        series: [{
        name: 'Temp'
        }]
    }
 
    $.getJSON("data.php", function(json) {    /*Get the array data in data.php using jquery getJSON function*/
        options.series[0].data = json;        /*assign the array variable to chart data object*/
        chart = new Highcharts.Chart(options); /*create a new chart*/
    });
        
    function refreshChart(){                 /*function is called every set interval to refresh(recreate the chart) with the new data from data.php*/
        setInterval(function(){
            $.getJSON("data.php", function(json) {
                options.series[0].data = json;
                chart = new Highcharts.Chart(options);
            });
        },60000);
    }
});
