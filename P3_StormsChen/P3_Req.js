// 
// P2_Req.js
// Do not copy this file!  It will be used here for grading.
//

var os = require("os");

const PSTART = 3000;
const PEND = 30000;
const CGIPATH  = "./cgi-dir";
const FILEPATH = "./myfileshare";

	// extention, header type
const VALIDEXT = [
	[".html", "text/html"],
	[".mp3", "audio/mp3"],
	[".jpg", "image/jpeg"]
	];

module.exports = {
	LowerPort: function() {
		return PSTART;
	},
	UpperPort: function() {
		return PEND;
	},
	execDir: function() {
		return CGIPATH;
	},
	fileDir: function() {
		return FILEPATH;
	},
	extAllowed: function() {
		return VALIDEXT;
	},
	logger: function(p, h) {
		if (h == "") {
			hostname = "localhost & "+ os.hostname();
		} else {
			hostname = h;
		}
		console.log("Your server is running on port (", p, ") on host (",hostname, ")");
	}
};
