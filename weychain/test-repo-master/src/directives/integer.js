export const integer = {
	inserted: function(el) {
		el.onkeypress = function(e) {
			const charCode = e.which ? e.which : event.keyCode;
			if (charCode > 31 && (charCode < 48 || charCode > 57)) {
				return false;
			}
			return true;
		};

		el.oninput = function() {
			this.value = this.value.replace(/[^\d]/g, '');
		};

		el.onkeyup = function() {
			this.value = this.value.replace(/[^\d]/g, '');
		};
	},
};
