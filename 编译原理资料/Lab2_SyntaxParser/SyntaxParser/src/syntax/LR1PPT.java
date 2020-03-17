package syntax;

import java.util.HashMap;
import java.util.Map;

public class LR1PPT {
	private Map<String, Action[]> actions;
	private Map<String, int[]> gotos;
	
	public LR1PPT()
	{
		buildActionTable();
		buildGotoTable();
	}
	
	/**
	 * 初始化动作表
	 */
	private void buildActionTable()
	{
		actions = new HashMap<String, Action[]>();
		
		
		actions.put("id", new Action[]
				{
		            new Action(ActionType.Shift, 7),//0
		            null,							//1
		            null,							//2
		            null,							//3
		            null,							//4
		            null,							//5
		            new Action(ActionType.Shift, 18),//6
		            null,							//7
		            new Action(ActionType.Shift, 21),//8
		            new Action(ActionType.Shift, 21),//9
		            new Action(ActionType.Shift, 7),//10
		            new Action(ActionType.Shift, 21),//11
		            new Action(ActionType.Shift, 21),//12
		            null,							//13
		            null,							//14
		            null,							//15
		            null,							//16
		            new Action(ActionType.Shift, 18),//17
		            null,							//18
		            new Action(ActionType.Shift, 21),//19
		            null,							//20
		            null,							//21
		            null,							//22
		            null,							//23
		            null,							//24
		            null,							//25
		            new Action(ActionType.Shift, 18),//26
		            new Action(ActionType.Shift, 18),//27
		            null,							//28
		            new Action(ActionType.Shift, 18),//29
		            new Action(ActionType.Shift, 18),//30
		            null,							//31
		            null,							//32
		            null,							//33
		            null,							//34
		            null,							//35
		            null,							//36
		            null,							//37
		            new Action(ActionType.Shift, 7),//38
		            null							//39
		    	}
			);
		
		
		actions.put("number", new Action[]
				{
		            new Action(ActionType.Shift, 1),//0
		            null,							//1
		            null,							//2
		            null,							//3
		            null,							//4
		            null,							//5
		            new Action(ActionType.Shift, 13),//6
		            null,							//7
		            new Action(ActionType.Shift, 1),//8
		            new Action(ActionType.Shift, 1),//9
		            new Action(ActionType.Shift, 1),//10
		            new Action(ActionType.Shift, 1),//11
		            new Action(ActionType.Shift, 1),//12
		            null,							//13
		            null,							//14
		            null,							//15
		            null,							//16
		            new Action(ActionType.Shift, 13),//17
		            null,							//18
		            new Action(ActionType.Shift, 1),//19
		            null,							//20
		            null,							//21
		            null,							//22
		            null,							//23
		            null,							//24
		            null,							//25
		            new Action(ActionType.Shift, 13),//26
		            new Action(ActionType.Shift, 13),//27
		            null,							//28
		            new Action(ActionType.Shift, 13),//29
		            new Action(ActionType.Shift, 13),//30
		            null,							//31
		            null,							//32
		            null,							//33
		            null,							//34
		            null,							//35
		            null,							//36
		            null,							//37
		            new Action(ActionType.Shift, 1),//38
		            null							//39
		    	}
			);
			
		
		actions.put("+", new Action[]
				{
		            null,							//0
		            new Action(ActionType.Reduce, 12),//1
		            null,							//2
		            new Action(ActionType.Reduce, 7),//3
		            new Action(ActionType.Shift, 11),//4
		            new Action(ActionType.Reduce, 10),//5
		            null,//6
		            new Action(ActionType.Reduce, 11),//7
		            null,//8
		            null,//9
		            null,//10
		            null,//11
		            null,//12
		            new Action(ActionType.Reduce, 12),//13
		            new Action(ActionType.Reduce, 7),//14
		            new Action(ActionType.Shift, 29),//15
		            new Action(ActionType.Reduce, 10),//16
		            null,//17
		            new Action(ActionType.Reduce, 11),//18
		            null,//19
		            new Action(ActionType.Reduce, 8),//20
		            new Action(ActionType.Reduce, 11),//21
		            new Action(ActionType.Reduce, 9),//22
		            null,//23
		            new Action(ActionType.Shift, 5),//24
		            new Action(ActionType.Shift, 6),//25
		            null,//26
		            null,//27
		            new Action(ActionType.Reduce, 13),//28
		            null,//29
		            null,//30
		            new Action(ActionType.Shift, 29),//31
		            new Action(ActionType.Shift, 11),//32
		            new Action(ActionType.Reduce, 8),//33
		            new Action(ActionType.Reduce, 9),//34
		            new Action(ActionType.Reduce, 5),//35
		            new Action(ActionType.Reduce, 6),//36
		            new Action(ActionType.Reduce, 13),//37
		            null,//38
		            null//39
		    	}
			);
		
		
		actions.put("-", new Action[]
				{
		            null,							//0
		            new Action(ActionType.Reduce, 12),//1
		            null,							//2
		            new Action(ActionType.Reduce, 7),//3
		            new Action(ActionType.Shift, 12),//4
		            new Action(ActionType.Reduce, 10),//5
		            null,							//6
		            new Action(ActionType.Reduce, 11),//7
		            null,							//8
		            null,							//9
		            null,							//10
		            null,							//11
		            null,							//12
		            new Action(ActionType.Reduce, 12),//13
		            new Action(ActionType.Reduce, 7),//14
		            new Action(ActionType.Shift, 30),//15
		            new Action(ActionType.Reduce, 10),//16
		            null,							//17
		            new Action(ActionType.Reduce, 11),//18
		            null,							//19
		            new Action(ActionType.Reduce, 8),//20
		            new Action(ActionType.Reduce, 11),//21
		            new Action(ActionType.Reduce, 9),//22
		            null,							//23
		            new Action(ActionType.Reduce, 5),//24
		            new Action(ActionType.Reduce, 6),//25
		            null,							//26
		            null,							//27
		            new Action(ActionType.Reduce, 13),//28
		            null,							//29
		            null,							//30
		            new Action(ActionType.Shift, 30),//31
		            new Action(ActionType.Shift, 12),//32
		            new Action(ActionType.Reduce, 8),//33
		            new Action(ActionType.Reduce, 9),//34
		            new Action(ActionType.Reduce, 5),//35
		            new Action(ActionType.Reduce, 6),//36
		            new Action(ActionType.Reduce, 13),//37
		            null,							//38
		            null							//39
		    	}
			);
		
		
		actions.put("*", new Action[]
				{
		            null,							//0
		            new Action(ActionType.Reduce, 12),//1
		            null,							//2
		            new Action(ActionType.Shift, 8),//3
		            null,							//4
		            new Action(ActionType.Reduce, 10),//5
		            null,//6
		            new Action(ActionType.Reduce, 11),//7
		            null,//8
		            null,//9
		            null,//10
		            null,//11
		            null,//12
		            new Action(ActionType.Reduce, 12),//13
		            new Action(ActionType.Shift, 26),//14
		            null,//15
		            new Action(ActionType.Reduce, 10),//16
		            null,//17
		            new Action(ActionType.Reduce, 11),//18
		            null,//19
		            new Action(ActionType.Reduce, 8),//20
		            new Action(ActionType.Reduce, 11),//21
		            new Action(ActionType.Reduce, 9),//22
		            null,//23
		            new Action(ActionType.Shift, 8),//24
		            new Action(ActionType.Shift, 8),//25
		            null,//26
		            null,//27
		            new Action(ActionType.Reduce, 13),//28
		            null,//29
		            null,//30
		            null,//31
		            null,							//32
		            new Action(ActionType.Reduce, 8),//33
		            new Action(ActionType.Reduce, 9),//34
		            new Action(ActionType.Shift, 26),//35
		            new Action(ActionType.Shift, 26),//36
		            new Action(ActionType.Reduce, 13),//37
		            null,//38
		            null//39
		    	}
			);
		
		
		actions.put("/", new Action[]
				{
		            null,							//0
		            new Action(ActionType.Reduce, 12),//1
		            null,							//2
		            new Action(ActionType.Shift, 9),//3
		            null,							//4
		            new Action(ActionType.Reduce, 10),//5
		            null,							//6
		            new Action(ActionType.Reduce, 11),//7
		            null,							//8
		            null,							//9
		            null,							//10
		            null,							//11
		            null,							//12
		            new Action(ActionType.Reduce, 12),//13
		            new Action(ActionType.Shift, 27),//14
		            null,							//15
		            new Action(ActionType.Reduce, 10),//16
		            null,							//17
		            new Action(ActionType.Reduce, 11),//18
		            null,							//19
		            new Action(ActionType.Reduce, 8),//20
		            new Action(ActionType.Reduce, 11),//21
		            new Action(ActionType.Reduce, 9),//22
		            null,							//23
		            new Action(ActionType.Shift, 9),//24
		            new Action(ActionType.Shift, 9),//25
		            null,							//26
		            null,							//27
		            new Action(ActionType.Reduce, 13),//28
		            null,							//29
		            null,							//30
		            null,							//31
		            null,							//32
		            new Action(ActionType.Reduce, 8),//33
		            new Action(ActionType.Reduce, 9),//34
		            new Action(ActionType.Shift, 27),//35
		            new Action(ActionType.Shift, 27),//36
		            new Action(ActionType.Reduce, 13),//37
		            null,							//38
		            null							//39
		    	}
			);
		
		actions.put("=", new Action[]
				{
		            null,							//0
		            null,							//1
		            null,							//2
		            null,							//3
		            null,							//4
		            null,							//5
		            null,							//6
		            new Action(ActionType.Shift, 19),//7
		            null,							//8
		            null,							//9
		            null,							//10
		            null,							//11
		            null,							//12
		            null,							//13
		            null,							//14
		            null,							//15
		            null,							//16
		            null,							//17
		            null,							//18
		            null,							//19
		            null,							//20
		            null,							//21
		            null,							//22
		            null,							//23
		            null,							//24
		            null,							//25
		            null,							//26
		            null,							//27
		            null,							//28
		            null,							//29
		            null,							//30
		            null,							//31
		            null,							//32
		            null,							//33
		            null,							//34
		            null,							//35
		            null,							//36
		            null,							//37
		            null,							//38
		            null							//39
		    	}
			);
		
		
		actions.put("(", new Action[]
				{
		            new Action(ActionType.Shift, 6),//0
		            null,							//1
		            null,							//2
		            null,							//3
		            null,							//4
		            null,							//5
		            new Action(ActionType.Shift, 17),//6
		            null,							//7
		            new Action(ActionType.Shift, 6),//8
		            new Action(ActionType.Shift, 6),//9
		            new Action(ActionType.Shift, 6),//10
		            new Action(ActionType.Shift, 6),//11
		            new Action(ActionType.Shift, 6),//12
		            null,							//13
		            null,							//14
		            null,							//15
		            null,							//16
		            new Action(ActionType.Shift, 17),//17
		            null,							//18
		            new Action(ActionType.Shift, 6),//19
		            null,							//20
		            null,							//21
		            null,							//22
		            null,							//23
		            null,							//24
		            null,							//25
		            new Action(ActionType.Shift, 17),//26
		            new Action(ActionType.Shift, 17),//27
		            null,							//28
		            new Action(ActionType.Shift, 17),//29
		            new Action(ActionType.Shift, 17),//30
		            null,							//31
		            null,							//32
		            null,							//33
		            null,							//34
		            null,							//35
		            null,							//36
		            null,							//37
		            new Action(ActionType.Shift, 6),//38
		            null							//39
		    	}
			);
		
		
		actions.put(")", new Action[]
				{
		            null,							//0
		            null,							//1
		            null,							//2
		            null,							//3
		            null,							//4
		            null,							//5
		            null,							//6
		            null,							//7
		            null,							//8
		            null,							//9
		            null,							//10
		            null,							//11
		            null,							//12
		            new Action(ActionType.Reduce, 12),//13
		            new Action(ActionType.Reduce, 7),//14
		            new Action(ActionType.Shift, 28),//15
		            new Action(ActionType.Reduce, 10),//16
		            null,							//17
		            new Action(ActionType.Reduce, 11),//18
		            null,							//19
		            null,							//20
		            null,							//21
		            null,							//22
		            null,							//23
		            null,							//24
		            null,							//25
		            null,							//26
		            null,							//27
		            null,							//28
		            null,							//29
		            null,							//30
		            new Action(ActionType.Shift, 37),//31
		            null,							//32
		            new Action(ActionType.Reduce, 8),//33
		            new Action(ActionType.Reduce, 9),//34
		            new Action(ActionType.Reduce, 5),//35
		            new Action(ActionType.Reduce, 6),//36
		            new Action(ActionType.Reduce, 13),//37
		            null,							//38
		            null							//39
		    	}
			);
		
		
		actions.put(";", new Action[]
				{
		            null,							//0
		            new Action(ActionType.Reduce, 12),//1
		            null,							//2
		            new Action(ActionType.Reduce, 7),//3
		            new Action(ActionType.Shift, 10),//4
		            new Action(ActionType.Reduce, 10),//5
		            null,							//6
		            new Action(ActionType.Reduce, 11),//7
		            null,							//8
		            null,							//9
		            null,							//10
		            null,							//11
		            null,							//12
		            null,							//13
		            null,							//14
		            null,							//15
		            null,							//16
		            null,							//17
		            null,							//18
		            null,							//19
		            new Action(ActionType.Reduce, 8),//20
		            new Action(ActionType.Reduce, 11),//21
		            new Action(ActionType.Reduce, 9),//22
		            null,							//23
		            new Action(ActionType.Reduce, 5),//24
		            new Action(ActionType.Reduce, 6),//25
		            null,							//26
		            null,							//27
		            new Action(ActionType.Reduce, 13),//28
		            null,							//29
		            null,							//30
		            null,							//31
		            new Action(ActionType.Shift, 38),//32
		            null,							//33
		            null,							//34
		            null,							//35
		            null,							//36
		            null,							//37
		            null,							//38
		            null							//39
		    	}
			);
		
		
		actions.put("$", new Action[]
				{
		            null,							//0
		            null,							//1
		            new Action(ActionType.Accept, 0),//2
		            null,							//3
		            null,							//4
		            null,							//5
		            null,							//6
		            null,							//7
		            null,							//8
		            null,							//9
		            new Action(ActionType.Reduce, 4),//10
		            null,							//11
		            null,							//12
		            null,							//13
		            null,							//14
		            null,							//15
		            null,							//16
		            null,							//17
		            null,							//18
		            null,							//19
		            null,							//20
		            null,							//21
		            null,							//22
		            new Action(ActionType.Reduce, 3),//23
		            null,							//24
		            null,							//25
		            null,							//26
		            null,							//27
		            null,							//28
		            null,							//29
		            null,							//30
		            null,							//31
		            null,							//32
		            null,							//33
		            null,							//34
		            null,							//35
		            null,							//36
		            null,							//37
		            new Action(ActionType.Reduce, 2),//38
		            new Action(ActionType.Reduce, 1)//39
		    	}
			);
	}
	
	/**
	 * 初始化状态转换表
	 */
	private void buildGotoTable()
	{
		gotos = new HashMap<String, int[]>();
		
		gotos.put("S", new int[] {
				2,-1,-1,-1,-1,-1,-1,-1,-1,-1,
				23,-1,-1,-1,-1,-1,-1,-1,-1,-1,
				-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
				-1,-1,-1,-1,-1,-1,-1,-1,39,-1});
		
		gotos.put("E", new int[] {
				4,-1,-1,-1,-1,-1,15,-1,-1,-1,
				4,-1,-1,-1,-1,-1,-1,31,-1,32,
				-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
				-1,-1,-1,-1,-1,-1,-1,-1,4,-1});
		
		gotos.put("T", new int[] {
				3,-1,-1,-1,-1,-1,14,-1,-1,-1,
				3,24,25,-1,-1,-1,-1,14,-1,3,
				-1,-1,-1,-1,-1,-1,-1,-1,-1,35,
				36,-1,-1,-1,-1,-1,-1,-1,3,-1});
		
		gotos.put("F", new int[] {
				5,-1,-1,-1,-1,-1,16,-1,20,22,
				5,5,5,-1,-1,-1,-1,16,-1,5,
				-1,-1,-1,-1,-1,-1,33,34,-1,16,
				16,-1,-1,-1,-1,-1,-1,-1,5,-1});
	}

	public Action[] ACTION(String terminalSymbol) {
		return actions.get(terminalSymbol);
	}

	public int[] GOTO(String nonterminalSymbol) {
		return gotos.get(nonterminalSymbol);
	}
}
