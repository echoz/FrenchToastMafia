class ObjectiveTrigger extends WorldObject {
	
	private var theObjective : Objective;
	
	function findProps() {
		if (GameObject.FindWithTag("objective")) {
			theObjective = GameObject.FindWithTag("objective").GetComponent(Objective);	
		}	
	}
	
	// gps, first aid, car keys, radio, food rations, rope
	function OnTriggerEnter(who : Collider) {
		if( who.gameObject.tag == "GameController" ) {
			findProps();
			notify(theObjective, "InTriggerSpace", null);
		}
	}
	
	/// Goodbye !
	function OnTriggerExit(who : Collider) {
		/// He's leaving you !
		if( who.gameObject.tag == "GameController" ) {
			findProps();			
			notify(theObjective, "OutTriggerSpace", null);			
		}
	}
}