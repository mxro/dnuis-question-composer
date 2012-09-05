// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/docs/strategy-question-data-js-0.0.1 -->

(function($, AJ) {

	
	$.initStrategyQuestionData = function(params) {

		// final parameters
		var client = params.client;

		// constants ------
		var aStrategyQuestion = client
				.reference("http://slicnet.com/mxrogm/mxrogm/apps/nodejump/docs/8/n/Types/Strategy_Quadrant_Questi");
		var aBrandName = client
				.reference("http://slicnet.com/mxrogm/mxrogm/apps/nodejump/docs/8/n/Types/Brand_Name");
		var aBrandImage = client
				.reference("http://slicnet.com/mxrogm/mxrogm/apps/nodejump/docs/8/n/Types/Brand_Image");
		var aCorrectStrategy = client
				.reference("http://slicnet.com/mxrogm/mxrogm/apps/nodejump/docs/8/n/Types/Correct_Strategy");

		var qd = {};

		qd.submitQuestion = function(data, onSuccess) {

			qd.priv.prepareSeedNodeForQuestion(data, onSuccess);

		};

		qd.priv = {};

		qd.priv.prepareSeedNodeForQuestion = function(data, onSuccess) {
			client.seed({
				onSuccess : function(res) {

					client.appendSafe({
						node : "q",
						atAddress : "./q",
						to : res.root,
						onSuccess : function(ar) {
							qd.priv.writeQuestionDataToNode(ar.appendedNode,
									res.secret, data, onSuccess);
						},
						onFailure : function(ex) {
							AJ.ui.notify(ex, "alert-error");
						}
					});

				},
				onFailure : function(ex) {
					AJ.ui.notify(ex, "alert-error");
				}
			});
		};

		/**
		 * Write to a node all the data defining a strategy quadrant question. 
		 */
		qd.priv.writeQuestionDataToNode = function(node, secret, data,
				onSuccess) {
			client.append({
				node : aStrategyQuestion,
				to : node
			});

			var brandName = client.append({
				node : data.brandName,
				to : node,
				atAddress : "./brandName"
			});

			client.append({
				node : aBrandName,
				to : brandName
			});

			var imageLink = client.append({
				node : data.imageLink,
				to : node,
				atAddress : "./brandImageLink"
			});

			client.append({
				node : aBrandImage,
				to : imageLink
			});

			var correctStrategy = client.append({
				node : data.correctStrategy,
				to : node,
				atAddress : "./correctStrategy"
			});

			client.append({
				node : aCorrectStrategy,
				to : correctStrategy
			});

			client.commit({
				onSuccess : function() {
					
					onSuccess(node, secret);
					
					client.post({
						message: node.url()+"&"+secret,
						to: "http://slicnet.com/questio/questio",
						secret: "pc1aj8opxtdjk19"
						onSuccess: function(res) {
							AJ.ui.notify("Question posted for review.", "alert-success");
						},
						onFailure: function(ex) {
							AJ.ui.notify("Unexpected exception while posting question: "+ex, "alert-error");
						}
					});
				}
			});

		};

		return {
			submitQuestion : qd.submitQuestion
		};
	};

})(jQuery, AJ);

// <!-- one.end -->
