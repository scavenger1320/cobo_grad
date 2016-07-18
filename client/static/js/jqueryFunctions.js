$(document).ready(function(){
	console.log("jQuery functioning");
	$(document).tooltip();
})	
$(document).on("click", ".slide", function(){
	$(".toggle").slideToggle(100);
})