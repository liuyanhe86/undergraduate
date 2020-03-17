package lex;


public class Token {
	private String word;
	private String attribute;
	private int innerCode;
	
	public Token(String word, String attribute, int innerCode)
	{
		this.word = word;
		this.attribute = attribute;
		this.innerCode = innerCode;
	}
	
	@Override
	public String toString()
	{
		return "< " + word + ", " + attribute + ", " + innerCode + ">";
	}
	
	public boolean isKeyWord()
	{
		return TranslationTable.isKeyWord(attribute);
	}
	
	public boolean isOperator()
	{
		return TranslationTable.isOperator(attribute);
	}
	
	public boolean isDelimiter()
	{
		return TranslationTable.isDelimiter(attribute);
	}
	
	public boolean isID()
	{
		return innerCode >=100 && innerCode <1000;
	}
	
	public boolean isNum()
	{
		return innerCode >=1000 && innerCode <10000;
	}
	
	public boolean isChar()
	{
		return innerCode >=10000 && innerCode < 11000;
	}
	
	public boolean isStr()
	{
		return innerCode >=11000;
	}
}
