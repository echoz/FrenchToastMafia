
import System.IO;
class CameraItem extends InventoryItem {
	
	var screenshotCount : int = 1;
	
	function Awake() {
		worldName  = "Camera";
		description = "To remember this very moment.";
		quantity = 1;
		unitSpaceRequired = 1;
		consummable = false;
		prefabName = "Camera";
		className = "CameraItem";	
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
		audiosrc.PlayOneShot(performAudio);
		
		
		//var screenshotCount : int = 1;
		var screenshotFilename : String = "screenshot" + screenshotCount + ".png";
		while (File.Exists(screenshotFilename))
		{
            screenshotCount++;
			screenshotFilename = "screenshot" + screenshotCount + ".png";
		} 
		Application.CaptureScreenshot(screenshotFilename);
	}
	
	function findProps() {
	}
	function willThrowItem() {
	}
	function didThrowItem() {
	}
	
}