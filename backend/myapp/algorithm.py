# Adjacency matrix for locations
adj_matrix = {
    'Butwal': {'Butwal': 0, 'Kathmandu': 2, 'Chitwan': 1, 'Bharatpur': 5},
    'Kathmandu': {'Butwal': 2, 'Kathmandu': 0, 'Chitwan': 4, 'Bharatpur': 3},
    'Chitwan': {'Butwal': 1, 'Kathmandu': 4, 'Chitwan': 0, 'Bharatpur': 2},
    'Bharatpur': {'Butwal': 5, 'Kathmandu': 3, 'Chitwan': 2, 'Bharatpur': 0},
}

def floyd_warshall():
    dist = dict(adj_matrix)  # Copy of adjacency matrix
    next_node = {i: {j: j for j in adj_matrix[i]} for i in adj_matrix}  # Store next nodes

    for k in adj_matrix:
        for i in adj_matrix:
            for j in adj_matrix[i]:
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    next_node[i][j] = next_node[i][k]

    return dist, next_node

def construct_path(next_node, start, end):
    if next_node[start][end] is None:
        return []
    path = [start]
    while start != end:
        start = next_node[start][end]
        path.append(start)
    return path