import React, { useRef, useEffect } from 'react';
import './AreaChart.css';
import { select, curveCardinal, area, scalePoint, scaleLinear, axisBottom, stack, line } from "d3";

const AreaChart = ({ graphData }) => {
  const divRef = useRef();

  const scores = graphData.map((each) => each.score);

  const points = [];

  graphData.forEach((item) => points.push([item.date , item.score]))

  console.log(points);

  useEffect(() => {
    const elem = select(divRef.current);
    elem.select("svg").remove();

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
    
    const svg = elem.append("svg").attr('width', '100%').attr('height', '380px');

    console.log(svg);
    
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "grad")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");
    
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
      .enter()
      .append("path")
      .join("path")
      .style("fill", "url(#grad)")
      .attr("class", "area")
      .attr("d", areaGenerator)
      .attr("transform", "translate(10, 30)");
    
    svg
      .selectAll(".line")
      .data(layer)
      .enter()
      .append("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "#0071c5")
      .attr("stroke-width", 1.5)
      .attr("transform", "translate(10, 30)")
      .attr("d", lineGenerator);
    
    const g = svg
      .selectAll(".myCircle")
      .data(points)
      .enter()
      .append("g")
      .attr("transform", "translate(10, 30)");
    
    g
      .append('circle')
      .attr('class', 'myCircle')
      .attr("fill", "#0071c5")
      .attr("stroke", "white")
      .attr("stroke-width", 3)
      .attr("r", 7)
      .attr("cx", (item) => xScale(item[0]))
      .attr("cy", (item) => yScale(item[1]));
      
    g.append("text")
      .attr("class", "text")
      .attr('fill', '#555555')
      .attr("y", (item) => yScale(item[1]) -15)
      .attr("dx", (item) => xScale(item[0]) - 6)
      .text((item) => `${item[1]}%`);
    
    const xAxis = axisBottom(xScale);
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("color", "#555555")
      .attr("transform", "translate(10, 220)")
      .call(xAxis);
    
  }, [graphData, points, scores]);

  return (
    <div ref={divRef} className="area-chart">
    </div>
  );
};

export default AreaChart;
