class IPhone4Item extends InventoryItem {
	
	function Awake() {
		worldName  = "iPhone 4";
		description = "Use it to call yourself.";
		quantity = 1;
		unitSpaceRequired = 1;
		consummable = false;
		prefabName = "IPhone4";
		className = "IPhone4Item";	
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
		theDirector.addSubtitle(new Subtitle("*static*", 3, 0.5));		
		theDirector.addSubtitle(new Subtitle("Michael: Can't seem to get a signal on this phone", 4, 0.5));		
		theDirector.addSubtitle(new Subtitle("Michael: Think I should try the radio at 12.50Hz", 5));
	}		
	function willThrowItem() {
	}
	function didThrowItem() {
	}
	
}