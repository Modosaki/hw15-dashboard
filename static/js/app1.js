 




function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    console.log("begining",sample);
    var url=`/metadata/${sample}`;
    var panel = d3.select("#sample-metadata"); 
    panel.html("").append('ul');
    
    
    d3.json(url).then(function(res) {
    var SampleMetaData = res;
    console.log(SampleMetaData);
    console.log(url);
    // Use d3 to select the panel with id of `#sample-metadata`
                      
    

    // Use `.html("") to clear any existing metadata
   

    // Use `Object.entries` to add each key and value pair to the panel
    for (key in SampleMetaData) {panel.append("li").text(`${key} : ${SampleMetaData[key]}`)};
    
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
    });};

function buildCharts(sample) {
  console.log("bulid",sample);
  var url=`/samples/${sample}`; 
  console.log(url);
  d3.json(url).then(function(SampleData) { 
  
    
    // @TODO: Build a Bubble Chart using the sample data

    var layout1 = {
      title: "bubble Chart",
      showlegend: false,
      height: 500,
      width: 1200
    };

    trace1 = {
        y: SampleData.sample_values,
        x: SampleData.otu_ids,
        text: SampleData.otu_labels,
        mode: 'markers',
        marker: { size: SampleData.sample_values,color: SampleData.otu_ids}
    }
  
    Plotly.newPlot("bubble", [trace1], layout1);        
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var layout = {
      title: `Sample ${sample}`,
      showlegend: true,
      height: 500,

    };   
          
        trace2 = {type: 'pie',
        values: SampleData.sample_values.slice(0, 10),
        labels: SampleData.otu_ids.slice(0, 10),
        hovertext: SampleData.otu_labels.slice(0, 10),
      }
    Plotly.newPlot("pie", [trace2], layout);
});

};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log(firstSample);
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
