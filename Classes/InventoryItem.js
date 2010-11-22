class InventoryItem extends WorldObject {
	var description : String;
	var quantity : int;
	var unitSpaceRequired: int;
	var consummable : boolean;
	var prefabName : String;
	var className : String;
	
	var icon_small : Texture;
	var icon_large : Texture;
	
	private var showWindow : boolean = false;
	protected var thePlayer : GameObject;
	protected var theDirector : Director;
	
	// activeWillUpdateFunction = once activeItem, on going function in Update() before main body of code
	// equippedWIllUpdateFunction = when in inventory function works in Update() before main body of code
	// activeWillGUIFunction = once activeItem on going function in GUI() before main body of code
	// equippedWillGUIFunction = when in inventory function works in GUI() before main body of code
	// activeDidUpdateFunction = once activeItem, on going function in Update() after main body of code
	// equippedDidUpdateFunction = when in inventory function works in Update() after main body of code
	// activeDidGUIFunction = once activeItem on going function in GUI() after main body of code
	// equippedDidGUIFunction = when in inventory function works in GUI() after main body of code
	// performFunction = only on mouse click for active item
	
	function activeWillUpdateFunction() {
		Debug.Log("Please Override activeWillUpdateFunction");
	}
	function activeDidUpdateFunction() {
		Debug.Log("Please Override activeDidUpdateFunction");
	}
	function activeWillGUIFunction() {
		Debug.Log("Please Override activeWillGUIFunction");
	}
	function activeDidGUIFunction() {
		Debug.Log("Please Override activeDidGUIFunction");
	}
	function equippedWillUpdateFunction() {
		Debug.Log("Please Override equippedWillUpdateFunction");
	}
	function equippedDidUpdateFunction() {
		Debug.Log("Please Override equippedDidUpdateFunction");
	}
	function equippedWillGUIFunction() {
		Debug.Log("Please Override equippedWillGUIFunction");
	}
	function equippedDidGUIFunction() {
		Debug.Log("Please Override equippedDidGUIFunction");
	}
	function performFunction() {
		Debug.Log("Please Override performFunction");
	}
	function willThrowItem() {
		Debug.Log("Please Override willThrowItem");
	}
	function didThrowItem() {
		Debug.Log("Please Override didThrowItem");
	}
	function wake() {
		Debug.Log("Please override wake to let item know its awoken from restore");
	}
	
	function findProps() {
		thePlayer = GameObject.FindWithTag("GameController");
		if (GameObject.FindWithTag("god"))
			theDirector = GameObject.FindWithTag("god").GetComponent(Director);
	}	

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