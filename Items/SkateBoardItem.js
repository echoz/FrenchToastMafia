class SkateBoardItem extends InventoryItem {
	
	function Awake() {
		worldName  = "SkateBoard";
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
		if (FPSWalker.speed == 20) {
			Debug.Log(FPSWalker.speed);
			FPSWalker.speed = 100;
		}
		else {
			Debug.Log(FPSWalker.speed);
			FPSWalker.speed = 20;
		}
	}	
	
	function findProps() {
	}
	function willThrowItem() {
	}
	function didThrowItem() {
	}
	
}