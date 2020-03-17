package lex;


import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TranslationTable {
	private static int ID_OFFSET = 100;
	private static int NUM_OFFSET = 1000;
	private static int CHAR_OFFSET = 10000;
	private static int STR_OFFSET = 11000;

	public static final int TOKEN_NUM = 37;
	private static final int OPERATOR_OFFSET = 5;
	private static final int DELIMITER_OFFSET = 25;
	private static List<String> keyWordsList;
	private static List<String> operatorsList;
	private static List<String>	delimitersList;
	private static Map<Integer, String> attributeMap;
	
	static{
		keyWordsList = Arrays.asList("int", "char", "if", "else", "while");
		operatorsList = Arrays.asList(
				"+", "-", "++", "--", "*", "/", "=",
				"<", "<=", ">", ">=", "==", "!=", "<<", ">>", 
				"&", "|", "!", "&&", "||"
		);
		delimitersList = Arrays.asList(",", ";", ".", "(", ")", "[", "]", "{", "}", "#", "\"", "\'", "\\");
		buildAttributeMap();
	}
	
	private static void buildAttributeMap()
	{
		attributeMap = new HashMap<>();
		
		//关键字
		attributeMap.put(0, "INT");
		attributeMap.put(1, "CHAR");
		attributeMap.put(2, "IF");
		attributeMap.put(3, "ELSE");
		attributeMap.put(4, "WHILE");

		//运算符
		attributeMap.put(5, "PLUS");
		attributeMap.put(6, "MINUS");
		attributeMap.put(7, "INCREMENT");
		attributeMap.put(8, "DECREMENT");
		attributeMap.put(9, "MUL");
		attributeMap.put(10, "DIV");
		attributeMap.put(11, "ASSIGN");
		attributeMap.put(12, "<");
		attributeMap.put(13, "LE");
		attributeMap.put(14, ">");
		attributeMap.put(15, "GE");
		attributeMap.put(16, "EQ");
		attributeMap.put(17, "NEQ");
		attributeMap.put(18, "LEFT_SHIFT");
		attributeMap.put(19, "RIGHT_SHIFT");
		attributeMap.put(20, "&");
		attributeMap.put(21, "|");
		attributeMap.put(22, "NOT");
		attributeMap.put(23, "AND");
		attributeMap.put(24, "OR");
		
		//界符
		attributeMap.put(25, "COMMA");
		attributeMap.put(26, "SEMICOLON");
		attributeMap.put(27, "DOT");
		attributeMap.put(28, "LEFT_PARENT");
		attributeMap.put(29, "RIGHT_PARENT");
		attributeMap.put(30, "LEFT_BRACKET");
		attributeMap.put(31, "RIGHT_BRACKET");
		attributeMap.put(32, "LEFT_BRACE");
		attributeMap.put(33, "RIGHT_BRACE");
		attributeMap.put(34, "DOUBLE_QUOTE");
		attributeMap.put(35, "SINGLE_QUOTE");
		attributeMap.put(36, "SEPARATOR");
	}
	
	public static boolean isKeyWord(String token)
	{
		return keyWordsList.contains(token);
	}
	
	public static boolean isOperator(String token)
	{
		return operatorsList.contains(token);
	}
	
	public static boolean isDelimiter(String token)
	{
		return delimitersList.contains(token);
	}
		
	public static Token getKeyWordAttributeValue(String token)
	{
		return new Token(token, attributeMap.get(keyWordsList.indexOf(token)), keyWordsList.indexOf(token));
	}
	
	public static Token getOperatorAttributeValue(String token)
	{
		return new Token(token, attributeMap.get(operatorsList.indexOf(token) + OPERATOR_OFFSET), operatorsList.indexOf(token) + OPERATOR_OFFSET);
	}
	
	public static Token getDelimiterAttributeValue(String token)
	{
		return new Token(token, attributeMap.get(delimitersList.indexOf(token) + DELIMITER_OFFSET), delimitersList.indexOf(token) + DELIMITER_OFFSET);
	}
	
	public static Token getIDAttributeValue(String token)
	{
		return new Token(token, "ID", ID_OFFSET++);
	}
	
	public static Token getNumAttributeValue(String token)
	{
		return new Token(token, "NUM", NUM_OFFSET++);
	}
	
	public static Token getCharAttributeValue(String token)
	{
		return new Token(token, "CHAR", CHAR_OFFSET++);
	}
	
	public static Token getStrAttributeValue(String token)
	{
		return new Token(token, "STRING", STR_OFFSET++);
	}
	
}
