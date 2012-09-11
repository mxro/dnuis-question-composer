// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/docs/strategy-question-form-js-0.0.1 -->

(function($) {

	$.initStrategyQuestionForm = function(params) {

		var elem = params.elem;

		var qf = {};

		qf.onSubmit = params.onSubmit;
		qf.loadedNode = params.loadedNode;
		qf.secret = params.secret;

		qf.getData = function() {
			return {
				brandName : $('.brandName', elem).val(),
				imageLink : $('.imageLink', elem).val(),
				videoLink : $('.videoLink', elem).val(),
				justification : $('.justification', elem).val(),
				correctStrategy : $('input[name=optionsRadios]:checked', elem)
						.val()
			};
		}
		
		qf.submit = function() {

			var inputs = qf.getData();

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

		qf.loadQuestion = function(inputs) {
			$('.brandName', elem).val(inputs.brandName);
			$('.imageLink', elem).val(inputs.imageLink);
			$('.videoLink', elem).val(inputs.videoLink);
			$('.justification', elem).val(inputs.justification);

			$(
					"input[name=optionsRadios][value=" + inputs.correctStrategy
							+ "]", elem).attr('checked', 'checked');

			setTimeout(
					function() {
						try {

							if (inputs.imageLink) {
								$('.imagePreview', elem).attr("src",
										inputs.imageLink);
								$('.imagePreviewGroup', elem).show();
							}

							if (inputs.videoLink) {
								$('.videoPreview', elem)
								.html(
										"<iframe width='230' height='129' src='"
												+ qf.priv.createYouTubeEmbedLink(inputs.imageLink)
												+ "' frameborder='0' allowfullscreen></iframe>");
								$('.videoPreviewGroup', elem).show;
							}
						} catch (err) {
							// sometimes image might not be available.
						}
					}, 1000);

			elem.show();

		};

		qf.newQuestion = function(onSubmit) {
			if (onSubmit) {
				qf.onSubmit = onSubmit;
			}
			$('.brandName', elem).val("");
			$('.imageLink', elem).val("");
			$('.videoLink', elem).val("");
			$('.justification', elem).val("");
			$('.imagePreviewGroup', elem).hide();
			$('.videoPreviewGroup', elem).hide();
			elem.show();
		};

		qf.hide = function() {
			elem.hide();
		};

		qf.priv = {};

		qf.priv.createPicker = function() {
			var picker = new google.picker.PickerBuilder()
					.addView(
							new google.picker.ImageSearchView()
									.setLicense(
											google.picker.ImageSearchView.License.NONE)
									.setSize(
											google.picker.ImageSearchView.Size.SIZE_QSVGA))
					.
					/*
					 * addView(new google.picker.DocsUploadView()). addView(new
					 * google.picker.PhotosView()).
					 */
					setCallback(qf.priv.pickerCallback).build();

			picker.setVisible(true);
		};

		qf.priv.createYouTubeEmbedLink = function(link) {
			return link.replace("http://www.youtube.com/watch?v=", "http://www.youtube.com/embed/");
		}

		qf.priv.pickerCallback = function(data) {
			var url = 'nothing';

			if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
				var doc = data[google.picker.Response.DOCUMENTS][0];
				url = doc["thumbnails"][1].url;
				$('.imageLink', elem).val(url);
				$('.imagePreview', elem).attr("src", url);
				$('.imagePreviewGroup', elem).fadeIn('slow');
			}
		};

		qf.priv.createVideoPicker = function() {
			var picker = new google.picker.PickerBuilder().addView(
					new google.picker.VideoSearchView())
			// new google.picker.ImageSearchView()
			// .setLicense(google.picker.ImageSearchView.License.NONE)
			// .setSize(google.picker.ImageSearchView.Size.SIZE_QSVGA)).

			.setCallback(qf.priv.videoPickerCallback).build();

			picker.setVisible(true);
		};

		qf.priv.videoPickerCallback = function(data) {
			var url = 'nothing';

			// alert(JSON.stringify(data));

			if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
				var doc = data[google.picker.Response.DOCUMENTS][0];

				$('.videoLink', elem).val(doc["url"]);

				var embedLink = doc["embedUrl"];
				var videoImage = doc["thumbnails"][1].url;

				$('.videoPreview', elem)
						.html(
								"<iframe width='230' height='129' src='"
										+ qf.priv.createYouTubeEmbedLink(doc['url'])
										+ "' frameborder='0' allowfullscreen></iframe>")
				$('.videoPreviewGroup', elem).fadeIn('fast');

				// $('.imageLink', elem).val(videoImage);
				// $('.imagePreview', elem).attr("src", videoImage);
				// $('.imagePreviewGroup', elem).fadeIn('slow');
			}
		};

		// init UI
		(function() {

			$('.moreInfos', elem).popover();

			// Use the Google Loader script to load the google.picker
			// script.

			$('.selectImageButton', elem).click(function(evt) {
				evt.preventDefault();
				qf.priv.createPicker();
			});

			$('.selectVideoButton', elem).click(function(evt) {
				evt.preventDefault();
				qf.priv.createVideoPicker();
			});
		})();

		return {
			loadQuestion : qf.loadQuestion,
			newQuestion : qf.newQuestion,
			submit : qf.submit,
			hide : qf.hide,
			getLoadedNode : qf.loadedNode,
			getSecret : qf.secret,
			getData: qf.getData

		};
	};

})(jQuery);

// <!-- one.end -->
