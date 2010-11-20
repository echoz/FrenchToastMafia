class BaseballBatItem extends InventoryItem {
	
	function Awake() {
		worldName  = "BaseballBat";
		description = "Homerun!!! You just gotta run for it!!";
		quantity = 1;
		unitSpaceRequired = 1;
		consummable = false;
		prefabName = "BaseballBat";
		className = "BaseballBatItem";	
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
	function findProps() {
	}
	function willThrowItem() {
	}
	function didThrowItem() {
	}
	
}