import { useGraph } from "./graph";

export function App() {
  const svgRef = useGraph();

  return <svg ref={svgRef}></svg>;
}
