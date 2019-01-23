var DiGraph = /** @class */ (function () {
    function DiGraph() {
        this.vertex = [];
        this.edges = [];
    }
    DiGraph.prototype.addVertex = function (vertex) {
        this.vertex.push(vertex);
        this.edges.push(new Array());
        return this;
    };
    ;
    DiGraph.prototype.getVertexIndex = function (vertex) {
        return this.vertex.indexOf(vertex);
    };
    ;
    DiGraph.prototype.addEdge = function (from, dest) {
        var fromIndex = this.getVertexIndex(from);
        var destIndex = this.getVertexIndex(dest);
        if (!~fromIndex || !~destIndex)
            return this;
        this.edges[fromIndex][destIndex] = 1;
        return this;
    };
    ;
    return DiGraph;
}());
var diGraph = new DiGraph;
diGraph.addVertex("V1");
diGraph.addVertex("V2");
diGraph.addEdge("V1", "V2");
console.log(diGraph);
