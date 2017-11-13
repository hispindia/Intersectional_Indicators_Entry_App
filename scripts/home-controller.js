/**
 * Created by Wasib on 08/08/17.
 */
msfReportsApp.controller('homeController', function( $rootScope,$scope,$timeout,MetadataService ){

    jQuery(document).ready(function () {
        hideLoad();
    })
    $timeout(function(){
        $scope.date = {};
        $scope.date.startDate = new Date();
        $scope.date.endDate = new Date();
    },0);

//initially load tree
    selection.load();

// Listen for OU changes
    selection.setListenerFunction(function(){
//getAllPrograms();
        $scope.selectedOrgUnitUid = selection.getSelected();
        loadPrograms();
    },false);

    loadPrograms = function(){
        MetadataService.getOrgUnit($scope.selectedOrgUnitUid).then(function(orgUnit){
            $timeout(function(){
                $scope.selectedOrgUnit = orgUnit;
                $scope.programs=[];
                $scope.programs1=[];

                for(var i=0;i<orgUnit.dataSets.length;i++)
                {
                    $scope.programs.push(orgUnit.dataSets[i]);          
                }
                for(var i=0;i<orgUnit.programs.length;i++)
                {
                    var prog=orgUnit.programs[i];
                  //   prog_id =  orgUnit.programs[i].id;
                        $scope.programs1.push(prog);
                }

            });
        });
    }

    $scope.getAllPrograms = function(selectedProgram){

         prog_id = $scope.selectedProgram.name.id;

         /*$.getJSON("../../programs/"+prog_id+"/programStages.json?fields=*&paging=false", function (data) {
             $scope.programStages=[];
             for(var j=0;j<data.programStages.length;j++)
            {
                var progst=data.programStages[j];
              //  progst_id =data.programStages[j].id;
                $scope.programStages.push(progst);        
            } 
        });*/

    }
    /*$scope.getDataSets = function(selectedProgram)
    {
         $scope.DataSet=selectedProgram.id;
        generatePeriods($scope.DataSet);
    };*/


    submit = function (startDate,endDate,prvenddate) {

        if(prvenddate == '' || prvenddate == null ||endDate == '' || endDate == null)
        {
            alert("Period not selected correctly! Please select again!");
            location.reload(true);
        }

        var selectedorgunit=  $scope.selectedOrgUnit.id;

            $.ajax({
        async : false,
        type: "GET",       
        url: "../../enrollments.json?ou=whyvO0tfUog&ouMode=DESCENDANTS&program="+prog_id+"&skipPaging=true&programEndDate="+endDate,
        success: function(data){				
             totalevent = data.enrollments.length;
            }
            });

             $.ajax({
        async : false,
        type: "GET",     
        url: "../../events.json?orgUnit=whyvO0tfUog&ouMode=DESCENDANTS&program="+prog_id+"&programStage=Kr60c8j7vMe&skipPaging=true&endDate="+prvenddate,
        success: function(data){				
            totalEndevent = data.events.length;
            }
            });

             activeatendevent = parseInt(totalevent) - parseInt(totalEndevent);

             document.getElementById("totaleventcount").value= totalevent;
             document.getElementById("endeventcount").value = activeatendevent;

    };

        submit2 = function (startDate,endDate,prvenddate) {

        if(prvenddate == '' || prvenddate == null ||endDate == '' || endDate == null)
        {
            alert("Period not selected correctly! Please select again!");
            location.reload(true);
        }

        var selectedorgunit=  $scope.selectedOrgUnit.id;
        var tei=[],lefttei=[],newarray=[];
        var count1=0,count2=0,count3=0;


            $.ajax({
        async : false,
        type: "GET",       
        url: "../../enrollments.json?ou=whyvO0tfUog&ouMode=DESCENDANTS&program="+prog_id+"&skipPaging=true&programEndDate="+endDate,
        success: function(data){
            for(var i=0;i<data.enrollments.length;i++)
            {				
             tei.push(data.enrollments[i].trackedEntityInstance);
            }
            }
            });

             $.ajax({
        async : false,
        type: "GET",     
        url: "../../events.json?fields=program,event,programStage,trackedEntityInstance,eventDate,dataValues=[dataElement,value]&orgUnit=whyvO0tfUog&ouMode=DESCENDANTS&program="+prog_id+"&programStage=kwXu1zEDMEe&skipPaging=true&endDate="+endDate,
        success: function(data){
            for(var j=0;j<data.events.length;j++)
            {
                for (var j2=0;j2<tei.length;j2++)
                {				
             if(data.events[j].trackedEntityInstance == tei[j2])
             {
                 for(var i1=0;i1<data.events[j].dataValues.length;i1++)
                 {
                     if(((data.events[j].dataValues[i1].dataElement == 'rwDJebu16Fu') && (data.events[j].dataValues[i1].value == 'Newly_diagnosed' || 'Previously_diagnosed')) || ((data.events[j].dataValues[i1].dataElement == 'nwFajZjl3Fa') && (data.events[j].dataValues[i1].value == 'Newly_diagnosed' || 'Previously_diagnosed')))
                     {
                         count1++;
                         lefttei.push(data.events[j].trackedEntityInstance);
                     }
                 }
             }
            }
            }     
            }
        });

        /*for (var j2=0;j2<tei.length;j2++)
        {
            var selectedtei = tei[j2];
        for (var j3=0;j3<lefttei.length;j3++)
            {  
                var nexttei = lefttei[j3];
        if(selectedtei.indexOf(nexttei) > -1) {
            console.log("matched");
                }
                else{	
            newarray.push(selectedtei);
                }
            }
        }*/

        jQuery.grep(tei, function(el) {
        if (jQuery.inArray(el, lefttei) == -1) newarray.push(el);
        });

       
        $.ajax({
        async : false,
        type: "GET",     
        url: "../../events.json?fields=program,event,programStage,trackedEntityInstance,eventDate,dataValues=[dataElement,value]&orgUnit=whyvO0tfUog&ouMode=DESCENDANTS&program="+prog_id+"&programStage=HvBZokNtaEZ&skipPaging=true&endDate="+endDate,
        success: function(data){
            for(var j=0;j<data.events.length;j++)
            {
            for (var j4=0;j4<newarray.length;j4++)
              {				
             if(data.events[j].trackedEntityInstance == newarray[j4])
               {				
                 for(var i1=0;i1<data.events[j].dataValues.length;i1++)
                 {
                     if(((data.events[j].dataValues[i1].dataElement == 'lzBg6QalyhT') && (data.events[j].dataValues[i1].value == 'Newly_diagnosed' || 'Previously_diagnosed')) || ((data.events[j].dataValues[i1].dataElement == 'uoVoakOJULl') && (data.events[j].dataValues[i1].value == 'Newly_diagnosed' || 'Previously_diagnosed')))
                     {
                         count2++;
                     }
                 }
             }
                }
            }     
            }
            });

            totalcount =  parseInt(count1) +  parseInt(count2);

             $.ajax({
        async : false,
        type: "GET",     
        url: "../../events.json?fields=program,event,programStage,trackedEntityInstance,eventDate,dataValues=[dataElement,value]&orgUnit=whyvO0tfUog&ouMode=DESCENDANTS&program="+prog_id+"&programStage=Kr60c8j7vMe&skipPaging=true&endDate="+prvenddate,
        success: function(data){				
            for(var j=0;j<data.events.length;j++)
            {
                for (var j2=0;j2<tei.length;j2++)
                {				
             if(data.events[j].trackedEntityInstance == tei[j2])
             {
                 for(var i1=0;i1<data.events[j].dataValues.length;i1++)
                 {
                     if(((data.events[j].dataValues[i1].dataElement == 'rwDJebu16Fu') && (data.events[j].dataValues[i1].value == 'Newly_diagnosed' || 'Previously_diagnosed')) || ((data.events[j].dataValues[i1].dataElement == 'nwFajZjl3Fa') && (data.events[j].dataValues[i1].value == 'Newly_diagnosed' || 'Previously_diagnosed')) || ((data.events[j].dataValues[i1].dataElement == 'lzBg6QalyhT') && (data.events[j].dataValues[i1].value == 'Newly_diagnosed' || 'Previously_diagnosed')) || ((data.events[j].dataValues[i1].dataElement == 'uoVoakOJULl') && (data.events[j].dataValues[i1].value == 'Newly_diagnosed' || 'Previously_diagnosed')))
                     {
                         count3++;
                     }
                 }
             }
            }
            }     
            }
            });

             activediabetesatendevent = parseInt(totalcount) - parseInt(count3);

             document.getElementById("totaleventcount").value= totalcount;
             document.getElementById("endeventcount").value = activediabetesatendevent;

        };

        pushdata = function()
        {
            var selectedorgunit=  $scope.selectedOrgUnit.id;

            if(typeof period != 'undefined' && typeof periodquaterly == 'undefined' && typeof periodhalfyearly == 'undefined') 
            {

                 ///////////Monthly Push/////////////////
                var dataValueSet =  {
                "dataSet": "dKQvkruMnqN",
                "period": period,
                "orgUnit": selectedorgunit,
                "dataValues": [
                    { "dataElement": "FpohPnnYy3K", "categoryOptionCombo": "HllvX50cXC0", "period": period,
                    "orgUnit": selectedorgunit, "value": totalevent },

                    { "dataElement": "F5xG6cIiRIu", "categoryOptionCombo": "HllvX50cXC0", "period": period,
                    "orgUnit": selectedorgunit, "value": activeatendevent },
                ]
                };
                $.ajax( {
                    async: false,
                    type: 'post',
                    dataType: 'json',
                    contentType: "application/json",
                    url: '../../dataValueSets',
                    data:JSON.stringify(dataValueSet),
                    success: function (response) {
                                alert("Successfully pushed into monthly datavalues");
                            },
                            warning: function (response) {
                                alert("Warning!");
                            },
                            error: function (response) {
                                alert("ERROR")
                            }
                } );
                 location.reload(true);

            } 
            else if(typeof period == 'undefined' && typeof periodquaterly != 'undefined' && typeof periodhalfyearly == 'undefined')
            {
                ///////////Quaterly Push/////////////////
                var dataValueSet =  {
                "dataSet": "tJ1JJ1o7gkj",
                "period": periodquaterly,
                "orgUnit": selectedorgunit,
                "dataValues": [
                    { "dataElement": "aq7DkdlAKch", "categoryOptionCombo": "HllvX50cXC0", "period": periodquaterly,
                    "orgUnit": selectedorgunit, "value": totalevent },

                    { "dataElement": "JxOwlo5l4Is", "categoryOptionCombo": "HllvX50cXC0", "period": periodquaterly,
                    "orgUnit": selectedorgunit, "value": activeatendevent },
                ]
                };
                $.ajax( {
                    async: false,
                    type: 'post',
                    dataType: 'json',
                    contentType: "application/json",
                    url: '../../dataValueSets',
                    data:JSON.stringify(dataValueSet),
                    success: function (response) {
                                alert("Successfully pushed into quaterly datavalues");
                            },
                            warning: function (response) {
                                alert("Warning!");
                            },
                            error: function (response) {
                                alert("ERROR")
                            }
                } );

                 location.reload(true);
            }
            else if(typeof period == 'undefined' && typeof periodquaterly == 'undefined' && typeof periodhalfyearly != 'undefined')
            {
                ///////////Half-Yearly Push/////////////////
                var dataValueSet =  {
                "dataSet": "wAxJrkShdmv",
                "period": periodhalfyearly,
                "orgUnit": selectedorgunit,
                "dataValues": [
                    { "dataElement": "Jjq1PjY9Vc1", "categoryOptionCombo": "HllvX50cXC0", "period": periodhalfyearly,
                    "orgUnit": selectedorgunit, "value": totalevent },

                    { "dataElement": "AmQtewkq7FV", "categoryOptionCombo": "HllvX50cXC0", "period": periodhalfyearly,
                    "orgUnit": selectedorgunit, "value": activeatendevent },
                ]
                };
                $.ajax( {
                    async: false,
                    type: 'post',
                    dataType: 'json',
                    contentType: "application/json",
                    url: '../../dataValueSets',
                    data:JSON.stringify(dataValueSet),
                    success: function (response) {
                                alert("Successfully pushed into half-yearly datavalues");
                            },
                            warning: function (response) {
                                alert("Warning!");
                            },
                            error: function (response) {
                               alert("ERROR")
                            }
                } );

                 location.reload(true);
            }
            else
            {
                 ///////////Annually Push/////////////////
                var dataValueSet =  {
                "dataSet": "b0xqa3vYEJQ",
                "period": valueyear,
                "orgUnit": selectedorgunit,
                "dataValues": [
                    { "dataElement": "i3W6B2qYgCH", "categoryOptionCombo": "HllvX50cXC0", "period": valueyear,
                    "orgUnit": selectedorgunit, "value": totalevent },

                    { "dataElement": "DlmGUkNuKxI", "categoryOptionCombo": "HllvX50cXC0", "period": valueyear,
                    "orgUnit": selectedorgunit, "value": activeatendevent },
                ]
                };
                $.ajax( {
                    async: false,
                    type: 'post',
                    dataType: 'json',
                    contentType: "application/json",
                    url: '../../dataValueSets',
                    data:JSON.stringify(dataValueSet),
                    success: function (response) {
                                alert("Successfully pushed into annually datavalues");
                            },
                            warning: function (response) {
                                alert("Warning!");
                            },
                            error: function (response) {
                                alert("ERROR")
                            }
                } );

                 location.reload(true);
            }   
        };

        pushdata2 = function()
        {
            var selectedorgunit=  $scope.selectedOrgUnit.id;

            if(typeof period != 'undefined' && typeof periodquaterly == 'undefined' && typeof periodhalfyearly == 'undefined') 
            {

                 ///////////Monthly Push/////////////////
                var dataValueSet =  {
                "dataSet": "dKQvkruMnqN",
                "period": period,
                "orgUnit": selectedorgunit,
                "dataValues": [
                    { "dataElement": "eb7gYbLnb0c", "categoryOptionCombo": "HllvX50cXC0", "period": period,
                    "orgUnit": selectedorgunit, "value": totalcount },

                    { "dataElement": "f5y7pBokqDK", "categoryOptionCombo": "HllvX50cXC0", "period": period,
                    "orgUnit": selectedorgunit, "value": activediabetesatendevent },
                ]
                };
                $.ajax( {
                    async: false,
                    type: 'post',
                    dataType: 'json',
                    contentType: "application/json",
                    url: '../../dataValueSets',
                    data:JSON.stringify(dataValueSet),
                    success: function (response) {
                                alert("Successfully pushed into monthly datavalues");
                            },
                            warning: function (response) {
                                alert("Warning!");
                            },
                            error: function (response) {
                                alert("ERROR")
                            }
                } );
                 location.reload(true);

            } 
            else if(typeof period == 'undefined' && typeof periodquaterly != 'undefined' && typeof periodhalfyearly == 'undefined')
            {
                ///////////Quaterly Push/////////////////
                var dataValueSet =  {
                "dataSet": "tJ1JJ1o7gkj",
                "period": periodquaterly,
                "orgUnit": selectedorgunit,
                "dataValues": [
                    { "dataElement": "RwjzS55LoCr", "categoryOptionCombo": "HllvX50cXC0", "period": periodquaterly,
                    "orgUnit": selectedorgunit, "value": totalcount },

                    { "dataElement": "tOAq4TxuIPQ", "categoryOptionCombo": "HllvX50cXC0", "period": periodquaterly,
                    "orgUnit": selectedorgunit, "value": activediabetesatendevent },
                ]
                };
                $.ajax( {
                    async: false,
                    type: 'post',
                    dataType: 'json',
                    contentType: "application/json",
                    url: '../../dataValueSets',
                    data:JSON.stringify(dataValueSet),
                    success: function (response) {
                                alert("Successfully pushed into quaterly datavalues");
                            },
                            warning: function (response) {
                                alert("Warning!");
                            },
                            error: function (response) {
                                alert("ERROR")
                            }
                } );

                 location.reload(true);
            }
            else if(typeof period == 'undefined' && typeof periodquaterly == 'undefined' && typeof periodhalfyearly != 'undefined')
            {
                ///////////Half-Yearly Push/////////////////
                var dataValueSet =  {
                "dataSet": "wAxJrkShdmv",
                "period": periodhalfyearly,
                "orgUnit": selectedorgunit,
                "dataValues": [
                    { "dataElement": "Ox9zaU3HQnl", "categoryOptionCombo": "HllvX50cXC0", "period": periodhalfyearly,
                    "orgUnit": selectedorgunit, "value": totalcount },

                    { "dataElement": "zpcHke4EAEo", "categoryOptionCombo": "HllvX50cXC0", "period": periodhalfyearly,
                    "orgUnit": selectedorgunit, "value": activediabetesatendevent },
                ]
                };
                $.ajax( {
                    async: false,
                    type: 'post',
                    dataType: 'json',
                    contentType: "application/json",
                    url: '../../dataValueSets',
                    data:JSON.stringify(dataValueSet),
                    success: function (response) {
                                alert("Successfully pushed into half-yearly datavalues");
                            },
                            warning: function (response) {
                                alert("Warning!");
                            },
                            error: function (response) {
                               alert("ERROR")
                            }
                } );

                 location.reload(true);
            }
            else
            {
                 ///////////Annually Push/////////////////
                var dataValueSet =  {
                "dataSet": "b0xqa3vYEJQ",
                "period": valueyear,
                "orgUnit": selectedorgunit,
                "dataValues": [
                    { "dataElement": "AyUpwXknrQx", "categoryOptionCombo": "HllvX50cXC0", "period": valueyear,
                    "orgUnit": selectedorgunit, "value": totalcount },

                    { "dataElement": "EwTrI7P5ao9", "categoryOptionCombo": "HllvX50cXC0", "period": valueyear,
                    "orgUnit": selectedorgunit, "value": activediabetesatendevent },
                ]
                };
                $.ajax( {
                    async: false,
                    type: 'post',
                    dataType: 'json',
                    contentType: "application/json",
                    url: '../../dataValueSets',
                    data:JSON.stringify(dataValueSet),
                    success: function (response) {
                                alert("Successfully pushed into annually datavalues");
                            },
                            warning: function (response) {
                                alert("Warning!");
                            },
                            error: function (response) {
                                alert("ERROR")
                            }
                } );

                 location.reload(true);
            }   
        };
        
        $scope.changeIt = function () {
              var value = document.getElementById("selection").value;

            if (value == 1) { 
            var newSelect = "<div id='subdiv'><table class='table table-borderless table-striped'><tr><td>Select Month :</td><td><select id='select1' style='width: 258px !important;' onchange='changeIt1()' class='form-control'></select></td></tr></table></div>";

                var check = document.getElementById('select1');
                if(check == "" || check == null)
                    {
                    $('#mainDiv1').append(newSelect); 
                    var select1options = "<option value='0'>Select Month:</option><option value='1'>January</option><option value='2'>February</option><option value='3'>March</option><option value='4'>April</option><option value='5'>May</option><option value='6'>June</option><option value='7'>July</option><option value='8'>August</option><option value='9'>September</option><option value='10'>October</option><option value='11'>November</option><option value='12'>December</option>";
                    $('#select1').empty().append(select1options);      
                    }
                else{       
                    var select1options = "<option value='0'>Select Month</option><option value='1'>January</option><option value='2'>February</option><option value='3'>March</option><option value='4'>April</option><option value='5'>May</option><option value='6'>June</option><option value='7'>July</option><option value='8'>August</option><option value='9'>September</option><option value='10'>October</option><option value='11'>November</option><option value='12'>December</option>";
                    $('#select1').empty().append(select1options);               
                }
            }
                      
            else if (value == 2) {
                var newSelect = "<div id='subdiv'><table class='table table-borderless table-striped'><tr><td>Select Month :</td><td><select id='select1' style='width: 258px !important;' onchange='changeIt2()'  class='form-control'></select></td></tr></table></div>";

                var check = document.getElementById('select1');
                if(check == "" || check == null )
                    {
                    $('#mainDiv1').append(newSelect);
                    var select1options = "<option value='0'>Select Month</option><option value='1'>January - March</option><option value='2'>April - June</option><option value='3'>July - September</option><option value='4'>October - December</option>";
                    $('#select1').empty().append(select1options);                
                    }
                else{
                    var select1options = "<option value='0'>Select Month</option><option value='1'>January - March</option><option value='2'>April - June</option><option value='3'>July - September</option><option value='4'>October - December</option>";
                    $('#select1').empty().append(select1options);    
                }
            } 

            else if (value == 3) {
                var newSelect = "<div id='subdiv'><table class='table table-borderless table-striped'><td>Select Month :</td><td><select id='select1' style='width: 258px !important;' onchange='changeIt3()' class='form-control'></select></td></tr></table></div>";

                var check = document.getElementById('select1');
                if(check == "" || check == null )
                    {
                    $('#mainDiv1').append(newSelect);
                    var select1options = "<option value='0'>Select Month</option><option value='1'>January - June</option><option value='2'>July - December</option>";
                    $('#select1').empty().append(select1options);
                }
                else{
                    var select1options = "<option value='0'>Select Month</option><option value='1'>January - June</option><option value='2'>July - December</option>";
                    $('#select1').empty().append(select1options);  
                }
            }
            else if (value == 4) {
                    
                 $('#subdiv').remove();                 
                    changeIt4();        
            }
            else{
                $('#subdiv').remove();
            }

        };
        
         changeIt1 = function(){

                    var valueyear = document.getElementById("select2").value;
                    var valuemonth = document.getElementById("select1").value;
                    if(valuemonth == '1') {
                        startDate = valueyear+"-01-01";
                        endDate = valueyear+"-01-31";
                        prvyear = parseInt(valueyear) - 1;
                        prvenddate =prvyear+"-12-31";
                    }else if(valuemonth == '2') {
                        startDate = valueyear+"-02-01";
                        endDate = valueyear+"-02-28";
                        prvenddate = valueyear+"-01-31";
                    }else if(valuemonth == '3') {
                        startDate = valueyear+"-03-01";
                        endDate = valueyear+"-03-31";
                        prvenddate  = valueyear+"-02-28";
                    }if(valuemonth == '4') {
                        startDate = valueyear+"-04-01";
                        endDate = valueyear+"-04-30";
                        prvenddate = valueyear+"-03-31";
                    }else if(valuemonth == '5') {
                        startDate = valueyear+"-05-01";
                        endDate = valueyear+"-05-31";
                        prvenddate = valueyear+"-04-30";
                    }else if(valuemonth == '6') {
                        startDate = valueyear+"-06-01";
                        endDate = valueyear+"-06-30";
                        prvenddate = valueyear+"-05-31";
                    }else if(valuemonth == '7') {
                        startDate = valueyear+"-07-01";
                        endDate = valueyear+"-07-31";
                        prvenddate = valueyear+"-06-30";
                    }else if(valuemonth == '8') {
                        startDate = valueyear+"-08-01";
                        endDate = valueyear+"-08-31";
                        prvenddate = valueyear+"-07-31";
                    }else if(valuemonth == '9') {
                        startDate = valueyear+"-09-01";
                        endDate = valueyear+"-09-30";
                        prvenddate = valueyear+"-08-31";
                    }else if(valuemonth == '10') {
                        startDate = valueyear+"-10-01";
                        endDate = valueyear+"-10-31";
                        prvenddate = valueyear+"-09-30";
                    }else if(valuemonth == '11') {
                        startDate = valueyear+"-11-01";
                        endDate = valueyear+"-11-30";
                        prvenddate = valueyear+"-10-31";
                    }else if(valuemonth == '12') {
                        startDate = valueyear+"-12-01";
                        endDate = valueyear+"-12-31";
                        prvenddate = valueyear+"-11-30";
                    }
                    selections(startDate,endDate,prvenddate);

                    var periodsplit = startDate.split("-");
                    var year = periodsplit[0];
                    var month = periodsplit[1]
                    period = year+""+month;
        };

         changeIt2 = function()
        {
                    var valueyear = document.getElementById("select2").value;
                    var valuemonth = document.getElementById("select1").value;
                    if(valuemonth == '1') {
                        startDate = valueyear+"-01-01";
                        endDate = valueyear+"-03-31";
                        periodquaterly = valueyear+"Q1";
                        prvyear = parseInt(valueyear) - 1;
                        prvenddate =prvyear+"-12-31";
                    }else if(valuemonth == '2') {
                        startDate = valueyear+"-04-01";
                        endDate = valueyear+"-06-30";
                        periodquaterly = valueyear+"Q2";
                        prvenddate = valueyear+"-03-31";
                    }else if(valuemonth == '3') {
                        startDate = valueyear+"-07-01";
                        endDate = valueyear+"-09-30";
                        periodquaterly = valueyear+"Q3";
                        prvenddate = valueyear+"-06-30";
                    }else if(valuemonth == '4') {
                        startDate = valueyear+"-10-01";
                        endDate = valueyear+"-12-31";
                        periodquaterly = valueyear+"Q4";
                        prvenddate = valueyear+"-09-30";
                    }
                    selections(startDate,endDate,prvenddate);                  
        };

         changeIt3 = function()
        {
                    var valueyear = document.getElementById("select2").value;
                    var valuemonth = document.getElementById("select1").value;
                    if(valuemonth == '1') {
                        startDate = valueyear+"-01-01";
                        endDate = valueyear+"-06-30";
                        periodhalfyearly = valueyear+"S1";
                        prvyear = parseInt(valueyear) - 1;
                        prvenddate =prvyear+"-12-31";
                    }else if(valuemonth == '2') {
                        startDate = valueyear+"-07-01";
                        endDate = valueyear+"-12-31";
                        periodhalfyearly = valueyear+"S2";
                        prvenddate = valueyear+"-06-30";
                    }
                    selections(startDate,endDate,prvenddate);
        };

        changeIt4 = function(){

                valueyear = document.getElementById("select2").value;
                startDate = valueyear+"-01-01";
                endDate = valueyear+"-12-31";
                prvyear = parseInt(valueyear) - 1;
                prvenddate =prvyear+"-12-31";
                
                selections(startDate,endDate,prvenddate);
        };

        /*callsubmit = function(startDate,endDate,prvenddate){

             var newSelect = "<div id='subdiv'><table class='table table-borderless table-striped'><tr><td>Select the required Indicator values</td><td><select id='indicatorSelection' style='width: 258px !important;' onchange='selections(startDate,endDate,prvenddate)' class='form-control'></select></td></tr></table></div>";

                var check = document.getElementById('indicatorSelection');
                if(check == "" || check == null)
                    {
                    $('#mainDiv1').append(newSelect); 
                    var select1options = "<option value='0'>Please Select</option><option value='1'>Active Patient Count</option><option value='2'>Diabetes Patient Count</option>";
                    $('#indicatorSelection').empty().append(select1options);      
                    }
                else{       
                    var select1options = "<option value='0'>Please Select</option><option value='1'>Active Patient Count</option><option value='2'>Diabetes Patient Count</option>";
                    $('#indicatorSelection').empty().append(select1options);               
                }
            
        };*/

        selections = function(startDate,endDate,prvenddate){
            
            var selectedIndicatorcount = document.getElementById("indicatorSelection").value;

            if(selectedIndicatorcount == '1')
            {
            submit(startDate,endDate,prvenddate);
             var newSelect = "<input type='button' style='margin-left: 300px' id='pushdata' class='btn btn-primary' onclick='pushdata()' value='Push Data'>";          
            $('#mainDiv2').empty().append(newSelect); 
                
            }
            else if(selectedIndicatorcount == '2')
            {
            submit2(startDate,endDate,prvenddate);
             var newSelect = "<input type='button' style='margin-left: 300px' id='pushdata' class='btn btn-primary' onclick='pushdata2()' value='Push Data'>";          
            $('#mainDiv2').empty().append(newSelect); 
            }
        }

    function showLoad()
    {
        setTimeout(function(){
        },1000);
    }
    function hideLoad() {

    } 

});
