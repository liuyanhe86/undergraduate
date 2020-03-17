package syntax;

public class Production {
	
    private String left;
    private String[] right;

    public Production(String left, String[] right) {
        this.left = left;
        this.right = right;
    }
    
    public String getLeft()
    {
    	return left;
    }

    public String[] getRight() 
    {
        return right;
    }

    @Override
    public String toString() 
    {
        String production = left + " -> ";
        if (right != null)
            for (String str : right)
            	production = production + str + " ";
        else
        	production += "ε";
        return production;
    }
}