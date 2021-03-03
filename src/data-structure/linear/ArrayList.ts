import UngrowableArrayList from "./UngrowableArrayList"
import DSArray from "../../DSArray";

const DEFAULT_CRITICAL_PERCENT = 0.9;
const DEFAULT_GROWTH_RATE = 2;
const DEFAULT_INITIAL_CAPCITY = 16;

/**
 * Growable Array List.
 */
export default class ArrayList<E> extends UngrowableArrayList<E>{

    private growthRate: number;
    private criticalPercent: number;

    /**
     * Initialize a new growable array list.
     * @param initialCapcity 
     */
    constructor(initialCapcity: number = DEFAULT_INITIAL_CAPCITY,
        growthRate: number = DEFAULT_GROWTH_RATE,
        criticalPercent: number = DEFAULT_CRITICAL_PERCENT) {
        super(initialCapcity);
        this.growthRate = growthRate <= 1 ? DEFAULT_GROWTH_RATE : growthRate;;
        this.criticalPercent = criticalPercent >= 1 || criticalPercent <= 0 ? DEFAULT_CRITICAL_PERCENT : criticalPercent;
    }

    /**
     * Ensuring the capcity for storing element.
     */
    protected ensureCapcity() {
        if (this.reachCriticalValue()) {
            this.grow();
        }
    }

    /**
     * To make the inner list's size to be larger.
     */
    protected grow() {
        const newCapcity = (this.capcity <= 0 ? DEFAULT_INITIAL_CAPCITY : this.capcity) * this.growthRate;
        const newArray = new DSArray<E>(newCapcity);
        this.copyToNewArray(this.array, newArray);
        this.array = newArray;
        this.capcity = newCapcity;
    }

    /**
     * Copy content.
     * @param oldArray 
     * @param newArray 
     */
    protected copyToNewArray(oldArray: DSArray<E>, newArray: DSArray<E>) {
        for (let i = 0; i < oldArray.length; i++) {
            newArray.set(i, oldArray.get(i));
        }
    }

    protected reachCriticalValue(): boolean {
        return this.size() >= (this.capcity * this.criticalPercent);
    }
}