import numpy as np

def floyd_warshall(locations, distances):
    # Create a dictionary to index locations
    location_index = {location: idx for idx, location in enumerate(locations)}
    n = len(locations)
    
    # Initialize the distance matrix with infinity
    dist = np.full((n, n), np.inf)
    
    # Distance from a node to itself is zero
    np.fill_diagonal(dist, 0)
    
    # Fill the distance matrix with initial distances
    for distance in distances:
        i = location_index[distance.from_location]
        j = location_index[distance.to_location]
        dist[i, j] = distance.distance
    
    # Floyd-Warshall algorithm
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i, j] > dist[i, k] + dist[k, j]:
                    dist[i, j] = dist[i, k] + dist[k, j]
    
    return dist
