package syntax;

enum ActionType {
    Shift,
    Reduce,
    Accept;
}

public class Action {
	ActionType type;
    int stateRule;

    public Action(ActionType type, int stateRule) 
    {
        this.type = type;
        this.stateRule = stateRule;
    }
}
