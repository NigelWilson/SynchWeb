define(['marionette'], function() {
	
	
	var XHRImage = Image

	XHRImage.prototype.load = function(url, callback) {	
		var self = this

		this.completedPercentage = 0

		var xhr = new XMLHttpRequest()

		xhr.open('GET', url, true)
		if (app.token) xhr.setRequestHeader('Authorization','Bearer ' + app.token);
		xhr.responseType = 'arraybuffer'

		xhr.onload = function(e) {
			if (xhr.status == 0 || xhr.status != 200) {
				self.onerror(xhr.status, e)
				return
			}

			var h = xhr.getAllResponseHeaders()
            var m = h.match(/^Content-Type\:\s*(.*?)$/mi)
            var mimeType = m[1] || 'image/png';

        	var blob = new Blob([this.response], { type: mimeType })
        	self.src = window.URL.createObjectURL(blob)
        	if (callback) callback(this)
		}

		xhr.onprogress = function(e) {
			if (e.lengthComputable) {
				var pc = parseInt( ( e.loaded / e.total ) * 100 )

				if (pc != self.completedPercentage) {
					self.completedPercentage = pc
					if (self.onprogress) self.onprogress(pc)
				} 

				self.completedPercentage = pc
			}

		}

		xhr.onloadstart = function() {
			self.completedPercentage = 0
		}

		xhr.onloadend = function() {
			self.completedPercentage = 100
		}

		xhr.onerror = function () {
			console.log('img network error')
			self.onerror(arguments)
		}

		xhr.send()
	}


	return XHRImage

})