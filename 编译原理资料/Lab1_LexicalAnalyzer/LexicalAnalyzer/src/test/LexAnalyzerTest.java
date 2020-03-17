package test;

import org.junit.*;

import lex.Analyzer;

public class LexAnalyzerTest {
	@Test
	public void test()
	{
		Analyzer scanner = new Analyzer("test.cpp", "tokens.txt");
		try {
			scanner.analyze();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
