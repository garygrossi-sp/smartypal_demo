/*
 * Gary Grossi
 * 1/24/2017
 * 
 * Script for parsing branded urls and setting the correct logo and content
 */
 
 // TODO: check screen resolution and see if it is mobile
 
function selectDemo(demo){
	//Choose which demo to run
}

function addBranding(brand) {
	//Check for brand and set logo
}

function parseURL(url) {
	//Parse url here
	
	// TODO: add incorrect/no brand url checking
	var urlComponents = url.split('?');
	var parameters = urlComponents[urlComponents.length - 1]
	var parameterArray = parameters.split('=');
	return parameterArray[1]; // Can be expanded to check for multiple parameters
}

// Run script
var currentURL = window.location.href;
var brand = parseURL(currentURL);
document.getElementById("temp").innerHTML = brand // Change temp to actual brand
