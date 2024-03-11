// (OPTION TWO) TLE, 44 test
/**
 * @param {number} N - целое число, количество сотрудников готовых к объединению
 * @param {number[]} staff - массив длины N с грейдами доступных сотрудников
 * @param {number} K - целое число, количество доступных клавиатур
 * @returns {number}
 */
module.exports = function (N, staff, K) {
  staff.sort((a, b) => b - a);
  let r = 0;
  let i = 0;
  while (K-- > 0) {
    r += staff[i++];
  }
  return r;
};

// (OPTION ONE) TLE, 44 test
// /**
//  * @param {number} N - целое число, количество сотрудников готовых к объединению
//  * @param {number[]} staff - массив длины N с грейдами доступных сотрудников
//  * @param {number} K - целое число, количество доступных клавиатур
//  * @returns {number}
//  */
// module.exports = function (N, staff, K) {
//   const all = staff.reduce((acc, v) => acc + v, 0);
//   const heap = new MaxHeap();
//   // если K больше половины N,
//   // то выгоднее взять N - K минимальных элементов (потому что их меньше),
//   // и отнять ее от общей суммы чтобы получить сумму K максимальных элементов
//   if (K > N / 2) {
//     for (const v of staff) {
//       heap.insert(-v);
//     }
//     let r = 0;
//     let tail = N - K;
//     while (tail-- > 0) {
//       r += heap.extractMax();
//     }
//     return all + r;
//   }
//   // в противном случае, если K меньше половины N,
//   // то выгодно взять K максимальных элементов (потому что их меньше)
//   for (const v of staff) {
//     heap.insert(v);
//   }
//   let r = 0;
//   while (K-- > 0 && !heap.isEmpty()) {
//     r += heap.extractMax();
//   }
//   return r;
// };

/**
 * Ппредоставляет эффективную реализацию структуры данных максимальной кучи,
 * позволяя выполнять операции добавления, удаления максимального элемента и построения кучи за время O(log n),
 * где n - количество элементов в куче
 *
 * Прикол в том, что куча не требует полной сортировки всей коллекции.
 * Куча "сортирует" обрабатывает только часть коллекции, а не всю,
 * поэтому сложность падает до O(K * log N) вместо O(N * log N) как в случае с сортировкой.
 * При больших N и маленьких K - это значительная экономия.
 */

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return index * 2 + 1;
  }

  getRightChildIndex(index) {
    return index * 2 + 2;
  }

  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  peek() {
    if (this.heap.length === 0) throw new Error("Heap is empty");
    return this.heap[0];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractMax() {
    if (this.heap.length === 0) throw new Error("Heap is empty");

    const max = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown();
    }

    return max;
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (
      this.hasParent(currentIndex) &&
      this.heap[currentIndex] > this.heap[this.getParentIndex(currentIndex)]
    ) {
      const parentIndex = this.getParentIndex(currentIndex);
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  heapifyDown() {
    let currentIndex = 0;

    while (this.hasLeftChild(currentIndex)) {
      let largerChildIndex = this.getLeftChildIndex(currentIndex);

      if (
        this.hasRightChild(currentIndex) &&
        this.heap[this.getRightChildIndex(currentIndex)] >
          this.heap[largerChildIndex]
      ) {
        largerChildIndex = this.getRightChildIndex(currentIndex);
      }

      if (this.heap[currentIndex] < this.heap[largerChildIndex]) {
        this.swap(currentIndex, largerChildIndex);
        currentIndex = largerChildIndex;
      } else {
        break;
      }
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}
