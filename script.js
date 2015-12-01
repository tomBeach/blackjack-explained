// ======= ======= ======= init ======= ======= =======
function init() {
    console.log("init");

    var sectionFlag = false;
    var infoFlag = false;
    var prevIndex = 0;
    var nextIndex = 0;
    var scrollStart = 0;
    var prevTextTrigger = 0;
    var nextTextTrigger = 60;
    var gridLoc = $("#gridWindow").offset();
    var gridX = gridLoc.left;
    var gridY = gridLoc.top;
    console.log("  gridX: " + gridX);
    console.log("  gridY: " + gridY);
    var info = $("#info");
    var gridImage = $("#gridWindow");
    var sectionTitle = $(".section-title");
    var scrollTop, infoTextArray, labelTextArray;

    // == window scroll event listener
    $("#scrollWindow").scrollTop(scrollStart);
    $("#scrollWindow").on('scroll', function(event) {
        updateGridText();
    });
    $("#scrollWindow").on('mouseover', function(event) {
        updateInfoText();
    });
    $("#gridWindow").on('mouseover', function(event) {
        infoFlag = false;
    });

    var gridDataArray = [
        { image: "grid1", triggerNext:60,
            section: "The Grid",
            text1: { text: "grid", X:265, Y:280 },
            text2: null
        },
        { image: "grid2", triggerNext:200,
            section: "The Grid",
            text1: { text: "region", X:125, Y:150 },
            text2: null
        },
        { image: "grid3", triggerNext:300,
            section: "The Grid",
            text1: { text: "indexCell", X:100, Y:150 },
            text2: null
        },
        { image: "grid4", triggerNext:330,
            section: "The Grid",
            text1: { text: "width (4 cells)", X:200, Y:150 },
            text2: null
        },
        { image: "grid5", triggerNext:440,
            section: "The Grid",
            text1: { text: "width (4 cells)", X:200, Y:150 },
            text2: { text: "height (3 cells)", X:150, Y:280 }
        },
        { image: "grid6", triggerNext:600,
            section: "The Grid",
            text1: { text: "merged", X:230, Y:150 },
            text2: { text: "unmerged", X:230, Y:270 }
        },
        { image: "grid5", triggerNext:730,
            section: "Spans",
            text1: { text: "colspan", X:230, Y:150 },
            text2: { text: "rowspan", X:150, Y:280 }
        },
        { image: "colspan1", triggerNext:800,
            section: "Spans",
            text1: { text: "colspan (3 cells)", X:90, Y:150 },
            text2: { text: "target location (col 13)", X:350, Y:150 }
        },
        { image: "colspan2", triggerNext:920,
            section: "Spans",
            text1: { text: "colspan (3 cells)", X:90, Y:150 },
            text2: { text: "actual location (col 10)", X:270, Y:150 }
        },
        { image: "colspan2", triggerNext:960,
            section: "Spans",
            text1: { text: "colspan (3 cells)", X:90, Y:150 },
            text2: { text: "'missing' cells if uncorrected", X:400, Y:230 }
        },
        { image: "rowspans7a", triggerNext:1000,
            section: "Spans",
            text1: { text: "region with rowspans", X:120, Y:150 },
            text2: { text: "spanned cells", X:150, Y:230 }
        },
        { image: "rowspans8", triggerNext:1100,
            section: "Spans",
            text1: { text: "spanned cells", X:150, Y:230 },
            text2: { text: "un-affected index cell", X:320, Y:150 }
        },
        { image: "rowspans9", triggerNext:1200,
            section: "Spans",
            text1: { text: "spanned cells", X:150, Y:230 },
            text2: { text: "affected index cell", X:340, Y:280 }
        },
        { image: "rowspans10", triggerNext:1300,
            section: "Spans",
            text1: { text: "rowspan assigned on index cell", X:150, Y:150 },
            text2: { text: "rows affected", X:200, Y:210 }
        },
        { image: "rowspans11", triggerNext:1400,
            section: "Rowspans",
            text1: { text: "initialized false", X:150, Y:230 },
            text2: { text: "{r:5, c:5, rspan:f}", X:200, Y:150 }
        },
        { image: "rowspans12", triggerNext:1600,
            section: "Rowspans",
            text1: { text: "rowspanned cells", X:150, Y:230 },
            text2: { text: "{r:5, c:5, rspan:t}", X:200, Y:150 }
        },
        { image: "rowspans13", triggerNext:1700,
            section: "Rowspans",
            text1: { text: "target rows", X:200, Y:230 },
            text2: null
        },
        { image: "rowspans14", triggerNext:1900,
            section: "Rowspans",
            text1: { text: "merged region", X:150, Y:150 },
            text2: null
        }
    ]

        // ======= ======= ======= updateInfoText ======= ======= =======
        function updateInfoText() {
            console.log("updateInfoText");

            if (infoFlag == false) {
                $(info).html("scroll <span class='hilite'>slowly</span> for descriptions...");
                infoFlag = true;
            }
        }

    // ======= ======= ======= updateGridText ======= ======= =======
    function updateGridText() {
        // console.log("updateGridText");
        // console.log("  next/prevTextTrigger: " + scrollTop + " " + nextTextTrigger + "/" + prevTextTrigger);

        $(info).text("");
        scrollTop = $(scrollWindow).scrollTop() - scrollStart;
        if (sectionFlag == false) {
            $(sectionTitle).text(gridDataArray[nextIndex].section);
            sectionFlag = true;
        }

        if (scrollTop > nextTextTrigger) {
            // console.log("  scrollTop/N/P1: " + scrollTop + " " + nextIndex + "/" + prevIndex);
            if (nextIndex < gridDataArray.length) {
                nextIndex++;
            }
            nextTextTrigger = gridDataArray[nextIndex].triggerNext;
            nextImageSrc = "images/" + gridDataArray[nextIndex].image + ".png";
            $(gridImage).attr("src", nextImageSrc);
            $(sectionTitle).text(gridDataArray[nextIndex].section)
            updateLabels(gridDataArray[nextIndex]);

            prevIndex = nextIndex;
            prevTextTrigger = gridDataArray[prevIndex].triggerNext;

        } else if (scrollTop < prevTextTrigger) {
            // console.log("  scrollTop/N/P1: " + scrollTop + " " + nextIndex + "/" + prevIndex);
            nextIndex = prevIndex;
            nextTextTrigger = gridDataArray[nextIndex].triggerNext;
            nextImageSrc = "images/" + gridDataArray[nextIndex].image + ".png";
            $(gridImage).attr("src", nextImageSrc);
            $(sectionTitle).text(gridDataArray[nextIndex].section)
            updateLabels(gridDataArray[nextIndex]);

            if (prevIndex > 0) {
                prevIndex--;
            } else {
                prevIndex = 0;
            }
            prevTextTrigger = gridDataArray[prevIndex].triggerNext;
        }
    }

    // ======= ======= ======= updateLabels ======= ======= =======
    function updateLabels(gridData) {
        console.log("updateLabels");

        var whichLabel1 = gridData.text1;
        var whichLabel2 = gridData.text2;
        var offsetX = gridX;
        var offsetY = gridY - 125;

        if (whichLabel1) {
            $('#labelText1').text(whichLabel1.text);
            $('#labelText1').css('left', (whichLabel1.X + offsetX));
            $('#labelText1').css('top', (whichLabel1.Y + offsetY));
        } else {
            $('#labelText1').text("");
        }
        if (whichLabel2) {
            $('#labelText2').text(whichLabel2.text);
            $('#labelText2').css('left', (whichLabel2.X + offsetX));
            $('#labelText2').css('top', (whichLabel2.Y + offsetY));
        } else {
            $('#labelText2').text("");
        }
    }

    // ======= ======= ======= initialize ======= ======= =======
    updateLabels(gridDataArray[0]);
}

// ======= ======= ======= ARCHIVE ======= ======= =======


// // ======= ======= ======= initGridImages ======= ======= =======
// function initGridImages() {
//     console.log("initGridImages");
//
//     var scrollWindow = $("#scrollWindow");
//     var gridBaseName = "grid";
//     var gridCount = 14;
//     var imageSrc = "images/";
//     for (var i = 1; i < (gridCount + 1); i++) {
//         nextImage = imageSrc + gridBaseName + i + ".png";
//         imageArray.push(nextImage);
//     }
// }
