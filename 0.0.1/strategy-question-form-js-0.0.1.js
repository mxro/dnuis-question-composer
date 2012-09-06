// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/docs/strategy-question-form-js-0.0.1 -->

(function($) {

		$.initStrategyQuestionForm = function(params) {

			var qf = {};
			
			var elem = params.elem;
			qf.onSubmit = params.onSubmit;
			
			qf.submit = function() {

				var inputs = {
					brandName : $('.brandName', elem).val(),
					imageLink : $('.imageLink', elem).val(),
					justification: $('.justification', elem).val(),
					correctStrategy: $('input[name=optionsRadios]:checked', elem).val()
				};
				
				// validate inputs
				if (!inputs.brandName) {
					alert("Please provide a brand name!");
					return;
				}
				
				if (!inputs.justification) {
					alert("Please provide a justification!");
					return;
				}

				qf.onSubmit(inputs);
			};
			
			qf.show = function(onSubmit) {
				if (onSubmit) {
					qf.onSubmit = onSubmit;
				}
				$('.brandName', elem).val("");
				$('.imageLink', elem).val("");
				$('.justification', elem).val("");
			};
			
			qf.hide = function() {
				elem.hide();
			};
			
			$('.moreInfos', elem).popover();

			
			
			
			
			return {
				show: qf.show,
				submit: qf.submit,
				hide: qf.hide
			};
		};

	})(jQuery);

// <!-- one.end -->
