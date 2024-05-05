document.querySelector(".search button").addEventListener("click", function()
{
    if(
        !(document.getElementById('two-way').checked || document.getElementById('one-way').checked) && 
        !(document.getElementById('byDistance').checked || document.getElementById('byPrice').checked) &&
        !(document.getElementById('regular').checked || document.getElementById('student').checked
        || document.getElementById('army').checked || document.getElementById('senior').checked
        || document.getElementById('medicalstaff').checked)
    )
    {
        alert("Please select all the fields!")
    }
    //! Dijkstra Algorithm
    let V = 12;

    function minDistance(distance, isVisited) 
    {
        // Initialize min value
        let min = Number.MAX_VALUE;
        let min_index = -1;

        for (let v = 0; v < V; v++) 
        {
            if (isVisited[v] == false && distance[v] <= min) 
            {
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
        for (let i = 0; i < V; i++) 
        {
            distance[i] = Number.MAX_VALUE;
            isVisited[i] = false;
            parent[i] = -1;
        }

        // distance of source vertex from itself is always 0
        distance[src] = 0;

        // Find shortest path for all vertices
        for (let count = 0; count < V - 1; count++) 
        {
            // Pick the minimum distance vertex from the set of vertices not yet processed.
            let u = minDistance(distance, isVisited);

            // Mark the picked vertex as processed
            isVisited[u] = true;

            // Update distance value of the adjacent vertices of the picked vertex.
            for (let v = 0; v < V; v++) 
            {
                if (!isVisited[v] && graph[u][v] != 0 && distance[u] != Number.MAX_VALUE && distance[u] + graph[u][v] < distance[v]) 
                {
                    distance[v] = distance[u] + graph[u][v];
                    parent[v] = u;
                }
            }
        }

        // Build path from source to destination
        let path = [];
        let current = dest;
        while (current !== -1) 
        {
            path.push(current);
            current = parent[current];
        }
        path.reverse();

        return { distance: distance[dest], path: path };
    }

    let graph_distance = 
    [
        // 0     1      2      3      4     5      6     7     8      9      10    11
        [   0, 1000,   950,     0,     0,    0,     0,    0,    0,     0,   1250,    0], // 0
        [1000,    0,  1300,     0,     0,    0,  1200,  800,  350,     0,      0,  850], // 1
        [ 950, 1300,     0,   500,  1140,  660,     0,    0,    0,     0,      0,    0], // 2
        [   0,    0,   500,     0,  1150,    0,     0,    0,    0,     0,      0,    0], // 3
        [   0,    0,  1140,  1150,     0,    0,     0,    0,    0,     0,      0,    0], // 4
        [   0,    0,   660,     0,     0,    0,     0,  960,    0,     0,      0,    0], // 5
        [   0, 1200,     0,     0,     0,    0,     0,    0,    0,     0,      0,    0], // 6
        [   0,  800,     0,     0,     0,  960,     0,    0,    0,     0,      0,    0], // 7
        [   0,  350,     0,     0,     0,    0,     0,    0,    0,  1000,      0,    0], // 8
        [   0,    0,     0,     0,     0,    0,     0,    0, 1000,     0,   1000,    0], // 9
        [1250,    0,     0,     0,     0,    0,     0,    0,    0,  1000,      0,    0], // 10
        [   0,  850,     0,     0,     0,    0,     0,    0,    0,     0,      0,    0]  // 11
    ];


    let graph_price = 
    [
        // 0     1      2      3      4     5      6     7     8      9      10    11
        [   0, 6500,   4500,     0,     0,    0,     0,    0,    0,     0,   7000,    0], // 0
        [6500,    0,  4500,     0,     0,    0,  6000,  3500,  350,     0,      0,  6200], // 1
        [4500, 1300,     0,   3200,  4500,  4000,     0,    0,    0,     0,      0,    0], // 2
        [   0,    0,   3200,     0,  4600,    0,     0,    0,    0,     0,      0,    0], // 3
        [   0,    0,  4500,  4600,     0,    0,     0,    0,    0,     0,      0,    0], // 4
        [   0,    0,   4000,     0,     0,    0,     0,  4200,    0,     0,      0,    0], // 5
        [   0, 6000,     0,     0,     0,    0,     0,    0,    0,     0,      0,    0], // 6
        [   0,  3500,     0,     0,     0,  4200,     0,    0,    0,     0,      0,    0], // 7
        [   0,  3000,     0,     0,     0,    0,     0,    0,    0,  4500,      0,    0], // 8
        [   0,    0,     0,     0,     0,    0,     0,    0, 4500,     0,   4000,    0], // 9
        [7000,    0,     0,     0,     0,    0,     0,    0,    0,  4000,      0,    0], // 10
        [   0,  6200,     0,     0,     0,    0,     0,    0,    0,     0,      0,    0]  // 11
    ];

    let shortestDistance = document.getElementById('byDistance').checked;
    let cheapestPrice = document.getElementById('byPrice').checked;
    let source = document.querySelector(".select-wrapper.src").value;
    let destination = document.querySelector(".select-wrapper.dest").value;

    //! Check Source and Destination
    if(source === destination)
    {
        alert("Error! Same Source and Destination.")
    }
    else
    {
        let result;
    let totalDistance;
    let totalPrice;

    if(shortestDistance)
    {
        result = dijkstra(graph_distance, source, destination);
        totalDistance = result.distance;
    }
    else if(cheapestPrice)
    {
        result = dijkstra(graph_price, source, destination);
        totalPrice = result.distance;
    }
    
    /* Convert Source & Destination Code to their respective name */
    switch(source)
    {
        case "0":
            source = "BBI: Bhubaneswar Airport";
            break;

        case "1":
            source = "DEL: New Delhi Airport";
            break;
        case "2":
            source = "HYD: Hyderabad Airport";
            break;
        case "3":
            source = "VGA: Vijayawada Airport";
            break;
        case "4":
            source = "TRV: Thiruvananthapuram Airport";
            break;
        case "5":
            source = "GOI: Goa Airport";
            break;
        case "6":
            source = "AMD: Ahmedabad Airport";
            break;
        case "7":
            source = "IDR: Indore Airport";
            break;
        case "8":
            source = "LKO: Lucknow Airport";
            break;
        case "9":
            source = "IXB: Bagdogra Airport";
            break;
        case source = "10":
            source = "IMF: Imphal Airport";
            break;
        case "11":
            source = "SXR: Srinagar Airport";
            break;
    }
    switch(destination)
    {
        case "0":
            destination = "BBI: Bhubaneswar Airport";
            break;

        case "1":
            destination = "DEL: New Delhi Airport";
            break;
        case "2":
            destination = "HYD: Hyderabad Airport";
            break;
        case "3":
            destination = "VGA: Vijayawada Airport";
            break;
        case "4":
            destination = "TRV: Thiruvananthapuram Airport";
            break;
        case "5":
            destination = "GOI: Goa Airport";
            break;
        case "6":
            destination = "AMD: Ahmedabad Airport";
            break;
        case "7":
            destination = "IDR: Indore Airport";
            break;
        case "8":
            destination = "LKO: Lucknow Airport";
            break;
        case "9":
            destination = "IXB: Bagdogra Airport";
            break;
        case "10":
            destination = "IMF: Imphal Airport";
            break;
        case "11":
            destination = "SXR: Srinagar Airport";
            break;
    }

    /* Transits Making */
    let transit = result.path; // transit is an array
    let pathString = source.substring(4,source.length);
    
    for (var i = 1; i < transit.length; i++) {
        switch (transit[i]) {
            case 0:
                pathString += " -> Bhubaneswar Airport";
                break;
            case 1:
                pathString += " -> New Delhi Airport";
                break;
            case 2:
                pathString += " -> Hyderabad Airport";
                break;
            case 3:
                pathString += " -> Vijayawada Airport";
                break;
            case 4:
                pathString += " -> Thiruvananthapuram Airport";
                break;
            case 5:
                pathString += " -> Goa Airport";
                break;
            case 6:
                pathString += " -> Ahmedabad Airport";
                break;
            case 7:
                pathString += " -> Indore Airport";
                break;
            case 8:
                pathString += " -> Lucknow Airport";
                break;
            case 9:
                pathString += " -> Bagdogra Airport";
                break;
            case 10:
                pathString += " -> Imphal Airport";
                break;
            case 11:
                pathString += " -> Srinagar Airport";
                break;
        }
    }
    pathString += " -> ";
    pathString += destination.substring(4,destination.length);


    //! Non Dijkstra Code
    let message = "Please Select Every Preferred Options.";

    let N = parseInt(document.getElementById('number').value);
    totalPrice *= N;
    
    // One or Two Way Flight
    if (document.getElementById('two-way').checked) {
        totalPrice *= 2; 
    }

    // Type of passenger
    if (document.getElementById('regular').checked) 
    {
        totalPrice = totalPrice;
    }
    else if (document.getElementById('army').checked) 
    {
        totalPrice -= totalPrice*0.25; 
    }
    else if (document.getElementById('senior').checked) 
    {
        totalPrice -= totalPrice*0.20; 
    }
    else if (document.getElementById('medicalstaff').checked) 
    {
        totalPrice -= totalPrice*0.30; 
    }

    // Display ticket details in an alert
    if(cheapestPrice)
    {
        if (document.getElementById('student').checked) {
            message = `************************ TICKET **************************\n FROM: ${source}\n TO: ${destination}\n CHEAPEST PRICE: ₹ ${totalPrice}\n TRANSITS: ${pathString}\n 10kg+ Baggage Free!\n **********************************************************`;
        }
        
        else
        {
            message = `************************ TICKET **************************\n FROM: ${source}\n TO: ${destination}\n CHEAPEST PRICE: ₹ ${totalPrice}\n TRANSITS: ${pathString}\n **********************************************************`;
        }
    }
    else if(shortestDistance)
    {
        if (document.getElementById('student').checked)
        {
            message = `************************* TICKET *************************\n FROM: ${source}\n TO: ${destination}\n SHORTEST DISTANCE: ${totalDistance} KM\n TRANSITS: ${pathString}\n 10kg+ Baggage Free!\n **********************************************************`;
        }
        else
        {
            message = `************************* TICKET *************************\n FROM: ${source}\n TO: ${destination}\n SHORTEST DISTANCE: ${totalDistance} KM\n TRANSITS: ${pathString}\n **********************************************************`;
        }
    }
    let ans = confirm(message);
    }
}
);



