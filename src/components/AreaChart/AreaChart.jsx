import React, { useRef, useEffect } from 'react';
import './AreaChart.css';
import { select, curveCardinal, area, scalePoint, scaleLinear, axisBottom, stack, line } from "d3";

const AreaChart = ({ graphData }) => {
  const areaRef = useRef();

  const scores = graphData.map((each) => each.score);

  // const points = [];

  // graphData.forEach((item, idx) => points.push([idx, item.score]))

  // const D = [...graphData]

  // console.log(D);

  useEffect(() => {
    const svg = select(areaRef.current);

    const findMax = scores => {
      const sorted = scores.sort((a, b) => b - a);
      return sorted[0]
    }

    const max = findMax(scores);
    
    const stackGen = stack().keys(["score"]);

    const layer = stackGen(graphData);
    console.log(layer);

    const xScale = scalePoint()
      .domain(graphData.map((d) => d.date))
      .range([0, 350]);
    
    const yScale = scaleLinear()
      .domain([0, max])
      .range([100, 0]);
    
    const areaGenerator = area()
      .x((item) => { console.log(item); return xScale(item.data.date); })
      .y0((item) => yScale(item[0]))
      .y1((item) => yScale(item[1]))
      .curve(curveCardinal)
      .defined(true);
    
    const lineGenerator = line()
      .x((item) => xScale(item.data.date))
      .y((item) => yScale(item[1]))
      .curve(curveCardinal);
    
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "grad")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%")
    
    gradient
      .append("stop")
      .attr("offset", "0%")
      .style("stop-color", "#167dca")
      .style("stop-opacity", 1);
    
    gradient
      .append("stop")
      .attr("offset", "100%")
      .style("stop-color", "#167dca")
      .style("stop-opacity", .3);
    
    svg
      .selectAll(".area")
      .data(layer)
      .join("path")
      .attr("class", "area")
      .style("fill", "url(#grad)")
      // .attr("stroke-linecap", "round")
      // .attr("stroke", "#0071c5")
      // .attr("stroke-width", 1.5)
      .attr("d", areaGenerator)
      .attr("transform", "translate(10, 0)");
    
    svg
      .append("path")
      .data(layer)
      .attr("fill", "none")
      .attr("stroke", "#0071c5")
      .attr('stroke-width', 1.5)
      .attr("transform", "translate(10, 0)")
      .attr('d', lineGenerator);
    
    // svg
    //   .selectAll("circles")
    //   .data(layer)
    //   .enter()
    //   .append('circle')
    //   .attr("fill", "none")
    //   .attr("stroke", "#0071c5")
    //   .attr("stroke-width", 1.5)
    //   .attr('r', 3)
    //   .attr('cx', (item) => xScale(item.data.date))
    //   .attr('cy', (item) => yScale(item[1]));
    
    const xAxis = axisBottom(xScale);
    svg.select('.x-axis')
      .attr('transform', 'translate(10, 120)')
      .call(xAxis);
    
  }, [graphData, scores]);

  return (
    <svg ref={areaRef} width="400px" height="300px">
      <g className="x-axis" />
    </svg>
  );
};

export default AreaChart
