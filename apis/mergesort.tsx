export const MergeSort=(arr: string[], order: "asc" | "desc" = "asc"): string[]=> {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = MergeSort(arr.slice(0, mid), order);
  const right = MergeSort(arr.slice(mid), order);

  return merge(left, right, order);
}

function merge(left: string[], right: string[], order: "asc" | "desc"): string[] {
  const result: string[] = [];
  while (left.length && right.length) {
    const condition =
      order === "asc"
        ? left[0].localeCompare(right[0]) <= 0
        : left[0].localeCompare(right[0]) >= 0;

    if (condition) result.push(left.shift()!);
    else result.push(right.shift()!);
  }
  return [...result, ...left, ...right];
}
