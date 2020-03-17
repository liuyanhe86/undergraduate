package syntax;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.Iterator;
import java.util.List;
import java.util.Stack;

import lex.Token;

public class LR1Parser {
	private LR1PPT ppt;
	private Production[] productionSet;
	private Stack<StackItem> parseStack;
	private String derivationFilePath;
	private List<Token> tokens;
	
	public LR1Parser(String derivationFilePath, List<Token> tokens)
	{
		ppt = new LR1PPT();
		buildProductionSet();
		parseStack = new Stack<>();
		this.derivationFilePath = derivationFilePath;
		this.tokens = tokens;
		this.tokens.add(new Token("$", "DOLLAR", -1));
	}
	
	/**
	 * 执行分析
	 * @throws Exception
	 */
	public void parse() throws Exception
	{
		File derivationFile = new File(derivationFilePath);
		BufferedWriter bw = new BufferedWriter(new FileWriter(derivationFile));

		parseStack.push(new StackItem(StackItemType.State, 0));
		
		Iterator<Token> tokenIterator = tokens.iterator();
		Token curToken = tokenIterator.next();
		
		while(true)
		{
            Action action = ppt.ACTION((curToken.isID() ? "id" : 
            								(curToken.isNum() ? "number" : 
            									curToken.getWord())))[parseStack.peek().state];

            if(action == null)
            {
                bw.close();
                throw new Exception("Unexpected token: " + curToken);
            }
            else if(action.type == ActionType.Accept) 
            {
            	Production reduction = productionSet[action.stateRule];
            	bw.write(reduction + "\r\n");
                bw.flush();
                bw.close();
                System.out.println("Syntax Parse Succeeded!");
                return;
            } 
            else if(action.type == ActionType.Shift) 
            {
            	parseStack.push(new StackItem(StackItemType.Token, (curToken.isID() ? "id" : 
																	(curToken.isNum() ? "number" : 
																		curToken.getWord()))));
            	parseStack.push(new StackItem(StackItemType.State, action.stateRule));
            	curToken = tokenIterator.next();
            } 
            else if (action.type == ActionType.Reduce) 
            {
                Production reduction = productionSet[action.stateRule];
                bw.write(reduction + "\r\n");
                bw.flush();
                for (int i = reduction.getRight().length - 1; i >= 0; i--) 
                {
                	parseStack.pop();
                	String topSymbol = parseStack.peek().value;
                	String reducedSymbol = reduction.getRight()[i];
                    if (topSymbol.equals(reducedSymbol)) 
                    {
                    	parseStack.pop();
                        continue;
                    }
                    else
                    {
                        bw.close();
                    	throw new Exception("Failed to reduce :" + parseStack.toString());
                    }
                }

                int nextState = ppt.GOTO(reduction.getLeft())[parseStack.peek().state];
                parseStack.push(new StackItem(StackItemType.Token, reduction.getLeft()));
                parseStack.push(new StackItem(StackItemType.State, nextState));
            }
		}
	}
	
	/**
	 * 初始化产生式集合
	 */
	private void buildProductionSet()
	{
		productionSet = new Production[] {
			new Production("S'", 	new String[]{"S"}),						//0
			new Production("S", 	new String[]{"id", "=", "E", ";", "S"}),//1
			new Production("S", 	new String[]{"id", "=", "E", ";"}),		//2
			new Production("S", 	new String[]{"E", ";", "S"}),			//3
			new Production("S", 	new String[]{"E", ";"}),				//4
			new Production("E", 	new String[]{"E", "+", "T"}),			//5
			new Production("E", 	new String[]{"E", "-", "T"}),			//6
			new Production("E", 	new String[]{"T"}),						//7
			new Production("T", 	new String[]{"T", "*", "F"}),			//8
			new Production("T", 	new String[]{"T", "/", "F"}),			//9
			new Production("T", 	new String[]{"F"}),						//10
			new Production("F", 	new String[]{"id"}),					//11
			new Production("F", 	new String[]{"number"}),				//12
			new Production("F", 	new String[]{"(", "E", ")"}),			//13
		};
	}
	
}
