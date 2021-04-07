import { HashMap, HashSet, IMap, IQueue, ISet, LinkedList } from "../../data-structure";
import IGraph from "../../data-structure/graph/IGraph";

/**
 * 路径记录
 */
export interface PathNote<E> {
    /**
     * 指示要到此节点，要先到哪一个节点
     */
    prev: E
    /**
     * 表示到此处的花销/经过的节点
     */
    cost: number
}

/**
 * 使用BFS查找路径
 * @param g 
 * @param start 
 * @returns 一个记录到达特定点应该怎么走的Map
 */
export default function <E>(g: IGraph<E>, start: E): IMap<E, PathNote<E>> {

    const viewed: ISet<E> = new HashSet()
    const queue: IQueue<E> = new LinkedList()
    const result = new HashMap<E, PathNote<E>>()

    queue.queueEn(start)
    viewed.setAdd(start)
    result.mapPut(start, { prev: start, cost: 0 })
    
    while (!queue.isEmpty()) {
        const current = queue.queueDe()
        const iterator = g.outOf(current).getIterator()
        while (iterator.hasNext()) {
            const _crt = iterator.next()
            if (!viewed.contains(_crt)) {
                result.mapPut(_crt, {
                    prev: current,
                    cost: (result.mapGet(current)?.cost ?? 0) + 1
                })
                queue.queueEn(_crt)
            }
        }
    }

    return result
}