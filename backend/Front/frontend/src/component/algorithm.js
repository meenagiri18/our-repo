// algorithm.js
export function floydWarshall(graph) {
    const dist = [];
    const V = graph.length;

    // Initialize the distance matrix
    for (let i = 0; i < V; i++) {
        dist[i] = [];
        for (let j = 0; j < V; j++) {
            if (i === j) {
                dist[i][j] = 0;
            } else if (graph[i][j] !== 0) {
                dist[i][j] = graph[i][j];
            } else {
                dist[i][j] = Infinity;
            }
        }
    }

    // Floyd-Warshall algorithm
    for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    return dist;
}
