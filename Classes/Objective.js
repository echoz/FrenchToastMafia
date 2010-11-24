class Objective extends MonoBehaviour {
	public var completed : boolean = false;
	var nextLevel : String;
	var developer : boolean = false;
	var className : String;

	var subtitleDelay : float = 2;
	protected var subtitlesDone : boolean = false;
	
	protected var theDirector : Director;
	protected var thePlayer : GameObject;
	
	function notification(who : Object, msg : String, userInfo : Object) {
		Debug.Log("Please override notification!");
	}
	
	function findProps() {
		thePlayer = GameObject.FindWithTag("GameController");
		
		if (GameObject.FindWithTag("god"))
			theDirector = GameObject.FindWithTag("god").GetComponent(Director);	
	}
	
	function completedLevel() {
		findProps();
		theDirector.load_level(nextLevel);
	}
	
	function canLoadLevel() {
		Debug.Log("Please override canLoadLevel");
		return false;
	}
	
	function willSaveState() {
	}

	function didSaveState() {
	}
	
	function willRestoreState() {
	}
	
	function didRestoreState() {
	}	
}