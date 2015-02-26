/* Creates a this Chart


Data:

    [
        {
            Name
        },

    ]

*/


d3.this = function (){

    //*************************************************
    // Public Variables loaded with default values
    //*************************************************
    var _width = 500;
    var _height = 500;
    var _colors = [ '#1fbcff', '#ee5a30', '#ff7d00', '#00b800', '#83ce00', '#b0db06', '#2876bc' ];
    var _paddingObject = {
        bottom: 5,
        left: 5,
        right: 5,
        top: 5
    };

    //**********************************************************************************
    // Internal Variables
    //**********************************************************************************
    var __chartWidth;
    var __chartHeight;
    var __firstRun = true;


    function chart(selection){
        selection.each(function (data, i){
            //*************************************************
            // Generate the chart here using the public variables
            //
            // Note: boundData = data bound upon the selection using datum
            //  on the exterier function call
            // Example: in this case d = dataArray
            //  var chart = VSBarChart();
            //
            //  d3.select('svg')
            //    .datum(dataArray)
            //    .call(chart);
            //
            //*************************************************

            var initialNode = d3.select(this);
            //----------------------------------------------------------------------------------
            // You will see this pattern a lot in my code.
            // I'm using d3's enter to ensure that there is only one 'item'. I wrap the data into
            //  an array to ensure that the data only has one item. (even though our actual data is much larger);
            //----------------------------------------------------------------------------------
            var rootNodeWrapper = initialNode.selectAll('.rootNode').data([data]);
            rootNodeWrapper.enter().append('g')
            .attr('class', 'rootNode');
            // .append('rect').style('fill', 'steelblue').attr('height', _height).attr('width', _width).attr('opacity', 0.3);


            var rootNode = initialNode.select('.rootNode')
                .attr('transform', 'translate(' + _paddingObject.left + ',' + _paddingObject.top + ')');

            __chartWidth = _width - _paddingObject.left - _paddingObject.right;
            __chartHeight = _height - _paddingObject.top - _paddingObject.bottom;

            //----------------------------------------------------------------------------------
            // Set __firstRun to false
            //----------------------------------------------------------------------------------
            __firstRun = false;




        });//selection.each()

        

    } //function chart

    //-------------------------------------------------
    // Getters and setters for public variables
    //-------------------------------------------------
    chart.width = function (value){
        if (!arguments.length){
            return _width;
        }
        _width = value;
        return chart;
    };
    chart.colors = function (arrayOfColors){
        if (!arguments.length){
            return _colors;
        }
        _colors = arrayOfColors;
        return chart;
    };
    chart.height = function (value){
        if (!arguments.length){
            return _height;
        }
        _height = value;
        return chart;
    };
    chart.transitions = function (time){
        if (!arguments.length){
            return _transitionTime;
        }
        _transitionTime = time;
        return chart;
    };
    chart.padding = function (newObject){
        if (!arguments.length){
            return _paddingObject;
        }
        _paddingObject = newObject;
        return chart;
    };
    //----------------------------------------------------------------------------------
    // Helper Functions
    //----------------------------------------------------------------------------------



    //**********************************************************************************
    // Final Return (allows method chaining)
    //**********************************************************************************
    return chart;
};

