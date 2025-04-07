import { findShortestPath } from "../src";
import { loadNodes, loadEdges } from "./scaffolding";


// EssoTervo (./precomputed-routes/6441311-3168086)  // 5796 nodes ~ dijsktra visits 7 442 388 nodes
const START_NODE = 6441311;
const END_NODE = 3168086;
const MAP_PATH = "maps/norden";

const mapData = {
    nodeMap: await loadNodes(`${MAP_PATH}/noder.txt`),
    edgeMap: await loadEdges(`${MAP_PATH}/kanter.txt`),
};

const start = performance.now();
const result = await findShortestPath(START_NODE, END_NODE, mapData);
const end = performance.now();

const totalDistance = result.reduce((acc, edge) => acc + edge.distance, 0);
const totalTime = result.reduce((acc, edge) => acc + edge.time, 0) / 100;

console.log(`Distance from ${START_NODE} to ${END_NODE}: ${totalDistance}m`);
console.log(`Edges in path:`, result.length);
console.log(`Drive time: ${totalTime}s`);
console.log();
console.log(`Time taken: ${(end - start).toFixed(2)} ms`);