import type { Node, NodeId, Edge, NodeMap, EdgeMap, GraphData } from "./types";
import { loadNodes, loadEdges } from "../testing-and-timing/scaffolding";


// Here's your solution (test with `bun test` and time with `bun time`)
export function findShortestPath(startNode: NodeId, endNode: NodeId, graphData: GraphData): Edge[] {
    const { nodeMap, edgeMap } = graphData;


    return []
}


// Play around in here...
async function main() {
    const start = performance.now();
    const graphData: GraphData = {
        nodeMap: await loadNodes("./maps/norden/noder.txt"),
        edgeMap: await loadEdges("./maps/norden/kanter.txt"),
    };
    const end = performance.now();
    console.log("Time taken to load graph data:", ((end - start) / 1000).toFixed(1), "s");
    console.log("Length of nodeMap:", graphData.nodeMap.size);
    console.log("Length of edgeMap:", graphData.edgeMap.values().reduce((acc, edges) => acc + edges.length, 0));
}

await main();