import React, { useRef, useEffect } from 'react';
import './AreaChart.css';
import { select, curveCardinal, area, scalePoint, scaleLinear, axisBottom, stack, line } from "d3";

const AreaChart = ({ graphData }) => {
  const areaRef = useRef();

  const scores = graphData.map((each) => each.score);

  const points = [];

  graphData.forEach((item) => points.push([item.date , item.score]))

  console.log(points);

  useEffect(() => {
    const svg = select(areaRef.current);

    const findMax = scores => {
      const sorted = scores.sort((a, b) => b - a);
      return sorted[0]
    }

    const max = findMax(scores);
    
    const stackGen = stack().keys(["score"]);

    const layer = stackGen(graphData);

    const xScale = scalePoint()
      .domain(graphData.map((d) => d.date))
      .range([0, 500]);
    
    const yScale = scaleLinear()
      .domain([0, max])
      .range([175, 0]);
    
    const areaGenerator = area()
      .x((item) => xScale(item.data.date))
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
      .select(".area")
      .data(layer)
      .join("path")
      .style("fill", "url(#grad)")
      .attr("d", areaGenerator)
      .attr("transform", "translate(10, 30)");
    
    svg
      .select(".line")
      .data(layer)
      .attr('class', 'line')
      .attr("fill", "none")
      .attr("stroke", "#0071c5")
      .attr('stroke-width', 1.5)
      .attr("transform", "translate(10, 30)")
      .attr('d', lineGenerator);
    
    svg
      .selectAll("circle")
      .data(points)
      .attr("fill", "#0071c5")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("r", 5)
      .attr("cx", (item) => xScale(item[0]))
      .attr("cy", (item) => yScale(item[1]))
      .attr("transform", "translate(10, 30)");
    
    const g = svg.append('g');
      
    g
      // .selectAll("circle")
      // .append('g')
      .selectAll(".text")
      .data(points)
      .enter()
      .append("text")
      .attr("class", "text")
      // .attr('fill', 'currentColor')
      .attr("y", "10")
      // .attr("dx", (item, idx) => item[0])
      // .attr('x', (item) => item[0])
      //   .attr('y', 10)
      //   // .attr()
      .text((item) => `${item[1]}%`);
    
    const xAxis = axisBottom(xScale);
    svg.select('.x-axis')
      .attr('transform', 'translate(10, 220)')
      .call(xAxis);
    
  }, [graphData, points, scores]);

  return (
    <div className="area-chart">
      <svg ref={ areaRef } width="100%" height="380px">
        <path className="area"/>
        <path className="line"/>
        <circle className="circle">
        <text className="text"/></circle>
        <circle className="circle">
        <text className="text"/></circle>
        <circle className="circle">
        <text className="text"/></circle>
        <circle className="circle">
        <text className="text"/></circle>
        {/* <circle className="circle" />
        <circle className="circle" />
        <circle className="circle" />
        <circle className="circle" /> */}
        <g className="x-axis" />
      </svg>
    </div>
  );
};

export default AreaChart
