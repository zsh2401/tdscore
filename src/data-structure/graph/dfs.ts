// import { GraphNode } from "./GraphNode";
// import { Action1 } from "../../Action";
// import HashSet from "../HashSet";
// export default function dfs<E>(node: GraphNode<E>, consumer: Action1<GraphNode<E>>) {
//     _dfs(node, consumer, new HashSet());
// }
// function _dfs<E>(node: GraphNode<E>, consumer: Action1<GraphNode<E>>,
//     travered: HashSet<GraphNode<E>>) {
//     const iterator = node.out.getIterator();
//     while (iterator.hasNext()) {
//         const node = iterator.next().key;
//         if (!travered.contains(node)) {
//             consumer(node);
//             travered.setAdd(node);
//             _dfs(node, consumer, travered);
//         }
//     }
// }