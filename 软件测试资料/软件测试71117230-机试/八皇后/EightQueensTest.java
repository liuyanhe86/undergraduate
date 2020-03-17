package net.mooctest;

import static org.junit.Assert.*;

import org.junit.Test;

import junit.framework.Assert;

public class EightQueensTest {

	@SuppressWarnings("deprecation")
	@Test(timeout = 4000)
	public void test() {
        EightQueens board = new EightQueens();
		Queen[] startBoard = board.generateBoard();
		//测试状态（1个可行解）
		Queen[] solvedStates = new Queen[] {
				new Queen(0, 6), new Queen(1, 4), new Queen(2, 2), new Queen(3, 0), 
				new Queen(4, 5), new Queen(5, 7), new Queen(6, 1), new Queen(7, 3)
		};
		Node testNode;
		Node testNode2;
		
		
        //canAttack测试
        Queen queen = new Queen(2, 2);
		assertTrue(queen.canAttack(new Queen(1, 2)));// F T F
        assertTrue(queen.canAttack(new Queen(2, 1)));// T F F
        assertTrue(queen.canAttack(new Queen(3, 3)));// F F T
        assertFalse(queen.canAttack(new Queen(3, 4)));//F F F
        
        
        //moveDown测试
        queen = new Queen(2, 2);
        queen.moveDown(4);// <= 7 && %7 != 0
        queen = new Queen(2, 2);
        queen.moveDown(5);// <= 7 && %7 == 0
        queen = new Queen(2, 2);
        queen.moveDown(6);// > 7 && %7 != 0
        queen = new Queen(2, 2);
        queen.moveDown(12);//> 7 && %7 == 0
        
        
        //generateNeighbours测试
		testNode = new Node();
		try
		{
			testNode.generateNeighbours(null);
		}
		catch(Exception e){
            assertTrue(e instanceof NullPointerException);
        }
		
		try
		{
			testNode.generateNeighbours(new Node());
		}
		catch(Exception e){
            assertTrue(e instanceof NullPointerException);
        }
		
		testNode2 = new Node();
		testNode2.setState(startBoard);
		testNode.generateNeighbours(testNode2);
		
		
		//compareTo测试
		testNode2 = new Node();
		testNode2.setState(startBoard);
		testNode2.computeHeuristic();
		testNode = new Node(testNode2);
		testNode.computeHeuristic();
		Assert.assertEquals(testNode.compareTo(testNode2), 0);//相等
		
		testNode = new Node();
		testNode2 = new Node();
		testNode2.setState(new Queen[] {
				new Queen(0, 6), new Queen(1, 6), new Queen(2, 6), new Queen(3, 0), 
				new Queen(4, 5), new Queen(5, 7), new Queen(6, 1), new Queen(7, 3)
		});
		testNode2.computeHeuristic();
		Assert.assertEquals(testNode.compareTo(testNode2), -1);//不等（testNode<testNode2)
		Assert.assertEquals(testNode2.compareTo(testNode), 1);//不等（testNode2>testNode)
		
		
        //Random Restart算法测试
		RandomRestart randomRestart = new RandomRestart(startBoard);
		testNode = randomRestart.randomRestart();
		System.out.println("RandomRestart Algorithm Test:\n" + testNode.toString());
		
		
		//Simulated Annealing算法测试
		SimulatedAnnealing simulatedAnnealing;
        
        
		simulatedAnnealing = new SimulatedAnnealing(solvedStates);
		testNode = simulatedAnnealing.simulatedAnneal(0.0, 0.0);//F F
		System.out.println("Simulated Annealing Algorithm Test 0:\n" + testNode.toString());
        
        simulatedAnnealing = new SimulatedAnnealing(solvedStates);
		testNode = simulatedAnnealing.simulatedAnneal(1.0, 0.0);//F T
		System.out.println("Simulated Annealing Algorithm Test 2:\n" + testNode.toString());
        
		simulatedAnnealing.startState();
		testNode = simulatedAnnealing.simulatedAnneal(0.0, 0.0);//T F
        System.out.println("Simulated Annealing Algorithm Test 1:\n" + testNode.toString());
		
		simulatedAnnealing.startState();
		testNode = simulatedAnnealing.simulatedAnneal(1.0, 0.0);//T T
		System.out.println("Simulated Annealing Algorithm Test 3:\n" + testNode.toString());
	}

}
