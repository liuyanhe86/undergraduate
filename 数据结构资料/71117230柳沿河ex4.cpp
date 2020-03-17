#include <iostream>

using namespace std;

//边结构体定义
struct edge {
	edge(int _v1 = 0, int _v2 = 0, int _w = 0) { v1 = _v1; v2 = _v2; weight = _w; }
	int v1, v2, weight;
};

//存放边的最小堆定义
class MinHeap
{
public:
	MinHeap(int theCapacity = 10);
	~MinHeap() {}
	bool IsEmpty()const;
	const edge& Top()const;
	void Push(const edge&);
	void Pop();
private:
	edge* heap;
	int heapSize;
	int capacity;
};

MinHeap::MinHeap(int theCapacity)
{
	if (theCapacity < 1)
		throw "Capacity must be >=1";
	capacity = theCapacity;
	heapSize = 0;
	heap = new edge[capacity + 1];
}

bool MinHeap::IsEmpty() const
{
	return heapSize == 0;
}

const edge & MinHeap::Top() const
{
	// TODO: 在此处插入 return 语句
	return heap[1];
}

void MinHeap::Push(const edge &e)
{
	if (heapSize == capacity)
	{
		capacity *= 2;
		edge *temp = heap;
		heap = new edge[capacity + 1];
		for (int i = 0; i < heapSize + 1; i++)
			heap[i] = temp[i];
		delete temp;
	}
	int currentNode = ++heapSize;
	while (currentNode != 1 && heap[currentNode / 2].weight > e.weight)
	{
		heap[currentNode] = heap[currentNode / 2];
		currentNode /= 2;
	}
	heap[currentNode] = e;
}

void MinHeap::Pop()
{
	if (IsEmpty())
		throw "Heap is empty. Cannot delete.";
	//heap[1].~edge();

	edge lastE = heap[heapSize--];

	int currentNode = 1;
	int child = 2;
	while (child <= heapSize)
	{
		if (child < heapSize&&heap[child].weight > heap[child + 1].weight)
			child++;
		if (lastE.weight <= heap[child].weight)
			break;
		heap[currentNode] = heap[child];
		currentNode = child; child *= 2;
	}
	heap[currentNode] = lastE;
}

//点集集合定义
class Sets {
public:
	// Set operations
	Sets(int);
	void WeightedUnion(int, int);
	int CollapsingFind(int);
	void Kruskal(MinHeap& E);
	void Output()const {
		cout << "parent array status:";
		for (int i = 0; i < n; i++)
			cout << parent[i] << " ";
		cout << endl;
	}
private:
	int *parent;
	int n; // number of set elements
	int edges;
};

Sets::Sets(int numberOfElements)
{
	if (numberOfElements < 2) throw "Must have at least 2 elements.";
	n = numberOfElements;
	edges = 0;
	parent = new int[n];
	fill(parent, parent + n, -1);
}

void Sets::WeightedUnion(int i, int j)
{
	int temp = parent[i] + parent[j];
	if (parent[i] > parent[j]) {
		parent[i] = j;
		parent[j] = temp;
	}
	else {
		parent[j] = i;
		parent[i] = temp;
	}
	edges++;
}

int Sets::CollapsingFind(int i)
{
	int r;
	for (r = i; parent[r] >= 0; r = parent[r]);
	while (i != r)
	{
		int s = parent[i];
		parent[i] = r;
		i = s;
	}
	return r;
}

//Kruskal算法实现
void Sets::Kruskal(MinHeap& E)
{
	int totalcost = 0;
	while ((edges < n - 1) && (!E.IsEmpty()))
	{
		edge e = E.Top();
		E.Pop();
		int root1 = CollapsingFind(e.v1), root2 = CollapsingFind(e.v2);
		if (root1 != root2)//如果该边不构成环则添加该边
		{
			WeightedUnion(CollapsingFind(e.v1), CollapsingFind(e.v2));
			cout <<"Edge "<<e.v1 << "-" << e.v2 << " Added！Weight:"<<e.weight<<endl;
			totalcost += e.weight;
		}
		else
			cout <<"Edge "<<e.v1 << "-" << e.v2<<" Cycle structed！"<<endl;
	}
	if (edges < n - 1)cout << "no spanning tree" << endl;
	else
		cout << "Spanning tree exists. The total cost is " << totalcost << endl;
}

//测试函数,课本Figure 6.23
int main()
{
	MinHeap EdgesSet(9);
	Sets VerticesSet(7);
	EdgesSet.Push(edge(0, 1, 28)); EdgesSet.Push(edge(0, 5, 10));
	EdgesSet.Push(edge(1, 2, 16)); EdgesSet.Push(edge(1, 6, 14));
	EdgesSet.Push(edge(2, 3, 12)); EdgesSet.Push(edge(3, 4, 22));
	EdgesSet.Push(edge(3, 6, 18)); EdgesSet.Push(edge(4, 6, 24));
	EdgesSet.Push(edge(4, 5, 25));
	VerticesSet.Kruskal(EdgesSet);
	cout << endl;
	VerticesSet.Output();

	system("pause");
}