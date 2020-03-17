package test;

import org.junit.Test;

import lex.Analyzer;
import syntax.LR1Parser;

public class LR1ParserTest {
	@Test
	public void test()
	{
		Analyzer lexicalAnalyzer = new Analyzer("test.txt", "tokens.txt");
		try {
			lexicalAnalyzer.analyze();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		LR1Parser syntaxParser = new LR1Parser("reductions.txt", lexicalAnalyzer.getTokenList());
		try {
			syntaxParser.parse();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
