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
		var aBrandVideo = client
				.reference("http://slicnet.com/mxrogm/mxrogm/apps/nodejump/docs/8/n/Types/Video_Link");
		var aCorrectStrategy = client
				.reference("http://slicnet.com/mxrogm/mxrogm/apps/nodejump/docs/8/n/Types/Correct_Strategy");
		var aJustification = client
				.reference("http://slicnet.com/mxrogm/mxrogm/apps/nodejump/docs/8/n/Types/Justification");

		var qd = {};

		qd.submitQuestion = function(data, onSuccess) {

			qd.priv.prepareSeedNodeForQuestion(data, onSuccess);

		};

		qd.loadQuestion = function(node, secret, onSuccess) {
			client
					.load({
						node : node,
						secret : secret,
						onSuccess : function(res) {

							var data = {};

							client
									.select({
										from : res.loadedNode,
										linkingTo : aBrandName,
										onSuccess : function(sr) {
											data.brandName = sr.values[0]
													.value();

											client
													.select({
														from : res.loadedNode,
														linkingTo : aBrandImage,
														onSuccess : function(sr) {
															data.imageLink = sr.values[0]
																	.value();

															client
																	.select({
																		from : res.loadedNode,
																		linkingTo : aBrandVideo,
																		onSuccess : function(
																				sr) {
																			if (sr.values.length > 0) {
																				data.videoLink = sr.values[0]
																						.value();
																			}

																			client
																					.select({
																						from : res.loadedNode,
																						linkingTo : aCorrectStrategy,
																						onSuccess : function(
																								sr) {
																							data.correctStrategy = sr.values[0]
																									.value();

																							client
																									.select({
																										from : res.loadedNode,
																										linkingTo : aJustification,
																										onSuccess : function(
																												sr) {
																											if (sr.values.length > 0) {
																												data.justification = sr.values[0]
																														.value();
																											}

																											onSuccess(data);
																										}
																									});

																						}
																					});
																		}
																	});

														}
													});

										}
									});

						}
					})
		};

		qd.updateQuestionData = function(node, secret, data, onSuccess) {
			client.select({
				from : node,
				linkingTo : aBrandName,
				onSuccess : function(sr) {
					var newBrandName = client.updateValue({
						forNode : sr.nodes[0],
						newValue : data.brandName
					});

					client.replace({
						node : sr.nodes[0],
						withNode : newBrandName
					});

				}
			});

			client.select({
				from : node,
				linkingTo : aBrandImage,
				onSuccess : function(sr) {
					var newBrandImage = client.updateValue({
						forNode : sr.nodes[0],
						newValue : data.imageLink
					});

					client.replace({
						node : sr.nodes[0],
						withNode : newBrandImage
					});
				}
			});

			client.select({
				from : node,
				linkingTo : aBrandVideo,
				onSuccess : function(sr) {
					var newNode = client.updateValue({
						forNode : sr.nodes[0],
						newValue : data.videoLink
					});

					client.replace({
						node : sr.nodes[0],
						withNode : newNode
					});
				}
			});

			client.select({
				from : node,
				linkingTo : aCorrectStrategy,
				onSuccess : function(sr) {
					var newNode = client.updateValue({
						forNode : sr.nodes[0],
						newValue : data.correctStrategy
					});

					client.replace({
						node : sr.nodes[0],
						withNode : newNode
					});
				}
			});

			client.select({
				from : node,
				linkingTo : aJustification,
				onSuccess : function(sr) {
					var newNode = client.updateValue({
						forNode : sr.nodes[0],
						newValue : data.justification
					});

					client.replace({
						node : sr.nodes[0],
						withNode : newNode
					});
				}
			});
			
			client.commit({
				onSuccess: function(res) {
					onSuccess();
				}
			});

		}
		
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

			var justification = client.append({
				node : data.justification,
				to : node,
				atAddress : "./justification"
			});

			client.append({
				node : aJustification,
				to : justification
			});

			var brandVideo = client.append({
				node : data.videoLink,
				to : node,
				atAddress : "./brandVideoLink"
			});

			client.append({
				node : aBrandVideo,
				to : brandVideo
			});

			client
					.commit({
						onSuccess : function() {

							onSuccess(node, secret);

							client
									.post({
										message : node.url() + "&" + secret,
										to : client
												.reference("http://slicnet.com/questio/questio"),
										secret : "pc1aj8opxtdjk19",
										onSuccess : function(res) {
											AJ.ui
													.notify(
															"Last Status: Question posted for review.",
															"alert-success");
										},
										onFailure : function(ex) {
											AJ.ui
													.notify(
															"Unexpected exception while posting question: "
																	+ ex,
															"alert-error");
										}
									});
						}
					});

		};

		return {
			submitQuestion : qd.submitQuestion,
			loadQuestion : qd.loadQuestion,
			updateQuestion: qd.updateQuestionData
		};
	};

})(jQuery, AJ);

// <!-- one.end -->
