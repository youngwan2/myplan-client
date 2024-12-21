import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import useResize from '../../../hooks/useResize';
import { angleToRadians } from '../../../utils/mathUtil';
import EmptyMessage from '../../common/EmptyMessage';
import { Task } from '../../../types/task.type';

interface PropsType {
  tasks: Task[];
}

export default function CircleChart({ tasks }: PropsType) {
  const { width, height } = useResize();
  const radius = width / 2.1;
  const centerX = width / 2;
  const centerY = height / 2;

  const svgRef = useRef<SVGSVGElement | null>(null);

  function tasksRender(
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    arc: d3.Arc<any, any>,
  ) {
    // 데이터 바인딩 및 파이 조각 그리기
    tasks.forEach((d, i) => {
      const { startTime, endTime, title } = d;

      // 파이 조각 추가
      g.append('path')
        .attr(
          'd',
          arc({
            startAngle: angleToRadians(startTime),
            endAngle: angleToRadians(endTime),
          }),
        )

        .attr('fill', d.colorCode)
        .attr('stroke', '#333')
        .style('stroke-width', '3px');

      // 텍스트 추가
      const centroid = arc.centroid({
        startAngle: angleToRadians(startTime),
        endAngle: angleToRadians(endTime),
      });

      g.append('text')
        .attr('transform', `translate(${centroid})`)
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .style('fill', 'white')
        .style('font-size', '12px')
        .text(title);
    });
  }

  // 시간 간격 렌더링
  function hourIntervalRender(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    numbers: number[],
  ) {
    svg
      .selectAll('text')
      .data(numbers)
      .enter()
      .append('text')
      .attr('x', (d) => {
        const angle = (d / 24) * 2 * Math.PI; // 0 ~ 2π 라디안
        return centerX + radius * Math.cos(angle - Math.PI / 2); // -90도 보정
      })
      .attr('y', (d) => {
        const angle = (d / 24) * 2 * Math.PI; // 0 ~ 2π 라디안
        return centerY + radius * Math.sin(angle - Math.PI / 2); // -90도 보정
      })
      .text((d) => d)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .style('fill', 'gray')
      .style('font-weight', 'bold')
      .style('font-size', '18px');

    // 원 그리기
    svg
      .append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', radius)
      .style('fill', 'none')
      .style('stroke', 'gray');
  }

  useEffect(() => {
    if (!svgRef.current) return;

    const radius = Math.min(width, height) / 2.28;
    const numbers = d3.range(0, 24); // 24 시간

    // 초기화(이전 SVG 제거)
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // 시간 간격 렌더링
    hourIntervalRender(svg, numbers);
    // SVG 그룹 생성
    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`);

    // 아크 생성 함수
    const arc = d3.arc<any>().innerRadius(0).outerRadius(radius);

    // 데이터 렌더링
    tasksRender(g, arc);
  }, [tasks, width]);

  if (tasks.length < 1)
    return (
      <EmptyMessage
        text="일정을 추가해보세요"
        className="w-full h-[500px] text-center flex justify-center items-center "
      />
    );
  return <svg ref={svgRef}></svg>;
}
