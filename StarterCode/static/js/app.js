
function buildMetadata(sample) {
//     Access the website and use d3 to operate on the data
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    d3.json(url).then((data) => {
  
//       Filter the data for the object with the desired sample number (the id)
        let metadata = data.metadata;
  
//       Select the panel with id of `#sample-metadata`
        let filterArray = metadata.filter(sampleObj => sampleObj.id == sample)
        let panel = d3.select("#sample-metadata");
        let result = filterArray[0]
//       Clear existing metadata - use `.html("")`
        panel.html("");        
  
//       Append new tags for each key-value in the metadata
        for (key in result){
            panel.append("h6").text(`${key.toUpperCase()}: ${result[key]}`)
        };
  
//       If you want to do the bonus, you can make the gauge chart here
        // buildGauge(result.wfreq)
        // var data = [{
        //     domain: {x: sample.id,
        //          y: sample.wfrequency},
        //     value: sample.wfrequency,
        //     title: {text: "Belly Button Washing Frequency"},
        //     type: "indicator",
        //     mode: "guage+number"

        // }];
        // var layout = {width: 600, height: 500, margin: {t: 0, b: 0 }};
        // Plotly.newPlot('gauge', data, layout)
});  

    };
  
function buildCharts(sample) {
//     // Access the website and use .then to operate on the data
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    d3.json(url).then((data) => {
  
//       // Filter the data for the object with the desired sample number (the id)
        let samples = data.samples;
        filterSamples = samples.filter(sampleObj => sampleObj.id == sample)
        result = filterSamples[0]
        otuIds = result.otu_ids
        otuLabels = result.otu_labels 
  
//       // Pull the desired information (ids, labels, values) from your filtered data
        sampleValues = result.sample_values
  
//       // Build a Bubble Chart
        var trace1 = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {size: sampleValues, color: otuIds}
    
        };
        
        var data = [trace1];

        var layout = {
        title: 'Bacteria Cultures First Sample',
        xaxis: {title: "otu IDs"}
        };

        
        Plotly.newPlot('bubble', data, layout);
//       // Slice the data for your bar chart and order it (you can just use reverse)
        // otuIds.sort((a, b) => b - a);
        let topTen = otuIds.slice(0, 10).reverse()
  
//       // Build a Horizontal Bar Chart
            
            var data = [{
            type: 'bar',
            x: result.sample_values.slice(0,10).reverse(),
            y: topTen.map(id => `OTU ${id}`),
            text: otuLabels.slice(0,10).reverse(),
            orientation: 'h'
        }];
      
        Plotly.newPlot('bar', data)
  
     });
 };
  
function init() {
//     // Get the reference to the dropdown menu
   let selector = d3.select("#selDataset");
  
//     // Use the list of sample names to populate the select options
//     // Do this by pulling the array associated with `names` 
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    d3.json(url).then((data) => {

//       // Loop through the names and append to the dropdown menu
    let idNames = data.names;

    for (let i = 0; i < idNames.length; i ++){

        selector.append("option").text(idNames[i]).property("value", idNames[i])
    
    };  
//       // Use the first sample from the list to build the initial plots
    let firstSample = idNames[0]

    buildMetadata(firstSample)

    buildCharts(firstSample)
    });
//     
};
  
function optionChanged(newSample) {
//     // Change your data and update your plots/metadata when newSample is selected from the dropdown
  buildCharts(newSample)
  buildMetadata(newSample)
  
//   }
  
//   // Initialize the dashboard

}

init();