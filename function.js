$(document).ready(function () {

    getCoins();

    $("#searchButton").on("click", function () {
        searchCoin();
    });

    $("#homeNav").on("click", function () {
        getCoins();
    });

    $("#aboutNav").on("click", function () {
        printAbout();
    });

    $("#reportsNav").on("click", function () {
        printReport();
    });

    $(document).on('change', 'input[type="checkbox"]', function () {

        if ($(this).is(":checked")) {
            coinSelect(this.id);
        }
        else if ($(this).is(":not(:checked)")) {
            coinUnSelect(this.id);
        }

    });

    updateInterval = 2000;
    // initial value
    yValue0 = 0;
    yValue1 = 0;
    yValue2 = 0;
    yValue3 = 0;
    yValue4 = 0;


    time = new Date;
    //get this time
    time.setHours(time.getHours());
    time.setMinutes(time.getMinutes());
    time.setSeconds(time.getSeconds());
    time.setMilliseconds(00);

    dataPoints0 = [];
    dataPoints1 = [];
    dataPoints2 = [];
    dataPoints3 = [];
    dataPoints4 = [];

    options = {
        title: {
            text: "Live Reports"
        },
        axisX: {
            title: "chart updates every 2 secs"
        },
        axisY: {
            suffix: " USD",
            includeZero: false
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            fontSize: 22,
            fontColor: "dimGrey",
            itemclick: toggleDataSeries
        },
        data: []

    };

});

selectedCoins = [];

//---------------------------------------------------------------------------------------------------//

function printCoins(data) {
    $("#coins").html("");

    for (var i = 0; i <= 99; i++) {

        let coinCard = $(`<div class='col-md-4 card' id=coin${data[i].id}></div>`);
        let coinSymbol = $(`<div></div>`);
        let coinName = $(`<div></div>`);
        let toggleSelect = $(`<label class="switch"> <input type="checkbox" id ="${data[i].symbol}"> <span class="slider round"></span></label>`);
        let buttonMoreInfo = $(`<button onclick="getDetailsOfCoin('${data[i].id}')" class="btn btn-primary" data-toggle="collapse" aria-expanded="false" aria-controls="moreInfo${data[i].id}" data-target="#moreInfo${data[i].id}" type="button" >More Info</button>`);
        let infoOfCoin = $(`<div class="collapse card-body" id="moreInfo${data[i].id}"><img id="loading${data[i].id}" src = "img/4DWH.gif"></div>`);


        $(`#loading${data[i].id}`).hide();

        $(coinSymbol).text(data[i].symbol)
        $(coinName).text(data[i].name);
        $(coinCard).append(coinSymbol);
        $(coinCard).append(coinName);
        $(coinCard).append(toggleSelect);
        $(coinCard).append(buttonMoreInfo);
        $(coinCard).append(infoOfCoin);
    

        $("#coins").append(coinCard);
    }
    selectedCoinsUpdate(selectedCoins);
}

//---------------------------------------------------------------------------------------------------//

function addDetails(id, data) {
   $(`#loading${id}`).show();
    $(`#moreInfo${id}`).html("");

    var coinImg = $(`<div ><img src=${data.image.small}</div>`)
    var currentPriceUsd = $(`<div ><i class="fas fa-dollar-sign"></i>  ${data.market_data.current_price.usd}</div>`)
    var currentPriceEur = $(`<div ><i class="fas fa-euro-sign"></i>  ${data.market_data.current_price.eur}</div>`)
    var currentPriceIls = $(`<div ><i class="fas fa-shekel-sign"></i>  ${data.market_data.current_price.ils}</div>`)

    $(`#moreInfo${id}`).append(coinImg);
    $(`#moreInfo${id}`).append(currentPriceUsd);
    $(`#moreInfo${id}`).append(currentPriceEur);
    $(`#moreInfo${id}`).append(currentPriceIls);
    $(`#loading${id}`).hide();
}

//---------------------------------------------------------------------------------------------------//

function searchCoin() {
    let searchText = $("#searchField").val();
    $("#coins").html("");
    var c = 0;
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/list",
        type: "GET", //get array of objects {id: "01coin", symbol: "zoc", name: "01coin"}
        data: {},
        success: function (data, statusText, xhr) {
            console.log("searchCoin API status code: " + xhr.status)
            for (let i = 0; i <= 99; i++) {
                if (data[i].symbol === searchText) {

                    let coinCard = $(`<div class='col-md-4 card' id=coin${data[i].id}></div>`);
                    let coinSymbol = $(`<div></div>`);
                    let coinName = $(`<div></div>`);
                    let toggleSelect = $(`<label class="switch"> <input type="checkbox" id ="${data[i].symbol}"> <span class="slider round"></span></label>`)
                    let buttonMoreInfo = $(`<button onclick="getDetailsOfCoin('${data[i].id}')" class="btn btn-primary" data-toggle="collapse" aria-expanded="false" aria-controls="moreInfo${data[i].id}" data-target="#moreInfo${data[i].id}" type="button" >More Info</button>`);
                    let infoOfCoin = $(`<div class="collapse card-body" id="moreInfo${data[i].id}"></div>`)

                    $(coinSymbol).text(data[i].symbol)
                    $(coinName).text(data[i].name);
                    $(coinCard).append(coinSymbol);
                    $(coinCard).append(coinName);
                    $(coinCard).append(toggleSelect);
                    $(coinCard).append(buttonMoreInfo);
                    $(coinCard).append(infoOfCoin);

                    $("#coins").append(coinCard);
                    c = c + 1;
                }
                selectedCoinsUpdate(selectedCoins);
            }
            if (c == 0) {
                $("#coins").text(searchText + " not found!");
            }
        },
        error: function (xhr) {
            console.log("getCoins API status code: " + xhr.status)
        }
    });
}

//---------------------------------------------------------------------------------------------------//

function printAbout() {
    $("#coins").html("");
    let about = $(`<div class='col-md-12'></div>`);

    let myName = $(`<div></div>`);
    let myProject = $(`<div></div>`);
    let myPic = $(`<div></div>`);

    $(myProject).text("this project dsdsds dsdsds h hghfghfg hfghfg")
    $(myName).html("<h1>Ron Lalum</h1> <br></br><h3>052-4893052</h3><br></br><h3>ron.lalum@Gmail.com</h3>");

    $(about).append(myProject);
    $(about).append(myName);
    $(about).append(myPic);
    $("#coins").append(about);
}

//---------------------------------------------------------------------------------------------------//

function coinSelect(id) {
    if (selectedCoins.length == 5) {
        printPopUp(id);
        $("#popUp,#wrapwer").toggle(500);
    }
    else {
        selectedCoins.push(id);
        console.log(selectedCoins);
        console.log(selectedCoins.length);
    }
}

//---------------------------------------------------------------------------------------------------//

function coinUnSelect(id) {

    for (let i = 0; i < selectedCoins.length; i++) {
        if (id == selectedCoins[i]) {
            selectedCoins.splice(i, 1);
        }
    }
    console.log(selectedCoins);
    console.log(selectedCoins.length);
}

//---------------------------------------------------------------------------------------------------//

function coinUnSelectpopUp(id, id2) {

    for (let i = 0; i < selectedCoins.length; i++) {
        if (id == selectedCoins[i]) {
            selectedCoins.splice(i, 1);
            $(`#${id}`).prop("checked", false);
            $(`#${id2}`).prop("checked", true);
        }
    }
    selectedCoins.push(id2);
    $("#popUp,#wrapwer").toggle(500);
    console.log(selectedCoins);
    console.log(selectedCoins.length);

}

//---------------------------------------------------------------------------------------------------//

function selectedCoinsUpdate(selectedCoins) {

    for (let i = 0; i < selectedCoins.length; i++) {
        $(`#${selectedCoins[i]}`).prop("checked", true);
    }

}

//---------------------------------------------------------------------------------------------------//

function closePop(id) {
    $("#popUp,#wrapwer").toggle(500);
    $(`#${id}`).prop("checked", false);
}

//---------------------------------------------------------------------------------------------------//

function printPopUp(id2) {
    $("#popUp").html("");
    let info = $(`<div></div>`);

    let title = $(`<div></div>`);
    let options = $(`<div></div>`);
    let btn = $(`<div class="btn btn-danger" onclick="closePop('${id2}')">Cancel</div>`);

    for (let i = 0; i < selectedCoins.length; i++) {
        let option = $(`<div></div>`);
        let status = $(`<div></div>`);
        $(option).text(selectedCoins[i]);
        $(status).html(`<label class="switch"> <input type="checkbox" id ="${selectedCoins[i]} " checked onclick="coinUnSelectpopUp('${selectedCoins[i]}' , '${id2}')
        "> <span class="slider round"></span></label>`);
        $(option).append(status);
        $(options).append(option);
    }

    $(title).text("please cancel one")

    $(info).append(title);
    $(info).append(options);
    $(info).append(btn);
    $("#popUp").append(info);

}

//---------------------------------------------------------------------------------------------------//

function printReport() {

    $("#coins").html("");
    options.data = [];
    let myChart = $('<div id="chartContainer" class="col-md-12" style="height: 370px; max-width: 920px; margin: 0px auto;"></div>');
    $("#coins").append(myChart);
    //  getPriceOfCoin(selectedCoins);
    for (let i = 0; i < selectedCoins.length; i++) {
        let obj = {

            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "#.00000 USD",
            xValueFormatString: "hh:mm:ss TT",
            showInLegend: true,
            name: selectedCoins[i],
            dataPoints: window['dataPoints' + i]
        }
        options.data.push(obj);
    }
    chart = $("#chartContainer").CanvasJSChart(options);
    updateChart(100);
    setInterval(function () { updateChart() }, updateInterval);

}

//---------------------------------------------------------------------------------------------------//

function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    }
    else {
        e.dataSeries.visible = true;
    }
    e.chart.render();
}

//---------------------------------------------------------------------------------------------------//

function updateChart() {
    getPriceOfCoin(selectedCoins);

    $("#chartContainer").CanvasJSChart().render();
}

//---------------------------------------------------------------------------------------------------//

function updateValuesToChart(arrOfvalue) {

    time.setTime(time.getTime() + updateInterval);

    for (let i = 0; i < arrOfvalue.length; i++) {
        options.data[i].legendText = options.data[i].name + " : " + window['yValue' + i] + " USD";
        console.log(options.data[i]);
    }

}

//API Request
//---------------------------------------------------------------------------------------------------//

function getCoins() {
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/list",
        type: "GET", //get array of objects {id: "01coin", symbol: "zoc", name: "01coin"}
        data: {},
        success: function (data, statusText, xhr) {
            console.log("getCoins API status code: " + xhr.status)
            console.table(data);
            printCoins(data);
        },
        error: function (xhr) {
            console.log("getCoins API status code: " + xhr.status)


        }
    });
}

//---------------------------------------------------------------------------------------------------//

function getDetailsOfCoin(id) {

    $.ajax({

        url: `https://api.coingecko.com/api/v3/coins/${id}`,
        type: "GET",
        data: {},
        success: function (data, statusText, xhr) {
            console.log("DetailsOfCoin API status code: " + xhr.status)
            console.log(data);
            addDetails(id, data);

        },
        error: function (xhr) {
            console.log("DetailsOfCoin API status code: " + xhr.status)


        }
    });
}

//---------------------------------------------------------------------------------------------------//

function getPriceOfCoin(arr) {

    myUrl = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=";
    myStr = "&tsyms=USD"
    for (let i = 0; i < arr.length; i++) {
        let coinStr = arr[i].toUpperCase()
        myUrl = myUrl + coinStr + ",";

    }
    myUrl = myUrl + myStr

    $.ajax({

        url: myUrl,
        type: "GET",
        data: {},
        success: function (ObjOfPrice, statusText, xhr) {
            console.log("getPriceOfCoin API status code: " + xhr.status)
            console.log(ObjOfPrice);
            arrOfvalue = Object.values(ObjOfPrice);
            arrOfKeys = Object.keys(ObjOfPrice);
            console.log(arrOfvalue);
            console.log(arrOfKeys);
            for (let i = 0; i < arrOfvalue.length; i++) {
                window['yValue' + i] = arrOfvalue[i].USD;
                window['dataPoints' + i].push({
                    x: time.getTime(),
                    y: window['yValue' + i]
                });
            }
            updateValuesToChart(arrOfvalue);
        },
        error: function (xhr) {
            console.log("getPriceOfCoin API status code: " + xhr.status)


        }
    });
}

//---------------------------------------------------------------------------------------------------//