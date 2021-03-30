export const integer = {
	inserted: function(el) {
		const element = el.getElementsByTagName('input')[0];

		element.onkeypress = function(e) {
			const charCode = e.which ? e.which : event.keyCode;
			if (charCode > 31 && (charCode < 48 || charCode > 57)) {
				return false;
			}
			return true;
		};

		element.oninput = function() {
			this.value = this.value.replace(/[^\d]/g, '');
		};

		element.onkeyup = function() {
			this.value = this.value.replace(/[^\d]/g, '');
		};
	},
};
