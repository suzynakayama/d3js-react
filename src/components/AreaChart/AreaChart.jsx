import React, { useRef, useEffect } from 'react';
import './AreaChart.css';
import { select, curveCardinal, area, scalePoint, scaleLinear, axisBottom, stack, line } from 'd3';

const AreaChart = ({ graphData }) => {
  const divRef = useRef();
  const scores = graphData.map((each) => each.score);
  const points = [];

  graphData.forEach((item) => points.push([item.date, item.score]));

  useEffect(() => {
    const elem = select(divRef.current);
    const width = parseInt(elem.style("width"), 10);
    const height = parseInt(elem.style("height"), 10);

    // clean up svg to create new one with the new data
    elem.select('svg').remove();

    // append the svg to the div element and get the svg width and height
    const svg = elem
      .append('svg')
      .attr('viewBox', `0 0 ${Math.min(width, height)} ${Math.min(width, height)}`)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('preserveAspectRatio', 'xMinYMin')
      .attr('class', 'svg-chart');
    
    const svgWidth = parseInt(svg.style("width"), 10);
    const svgHeight = parseInt(svg.style("height"), 10);

    // ----------------- helper functions -----------------
    const findMax = scores => {
      const sorted = scores.sort((a, b) => b - a);
      return sorted[0];
    };
    const max = findMax(scores);
    
    const stackGen = stack().keys(['score']);
    const layer = stackGen(graphData);

    const xScale = scalePoint()
      .domain(graphData.map((d) => d.date))
      .range([0, svgWidth * 0.8]);
    
    const yScale = scaleLinear()
      .domain([0, max])
      .range([svgHeight * 0.7, 0]);
    
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
    
    // ----------------- create the gradient -----------------
    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'grad')
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%');
    
    gradient
      .append("stop")
      .attr("offset", "0%")
      .style("stop-color", "#167dca")
      .style("stop-opacity", 1);
    
    gradient
      .append('stop')
      .attr('offset', '100%')
      .style('stop-color', '#167dca')
      .style('stop-opacity', .3);
    
    // ----------------- create and append the area -----------------
    svg
      .selectAll('.area')
      .data(layer)
      .enter()
      .append('path')
      .join('path')
      .style('fill', 'url(#grad)')
      .attr('class', 'area')
      .attr('d', areaGenerator)
      .attr('transform', 'translate(10, 30)');
    
    // ----------------- create and append the line -----------------
    svg
      .selectAll('.line')
      .data(layer)
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', '#0071c5')
      .attr('stroke-width', 1.5)
      .attr('transform', 'translate(10, 30)')
      .attr('d', lineGenerator);
    
    // ----------------- create and append the circles and text -----------------
    const g = svg
      .selectAll('.myCircle')
      .data(points)
      .enter()
      .append('g')
      .attr('transform', 'translate(10, 30)');
    
    g
      .append('circle')
      .attr('class', 'myCircle')
      .attr('fill', '#0071c5')
      .attr('stroke', 'white')
      .attr('stroke-width', 3)
      .attr('r', 7)
      .attr('cx', (item) => xScale(item[0]))
      .attr('cy', (item) => yScale(item[1]));
      
    g.append('text')
      .attr('class', 'text')
      .attr('fill', '#555555')
      .attr('y', (item) => yScale(item[1]) -15)
      .attr('dx', (item) => xScale(item[0]) - 6)
      .text((item) => `${item[1]}%`);
    
    // ----------------- create and append the timeline -----------------
    const xAxis = axisBottom(xScale);
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('color', '#555555')
      .attr('transform', `translate(10, ${svgHeight * 0.9})`)
      .call(xAxis);
    
  }, [graphData, points, scores]);

  return (
    <div ref={divRef} className='area-chart'>
    </div>
  );
};

export default AreaChart;
