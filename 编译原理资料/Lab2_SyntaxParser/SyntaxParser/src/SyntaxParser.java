import lex.Analyzer;
import syntax.LR1Parser;

public class SyntaxParser {

	public static void main(String[] args) {
		if(args.length < 3)
			System.out.println("Please input parsing file and output file!");
		else
		{
			Analyzer lexicalAnalyzer = new Analyzer(args[0], args[1]);
			try {
				lexicalAnalyzer.analyze();
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			LR1Parser syntaxParser = new LR1Parser(args[2], lexicalAnalyzer.getTokenList());
			try {
				syntaxParser.parse();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

}
