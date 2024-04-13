document.querySelector(".search button").addEventListener("click", function() {
    // Dijkstra algorithm implementation...
        //! Dijkstra Algorithm
        let V = 12;

        function minDistance(distance, isVisited) {
            // Initialize min value
            let min = Number.MAX_VALUE;
            let min_index = -1;
        
            for (let v = 0; v < V; v++) {
                if (isVisited[v] == false && distance[v] <= min) {
                    min = distance[v];
                    min_index = v;
                }
            }
            return min_index;
        }
        
        function dijkstra(graph, src, dest) 
        {
            let distance = new Array(V);
            let isVisited = new Array(V);
            let parent = new Array(V);
        
            // Initialize all distances as INFINITE and isVisited[] as false
            for (let i = 0; i < V; i++) {
                distance[i] = Number.MAX_VALUE;
                isVisited[i] = false;
                parent[i] = -1;
            }
        
            // distance of source vertex from itself is always 0
            distance[src] = 0;
        
            // Find shortest path for all vertices
            for (let count = 0; count < V - 1; count++) {
                // Pick the minimum distance vertex from the set of vertices not yet processed.
                let u = minDistance(distance, isVisited);
        
                // Mark the picked vertex as processed
                isVisited[u] = true;
        
                // Update distance value of the adjacent vertices of the picked vertex.
                for (let v = 0; v < V; v++) {
                    if (!isVisited[v] && graph[u][v] != 0 && distance[u] != Number.MAX_VALUE && distance[u] + graph[u][v] < distance[v]) {
                        distance[v] = distance[u] + graph[u][v];
                        parent[v] = u;
                    }
                }
            }
        
            // Build path from source to destination
            let path = [];
            let current = dest;
            while (current !== -1) {
                path.push(current);
                current = parent[current];
            }
            path.reverse();
        
            return { distance: distance[dest], path: path };
        }
        
        let graph = [
            // 0     1      2      3      4     5      6     7     8      9      10    11
            [   0, 1000,   950,     0,     0,    0,     0,    0,    0,     0,   1250,    0], //! 0
            [1000,    0,  1300,     0,     0,    0,  1200,  800,  350,     0,      0,  850], //! 1
            [ 950, 1300,     0,   500,  1140,  660,     0,    0,    0,     0,      0,    0], //! 2
            [   0,    0,   500,     0,  1150,    0,     0,    0,    0,     0,      0,    0], //! 3
            [   0,    0,  1140,  1150,     0,    0,     0,    0,    0,     0,      0,    0], //! 4
            [   0,    0,   660,     0,     0,    0,     0,  960,    0,     0,      0,    0], //! 5
            [   0, 1200,     0,     0,     0,    0,     0,    0,    0,     0,      0,    0], //! 6
            [   0,  800,     0,     0,     0,  960,     0,    0,    0,     0,      0,    0], //! 7
            [   0,  350,     0,     0,     0,    0,     0,    0,    0,  1000,      0,    0], //! 8
            [   0,    0,     0,     0,     0,    0,     0,    0, 1000,     0,   1000,    0], //! 9
            [1250,    0,     0,     0,     0,    0,     0,    0,    0,  1000,      0,    0], //! 10
            [   0,  850,     0,     0,     0,    0,     0,    0,    0,     0,      0,    0]  //! 11
        ];
        

    // Source and destination nodes
    let src = document.querySelector(".select-wrapper .src").value;
    let dest = document.querySelector(".select-wrapper .dest").value;

    // Calculate shortest path and distance
    let result = dijkstra(graph, src, dest);
    let transit = result.path.join(" -> ");
    let totaldistance = result.distance;

    let totalPrice = 10000;
    let message = "Please Select Your Preferred Options.";
    let N = parseInt(document.getElementById('number').value);
    totalPrice *= N;

    // One or Two Way Flight
    if (document.getElementById('two-way').checked) {
        totalPrice *= 2; 
    }

    // Type of passenger
    if (document.getElementById('army').checked) {
        totalPrice *= 0.75; // 25% discount
    } else if (document.getElementById('senior').checked) {
        totalPrice *= 0.80; // 20% discount
    } else if (document.getElementById('medicalstaff').checked) {
        totalPrice *= 0.70; // 30% discount
    }

    // Display ticket details in an alert
    if(document.getElementById('byprice').checked) {
        message = `****** TICKET ******\nFROM: ${src}\nTO: ${dest}\n Cheapest Price: ${totalPrice} \n Transit: ${transit}`;
    } else if(document.getElementById('bydistance').checked) {
        message = `****** TICKET ******\nFROM: ${src}\nTO: ${dest}\n Shortest distance: ${totaldistance} \n Transit: ${transit}`;
    }

    // Display additional information for student passengers
    if (document.getElementById('student').checked) {
        message += "\n 10kg+ Baggage Free!";
    }

    let ans = confirm(message);
});
