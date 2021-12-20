var user_repos = []
var user_followers = []
var user_following = []
var user_watchers = []
var current_data = 1

function getUsername(){
    if(user_repos.length>=6){
        console.log(user_repos.length)
        alert("Too many Users!")
        return
    }
    var input = document.getElementById("un1").value
    fetch("http://localhost:8000", {method : "POST", body : input })
    .then(results => results.json())
    .then(dta => {
        if (dta.Username == "Not Found"){
            alert("User not Found!")
        }
        else {
            setUpArrays(dta)
            var num
            switch(current_data){
                case 1:
                    num = user_repos
                    break;
                case 2:
                    num = user_followers
                    break;
                case 3:
                    num = user_following
                    break;
                case 4:
                    num = user_watchers
                    break;
            }
            drawGraph(num)
        }
    })
}

function setUpArrays(user){
    un = user.Username
    user_followers.push({label : un, value : user["Follower Count"]})
    user_following.push({label : un, value : user["Following Count"]})
    user_repos.push({label : un, value : user["Repo Count"]})
    user_watchers.push({label : un, value : user["Repositories"].total})
}

function chooseGraphR(){
    drawGraph(user_repos)
    current_data = 1
}
function chooseGraphF(){
    drawGraph(user_followers)
    current_data = 2

}
function chooseGraphFG(){
    drawGraph(user_following)
    current_data = 3

}
function chooseGraphW(){
    drawGraph(user_watchers)
    current_data = 4

}

function drawGraph(datam){
    if(user_repos.length == 0){
        return
    }
    const MARGINS = {top : 20, bottom:10}
    const CWIDTH = 600
    const CHEIGHT = 400 - MARGINS.top - MARGINS.bottom

    const xScale = d3.scaleBand()
    .rangeRound([0,CWIDTH])
    .padding(0.1);

    const yScale = d3.scaleLinear()
    .range([CHEIGHT,0]);

    const container = d3.select("svg")
    .classed("chart", true)
    .attr("width", CWIDTH)
    .attr("height", CHEIGHT + MARGINS.top + MARGINS.bottom);

    container.selectAll("*").remove()

    xScale.domain(datam.map((d) => d.label))
    yScale.domain([0,d3.max(datam, d=>d.value)+5])

    const graph = container.append("g") 

    graph.append("g").call(d3.axisBottom(xScale).tickSizeOuter(0))
    .attr("transform", `translate(0, ${CHEIGHT})`).attr("font-size", "medium")
    

    graph.selectAll(".bar").data(datam).enter().append("rect")
    .classed("bar", true)
    .attr("width", xScale.bandwidth())
    .attr("height", d => CHEIGHT - yScale(d.value))
    .attr("x", d=> xScale(d.label))
    .attr("y", d=> yScale(d.value))

    graph.selectAll(".label").data(datam).enter()
    .append("text").text(d => d.value)
    .attr("x", d => xScale(d.label) + xScale.bandwidth()/2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .classed("label")




}

function removeUser(){
    var name = name=document.getElementById("un2").value
    for(var i = 0;i<user_repos.length;i++){
        if(user_repos[i].label==name){
            user_repos.splice(i,1)
            break;
        }
    }
    for(var i = 0;i<user_followers.length;i++){
        if(user_followers[i].label==name){
            user_followers.splice(i,1)
            break;
        }
    }
    for(var i = 0;i<user_following.length;i++){
        if(user_following[i].label==name){
            user_following.splice(i,1)
            break;
        }
    }
    for(var i = 0;i<user_watchers.length;i++){
        if(user_watchers[i].label==name){
            user_watchers.splice(i,1)
            break;
        }
    }
    var num
    switch(current_data){
        case 1:
            num = user_repos
            break;
        case 2:
            num = user_followers
            break;
        case 3:
            num = user_following
            break;
        case 4:
            num = user_watchers
            break;
    }
    drawGraph(num)
}