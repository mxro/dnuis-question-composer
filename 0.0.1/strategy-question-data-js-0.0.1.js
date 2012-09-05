// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/docs/strategy-question-data-js-0.0.1 -->


(function($, AJ) {

		$.initStrategyQuestionData = function(params) {

			var client = params.client;
			
			var qd = {};
			
			qd.submitQuestion(data, onSuccess) {
				
				client.seed({
					onSuccess: function(res) {
						
					},
					onFailure: function(ex) {
						AJ.ui.notify(ex, "alert-error");
					}
				};
				
			};
			
			
			return {
				submitQuestion: qd.submitQuestion
			};
		};

	})(jQuery, AJ);
// <!-- one.end -->
