#include <iostream>
#include <stdlib.h>
#include <iomanip>
#include <time.h>

using namespace std;

int imove[8] = { -1,0,1,1,1,0,-1,-1 }, jmove[8] = { 1,1,1,0,-1,-1,-1,0 };//前进方向数组

bool isFull(int **count, int n, int m);//检查瓷砖是否已全部走完

void random_walk(int n, int m, int i, int j);//输出模拟结果；n:数组行数，地图高度；m:数组列数，地图宽度；i，j:起始坐标

int main()
{
	cout << "(1)大小为15*15，起始坐标为(9,9)时：" << endl;
	random_walk(15, 15, 9, 9);
	cout << "(2)大小为39*19，起始坐标为(0,0)时：" << endl;
	random_walk(39, 19, 0, 0);
	system("pause");
}
bool isFull(int **count, int n, int m)
{
	for (int i = 0; i < n; i++)
	{
		for (int j = 0; j < m; j++)
			if (count[i][j] == 0)//若还没走过则返回假
				return false;
	}
	return true;
}

void random_walk(int n, int m, int i, int j)
{
	int tm = (int)time(NULL);
	srand(tm);//随机数种子
	int **count = new int*[n];//创建数组
	for (int i = 0; i < n; ++i)
	{
		count[i] = new int[m];
	}
	for (int i = 0; i < n; ++i)//初始化
	{
		for (int j = 0; j < m; ++j)
		{
			count[i][j] = 0;
		}
	}

	int pace = 0;//已走步数
	int random = 0;//随机方向
	while (pace < 50000)//50000步以内有效
	{
		count[i][j]++;
		//cout << count[i][j] << "  " << i << "   " << j << "   " << pace << endl;
		random = rand() % 8;
		int g = i + imove[random], h = j + jmove[random];
		while (g == -1 || g == n || h == -1 || h == m)//当越界时重新选择方向
		{
			random = rand() % 8;
			g = i + imove[random]; h = j + jmove[random];
		}
		i = g; j = h;
		pace++;
		if (isFull(count, n, m))//全部走完时退出循环
			break;
		else
			continue;
	}
	cout << "合法总步数为：" << pace << endl;
	cout << "数组count为：" << endl;
	for (int i = 0; i < n; ++i)//输出count数组
	{
		for (int j = 0; j < m; ++j)
		{
			cout << setw(4) << count[i][j];
		}
		cout << endl;
	}
}