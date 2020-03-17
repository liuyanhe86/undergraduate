import lex.Analyzer;

public class LexicalAnalyzer {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		if(args.length < 2)
			System.out.println("Please input parsing file and output file!");
		else
		{
			Analyzer analyzer = new Analyzer(args[0], args[1]);
			try {
				analyzer.analyze();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

}
