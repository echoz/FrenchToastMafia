class InventoryItem extends WorldObject {
	var description : String;
	var quantity : int;
	var unitSpaceRequired: int;
	
	private var showWindow : boolean = false;
	private var thePlayer : GameObject;
		
	function checkCollision(who : GameObject) {
		return (who == thePlayer);
	}
	
	// gps, first aid, car keys, radio, food rations, rope
	function OnTriggerEnter(who : Collider) {
		if( who.gameObject.tag == "GameController" ) {
			showWindow = true;
			thePlayer = who.gameObject;
			notify(thePlayer.GetComponent(Backpack), "InItemSpace", null);
		}
	}
	
	/// Goodbye !
	function OnTriggerExit(who : Collider) {
		/// He's leaving you !
		if( who.gameObject.tag == "GameController" ) {
			showWindow = false;
			notify(thePlayer.GetComponent(Backpack), "OutItemSpace", null);
			thePlayer = null;
			
		}
	}
	
	
	function OnGUI() {
		if (showWindow) {
			var width : int = Screen.width/2;
			var height : int = Screen.height/2;
			GUI.Window (0, new Rect (width,height,300,150), DoWindow, "Press [E] to pick up");
		}
	}
	
	function DoWindow (windowID : int) {
		GUI.Label (new Rect(5, 15, 295, 25), "Item: " + worldName);
		GUI.Label (new Rect(5, 30, 295, 25), "Quantity: " + quantity);
		GUI.Label (new Rect(5, 45, 295, 25), "Space Required: " + unitSpaceRequired * quantity);		
		GUI.Label (new Rect(5, 60, 295, 75), "Description: " + description);
	}	
}