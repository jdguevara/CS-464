// Load a text resource from a file over the network
var loadTextResource = function (url, callback) {
	var request = new XMLHttpRequest();
	request.open('GET', url + '?please-dont-cache=' + Math.random(), true);
	request.onload = function () {
		if (request.status < 200 || request.status > 299) {
			callback('Error: HTTP Status ' + request.status + ' on resource ' + url);
		} else {
			callback(null, request.responseText);
		}
	};
	request.send();
};

var loadImage = function (url, callback) {
	var image = new Image();
	image.onload = function () {
		callback(null, image);
	};
	image.src = url;
};

var loadJSONResource = function (url, callback) {
	loadTextResource(url, function (err, result) {
		if (err) {
			callback(err);
		} else {
			try {
				callback(null, JSON.parse(result));
			} catch (e) {
				callback(e);
			}
		}
	});
};

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
	var tmp = this
	if (tmp >in_max)
	{
		tmp = in_max;
	}
	if (tmp < in_min)
	{
		tmp = in_min;
	}
	return (tmp - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }