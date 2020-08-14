import React, { useRef, useEffect } from 'react';

import { arc, pie } from 'd3-shape';
import {select} from 'd3';

const Donut = ({ score }) => {
  const svgRef = useRef();
  const data = [score / 100, (100 - score) / 100];

  useEffect(() => {
    const svg = select(svgRef.current);

    const arcGenerator = arc().innerRadius(40).outerRadius(46);

    const pieGenerator = pie()
      // .sort(null);

    svg
      .selectAll('.slice')
      .data(pieGenerator(data))
      .join('path')
      .attr('class', 'slice')
      .attr('fill', (each, idx) => (idx === 0 ? '#0071c5' : '#d7d7d7'))
      .style('transform', 'translate(50px, 47px)')
      .attr('d', (each) => arcGenerator(each));

  }, [data]);

  return (
    <svg ref={ svgRef } width='100px' height='95px' />
  );
};

export default Donut;
