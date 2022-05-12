import React, { useEffect, useRef, useState } from "react";
import  {
  select,
  scaleBand,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
  html,
  event
} from "d3";
import useResizeObserver from "../useResizeObserver";

const Barchart = ({ data, keys, colors }) => {
    const [view, setView ] = useState({ 'One(green)': 0, 'Two(blue)': 0, 'Three(purple)': 0 })
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    // will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);
        const { width, height } =
        dimensions || wrapperRef.current.getBoundingClientRect();

        // stacks / layers
        const stackGenerator = stack()
        .keys(keys)
        .order(stackOrderAscending);
        const layers = stackGenerator(data);
        const extent = [
        0,
        max(layers, layer => max(layer, sequence => sequence[1]))
        ];

        // scales
        const xScale = scaleBand()
        .domain(data.map(d => d.year))
        .range([0, width])
        .padding(0.25);

        const yScale = scaleLinear()
        .domain(extent)
        .range([height, 0]);

        // axes
        const xAxis = axisBottom(xScale);
        svg
        .select(".x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

        const yAxis = axisLeft(yScale);
        svg.select(".y-axis").call(yAxis);

        // rendering

        select('svg')
        // .style('background-image', 'linear-gradient(to top, rgb(199,199,199), rgb(216, 216, 216) )')
        .style("background", 'transparent')

        select('x-axis')
        .style('color', 'white')

        svg
        .selectAll(".layer")
        .data(layers)
        .join("g")
        .attr("class", "layer")
        .attr("fill", layer => colors[layer.key] )
        // .attr("fill", 'red' )
        .selectAll("rect")
        .data(layer => layer)
        .join("rect")
        .attr("x", sequence => xScale(sequence.data.year))
        .attr("width", xScale.bandwidth())
        .attr("y", sequence => yScale(sequence[1]))
        .attr("height", sequence => yScale(sequence[0]) - yScale(sequence[1]))
        .on('mouseover', function (d, i) {
            select(this).transition()
                 .duration('50')
                 .attr('opacity', '.8') 
                // console.log('d ', d, 'i ', i );
            setView( i.data )
        })
        .on('mouseout', function (d, i) {
            select(this).transition()
                    .duration('50')
                    .attr('opacity', '1') 
                    .attr("fill", layer => colors[layer.key] )
            setView({})
                    
        })
        
    }, [colors, data, dimensions, keys]);

    return (
        <React.Fragment>
        <div ref={wrapperRef} className="barchart" >
            <div className="card-wrapper" >
                {
                    view.one != null ? 
                    <>
                        <p className="p" > 
                            <span className="span one" > One: { view.one } </span> 
                            <span className="span two" > Two: {view.two} </span>  
                            <span className="span three" > Three: {view.three} </span> 
                        </p>
                    
                    </>
                    :
                    null
                }
            </div>
            <svg ref={svgRef} className='svg' >
            <g className="x-axis" />
            <g className="y-axis" />
            </svg>
        </div>
        </React.Fragment>
    );
};

export default Barchart;