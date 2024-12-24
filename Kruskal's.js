// Union-Find Data Structure
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);

    if (rootX === rootY) return false;

    if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}

// Kruskal's Algorithm
function kruskalMST(edges, n) {
  edges.sort((a, b) => a[2] - b[2]); // Sort edges by weight
  const uf = new UnionFind(n);
  const result = [];

  for (let [u, v, weight] of edges) {
    if (uf.union(u, v)) {
      result.push([u, v, weight]);
    }
  }

  return result;
}

// Example usage
const edges = [
  [0, 1, 10],
  [0, 2, 6],
  [0, 3, 5],
  [1, 3, 15],
  [2, 3, 4],
];
const mst = kruskalMST(edges, 4);
console.log("Minimum Spanning Tree:", mst);
