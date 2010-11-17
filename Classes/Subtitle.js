class Subtitle { 
	public var content : String;
	public var displayTime : float;
	public var postDelay : float;

	public function Subtitle(content : String, displayTime : float, postDelay : float) {
		this.content = content;
		this.displayTime = displayTime;	
		this.postDelay = postDelay;
	}
	
	public function Subtitle(content : String, displayTime : float) {
		this.content = content;
		this.displayTime = displayTime;	
		this.postDelay = 0;
	}	
	
}