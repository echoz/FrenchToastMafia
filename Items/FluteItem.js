class FluteItem extends InventoryItem {
	var sound : AudioClip;
	
	private var playing : boolean = false;

	function Awake() {
		worldName  = "Flute";
		description = "Blow it for some stress-relieving music.";
		quantity = 1;
		unitSpaceRequired = 1;
		consummable = false;
		prefabName = "Flute";
		className = "FluteItem";	
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
		var audiosrc = thePlayer.GetComponent(Player).extraAudioSource;
		
		if ((audiosrc.isPlaying) && (playing)) {
			audiosrc.Stop();	
			playing = false;
			
		} else if ((!audiosrc.isPlaying) && (!playing)) {
			playing = true;
			audiosrc.clip = sound;
			audiosrc.loop = true;
			audiosrc.Play();
		}	
		
	}		
	function willThrowItem() {
	}
	function didThrowItem() {
	}
	
}