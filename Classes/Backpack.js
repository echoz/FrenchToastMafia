class Backpack extends MonoBehaviour {
	var maxCapacity : int = 100;
	var items = new Array();
	var ui : Texture2D;

	var activeItem : InventoryItem;

	private var collideItems = new Array();

	// gui
	function OnGUI() {
		var activeHeight : float = 64.0;
		var activeWidth : float = 64.0;
		var normalHeight : float = 48.0;
		var normalWidth : float = 48.0;
		var gap : float = 1.0;
		var screenLeftPadding : float = 10.0;
		var screenBottomPadding : float = 10.0;
				
		if (items.length > 0) {
			// do complex gui drawing

			GUI.Box(new Rect(screenLeftPadding, Screen.height - screenBottomPadding - activeHeight, activeWidth, activeHeight), activeItem.worldName);
			if (activeItem.consummable)
				GUI.Label(new Rect(screenLeftPadding + 5, Screen.height - screenBottomPadding - 20.0, activeWidth - 5, 25.0), "" + activeItem.quantity);
			
			var i = 0;
			
			for (var item : InventoryItem in items) {
				if (item !== activeItem) {
					GUI.Box(new Rect((screenLeftPadding + activeWidth) + (i * normalWidth) + gap, Screen.height - screenBottomPadding - normalHeight, normalWidth, normalHeight), item.worldName);
					if (item.consummable) {
						GUI.Label(new Rect((screenLeftPadding + activeWidth) + (i * normalWidth) + gap + 5, Screen.height - screenBottomPadding - 20.0, normalWidth - 5, 25.0), "" + item.quantity);
					}
					i++;
				}
			}

		} else {
			GUI.Box(new Rect(screenLeftPadding, Screen.height - screenBottomPadding - activeHeight, activeWidth, activeHeight), "No Items");
			
		}
		
	}
	
	// detect objects
	function Update() {
		var idx;
		
		if (Input.GetKeyUp("e") && (collideItems.length > 0)) {
			for (var item : InventoryItem in collideItems) {
				if (addItem(item)) {
					Destroy(item.gameObject);
				}
			}
			collideItems.clear();
		} else if (Input.GetKeyUp("g") && (items.length > 0)) {
			removeItem(activeItem);
		}
		
		if (Input.GetAxis("Mouse ScrollWheel") > 0) {
			// scroll down
			Debug.Log("Scrolldown");
			
			idx = indexOfItem(activeItem, items);
			if (idx == items.length) {
				activeItem = items[0];	
			} else {
				activeItem = items[++idx];
			}
			
			
		} else if (Input.GetAxis("Mouse ScrollWheel") < 0) {
			// scroll up
			Debug.Log("Scrollup");
			idx = indexOfItem(activeItem, items);
			if (idx == 0) {
				activeItem = items[items.length];	
			} else {
				activeItem = items[--idx];
			}
			
		}

		
		if (items.length == 1) {
			activeItem = items[0];	
		}
	}
	
	function notification(who : Object, msg : String, userInfo : Object) {
		if (msg == "InItemSpace") {
			collideItems.Add(who);	
		} else if (msg == "OutItemSpace") {
			collideItems.RemoveAt(indexOfItem(who, collideItems));
		}
	}
	
	// hardcore functions
	function currentCapacity() {
		var currcapc = 0;
		for (var i=0;i<items.length;i++) {
			currcapc += items[i].quantity * items[i].unitSpaceRequired;
		}	
		
		return currcapc;
	}
	
	function indexOfItem(item : Object, items : Array) {
		for (var i=0;i<items.length;i++) {
			if (items[i] === item) {
				return i;	
			}	
		}
		return -1;
	}
	
	function addItem(item : InventoryItem) {
		if (((item.quantity * item.unitSpaceRequired) + currentCapacity()) <= maxCapacity) {
			items.Add(item);

			return true;
		} else {	
			return false;
		}
	}
	
	function swapItem(itemToSwap : InventoryItem, itemToSwapFor : InventoryItem) {
		this.removeItem(itemToSwap);
		items.Add(itemToSwapFor);	
	}
	
	function removeItem(item : InventoryItem) {
		items.RemoveAt(this.indexOfItem(item, items));	
	}
	
	function removeItemAtIndex(idx : int) {
		items.RemoveAt(idx);	
	}

}