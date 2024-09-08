
import numpy as np
from .models import Route

def floyd_warshall():
    # Fetch all routes
    routes = Route.objects.all()
    
    # Get unique locations
    locations = list(set([route.start_location for route in routes] + [route.end_location for route in routes]))
    
    # Create an index mapping for locations
    index = {loc: i for i, loc in enumerate(locations)}
    
    # Initialize distance matrix
    inf = float('inf')
    n = len(locations)
    dist = np.full((n, n), inf)
    
    for i in range(n):
        dist[i, i] = 0
    
    # Fill the distance matrix with route data
    for route in routes:
        start_index = index[route.start_location]
        end_index = index[route.end_location]
        dist[start_index, end_index] = route.distance
        dist[end_index, start_index] = route.distance  # Assuming undirected graph
    
    # Floyd-Warshall algorithm
    for k in range(n):
        for i in range(n):
            for j in range(n):
                dist[i, j] = min(dist[i, j], dist[i, k] + dist[k, j])
    
    return dist, index, locations
