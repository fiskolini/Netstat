$(document).ready(function() {
    var $chart = $("#chart");
    $chart.css("height", $(document).height());

    $(function() {
        var seriesOptions = [],
            seriesCounter = 0,
            names = ['PING', 'DOWNLOAD', 'UPLOAD'];


        /**
         * Create the chart when all data is loaded
         * @returns {undefined}
         */
        function createChart() {
            $chart.highcharts('StockChart', {
                chart: {
                    renderTo: 'chart',
                    type: 'spline',
                },
                title: {
                    text: '<b>NETSTAT</b><br><small style="font-size: 60%">v1.1 © <u>github.com/fiskolini</u></small>'
                },


                rangeSelector: {
                    selected: 0,
                    inputEnabled: false,
                    buttonTheme: {
                        //visibility: 'hidden'
                    },
                    labelStyle: {
                        //visibility: 'hidden'
                    },
                    buttons: [{
                        type: 'day',
                        count: 1,
                        text: '1d',
                    }, {
                        type: 'day',
                        count: 3,
                        text: '3d',
                    }, {
                        type: 'week',
                        count: 1,
                        text: '1s',
                    }, {
                        type: 'week',
                        count: 2,
                        text: '2s',
                    }],
                },


                yAxis: {
                    labels: {
                        formatter: function() {
                            if (this.value > 0) return this.value + ' Mbps';
                        }
                    },
                    plotLines: [{
                        value: 0,
                        width: 2,
                        color: 'silver'
                    }]
                },


                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> Mbps<br/>',
                    valueDecimals: 2
                },

                series: seriesOptions
            });
        }

        $.each(names, function(i, name) {

            //$.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?', function(data) {

            $.ajax({
                url: '/data.php?gname=' + name.toLowerCase(),
                cache: false,
                type: 'GET',
                dataType: 'json',

                success: function (data) {
                    seriesOptions[i] = {
                        name: name,
                        data: data,
                        dashStyle: 'longdash',
                        type: 'spline'
                    };

                    // As we're loading the data asynchronously, we don't know what order it will arrive. So
                    // we keep a counter and create the chart when all the data is loaded.
                    seriesCounter += 1;

                    if (seriesCounter === names.length) {
                        createChart();
                    }
                }
            });
        });
    });
}); // <-- end of $(document).ready();

// Load the fonts
Highcharts.createElement('link', {
    href: 'https://fonts.googleapis.com/css?family=Unica+One',
    rel: 'stylesheet',
    type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
    colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"
    ],
    lang: {
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        shortWeekdays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        rangeSelectorFrom: "Entre",
        rangeSelectorTo: "a",
        rangeSelectorZoom: "Zoom",
        resetZoom: "Iniciar zoom",
        resetZoomTitle: "Iniciar zoom",
    },
    chart: {
        backgroundColor: {
            linearGradient: {
                x1: 0,
                y1: 0,
                x2: 1,
                y2: 1
            },
            stops: [
                [0, '#2a2a2b'],
                [1, '#3e3e40']
            ]
        },
        style: {
            fontFamily: "'Open Sans', sans-serif"
        },
        plotBorderColor: '#606063'
    },
    title: {
        style: {
            color: '#E0E0E3',
            fontSize: '20px'
        }
    },
    subtitle: {
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase'
        }
    },
    xAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
            style: {
                color: '#A0A0A3'

            }
        }
    },
    yAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
            color: '#F0F0F0',
        }
    },
    plotOptions: {
        series: {
            dataLabels: {
                color: '#B0B0B3'
            },
            marker: {
                lineColor: '#333'
            }
        },
        boxplot: {
            fillColor: '#505053'
        },
        candlestick: {
            lineColor: 'white'
        },
        errorbar: {
            color: 'white'
        }
    },
    legend: {
        itemStyle: {
            color: '#E0E0E3'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#606063'
        }
    },
    credits: {
        style: {
            color: '#666'
        }
    },
    labels: {
        style: {
            color: '#707073'
        }
    },

    drilldown: {
        activeAxisLabelStyle: {
            color: '#F0F0F3'
        },
        activeDataLabelStyle: {
            color: '#F0F0F3'
        }
    },

    navigation: {
        buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
                fill: '#505053'
            }
        }
    },

    // scroll charts
    rangeSelector: {
        buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
                color: '#CCC'
            },
            states: {
                hover: {
                    fill: '#707073',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                },
                select: {
                    fill: '#000003',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                }
            }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
        },
        labelStyle: {
            color: 'silver'
        }
    },

    navigator: {
        handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
        },
        xAxis: {
            gridLineColor: '#505053'
        }
    },

    scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
    },

    // special colors for some of the
    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    background2: '#505053',
    dataLabelsColor: '#B0B0B3',
    textColor: '#C0C0C0',
    contrastTextColor: '#F0F0F3',
    maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);
