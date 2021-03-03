export default function (...nums: number[]) {
    let max = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > max) {
            max = nums[i]
        }
    }
    return max;
}