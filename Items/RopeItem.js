class RopeItem extends InventoryItem {

	function Awake() {
		worldName  = "Rope";
		description = "Useful for tying shit up.";
		quantity = 1;
		unitSpaceRequired = 1;
		consummable = false;
		prefabName = "Rope";
		className = "RopeItem";	
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