import Graph from "./graph";
import Node from "./node";

export default class GraphBuilder {
	buildWithItem(item) {
		const graph = new Graph();
		const relationNodes = item.items.map(item => {
			const node = new Node(item.sku);
			graph.add(node);
			return node;
		});

		const node = new Node(item.sku);
		graph.add(node);
		relationNodes.forEach(relation => graph.relate(node, relation));

		return graph;
	}
}
