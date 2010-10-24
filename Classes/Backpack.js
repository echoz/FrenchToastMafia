class Backpack extends MonoBehaviour {
	var maxCapacity : int = 100;
	var items = new Array();
	var activeItem : Object;	
	var developer : boolean;
	var hasActiveItem : boolean = false;
	
	private var collideItems = new Array();

	// on going functions for items	
	function callActiveWillUpdateFunction() {
		if (hasActiveItem)
			activeItem.activeWillUpdateFunction();	
	}
	
	function callActiveDidUpdateFunction() {
		if (hasActiveItem)
			activeItem.activeDidUpdateFunction();	
	}
	
	function callActiveWillGUIFunction() {
		if (hasActiveItem)
			activeItem.activeDidGUIFunction();			
	}
	
	function callActiveDidGUIFunction() {
		if (hasActiveItem)
			activeItem.activeDidGUIFunction();	
	}
	
	function callEquippedWillUpdateFunction() {
		for (var item : Object in items) {
			item.equippedWillUpdateFunction();	
		}
	}
	
	function callEquippedDidUpdateFunction() {
		for (var item : Object in items) {
			item.equippedDidUpdateFunction();
		}
	}
	
	function callEquippedWillGUIFunction() {
		for (var item : Object in items) {
			item.equippedDidGUIFunction();			
		}
	}
	
	function callEquippedDidGUIFunction() {
		for (var item : Object in items) {
			item.equippedDidGUIFunction();	
		}
	}
	
	function callPerformFunction() {
		if (hasActiveItem) {
			activeItem.performFunction();	
		}
	}
	
	function cullEquippedItems() {
		var itemsInGame = GameObject.FindGameObjectsWithTag("items");
		var components = new Array();
		
		for (var gameobj : GameObject in itemsInGame) {
			var minorcomp = gameobj.GetComponents(InventoryItem);
			components = components.Concat(minorcomp);
		}
		for (var item in items) {
			if (!item.consummable) {
				for (var comp in components) {
					if (item.GetType() == comp.GetType()) {
						Destroy(comp.gameObject);	
					}
				}	
			}
		}
	}

	// gui
	function OnGUI() {
		callActiveWillGUIFunction();
		callEquippedWillGUIFunction();
		
		if (developer) {
			GUI.Box(new Rect(200,200,200,100), "Item count: " + items.length + "\nCollide Item Count: " + collideItems.length + "\nCurrent capacity: " + currentCapacity() + "/" + maxCapacity);
		}
		
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
					GUI.Box(new Rect((screenLeftPadding + activeWidth) + (i * normalWidth) + i+1 * gap, Screen.height - screenBottomPadding - normalHeight, normalWidth, normalHeight), item.worldName);
					if (item.consummable) {
						GUI.Label(new Rect((screenLeftPadding + activeWidth) + (i * normalWidth) + i * gap + 5, Screen.height - screenBottomPadding - 20.0, normalWidth - 5, 25.0), "" + item.quantity);
					}
					i++;
				}
			}

		} else {
			GUI.Box(new Rect(screenLeftPadding, Screen.height - screenBottomPadding - activeHeight, activeWidth, activeHeight), "No Items");
			
		}
		
		callActiveDidGUIFunction();
		callEquippedDidGUIFunction();		
		
	}
	
	// detect objects
	function Update() {
		callActiveWillUpdateFunction();
		callEquippedWillUpdateFunction();		
		
		var idx;
		
		if (Input.GetMouseButtonUp(0)) {
			callPerformFunction();	
			clearConsummable();
		} else if (Input.GetKeyUp("e") && (collideItems.length > 0)) {
			var previousItemsCount = items.length;
			
			for (var item : InventoryItem in collideItems) {
				if (addItem(item)) {
					Destroy(item.gameObject);
				}
			}
			collideItems.clear();
			
			if (previousItemsCount == 0) {
				activeItem = items[0];	
			}
			
		} else if (Input.GetKeyUp("g") && (items.length > 0)) {
			var thrownItem = Instantiate(Resources.Load("ItemsPrefab/" + activeItem.prefabName), transform.position, Quaternion.identity);
			thrownItem.GetComponent(InventoryItem).quantity = activeItem.quantity;
			
			removeItem(activeItem);
			if (items.length > 0) {
				activeItem = items[0];
			}
		}
		
		if (items.length == 1) {
			activeItem = items[0];
			hasActiveItem = true;
		} else if (items.length == 0) {
			activeItem = null;
			hasActiveItem = false;
		}
		
		if ((Input.GetAxis("Mouse ScrollWheel") > 0) || (Input.GetKeyUp("q"))) {
			// scroll down
			idx = indexOfItem(activeItem, items);
			if (idx == items.length-1) {
				activeItem = items[0];	
			} else {
				activeItem = items[++idx];
			}
			
			
		} else if (Input.GetAxis("Mouse ScrollWheel") < 0) {
			// scroll up
			idx = indexOfItem(activeItem, items);
			if (idx == 0) {
				activeItem = items[items.length-1];	
			} else {
				activeItem = items[--idx];
			}
			
		}

		callActiveDidUpdateFunction();
		callEquippedDidUpdateFunction();		
		
	}
	
	function notification(who : Object, msg : String, userInfo : Object) {
		if (msg == "InItemSpace") {
			collideItems.Add(who);	
		} else if (msg == "OutItemSpace") {
			collideItems.RemoveAt(indexOfItem(who, collideItems));
		}
	}
	
	// hardcore functions
	function clearConsummable() {
		
		var toremove = new Array();
		for (var i=0;i<items.length;i++) {
			if ((items[i].consummable) && (items[i].quantity == 0)) {
				toremove.Add(i);
			}	
		}
		if (toremove.length > 0) {
			for (var i : int in toremove) {
				items.RemoveAt(i);	
			}
			if (items.length > 0) {
				activeItem = items[0];
			}
		}
	}
	
	
	function currentCapacity() {
		var currcapc = 0;
		for (var i=0;i<items.length;i++) {
			currcapc += items[i].quantity * items[i].unitSpaceRequired;
		}	
		
		return currcapc;
	}
	
	function indexOfItem(item : Object, items : Array) {
		for (var i=0;i<items.length;i++) {
//			Debug.Log(items[i] + " === " + item + " : " + (items[i]===item) + " = " + i);
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