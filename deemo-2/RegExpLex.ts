interface IStatus {
	inEdges : Edge ;
	outEdges : Edge ;
	FinalStatus :boolean ;
};

interface Edge {

}


class DiGraph {
	vertex : string[] = [] ;
	edges : Array < Array< number > > = [] ;

	public addVertex ( vertex : string ): DiGraph {
		this.vertex.push( vertex ) ;
		this.edges.push( new Array() ) ;
		return this ;
	};

	private getVertexIndex ( vertex : string ) : number {
		return this.vertex.indexOf( vertex ) ;
	};

	public addEdge ( from : string , dest :string ) : DiGraph {
		const fromIndex = this.getVertexIndex( from ) ;
		const destIndex = this.getVertexIndex( dest ) ;
		if(!!~fromIndex && !!~destIndex )
			this.edges[fromIndex][destIndex] = 1 ;

		return this ;
	};
};
