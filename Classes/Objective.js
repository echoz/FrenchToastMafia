class Objective extends MonoBehaviour {
	public var completed : boolean = false;

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
}