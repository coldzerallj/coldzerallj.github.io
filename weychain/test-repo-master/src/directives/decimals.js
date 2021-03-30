export const decimals = {
	inserted: function(el) {
		function getSelectionStart(o) {
			if (o.createTextRange) {
				const r = document.selection.createRange().duplicate();
				r.moveEnd('character', o.value.length);
				if (r.text === '') return o.value.length;
				return o.value.lastIndexOf(r.text);
			} else {
				return o.selectionStart;
			}
		}

		el.onkeypress = function(e) {
			const charCode = e.which ? e.which : event.keyCode;
			const number = el.value.split('.');
			if (
				charCode !== 46 &&
				charCode > 31 &&
				(charCode < 48 || charCode > 57)
			) {
				return false;
			}
			// just one dot
			if (number.length > 1 && charCode === 46) {
				return false;
			}
			// get the carat position
			const caratPos = getSelectionStart(el);
			const dotPos = el.value.indexOf('.');
			if (caratPos > dotPos && dotPos > -1 && number[1].length > 1) {
				return false;
			}
			return true;
		};

		el.oninput = function() {
			this.value = this.value.replace(/[^\d.]/g, '');
		};

		el.onkeyup = function() {
			this.value = this.value.replace(/[^\d.]/g, '');
		};
	},
};
