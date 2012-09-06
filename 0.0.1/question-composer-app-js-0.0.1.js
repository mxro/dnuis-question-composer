// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/docs/question-composer-app-js-0.0.1 -->


(function($) {

		$.initQuestionComposerApp = function(params) {

			var qc = {};
			
			var elem = params.elem;
			var client = params.client;
			
			qc.sf = null;
			qc.sd = null;
			
			qc.hide = function() {
				elem.hide();
			};
			
			qc.show = function() {
				elem.show();
			};
			
			qc.sd = $.initStrategyQuestionData({client: client});
			
			qc.sf = $.initStrategyQuestionForm({
				elem : $(".strategyQuestionForm", elem)
			});
			
			
			// init UI
			(function() {
				$('.submitButtonRow', elem).show();
				
				qc.sf.newQuestion(function(res) {
					AJ.ui.showProgressBar();
					qc.sf.hide();
					$('.submitButtonRow', elem).hide();
					qc.sd.submitQuestion(res, function(node, secret) {
						AJ.ui.hideProgressBar();
						
						$('.questionLink', elem).attr('href', "http://appjangle.com/view#"+node.url()+"&"+secret);
						$('.successMessage', elem).fadeIn();
					});
				});

				
				$('.contributeAnotherQuestionButton', elem).click(function(evt) {
					evt.preventDefault();
					
					$('.successMessage', elem).hide();
					
					$('.submitButtonRow', elem).show();
					qc.sf.show();
				});
				
				$('.submitButton', elem).click(function(evt) {
					qc.sf.submit();
				});
			}) ();
			
			
			
			return {
				show: qc.show,
				hide: qc.hide
			};
		};

	})(jQuery);

// <!-- one.end -->
