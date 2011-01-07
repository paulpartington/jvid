function jvidmake(configuration) {
	
	if (configuration == '' || configuration == null) {
		return false;
	}
	
	mediaConfiguration = generateConfig(configuration);
	
	html5vid = checkVideoCompatability();
	
	if (html5vid) {
		addhtml5(mediaConfiguration);
	}
}

/* generateConfig
*  param userConfiguration
*
* Function to generate the config for the videos.
*/

function generateConfig(userConfiguration) {
	
	/* Initialise the configuration object */
	var configuration = {};
	
	configuration = {
		class : '',
		flash : false,
		player: '',
		container: '',
		id : 'player',
		path : '',
		standardPath : true,
		flvLink : '',
		mp4Link : '',
		ogvLink : '',
		webmLink : ''
	}
	
	/* Check to see if a class has been set */
	
	if (userConfiguration.class != '' && userConfiguration.class != undefined) {
		configuration.class = userConfiguration.class;
	}

	/* Look to see if an ID has been added */
	
	if (userConfiguration.id != '' && userConfiguration.id != undefined) {
		configuration.id = userConfiguration.id;
	}

	if (userConfiguration.mp4Link != '' ||  userConfiguration.mp4Link != undefined || userConfiguration.ogvLink != '' || userConfiguration.ogvLink != undefined || userConfiguration.webmLink != '' || userConfiguration.webmLink != undefined) {
		configuration.mp4Link = userConfiguration.mp4Link;
		configuration.ogvLink = userConfiguration.ogvLink;
		configuration.webmLink = userConfiguration.webmLink;
		
		if (userConfiguration.path != '' && userConfiguration.path != undefined && userConfiguration.standardPath == true) {
			configuration.mp4Link = userConfiguration.path + configuration.mp4Link;
			configuration.ogvLink = userConfiguration.path + configuration.ogvLink;
			configuration.webmLink = userConfiguration.path + configuration.webmLink;
		}
	}
	
	if (userConfiguration.container != '' && userConfiguration.container != undefined) {
		configuration.container = userConfiguration.container;
	}
	
	if (userConfiguration.flash == true && (userConfiguration.flvLink == '' && userConfiguration.flvLink != undefined) && (userConfiguration.player != '' && userConfiguration.player != undefined)) {
		configuration.flash == userConfiguration.flash;
	}
	
	return configuration;
}

function checkVideoCompatability() {
	
	var v = document.createElement("video");
	
	if (v.play) {
		return true;
	} else {
		return false;	
	}
}

function addhtml5(config) {
	
	if (config.container != '' && config.container != undefined) {
		var vid = '<video id="'+config.id+'">';
		vid += makeSource(config.mp4Link, config.ogvLink, config.webmLink);
		vid += '</video>';
		$(document).ready(function(){
			$('#'+config.container).append(vid);
		});
	}
}

function makeSource(mp4Link, ogvLink, webmLink) {
	var vsource = '';
	
	if (mp4Link != '' && mp4Link != undefined) {
		vsource = '<source src="'+mp4Link+'" type="video/mp4" />';
	}
	
	if (ogvLink != '' && ogvLink != undefined) {
		vsource += '<source src="'+ogvLink+'" type="video/ogv" />';
	}
	
	if (webmLink != '' && webmLink != undefined) {
		vsource += '<source src="'+webmLink+'" type="video/webm" />';
	}
	return vsource;
}