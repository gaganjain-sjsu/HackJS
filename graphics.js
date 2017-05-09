$(function () {


///---BOTTOM GRAPHICS---///
    var result;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // xmlhttp.open("GET","http://localhost:3000/tasks",true);
    // xmlhttp.send();
    // xmlhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         result = xmlhttp.response;
    //     }
    // };

    xmlhttp.open("GET","http://localhost:3000/patients",true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            result = JSON.parse(xmlhttp.response); //result contains patient records in json format
            console.log(result.length);  //prints the number of records  
            console.log(result[0]['age']); //fetch age of 1st patient record 
        }
    };
    var pie_data = [58,75,28,97],
        pie_data_f=[],
        i;
    for(i=0;i<pie_data.length;i+=1){
        pie_data_f.push(100-pie_data[i]);
    }
    $('#pie-1').highcharts({
        chart: {
            backgroundColor:'#F8F7F7',
            type: 'pie'
        },
        credits:{
			enabled:false
		},
        subtitle:{
            text:'<span style="font-family:Avenir;font-size:12px;color:#767A81;">New Players</span>',
            floating:true,
            y:120
        },
        title: {
            text:'<span style="font-family:Helvetica;font-weight:600;">'+pie_data[0]+'%</span>',
            align: 'center',
            verticalAlign: 'middle',
            y: 5,
			x: 2
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: false,
                    showInLegend: false
                }
            },
        tooltip: {
			enabled:false
        },
        series: [{
            name:'Load',
            data: [
                {
                    color:'#595C6A',
                    name:'Uploaded',
                    y: pie_data[0]
                },
                {
                    color:'#DBD9DB',
                    name:'Loading',
                    y: pie_data_f[0]
                }

            ],
            navigation: {
                buttonOptions: {

                    symbolStrokeWidth: 0
                }
            },
            size: '100%',
            innerSize: '75%'
        }]
    });
    $('#pie-2').highcharts({
        chart: {
            backgroundColor:'#F8F7F7',
            type: 'pie'
        },
        credits:{
			enabled:false
		},
        subtitle:{
            text:'<span style="font-family:Avenir;font-size:12px;color:#767A81;">Revisited</span>',
            floating:true,
            y:120
        },
        title: {
            text:'<span style="font-family:Helvetica;font-weight:600;">'+pie_data[1]+'%</span>',
            align: 'center',
            verticalAlign: 'middle',
            y: 5,
			x: 2
        },

        yAxis: {
            title: {
                text: ''
            }
        },
        plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: false,
                    showInLegend: false
                }
            },
        tooltip: {
			enabled:false
        },
        series: [{
            name:'Load',
            data: [
                {
                    color:'#8CC665',
                    name:'Uploaded',
                    y: pie_data[1]
                },
                {
                    color:'#DBD9DB',
                    name:'Loading',
                    y: pie_data_f[1]
                }

            ],
            navigation: {
                buttonOptions: {

                    symbolStrokeWidth: 0
                }
            },
            size: '100%',
            innerSize: '75%'
        }]
    });
    $('#pie-3').highcharts({
        chart: {
            backgroundColor:'#F8F7F7',
            type: 'pie'
        },
        credits:{
			enabled:false
		},
        subtitle:{
            text:'<span style="font-family:Avenir;font-size:12px;color:#767A81;">Commented</span>',
            floating:true,
            y:120
        },
        title: {
            text:'<span style="font-family:Helvetica;font-weight:600;">'+pie_data[2]+'%</span>',
            align: 'center',
            verticalAlign: 'middle',
            y: 5,
			x: 2
        },

        yAxis: {
            title: {
                text: ''
            }
        },
        plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: false,
                    showInLegend: false
                }
            },
        tooltip: {
			enabled:false
        },
        series: [{
            name:'Load',
            data: [
                {
                    color:'#595C6A',
                    name:'Uploaded',
                    y: pie_data[2]
                },
                {
                    color:'#DBD9DB',
                    name:'Loading',
                    y: pie_data_f[2]
                }

            ],
            navigation: {
                buttonOptions: {

                    symbolStrokeWidth: 0
                }
            },
            size: '100%',
            innerSize: '75%'
        }]
    });
    $('#pie-4').highcharts({
        chart: {
            backgroundColor:'#F8F7F7',
            type: 'pie'
        },
        credits:{
			enabled:false
		},
        subtitle:{
            text:'<span style="font-family:Avenir;font-size:12px;color:#767A81;">Active Players</span>',
            floating:true,
            y:120
        },
        title: {
            text:'<span style="font-family:Helvetica;font-weight:600;">'+pie_data[3]+'%</span>',
            align: 'center',
            verticalAlign: 'middle',
            y: 5,
			x: 2
        },

        yAxis: {
            title: {
                text: ''
            }
        },
        plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: false,
                    showInLegend: false
                }
            },
        tooltip: {
			enabled:false
        },
        series: [{
            name:'Load',
            data: [
                {
                    color:'#8CC665',
                    name:'Uploaded',
                    y: pie_data[3]
                },
                {
                    color:'#DBD9DB',
                    name:'Loading',
                    y: pie_data_f[3]
                }

            ],
            navigation: {
                buttonOptions: {

                    symbolStrokeWidth: 0
                }
            },
            size: '100%',
            innerSize: '75%'
        }]
    });
///---MIDDLE GRAPHICS---///
    $('#graphic-1').highcharts({
        chart: {
            backgroundColor:'#F8F7F7',
            type: 'area'
        },
        legend:{
            enabled:true
        },
        title: {
            text: ''
        },
        xAxis: {
            lineColor:'#D4D1CD',
            tickColor:'#D4D1CD',
            categories: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
        },
        yAxis: {
            gridLineColor: '#D4D1CD',
            gridLineDashStyle: 'Dot',
            title: {
                text: ''
            },
            //max:55,
            min:1,

        },
        tooltip: {
            backgroundColor:'#659D9E',
            formatter: function () {
                return '<span style="font-family:Avenir;color:#FFFFFF;">'+this.y+'</span>';
            },
            shadow:false
        },
        plotOptions: {
            area: {
                fillOpacity: 0.085,
                cursor: 'pointer'
            }
        },
        credits: {
            enabled: false
        },
        series: [ {
            name: 'Active Tournaments',
            color: '#5C8F90',
            marker:{
                fillColor:'#fff',
                radius:5,
                lineColor:'#5C8F90',
                lineWidth:2,
                states:{
                    hover:{
                        fillColor:'#8CC665',
                        lineColor:'#fff',
                        lineWidth:3,
                        radius:4,
                    }
                }

            },
            data: [40, 25, 30, 50, 30, 28, 40]
        }]
    });

    $('#graphic-2').highcharts({
        chart: {
            backgroundColor:'#F8F7F7',
            type: 'area'
        },
        legend:{
            enabled:false
        },
        title: {
            text: ''
        },

        xAxis: {
            lineColor:'#D4D1CD',
            tickColor:'#D4D1CD',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug']
        },
        yAxis: {
            gridLineColor: '#D4D1CD',
            gridLineDashStyle: 'Dot',
            title: {
                text: ''
            },
            //max:850,
            min:100,

        },
        tooltip: {
            backgroundColor:'#0D0B0E',
            formatter: function () {
                return '<span style="font-family:Avenir;color:#FFFFFF;">'+this.y+'</span>';
            },
            shadow:false
        },
        plotOptions: {
            area: {
                fillOpacity: 0.085,
				cursor: 'pointer'
            }
        },
        credits: {
            enabled: false
        },
        series: [ {
            name: 'Active Tournaments',
            color: '#201D1F',
            marker:{
                fillColor:'#fff',
                radius:5,
                lineColor:'#000',
                lineWidth:2,
                states:{
                    hover:{
                        fillColor:'#000',
                        lineColor:'#fff',
                        lineWidth:3,
                        lineWidthPlus:155,
                        radius:5,
                    }
                }

            },
            data: [400, 700, 600, 900, 400, 600, 650, 300]
        }]
    });
});
