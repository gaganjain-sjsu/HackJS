$(function () {

    ///---SOCKET CONNECTION---///   
    var serverObject;
    var socket = io.connect('http://54.153.51.18:8081/');
    socket.on('announcements', function (data) {
        
        serverObject = JSON.parse(data);
        console.log(serverObject.temperature);
        
    });

    ///---BROWSER COMPATIBILITY---///
    var result;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    ///---BROWSER - CACHING ---///
    var hospitals = localStorage.getItem("hospital_data");
    var hospital_id = localStorage.getItem("hospital_id");
    var doctor_id = localStorage.getItem("doctor_id");

    ///---AJAX CALL---///
    xmlhttp.open("GET", "http://54.153.51.18:3000/patients?doctor_id=" + doctor_id + "&hospital_id=" + hospital_id, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            result = JSON.parse(xmlhttp.response); //result contains patient records in json format
            console.log(result);  //prints the number of records  
            //console.log(result[0]['age']); //fetch age of 1st patient record 
            var totalpatients = result.length;
            var pageCount = Math.ceil(totalpatients / 4);
            var count = 0;
            for (var j = 1; j <= pageCount; j++) {
                var displayStyle = "";
                var classActive = "class='active'";

                if (j > 1) {
                    displayStyle = "style='display:none;'";
                    classActive = "";
                }
                document.getElementById('patients').innerHTML += '<div data-page="' + j + '" class="col-xs-12 col-sm-12 col-md-12" ' + displayStyle + '><div class="row control-elements-middle"><div class="container" id="container' + j + '">';


                document.getElementById('doctorName').innerHTML = "" + result[0].doctor_name + "<span class='caret'></span>";
                document.getElementById('doctorImage').src = "images/" + result[0].doctor_id + ".jpg";

                document.getElementById('profiles').innerHTML = '<div class="panel-heading"><h3 class="panel-title" id="profileName">' + result[0].doctor_name + '</h3></div><div class="panel-body"><div class="row"><div class="col-md-3 col-lg-3" align="center"> <img alt="User Pic" src="images/' + result[0].doctor_id + '.jpg" class="img-circle img-responsive"> </div><div class="col-md-9 col-lg-9"> <br><br><br><table class="table table-user-information"><tbody><tr><td><strong>Sex:</strong></td><td>' + result[0].doctor_sex + '</td></tr><tr><td><strong>Contact:</strong></td><td>' + result[0].doctor_contact + '</td></tr><tr><td><strong>Age</strong></td><td>' + result[0].doctor_age + '</td></tr><tr><tr><td><strong>Degree</strong></td><td>' + result[0].doctor_degree + '</td></tr><tr><td><strong>Specialization</strong></td><td>' + result[0].specialization + '</td></tr><tr><td><strong>Zip</strong></td><td>' + result[0].zip + '</td></tr></tbody></table></div></div>'

            ///---HIGHCHARTS LIBRARY---///
                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });

                for (var i = 1; i <= 4; i++) {
                    if (count >= totalpatients)
                        break;
                    document.getElementById('container' + j + '').innerHTML += '<div class="col-xs-12 col-sm-12 col-md-6" id="div' + (count + 1) + '" ><div class="card" ><hr><div class="container"><div class="row"><div class="col-xs-4 col-sm-4 col-md-1"><img src="images/' + result[count]['patient_id'] + '.jpg" alt="Avatar" data-toggle="modal" data-target="#myModal' + count + '"></div><div class="card-details col-xs-8 col-sm-8 col-md-2"><strong><span>Name: </span></strong> <span>' + result[count]['patient_name'] + '</span><br><strong><span>Allergies: </span></strong> <span>' + result[count]['allergies'] + '</span><br><strong><span>Sex: </span></strong> <span>' + result[count]['sex'] + '</span><br><strong><span>Age: </span></strong> <span>' + result[count]['age'] + '</span></div><div class="card-details col-xs-12 col-sm-12 col-md-2"><strong><span>Disease: </span></strong> <span>' + result[count]['diagnosis'] + '</span><br><strong><span>Duration: </span></strong> <span>' + result[count]['disease_duration'] + '</span><br><strong><span>Admit Date: </span></strong> <span>' + result[count]['admit_date'] + '</span><br><strong><span>Insurance : </span></strong> <span>' + result[count]['insurance_company'] + '</span><br></div></div><div class="row"><div class="col-xs-12 col-sm-12 col-md-5"><hr><div  id="healthIndex-' + count + '" style="height: 200px;"></div></div></div></div></div></div>';
                    count++;
                }

                document.getElementById('patients').innerHTML += '</div></div></div>';
                document.getElementById('pagination').innerHTML += '<li ' + classActive + ' data-page="' + j + '"><a href="#">' + j + '</a></li>'
            }

            ///---PAGINATION---///

            var paginationHandler = function () {
                // store pagination container so we only select it once
                var $paginationContainer = $(".pagination-container"),
                    $pagination = $paginationContainer.find('.pagination ul');

                // click event
                $pagination.find("li a").on('click.pageChange', function (e) {
                    e.preventDefault();

                    // get parent li's data-page attribute and current page
                    var parentLiPage = $(this).parent('li').data("page"),
                        currentPage = parseInt($(".pagination-container div[data-page]:visible").data('page')),
                        numPages = $paginationContainer.find("div[data-page]").length;
                    $(this).parent('li').parent('ul').find('*').removeAttr("class");
                    $(this).parent('li').addClass("active");

                    // make sure they aren't clicking the current page
                    if (parseInt(parentLiPage) !== parseInt(currentPage)) {
                        // hide the current page
                        $paginationContainer.find("div[data-page]:visible").hide();

                        if (parentLiPage === '+') {
                            // next page
                            $paginationContainer.find("div[data-page=" + (currentPage + 1 > numPages ? numPages : currentPage + 1) + "]").show();
                        } else if (parentLiPage === '-') {
                            // previous page
                            $paginationContainer.find("div[data-page=" + (currentPage - 1 < 1 ? 1 : currentPage - 1) + "]").show();
                        } else {
                            // specific page
                            $paginationContainer.find("div[data-page=" + parseInt(parentLiPage) + "]").show();
                        }

                    }
                });


            ///---HIGHCHARTS DYNAMIC DISPLAY---///

                for (var i = 0; i < result.length; i++) {
                    var array = result[i]['healthIndex'].split(',');

                    $('#healthIndex-' + i + '').highcharts({
                        chart: {
                            backgroundColor: '#F8F7F7',
                            type: 'area'
                        },
                        legend: {
                            enabled: true
                        },
                        title: {
                            text: ''
                        },
                        xAxis: {
                            lineColor: '#D4D1CD',
                            tickColor: '#D4D1CD',
                            categories: ['FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU']
                        },
                        yAxis: {
                            gridLineColor: '#D4D1CD',
                            gridLineDashStyle: 'Dot',
                            title: {
                                text: ''
                            },
                            //max:55,
                            min: 1,

                        },
                        tooltip: {
                            backgroundColor: '#659D9E',
                            formatter: function () {
                                return '<span style="font-family:Avenir;color:#FFFFFF;">' + this.y + '</span>';
                            },
                            shadow: false
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
                        series: [{
                            name: 'Health Index',
                            color: '#5C8F90',
                            marker: {
                                fillColor: '#fff',
                                radius: 5,
                                lineColor: '#5C8F90',
                                lineWidth: 2,
                                states: {
                                    hover: {
                                        fillColor: '#8CC665',
                                        lineColor: '#fff',
                                        lineWidth: 3,
                                        radius: 4,
                                    }
                                }

                            },
                            data: [parseInt(array[0]), parseInt(array[1]), parseInt(array[2]), parseInt(array[3]), parseInt(array[4]), parseInt(array[5]), parseInt(array[6])]
                        }]
                    });

                    document.getElementById('modals').innerHTML += '<div class="modal fade" id="myModal' + i + '" role="dialog" ><div class="modal-lg" style="margin-top: 20px; margin-left:10%; width: 80%;"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><center><h4 class="modal-title">Patient : ' + result[i]['patient_name'] + '</h4></center></div><div class="modal-card"><div class="container"><br><div class="modal-body"><br><br><br><div class="row"><div class="col-md-6"><div class="col-md-4"><label class="switch"><input id="checkOne' + i + '" type="checkbox" checked><div class="slider round"></div></label></div><div class="col-md-4"><h4 >Blood Pressure</h4></div><div class="col-md-4"><button id="medicationOne' + i + '" type="button" class="btn btn-primary pull-right" data-toggle="modal" data-target="#innerModalBP' + i + '">Medication</button></div><div  id="one' + i + '" style="height: 300px;" data-toggle="modal" data-target="#innerModal"></div></div><div class="col-md-6" style="border-left: 1px solid #F5F5F5;"><div class="col-md-4"><label class="switch"><input type="checkbox" id="checkTwo' + i + '" checked><div class="slider round"></div></label></div><div class="col-md-4"><h4>Temperature</h4></div><div class="col-md-4"><button id="medicationTwo' + i + '" type="button" class="btn btn-primary pull-right" data-toggle="modal" data-target="#innerModalTemp' + i + '">Medication</button></div><div  id="two' + i + '" style="height: 300px;"></div></div></div><br><hr><div class="row"><div class="col-md-6" ><div class="col-md-4"><label class="switch"><input id="checkThree' + i + '" type="checkbox" checked><div class="slider round"></div></label></div><div class="col-md-4"><h4>Glucose level</h4></div><div class="col-md-4"><button id="medicationThree' + i + '" type="button" class="btn btn-primary pull-right" data-toggle="modal" data-target="#innerModalGlucose' + i + '">Medication</button></div><div  id="three' + i + '" style="height: 300px;"></div></div><div class="col-md-6" style="border-left: 1px solid #F5F5F5;"><div class="col-md-4"><label class="switch"><input id="checkFour' + i + '" type="checkbox" checked><div class="slider round"></div></label></div><div class="col-md-4"><h4>Hydration Level</h4></div><div class="col-md-4"><button id="medicationFour' + i + '" type="button" class="btn btn-primary pull-right" data-toggle="modal" data-target="#innerModalHydration' + i + '">Medication</button></div><div  id="four' + i + '" style="height: 300px;"></div></div></div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>'



                    document.getElementById('modals').innerHTML += '<div class="modal fade" id="innerModalBP' + i + '" role="dialog"><div  style="margin-top: 150px; margin-left:20%; width: 60%;"><div class="modal-content" style="background-color: #F5F5F5;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><center><h3 class="modal-title">Add Medication</h3></center></div><div class="modal-card"><div class="container"><form ><div class="row"><div class=" col-md-6"><select class="form-control input-lg" id="bpSelect' + i + '"><option value="Bumetanide (Bumex)">Bumetanide (Bumex)</option><option value="Chlorthalidone (Hygroton)">Chlorthalidone (Hygroton)</option><option value="Chlorothiazide (Diuril)">Chlorothiazide (Diuril)</option><option value="Ethacrynate (Edecrin)">Ethacrynate (Edecrin)</option><option value="Furosemide (Lasix)">Furosemide (Lasix)</option><option value="Hydrochlorothiazide HCTZ">Hydrochlorothiazide HCTZ</option><option value="Indapamide (Lozol)">Indapamide (Lozol)</option><option value="Methyclothiazide (Enduron)">Methyclothiazide (Enduron)</option></select></div><div class="col-md-2"><div class="form-group"><div class=" col-md-12"><input type="button" id="bpAddButton' + i + '" name="register" value="Add" class="btn btn-primary btn-block btn-lg" onclick=""></div></div></div></div><div class="row"><div class="col-md-8"><hr></div></div><div id="bpAddedMedication' + i + '"></div></form><br></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Ok</button></div></div></div></div>'

                    document.getElementById('modals').innerHTML += '<div class="modal fade" id="innerModalTemp' + i + '" role="dialog"><div  style="margin-top: 150px; margin-left:20%; width: 60%;"><div class="modal-content" style="background-color: #F5F5F5;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><center><h3 class="modal-title">Add Medication</h3></center></div><div class="modal-card"><div class="container"><form ><div class="row"><div class="col-md-6"><select class="form-control input-lg" id="tempSelect' + i + '"><option value="Acetaminophen">Acetaminophen</option><option value="Aspirin">Aspirin</option><option value="Ibuprofen">Ibuprofen</option><option value="Docosanol">Docosanol</option><option value="Ketoprofen">Ketoprofen</option><option value="Naproxen">Naproxen</option></select></div><div class="col-md-2"><div class="form-group"><div class="col-md-12"><input type="button" id="tempAddButton' + i + '" name="register" value="Add" class="btn btn-primary btn-block btn-lg" onclick=""></div></div></div></div><div class="row"><div class="col-md-8"><hr></div></div><div id="tempAddedMedication' + i + '"></div></form><br></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Ok</button></div></div></div></div>'


                    document.getElementById('modals').innerHTML += '<div class="modal fade" id="innerModalGlucose' + i + '" role="dialog"><div  style="margin-top: 150px; margin-left:20%; width: 60%;"><div class="modal-content" style="background-color: #F5F5F5;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><center><h3 class="modal-title">Add Medication</h3></center></div><div class="modal-card"><div class="container"><form ><div class="row"><div class="col-md-6"><select class="form-control input-lg" id="glucoseSelect' + i + '"><option value="Insulin">Insulin</option><option value="Glyciphage">Glyciphage</option><option value="Metformin">Metformin</option><option value="Pioglitazone">Pioglitazone</option><option value="Dopamine">Dopamine</option></select></div><div class="col-md-2"><div class="form-group"><div class="col-md-12"><input type="button" id="glucoseAddButton' + i + '" name="register" value="Add" class="btn btn-primary btn-block btn-lg" onclick=""></div></div></div></div><div class="row"><div class="col-md-8"><hr></div></div><div id="glucoseAddedMedication' + i + '"></div></form><br></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Ok</button></div></div></div></div>'

                    document.getElementById('modals').innerHTML += '<div class="modal fade" id="innerModalHydration' + i + '" role="dialog"><div  style="margin-top: 150px; margin-left:20%; width: 60%;"><div class="modal-content" style="background-color: #F5F5F5;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><center><h3 class="modal-title">Add Medication</h3></center></div><div class="modal-card"><div class="container"><form ><div class="row"><div class="col-md-6"><select class="form-control input-lg" id="hydrationSelect' + i + '"><option value="Saline">Saline</option><option value="Glutamine">Glutamine</option><option value="Meloxicam">Meloxicam</option><option value="Lenvatinib">Lenvatinib</option></select></div><div class="col-md-2"><div class="form-group"><div class="col-md-12"><input type="button" id="hydrationAddButton' + i + '" name="register" value="Add" class="btn btn-primary btn-block btn-lg" onclick=""></div></div></div></div><div class="row"><div class="col-md-8"><hr></div></div><div id="hydrationAddedMedication' + i + '"></div></form><br></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Ok</button></div></div></div></div>'

                }


            ///---DYNAMIC ELEMENT POPULATION---///
                var test = 0;
                var arr = {};
                $('input[id^="bpAddButton"]').click(function () {
                    var id = $(this).attr('id');
                    var e = $(this).parent('div').parent('div').parent('div').parent('div').find('select[id^="bpSelect"]');
                    if (arr[id] == null)
                        arr[id] = [];
                    if (!arr[id].includes(e.val())) {
                        arr[id].push(e.val());
                        $(this).parent('div').parent('div').parent('div').parent('div').parent('form').find('div[id^="bpAddedMedication"]').append('<div class="row" ><fieldset><div class=" col-md-3"><h4>' + e.val() + '</h4></div><div class=" col-md-3"><input type="range" id="bpRange' + test + '" class="form-control input-lg"  value="0"> </div><div class=" col-md-1"><label class="switch"><input type="checkbox" id="checkTwo"><div class="slider round"></div></label></div><div class="col-md-1" id="bpRangeValue' + test + '"></div></fieldset></div>');
                        test++;
                    }
                    $('input[id^="bpRange"]').change(function () {
                        $(this).parent('div').parent('fieldset').find('div[id^="bpRangeValue"]').html('<h4>' + $(this).val() + '</h4>');
                    });

                });


                $('input[id^="glucoseAddButton"]').click(function () {
                    var id = $(this).attr('id');
                    var e = $(this).parent('div').parent('div').parent('div').parent('div').find('select[id^="glucoseSelect"]');
                    if (arr[id] == null)
                        arr[id] = [];
                    if (!arr[id].includes(e.val())) {
                        arr[id].push(e.val());
                        $(this).parent('div').parent('div').parent('div').parent('div').parent('form').find('div[id^="glucoseAddedMedication"]').append(' <div class="row" ><fieldset><div class="col-xs-4 col-sm-3 col-md-3"><h4>' + e.val() + '</h4></div><div class="col-xs-4 col-sm-3 col-md-3"><input type="range" id="glucoseRange' + test + '" class="form-control input-lg" value="0"> </div><div class="col-xs-2 col-sm-1 col-md-1"><label class="switch"><input type="checkbox" id="checkTwo"><div class="slider round"></div></label></div><div class="col-xs-2 col-sm-1 col-md-1" id="glucoseRangeValue' + test + '"></div></fieldset></div>');
                        test++;
                    }
                    $('input[id^="glucoseRange"]').change(function () {
                        $(this).parent('div').parent('fieldset').find('div[id^="glucoseRangeValue"]').html('<h4>' + $(this).val() + '</h4>');
                    });

                });

                $('input[id^="tempAddButton"]').click(function () {
                    var id = $(this).attr('id');
                    var e = $(this).parent('div').parent('div').parent('div').parent('div').find('select[id^="tempSelect"]');
                    if (arr[id] == null)
                        arr[id] = [];
                    if (!arr[id].includes(e.val())) {
                        arr[id].push(e.val());
                        $(this).parent('div').parent('div').parent('div').parent('div').parent('form').find('div[id^="tempAddedMedication"]').append(' <div class="row" ><fieldset><div class="col-xs-4 col-sm-3 col-md-3"><h4>' + e.val() + '</h4></div><div class="col-xs-4 col-sm-3 col-md-3"><input type="range" id="tempRange' + test + '" class="form-control input-lg" value="0"> </div><div class="col-xs-2 col-sm-1 col-md-1"><label class="switch"><input type="checkbox" id="checkTwo"><div class="slider round"></div></label></div><div class="col-xs-2 col-sm-1 col-md-1" id="tempRangeValue' + test + '"></div></fieldset></div>');
                        test++;
                    }
                    $('input[id^="tempRange"]').change(function () {
                        $(this).parent('div').parent('fieldset').find('div[id^="tempRangeValue"]').html('<h4>' + $(this).val() + '</h4>');
                    });

                });

                $('input[id^="hydrationAddButton"]').click(function () {
                    var id = $(this).attr('id');
                    var e = $(this).parent('div').parent('div').parent('div').parent('div').find('select[id^="hydrationSelect"]');
                    if (arr[id] == null)
                        arr[id] = [];
                    if (!arr[id].includes(e.val())) {
                        arr[id].push(e.val());
                        $(this).parent('div').parent('div').parent('div').parent('div').parent('form').find('div[id^="hydrationAddedMedication"]').append(' <div class="row" ><fieldset><div class="col-xs-4 col-sm-3 col-md-3"><h4>' + e.val() + '</h4></div><div class="col-xs-4 col-sm-3 col-md-3"><input type="range" id="hydrationRange' + test + '" class="form-control input-lg" value="0"> </div><div class="col-xs-2 col-sm-1 col-md-1"><label class="switch"><input type="checkbox" id="checkTwo"><div class="slider round"></div></label></div><div class="col-xs-2 col-sm-1 col-md-1" id="hydrationRangeValue' + test + '"></div></fieldset></div>');
                        test++;
                    }
                    $('input[id^="hydrationRange"]').change(function () {
                        $(this).parent('div').parent('fieldset').find('div[id^="hydrationRangeValue"]').html('<h4>' + $(this).val() + '</h4>');
                    });

                });

                for (var i = 0; i < result.length; i++) {


            ///---HIGHCHARTS IMPLEMENTAION CODE---///

                    Highcharts.chart('one' + i + '', {
                        chart: {
                            type: 'spline',
                            animation: Highcharts.svg, // don't animate in old IE
                            //marginRight: 10,
                            events: {
                                load: function () {

                                    // set up the updating of the chart each second
                                    var series = this.series[0];
                                    setInterval(function () {
                                        var x = (new Date()).getTime(), // current time
                                            y = serverObject.systolic
                                        series.addPoint([x, y], true, true);
                                    }, 1000);

                                    var series1 = this.series[1];
                                    setInterval(function () {
                                        var x = (new Date()).getTime(), // current time
                                            y = serverObject.diastolic;
                                        series1.addPoint([x, y], true, true);
                                    }, 1000);
                                }
                            }
                        },
                        title: {
                            text: ''
                        },
                        xAxis: {
                            type: 'datetime',
                            tickPixelInterval: 100
                        },
                        yAxis: {
                            title: {
                                text: 'Value'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name + '</b><br/>' +
                                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                                    Highcharts.numberFormat(this.y, 2);
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        exporting: {
                            enabled: false
                        },
                        series: [{
                            name: 'Random data',
                            data: (function () {
                                // generate an array of random data
                                var data = [],
                                    time = (new Date()).getTime(),
                                    i;

                                for (i = -19; i <= 0; i += 1) {
                                    data.push({
                                        x: time + i * 1000,
                                        y: Math.random()
                                    });
                                }
                                return data;
                            }())
                        },
                        {
                            name: 'Random data',
                            data: (function () {
                                // generate an array of random data
                                var data = [],
                                    time = (new Date()).getTime(),
                                    i;

                                for (i = -19; i <= 0; i += 1) {
                                    data.push({
                                        x: time + i * 1000,
                                        y: Math.random()
                                    });
                                }
                                return data;
                            }())
                        }]
                    });

                    Highcharts.chart('two' + i + '', {
                        chart: {
                            type: 'spline',
                            animation: Highcharts.svg, // don't animate in old IE
                            marginRight: 10,
                            events: {
                                load: function () {

                                    // set up the updating of the chart each second
                                    var series = this.series[0];
                                    setInterval(function () {
                                        var x = (new Date()).getTime(), // current time
                                            y = serverObject.temperature;
                                        series.addPoint([x, y], true, true);
                                    }, 1000);
                                }
                            }
                        },
                        title: {
                            text: ''
                        },
                        xAxis: {
                            type: 'datetime',
                            tickPixelInterval: 150
                        },
                        yAxis: {
                            title: {
                                text: 'Value'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name + '</b><br/>' +
                                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                                    Highcharts.numberFormat(this.y, 2);
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        exporting: {
                            enabled: false
                        },
                        series: [{
                            name: 'Random data',
                            data: (function () {
                                // generate an array of random data
                                var data = [],
                                    time = (new Date()).getTime(),
                                    i;

                                for (i = -19; i <= 0; i += 1) {
                                    data.push({
                                        x: time + i * 1000,
                                        y: Math.random()
                                    });
                                }
                                return data;
                            }())
                        }]
                    });

                    Highcharts.chart('three' + i + '', {
                        chart: {
                            type: 'spline',
                            animation: Highcharts.svg, // don't animate in old IE
                            marginRight: 10,
                            events: {
                                load: function () {

                                    // set up the updating of the chart each second
                                    var series = this.series[0];
                                    setInterval(function () {
                                        var x = (new Date()).getTime(), // current time
                                            y = serverObject.hydration;
                                        series.addPoint([x, y], true, true);
                                    }, 1000);
                                }
                            }
                        },
                        title: {
                            text: ''
                        },
                        xAxis: {
                            type: 'datetime',
                            tickPixelInterval: 150
                        },
                        yAxis: {
                            title: {
                                text: 'Value'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name + '</b><br/>' +
                                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                                    Highcharts.numberFormat(this.y, 2);
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        exporting: {
                            enabled: false
                        },
                        series: [{
                            name: 'Random data',
                            data: (function () {
                                // generate an array of random data
                                var data = [],
                                    time = (new Date()).getTime(),
                                    i;

                                for (i = -19; i <= 0; i += 1) {
                                    data.push({
                                        x: time + i * 1000,
                                        y: Math.random()
                                    });
                                }
                                return data;
                            }())
                        }]
                    });

                    Highcharts.chart('four' + i + '', {
                        chart: {
                            type: 'spline',
                            animation: Highcharts.svg, // don't animate in old IE
                            marginRight: 10,
                            events: {
                                load: function () {

                                    // set up the updating of the chart each second
                                    var series = this.series[0];
                                    setInterval(function () {
                                        var x = (new Date()).getTime(), // current time
                                            y = serverObject.glucose;
                                        series.addPoint([x, y], true, true);
                                    }, 1000);
                                }
                            }
                        },
                        title: {
                            text: ''
                        },
                        xAxis: {
                            type: 'datetime',
                            tickPixelInterval: 150
                        },
                        yAxis: {
                            title: {
                                text: 'Value'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name + '</b><br/>' +
                                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                                    Highcharts.numberFormat(this.y, 2);
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        exporting: {
                            enabled: false
                        },
                        series: [{
                            name: 'Random data',
                            data: (function () {
                                // generate an array of random data
                                var data = [],
                                    time = (new Date()).getTime(),
                                    i;

                                for (i = -19; i <= 0; i += 1) {
                                    data.push({
                                        x: time + i * 1000,
                                        y: Math.random()
                                    });
                                }
                                return data;
                            }())
                        }]
                    });


            ///---MEDICATION ---///
                    $('#checkOne' + i).change(function () {
                        if ($(this).is(':checked')) {
                            $('button[id^="medicationOne"]').show();
                            $('div[id^="one"]').show();
                        } else {
                            $('div[id^="one"]').hide();
                            $('button[id^="medicationOne"]').hide();
                        }
                    });

                    $('#checkTwo' + i).change(function () {
                        if ($(this).is(':checked')) {
                            $('button[id^="medicationTwo"]').show();
                            $('div[id^="two"]').show();
                        } else {
                            $('button[id^="medicationTwo"]').hide();
                            $('div[id^="two"]').hide();
                        }
                    });

                    $('#checkThree' + i).change(function () {
                        if ($(this).is(':checked')) {
                            $('button[id^="medicationThree"]').show();
                            $('div[id^="three"]').show();
                        } else {
                            $('button[id^="medicationThree"]').hide();
                            $('div[id^="three"]').hide();
                        }
                    });

                    $('#checkFour' + i).change(function () {
                        if ($(this).is(':checked')) {
                            $('button[id^="medicationFour"]').show();
                            $('div[id^="four"]').show();
                        } else {
                            $('button[id^="medicationFour"]').hide();
                            $('div[id^="four"]').hide();
                        }
                    });

                }

            };
            $(document).ready(paginationHandler);
        }
    };


});
