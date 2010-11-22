class DaggerItem extends InventoryItem {

	function Awake() {
		worldName  = "Dagger";
		description = "Useful for self-defense.";
		quantity = 1;
		unitSpaceRequired = 1;
		consummable = false;
		prefabName = "Dagger";
		className = "DaggerItem";	
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
	}
	function willThrowItem() {
	}
	function didThrowItem() {
	}
	
}