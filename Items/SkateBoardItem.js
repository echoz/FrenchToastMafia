class SkateBoardItem extends InventoryItem {
	
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

		if (FPSWalker.speed == 20) {
			FPSWalker.speed = 40;
			theDirector.addSubtitle(new Subtitle("Skateboard! Wheeeeeeeeeeeeeeeeee!", 3,0.5));

		}
		else {
			FPSWalker.speed = 20;
			theDirector.addSubtitle(new Subtitle("Got off the skateboard", 3,0.5));
		}
	}	
	function willThrowItem() {
	}
	function didThrowItem() {
	}
	
}