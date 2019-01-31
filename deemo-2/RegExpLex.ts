class DiGraph {
	adjList : { [key:string] : Array<any > } = {} ;
	addVertex( vertex : string ) : DiGraph{
		this.adjList[vertex] = new Array<any>() ;
		return this ;
	};

	addEgde( src : string , dest : string ) : DiGraph{
		if(this.adjList.hasOwnProperty( src ) && this.adjList.hasOwnProperty(dest))
			this.adjList[src].push( dest ) ;
		return this ;
	};
}

class NFA {
	regExp : string ;
	regLen : number ;
	constructor( regExp : string ){
		this.regExp = regExp ;
		this.regLen = this.regExp.length ;
		this.init() ;
	};

	private init () : void {
		let currentIndex = null ;
		const stack = new Array() ;


		for(let i = 0 ; i < this.regLen ; i ++ ){
			let char = this.regExp.charAt( i ) ;
			if( char === '|' || char === "(" ){
				stack.push( i ) ;
			};

			if( i < this.regLen - 1 && this.regExp.charAt(i + 1 ) === '*'){
			}

		};
	}
}