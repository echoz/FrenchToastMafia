class Subtitle { 
	public var content : String;
	public var displayTime : float = 0;
	public var postDelay : float = 0;
	public var callbackDelegate = null;
	public var callbackMessage : String = "";

	public function Subtitle(content : String, displayTime : float, postDelay : float, delegate, delegateMsg : String) {
		this.callbackDelegate = delegate;
		this.callbackMessage = delegateMsg;
		this.content = content;
		this.displayTime = displayTime;	
		this.postDelay = postDelay;		
	}

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