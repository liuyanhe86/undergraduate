package lex;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.PushbackReader;
import java.util.Stack;

public class Analyzer {
	private String anaylyzingFilePath;
	private String tokensFilePath;
	
	private static int lineNumber = 0;
	
	private Stack<Character> parenthesisStack = new Stack<>();//圆括号栈
	private Stack<Character> bracketStack = new Stack<>();//方括号栈
	private Stack<Character> braceStack = new Stack<>();//花括号栈
	private Stack<Integer> parenthesisLineNumberStack = new Stack<>();//圆括号栈
	private Stack<Integer> bracketLineNumberStack = new Stack<>();//方括号栈
	private Stack<Integer> braceLineNumberStack = new Stack<>();//花括号栈
		
	public Analyzer(String anaylyzingFilePath, String tokensFilePath)
	{
		this.anaylyzingFilePath = anaylyzingFilePath;
		this.tokensFilePath = tokensFilePath;
	}
	
	public void analyze() throws Exception
	{
		File anaylyzingFile = new File(anaylyzingFilePath);
		File tokensFile = new File(tokensFilePath);
		
		PushbackReader pr = null;
		BufferedWriter bw = null; 
		try {
			pr = new PushbackReader(new FileReader(anaylyzingFile));
			bw = new BufferedWriter(new FileWriter(tokensFile));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		char c;
		String buffer = "";
		try {
			while((c = (char) pr.read()) != -1 && c < 65535)
			{
				if(isWhiteSpace(c))
				{
					if(c == '\n')
						lineNumber++;
					continue;
				}
				else if(isDigit(c))
				{
					if(c == '0')//只含小数
					{
						buffer += c;
						c = (char)pr.read();
						if(c == '.')
						{
							buffer += c;
							while((c = (char) pr.read()) != -1 && c < 65535 && isDigit(c))//读取所有数字
								buffer += c;
							if(buffer.length() == 2)
								throw new Exception("Error: illegal number: \"" + buffer + c + "\"; lineNumber: " + lineNumber);
							else if(isLetter(c))
								throw new Exception("Error: illegal number: \"" + buffer + c + "\"; lineNumber: " + lineNumber);
							else if(c == -1 || c == 65535)
								throw new Exception("Error: overflow");
						}
						else if(isDigit(c))
							throw new Exception("Error: illegal number: \"" + buffer + c + "\"; lineNumber: " + lineNumber);
						pr.unread(c);
						writeNum(bw, buffer);
						buffer = "";
					}
					else
					{
						buffer += c;
						while((c = (char) pr.read()) != -1 && c < 65535 && 
								(isDigit(c) || c == '.'))//读取所有数字和小数点
							buffer += c;
//						if(!isWhiteSpace(lexeme))
//							throw new Exception("Error: illegal number: " + buffer+lexeme + "; lineNumber: " + lineNumber);
						pr.unread(c);
						if(buffer.lastIndexOf(".") != buffer.indexOf("."))//含多个小数点
							throw new Exception("Error: illegal number: " + buffer + "; lineNumber: " + lineNumber);
						else if(buffer.lastIndexOf(".") == buffer.length() - 1)
							throw new Exception("Error: illegal number: " + buffer + "; lineNumber: " + lineNumber);
						else if(isLetter(c))
							throw new Exception("Error: illegal number: \"" + buffer + c + "\"; lineNumber: " + lineNumber);
						else if(c == -1 || c == 65535)
							throw new Exception("Error: overflow");
						else
						{
							writeNum(bw, buffer);
							buffer = "";
						}	
					}
				}
				else if(isLetter(c))
				{
					if(c == 'c')
					{
						buffer += c;
						c = (char)pr.read();
						if(c == 'h')
						{
							buffer += c;
							c = (char)pr.read();
							if(c == 'a')
							{
								buffer += c;
								c = (char)pr.read();
								if(c == 'r')
								{
									buffer += c;
									c = (char)pr.read();
									if(!isLetter(c) || !isDigit(c))
									{
										pr.unread(c);
										writeKeyWord(bw, buffer);
										buffer = "";
										continue;
									}
								}
							}	
						}
					}
					else if(c == 'e')
					{
						buffer += c;
						c = (char)pr.read();
						if(c == 'l')
						{
							buffer += c;
							c = (char)pr.read();
							if(c == 's')
							{
								buffer += c;
								c = (char)pr.read();
								if(c == 'e')
								{
									buffer += c;
									c = (char)pr.read();
									if(!isLetter(c) || !isDigit(c))
									{
										pr.unread(c);
										writeKeyWord(bw, buffer);
										buffer = "";
										continue;
									}
								}
							}
						}
					}
					else if(c == 'i')
					{
						buffer += c;
						c = (char)pr.read();
						if(c == 'f')
						{
							buffer += c;
							c = (char)pr.read();
							if(!isLetter(c) || !isDigit(c))
							{
								pr.unread(c);
								writeKeyWord(bw, buffer);
								buffer = "";
								continue;
							}
						}
						else if(c == 'n')
						{
							buffer += c;
							c = (char)pr.read();
							if(c == 't')
							{
								buffer += c;
								c = (char)pr.read();
								if(!isLetter(c) || !isDigit(c))
								{
									pr.unread(c);
									writeKeyWord(bw, buffer);
									buffer = "";
									continue;
								}
							}
						}
					}
					else if(c == 'w')
					{
						buffer += c;
						c = (char)pr.read();
						if(c == 'h')
						{
							buffer += c;
							c = (char)pr.read();
							if(c == 'i')
							{
								buffer += c;
								c = (char)pr.read();
								if(c == 'l')
								{
									buffer += c;
									c = (char)pr.read();
									if(c == 'e')
									{
										buffer += c;
										c = (char)pr.read();
										if(!isLetter(c) || !isDigit(c))
										{
											pr.unread(c);
											writeKeyWord(bw, buffer);
											buffer = "";
											continue;
										}
									}
								}
							}
						}
					}
					pr.unread(c);
					while((c = (char) pr.read()) != -1 && 
								(isDigit(c) || isLetter(c)))
						buffer += c;
//					if(!isWhiteSpace(lexeme))
//						throw new Exception("Error: illegal word: " + buffer+lexeme + "; lineNumber: " + lineNumber);
					pr.unread(c);
					writeIdentifier(bw, buffer);
					buffer = "";
				}
				else if(isOperator(c))
				{			
					if(isCombinedOperator(c))
					{
						buffer += c;
						char former = c;
						if(isOperator(c = (char) pr.read()))
						{
							buffer += c;
							switch(former)
							{
							case '+':
								if(c != '+')
									throw new Exception("Error: illegal operator: " + buffer + "; lineNumber: " + lineNumber);
								break;
							case '-':
								if(c != '-')
									throw new Exception("Error: illegal operator: " + buffer + "; lineNumber: " + lineNumber);
								break;
							case '>':
								if(c != '>' && c != '=')
									throw new Exception("Error: illegal operator: " + buffer + "; lineNumber: " + lineNumber);
								break;
							case '<':
								if(c != '<' && c != '=')
									throw new Exception("Error: illegal operator: " + buffer + "; lineNumber: " + lineNumber);
								break;
							case '=':
								if(c != '=')
									throw new Exception("Error: illegal operator: " + buffer + "; lineNumber: " + lineNumber);
								break;
							case '!':
								if(c != '=')
									throw new Exception("Error: illegal operator: " + buffer + "; lineNumber: " + lineNumber);
								break;
							case '&':
								if(c != '&')
									throw new Exception("Error: illegal operator: " + buffer + "; lineNumber: " + lineNumber);
								break;
							case '|':
								if(c != '|')
									throw new Exception("Error: illegal operator: " + buffer + "; lineNumber: " + lineNumber);
								break;
							}
							writeOperator(bw, buffer);
							buffer = "";
						}
						else
						{
							pr.unread(c);
							writeOperator(bw, buffer);
							buffer = "";
						}
					}
					else
					{
						buffer += c;
						writeOperator(bw, buffer);
						buffer = "";
					}
				}
				else if(isDelimiter(c))
				{
					if(c == '\"')//字符串
					{
						buffer += c;
						while((c = (char) pr.read()) != '\"' && c != -1 && c < 65535)
							buffer += c;
						if(c == 65535)
							throw new Exception("Error: overflow");
						else if(c == -1)
							throw new Exception("Error: string without right double quote: " + buffer + "; lineNumber: " + lineNumber);
						else
							buffer += c;
						writeString(bw, buffer);
						buffer = "";
					}
					else if(c == '\'')//字符
					{
						buffer += c;
						c = (char) pr.read();
						buffer += c;
						if(c == '\\')//转义字符
						{
							c = (char) pr.read();
							if(c != '\'' || c != '\"' || c != '\\' || c != 't' || c != 'r' || c != 'n')
								throw new Exception("Error: illegal character: " + buffer + c + "; lineNumber: " + lineNumber);
							else
								buffer += c;
						}
						else
						{
							c = (char) pr.read();//读入字符
							if(c != '\'')
								throw new Exception("Error: character lack of right quote: " + buffer + c + "; lineNumber: " + lineNumber);
							buffer += c;
						}
						writeCharacter(bw, buffer);
						buffer = "";
					}
					else if(c == '(' || c == '[' || c == '{') //左括号
					{
						buffer += c;
						if(c == '(')
						{
							parenthesisStack.push(c);
							parenthesisLineNumberStack.push(lineNumber);
						}
						else if(c == '[')
						{
							bracketStack.push(c);
							bracketLineNumberStack.push(lineNumber);
						}
						else if(c == '{')
						{
							braceStack.push(c);
							braceLineNumberStack.push(lineNumber);
						}
						writeDelimiter(bw, buffer);
						buffer = "";
					}
					else if(c == ')' || c == ']' || c == '}') //右括号
					{
						buffer += c;
						if(c == ')')
						{
							if(!parenthesisStack.isEmpty())
								parenthesisStack.pop();
							else
								throw new Exception("Error: unmatched right parenthesis: " + buffer + c + "; lineNumber: " + lineNumber);
						}		
						else if(c == ']')
						{
							if(!bracketStack.isEmpty())
								bracketStack.pop();
							else
								throw new Exception("Error: unmatched right bracket: " + buffer + c + "; lineNumber: " + lineNumber);
						}		
						else if(c == '}')
						{
							if(!braceStack.isEmpty())
								braceStack.pop();
							else
								throw new Exception("Error: unmatched right brace: " + buffer + c + "; lineNumber: " + lineNumber);
						}
						writeDelimiter(bw, buffer);
						buffer = "";
					}
					else
					{
						buffer += c;
						writeDelimiter(bw, buffer);
						buffer = "";
					}
				}
				else
				{
					throw new Exception("Error: illegal charater: " + (int)c + "; lineNumber: " + lineNumber);
				}
			}
			if(!parenthesisStack.isEmpty())
				throw new Exception("Error: unmatched left parenthesis; lineNumber: " + parenthesisLineNumberStack.peek());
			if(!bracketStack.isEmpty())
				throw new Exception("Error: unmatched left bracket; lineNumber: " + bracketLineNumberStack.peek());
			if(!braceStack.isEmpty())
				throw new Exception("Error: unmatched left brace; lineNumber: " + braceLineNumberStack.peek());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally {
			bw.close();
			pr.close();
		}
		System.out.println("Lexical Analysis Succeeded!");
	}

	private boolean isDigit(char c)
	{
		return c>='0' && c<='9';
	}
	
	private boolean isLetter(char c)
	{
		return (c>='a' && c<='z') || (c>='A' && c<='Z');
	}
	
	private boolean isWhiteSpace(char c)
	{
		return c == '\n' || c == '\t' || c == '\r' || c == ' ';
	}
	
	private boolean isOperator(char c)
	{
		return c == '+' || c == '-' || c == '*' || c == '/' || c == '=' || c == '<' || c == '>' || c == '!' || c == '&' || c == '|'; 
	}
	
	private boolean isCombinedOperator(char c) {
		// TODO Auto-generated method stub
		return c == '+' || c == '-' || c == '=' || c == '<' || c == '>' || c == '&' || c == '|' || c == '!';
	}
	
	private boolean isDelimiter(char c)
	{
		return TranslationTable.isDelimiter("" + c);
	}
	
	private void writeNum(BufferedWriter bw, String number)
	{
		Token token = TranslationTable.getNumAttributeValue(number);
		writeToken(bw, token);
	}
	
	private void writeIdentifier(BufferedWriter bw, String identifier)
	{
		Token token = TranslationTable.getIDAttributeValue(identifier);
		writeToken(bw, token);
	}
	
	private void writeKeyWord(BufferedWriter bw, String keyWord)
	{
		Token token = TranslationTable.getKeyWordAttributeValue(keyWord);
		writeToken(bw, token);
	}
	
	private void writeOperator(BufferedWriter bw, String operator)
	{
		Token token = TranslationTable.getOperatorAttributeValue(operator);
		writeToken(bw, token);
	}
	
	private void writeDelimiter(BufferedWriter bw, String delimiter)
	{
		Token token = TranslationTable.getDelimiterAttributeValue(delimiter);
		writeToken(bw, token);
	}
	
	private void writeString(BufferedWriter bw, String str) {
		Token token = TranslationTable.getStrAttributeValue(str);
		writeToken(bw, token);
	}

	private void writeCharacter(BufferedWriter bw, String ch) {
		Token token = TranslationTable.getCharAttributeValue(ch);
		writeToken(bw, token);
	}
	
	private void writeToken(BufferedWriter bw, Token token)
	{
		try {
			bw.write(token.toString() + "\n");
			bw.flush();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
}
