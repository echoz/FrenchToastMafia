class CarKeyItem extends InventoryItem {

	function Awake() {
		worldName  = "Car Keys";
		description = "You will need this to be able to drive your car";
		quantity = 1;
		unitSpaceRequired = 1;
		consummable = false;
		prefabName = "CarKey";
		className = "CarKeyItem";
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
		theDirector.addSubtitle(new Subtitle("I'm pretty sure this keys only work with my car...", 2));
	}
	function willThrowItem() {
	}
	function didThrowItem() {
	}
	
}