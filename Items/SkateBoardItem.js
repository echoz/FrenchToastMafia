class SkateBoardItem extends InventoryItem {
	
	var normalSpeed : float = 20;
	var skateSpeed : float = 50;
	
	function Awake() {
		worldName  = "Skateboard";
		description = "Skate Skate Skate!! Run Run Run!!";
		quantity = 1;
		unitSpaceRequired = 1;
		consummable = false;
		prefabName = "SkateBoard";
		className = "SkateBoardItem";	
	}

	function activeWillUpdateFunction() {
	}
	function activeDidUpdateFunction() {
	}
	function activeWillGUIFunction() {
	}
	function activeDidGUIFunction() {
	}
	function equippedWillUpdateFunction() {
	}
	function equippedDidUpdateFunction() {
	}
	function equippedWillGUIFunction() {
	}
	function equippedDidGUIFunction() {
	}
	function performFunction() {		
		findProps();

		if (thePlayer.GetComponent(FPSWalker).speed == normalSpeed) {
			thePlayer.GetComponent(FPSWalker).speed = skateSpeed;
			theDirector.addSubtitle(new Subtitle("Skateboard! Wheeeeeeeeeeeeeeeeee!", 3));

		}
		else {
			thePlayer.GetComponent(FPSWalker).speed = normalSpeed;
			theDirector.addSubtitle(new Subtitle("Got off the skateboard", 3));
		}
	}	
	function willThrowItem() {
	}
	function didThrowItem() {
	}
	
}