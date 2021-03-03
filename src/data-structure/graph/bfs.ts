// import { GraphNode } from "./GraphNode";
// import { Action1 } from "../util/Action";
// import HashMap from "../collection/HashMap";
// export default function dfs<E>(node: GraphNode<E>, consumer: Action1<GraphNode<E>>) {
//     _dfs(node, consumer, new HashMap());
// }
// function _dfs<E>(node: GraphNode<E>, consumer: Action1<GraphNode<E>>,
//     travered: HashMap<GraphNode<E>, number>) {
//     const iterator = node.out.getIterator();
//     while (iterator.hasNext()) {
//         const node = iterator.next().key;
//         if (travered.get(node) === null) {
//             consumer(node);
//             travered.put(node, 1);
//             _dfs(node, consumer, travered);
//         }
//     }
// }