package syntax;

enum StackItemType {
    Token, State;
}

public class StackItem {
	StackItemType type;
    String value;
    int state;

    //栈元素类型为Token
    public StackItem(StackItemType t, String val) {
        type = t;
        value = val;
    }

    //栈元素类型为State
    public StackItem(StackItemType t, int s) {
        type = t;
        state = s;
    }
    
}
