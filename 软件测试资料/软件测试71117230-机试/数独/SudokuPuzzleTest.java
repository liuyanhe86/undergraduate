package net.mooctest;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class SudokuPuzzleTest {
	SudokuPuzzle testPuzzle;
	
	/**
	 * 测试预处理函数
	 */
	@Before
	public void beforeTest()
	{
		testPuzzle = new SudokuPuzzle(4, 4, 2, 2, new String[] {"1","2","3","4"});		
		testPuzzle.board = new String[][]{
			{"3", "2", "1", "4"},
			{"1", "4", "3", "2"},
			{"2", "1", "4", "3"},
			{"4", "3", "2", "1"}
		};
		testPuzzle.mutable = new boolean[][] {
			{false, false, false, false},
			{false, false, false, false},
			{false, false, false, false},
			{false, false, false, false}
		};
	}

	/**
	 * generateRandomSudoku函数测试、重载toString函数测试
	 */
	@Test(timeout = 4000)
	public void test() {
        SudokuGenerator sudokuGenerator0 = new SudokuGenerator();
        testPuzzle = sudokuGenerator0.generateRandomSudoku(SudokuPuzzleType.SIXBYSIX);
        System.out.println("The 6*6 test puzzle is:\n" + testPuzzle.toString());
        testPuzzle = sudokuGenerator0.generateRandomSudoku(SudokuPuzzleType.NINEBYNINE);
        System.out.println("The 9*9 test puzzle is:\n" + testPuzzle.toString());
        testPuzzle = sudokuGenerator0.generateRandomSudoku(SudokuPuzzleType.TWELVEBYTWELVE);
        System.out.println("The 12*12 test puzzle is:\n" + testPuzzle.toString());
		testPuzzle = sudokuGenerator0.generateRandomSudoku(SudokuPuzzleType.SIXTEENBYSIXTEEN);
        System.out.println("The 16*16 test puzzle is:\n" + testPuzzle.toString());
	}
	
	/**
	 * makeMove函数测试
	 */
	@Test
	public void makeMoveTest()
	{
		testPuzzle.makeMove(5, 4, "0", false);//F F F
		Assert.assertArrayEquals(testPuzzle.board, new String[][]{
			{"3", "2", "1", "4"},
			{"1", "4", "3", "2"},
			{"2", "1", "4", "3"},
			{"4", "3", "2", "1"}
		});
		
		testPuzzle.makeMove(5, 4, "1", false);//T F F
		Assert.assertArrayEquals(testPuzzle.board, new String[][]{
			{"3", "2", "1", "4"},
			{"1", "4", "3", "2"},
			{"2", "1", "4", "3"},
			{"4", "3", "2", "1"}
		});

		testPuzzle.makeSlotEmpty(1, 1);
		testPuzzle.makeMove(1, 1, "4", false);//T T F
		Assert.assertArrayEquals(testPuzzle.board, new String[][]{
			{"3", "2", "1", "4"},
			{"1", "", "3", "2"},
			{"2", "1", "4", "3"},
			{"4", "3", "2", "1"}
		});
		
		testPuzzle.mutable = new boolean[][] {
			{false, false, false, false},
			{false, true, false, false},
			{false, false, false, false},
			{false, false, false, false}
		};
		testPuzzle.makeMove(1, 1, "4", false);//T T T
		Assert.assertArrayEquals(testPuzzle.board, new String[][]{
			{"3", "2", "1", "4"},
			{"1", "4", "3", "2"},
			{"2", "1", "4", "3"},
			{"4", "3", "2", "1"}
		});
		Assert.assertArrayEquals(testPuzzle.mutable, new boolean[][] {
			{false, false, false, false},
			{false, false, false, false},
			{false, false, false, false},
			{false, false, false, false}
		});
	}
	
	/**
	 * isValidMove函数测试
	 */
	@Test
	public void isValidMoveTest()
	{
		Assert.assertFalse(testPuzzle.isValidMove(5, 4, "2"));//F
		
		testPuzzle.board = new String[][]{
			{"3", "2", "1", "4"},
			{"1", "4", "3", "2"},
			{"", "1", "4", "3"},
			{"4", "3", "2", "1"}
		};
		Assert.assertTrue(testPuzzle.isValidMove(2, 0, "2"));//T T T T
		
		testPuzzle.board = new String[][]{
			{"3", "2", "1", "4"},
			{"1", "4", "3", "2"},
			{"", "1", "4", "3"},
			{"4", "2", "2", "1"}
		};
		Assert.assertFalse(testPuzzle.isValidMove(2, 0, "2"));//T T T F
		
		testPuzzle.board = new String[][]{
			{"3", "2", "1", "4"},
			{"1", "4", "3", "2"},
			{"", "4", "2", "3"},
			{"4", "3", "2", "1"}
		};
		Assert.assertFalse(testPuzzle.isValidMove(2, 0, "2"));//T T F T
		
		testPuzzle.board = new String[][]{
			{"3", "2", "1", "4"},
			{"1", "4", "3", "2"},
			{"", "4", "2", "3"},
			{"4", "2", "2", "1"}
		};
		Assert.assertFalse(testPuzzle.isValidMove(2, 0, "2"));//T T F F
		
		testPuzzle.board = new String[][]{
			{"3", "2", "1", "4"},
			{"2", "4", "3", "2"},
			{"", "4", "1", "3"},
			{"4", "3", "2", "1"}
		};
		Assert.assertFalse(testPuzzle.isValidMove(2, 0, "2"));//T F T T
		
		testPuzzle.board = new String[][]{
			{"3", "2", "1", "4"},
			{"2", "4", "3", "2"},
			{"", "4", "1", "3"},
			{"4", "2", "2", "1"}
		};
		Assert.assertFalse(testPuzzle.isValidMove(2, 0, "2"));//T F T F
		
		testPuzzle.board = new String[][]{
			{"3", "2", "1", "4"},
			{"2", "4", "3", "2"},
			{"", "4", "2", "3"},
			{"4", "3", "2", "1"}
		};
		Assert.assertFalse(testPuzzle.isValidMove(2, 0, "2"));//T F F T
		
		testPuzzle.board = new String[][]{
			{"3", "2", "1", "4"},
			{"2", "4", "3", "2"},
			{"", "1", "2", "3"},
			{"4", "2", "2", "1"}
		};
		Assert.assertFalse(testPuzzle.isValidMove(2, 0, "2"));//T F F F
	}
	
	/**
	 * numInXXX函数测试
	 */
	@Test
	public void numInDimensionTest()
	{
		//numInCol函数未覆盖测试
		Assert.assertTrue(testPuzzle.numInCol(0, "1"));
		Assert.assertFalse(testPuzzle.numInCol(5, "1"));
		
		
		//numInRow函数测试
		Assert.assertTrue(testPuzzle.numInRow(0, "1"));
		Assert.assertFalse(testPuzzle.numInRow(5, "1"));
		
		
		//numInBox函数测试
		Assert.assertTrue(testPuzzle.numInBox(0, 0, "1"));
		Assert.assertFalse(testPuzzle.numInBox(5, 4, "1"));
		
		testPuzzle.makeSlotEmpty(1, 1);
		Assert.assertFalse(testPuzzle.numInBox(0, 0, "4"));
	}
	
	/**
	 * isSlotAvailable函数测试
	 */
	@Test
	public void isSlotAvailableTest()
	{
		testPuzzle.makeSlotEmpty(1, 1);
		Assert.assertFalse(testPuzzle.isSlotAvailable(1, 1));//T T F

		testPuzzle.board = new String[][]{
			{"3", "2", "1", "4"},
			{"1", "4", "3", "2"},
			{"2", "1", "4", "3"},
			{"4", "3", "2", "1"}
		};
		testPuzzle.mutable = new boolean[][] {
			{false, false, false, false},
			{false, true, false, false},
			{false, false, false, false},
			{false, false, false, false}
		};
		Assert.assertFalse(testPuzzle.isSlotAvailable(1, 1));//T F T
		
		testPuzzle.makeSlotEmpty(1, 1);
		Assert.assertTrue(testPuzzle.isSlotAvailable(1, 1));//T T T
		Assert.assertFalse(testPuzzle.isSlotAvailable(5, 4));//F T T
	}
	
	/**
	 * getValue函数测试
	 */
	@Test
	public void getValueTest()
	{
		Assert.assertEquals(testPuzzle.getValue(0, 0), "3");
		Assert.assertEquals(testPuzzle.getValue(5, 4), "");
	}
	
	/**
	 * isValidValue函数测试
	 */
	@Test
	public void isValidValueTest()
	{
		testPuzzle.makeMove(1, 1, "0", false);//F
		testPuzzle.makeMove(1, 1, "1", false);//T
		
		testPuzzle = new SudokuPuzzle(4, 4, 2, 2, new String[] {});
		testPuzzle.makeMove(1, 1, "1", false);//不经过循环
	}
	
	/**
	 * inRange函数测试
	 */
	@Test
	public void inRangeTest()
	{
		Assert.assertFalse(testPuzzle.inRange(5, -1));//F T T F
		Assert.assertFalse(testPuzzle.inRange(-1, -1));//T T F F
		Assert.assertFalse(testPuzzle.inRange(3, -1));//T T T F
		Assert.assertTrue(testPuzzle.inRange(3, 3));//T T T T
		Assert.assertFalse(testPuzzle.inRange(-1, 5));//T F F T
		Assert.assertFalse(testPuzzle.inRange(-1, 3));//T T F T
	}
	
}
